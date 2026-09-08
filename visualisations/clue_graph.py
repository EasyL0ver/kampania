#!/usr/bin/env python3
"""Build an in-memory graph of the campaign's scenes, actions and clues.

Step 1: parse the templated scene files (locations, events, characters, items)
into structured records. Step 2: assemble a dependency graph that answers
"what moves and actions must players do to reach clue X".

This module has NO third-party dependencies. Visualisation is layered on top
of the graph it builds (see clue_graph.json export and the --trace output).

Usage:
    python clue_graph.py --stats            # counts + validation report
    python clue_graph.py --list             # every clue and how many givers
    python clue_graph.py --trace CLUE_ID    # AND-OR backchain to a clue
    python clue_graph.py --json OUT.json    # serialise the whole graph
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass, field, asdict
from pathlib import Path

# --------------------------------------------------------------------------
# Constants
# --------------------------------------------------------------------------

REPO_ROOT = Path(__file__).resolve().parent.parent
SCENE_DIRS = ["locations", "events", "characters", "items"]
CLUES_FILE = REPO_ROOT / "clues" / "clues.md"

# Canonical skill cards (story-facts/game-system.md -> The Cards).
SKILLS = {
    "Alcoholic", "Bureaucracy", "Chainsmoker", "City manners", "Culture",
    "Devotion", "Empathy", "Finesse", "Geology", "Handiwork", "History",
    "Language", "Medicine", "Physique", "Speech", "Superstitious",
    "Survival", "Violence", "Wszywka",
}

# Non-clue outcome types an action can list under Gives.
OUTCOME_KEYWORDS = [
    "NPC State Change", "Item", "Scene Unlock", "World State Change",
    "Ending Progress", "Census data", "Property record",
]

CLUE_REF = re.compile(r"clues\.md#([a-z0-9-]+)")
# "**Synthesis:** a + b" on a clue means: holding all of a, b derives it anywhere,
# independent of any scene. Several Synthesis lines are alternate routes (OR).
SYNTH_FIELD = re.compile(r"^\*\*Synthesis:\*\*\s*(.+)$")
# "NPC Learns:" marks a clue an NPC comes to know. A consumer gates on it by
# writing "<npc>: [clue](clues.md#id)". Node key/label is "<npc>: <clue-id>".
KNOWN_REQ = re.compile(r"([a-z][a-z0-9-]*)\s*:\s*\[[^\]]*\]\([^)]*clues\.md#([a-z0-9-]+)\)")
NPC_PREFIX = re.compile(r"^\s*([a-z][a-z0-9-]*)\s*:")
MD_LINK = re.compile(r"\]\(([^)]+?\.md)(?:#[^)]*)?\)")
H1 = re.compile(r"^#\s+(.*)")
HEADING = re.compile(r"^(#{2,6})\s+(.*)")
FIELD = re.compile(r"\*\*(Requires|Prompted by|Cost|Outcome|Gives):\*\*\s*(.*)")
OPP_NAME = re.compile(r"^\s*-\s*\*\*(.+?)\*\*")
REQ_TAG = re.compile(r"\(requires:\s*(.*?)\)\s*`", re.IGNORECASE)
PROMPT_TAG = re.compile(r"\(prompted by:\s*(.*?)\)\s*`", re.IGNORECASE)
# "aware:<repo-relative-path>.md" is an awareness token: the existence of a
# scene entity (character/item/location/event). It behaves as a pseudo-clue
# whose node id is "awareness:<relpath>". Usable in Requires (hard gate),
# Prompted by (soft breadcrumb) and Gives (grants the awareness).
AWARE_REF = re.compile(r"aware:([A-Za-z0-9/_.-]+\.md)")
SECTION_NAMES = {"opportunities", "actions"}


def _aware_id(relpath: str) -> str:
    return "awareness:" + relpath.strip().replace("\\", "/")


# --------------------------------------------------------------------------
# Data model
# --------------------------------------------------------------------------

@dataclass
class Node:
    """An action or opportunity: a single thing a player can do."""
    id: str
    name: str
    kind: str            # "action" | "opportunity"
    scene: str           # relative path of the file it lives in
    scene_title: str
    requires_raw: str = ""
    requires_skills: list[str] = field(default_factory=list)
    requires_clues: list[str] = field(default_factory=list)
    requires_known: list[list[str]] = field(default_factory=list)   # [npc, clue] gates
    prompted_by_clues: list[str] = field(default_factory=list)   # soft breadcrumbs
    branch_skills: list[str] = field(default_factory=list)   # skills in Outcome branches
    cost: str = ""
    gives_clues: list[str] = field(default_factory=list)
    gives_known: list[list[str]] = field(default_factory=list)   # [npc, clue] flags set
    gives_other: list[str] = field(default_factory=list)
    unlocks_scenes: list[str] = field(default_factory=list)


@dataclass
class Scene:
    path: str            # relative path
    title: str
    kind: str            # locations | events | characters | items
    header: dict = field(default_factory=dict)
    nodes: list[str] = field(default_factory=list)   # node ids


@dataclass
class Graph:
    clues: dict = field(default_factory=dict)        # id -> description
    scenes: dict = field(default_factory=dict)       # path -> Scene
    nodes: dict = field(default_factory=dict)        # id -> Node
    givers: dict = field(default_factory=dict)       # clue id -> [node ids]
    known_givers: dict = field(default_factory=dict) # "npc: clue" -> [node ids]

    def to_serialisable(self) -> dict:
        return {
            "clues": self.clues,
            "scenes": {k: asdict(v) for k, v in self.scenes.items()},
            "nodes": {k: asdict(v) for k, v in self.nodes.items()},
            "givers": self.givers,
            "known_givers": self.known_givers,
        }


# --------------------------------------------------------------------------
# Parsing
# --------------------------------------------------------------------------

def parse_clues() -> dict[str, str]:
    """clues.md -> {clue_id: first-line description}."""
    clues: dict[str, str] = {}
    lines = CLUES_FILE.read_text(encoding="utf-8").splitlines()
    for i, line in enumerate(lines):
        m = re.match(r"^###\s+(\S+)\s*$", line)
        if not m:
            continue
        cid = m.group(1).strip()
        desc = ""
        for j in range(i + 1, len(lines)):
            if lines[j].strip():
                desc = lines[j].strip()
                break
        clues[cid] = desc
    return clues


def parse_synthesis() -> dict[str, list[list[str]]]:
    """clues.md -> {clue_id: [[prereq_id, ...], ...]} (OR of AND-groups)."""
    out: dict[str, list[list[str]]] = {}
    cur = None
    for line in CLUES_FILE.read_text(encoding="utf-8").splitlines():
        m = re.match(r"^###\s+(\S+)\s*$", line)
        if m:
            cur = m.group(1).strip()
            continue
        sm = SYNTH_FIELD.match(line.strip())
        if sm and cur:
            group = [t.strip() for t in sm.group(1).split("+")]
            group = [t for t in group if re.fullmatch(r"[a-z0-9-]+", t)]
            if group:
                out.setdefault(cur, []).append(group)
    return out


def _default_npc(rel: str) -> str:
    """The NPC a character scene is about, used when a Learns line omits one."""
    return Path(rel).stem if rel.startswith("characters/") else "npc"


def parse_gives_known(gives_text: str, rel: str) -> list[list[str]]:
    """Every "NPC Learns: [<npc>:] [clue](clues.md#id)" segment -> [npc, clue]."""
    out = []
    for seg in re.findall(r"NPC Learns:(.*?)(?:;|$)", gives_text):
        m = CLUE_REF.search(seg)
        if not m:
            continue
        pm = NPC_PREFIX.match(seg)
        npc = pm.group(1) if pm else _default_npc(rel)
        out.append([npc, m.group(1)])
    return out


def extract_skills(text: str) -> list[str]:
    found = []
    for skill in SKILLS:
        if re.search(rf"\b{re.escape(skill)}\b", text):
            found.append(skill)
    return sorted(found)


def _scene_targets(text: str, self_path: str) -> list[str]:
    """Resolve .md links in a Gives/Scene-Unlock context to repo-relative paths."""
    out = []
    for rel in MD_LINK.findall(text):
        if "clues/clues.md" in rel or rel.endswith("clues.md"):
            continue
        target = (REPO_ROOT / Path(self_path).parent / rel).resolve()
        try:
            out.append(str(target.relative_to(REPO_ROOT)).replace("\\", "/"))
        except ValueError:
            continue
    return out


def parse_scene(path: Path) -> tuple[Scene, list[Node]]:
    rel = str(path.relative_to(REPO_ROOT)).replace("\\", "/")
    kind = path.parent.name
    lines = path.read_text(encoding="utf-8").splitlines()

    # --- title + preamble header (region before the first ##+ heading) ---
    title = ""
    header: dict[str, str] = {}
    first_heading = len(lines)
    for i, line in enumerate(lines):
        if not title:
            m = H1.match(line)
            if m:
                title = m.group(1).strip()
                continue
        if HEADING.match(line):
            first_heading = i
            break
    for line in lines[:first_heading]:
        hm = re.match(r"^\*\*([A-Za-z ]+):\*\*\s*(.*)", line)
        if hm:
            header.setdefault(hm.group(1).strip(), hm.group(2).strip())

    scene = Scene(path=rel, title=title, kind=kind, header=header)
    nodes: list[Node] = []

    # --- split the rest into heading-delimited blocks ---
    blocks = []  # (level, heading_title, body_lines)
    cur = None
    for line in lines[first_heading:]:
        hm = HEADING.match(line)
        if hm:
            if cur:
                blocks.append(cur)
            cur = [len(hm.group(1)), hm.group(2).strip(), []]
        elif cur:
            cur[2].append(line)
    if cur:
        blocks.append(cur)

    # --- track which blocks sit under an Actions / Opportunities section ---
    section = None          # 'actions' | 'opportunities' | None
    section_level = 0
    seen_names: dict[str, int] = {}

    def uid(name: str) -> str:
        seen_names[name] = seen_names.get(name, 0) + 1
        suffix = "" if seen_names[name] == 1 else f"#{seen_names[name]}"
        return f"{rel}::{name}{suffix}"

    for level, htitle, body in blocks:
        norm = htitle.strip().lower()
        # A bare "Opportunities"/"Actions" heading opens a section wrapper.
        if norm in SECTION_NAMES:
            section = norm
            section_level = level
            if section == "opportunities":
                for bl in body:
                    node = _parse_opportunity(bl, rel, title)
                    if node:
                        node.id = uid(node.name)
                        nodes.append(node)
                        scene.nodes.append(node.id)
            continue
        # Leaving the section: a sibling/parent heading of another kind.
        if section and level <= section_level:
            section = None
        # Opportunity bullets can also hang directly in an Opportunities block
        # split across deeper headings; handled above. Everything else that
        # carries a Gives is an action-like giver, at any nesting depth.
        node = _parse_action_block(htitle, body, rel, title)
        if node is not None:
            node.id = uid(node.name)
            nodes.append(node)
            scene.nodes.append(node.id)

    return scene, nodes


def _parse_opportunity(line: str, rel: str, title: str) -> Node | None:
    if "**" not in line or not line.lstrip().startswith("-"):
        return None
    nm = OPP_NAME.match(line)
    if not nm:
        return None
    name = nm.group(1).strip()
    node = Node(
        id=f"{rel}::{name}", name=name, kind="opportunity",
        scene=rel, scene_title=title,
    )
    req = REQ_TAG.search(line)
    if req:
        node.requires_raw = req.group(1).strip()
        node.requires_skills = extract_skills(node.requires_raw)
        node.requires_known = [[npc, c] for npc, c in KNOWN_REQ.findall(node.requires_raw)]
        known_c = {c for _, c in node.requires_known}
        node.requires_clues = sorted(set(CLUE_REF.findall(node.requires_raw)) - known_c)
        node.requires_clues += sorted({_aware_id(p) for p in AWARE_REF.findall(node.requires_raw)})
    prm = PROMPT_TAG.search(line)
    if prm:
        node.prompted_by_clues = sorted(set(CLUE_REF.findall(prm.group(1))))
        node.prompted_by_clues += sorted({_aware_id(p) for p in AWARE_REF.findall(prm.group(1))})
    gives = line.split("Gives:", 1)[1] if "Gives:" in line else ""
    node.gives_known = parse_gives_known(gives, rel)
    learned_c = {c for _, c in node.gives_known}
    gives_clean = re.sub(r"NPC Learns:.*?(?:;|$)", "", gives)
    node.gives_clues = sorted(set(CLUE_REF.findall(gives_clean)) - learned_c)
    node.gives_clues += sorted({_aware_id(p) for p in AWARE_REF.findall(gives_clean)})
    return node


def _parse_action_block(htitle: str, body: list[str], rel: str, title: str) -> Node | None:
    """A heading block whose body carries fields/Gives is an action giver."""
    req_lines, out_lines, gives_lines, cost_lines, prompt_lines = [], [], [], [], []
    for line in body:
        fm = FIELD.search(line)
        if fm:
            f, txt = fm.group(1).lower(), fm.group(2)
            {"requires": req_lines, "outcome": out_lines,
             "gives": gives_lines, "cost": cost_lines,
             "prompted by": prompt_lines}[f].append(txt)
        elif "Gives:" in line:
            # inline Gives inside a numbered/progressive Outcome step
            gives_lines.append(line.split("Gives:", 1)[1])
        elif out_lines and line.strip():
            out_lines.append(line.strip())

    gives_text = " ".join(gives_lines)
    gives_known = parse_gives_known(gives_text, rel)
    learned_c = {c for _, c in gives_known}
    gives_clean = re.sub(r"NPC Learns:.*?(?:;|$)", "", gives_text)
    gives_clues = sorted(set(CLUE_REF.findall(gives_clean)) - learned_c)
    gives_aware = sorted({_aware_id(p) for p in AWARE_REF.findall(gives_clean)})
    gives_other = [kw for kw in OUTCOME_KEYWORDS if kw in gives_text]
    if not gives_clues and not gives_known and not gives_other and not gives_aware:
        return None

    node = Node(
        id=f"{rel}::{htitle}", name=htitle, kind="action",
        scene=rel, scene_title=title,
    )
    node.requires_raw = " ".join(req_lines).strip()
    node.requires_skills = extract_skills(node.requires_raw)
    node.requires_known = [[npc, c] for npc, c in KNOWN_REQ.findall(node.requires_raw)]
    known_c = {c for _, c in node.requires_known}
    node.requires_clues = sorted(set(CLUE_REF.findall(node.requires_raw)) - known_c)
    node.requires_clues += sorted({_aware_id(p) for p in AWARE_REF.findall(node.requires_raw)})
    prompt_text = " ".join(prompt_lines)
    node.prompted_by_clues = sorted(set(CLUE_REF.findall(prompt_text)))
    node.prompted_by_clues += sorted({_aware_id(p) for p in AWARE_REF.findall(prompt_text)})
    node.branch_skills = sorted(set(extract_skills(" ".join(out_lines))) - set(node.requires_skills))
    node.cost = " ".join(cost_lines).strip()
    node.gives_clues = gives_clues + gives_aware
    node.gives_known = gives_known
    node.gives_other = gives_other
    if "Scene Unlock" in gives_text:
        node.unlocks_scenes = _scene_targets(gives_text, rel)
    return node


# --------------------------------------------------------------------------
# Graph assembly
# --------------------------------------------------------------------------

def build_graph() -> Graph:
    g = Graph()
    g.clues = parse_clues()
    parsed: list = []
    for d in SCENE_DIRS:
        for path in sorted((REPO_ROOT / d).glob("*.md")):
            if path.name.startswith("_"):
                continue
            scene, nodes = parse_scene(path)
            g.scenes[scene.path] = scene
            parsed.append(nodes)

    # A "known" gate ("<npc>: [clue]") is only real when <npc> names an actual
    # character scene. Otherwise the colon is prose ("cross-sections: [clue]")
    # and the clue is an ordinary held-clue requirement, not an NPC-knows flag.
    valid_npcs = {
        Path(s.path).stem for s in g.scenes.values() if s.kind == "characters"
    }

    def _demote(pairs: list, clue_bucket: list) -> list:
        kept = []
        for npc, cid in pairs:
            if npc in valid_npcs:
                kept.append([npc, cid])
            elif cid not in clue_bucket:
                clue_bucket.append(cid)
        return kept

    for nodes in parsed:
        for n in nodes:
            n.requires_known = _demote(n.requires_known, n.requires_clues)
            n.requires_clues = sorted(set(n.requires_clues))
            n.gives_known = _demote(n.gives_known, n.gives_clues)
            n.gives_clues = sorted(set(n.gives_clues))
            g.nodes[n.id] = n
            for cid in n.gives_clues:
                g.givers.setdefault(cid, []).append(n.id)
            for npc, cid in n.gives_known:
                g.known_givers.setdefault(f"{npc}: {cid}", []).append(n.id)

    # Awareness pseudo-clues: the existence of a scene entity. Register every
    # referenced one so trace/validate treat it as a known node; its givers are
    # already collected above (a move that Gives: aware:<path>).
    for n in g.nodes.values():
        for aid in set(n.requires_clues) | set(n.prompted_by_clues) | set(n.gives_clues):
            if aid.startswith("awareness:") and aid not in g.clues:
                relpath = aid.split(":", 1)[1]
                title = g.scenes[relpath].title if relpath in g.scenes else relpath
                g.clues[aid] = f"awareness: {title}"

    # Synthesis: a clue derived from holding other clues, in no particular scene.
    # Each route becomes a virtual giver node whose requires_clues AND together.
    for cid, routes in parse_synthesis().items():
        for idx, group in enumerate(routes):
            suffix = "" if len(routes) == 1 else f"#{idx + 1}"
            nid = f"synthesis::{cid}{suffix}"
            node = Node(
                id=nid, name=f"synthesis: {cid}", kind="synthesis",
                scene="clues/clues.md", scene_title="Clues",
            )
            node.requires_clues = sorted({c for c in group if c != cid})
            node.gives_clues = [cid]
            g.nodes[nid] = node
            g.givers.setdefault(cid, []).append(nid)
    return g


# --------------------------------------------------------------------------
# Queries
# --------------------------------------------------------------------------

def validate(g: Graph) -> dict:
    referenced = set()
    ref_known = set()
    for n in g.nodes.values():
        referenced |= set(n.gives_clues) | set(n.requires_clues)
        ref_known |= {c for _, c in n.gives_known} | {c for _, c in n.requires_known}
    dangling = sorted((referenced | ref_known) - set(g.clues))  # linked but not defined
    aware_missing = sorted({
        aid for n in g.nodes.values()
        for aid in (set(n.requires_clues) | set(n.prompted_by_clues) | set(n.gives_clues))
        if aid.startswith("awareness:") and aid.split(":", 1)[1] not in g.scenes
    })
    dangling = sorted(set(dangling) | set(aware_missing))
    orphans = sorted(c for c in g.clues if c not in g.givers)  # no giver
    return {"dangling": dangling, "orphans": orphans, "referenced": referenced}


def trace(g: Graph, clue: str, _seen: set | None = None, depth: int = 0) -> list[str]:
    """AND-OR backchain: the moves/actions needed to reach `clue`."""
    out: list[str] = []
    pad = "  " * depth
    if clue not in g.clues:
        out.append(f"{pad}? {clue}  (UNKNOWN CLUE)")
        return out
    out.append(f"{pad}* {clue}")
    _seen = _seen or set()
    if clue in _seen:
        out.append(f"{pad}  (cycle)")
        return out
    _seen = _seen | {clue}
    givers = g.givers.get(clue, [])
    if not givers:
        out.append(f"{pad}  <no giver: unreachable>")
        return out
    for nid in givers:
        n = g.nodes[nid]
        gate = []
        if n.requires_skills:
            gate.append("skill: " + "/".join(n.requires_skills))
        if n.branch_skills and not n.requires_skills:
            gate.append("branch: " + "/".join(n.branch_skills))
        if n.cost:
            gate.append(f"cost: {n.cost}")
        tag = f"  [{'; '.join(gate)}]" if gate else ""
        out.append(f"{pad}  OR via {n.kind} \"{n.name}\" @ {n.scene}{tag}")
        for req in n.requires_clues:
            out.extend(trace(g, req, _seen, depth + 2))
        for pc in n.prompted_by_clues:
            if pc not in n.requires_clues:
                out.append(f"{pad}    (prompted by)")
                out.extend(trace(g, pc, _seen, depth + 2))
    return out


# --------------------------------------------------------------------------
# CLI
# --------------------------------------------------------------------------

def cmd_stats(g: Graph):
    v = validate(g)
    n_actions = sum(1 for n in g.nodes.values() if n.kind == "action")
    n_opps = sum(1 for n in g.nodes.values() if n.kind == "opportunity")
    print(f"scenes:        {len(g.scenes)}")
    print(f"clues:         {len(g.clues)}")
    print(f"known (npc):   {len(g.known_givers)}")
    print(f"nodes:         {len(g.nodes)}  (actions {n_actions}, opportunities {n_opps})")
    print(f"clues w/giver: {len(g.givers)}")
    print(f"orphan clues:  {len(v['orphans'])} (no action/opportunity gives them)")
    for c in v["orphans"]:
        print(f"    - {c}")
    print(f"dangling refs: {len(v['dangling'])} (linked but not in clues.md)")
    for c in v["dangling"]:
        print(f"    - {c}")


def cmd_list(g: Graph):
    for cid in sorted(g.clues):
        print(f"{len(g.givers.get(cid, [])):2d}  {cid}")


def main(argv=None):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--stats", action="store_true")
    ap.add_argument("--list", action="store_true")
    ap.add_argument("--trace", metavar="CLUE")
    ap.add_argument("--json", metavar="OUT")
    args = ap.parse_args(argv)

    g = build_graph()

    if args.json:
        Path(args.json).write_text(
            json.dumps(g.to_serialisable(), indent=2, ensure_ascii=False),
            encoding="utf-8",
        )
        print(f"wrote {args.json}")
    if args.trace:
        print("\n".join(trace(g, args.trace)))
    if args.list:
        cmd_list(g)
    if args.stats or not (args.json or args.trace or args.list):
        cmd_stats(g)


if __name__ == "__main__":
    main()
