"""Load one scene file into moves the test can play.

A scene is the file itself, plus the moves that stay open while it runs:
- a bundle part also carries its bundle default's moves (the default stays open);
- the moves of its Location and of every character in Present (of the file and
  of that default): an event happens at a place, among people;
- an item's own actions are open to whoever holds it (playable, not counted).

Every link is resolved to a repo-relative id:
  cards/x.md, items/x.md, clue:<id>, aware:<kind>/<file>.md
and every [@field](file) ref is rendered to its name, so the AI players and the
GM read plain text.
"""
from __future__ import annotations

import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(ROOT / "tools"))
import validate as V  # noqa: E402
import build_names as N  # noqa: E402

LINK = re.compile(r"\[([^\]]*)\]\(([^)\s]+)\)")
AWARE = re.compile(r"aware:([a-z]+/[a-z0-9/-]+(?:\.md|/))")
FIELD = re.compile(r"^\s*-\s*\*\*([^*:]+):\*\*\s*(.*?)\s*$")


# --------------------------------------------------------------------------
# References
# --------------------------------------------------------------------------

def ref_id(target: str, src: Path) -> str | None:
    """A link target, seen from `src`, as a repo-relative id; None for anchors into scenes."""
    path, _, anchor = unquote(target).partition("#")
    dest = (src.parent / path).resolve() if path else src.resolve()
    try:
        rel = dest.relative_to(ROOT).as_posix()
    except ValueError:
        return None
    if rel == "clues/clues.md":
        return f"clue:{anchor}" if anchor else None
    if anchor:
        return f"{rel}#{anchor}"
    return rel


def aware_id(token: str) -> str:
    """aware:x/bundle/ is the bundle default x/bundle/bundle.md."""
    if token.endswith("/"):
        return token + token.rstrip("/").split("/")[-1] + ".md"
    return token


def refs(text: str, src: Path) -> list[str]:
    """Every card, item, clue and aware id a field value names, in order."""
    out = []
    for _, target in LINK.findall(text):
        r = ref_id(target, src)
        if r and (r.startswith(("cards/", "items/", "clue:"))):
            out.append(r)
    out += ["aware:" + aware_id(t) for t in AWARE.findall(text)]
    return out


_table: dict | None = None


def plain(text: str, src: Path) -> str:
    """Render [@field] refs to names, strip links and comments: what a reader sees."""
    global _table
    if _table is None:
        files = [p for k in N.KINDS for p in (ROOT / k).rglob("*.md")
                 if not p.name.startswith("_") and p.name != "index.md"]
        _table = {p.relative_to(ROOT).as_posix(): N.raw_fields(p) for p in files}
    text = re.sub(r"<!--.*?-->", "", text)
    return N.render(text, src.resolve(), _table).strip()


# --------------------------------------------------------------------------
# Moves
# --------------------------------------------------------------------------

@dataclass
class Move:
    id: str                       # file#heading-anchor, or file:opp<n>
    kind: str                     # "action" | "opportunity"
    name: str                     # what the player would say (actions) / first words (opportunities)
    src: Path
    text: str = ""                # Outcome (actions) or the noticed text (opportunities), plain
    requires: str = ""            # raw Requires (actions) or noticed by (opportunities)
    when: str = ""                # raw When, free text for the GM
    cost: list[str] = field(default_factory=list)       # "time:1", "composure:1", or an item/card id
    gives: list[str] = field(default_factory=list)      # card / item / clue / aware ids
    changes: str = ""             # raw Changes, plain, for the GM
    prompted: list[str] = field(default_factory=list)   # clue / aware ids


@dataclass
class Mechanic:
    name: str
    type: str
    per: str = ""
    start: str = ""
    notes: list[str] = field(default_factory=list)


@dataclass
class Scene:
    path: Path
    title: str
    setup: list[str]
    moves: list[Move]
    mechanics: list[Mechanic]
    item_moves: dict[str, list[Move]]   # item id -> its actions (open while held)

    @property
    def rel(self) -> str:
        return self.path.relative_to(ROOT).as_posix()


def _cost(value: str, src: Path) -> list[str]:
    out = []
    for part in value.split(" + "):
        part = part.strip()
        m = re.fullmatch(r"(\d+) (time|composure)", part)
        if m:
            out.append(f"{m.group(2)}:{m.group(1)}")
        else:
            out += refs(part, src)
    return out


def _actions(f: V.MdFile) -> list[Move]:
    s = f.section("Actions")
    out = []
    for a in (s.children if s else []):
        mv = Move(id=f"{f.rel}#{V.slug(a.title)}", kind="action", name=plain(a.title, f.path), src=f.path)
        for _, t in a.body:
            pc = V.PROMPTED_COMMENT.search(t)
            if pc:
                mv.prompted = refs(pc.group(1), f.path)
                continue
            m = FIELD.match(t)
            if not m:
                continue
            label, value = m.group(1).strip(), m.group(2)
            if label == "Requires":
                mv.requires = value
            elif label == "When":
                mv.when = plain(value, f.path)
            elif label == "Cost":
                mv.cost = _cost(value, f.path)
            elif label == "Outcome":
                mv.text = plain(value, f.path)
            elif label == "Gives":
                mv.gives = refs(value, f.path)
            elif label == "Changes":
                mv.changes = plain(value, f.path)
        out.append(mv)
    return out


def _opportunities(f: V.MdFile) -> list[Move]:
    s = f.section("Opportunities")
    out = []
    for line, t in (s.body if s else []):
        m = V.OPP_LINE.match(t)
        if not m or not t.startswith("- "):
            continue
        text = plain(m.group("text"), f.path)
        out.append(Move(
            id=f"{f.rel}:opp{line}", kind="opportunity", name=" ".join(text.split()[:6]) + "…",
            src=f.path, text=text,
            requires=m.group("noticed") or "",
            when=plain(m.group("when") or "", f.path),
            gives=refs(m.group("gives") or "", f.path),
            prompted=refs(m.group("prompted") or "", f.path),
        ))
    return out


def _mechanics(f: V.MdFile) -> list[Mechanic]:
    s = f.section("Mechanics")
    out = []
    for m in (s.children if s else []):
        mech = Mechanic(name=plain(m.title, f.path), type="")
        for _, t in m.body:
            fm = FIELD.match(t)
            if fm and fm.group(1) in ("Type", "Per", "Start"):
                setattr(mech, fm.group(1).lower(), fm.group(2))
            elif t.strip().startswith("- "):
                mech.notes.append(plain(t.strip()[2:], f.path))
        out.append(mech)
    return out


def load(path: Path) -> Scene:
    path = path.resolve()
    f = V.parse(path)
    files, seen = [f], {path}

    def add(target: str, base: Path) -> None:
        p = (base.parent / unquote(target.split("#")[0])).resolve()
        if p.suffix == ".md" and p.is_file() and p not in seen:
            seen.add(p)
            files.append(V.parse(p))

    part_of = f.header.get("Part of")
    if part_of:                              # the bundle default stays open
        for _, target in LINK.findall(part_of[1]):
            add(target, path)
    # The scene stands on its place and its people: their moves are open here too.
    for g in list(files):
        for label in ("Location", "Present"):
            value = g.header.get(label)
            for _, target in LINK.findall(value[1] if value else ""):
                if "/locations/" in "/" + target or "/characters/" in "/" + target or target.startswith(("locations/", "characters/")):
                    add(target, g.path)
    moves, mechanics = [], []
    for g in files:
        moves += _opportunities(g) + _actions(g)
        mechanics += _mechanics(g)
    setup = [plain(t.strip()[2:], path) for _, t in (f.section("Setup").body if f.section("Setup") else [])
             if t.strip().startswith("- ")]
    # Items named anywhere in the scene carry their own actions.
    items = {r for mv in moves for r in mv.gives + mv.cost + refs(mv.requires, mv.src) if r.startswith("items/")}
    item_moves = {}
    for item in sorted(items):
        p = ROOT / item
        if p.is_file():
            g = V.parse(p)
            item_moves[item] = _opportunities(g) + _actions(g)
            mechanics += _mechanics(g)
    return Scene(path=path, title=f.title, setup=setup, moves=moves, mechanics=mechanics, item_moves=item_moves)
