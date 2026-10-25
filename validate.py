#!/usr/bin/env python3
"""Strict validator for the campaign's Markdown files.

The .md files are the source of truth. This script is the contract: if it
reports an error, the repo is broken and must not be pushed.

Rules are added one at a time, each as a function registered with @rule.
A rule receives one parsed file and yields (line, message) pairs.

Usage:
    python validate.py                 # check everything, exit 1 on any error
    python validate.py events/arrival.md characters/barbara.md
    python validate.py --rules         # list the rules in force
"""

from __future__ import annotations

import os
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Callable, Iterator
from urllib.parse import unquote

REPO_ROOT = Path(__file__).resolve().parent
TAGS_DIR = REPO_ROOT / "tags"
KINDS = ["characters", "characters/secondary", "events", "locations", "items", "cards", "tags"]
SCENE_KINDS = ("characters", "events", "locations", "items", "cards", "tags")
VALIDATED = ("characters", "events", "locations", "items", "tags")   # the only folders the validator reads

HEADING = re.compile(r"^(#{1,6})\s+(.*?)\s*$")
HEADER_FIELD = re.compile(r"^\*\*([^*:]+):\*\*\s*(.*)$")


# --------------------------------------------------------------------------
# Parsed file
# --------------------------------------------------------------------------

@dataclass
class Section:
    level: int            # 2 for ##, 3 for ###, ...
    title: str
    line: int             # 1-based line of the heading
    body: list[tuple[int, str]] = field(default_factory=list)   # (line, text)
    children: list["Section"] = field(default_factory=list)


@dataclass
class MdFile:
    path: Path
    rel: str              # repo-relative, forward slashes
    kind: str             # characters | events | locations | items | cards
    lines: list[str]
    title: str = ""
    title_line: int = 0
    header: dict[str, tuple[int, str]] = field(default_factory=dict)  # name -> (line, value)
    sections: list[Section] = field(default_factory=list)            # top-level ## sections

    def lines_with_numbers(self):
        return enumerate(self.lines, start=1)

    def section(self, title: str) -> Section | None:
        for s in self.sections:
            if s.title.lower() == title.lower():
                return s
        return None


# Prompted by is hidden from the rendered page: an HTML comment, on its own line in an
# action, at the end of the line on an opportunity. Tools still read it.
PROMPTED_COMMENT = re.compile(r"<!-- Prompted by: (.*?) -->")


def parse(path: Path) -> MdFile:
    rel = path.relative_to(REPO_ROOT).as_posix()
    # The top folder decides the kind, so subfolders (characters/secondary,
    # events/arrival) are the same kind as their parent.
    kind = path.relative_to(REPO_ROOT).parts[0]
    if kind not in SCENE_KINDS or path.name.startswith("_") or path.name == "index.md":
        kind = "other"     # any other .md: only repo-wide rules apply
    lines = path.read_text(encoding="utf-8-sig").splitlines()
    f = MdFile(path=path, rel=rel, kind=kind, lines=lines)

    stack: list[Section] = []
    in_comment = False
    for i, text in enumerate(lines, start=1):
        # Skip HTML comments (template guidance) when looking for structure.
        stripped = text.strip()
        if in_comment:
            if "-->" in stripped:
                in_comment = False
            continue
        if stripped.startswith("<!--") and not PROMPTED_COMMENT.fullmatch(stripped):
            in_comment = "-->" not in stripped
            continue

        m = HEADING.match(text)
        if m:
            level, title = len(m.group(1)), m.group(2)
            if level == 1:
                if not f.title:
                    f.title, f.title_line = title, i
                continue
            sec = Section(level=level, title=title, line=i)
            while stack and stack[-1].level >= level:
                stack.pop()
            (stack[-1].children if stack else f.sections).append(sec)
            stack.append(sec)
            continue

        if not stack:
            hm = HEADER_FIELD.match(stripped)
            if hm:
                f.header.setdefault(hm.group(1).strip(), (i, hm.group(2).strip()))
        else:
            stack[-1].body.append((i, text))
    return f


# --------------------------------------------------------------------------
# Rule registry
# --------------------------------------------------------------------------

@dataclass
class Rule:
    id: str
    kinds: set[str]       # empty = every kind
    severity: str         # "error" fails the run, "warning" only reports
    doc: str
    check: Callable[[MdFile], Iterator[tuple[int, str]]]


RULES: list[Rule] = []


def rule(rule_id: str, *kinds: str, severity: str = "error"):
    """Register a rule. kinds limits it to those folders; none = all."""
    def wrap(fn):
        RULES.append(Rule(rule_id, set(kinds), severity, (fn.__doc__ or "").strip(), fn))
        return fn
    return wrap


# --------------------------------------------------------------------------
# Rules (added one by one)
# --------------------------------------------------------------------------

# The ## sections each kind may contain, in template order (_template.md).
ALLOWED_SECTIONS = {
    "characters": ["Hook", "Vital Statistics", "Character", "Setup", "Opinions",
                   "Mechanics", "Opportunities", "Actions", "Bond", "Grudge"],
    "events": ["Hook", "Setup", "Opportunities", "Actions", "Mechanics",
               "Resolve"],
    "locations": ["Hook", "Setup", "Opportunities", "Actions", "Mechanics"],
    "items": ["Hook", "Setup", "Content", "Mechanics", "Opportunities", "Actions"],
    "cards": ["Card", "Special rules"],
    "tags": ["Description", "Mechanics", "Opportunities", "Actions"],   # moves added to everything tagged
}


@rule("allowed-sections", *SCENE_KINDS)
def allowed_sections(f: MdFile):
    """Only the template's ## sections, each at most once."""
    allowed = ALLOWED_SECTIONS[f.kind]
    seen = set()
    for s in f.sections:
        if s.title not in allowed:
            yield s.line, f"section '## {s.title}' is not in the {f.kind} template ({', '.join(allowed)})"
        elif s.title in seen:
            yield s.line, f"section '## {s.title}' appears twice"
        seen.add(s.title)


@rule("hook-present", "characters", "events", "locations", "items")
def hook_present(f: MdFile):
    """Every character, event, location and item has a non-empty ## Hook."""
    s = f.section("Hook")
    if s is None:
        yield f.title_line or 1, "missing '## Hook' section"
    elif not any(t.strip() and not t.strip().startswith("<!--") for _, t in s.body):
        yield s.line, "'## Hook' section is empty"


ACTION_FIELDS = ["Outcome"]   # plus Gives and/or Changes; Requires and Cost are absent when empty
ACTION_FIELD = re.compile(r"^\s*-\s*\*\*([^*:]+):\*\*")


_when_refs: set[tuple[Path, str]] | None = None


def when_referenced() -> set[tuple[Path, str]]:
    """(file, action anchor) of every action some move's When names: what it opens is its effect."""
    global _when_refs
    if _when_refs is None:
        _when_refs = set()
        for p in all_files():
            g = parse(p)
            for _, t in g.lines_with_numbers():
                m = WHEN_ACTION_FIELD.match(t)
                for term in (when_terms(m.group(1))[0] if m else []):
                    tm = WHEN_TERM_LINK.match(term.strip())
                    if tm and not tm.group("value"):
                        dest = (p.parent / unquote(tm.group("path"))).resolve() if tm.group("path") else p.resolve()
                        _when_refs.add((dest, tm.group("anchor")))
    return _when_refs


def tag_move_ids(path: Path) -> set[str]:
    """Heading ids of the moves the file's tags add to it. A move in the file with the same heading
    overrides the tag's: the file's version replaces it for this entity."""
    ids = set()
    for tag in carried_tags(path):
        t = parse(tag)
        for name in ("Actions", "Opportunities"):
            s = t.section(name)
            ids |= {slug(c.title) for c in (s.children if s else [])}
    return ids


@rule("action-fields", "characters", "events", "locations", "items", "tags")
def action_fields(f: MdFile):
    """Every ### action under ## Actions has Outcome, and an effect: Gives, Changes, or another move whose
    When names it (opening that move is what the action does)."""
    s = f.section("Actions")
    if s is None:
        return
    overrides = tag_move_ids(f.path)
    for a in s.children:
        present = {m.group(1).strip() for _, t in a.body if (m := ACTION_FIELD.match(t))}
        missing = [x for x in ACTION_FIELDS if x not in present]
        if not present & {"Gives", "Changes"} and slug(a.title) not in overrides                 and (f.path.resolve(), slug(a.title)) not in when_referenced():
            missing.append("Gives or Changes (or a move whose When names it)")
        if missing:
            yield a.line, f"action '{a.title}' is missing: {', '.join(missing)}"


@rule("prompted-by-present", "characters", "events", "locations", "items", "tags", severity="warning")
def prompted_by_present(f: MdFile):
    """Every ### action under ## Actions has a hidden <!-- Prompted by: ... --> line."""
    s = f.section("Actions")
    if s is None:
        return
    for a in s.children:
        if not any(PROMPTED_COMMENT.fullmatch(t.strip()) for _, t in a.body):
            yield a.line, f"action '{a.title}' has no Prompted by"


VITAL_FIELD = re.compile(r"^\s*-\s*\*\*([^*:]+):\*\*\s*(.*?)\s*$")
STATUS_FIELDS = {
    # status: (required, forbidden)
    "Resident": (["Born", "Age in 1967", "Lives in", "Settled"], ["Died", "Lived in", "Based in"]),
    "Outsider": (["Born", "Age in 1967", "Based in"], ["Lives in", "Settled", "Died", "Lived in"]),
    "Dead":     (["Born", "Died"], ["Age in 1967", "Lives in", "Settled"]),
    "Animal":   (["Lives in"], ["Born", "Age in 1967", "Settled", "Died", "Lived in", "Based in"]),   # no names, no dates
}
LOCATION_LINK = re.compile(r"^\[[^\]]+\]\((?:\.\./)+locations/[a-z0-9/-]+\.md\)")


PHASES = ("Morning", "Afternoon", "Evening", "Night")
SCHEDULE_PLACE = r"\[[^\]]+\]\((?:\.\./)+locations/[a-z0-9/-]+\.md\)"
SCHEDULE_VALUE = re.compile(rf"^(away|{SCHEDULE_PLACE}(?:, {SCHEDULE_PLACE})*)$")   # several places: spread across them


@rule("schedule", "characters")
def schedule(f: MdFile):
    """Every living character has Morning / Afternoon / Evening / Night in Vital Statistics:
    one or more location links each (', '-separated: spread across all of them), or `away`. The dead have none."""
    s = f.section("Vital Statistics")
    fields = {m.group(1).strip(): (line, m.group(2)) for line, t in (s.body if s else [])
              if (m := VITAL_FIELD.match(t))}
    dead = fields.get("Status", (0, ""))[1].startswith("Dead")
    for p in PHASES:
        if dead:
            if p in fields:
                yield fields[p][0], f"the dead have no schedule: remove **{p}:**"
        elif p not in fields:
            yield (s.line if s else 1), f"Vital Statistics has no **{p}:** (a location link, or away)"
        elif not SCHEDULE_VALUE.match(fields[p][1]):
            yield fields[p][0], f"**{p}:** must be location links or away, not '{fields[p][1][:50]}'"


@rule("vital-status", "characters")
def vital_status(f: MdFile):
    """Vital Statistics has Status: Resident / Outsider / Dead, and the fields that status requires (and none it forbids)."""
    s = f.section("Vital Statistics")
    if s is None:
        yield f.title_line or 1, "missing '## Vital Statistics' section"
        return
    fields = {}
    for line, t in s.body:
        m = VITAL_FIELD.match(t)
        if m:
            fields.setdefault(m.group(1).strip(), (line, m.group(2)))
    for x in ("First name", "Surname") if fields.get("Status", (0, ""))[1] != "Animal" else ():
        if x not in fields:
            yield s.line, f"Vital Statistics has no {x}"
    if "Status" not in fields:
        yield s.line, "Vital Statistics has no Status (Resident / Outsider / Dead / Animal)"
        return
    line, status = fields["Status"]
    if status not in STATUS_FIELDS:
        yield line, f"Status '{status}' must be one of: {', '.join(STATUS_FIELDS)}"
        return
    required, forbidden = STATUS_FIELDS[status]
    missing = [x for x in required if x not in fields]
    if status == "Dead" and ("Lived in" in fields) == ("Based in" in fields):
        missing.append("exactly one of Lived in / Based in")
    if missing:
        yield s.line, f"Status {status} requires: {', '.join(missing)}"
    for x in forbidden:
        if x in fields:
            yield fields[x][0], f"'{x}' is not allowed for Status {status}"
    for x in ("Lives in", "Lived in") if status != "Outsider" else ():
        if x in fields and not LOCATION_LINK.match(fields[x][1]):
            yield fields[x][0], f"'{x}' must start with a link to a locations/ file"


@rule("appearance-present", "characters")
def appearance_present(f: MdFile):
    """## Setup (how they look when you meet them): required for Residents, optional for everyone else."""
    s = f.section("Vital Statistics")
    status = next((m.group(2) for _, t in (s.body if s else [])
                   if (m := VITAL_FIELD.match(t)) and m.group(1).strip() == "Status"), None)
    appearance = f.section("Setup")
    if status == "Resident" and appearance is None:
        yield f.title_line or 1, "Status Resident requires a '## Setup' section (how they look when you meet them)"


SETUP_LABELLED = re.compile(r"^- \*\*[^*:]+:\*\* ")


@rule("setup-no-bullets", "characters", "events", "locations", "items", severity="warning")
def setup_no_bullets(f: MdFile):
    """## Setup is prose. Only a character's Setup may use bullets, and only labelled ones
    (`- **Clothes:** …`, `- **Hair & face:** …`, `- **Carriage:** …`) before its paragraph."""
    s = f.section("Setup")
    for line, t in (s.body if s else []):
        t = t.strip()
        if not t.startswith(("- ", "* ")):
            continue
        if f.kind == "characters" and SETUP_LABELLED.match(t):
            continue
        yield line, "bullet in ## Setup: write it as prose" + (
            " (a character's Setup allows only labelled bullets, e.g. - **Clothes:** …)" if f.kind == "characters" else "")
        break


WHEN_ACTION_FIELD = re.compile(r"^\s*-\s*\*\*When:\*\*\s*(.*?)\s*$")
WHEN_OPP_TAG = re.compile(r"^- \*\(when: (.*?)\)\*")
WHEN_CARD = re.compile(r"^\[[^\]]+\]\(((?:\.\./)*cards/[a-z0-9-]+\.md)\)$")   # some player holds this card
WHEN_TERM_LINK = re.compile(r"^\[[^\]]+\]\((?P<path>[^)#\s]*)#(?P<anchor>[\w-]+)\)"
                            r"(?: (?P<op>is|<=|>=|<|>) (?P<value>[A-Za-z0-9+-]+))?$")


def action_anchors(path: Path) -> set[str]:
    a = parse(path).section("Actions")
    return {slug(c.title) for c in (a.children if a else [])}


WHEN_LINK = re.compile(r"\[[^\]]*\]\([^)]*\)")
WHEN_OP = re.compile(r"(\(|\)|\bAND\b|\bOR\b|\bNOT\b)")


# --------------------------------------------------------------------------
# Boolean expressions: the one parser for When, Requires, Noticed by and Resolve conditions
# --------------------------------------------------------------------------
# expr := conj (OR conj)* ; conj := factor (AND factor)* ; factor := NOT factor | ( expr ) | term
# A term is the text between operators; a [link](…) is one piece, so parentheses in its text never group.
# Tree: ("or", [...]) | ("and", [...]) | ("not", node) | ("term", text). Each field checks its own terms.

def parse_bool(value: str, allow_not: bool = True) -> tuple[tuple | None, str | None]:
    """The expression's tree, and an error or None."""
    links: list[str] = []
    masked = WHEN_LINK.sub(lambda m: links.append(m.group(0)) or f"§{len(links) - 1}§", value)
    restore = lambda t: re.sub(r"§(\d+)§", lambda m: links[int(m.group(1))], t)
    tokens = [t.strip() for t in WHEN_OP.split(masked) if t.strip()]
    pos = 0

    def peek():
        return tokens[pos] if pos < len(tokens) else None

    def factor():
        nonlocal pos
        t = peek()
        if t is None:
            raise SyntaxError("ends where a term, NOT or '(' was expected")
        if t == "NOT":
            if not allow_not:
                raise SyntaxError("NOT is not allowed here")
            pos += 1
            return ("not", factor())
        if t == "(":
            pos += 1
            node = expr()
            if peek() != ")":
                raise SyntaxError("missing ')'")
            pos += 1
            return node
        if t in ("AND", "OR", ")"):
            raise SyntaxError(f"'{t}' where a term was expected")
        pos += 1
        return ("term", restore(t))

    def chain(sub, op, tag):
        nonlocal pos
        items = [sub()]
        while peek() == op:
            pos += 1
            items.append(sub())
        return items[0] if len(items) == 1 else (tag, items)

    def conj():
        return chain(factor, "AND", "and")

    def expr():
        return chain(conj, "OR", "or")

    if not tokens:
        return None, None
    try:
        tree = expr()
        if pos < len(tokens):
            raise SyntaxError(f"unexpected '{restore(tokens[pos])[:40]}'")
        return tree, None
    except SyntaxError as e:
        return None, str(e)


def bool_terms(tree, negated: bool = False) -> list[tuple[bool, str]]:
    """Every term in the tree, with whether an odd number of NOTs sits above it."""
    if tree is None:
        return []
    kind, val = tree
    if kind == "term":
        return [(negated, val)]
    if kind == "not":
        return bool_terms(val, not negated)
    return [t for sub in val for t in bool_terms(sub, negated)]


def evaluate(tree, holds) -> bool:
    """The tree's truth value, given holds(term_text) -> bool for each term."""
    if tree is None:
        return True
    kind, val = tree
    if kind == "term":
        return holds(val)
    if kind == "not":
        return not evaluate(val, holds)
    results = [evaluate(sub, holds) for sub in val]
    return all(results) if kind == "and" else any(results)


def when_terms(value: str) -> tuple[list[str], str | None]:
    """A When's terms (a negated one prefixed "NOT ") and its grammar error, from parse_bool."""
    tree, err = parse_bool(value)
    return [("NOT " if neg else "") + t for neg, t in bool_terms(tree)], err


PRESENT_TERM = re.compile(r"^\[@present\]\(([^)#\s]*characters/[^)#\s]+\.md)\)$")
_sched: dict[Path, dict[str, list[Path]]] = {}


def schedule_of(char: Path) -> dict[str, list[Path]]:
    """phase -> the places a living character's schedule puts them ([] = away)."""
    if char not in _sched:
        out = {}
        s = parse(char).section("Vital Statistics")
        for _, t in (s.body if s else []):
            m = re.match(r"^\s*-\s*\*\*(Morning|Afternoon|Evening|Night):\*\*\s*(.*)$", t)
            if m:
                out[m.group(1).lower()] = [(char.parent / unquote(lk)).resolve()
                                           for lk in re.findall(r"\]\(([^)#\s]+\.md)\)", m.group(2))]
        _sched[char] = out
    return _sched[char]


def presence(f: MdFile, char: Path) -> tuple[str, list[str] | str | None]:
    """Where [@present](char) is read from, and what it says:
    ("location", [phases the schedule puts them here or inside here]) — in a location file;
    ("event", None | "" | condition) — in an event: not in Present / always / only under that condition;
    ("other", None) — anywhere else."""
    if f.kind == "locations":
        here = f.path.resolve()
        bundle = here.parent if here.stem == here.parent.name else None    # a bundle default covers its folder
        return "location", [ph for ph, locs in schedule_of(char).items()
                            if any(loc == here or (bundle and bundle in loc.parents) for loc in locs)]
    if f.kind == "events":
        line, value = f.header.get("Present", (0, ""))
        for part in re.split(r",\s*", value):
            e = PRESENT_ENTRY.match(part.strip())
            if e and (f.path.parent / unquote(e.group("who"))).resolve() == char:
                cond = re.search(r"\(if (.*)\)$", part.strip())
                return "event", cond.group(1) if cond else ""
        return "event", None
    return "other", None


def presence_expansion(path: Path, char: Path) -> str:
    """[@present](char) spelled out from its source of truth, for the tester and the GM."""
    f = parse(path)
    kind, what = presence(f, char)
    if kind == "location":                            # the time of day is whichever phase event runs
        tag = lambda ph: os.path.relpath(REPO_ROOT / "tags" / f"time-{ph}.md", path.parent).replace(os.sep, "/")
        return " OR ".join(f"[{ph.capitalize()}]({tag(ph)})" for ph in what) or "never"
    if kind == "event":
        return "never" if what is None else (what or "always")
    return "?"


@rule("when-format", "characters", "events", "locations", "items", "tags")
def when_format(f: MdFile):
    """Every When is strict: terms combined with AND, OR and parentheses, each an action link [Action](file.md#anchor)
    (the move opens as that action is taken), a mechanic condition [Mechanic](file.md#anchor) is value
    (ints and enums also take <, <=, >, >=; an enum compares by the order its values are declared in), or
    setup:<own file> (it holds as the scene opens: what the Setup shows), or a card link [Card](cards/x.md)
    (some player holds that card, e.g. a Bond). Nothing else: no prose."""
    for line, t in f.lines_with_numbers():
        m = WHEN_ACTION_FIELD.match(t) or WHEN_OPP_TAG.match(t.strip())
        if not m:
            continue
        value = m.group(1)
        def kind(target: str) -> str | None:
            path, _, anchor = unquote(target).partition("#")
            dest = (f.path.parent / path).resolve() if path else f.path
            if not anchor or not dest.is_file():
                return None
            if anchor in action_anchors(dest):
                return "action"
            if mechanic_kind(dest, anchor):
                return "mechanic"
            return None
        terms, err = when_terms(value)
        if err:
            yield line, f"When: {err}"
        for term in terms:
            negated = term.startswith("NOT ")
            term = term[4:] if negated else term
            pr = PRESENT_TERM.match(term)
            if pr:                                    # [@present](character.md) — read from schedule / Present
                char = (f.path.parent / unquote(pr.group(1))).resolve()
                pkind, what = presence(f, char) if char.is_file() else ("missing", None)
                if pkind == "missing":
                    yield line, f"When '{term[:60]}': no such character"
                elif pkind == "other":
                    yield line, f"When '{term[:60]}': [@present] only reads in a location (schedules) or an event (Present)"
                elif pkind == "location" and not what:
                    yield line, (f"When 'NOT {term[:55]}': their schedule never puts them here, so it always holds"
                                 if negated else f"When '{term[:60]}': their schedule never puts them here")
                elif pkind == "location" and negated and len(what) == len(PHASES):
                    yield line, f"When 'NOT {term[:55]}': their schedule puts them here in every phase"
                elif pkind == "event" and what is None:
                    yield line, f"When '{term[:60]}': not in this event's Present"
                elif pkind == "event" and negated and what == "":
                    yield line, f"When 'NOT {term[:55]}': always present in this event"
                continue
            st = PROMPTED_SETUP.match(term)
            if st:                                    # setup:<own file> — fires as the scene opens
                if st.group(1) != f.rel:
                    yield line, f"When '{term}': setup: names the move's own file ({f.rel})"
                continue
            tagged = TAG_LINK.match(term)
            if tagged:                                # [Tag](tags/x.md) — a running event carries this tag
                tag = (f.path.parent / unquote(tagged.group(1))).resolve()
                if not tag.is_file():
                    yield line, f"When tag '{term[:60]}' does not exist"
                elif "events" not in tag_applies_to(tag):
                    yield line, f"When tag '{term[:60]}': only a tag that applies to events can be running"
                continue
            event = EVENT_LINK.match(term)
            plain = re.match(r"^\[[^\]]+\]\(([^)#\s]+\.md)\)$", term)
            dest = (f.path.parent / unquote(plain.group(1))).resolve() if plain else None
            if event or (dest and dest.is_file() and dest.is_relative_to(REPO_ROOT / "events")):
                # [Event](…/x.md) — that event is running (any relative path that lands in events/)
                if event and not (f.path.parent / unquote(event.group(1))).resolve().is_file():
                    yield line, f"When event '{term[:60]}' does not exist"
                continue
            place = PLACE_LINK.match(term)
            if place:                                 # [Place](locations/x.md) — a player is at (or inside) it
                if not (f.path.parent / unquote(place.group(1))).resolve().is_file():
                    yield line, f"When place '{term[:60]}' does not exist"
                continue
            card = WHEN_CARD.match(term)
            if card:                                  # [Card](cards/x.md) — some player holds it
                if not (f.path.parent / unquote(card.group(1))).resolve().is_file():
                    yield line, f"When card '{term[:60]}' does not exist"
                continue
            tm = WHEN_TERM_LINK.match(term)
            k = kind(f"{tm.group('path')}#{tm.group('anchor')}") if tm else None
            if not tm or k is None:
                yield line, f"When term '{term[:60]}' is not an action link, '[Mechanic](file.md#anchor) is value' or setup:<own file>"
            elif k == "action" and tm.group("value"):
                yield line, f"When term '{term[:60]}': an action link takes no comparison"
            elif k == "mechanic":
                mk = mechanic_kind((f.path.parent / unquote(tm.group("path"))).resolve() if tm.group("path") else f.path,
                                   tm.group("anchor"))
                v = tm.group("value")
                if not v:
                    yield line, f"When term '{term[:60]}': a mechanic needs 'is value' (or <, <=, >, >= for int / enum)"
                elif mk[0] in ("bool", "enum") and v not in mk[1]:
                    yield line, f"When value '{v}' is not one of: {', '.join(mk[1])}"
                elif mk[0] == "int" and not re.fullmatch(r"-?\d+", v):
                    yield line, f"When value '{v}' is not an int"
                elif mk[0] in ("rule", "list"):
                    yield line, f"When term '{term[:60]}': a {mk[0]} mechanic has no value to test"
                elif mk[0] == "bool" and tm.group("op") != "is":
                    yield line, f"When term '{term[:60]}': a bool takes only 'is'"




SELF_PRESENCE = re.compile(r"\b(present|home|here|absent|at the table|in the room)\b", re.I)


@rule("self-presence", "characters", severity="warning")
def self_presence(f: MdFile):
    """A character's own moves are only open while they are there, so a When in their own file that
    checks they are present (a link to this very file plus 'present', 'home', 'absent', …) says nothing."""
    me = f.path.resolve()
    for line, t in f.lines_with_numbers():
        m = WHEN_ACTION_FIELD.match(t)
        if not m:
            continue
        value = m.group(1)
        # where this character is named: a link to this very file, or its alias written out
        ends = [lm.end() for lm in re.finditer(r"\[[^\]]*\]\(([^)#\s]+\.md)\)", value)
                if (f.path.parent / unquote(lm.group(1))).resolve() == me]
        ends += [am.end() for am in re.finditer(rf"\b{re.escape(f.path.stem)}\b", value, re.I)]
        # … followed within a few words by a presence word
        if any(SELF_PRESENCE.match(w) or SELF_PRESENCE.search(" ".join(value[e:].split()[:3])) for e in ends
               for w in [value[e:].strip(" ,;:")]):
            yield line, "When checks this character's own presence: their moves are only open while they are there, so drop that part"


_starts: set[Path] | None = None
GAME_ROOT = "events/committee-visit/committee-visit.md"   # the one event nothing starts


def started_events() -> set[Path]:
    """Every event some action's Changes starts: [Event](file.md) — starts."""
    global _starts
    if _starts is None:
        _starts = set()
        for p in all_files():
            for _, t in parse(p).lines_with_numbers():
                m = CHANGES_FIELD.match(t)
                parts = m.group(1).split("; ") if m else []
                if not m and t.lstrip().startswith("- ") and "→" in t:      # a Resolve line: → [Event](…) — starts
                    parts = [t.split("→", 1)[1]]
                for part in parts:
                    ev = CHANGE_EVENT.match(part.strip())
                    if ev and ev.group("what") == "starts":
                        _starts.add((p.parent / unquote(ev.group("path"))).resolve())
    return _starts


@rule("event-started", "events")
def event_started(f: MdFile):
    """Every event begins because some action's Changes starts it: `[Event](file.md) — starts`.
    (Events have no Available or Trigger: an action starts them, and ends them with `— ends`.)"""
    if f.rel == GAME_ROOT:
        return                                        # the game itself starts the visit
    if f.path.resolve() not in started_events():
        yield f.title_line or 1, "no action starts this event: add `[Event](…) — starts` to the Changes of the action that begins it"


MARKER = re.compile(r"\[\]\(([^)\s]*)#([\w-]+)\)")   # invisible link: [](#anchor) or [](file.md#anchor)


def _markers(text: str, src: Path) -> set[tuple[Path, str]]:
    """(file, anchor) of every invisible link in a text, resolved from src."""
    return {(((src.parent / unquote(path)).resolve() if path else src.resolve()), a) for path, a in MARKER.findall(text)}


def _outcome(path: Path, anchor: str) -> str:
    """The Outcome line(s) of the action at path#anchor ('' if there is none)."""
    a = parse(path).section("Actions")
    for c in (a.children if a else []):
        if slug(c.title) == anchor:
            return " ".join(t for _, t in c.body if t.strip().startswith("- **Outcome:**"))
    return ""


@rule("moves-marked", "characters", "events", "locations", "items")
def moves_marked(f: MdFile):
    """Moves are tied to the exact moment that cues them, by an invisible link to the move:
    - an action Prompted by setup:<own file> -> [](#action-anchor) in this file's ## Setup;
    - an opportunity whose When has setup:<own file> -> [](#its-anchor) in ## Setup; whose When names an
      action -> [](file.md#its-anchor) in that action's Outcome.
    Every invisible link in ## Setup points at a move of this file."""
    me = f.path.resolve()
    setup = f.section("Setup")
    setup_text = " ".join(t for _, t in (setup.body if setup else []))
    in_setup = _markers(setup_text, f.path)
    acts = f.section("Actions")
    act_ids = set()
    for a in (acts.children if acts else []):
        act_ids.add(slug(a.title))
        if any(PROMPTED_COMMENT.fullmatch(t.strip()) and "setup:" in t for _, t in a.body) and (me, slug(a.title)) not in in_setup:
            yield a.line, f"action '{a.title}' is Prompted by setup: but ## Setup has no [](#{slug(a.title)}) at the spot that cues it"
    opps = f.section("Opportunities")
    opp_ids = set()
    for o in (opps.children if opps else []):
        oid = slug(o.title)
        opp_ids.add(oid)
        when = next((m.group(1) for _, t in o.body if (m := WHEN_ACTION_FIELD.match(t))), "")
        for term in when_terms(when)[0]:
            term = term.strip()
            st = PROMPTED_SETUP.match(term)
            if st and st.group(1) == f.rel and (me, oid) not in in_setup:
                yield o.line, f"opportunity '{o.title}' fires on setup: but ## Setup has no [](#{oid}) at the spot it is noticed"
            tm = WHEN_TERM_LINK.match(term)
            if tm and not tm.group("value"):
                target = (f.path.parent / unquote(tm.group("path"))).resolve() if tm.group("path") else me
                if target.is_file() and tm.group("anchor") in action_anchors(target):
                    if (me, oid) not in _markers(_outcome(target, tm.group("anchor")), target):
                        rel = os.path.relpath(me, target.parent).replace(os.sep, "/") if target != me else ""
                        yield o.line, (f"opportunity '{o.title}' fires on '{term[:50]}' but that action's Outcome has no "
                                       f"[]({rel}#{oid}) at the moment it is noticed")
    for line, t in (setup.body if setup else []):
        for dest, anchor in _markers(t, f.path):
            if dest == me and anchor not in act_ids and anchor not in opp_ids:
                yield line, f"[](#{anchor}) in ## Setup does not point at a move in this file"


REQUIRES_FIELD = re.compile(r"^\s*-\s*\*\*Requires:\*\*\s*(.*?)\s*$")
REQ_CARD = re.compile(r"^\[[^\]]+\]\(((?:\.\./)*(cards|items)/[a-z0-9-]+\.md|[a-z0-9-]+\.md)\)$")


def _check_gate(value: str, kind: str, clues: bool = False) -> str | None:
    """Requires / Noticed by: a parse_bool expression (AND, OR, parentheses; no NOT) whose every term is
    a card or item link (or a clue link, if clues). An error message or None."""
    tree, err = parse_bool(value, allow_not=False)
    if err:
        return err
    for _, t in bool_terms(tree):
        tag = TAG_LINK.match(t)
        if tag:                                       # [Tag](tags/x.md): holding an item that carries it
            dest = TAGS_DIR / Path(tag.group(1)).name
            if not dest.is_file():
                return f"tag '{t[:60]}' does not exist"
            if "items" not in tag_applies_to(dest):
                return f"tag '{t[:60]}' does not apply to items, so nothing held can carry it"
            continue
        m = REQ_CARD.match(t)
        if not ((m and (m.group(2) or kind in ("cards", "items"))) or (clues and REQ_CLUE.match(t))):
            return f"'{t[:60]}' is not a card{', item or clue' if clues else ' or item'} link, or an item tag"
    return None


REQ_CLUE = re.compile(r"^\[`?([a-z0-9-]+)`?\]\((?:\.\./)*clues/clues\.md#\1\)$")


@rule("requires-format", "characters", "events", "locations", "items", "tags")
def requires_format(f: MdFile):
    """Requires is a boolean expression over card/item links: AND, OR, ( ). Nothing required = no Requires line."""
    for line, t in f.lines_with_numbers():
        m = REQUIRES_FIELD.match(t)
        if not m:
            continue
        value = m.group(1)
        if not value:
            yield line, "empty Requires (omit the line instead)"
            continue
        err = _check_gate(value, f.kind)
        if err:
            yield line, f"Requires '{value}': {err}"


OPINION_LINE = re.compile(r"^- \*\*(?P<key>\[[^\]]+\]\([^)\s]+\))\*\* — (?P<body>.*)$")
OPINION_BRANCH = re.compile(r"^  - \*\((?P<cond>[^)]+(?:\([^)]*\)[^)]*)*)\):\* (?P<body>.*)$")
OPINION_ENTITY = re.compile(r"^\[[^\]]+\]\((?:\.\./)*(?:(?:characters|locations|items|events)/)?[a-z0-9/-]+\.md\)$")
QUOTED = re.compile(r'^["“].*["”]$')


@rule("opinions-format", "characters")
def opinions_format(f: MdFile):
    """Opinions lines are `- **[entity or clue link]** — "speech"`, with optional `  - *(condition):* "speech"` branches."""
    s = f.section("Opinions")
    if s is None:
        return
    keyed = False
    for line, t in s.body:
        if not t.strip():
            continue
        if "Gives:" in t or "→" in t:
            yield line, "Opinions never give anything (no Gives / →): a reveal belongs in an action or opportunity"
            continue
        m = OPINION_LINE.match(t)
        b = OPINION_BRANCH.match(t)
        if m:
            key = m.group("key")
            if not (OPINION_ENTITY.match(key) or REQ_CLUE.match(key)):
                yield line, f"opinion key {key[:70]} is not a character/location/item/event link or a clue link (text = clue id)"
            keyed = True
        elif b:
            if not keyed:
                yield line, "condition branch with no keyed opinion above it"
        else:
            yield line, 'not an opinion line: expected `- **[entity or clue link]** — "…"` or `  - *(condition):* "…"`'
            continue
        body = (m or b).group("body").strip()
        if not QUOTED.match(body):
            yield line, f'opinion must be spoken words in quotes: {body[:60]}'


PROSE_LIMIT = 250
OUTCOME_FIELD = re.compile(r"^\s*-\s*\*\*Outcome:\*\*\s*(.*?)\s*$")
OPP_LINE = re.compile(
    r"^- (?:\*\(when: (?P<when>.+?)\)\* )?"
    r"(?:\*\(noticed by: (?P<noticed>.+?)\)\* )?"
    r"(?(when)— |(?(noticed)— |))(?P<text>[^`]*?)"
    r"(?: → Gives: (?P<gives>.+?))?"
    r"(?: <!-- Prompted by: (?P<prompted>.+?) -->)?"
    r"(?: <!-- id: (?P<id>[a-z0-9-]+) -->)?$")
OPP_TEXT = re.compile(r"^\s*-\s*(?:\*\((?:when|noticed by):.*?\)\*\s*)*(?:—\s*)?(.*?)\s*(?:→\s*Gives:.*?)?\s*(?:<!--.*-->)?$")


def rendered(text: str) -> str:
    """Text as a reader sees it: link targets, bold and code marks removed."""
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)
    return re.sub(r"\*\*|`", "", text).strip()


@rule("prose-length", "characters", "events", "locations", "items", "tags", severity="warning")
def prose_length(f: MdFile):
    """Prose fields (Outcome, opportunity text, Setup and Hook bullets) are at most PROSE_LIMIT characters as rendered."""
    def check(line, label, text):
        n = len(rendered(text))
        if n > PROSE_LIMIT:
            return line, f"{label} is {n} characters (limit {PROSE_LIMIT})"
    for line, t in f.lines_with_numbers():
        m = OUTCOME_FIELD.match(t)
        if m and (r := check(line, "Outcome", m.group(1))):
            yield r
    s = f.section("Opportunities")
    for line, t in (s.body if s else []):
        m = OPP_TEXT.match(t)
        if m and (r := check(line, "opportunity text", m.group(1))):
            yield r
    for name in ("Setup", "Hook"):
        s = f.section(name)
        for line, t in (s.body if s else []):
            if t.lstrip().startswith("- ") and (r := check(line, f"{name} bullet", t.lstrip()[2:])):
                yield r


NOTICED_TAG = re.compile(r"\*\(noticed by:\s*(.*?)\)\*|^\s*-\s*\*\*Noticed by:\*\*\s*(.*?)\s*$")
OLD_REQ_TAG = re.compile(r"[`*]\(requires:")


@rule("noticed-by-format", "characters", "events", "locations", "items", "tags")
def noticed_by_format(f: MdFile):
    """Opportunities gate with `(noticed by: ...)` (card/item/clue links, AND, OR, ( )) and `(when: ...)`; never `(requires: ...)`."""
    s = f.section("Opportunities")
    for line, t in (s.body if s else []):
        if OLD_REQ_TAG.search(t):
            yield line, "opportunity uses `(requires: ...)`: split it into `(noticed by: ...)` and `(when: ...)`"
    for line, t in f.lines_with_numbers():
        for value in (a or b for a, b in NOTICED_TAG.findall(t)):
            err = _check_gate(value, f.kind, clues=True)
            if err:
                yield line, f"noticed by '{value[:80]}': {err}"


GIVES_FIELD = re.compile(r"^\s*-\s*\*\*Gives:\*\*\s*(.*?)\s*$")
OPP_GIVES = re.compile(r"→\s*Gives:\s*(.*?)\s*(?=→\s*Changes:|<!--|$)")
GIVES_JOIN = ", "
GIVES_TO = re.compile(r"^\*\(to: (.+?)\)\*\s*")      # up to the first ")*": targets hold links
GIVES_HOLDER = re.compile(r"^holder of \[[^\]]+\]\(((?:\.\./)*cards/[a-z0-9-]+\.md)\)$")
GIVES_AT = re.compile(r"^players at (.+)$")
GIVES_LOCATED = re.compile(r"^located:(locations/[a-z0-9/-]+\.md)$")   # knowing the way to a place
PLACE_LINK = re.compile(r"^\[[^\]]+\]\(((?:\.\./)*locations/[\w/-]+\.md)\)$")
GIVES_TARGETS = ("everyone present", "every player")   # no tag: the acting (or noticing) player


CHANGES_FIELD = re.compile(r"^\s*-\s*\*\*Changes:\*\*\s*(.*?)\s*$")
CHANGE_ENTRY = re.compile(r"^\[[^\]]+\]\((?P<path>[^)#\s]*)#(?P<anchor>[^)\s]+)\)(?: — (?P<comment>\S.*))?$")
CHANGE_EVENT = re.compile(r"^\[[^\]]+\]\((?P<path>[^)#\s]+\.md)\) — (?P<what>starts|ends)$")
CHANGE_COMMENT_LIMIT = 80
_mech_anchors: dict[Path, set[str]] = {}


def carried_tags(path: Path) -> list[Path]:
    """The tag files a file carries in its **Tags:** header: their Mechanics, Opportunities and Actions
    are the file's own, so file.md#anchor resolves into them too."""
    if not path.is_file() or path.suffix != ".md" or TAGS_DIR in path.resolve().parents:
        return []
    _, value = parse(path).header.get("Tags", (0, ""))
    out = []
    for part in value.split(", ") if value else []:
        m = TAG_LINK.match(part.strip())
        dest = (path.parent / unquote(m.group(1))).resolve() if m else None
        if dest and dest.is_file():
            out.append(dest)
    return out


def mechanics_anchors(path: Path) -> set[str]:
    """Heading ids of the ## Mechanics section of a file and every heading inside it, its tags' included."""
    if path not in _mech_anchors:
        ids = set()
        for src in [path, *carried_tags(path)]:
            s = parse(src).section("Mechanics")
            stack = [s] if s else []
            while stack:
                sec = stack.pop()
                ids.add(slug(sec.title))
                stack.extend(sec.children)
        _mech_anchors[path] = ids
    return _mech_anchors[path]


@rule("changes-format", "characters", "events", "locations", "items", "tags")
def changes_format(f: MdFile):
    """Changes is a '; '-separated list: `[name](file.md#mechanics-heading) — short comment`, or a bare `[name](file.md#bond-check-anchor)` with no comment."""
    for line, t in f.lines_with_numbers():
        m = CHANGES_FIELD.match(t)
        if not m:
            continue
        value = m.group(1)
        if not value:
            yield line, "empty Changes"
            continue
        for part in value.split("; "):
            ev = CHANGE_EVENT.match(part.strip())
            if ev:                                     # [Event](events/…md) — starts | ends
                dest = (f.path.parent / unquote(ev.group("path"))).resolve()
                if f.kind == "tags" and dest == f.path.resolve():
                    continue                           # a tag naming itself: the tagged event
                if not dest.is_file() or dest.relative_to(REPO_ROOT).parts[0] != "events":
                    yield line, f"Changes entry '{part[:70]}': only an event can start or end"
                continue
            e = CHANGE_ENTRY.match(part.strip())
            if not e:
                yield line, (f"Changes entry '{part[:70]}' is not `[name](file.md#mechanics-anchor) — comment`, "
                             f"`[name](file.md#bond-check)` or `[Event](event.md) — starts | ends`")
                continue
            target = (f.path.parent / unquote(e.group("path"))).resolve() if e.group("path") else f.path
            anchor = e.group("anchor").lower()
            comment = e.group("comment")
            if target.is_file() and anchor in bond_check_anchors(target):
                if comment:
                    yield line, f"Changes bond check '#{e.group('anchor')}' takes no comment: the link alone means the check is met"
                continue
            if target.is_file() and anchor not in mechanics_anchors(target):
                yield line, f"Changes link '#{e.group('anchor')}' is neither a ## Mechanics heading nor a ## Bond check anchor in {target.relative_to(REPO_ROOT).as_posix()}"
            elif not comment:
                yield line, f"Changes mechanic '#{e.group('anchor')}' needs a ` — comment` saying how it changes"
            elif len(rendered(comment)) > CHANGE_COMMENT_LIMIT:
                yield line, f"Changes comment is {len(rendered(comment))} characters (limit {CHANGE_COMMENT_LIMIT})"


MECH_TYPE = re.compile(r"^- \*\*Type:\*\* (bool|int|rule|list|enum \((?P<values>[^()]+)\))$")
MECH_PER = re.compile(r"^- \*\*Per:\*\* (world|player|npc)$")
MECH_START = re.compile(r"^- \*\*Start:\*\* (?P<value>\S.*)$")


@rule("mechanic-type", "characters", "events", "locations", "items", "tags")
def mechanic_type(f: MdFile):
    """Every ### under ## Mechanics opens with `- **Type:** bool | int | rule | list | enum (a | b | …)`;
    bool, int and enum follow it with `- **Per:** world | player | npc` (one value for the game, one per
    player, one per NPC) and `- **Start:** <value legal for the type>`."""
    s = f.section("Mechanics")
    if s is None:
        return
    for line, t in s.body:
        if t.strip():
            yield line, "text directly under ## Mechanics: put it under a ### mechanic"
            break
    for m in s.children:
        body = [(i, t.strip()) for i, t in m.body if t.strip()]
        if not body or not MECH_TYPE.match(body[0][1]):
            yield (body[0][0] if body else m.line), f"mechanic '{m.title}' must open with - **Type:** bool | int | rule | list | enum (a | b | …)"
            continue
        tm = MECH_TYPE.match(body[0][1])
        kind = tm.group(1).split(" ")[0]
        if kind in ("rule", "list"):
            continue
        if len(body) < 2 or not MECH_PER.match(body[1][1]):
            yield body[0][0], f"mechanic '{m.title}' ({kind}) must follow Type with - **Per:** world | player | npc"
            continue
        sm = MECH_START.match(body[2][1]) if len(body) > 2 else None
        if not sm:
            yield body[1][0], f"mechanic '{m.title}' ({kind}) must follow Per with - **Start:** <value>"
            continue
        v = sm.group("value")
        if kind == "bool" and v not in ("true", "false"):
            yield body[2][0], f"Start '{v}' is not a bool (true / false)"
        elif kind == "int" and not re.fullmatch(r"[+-]?\d+", v):
            yield body[2][0], f"Start '{v}' is not an int"
        elif kind == "enum":
            values = [x.strip() for x in tm.group("values").split("|")]
            if v not in values:
                yield body[2][0], f"Start '{v}' is not one of: {', '.join(values)}"


def mechanic_kind(path: Path, anchor: str) -> tuple[str, list[str]] | None:
    """(type, legal values) of the mechanic at path#anchor: bool and enum list their values,
    int / rule / list none. None if there is no such typed mechanic. A carried tag's mechanics count."""
    found = [m for src in [path, *carried_tags(path)]
             for s in [parse(src).section("Mechanics")] for m in (s.children if s else [])]
    for m in found:
        if slug(m.title) != anchor:
            continue
        body = [t.strip() for _, t in m.body if t.strip()]
        tm = MECH_TYPE.match(body[0]) if body else None
        if not tm:
            return None
        kind = tm.group(1).split(" ")[0]
        if kind == "bool":
            return kind, ["true", "false"]
        if kind == "enum":
            return kind, [x.strip() for x in tm.group("values").split("|")]
        return kind, []
    return None


def mechanic_values(path: Path, anchor: str) -> list[str] | None:
    """The legal values of the bool / enum mechanic at path#anchor; None if it is not one."""
    k = mechanic_kind(path, anchor)
    return k[1] if k and k[0] in ("bool", "enum") else None


MECH_REF = r"\[[^\]]+\]\((?P<path{n}>[^)#\s]*)#(?P<anchor{n}>[a-z0-9-]+)\)"
RESOLVE_COND = re.compile(MECH_REF.format(n="") + r" is (?P<value>[A-Za-z0-9+-]+)$")
RESOLVE_SET = re.compile(MECH_REF.format(n="") + r" = (?P<value>[A-Za-z0-9+-]+)$")


@rule("resolve-format", "events")
def resolve_format(f: MdFile):
    """Every ## Resolve line is `- [conditions] → [Mechanic](file.md#anchor) = value` or
    `- [conditions] → [Event](file.md) — starts | ends` (as the event closes, it sets off another): conditions
    are zero or more `[Mechanic](file.md#anchor) is value` joined by ' and '. Only bool / int / enum
    mechanics, legal values (an int also takes +N / -N). Nothing else: no prose, no comments."""
    s = f.section("Resolve")
    if s is None:
        return
    for line, t in s.body:
        t = t.strip()
        if not t or (t.startswith("<!--") and t.endswith("-->")):
            continue
        if not t.startswith("- ") or t.count("→") != 1:
            yield line, f"Resolve line is not `- [conditions] → [Mechanic](file.md#anchor) = value`: {t[:70]}"
            continue
        left, _, right = t[2:].partition("→")
        tree, gerr = parse_bool(left.strip()) if left.strip() else (None, None)
        if gerr:
            yield line, f"Resolve conditions: {gerr}"
            continue
        conds = [("NOT " if neg else "") + c for neg, c in bool_terms(tree)]
        parts = [(c, RESOLVE_COND.match(c), "condition") for c in conds]
        ev = CHANGE_EVENT.match(right.strip())
        if ev:                                         # → [Event](file.md) — starts | ends
            dest = (f.path.parent / unquote(ev.group("path"))).resolve()
            if not dest.is_file() or dest.relative_to(REPO_ROOT).parts[0] != "events":
                yield line, f"Resolve '{right.strip()[:60]}': only an event can start or end"
        else:
            parts.append((right.strip(), RESOLVE_SET.match(right.strip()), "assignment"))
        for text, m, what in parts:
            if not m:
                yield line, f"Resolve {what} '{text[:60]}' is not `[Mechanic](file.md#anchor) {'is' if what == 'condition' else '='} value`"
                continue
            target = (f.path.parent / unquote(m.group("path"))).resolve() if m.group("path") else f.path
            k = mechanic_kind(target, m.group("anchor")) if target.is_file() else None
            v = m.group("value")
            if k is None or k[0] not in ("bool", "int", "enum"):
                yield line, f"Resolve link '#{m.group('anchor')}' is not a bool / int / enum mechanic"
            elif k[0] == "int":
                if not re.fullmatch(r"[+-]?\d+" if what == "assignment" else r"-?\d+", v):
                    yield line, f"Resolve value '{v}' is not an int"
            elif v not in k[1]:
                yield line, f"Resolve value '{v}' is not one of: {', '.join(k[1])}"


PRESENT_ENTRY = re.compile(
    r"^\[[^\]]+\]\((?P<who>[^)\s#]*characters/[^)\s#]+\.md)\)"
    r"(?: \(if (?P<cond>.+)\))?$")


TAG_LINK = re.compile(r"^\[[^\]]+\]\(((?:\.\./)*tags/[a-z0-9-]+\.md)\)$")


EVENT_LINK = re.compile(r"^\[[^\]]+\]\(((?:\.\./)*events/[\w/-]+\.md)\)$")
TAG_KINDS = ("characters", "events", "locations", "items", "cards")


def tag_applies_to(tag: Path) -> list[str]:
    """The kinds a tag's **Applies to:** header allows."""
    return [k.strip() for k in parse(tag).header.get("Applies to", (0, ""))[1].split(",") if k.strip()]


@rule("tag-type", "tags")
def tag_type(f: MdFile):
    """A tag's **Applies to:** names the kinds of entity that may carry it: characters, events, locations,
    items, cards (comma-separated)."""
    line, value = f.header.get("Applies to", (0, ""))
    for k in [k.strip() for k in value.split(",") if k.strip()]:
        if k not in TAG_KINDS:
            yield line, f"Applies to '{k}' is not one of: {', '.join(TAG_KINDS)}"


@rule("tags-format", "characters", "events", "locations", "items", "cards")
def tags_format(f: MdFile):
    """Tags (an optional header on any entity) is a ', '-separated list of links to tags/<tag>.md files that
    exist, each applying to this kind of entity (its **Applies to:**)."""
    line, value = f.header.get("Tags", (0, ""))
    if not line:
        return
    seen = set()
    for part in value.split(", "):
        m = TAG_LINK.match(part.strip())
        if not m:
            yield line, f"Tags entry '{part.strip()[:60]}' is not a [Tag](tags/x.md) link"
            continue
        dest = (f.path.parent / unquote(m.group(1))).resolve()
        if not dest.is_file():
            yield line, f"Tags: no tag file {m.group(1)}"
        elif dest in seen:
            yield line, f"Tags: {m.group(1)} listed twice"
        elif f.kind not in tag_applies_to(dest):
            yield line, f"Tags: {m.group(1)} applies to {', '.join(tag_applies_to(dest)) or 'nothing'}, not {f.kind}"
        seen.add(dest)


@rule("present-format", "events")
def present_format(f: MdFile):
    """Present is a ', '-separated list of character links, each with an optional condition: a boolean
    expression (AND, OR, NOT, parentheses) of mechanic conditions,
    `[Name](file.md) (if [Mechanic](file.md#mechanic) is value AND …)`. No free text."""
    line, value = f.header.get("Present", (0, ""))
    if not line:
        return
    for part in re.split(r"[,;]\s*", value.strip()):
        e = PRESENT_ENTRY.match(part.strip())
        if not e:
            yield line, f"Present entry '{part.strip()[:70]}' is not `[Name](characters/file.md)` with an optional `(if <mechanic conditions>)`"
            continue
        if not e.group("cond"):
            continue
        tree, err = parse_bool(e.group("cond"))
        if err:
            yield line, f"Present condition: {err}"
            continue
        for _, term in bool_terms(tree):
            tm = WHEN_TERM_LINK.match(term)
            target = ((f.path.parent / unquote(tm.group("path"))).resolve() if tm.group("path") else f.path) if tm else None
            mk = mechanic_kind(target, tm.group("anchor")) if tm and target.is_file() else None
            v = tm.group("value") if tm else None
            if not mk or mk[0] in ("rule", "list") or not v:
                yield line, f"Present condition '{term[:60]}' is not '[Mechanic](file.md#anchor) is value'"
            elif mk[0] in ("bool", "enum") and v not in mk[1]:
                yield line, f"Present condition value '{v}' is not one of: {', '.join(mk[1])}"
            elif mk[0] == "int" and not re.fullmatch(r"-?\d+", v):
                yield line, f"Present condition value '{v}' is not an int"
            elif mk[0] == "bool" and tm.group("op") != "is":
                yield line, f"Present condition '{term[:60]}': a bool takes only 'is'"


# Header fields each kind carries between the title and the first ##: (template order, optional ones).
HEADER_FIELDS = {                        # every entity may carry an optional Tags line, last
    "characters": (["Tags"], ["Tags"]),  # no other header: the folder says what it is, the Hook its role
    "events": (["Part of", "Location", "Present", "Tags"], ["Part of", "Present", "Tags"]),
    "locations": (["Tags"], ["Tags"]),   # who is there comes from the characters' schedules
    "items": (["Tags"], ["Tags"]),
    "cards": (["Pool", "Type", "Composure", "Tags"], ["Tags"]),
    "tags": (["Applies to"], []),        # what kind of entity may carry the tag
}
REQUIRED_SECTIONS = {
    "characters": ["Hook", "Vital Statistics", "Character"],
    "events": ["Hook", "Setup"],
    "locations": ["Hook", "Setup"],
    "items": ["Hook", "Setup"],
    "cards": ["Card"],
    "tags": ["Description"],
}
HEADER_LINE = re.compile(r"^\*\*([^*:]+):\*\*\s*\S")


@rule("file-structure", *SCENE_KINDS)
def file_structure(f: MdFile):
    """Line 1 is `# Title`; then only the kind's header fields (`**Label:** value`, template order,
    required ones present); then the template's ## sections in template order, required ones present."""
    if not f.lines or not f.lines[0].startswith("# "):
        yield 1, "line 1 must be the # title"
    known, optional = HEADER_FIELDS[f.kind]
    required = [x for x in known if x not in optional]
    first = f.sections[0].line if f.sections else len(f.lines) + 1
    seen = []
    for i, t in link_lines(f):
        if not (1 < i < first) or not t.strip():
            continue
        m = HEADER_LINE.match(t.strip())
        if not m:
            yield i, f"only header fields may sit between the title and the first ##: '{t.strip()[:60]}'"
        elif m.group(1) not in known:
            yield i, f"**{m.group(1)}:** is not a {f.kind} header field ({', '.join(known) or 'none'})"
        else:
            seen.append(m.group(1))
    for label in required:
        if label not in seen:
            yield f.title_line or 1, f"missing header field **{label}:**"
    order = [known.index(x) for x in seen]
    if order != sorted(order):
        yield f.title_line or 1, f"header fields out of order: {', '.join(seen)} (template: {', '.join(known)})"
    present = [x.title for x in f.sections]
    for name in REQUIRED_SECTIONS[f.kind]:
        if name not in present:
            yield f.title_line or 1, f"missing '## {name}' section"
    allowed = ALLOWED_SECTIONS[f.kind]
    order = [allowed.index(x) for x in present if x in allowed]
    if order != sorted(order):
        yield f.sections[0].line, f"sections out of template order: {', '.join(present)} (template: {', '.join(allowed)})"


OPP_FIELDS = ["Noticed by", "When", "Outcome", "Gives", "Changes"]      # template order; Prompted by is a hidden comment
OPP_REQUIRED = {"When", "Outcome"}
FIELD_LABEL = re.compile(r"^\s*-\s*\*\*([^*:]+):\*\*")


@rule("opportunity-format", "characters", "events", "locations", "items", "tags")
def opportunity_format(f: MdFile):
    """Each opportunity is a ### heading (its anchor), like an action, with fields in this order:
    - **Noticed by:** (optional), - **When:** (required), <!-- Prompted by: … --> (optional),
    - **Outcome:** (required: what is noticed), - **Gives:** (optional), - **Changes:** (optional: what it sets
    off, e.g. an event starting). Nothing else: no Cost, no Requires."""
    s = f.section("Opportunities")
    if s is None:
        return
    for line, t in s.body:
        if t.strip() and not t.strip().startswith("<!--"):
            yield line, "text directly under ## Opportunities: each opportunity is a ### heading with fields"
            break
    for o in s.children:
        labels = []
        for line, t in o.body:
            m = FIELD_LABEL.match(t)
            if m:
                label = m.group(1).strip()
                if label not in OPP_FIELDS:
                    yield line, f"opportunity '{o.title}' has a {label} field (allowed: {', '.join(OPP_FIELDS)})"
                labels.append(label)
            elif t.strip() and not PROMPTED_COMMENT.fullmatch(t.strip()) and not t.strip().startswith("<!--"):
                yield line, f"opportunity '{o.title}': only fields here, no free text"
        for req in sorted(OPP_REQUIRED - set(labels)):
            yield o.line, f"opportunity '{o.title}' has no {req}" + (": every opportunity says when it fires" if req == "When" else "")
        order = [OPP_FIELDS.index(l) for l in labels if l in OPP_FIELDS]
        if order != sorted(order):
            yield o.line, f"opportunity '{o.title}': fields out of order (Noticed by, When, Outcome, Gives, Changes)"


def _check_target(line: int, target: str, f: "MdFile"):
    """A Gives target: every player | everyone present | holder of [Card](cards/x.md) |
    players at [Place](locations/x.md), [Place](…) — whoever is at (or inside) one of those places."""
    if target in GIVES_TARGETS:
        return
    h = GIVES_HOLDER.match(target)
    if h:
        if not (f.path.parent / unquote(h.group(1))).resolve().is_file():
            yield line, f"Gives target card '{h.group(1)}' does not exist"
        return
    at = GIVES_AT.match(target)
    if at:
        for place in at.group(1).split(", "):
            pm = PLACE_LINK.match(place.strip())
            if not pm:
                yield line, f"Gives target place '{place[:50]}' is not a [Place](locations/x.md) link"
            elif not (f.path.parent / unquote(pm.group(1))).resolve().is_file():
                yield line, f"Gives target place '{pm.group(1)}' does not exist"
        return
    yield line, (f"Gives target '{target[:60]}' is not: every player, everyone present, "
                 f"holder of [Card](cards/x.md), or players at [Place](locations/x.md), …")


@rule("gives-format", "characters", "events", "locations", "items", "tags")
def gives_format(f: MdFile):
    """Gives (action line or opportunity `→ Gives:`) is an optional target tag, `*(to: everyone present)*` or
    `*(to: every player)*` (none: the acting / noticing player), then a ', '-separated list of what they
    now hold: clue links, hook: tokens (knowing of an entity), located: tokens (knowing the way to a place,
    locations only, the file must exist), item and card links."""
    for line, t in f.lines_with_numbers():
        m = GIVES_FIELD.match(t) or OPP_GIVES.search(t)
        if not m:
            continue
        value = m.group(1).rstrip(".")
        to = GIVES_TO.match(value)
        if to:
            yield from _check_target(line, to.group(1), f)
            value = value[to.end():]
        if not value:
            yield line, "empty Gives"
            continue
        for part in value.split(GIVES_JOIN):
            part = part.strip()
            item = REQ_CARD.match(part)
            loc = GIVES_LOCATED.match(part)
            if loc:
                if not (REPO_ROOT / loc.group(1)).is_file():
                    yield line, f"Gives '{part[:60]}': no such location"
                continue
            if REQ_CLUE.match(part) or PROMPTED_AWARE.match(part) or (
                    item and (item.group(2) in ("items", "cards") or (not item.group(2) and f.kind in ("items", "cards")))):
                continue
            yield line, f"Gives '{value[:80]}': '{part[:60]}' is not a clue link, hook: token, item or card link (state changes go in Changes)"
            break


PROMPTED_FIELD = re.compile(r"^\s*-\s*\*\*Prompted by:\*\*\s*(.*?)\s*$")
PROMPTED_JOIN = ", "
PROMPTED_CLUE = re.compile(r"^\[`?([a-z0-9-]+)`?\]\((?:\.\./)*clues/clues\.md#([a-z0-9-]+)\)$")
PROMPTED_AWARE = re.compile(r"^hook:(characters|events|locations|items)/[a-z0-9/-]+(?:\.md|/)$")   # a Gives hook: token
PROMPTED_SETUP = re.compile(r"^setup:((?:characters|events|locations|items|tags)/[a-z0-9/-]+\.md)$")   # in a tag: the tagged entity's setup
PROMPTED_HOOK = re.compile(r"^hook:((?:characters|events|locations|items)/[a-z0-9/-]+\.md)$")


PROMPTED_TAG = re.compile(r"[`*]\(prompted by:\s*(.*?)\)[`*]", re.IGNORECASE)


@rule("prompted-by-format", "characters", "events", "locations", "items", "tags")
def prompted_by_format(f: MdFile):
    """Prompted by (hidden <!-- Prompted by: ... -->, own line in an action, line end on an opportunity) is a
    ', '-separated list of clue links [clue-id](../clues/clues.md#clue-id), setup:<file> (cued by what the move's
    own file shows on encounter; it must name that file) or hook:<file> (cued by knowing of another entity)."""
    for line, t in f.lines_with_numbers():
        if PROMPTED_FIELD.match(t) or PROMPTED_TAG.search(t):
            yield line, "Prompted by must be hidden: <!-- Prompted by: ... -->"
        for value in PROMPTED_COMMENT.findall(t):
            yield from _check_prompted(line, value.strip(), f)


def _check_prompted(line: int, value: str, f: "MdFile | None" = None):
    if not value:
        yield line, "empty Prompted by (omit it instead)"
        return
    for part in value.split(PROMPTED_JOIN):
        clue = PROMPTED_CLUE.match(part)
        if clue:
            if clue.group(1) != clue.group(2):
                yield line, f"Prompted by: link text '{clue.group(1)}' does not match its anchor '#{clue.group(2)}'"
            continue
        setup, hook = PROMPTED_SETUP.match(part), PROMPTED_HOOK.match(part)
        if setup:
            if f is not None and setup.group(1) != f.rel:
                yield line, f"Prompted by '{part}': setup: names the move's own file ({f.rel})"
            continue
        if hook:
            if not (REPO_ROOT / hook.group(1)).is_file():
                yield line, f"Prompted by '{part}': {hook.group(1)} does not exist"
            continue
        yield line, f"Prompted by '{value}': '{part}' is not a clue link, setup:<own file> or hook:<kind>/<file>.md"
        return


COST_FIELD = re.compile(r"^\s*-\s*\*\*Cost:\*\*\s*(.*?)\s*$")
COST_JOIN = " + "
COST_TIME = re.compile(r"^[1-9]\d* time$")
COST_COMPOSURE = re.compile(r"^[1-9]\d* composure$")
COST_ITEM = re.compile(r"^\[[^\]]+\]\(((?:\.\./)*(?:items|cards)/[a-z0-9-]+\.md|[a-z0-9-]+\.md)\)$")


@rule("action-cost", "characters", "events", "locations", "items", "tags")
def action_cost(f: MdFile):
    """Cost is 'N time', 'N composure', an [item](items/x.md) link (used up) or a [card](cards/x.md) link (given up), joined by ' + '. Free = no Cost line."""
    for line, t in f.lines_with_numbers():
        m = COST_FIELD.match(t)
        if not m:
            continue
        value = m.group(1)
        if not value:
            yield line, "empty Cost (a free action has no Cost line)"
            continue
        if value.rstrip(".").lower() in ("free", "none", "nothing", "0"):
            yield line, f"Cost '{value}': a free action has no Cost line"
            continue
        for part in value.split(COST_JOIN):
            item = COST_ITEM.match(part)
            if item and ("/" in item.group(1) or f.kind in ("items", "cards")):
                continue
            if not (COST_TIME.match(part) or COST_COMPOSURE.match(part)):
                yield line, f"Cost '{value}': '{part}' is not 'N time', 'N composure', an item link or a card link"
                break


MD_LINK = re.compile(r"!?\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+\"[^\"]*\")?\s*\)")
AWARE_TOKEN = re.compile(r"\bhook:([A-Za-z0-9/_.%-]+(?:\.md|/))")     # knowing of an entity (its Hook)
_anchors: dict[Path, set[str]] = {}


def slug(title: str) -> str:
    """GitHub / kramdown-GFM heading id."""
    t = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", title)     # link text only
    t = re.sub(r"[^\w\- \t]", "", t.strip().lower())
    return re.sub(r"[ \t]", "-", t)


HTML_ANCHOR = re.compile(r'<a id="([a-z0-9-]+)"></a>')


def bond_check_anchors(path: Path) -> set[str]:
    """The invisible <a id> anchors on the checks of a file's ## Bond section."""
    s = parse(path).section("Bond")
    return {a for _, t in (s.body if s else []) for a in HTML_ANCHOR.findall(t)}


def anchors(path: Path) -> set[str]:
    """Every heading id in a markdown file (duplicates get -1, -2, ...)."""
    if path not in _anchors:
        ids, seen = set(), {}
        fence = False
        for line in path.read_text(encoding="utf-8").splitlines():
            if line.lstrip().startswith("```"):
                fence = not fence
                continue
            if not fence:
                ids.update(HTML_ANCHOR.findall(line))
            m = None if fence else HEADING.match(line)
            if m:
                base = slug(m.group(2))
                n = seen.get(base, 0)
                seen[base] = n + 1
                ids.add(base if n == 0 else f"{base}-{n}")
        for tag in carried_tags(path):                  # a tag's moves and mechanics are the file's own
            ids |= anchors(tag)
        _anchors[path] = ids
    return _anchors[path]


def link_lines(f: MdFile):
    """(line, text) with fenced code blocks and HTML comments removed."""
    fence = comment = False
    for i, t in enumerate(f.lines, start=1):
        if t.lstrip().startswith("```"):
            fence = not fence
            continue
        if fence:
            continue
        t = PROMPTED_COMMENT.sub(lambda m: " " + m.group(1) + " ", t)
        out = ""
        while t:
            if comment:
                end = t.find("-->")
                if end < 0:
                    t = ""
                    break
                comment, t = False, t[end + 3:]
            else:
                start = t.find("<!--")
                if start < 0:
                    out, t = out + t, ""
                else:
                    out, t, comment = out + t[:start], t[start + 4:], True
        yield i, out


def aware_target(token: str) -> Path:
    """hook:x/y.md is that file; hook:x/bundle/ is the bundle's default x/bundle/bundle.md."""
    p = unquote(token)
    if p.endswith("/"):
        return REPO_ROOT / p / (p.rstrip("/").split("/")[-1] + ".md")
    return REPO_ROOT / p


@rule("bundles", *SCENE_KINDS)
def bundles(f: MdFile):
    """A subfolder is a bundle: its default is folder/folder.md, and every other file in it says
    **Part of:** that default (locations excepted: their folder says it). Bundles nest: a folder
    inside a bundle is a sub-bundle, whose default is a part of the outer bundle (Part of: ../outer.md)."""
    parts = f.path.relative_to(REPO_ROOT).parts
    if len(parts) < 3 or parts[:2] == ("characters", "secondary"):
        return
    folder = f.path.parent
    default = folder / f"{folder.name}.md"
    if not default.is_file():
        yield 1, f"bundle folder {folder.relative_to(REPO_ROOT).as_posix()}/ has no default file {folder.name}.md"
        return
    if f.path == default:
        if len(parts) > 3 and f.kind != "locations":   # a sub-bundle's default is a part of the outer bundle
            outer = folder.parent / f"{folder.parent.name}.md"
            line, value = f.header.get("Part of", (0, ""))
            if not line:
                yield f.title_line or 1, f"sub-bundle default has no **Part of:** header (should link ../{outer.name})"
            elif f"](../{outer.name})" not in value:
                yield line, f"**Part of:** must link the outer bundle default ../{outer.name}"
        return
    if f.kind == "locations":
        return                                  # a location's bundle is its folder; no header
    line, value = f.header.get("Part of", (0, ""))
    if not line:
        yield f.title_line or 1, f"bundle part has no **Part of:** header (should link {default.name})"
    elif f"]({default.name})" not in value:
        yield line, f"**Part of:** must link the bundle default {default.name}"


CARD_NAMES = sorted((p.read_text(encoding="utf-8").splitlines()[0].lstrip("# ").strip()
                     for p in (REPO_ROOT / "cards").glob("*.md") if not p.name.startswith("_")), key=len, reverse=True)
SETUP_MECHANICS = [
    (re.compile(r"clues\.md#"), "a clue link"),
    (re.compile(r"\]\([^)]*cards/[a-z0-9-]+\.md"), "a card link"),
    (re.compile(r"\*\*(" + "|".join(re.escape(n) for n in CARD_NAMES) + r")\*\*"), "a card name"),
    (re.compile(r"\bcomposure\b", re.I), "composure"),
    (re.compile(r"\b\d+\s+(?:time|cards?|actions?)\b|\bcosts?\b", re.I), "a time cost"),
]


@rule("setup-story-only", "events", "locations")
def setup_story_only(f: MdFile):
    """Setup is story only: no clue links, cards, composure or time costs."""
    s = f.section("Setup")
    for line, t in (s.body if s else []):
        for pattern, what in SETUP_MECHANICS:
            if pattern.search(t):
                yield line, f"Setup contains {what}: {t.strip()[:70]}"
                break


ENTITY_KINDS = ("characters", "locations", "events", "items")
_entity_titles: list[tuple[str, re.Pattern]] | None = None


HONORIFICS = {"ks.", "por.", "prof.", "kpt.", "kpr.", "dr", "pan", "pani"}


_character_names: set[str] = set()
NAME_FIELD_LINE = re.compile(r"^- \*\*(First name|Surname|Nickname|Maiden name|Title):\*\*")


def entity_titles():
    """(name, pattern) for every character, location, event and item title, plus each character's
    first name and surname where only one character has it. Longest first."""
    global _entity_titles
    if _entity_titles is None:
        names, alias_owners = set(), {}
        for k in ENTITY_KINDS:
            for p in (REPO_ROOT / k).rglob("*.md"):
                if p.name.startswith("_") or p.name == "index.md":
                    continue
                text = p.read_text(encoding="utf-8")
                t = text.splitlines()[0].lstrip("# ").strip()
                if not t:
                    continue
                animal = "- **Status:** Animal" in text      # an animal's title is no first-and-last name
                names.add(t)
                if k == "characters":
                    _character_names.add(t)
                if k == "characters" and not t.startswith("%") and not animal:
                    words = [w for w in re.sub(r"\(.*?\)", "", t).split() if w.lower() not in HONORIFICS]
                    if len(words) >= 2:
                        for w in (words[0], words[-1]):
                            alias_owners.setdefault(w, set()).add(t)
        unique = {w for w, owners in alias_owners.items() if len(owners) == 1 and len(w) > 2}
        names |= unique
        _character_names.update(unique)
        _entity_titles = [(n, re.compile(r"(?<![\w%])" + re.escape(n) + r"(?![\w%])"))
                          for n in sorted(names, key=len, reverse=True)]
    return _entity_titles


def prose_fields(f: MdFile):
    """(line, text) of the prose fields: Outcome, opportunity text, Setup and Hook bullets."""
    for line, t in f.lines_with_numbers():
        m = OUTCOME_FIELD.match(t)
        if m:
            yield line, m.group(1)
    s = f.section("Opportunities")
    for line, t in (s.body if s else []):
        m = OPP_TEXT.match(t)
        if m:
            yield line, m.group(1)
    for name in ("Setup", "Hook"):
        s = f.section(name)
        for line, t in (s.body if s else []):
            if t.lstrip().startswith("- "):
                yield line, t.lstrip()[2:]


def field_label(label: str) -> str:
    """`Lives in` -> `lives-in`."""
    return re.sub(r"\s+", "-", label.strip().lower())


_fields: dict[Path, dict[str, int]] = {}


def entity_fields(path: Path) -> dict[str, int]:
    """field label -> how many times it occurs: name (the title), header fields, Vital Statistics bullets,
    and setup (the Setup section, shown by [@setup] as the entity is seen)."""
    if path not in _fields:
        f = parse(path)
        counts = {"name": 1 if f.title else 0}
        s = f.section("Setup")
        if s and any(t.strip() and not t.strip().startswith("<!--") for _, t in s.body):
            counts["setup"] = 1
        h = f.section("Hook")
        if h and any(t.strip() and not t.strip().startswith("<!--") for _, t in h.body):
            counts["hook"] = 1
        if f.kind == "characters":
            counts["present"] = 1                     # [@present](character.md): a When term, read from schedules
        for label in f.header:
            counts[field_label(label)] = counts.get(field_label(label), 0) + 1
        s = f.section("Vital Statistics")
        for _, t in (s.body if s else []):
            m = VITAL_FIELD.match(t)
            if m:
                k = field_label(m.group(1))
                counts[k] = counts.get(k, 0) + 1
        _fields[path] = counts
    return _fields[path]


_aliases: list[tuple[str, re.Pattern]] | None = None


def entity_aliases():
    """(alias, pattern) for every entity id (its file name), matched as a whole word, any case."""
    global _aliases
    if _aliases is None:
        ids = {p.stem for k in ENTITY_KINDS for p in (REPO_ROOT / k).rglob("*.md")
               if not p.name.startswith("_") and p.name != "index.md"}
        _aliases = [(i, re.compile(r"(?<![\w-])" + re.escape(i) + r"(?![\w-])", re.IGNORECASE))
                    for i in sorted(ids, key=len, reverse=True)]
    return _aliases


FIELD_REF = re.compile(r"\[@([a-z0-9-]+)\]\(([^)#\s]+\.md)\)")


@rule("field-refs")
def field_refs(f: MdFile):
    """[@field](target.md) names a field that exists exactly once in the target (name = its title)."""
    for line, t in link_lines(f):
        for field, target in FIELD_REF.findall(t):
            dest = (f.path.parent / unquote(target)).resolve()
            if not dest.is_file():
                continue          # refs-resolve reports it
            n = entity_fields(dest).get(field, 0)
            if n == 0:
                yield line, f"@{field}: {dest.relative_to(REPO_ROOT).as_posix()} has no field '{field}'"
            elif n > 1:
                yield line, f"@{field}: {dest.relative_to(REPO_ROOT).as_posix()} has '{field}' {n} times"


ENTITY_LINK = re.compile(r"\[([^\]]*)\]\(((?:\.\./)*(?:(?:characters|locations|events|items)/)?[a-z0-9/-]+\.md)(#[^)]*)?\)")


@rule("alias-only", "characters", "events", "locations", "items", "tags", "other", severity="warning")
def alias_only(f: MdFile):
    """Outside an entity's own file, it is referred to only as [@field](its-file.md): no hard-coded names."""
    if f.kind == "other" and f.rel != "clues/clues.md":
        return
    own = f.title
    for line, t in link_lines(f):
        for text, target, anchor in ENTITY_LINK.findall(t):
            if anchor:
                continue          # a link to a mechanic or action heading, not the entity itself
            dest = (f.path.parent / unquote(target)).resolve()
            try:
                kind = dest.relative_to(REPO_ROOT).parts[0]
            except ValueError:
                continue
            if kind in ENTITY_KINDS and dest.is_file() and dest != f.path and not text.startswith("@"):
                yield line, f"link '[{text[:40]}]({target})' should read [@name]({target})"
        bare = re.sub(r"\[[^\]]*\]\([^)]*\)", lambda m: " " * len(m.group(0)), t)
        # code spans are masked, but not `(when: …)` / `(noticed by: …)` spans, which are prose
        bare = re.sub(r"(?:aware|setup|hook):\S+|`[^`(][^`]*`", lambda m: " " * len(m.group(0)), bare)
        if f.rel == "clues/clues.md" and t.startswith("### "):
            continue          # a clue id may contain aliases
        if NAME_FIELD_LINE.match(t) or (line == f.title_line and f.kind == "characters"):
            continue          # the name's own source: a character's title and name fields
        heading = t.startswith("#")   # headings are labels: aliases allowed, character names not
        for alias, pattern in entity_aliases():
            if heading:
                bare = pattern.sub(lambda m: " " * len(m.group(0)), bare)
            elif alias != f.path.stem and pattern.search(bare):
                yield line, f"alias '{alias}' written as text: use [@name](...) to its file"
                bare = pattern.sub(lambda m: " " * len(m.group(0)), bare)
        for title, pattern in entity_titles():
            if title == own or (heading and title not in _character_names):
                continue
            if pattern.search(bare):
                yield line, f"'{title}' is written out: use [@name](...) to its file"
                bare = pattern.sub(lambda m: " " * len(m.group(0)), bare)


TODO_MARK = re.compile(r"\b(TBD|TODO)\b", re.IGNORECASE)


@rule("todo-marker", severity="warning")
def todo_marker(f: MdFile):
    """Flags every TBD / TODO left in a file."""
    for line, t in link_lines(f):
        if TODO_MARK.search(t):
            yield line, f"unfinished: {t.strip()[:80]}"


@rule("refs-resolve")
def refs_resolve(f: MdFile):
    """Every relative link resolves: the file exists, and a #anchor matches a heading in it. hook:path too."""
    for i, t in link_lines(f):
        for target in MD_LINK.findall(t):
            if re.match(r"^[a-z][a-z0-9+.-]*:", target, re.I) or target.startswith("/"):
                continue      # http:, mailto:, absolute site paths
            path_part, _, anchor = target.partition("#")
            dest = (f.path.parent / unquote(path_part)).resolve() if path_part else f.path
            if not dest.exists():
                yield i, f"link '{target}': file does not exist"
                continue
            if anchor and dest.suffix == ".md" and unquote(anchor).lower() not in anchors(dest):
                yield i, f"link '{target}': no heading with id '#{anchor}' in {dest.relative_to(REPO_ROOT).as_posix()}"
        for p in AWARE_TOKEN.findall(t):
            if not aware_target(p).is_file():
                yield i, f"hook:{p} points at a file that does not exist"


# --------------------------------------------------------------------------
# Runner
# --------------------------------------------------------------------------

def validated(p: Path) -> bool:
    """Only characters/, events/, locations/ and items/, no templates."""
    try:
        rel = p.resolve().relative_to(REPO_ROOT)
    except ValueError:
        return False
    return rel.parts[0] in VALIDATED and p.suffix == ".md" and not p.name.startswith("_")


def all_files() -> list[Path]:
    """Every .md the validator reads: see validated()."""
    return sorted(p for k in VALIDATED for p in (REPO_ROOT / k).rglob("*.md") if validated(p))


def main(argv: list[str]) -> int:
    if "--rules" in argv:
        if not RULES:
            print("no rules yet")
        for r in RULES:
            print(f"{r.id}  {r.severity}  [{', '.join(sorted(r.kinds)) or 'all'}]  {r.doc}")
        return 0

    paths = [q for q in ((REPO_ROOT / a).resolve() for a in argv) if validated(q)] if argv else all_files()
    counts = {"error": 0, "warning": 0}
    for p in paths:
        f = parse(p)
        for r in RULES:
            if r.kinds and f.kind not in r.kinds:
                continue
            for line, msg in r.check(f):
                print(f"{f.rel}:{line}: {r.severity} [{r.id}] {msg}")
                counts[r.severity] += 1

    errors = counts["error"]
    print(f"\n{len(paths)} files, {len(RULES)} rules, {errors} errors, {counts['warning']} warnings")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(main(sys.argv[1:]))
