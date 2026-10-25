"""Load one scene file into moves the test can play.

A scene is the file itself, plus the moves that stay open while it runs:
- a bundle part also carries its bundle default's moves (the default stays open);
- the moves of its Location and of every character in Present (of the file and
  of that default): an event happens at a place, among people. A Present person
  with a condition `(if [Mechanic](#m) is value)` is there, moves open, only while
  that mechanic holds the value. How players see them is the [@setup] refs;
- an item's own actions are open to whoever holds it (playable, not counted).

Every link is resolved to a repo-relative id:
  cards/x.md, items/x.md, clue:<id>, aware:<kind>/<file>.md
and every [@field](file) ref is rendered to its name, so the AI players and the
GM read plain text.
"""
from __future__ import annotations

import os
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
HOOK = re.compile(r"hook:([a-z]+/[a-z0-9/-]+(?:\.md|/))")
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


TARGET = re.compile(r"^\s*\*\(to: .+?\)\*\s*")      # a Gives target names who receives, not what


def refs(text: str, src: Path) -> list[str]:
    """Every card, item, clue and aware id a field value names, in order."""
    text = TARGET.sub("", text)
    out = []
    for _, target in LINK.findall(text):
        r = ref_id(target, src)
        if r and (r.startswith(("cards/", "items/", "clue:"))):
            out.append(r)
    out += ["aware:" + aware_id(t) for t in AWARE.findall(text)]
    out += ["aware:" + aware_id(t) for t in HOOK.findall(text)]   # hook:X = knowing of X (Gives / Prompted by)
    return out                                                    # (setup: needs nothing: the scene shows it)


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
    change_refs: list[str] = field(default_factory=list)   # what Changes links to (mechanics, items)
    prompted: list[str] = field(default_factory=list)   # clue / aware ids
    present_if: tuple[str, str] | None = None   # (mechanic name, value): open only while it holds


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
    parts: list = field(default_factory=list)   # opening_parts()
    present: list[str] = field(default_factory=list)   # who is here, with conditions (GM / tools, not read aloud)

    @property
    def rel(self) -> str:
        return self.path.relative_to(ROOT).as_posix()


PRESENT = re.compile(r"\[@present\]\(([^)#\s]+\.md)\)")


def expand_present(value: str, src: Path) -> str:
    """[@present](character.md) spelled out from its source of truth (schedule here, or the event's Present)."""
    return PRESENT.sub(lambda m: "(" + V.presence_expansion(src.resolve(), (src.parent / unquote(m.group(1))).resolve()) + ")", value)


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
                mv.when = plain(expand_present(value, f.path), f.path)
            elif label == "Cost":
                mv.cost = _cost(value, f.path)
            elif label == "Outcome":
                mv.text = plain(value, f.path)
            elif label == "Gives":
                mv.gives = refs(value, f.path)
            elif label == "Changes":
                mv.changes = plain(value, f.path)
                mv.change_refs = refs(value, f.path)
        out.append(mv)
    return out


def _opportunities(f: V.MdFile) -> list[Move]:
    """Each ### under ## Opportunities: Noticed by (the gate), When, Outcome (what is noticed), Gives."""
    s = f.section("Opportunities")
    out = []
    for o in (s.children if s else []):
        mv = Move(id=f"{f.rel}#{V.slug(o.title)}", kind="opportunity", name=plain(o.title, f.path), src=f.path)
        for _, t in o.body:
            pc = V.PROMPTED_COMMENT.search(t)
            if pc:
                mv.prompted = refs(pc.group(1), f.path)
                continue
            m = FIELD.match(t)
            if not m:
                continue
            label, value = m.group(1).strip(), m.group(2)
            if label == "Noticed by":
                mv.requires = value
            elif label == "When":
                mv.when = plain(expand_present(value, f.path), f.path)
            elif label == "Outcome":
                mv.text = plain(value, f.path)
            elif label == "Gives":
                mv.gives = refs(value, f.path)
            elif label == "Changes":
                mv.changes = plain(value, f.path)
                mv.change_refs = refs(value, f.path)
        out.append(mv)
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


def _bullets(f: V.MdFile, section: str) -> list[str]:
    """A section's lines as a reader sees them: its bullets, or its paragraphs."""
    s = f.section(section)
    lines = [t.strip() for _, t in (s.body if s else []) if t.strip() and not t.strip().startswith("<!--")]
    return [plain(t[2:] if t.startswith("- ") else t, f.path) for t in lines]


def opening_parts(files: list[V.MdFile]) -> list[tuple[str, list[str]]]:
    """The opening in its three parts: (heading, lines) for the place, what is happening, who is here.
    In an event, the people in view are already described in its Setup ([@setup] refs).
    In a location scene, whoever the schedules put there is in view."""
    kind = lambda g: g.rel.split("/")[0]
    scene, rest = files[0], files[1:]
    places = [g for g in rest if kind(g) == "locations"]
    events = [g for g in rest if kind(g) == "events"] + ([scene] if kind(scene) != "locations" else [])
    if kind(scene) == "locations":
        places = [scene] + places
    people = [g for g in rest if kind(g) == "characters"] if kind(scene) == "locations" else []
    return [("The place", [l for g in places for l in _bullets(g, "Setup")]),
            ("What is happening", [l for g in events for l in _bullets(g, "Setup")]),
            ("Who is here", [l for g in people for l in _bullets(g, "Setup")])]   # seen, not yet named


def opening(files: list[V.MdFile]) -> list[str]:
    """What the player is told on arrival, in order: the place, what is happening, who is
    here, as opening_parts() splits it."""
    return [l for _, lines in opening_parts(files) for l in lines]


_schedules: dict[Path, set[Path]] | None = None


def scheduled_at(place: Path) -> set[Path]:
    """Living characters whose Morning / Afternoon / Evening / Night puts them at this place."""
    global _schedules
    if _schedules is None:
        _schedules = {}
        for p in (ROOT / "characters").rglob("*.md"):
            if p.name.startswith("_") or p.name == "index.md":
                continue
            s = V.parse(p).section("Vital Statistics")
            for _, t in (s.body if s else []):
                m = re.match(r"^\s*-\s*\*\*(Morning|Afternoon|Evening|Night):\*\*\s*(.*)$", t)
                for _, target in LINK.findall(m.group(2) if m else ""):
                    _schedules.setdefault((p.parent / target).resolve(), set()).add(p.resolve())
    return _schedules.get(place, set())


def alive(target: str, base: Path, after: str) -> bool:
    """A Present character counts only if alive: no "(dead)" after their link, and Status is not Dead."""
    if re.match(r"\s*\(dead\)", after, re.I):
        return False
    p = (base.parent / unquote(target.split("#")[0])).resolve()
    f = V.parse(p) if p.is_file() else None
    s = f.section("Vital Statistics") if f else None
    return not any(re.match(r"^\s*-\s*\*\*Status:\*\*\s*Dead", t) for _, t in (s.body if s else []))


PRESENT_IF = re.compile(r"\s*\(if \[[^\]]+\]\(([^)\s]+)\) is ([A-Za-z0-9-]+)\)")


def _mechanic_name(src: Path, target: str) -> str:
    """The rendered title of the mechanic a link points at (the referee keys values by it)."""
    path, _, anchor = unquote(target).partition("#")
    f = V.parse((src.parent / path).resolve() if path else src)
    s = f.section("Mechanics")
    for m in (s.children if s else []):
        if V.slug(m.title) == anchor:
            return plain(m.title, f.path)
    return anchor


def tags_of(g: V.MdFile) -> list[V.MdFile]:
    """The tag files a file's **Tags:** header links to."""
    value = g.header.get("Tags", (0, ""))[1]
    out = []
    for _, target in LINK.findall(value):
        t = (g.path.parent / unquote(target)).resolve()
        if t.is_file():
            out.append(V.parse(t))
    return out


def load(path: Path) -> Scene:
    path = path.resolve()
    f = V.parse(path)
    files, seen = [f], {path}

    gates: dict[Path, tuple[str, str]] = {}      # person -> (mechanic name, value) they are present under

    def add(target: str, base: Path) -> Path | None:
        p = (base.parent / unquote(target.split("#")[0])).resolve()
        if p.suffix == ".md" and p.is_file() and p not in seen:
            seen.add(p)
            files.append(V.parse(p))
            return p
        return None

    # The scene stands on its place and its people: their moves are open here too.
    # (One event at a location at a time: no outer event is ever open around it.)
    present: list[str] = []
    for g in list(files):
        for label in ("Location", "Present"):
            value = g.header.get(label, (0, ""))[1]
            for m in LINK.finditer(value):
                target = m.group(2)
                if "locations/" not in target and "characters/" not in target:
                    continue
                if "characters/" in target and not alive(target, g.path, value[m.end():]):
                    continue                     # the dead are here, but nobody to talk to
                p = add(target, g.path)
                cond = PRESENT_IF.match(value[m.end():])
                if p and "characters/" in target and cond:
                    gates[p] = (_mechanic_name(g.path, cond.group(1)), cond.group(2))
                if label == "Present" and "characters/" in target:
                    present.append(plain(m.group(0) + (cond.group(0) if cond else ""), g.path))
    # A location has no Present: whoever's schedule puts them there (any phase) is here.
    # An event's own Present overrides schedules, so this applies to a location scene only.
    for g in files[:1]:
        if g.rel.split("/")[0] == "locations":
            for person in scheduled_at(g.path.resolve()):
                rel = os.path.relpath(person, g.path.parent).replace(os.sep, "/")
                add(rel, g.path)
                present.append(plain(f"[@name]({rel})", g.path) + " (by schedule)")
    moves, mechanics = [], []
    for g in files:
        own = _opportunities(g) + _actions(g)
        names = {V.slug(mv.name) for mv in own}
        mech_names = {m.name for m in _mechanics(g)}
        for t in tags_of(g):                          # a tag's moves are added to whatever it tags,
            own += [mv for mv in _opportunities(t) + _actions(t) if V.slug(mv.name) not in names]   # unless overridden
            mechanics += [m for m in _mechanics(t) if m.name not in mech_names]
        for mv in own:
            mv.present_if = gates.get(g.path.resolve())
        moves += own
        mechanics += _mechanics(g)
    setup = opening(files)
    # Items named anywhere in the scene carry their own actions.
    items = {r.split("#")[0] for mv in moves
             for r in mv.gives + mv.cost + refs(mv.requires, mv.src) + mv.change_refs if r.startswith("items/")}
    item_moves = {}
    for item in sorted(items):
        p = ROOT / item
        if p.is_file():
            g = V.parse(p)
            item_moves[item] = _opportunities(g) + _actions(g)
            mechanics += _mechanics(g)
            for t in tags_of(g):                      # held items carry their tags' moves too
                item_moves[item] += _opportunities(t) + _actions(t)
                mechanics += _mechanics(t)
    return Scene(path=path, title=f.title, setup=setup, moves=moves, mechanics=mechanics, item_moves=item_moves,
                 parts=opening_parts(files), present=present)
