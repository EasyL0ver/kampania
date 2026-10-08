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

import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Callable, Iterator
from urllib.parse import unquote

REPO_ROOT = Path(__file__).resolve().parent
KINDS = ["characters", "characters/secondary", "events", "locations", "items", "cards"]
SCENE_KINDS = ("characters", "events", "locations", "items", "cards")
SKIP_DIRS = {"world", ".git", "node_modules"}

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


def parse(path: Path) -> MdFile:
    rel = path.relative_to(REPO_ROOT).as_posix()
    # The top folder decides the kind, so subfolders (characters/secondary,
    # events/arrival) are the same kind as their parent.
    kind = path.relative_to(REPO_ROOT).parts[0]
    if kind not in SCENE_KINDS or path.name.startswith("_") or path.name == "index.md":
        kind = "other"     # any other .md: only repo-wide rules apply
    lines = path.read_text(encoding="utf-8").splitlines()
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
        if stripped.startswith("<!--"):
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
    "characters": ["Hook", "Vital Statistics", "Character", "Appearance", "Opinions",
                   "Mechanics", "Opportunities", "Actions", "Bond", "Grudge"],
    "events": ["Trigger", "Hook", "Setup", "Opportunities", "Actions", "Mechanics",
               "Exits", "If Missed"],
    "locations": ["Hook", "Setup", "Opportunities", "Actions", "Mechanics"],
    "items": ["Hook", "Description", "Content", "Mechanics", "Opportunities", "Actions"],
    "cards": ["Card", "Special rules"],
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


@rule("section-order", *SCENE_KINDS, severity="warning")
def section_order(f: MdFile):
    """Template sections appear in template order."""
    allowed = ALLOWED_SECTIONS[f.kind]
    last = -1
    for s in f.sections:
        if s.title not in allowed:
            continue
        idx = allowed.index(s.title)
        if idx < last:
            yield s.line, f"section '## {s.title}' is out of order (template puts it before '## {allowed[last]}')"
        last = max(last, idx)


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


@rule("action-fields", "characters", "events", "locations", "items")
def action_fields(f: MdFile):
    """Every ### action under ## Actions has Outcome, and Gives or Changes (or both)."""
    s = f.section("Actions")
    if s is None:
        return
    for a in s.children:
        present = {m.group(1).strip() for _, t in a.body if (m := ACTION_FIELD.match(t))}
        missing = [x for x in ACTION_FIELDS if x not in present]
        if not present & {"Gives", "Changes"}:
            missing.append("Gives or Changes")
        if missing:
            yield a.line, f"action '{a.title}' is missing: {', '.join(missing)}"


@rule("prompted-by-present", "characters", "events", "locations", "items", severity="warning")
def prompted_by_present(f: MdFile):
    """Every ### action under ## Actions has a Prompted by line."""
    s = f.section("Actions")
    if s is None:
        return
    for a in s.children:
        present = {m.group(1).strip() for _, t in a.body if (m := ACTION_FIELD.match(t))}
        if "Prompted by" not in present:
            yield a.line, f"action '{a.title}' has no Prompted by"


VITAL_FIELD = re.compile(r"^\s*-\s*\*\*([^*:]+):\*\*\s*(.*?)\s*$")
STATUS_FIELDS = {
    # status: (required, forbidden)
    "Resident": (["Born", "Age in 1967", "Lives in", "Settled"], ["Died", "Lived in", "Based in"]),
    "Outsider": (["Born", "Age in 1967", "Based in"], ["Lives in", "Settled", "Died", "Lived in"]),
    "Dead":     (["Born", "Died"], ["Age in 1967", "Lives in", "Settled"]),
}
LOCATION_LINK = re.compile(r"^\[[^\]]+\]\((?:\.\./)+locations/[a-z0-9/-]+\.md\)")


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
    if "Status" not in fields:
        yield s.line, "Vital Statistics has no Status (Resident / Outsider / Dead)"
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
    """## Appearance: required for Residents, optional for everyone else."""
    s = f.section("Vital Statistics")
    status = next((m.group(2) for _, t in (s.body if s else [])
                   if (m := VITAL_FIELD.match(t)) and m.group(1).strip() == "Status"), None)
    appearance = f.section("Appearance")
    if status == "Resident" and appearance is None:
        yield f.title_line or 1, "Status Resident requires a '## Appearance' section"


REQUIRES_FIELD = re.compile(r"^\s*-\s*\*\*Requires:\*\*\s*(.*?)\s*$")
REQ_TOKEN = re.compile(r"\s*(\(|\)|AND\b|OR\b|\[[^\]]+\]\([^)\s]+\))")
REQ_CARD = re.compile(r"^\[[^\]]+\]\(((?:\.\./)*(cards|items)/[a-z0-9-]+\.md|[a-z0-9-]+\.md)\)$")


def _tokenize_requires(value: str):
    """Split into tokens; returns (tokens, None) or (None, the unparseable rest)."""
    tokens, pos = [], 0
    while pos < len(value):
        if value[pos:].strip() == "":
            break
        m = REQ_TOKEN.match(value, pos)
        if not m:
            return None, value[pos:].strip()
        tokens.append(m.group(1))
        pos = m.end()
    return tokens, None


def _parse_requires(tokens: list[str], kind: str, clues: bool = False) -> str | None:
    """Recursive descent: expr := term (OR term)*; term := atom (AND atom)*;
    atom := card/item link (or clue link, if clues) | ( expr ). Returns an error message or None."""
    pos = 0

    def atom():
        nonlocal pos
        if pos >= len(tokens):
            return "expression ends where a card, item or '(' was expected"
        t = tokens[pos]
        if t == "(":
            pos += 1
            err = expr()
            if err:
                return err
            if pos >= len(tokens) or tokens[pos] != ")":
                return "missing ')'"
            pos += 1
            return None
        m = REQ_CARD.match(t)
        if (m and (m.group(2) or kind in ("cards", "items"))) or (clues and REQ_CLUE.match(t)):
            pos += 1
            return None
        return f"'{t}' is not a card{', item or clue' if clues else ' or item'} link (or '(')"

    def chain(sub, op):
        nonlocal pos
        err = sub()
        while not err and pos < len(tokens) and tokens[pos] == op:
            pos += 1
            err = sub()
        return err

    def term():
        return chain(atom, "AND")

    def expr():
        return chain(term, "OR")

    err = expr()
    if not err and pos < len(tokens):
        err = f"unexpected '{tokens[pos]}'"
    return err


REQ_CLUE = re.compile(r"^\[`?([a-z0-9-]+)`?\]\((?:\.\./)*clues/clues\.md#\1\)$")


@rule("requires-format", "characters", "events", "locations", "items")
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
        tokens, rest = _tokenize_requires(value)
        if tokens is None:
            yield line, f"Requires '{value}': cannot read '{rest[:60]}' (only card/item links, AND, OR, parentheses)"
            continue
        err = _parse_requires(tokens, f.kind)
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
OPP_TEXT = re.compile(r"^\s*-\s*\*\*[^*]+\*\*(?:\s*`\([^`]*\)`)*\s*[—:-]\s*(.*?)\s*(?:→\s*Gives:.*)?$")


def rendered(text: str) -> str:
    """Text as a reader sees it: link targets, bold and code marks removed."""
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)
    return re.sub(r"\*\*|`", "", text).strip()


@rule("prose-length", "characters", "events", "locations", "items", severity="warning")
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


NOTICED_TAG = re.compile(r"`\(noticed by:\s*(.*?)\)`")
OLD_REQ_TAG = re.compile(r"`\(requires:")


@rule("noticed-by-format", "characters", "events", "locations", "items")
def noticed_by_format(f: MdFile):
    """Opportunities gate with `(noticed by: ...)` (card/item/clue links, AND, OR, ( )) and `(when: ...)`; never `(requires: ...)`."""
    s = f.section("Opportunities")
    for line, t in (s.body if s else []):
        if OLD_REQ_TAG.search(t):
            yield line, "opportunity uses `(requires: ...)`: split it into `(noticed by: ...)` and `(when: ...)`"
    for line, t in f.lines_with_numbers():
        for value in NOTICED_TAG.findall(t):
            tokens, rest = _tokenize_requires(value)
            if tokens is None:
                yield line, f"noticed by '{value[:80]}': cannot read '{rest[:60]}' (only card/item/clue links, AND, OR, parentheses)"
                continue
            err = _parse_requires(tokens, f.kind, clues=True)
            if err:
                yield line, f"noticed by '{value[:80]}': {err}"


GIVES_FIELD = re.compile(r"^\s*-\s*\*\*Gives:\*\*\s*(.*?)\s*$")
OPP_GIVES = re.compile(r"→\s*Gives:\s*(.*?)\s*(?=→\s*Changes:|$)")
GIVES_JOIN = ", "


CHANGES_FIELD = re.compile(r"^\s*-\s*\*\*Changes:\*\*\s*(.*?)\s*$")
CHANGE_ENTRY = re.compile(r"^\[[^\]]+\]\((?P<path>[^)#\s]*)#(?P<anchor>[^)\s]+)\)(?: — (?P<comment>\S.*))?$")
CHANGE_COMMENT_LIMIT = 80
_mech_anchors: dict[Path, set[str]] = {}


def mechanics_anchors(path: Path) -> set[str]:
    """Heading ids of the ## Mechanics section of a file and every heading inside it."""
    if path not in _mech_anchors:
        f = parse(path)
        ids = set()
        s = f.section("Mechanics")
        stack = [s] if s else []
        while stack:
            sec = stack.pop()
            ids.add(slug(sec.title))
            stack.extend(sec.children)
        _mech_anchors[path] = ids
    return _mech_anchors[path]


@rule("changes-format", "characters", "events", "locations", "items")
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
            e = CHANGE_ENTRY.match(part.strip())
            if not e:
                yield line, f"Changes entry '{part[:70]}' is not `[name](file.md#mechanics-anchor) — comment` or `[name](file.md#bond-check)`"
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
            elif len(comment) > CHANGE_COMMENT_LIMIT:
                yield line, f"Changes comment is {len(comment)} characters (limit {CHANGE_COMMENT_LIMIT})"


@rule("opportunity-no-changes", "characters", "events", "locations", "items")
def opportunity_no_changes(f: MdFile):
    """Opportunities are noticed, never done: they may Give but never carry `→ Changes:`."""
    s = f.section("Opportunities")
    for line, t in (s.body if s else []):
        if "→ Changes:" in t:
            yield line, "an opportunity can't change anything; make it an action, or move the change to the event's Mechanics"


@rule("gives-format", "characters", "events", "locations", "items")
def gives_format(f: MdFile):
    """Gives (action line or opportunity `→ Gives:`) is a ', '-separated list of what the player now holds: clue links, aware: tokens, item and card links."""
    for line, t in f.lines_with_numbers():
        m = GIVES_FIELD.match(t) or OPP_GIVES.search(t)
        if not m:
            continue
        value = m.group(1).rstrip(".")
        if not value:
            yield line, "empty Gives"
            continue
        for part in value.split(GIVES_JOIN):
            part = part.strip()
            item = REQ_CARD.match(part)
            if REQ_CLUE.match(part) or PROMPTED_AWARE.match(part) or (
                    item and (item.group(2) in ("items", "cards") or (not item.group(2) and f.kind in ("items", "cards")))):
                continue
            yield line, f"Gives '{value[:80]}': '{part[:60]}' is not a clue link, aware: token, item or card link (state changes go in Changes)"
            break


PROMPTED_FIELD = re.compile(r"^\s*-\s*\*\*Prompted by:\*\*\s*(.*?)\s*$")
PROMPTED_JOIN = ", "
PROMPTED_CLUE = re.compile(r"^\[`?([a-z0-9-]+)`?\]\((?:\.\./)*clues/clues\.md#([a-z0-9-]+)\)$")
PROMPTED_AWARE = re.compile(r"^aware:(characters|events|locations|items)/[a-z0-9/-]+(?:\.md|/)$")


PROMPTED_TAG = re.compile(r"`\(prompted by:\s*(.*?)\)`", re.IGNORECASE)


@rule("prompted-by-format", "characters", "events", "locations", "items")
def prompted_by_format(f: MdFile):
    """Prompted by (action line or opportunity `(prompted by: ...)` tag) is a ', '-separated list of clue links [clue-id](../clues/clues.md#clue-id) or aware:<kind>/<file>.md tokens."""
    for line, t in f.lines_with_numbers():
        m = PROMPTED_FIELD.match(t)
        values = [m.group(1)] if m else [v.strip() for v in PROMPTED_TAG.findall(t)]
        for value in values:
            yield from _check_prompted(line, value)


def _check_prompted(line: int, value: str):
    if not value:
        yield line, "empty Prompted by (omit it instead)"
        return
    for part in value.split(PROMPTED_JOIN):
        clue = PROMPTED_CLUE.match(part)
        if clue:
            if clue.group(1) != clue.group(2):
                yield line, f"Prompted by: link text '{clue.group(1)}' does not match its anchor '#{clue.group(2)}'"
            continue
        if not PROMPTED_AWARE.match(part):
            yield line, f"Prompted by '{value}': '{part}' is not a clue link or an aware:<kind>/<file>.md token"
            return


COST_FIELD = re.compile(r"^\s*-\s*\*\*Cost:\*\*\s*(.*?)\s*$")
COST_JOIN = " + "
COST_TIME = re.compile(r"^[1-9]\d* time$")
COST_COMPOSURE = re.compile(r"^[1-9]\d* composure$")
COST_ITEM = re.compile(r"^\[[^\]]+\]\(((?:\.\./)*(?:items|cards)/[a-z0-9-]+\.md|[a-z0-9-]+\.md)\)$")


@rule("action-cost", "characters", "events", "locations", "items")
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
AWARE_TOKEN = re.compile(r"aware:([A-Za-z0-9/_.%-]+(?:\.md|/))")
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
    """aware:x/y.md is that file; aware:x/bundle/ is the bundle's default x/bundle/bundle.md."""
    p = unquote(token)
    if p.endswith("/"):
        return REPO_ROOT / p / (p.rstrip("/").split("/")[-1] + ".md")
    return REPO_ROOT / p


@rule("bundles", *SCENE_KINDS)
def bundles(f: MdFile):
    """A subfolder is a bundle: its default is folder/folder.md; every other file says **Part of:** that default, and the default links it."""
    parts = f.path.relative_to(REPO_ROOT).parts
    if len(parts) != 3 or parts[:2] == ("characters", "secondary"):
        return
    folder, default = f.path.parent, f.path.parent / f"{parts[1]}.md"
    if not default.is_file():
        yield 1, f"bundle folder {parts[0]}/{parts[1]}/ has no default file {parts[1]}.md"
        return
    if f.path == default:
        for child in sorted(folder.glob("*.md")):
            if child != default and not any(f"]({child.name}" in t for t in f.lines):
                yield 1, f"bundle default does not link its part {child.name}"
        return
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


HONORIFICS = {"ks.", "por.", "prof.", "kpt.", "dr", "pan", "pani"}


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
                t = p.read_text(encoding="utf-8").splitlines()[0].lstrip("# ").strip()
                if not t:
                    continue
                names.add(t)
                if k == "characters" and not t.startswith("%"):
                    words = [w for w in re.sub(r"\(.*?\)", "", t).split() if w.lower() not in HONORIFICS]
                    if len(words) >= 2:
                        for w in (words[0], words[-1]):
                            alias_owners.setdefault(w, set()).add(t)
        names |= {w for w, owners in alias_owners.items() if len(owners) == 1 and len(w) > 2}
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
    """field label -> how many times it occurs: name (the title), header fields, Vital Statistics bullets."""
    if path not in _fields:
        f = parse(path)
        counts = {"name": 1 if f.title else 0}
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


@rule("alias-only", "characters", "events", "locations", "items", "other", severity="warning")
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
        bare = re.sub(r"aware:\S+|`[^`]*`", lambda m: " " * len(m.group(0)), bare)
        if f.rel == "clues/clues.md" and t.startswith("### "):
            continue          # a clue id may contain aliases
        for alias, pattern in entity_aliases():
            if alias != f.path.stem and pattern.search(bare):
                yield line, f"alias '{alias}' written as text: use [@name](...) to its file"
                bare = pattern.sub(lambda m: " " * len(m.group(0)), bare)
        for title, pattern in entity_titles():
            if title == own:
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
    """Every relative link resolves: the file exists, and a #anchor matches a heading in it. aware:path too."""
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
                yield i, f"aware:{p} points at a file that does not exist"


# --------------------------------------------------------------------------
# Runner
# --------------------------------------------------------------------------

def all_files() -> list[Path]:
    """Every .md in the repo except templates and SKIP_DIRS."""
    return sorted(
        p for p in REPO_ROOT.rglob("*.md")
        if not SKIP_DIRS & set(p.relative_to(REPO_ROOT).parts[:-1])
        and not p.name.startswith("_")
    )


def main(argv: list[str]) -> int:
    if "--rules" in argv:
        if not RULES:
            print("no rules yet")
        for r in RULES:
            print(f"{r.id}  {r.severity}  [{', '.join(sorted(r.kinds)) or 'all'}]  {r.doc}")
        return 0

    paths = [(REPO_ROOT / a).resolve() for a in argv] if argv else all_files()
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
