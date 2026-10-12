#!/usr/bin/env python3
"""Audit scenes with a model: one call per scene, findings written to audits/.

    python -m tools.sceneaudit events/the-car-in/the-drive.md [more scene files ...]
    python -m tools.sceneaudit --all

The auditor gets the game rules (story-facts/game-system.md,
actions-and-opportunities.md), the scene's setups/ sheet (opening + starting
context), and every move open in the scene (its file, an outer "During" event,
its Location and Present characters, held items' actions) with each field
spelled out, plus the scene's mechanics. It checks the categories in CHECKS
and returns findings with a severity and a fix.

Paid (Claude Opus 5.5), so run by hand only, never from the edit hook.
audits/ is gitignored. Each run of several scenes also writes audits/SUMMARY.md.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(ROOT / "tools"))
import build_setups as B  # noqa: E402
from tools.scenetest import agents as A  # noqa: E402
from tools.scenetest import engine as E  # noqa: E402
from tools.scenetest import scene as S  # noqa: E402

MODEL = "claude-opus-5-5"
OUT = ROOT / "audits"
RULES = [ROOT / "story-facts" / "game-system.md", ROOT / "actions-and-opportunities.md"]

CHECKS = {
    "integrity": "Every link, clue, item, card, mechanic and value a move names exists and fits its field; nothing contradicts itself across fields.",
    "discoverability": "Every action and opportunity is cued by something the player hears in the opening or in an earlier outcome; a player reading only that text would think to try it.",
    "text": "Typos, grammar, unclear or ambiguous sentences, wrong names, broken rendering.",
    "reachability": "Every Requires item/card is obtainable here or is in the starting context; every When can become true; the scene has an exit a player can reach.",
    "outcome-gives": "Each Outcome conveys exactly what its Gives hands over: no fact told without a clue, no clue handed over without the text conveying it.",
    "state": "Every mechanic set by a Changes is read by some When/rule, and every When/Changes names a real mechanic with a legal value. Flag write-only or read-only state.",
    "balance": "Dominant strategies (a free move making a paid one pointless), options nobody would pick, the same result at very different prices.",
    "player-facing": "No Polish dialogue; no GM notes, labels or mechanics in Setup/opening; Hooks that spoil; people named before they are introduced.",
    "scope": "Moves from the location or present characters that do not belong in this moment and drag in unrelated threads.",
    "contradiction": "The opening contradicts itself or the moves (duplicated facts, two versions of one thing, someone silent who also talks).",
    "unsupported": "What a clever player would come up with from the opening and the outcomes that no move supports: "
                   "an obvious question, a smart use of an item or skill, an alternative approach. Say what they "
                   "would try, and whether it deserves a move or a refusal line.",
}


def moves_text(sc: S.Scene) -> str:
    """Every open move, with each field spelled out for a reader."""
    def fmt(refs: list[str]) -> str:
        out = []
        for r in refs:
            if r.startswith("clue:"):
                out.append(f'clue "{r[5:]}": {B.clue_text(r[5:])}')
            elif r.startswith("aware:"):
                out.append(f"awareness of {B.title(E.S.aware_id(r[6:]))}")
            elif ":" in r and r.split(":")[0] in ("time", "composure"):
                out.append(r.replace(":", " "))
            else:
                out.append(B.title(r))
        return "; ".join(out) or "-"

    blocks = []
    for m in sc.moves + [x for ms in sc.item_moves.values() for x in ms]:
        src = m.src.relative_to(ROOT).as_posix()
        lines = [f"### {m.kind.upper()}: {m.name}  (from {src})"]
        if m.kind == "action":
            lines.append(f"- Requires: {S.plain(m.requires, m.src) or '-'}")
        else:
            lines.append(f"- Noticed by: {S.plain(m.requires, m.src) or '-'}")
        lines += [f"- When: {m.when or '-'}",
                  f"- Prompted by: {fmt(m.prompted)}",
                  f"- Cost: {fmt(m.cost)}",
                  f"- {'Outcome' if m.kind == 'action' else 'Text'}: {m.text}",
                  f"- Gives: {fmt(m.gives)}",
                  f"- Changes: {m.changes or '-'}"]
        blocks.append("\n".join(lines))
    mech = "\n".join(f"- {m.name}: {m.type}{', per ' + m.per if m.per else ''}{', start ' + m.start if m.start else ''}"
                     + "".join(f"\n    - {n}" for n in m.notes) for m in sc.mechanics) or "(none)"
    return "## Moves\n\n" + "\n\n".join(blocks) + "\n\n## Mechanics\n\n" + mech


SCHEMA = {
    "type": "object",
    "properties": {
        "findings": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "category": {"type": "string", "enum": list(CHECKS)},
                    "severity": {"type": "string", "enum": ["blocker", "problem", "nit"]},
                    "where": {"type": "string"},
                    "issue": {"type": "string"},
                    "fix": {"type": "string"},
                },
                "required": ["category", "severity", "where", "issue", "fix"],
                "additionalProperties": False,
            },
        },
    },
    "required": ["findings"],
    "additionalProperties": False,
}

SYSTEM = (
    "You audit one scene of a tabletop RPG for its designer. You get the game's rules, the scene's opening "
    "as a player hears it, the starting context (what the player brings in), and every move open in the "
    "scene with its fields. Report concrete problems only, each tied to a specific line or move, with a "
    "short, actionable fix. How to read the input: the starting context is what the player already holds "
    "when this scene begins, handed out by earlier scenes (skill cards come from the draft at game start); "
    "treat it as held, not as an error. Moves from an outer event that this scene runs 'During', from its "
    "location, from present characters, and from held items are open here too. Do not praise, do not summarise, do not invent problems; an empty list is a "
    "valid answer. Severity: blocker = the scene cannot be played as written; problem = players will "
    "stumble or the rules are broken; nit = polish.\n\nCHECKS:\n"
    + "\n".join(f"- {k}: {v}" for k, v in CHECKS.items())
)


def audit(c, path: Path) -> list[dict]:
    sc = S.load(path)
    rules = "\n\n".join(f"# FILE {p.relative_to(ROOT).as_posix()}\n\n{p.read_text(encoding='utf-8')}" for p in RULES)
    scene = f"# SCENE {sc.rel}\n\n{B.sheet(path)}\n\n{moves_text(sc)}"
    resp = c.beta.messages.create(
        model=MODEL, max_tokens=16000,
        betas=["server-side-fallback-2026-07-01"], fallbacks="default",
        output_config={"effort": "high", "format": {"type": "json_schema", "schema": SCHEMA}},
        system=[{"type": "text", "text": SYSTEM},
                {"type": "text", "text": rules, "cache_control": {"type": "ephemeral"}}],   # same for every scene
        messages=[{"role": "user", "content": scene}],
    )
    A.USAGE.add(MODEL, resp.usage)
    if resp.stop_reason == "refusal":
        return [{"category": "integrity", "severity": "blocker", "where": "-", "issue": "the auditor refused", "fix": "-"}]
    text = "".join(b.text for b in resp.content if b.type == "text")
    return json.loads(text)["findings"]


ORDER = {"blocker": 0, "problem": 1, "nit": 2}


def write(path: Path, findings: list[dict]) -> Path:
    rel = path.resolve().relative_to(ROOT)
    out = OUT / rel
    out.parent.mkdir(parents=True, exist_ok=True)
    lines = [f"# Audit: {rel.as_posix()}", "", f"{len(findings)} findings", ""]
    for f in sorted(findings, key=lambda f: (ORDER[f["severity"]], f["category"])):
        lines += [f"## [{f['severity']}] {f['category']}: {f['where']}", "", f"- **Issue:** {f['issue']}",
                  f"- **Fix:** {f['fix']}", ""]
    out.write_text("\n".join(lines), encoding="utf-8", newline="\n")
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("scenes", nargs="*")
    ap.add_argument("--all", action="store_true", help="every location and event")
    args = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")
    paths = [Path(p) for p in args.scenes]
    if args.all:
        paths = sorted(p for k in ("locations", "events") for p in (ROOT / k).rglob("*.md")
                       if not p.name.startswith("_") and p.name != "index.md")
    if not paths:
        ap.error("name scene files, or --all")
    c = A.client()
    summary = []
    for p in paths:
        findings = audit(c, p)
        out = write(p, findings)
        counts = {s: sum(f["severity"] == s for f in findings) for s in ORDER}
        summary.append((p.resolve().relative_to(ROOT).as_posix(), counts))
        print(f"{summary[-1][0]}: {counts['blocker']} blockers, {counts['problem']} problems, {counts['nit']} nits"
              f" -> {out.relative_to(ROOT).as_posix()}", flush=True)
    if len(paths) > 1:
        rows = sorted(summary, key=lambda r: (-r[1]["blocker"], -r[1]["problem"]))
        (OUT / "SUMMARY.md").write_text(
            "# Audit summary\n\n| scene | blockers | problems | nits |\n|---|---|---|---|\n"
            + "\n".join(f"| {s} | {c['blocker']} | {c['problem']} | {c['nit']} |" for s, c in rows) + "\n",
            encoding="utf-8", newline="\n")
    print(f"API: {A.USAGE.calls} calls, {A.USAGE.input} in / {A.USAGE.output} out tokens")
    return 0


if __name__ == "__main__":
    sys.exit(main())
