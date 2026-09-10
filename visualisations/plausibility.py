#!/usr/bin/env python3
"""Test how discoverable each investigation step is.

For every ACTION that grants a clue, we ask: standing where a player would
stand, knowing only the breadcrumbs the design hands them, would a player
spontaneously think to try THIS action, and name it? An action nobody would
think to try is a dead end in the investigation, no matter how well authored.

Method (two blind LLM passes):
  1. PLAYER pass  - one call per action. The model is told only the plain-English
     descriptions of the clues it holds (the action's hard Requires + soft
     Prompted-by) and the scene's read-aloud Setup text. It sees NO clue ids,
     NO action names, NO action list. It returns a ranked list of things it
     would try.
  2. JUDGE pass   - batched. Given the target action (name + outcome) and the
     player's ranked guesses, it reports which guess (if any) matches, and at
     what rank. It never judges skills or feasibility, only "did they think of
     it".

Score per action:
  rank 1        - obvious next step
  rank 2..N     - reachable, buried
  no match      - undiscoverable (a puzzle gap)

Only discoverability is measured. Whether the party HAS the skill/cost to do
the action is a separate, structural question and is deliberately ignored.

Backend: the Copilot CLI in non-interactive mode (`copilot -p`), invoked from an
empty scratch dir so it never ingests this repo.

Usage:
    python plausibility.py --limit 5              # cheap calibration run
    python plausibility.py --only SCENE_SUBSTR    # actions in matching scenes
    python plausibility.py                        # full run -> plausibility.json
    python plausibility.py --report               # re-print last json as a table
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
import textwrap
from pathlib import Path

import clue_graph as cg

HERE = Path(__file__).resolve().parent
REPO = HERE.parent
OUT = HERE / "plausibility.json"
SCRATCH = Path(tempfile.gettempdir()) / "cop_llm_probe"

BEGIN, END = "===BEGIN===", "===END==="


# --------------------------------------------------------------------------
# LLM backend (Copilot CLI, headless, run from an empty dir)
# --------------------------------------------------------------------------

def llm(prompt: str, model: str | None) -> str:
    SCRATCH.mkdir(parents=True, exist_ok=True)
    env = dict(os.environ, COPILOT_ALLOW_ALL="1")
    cmd = ["copilot", "-p", prompt, "--no-color", "--log-level", "none"]
    if model:
        cmd += ["--model", model]
    p = subprocess.run(cmd, cwd=SCRATCH, env=env, capture_output=True,
                       text=True, encoding="utf-8", errors="replace")
    return p.stdout or ""


def between(text: str) -> str:
    """Pull the sentinel-wrapped block out of the CLI's chatty stdout."""
    if BEGIN in text and END in text:
        return text.split(BEGIN, 1)[1].split(END, 1)[0].strip()
    # fall back: strip the CLI footer (Changes / AI Credits / Tokens / Resume)
    lines = []
    for ln in text.splitlines():
        if re.match(r"^\s*(Changes|AI Credits|Tokens|Resume)\b", ln):
            break
        lines.append(ln)
    return "\n".join(lines).strip()


# --------------------------------------------------------------------------
# Player-facing context extraction
# --------------------------------------------------------------------------

def _section(lines: list[str], name: str) -> str:
    """Return the body of a `## <name>` section (until the next ##+ heading)."""
    out, grab = [], False
    for ln in lines:
        h = re.match(r"^(#{2,6})\s+(.*)", ln)
        if h:
            grab = h.group(2).strip().lower() == name.lower()
            continue
        if grab:
            out.append(ln)
    return "\n".join(out).strip()


def _atmosphere(lines: list[str]) -> str:
    """Free atmospheric opportunities: the no-clue impressions a player soaks up
    just by being present. Clue-giving opportunities are skipped (their prose is
    the clue itself, and taking them is a separate accumulation question)."""
    body = _section(lines, "Opportunities")
    if not body:
        return ""
    out = []
    for ln in body.splitlines():
        if not ln.lstrip().startswith("-"):
            continue
        if "clues.md#" in ln:                      # delivers a clue -> not atmospheric
            continue
        t = re.sub(r"`\([^`]*\)`", "", ln)         # drop (requires: ...) / (prompted by: ...)
        t = re.split(r"(?:→\s*)?Gives:", t)[0]     # drop any non-clue reward tail
        t = re.sub(r"\]\([^)]+\)", "]", t)
        t = re.sub(r"[`*]", "", t).strip(" -\t")
        if t:
            out.append("- " + t)
    return "\n".join(out).strip()


def scene_context(relpath: str) -> str:
    """What the GM would show a player standing in this scene, no clue ids."""
    path = REPO / relpath
    if not path.exists():
        return ""
    lines = path.read_text(encoding="utf-8").splitlines()
    kind = Path(relpath).parent.name
    setup = _section(lines, "Setup")
    if setup:
        body = setup
    elif kind == "characters":
        appear = _section(lines, "Appearance")
        body = "You are face to face with this person.\n" + appear
    else:
        # preamble under the H1, before the first ## heading
        pre = []
        for ln in lines:
            if re.match(r"^#{2,6}\s", ln):
                break
            pre.append(ln)
        body = "\n".join(pre)
    body = re.sub(r"\]\([^)]+\)", "]", body)      # drop link targets, keep text
    body = re.sub(r"[`*]", "", body)               # drop md emphasis
    body = body.strip()
    atmo = _atmosphere(lines)
    if atmo:
        body += "\n\nFree impressions you soak up just being here:\n" + atmo
    return body.strip()


def clue_desc(g: cg.Graph, cid: str) -> str:
    """Plain-English description of a held clue, id stripped."""
    d = g.clues.get(cid, "")
    d = re.sub(r"\]\([^)]+\)", "]", d)
    d = re.sub(r"[`*\[\]]", "", d)
    return d.strip()


# --------------------------------------------------------------------------
# Roster: the cast and map a player carries in their head. Public entities
# only; entities whose very existence is a discovery (an *-exists clue or an
# `aware:` token gates on them) are withheld, since handing those over would
# leak a core reveal.
# --------------------------------------------------------------------------

def hidden_entities(g: cg.Graph) -> set[str]:
    hidden = set()
    # (a) anything reached through an awareness token
    for n in g.nodes.values():
        for a in (set(n.requires_clues) | set(n.prompted_by_clues)
                  | set(n.gives_clues)):
            if a.startswith("awareness:"):
                hidden.add(a.split(":", 1)[1])
    # (b) anything an "...-exists" clue points at
    for cid, desc in g.clues.items():
        if "exists" not in cid:
            continue
        for folder, fname in re.findall(
                r"\(\.\./(locations|characters|events|items)/([a-z0-9-]+\.md)", desc):
            hidden.add(f"{folder}/{fname}")
    # (c) locations or characters whose Type tag marks them
    #     hidden/discoverable/deceased
    for relpath, scene in g.scenes.items():
        if scene.kind not in ("locations", "characters"):
            continue
        typ = (REPO / relpath).read_text(encoding="utf-8")
        m = re.search(r"^\*\*Type:\*\*\s*(.*)$", typ, re.MULTILINE)
        if m and re.search(r"hidden|discoverable|deceased", m.group(1),
                           re.IGNORECASE):
            hidden.add(relpath)
    return hidden


def entity_hook(relpath: str) -> str:
    """The spoiler-free `## Hook` line of an entity, or '' if none authored."""
    lines = (REPO / relpath).read_text(encoding="utf-8").splitlines()
    body = _section(lines, "Hook")
    for ln in body.splitlines():
        ln = ln.strip()
        if ln.startswith("<!--") or ln.startswith("["):   # comment / placeholder
            continue
        ln = re.sub(r"^[-*]\s*", "", ln)
        ln = re.sub(r"\]\([^)]+\)", "]", ln)
        ln = re.sub(r"[`*\[\]]", "", ln).strip()
        if ln:
            return ln
    return ""


def missing_hooks(g: cg.Graph) -> list[str]:
    """Entity files with no authored Hook, in a stable order. Hidden entities
    have no public hook by design and are not reported."""
    hidden = hidden_entities(g)
    out = []
    for relpath, scene in g.scenes.items():
        if Path(relpath).name.startswith("_") or Path(relpath).name == "index.md":
            continue
        if relpath in hidden:
            continue
        if scene.kind in ("characters", "locations", "events", "items"):
            if not entity_hook(relpath):
                out.append(relpath)
    return sorted(out)


def build_roster(g: cg.Graph) -> str:
    """Public cast/map, built ONLY from spoiler-free Hooks. Hidden entities and
    entities without an authored Hook are left out (never fall back to the
    spoiler `Type:` line)."""
    hidden = hidden_entities(g)
    people, places = [], []
    for relpath, scene in g.scenes.items():
        if relpath in hidden or Path(relpath).name.startswith("_"):
            continue
        if Path(relpath).name == "index.md":
            continue
        hook = entity_hook(relpath)
        if not hook:
            continue
        if scene.kind == "characters":
            people.append(hook)
        elif scene.kind == "locations":
            places.append(hook)
    people, places = sorted(set(people)), sorted(set(places))
    out = []
    if people:
        out.append("People you know are around the village:\n"
                   + "\n".join(f"- {p}" for p in people))
    if places:
        out.append("Places you know exist in and around the village:\n"
                   + "\n".join(f"- {p}" for p in places))
    return "\n\n".join(out)


ROSTER = ""


# --------------------------------------------------------------------------
# Build the test cases
# --------------------------------------------------------------------------

def test_cases(g: cg.Graph):
    cases = []
    for n in g.nodes.values():
        if n.kind != "action":
            continue
        if not n.gives_clues:
            continue
        held = list(dict.fromkeys(n.requires_clues + n.prompted_by_clues))
        awares = [c for c in held if c.startswith("awareness:")]
        held = [c for c in held if not c.startswith("awareness:")]
        held_txt = [clue_desc(g, c) for c in held]
        held_txt = [t for t in held_txt if t]
        # An awareness gate means the player has been introduced to that entity,
        # so its Hook (the introduction text) is known context here.
        for a in awares:
            hk = entity_hook(a.split(":", 1)[1])
            if hk:
                held_txt.append(f"You have been introduced to {hk}")
        target_gives = [clue_desc(g, c) for c in n.gives_clues if c in g.clues]
        cases.append({
            "id": n.id,
            "scene": n.scene,
            "scene_title": n.scene_title,
            "action": n.name,
            "held": held_txt,
            "context": scene_context(n.scene),
            "gives": target_gives,
            "skills": n.requires_skills,
        })
    return cases


# --------------------------------------------------------------------------
# Prompts
# --------------------------------------------------------------------------

def player_prompt(case: dict) -> str:
    known = ("\n".join(f"- {t}" for t in case["held"])
             if case["held"] else "- (nothing specific yet)")
    roster = f"{ROSTER}\n\n" if ROSTER else ""
    return textwrap.dedent(f"""\
        You are a player in a 1960s rural investigation game. Stay in character
        as the investigator. Do not analyse the exercise.

        {roster}What you currently believe / have pieced together:
        {known}

        You have just arrived here. The game master describes the scene:
        --- SCENE: {case['scene_title']} ---
        {case['context'] or '(no description)'}
        ---

        Say what you actually do next to make progress. List up to 6 DISTINCT,
        CONCRETE actions, MOST LIKELY FIRST (what you'd instinctively try first
        at the top). One short imperative line each, e.g. "Ask the barman who
        buys the expensive cigarettes". No numbering, no commentary.

        Output ONLY between the markers:
        {BEGIN}
        <one action per line>
        {END}""")


def judge_prompt(batch: list[dict]) -> str:
    items = []
    for i, b in enumerate(batch):
        guesses = "\n".join(f"    {j+1}. {gl}" for j, gl in enumerate(b["guesses"]))
        items.append(textwrap.dedent(f"""\
            ITEM {i}
            Target action (what the design wanted the player to do): {b['action']}
            What that action reveals: {'; '.join(b['gives']) or '(unspecified)'}
            Player's ranked attempts:
            {guesses or '    (none)'}"""))
    body = "\n\n".join(items)
    return textwrap.dedent(f"""\
        You match a player's free-text attempts to a specific intended action.
        Judge ONLY whether an attempt expresses the SAME INTENT as the target
        action (same thing done to the same subject to learn the same thing).
        Ignore wording, ignore whether the player has the skill or means.

        For each ITEM output one JSON object per line (JSONL), no prose:
        {{"item": <i>, "rank": <1-based position of the FIRST matching attempt, or 0 if none match>}}

        {body}

        Output ONLY between the markers:
        {BEGIN}
        <one json object per line>
        {END}""")


def parse_lines(block: str) -> list[str]:
    out = []
    for ln in block.splitlines():
        ln = re.sub(r"^\s*(?:\d+[.)]\s*|[-*]\s*)", "", ln).strip()
        if ln:
            out.append(ln)
    return out


# --------------------------------------------------------------------------
# Run
# --------------------------------------------------------------------------

def run(cases: list[dict], model: str | None, judge_model: str | None,
        judge_batch: int) -> list[dict]:
    # player pass, sequential (blind, no cross-bleed)
    for i, c in enumerate(cases, 1):
        print(f"  player {i}/{len(cases)}: {c['action']}  @ {c['scene']}",
              file=sys.stderr)
        block = between(llm(player_prompt(c), model))
        c["guesses"] = parse_lines(block)[:6]

    # judge pass, batched
    results = {}
    for s in range(0, len(cases), judge_batch):
        batch = cases[s:s + judge_batch]
        print(f"  judge {s+1}-{s+len(batch)}/{len(cases)}", file=sys.stderr)
        block = between(llm(judge_prompt(batch), judge_model))
        for ln in block.splitlines():
            ln = ln.strip()
            if not ln.startswith("{"):
                continue
            try:
                o = json.loads(ln)
                results[s + int(o["item"])] = int(o["rank"])
            except Exception:
                continue

    out = []
    for idx, c in enumerate(cases):
        rank = results.get(idx, None)
        out.append({
            "id": c["id"], "action": c["action"], "scene": c["scene"],
            "skills": c["skills"], "held": c["held"], "gives": c["gives"],
            "guesses": c.get("guesses", []),
            "rank": rank,
            "verdict": verdict(rank),
        })
    return out


def verdict(rank) -> str:
    if rank is None:
        return "error"
    if rank == 0:
        return "undiscoverable"
    if rank == 1:
        return "obvious"
    if rank <= 3:
        return "reachable"
    return "buried"


# --------------------------------------------------------------------------
# Report
# --------------------------------------------------------------------------

ORDER = {"undiscoverable": 0, "buried": 1, "reachable": 2, "obvious": 3, "error": 4}


def report(rows: list[dict]):
    rows = sorted(rows, key=lambda r: (ORDER.get(r["verdict"], 9),
                                       -(r["rank"] or 0)))
    counts = {}
    for r in rows:
        counts[r["verdict"]] = counts.get(r["verdict"], 0) + 1
    print(f"\n{len(rows)} actions tested: " +
          "  ".join(f"{k}={v}" for k, v in sorted(counts.items())))
    print(f"{'verdict':<15} {'rank':<5} {'action':<40} scene")
    print("-" * 100)
    for r in rows:
        rk = "-" if r["rank"] in (None, 0) else str(r["rank"])
        print(f"{r['verdict']:<15} {rk:<5} {r['action'][:38]:<40} {r['scene']}")


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--limit", type=int, help="test only the first N actions")
    ap.add_argument("--only", metavar="SUBSTR",
                    help="only actions whose scene path contains SUBSTR")
    ap.add_argument("--model", default="gpt-5-mini", help="player model (cheap default)")
    ap.add_argument("--judge-model", default=None,
                    help="judge model (defaults to --model)")
    ap.add_argument("--judge-batch", type=int, default=12)
    ap.add_argument("--roster", action="store_true",
                    help="give the player the public cast/map (WARNING: current "
                         "Type: lines are spoilery; needs clean public labels)")
    ap.add_argument("--report", action="store_true",
                    help="re-print the last plausibility.json, no LLM calls")
    ap.add_argument("--missing-hooks", action="store_true",
                    help="list entity files with no authored Hook, then exit")
    args = ap.parse_args(argv)
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

    if args.report:
        report(json.loads(OUT.read_text(encoding="utf-8")))
        return

    g = cg.build_graph()

    if args.missing_hooks:
        miss = missing_hooks(g)
        print(f"{len(miss)} entities need a Hook:")
        for r in miss:
            print(f"    {r}")
        return

    global ROSTER
    if args.roster:
        ROSTER = build_roster(g)
    cases = test_cases(g)
    if args.only:
        cases = [c for c in cases if args.only in c["scene"]]
    if args.limit:
        cases = cases[:args.limit]
    print(f"testing {len(cases)} action(s)", file=sys.stderr)

    rows = run(cases, args.model, args.judge_model or args.model, args.judge_batch)
    OUT.write_text(json.dumps(rows, indent=2, ensure_ascii=False),
                   encoding="utf-8")
    print(f"wrote {OUT}", file=sys.stderr)
    report(rows)


if __name__ == "__main__":
    main()
