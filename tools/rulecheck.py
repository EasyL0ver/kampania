#!/usr/bin/env python3
"""Cheap AI rule checks: each rule is one narrow yes/no question about one section,
asked of Haiku once per file. A file that breaks the rule is listed, tagged [ai:<rule>].

    python -m tools.rulecheck                       # every rule, every file in scope
    python -m tools.rulecheck --rule location-setup-no-characters
    python -m tools.rulecheck locations/new-village/ciotkas-house/ciotkas-house.md
    python -m tools.rulecheck --list
    python -m tools.rulecheck --suggest ...         # also a suggested rewrite per failing file,
                                                    # written to audits/rules/<rule>/<file> (never applied)

Paid (Haiku), so run by hand only, never from the edit hook. Every call is kept in
audits/rules/calls.jsonl (gitignored), for checking the checker.
"""
from __future__ import annotations

import argparse
import sys
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass
from pathlib import Path

from pydantic import BaseModel

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
from tools.scenetest import agents as A  # noqa: E402
from tools.scenetest import scene as S  # noqa: E402

MODEL = "claude-haiku-5-5"
OUT = ROOT / "audits" / "rules"


@dataclass
class Rule:
    kinds: tuple[str, ...]     # top-level folders the rule applies to
    section: str               # the ## section it reads
    question: str              # what breaks the rule, in one paragraph


RULES = {
    "location-setup-no-characters": Rule(
        kinds=("locations",), section="Setup",
        question=(
            "A location's Setup describes only the place itself: buildings, rooms, furniture, objects, "
            "terrain, weather, light, sound, smell. It breaks the rule if it mentions a person, named or "
            "unnamed: who lives or works there, what anyone does, says, keeps, wears or habitually does "
            "there ('X keeps the house spotless', 'a boy plays in the yard', 'if X is home he limps'), "
            "and any name or description of a specific person anywhere, including names written, carved "
            "or printed on objects (an inscription, a grave, a letter, a journal naming someone). Only "
            "anonymous traces are fine: footprints, a worn path, a lit stove."),
    ),
}


class Verdict(BaseModel):
    breaks_rule: bool


SYSTEM = ("You check one rule on one section of a tabletop RPG design file. You get the rule and the "
          "section's text. Answer only whether the section breaks the rule.")


def section_text(path: Path, name: str) -> str:
    """The section's non-empty, non-comment lines, rendered as a reader sees them."""
    s = S.V.parse(path).section(name)
    lines = [t.strip() for _, t in (s.body if s else [])]
    return "\n".join(S.plain(t, path) for t in lines if t and not t.startswith("<!--"))


SUGGEST_SYSTEM = ("You rewrite one section of a tabletop RPG design file so it follows one rule. Keep "
                  "everything that does not break the rule, word for word where you can; cut or rewrite only "
                  "what breaks it. Keep the markdown bullet format and every [@field](file.md) reference and link "
                  "exactly as written. Output only the rewritten section's lines: no heading, no comments, no "
                  "explanation.")


def raw_section(path: Path, name: str) -> str:
    """The section as written (refs and links intact), without comments."""
    s = S.V.parse(path).section(name)
    lines = [t.rstrip() for _, t in (s.body if s else [])]
    return "\n".join(t for t in lines if t.strip() and not t.strip().startswith("<!--"))


def suggest(c, rule_id: str, path: Path) -> Path:
    """Ask for a rewrite of the section; write before/after to audits/rules/<rule>/<file>. Never applied."""
    rule = RULES[rule_id]
    before = raw_section(path, rule.section)
    msg = f"RULE: {rule.question}\n\nSECTION ## {rule.section}:\n\n{before}"
    resp = c.messages.create(
        model=MODEL, max_tokens=4000, output_config={"effort": "low"},
        system=SUGGEST_SYSTEM, messages=[{"role": "user", "content": msg}])
    A.record(f"suggest:{rule_id}", MODEL, SUGGEST_SYSTEM, [{"role": "user", "content": msg}], resp)
    after = A._text(resp)
    rel = path.relative_to(ROOT).as_posix()
    out = OUT / rule_id / rel
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(f"# {rel}: ## {rule.section}\n\n## Before\n\n{before}\n\n## Suggested\n\n{after}\n",
                   encoding="utf-8")
    return out


def check(c, rule_id: str, path: Path, want_suggestion: bool = False) -> str | None:
    """The finding line if the file breaks the rule, else None. With want_suggestion, also a rewrite."""
    rule = RULES[rule_id]
    text = section_text(path, rule.section)
    if not text:
        return None
    msg = f"RULE: {rule.question}\n\nSECTION ## {rule.section}:\n\n{text}"
    resp = c.messages.parse(
        model=MODEL, max_tokens=2000, output_config={"effort": "low"},
        system=SYSTEM, messages=[{"role": "user", "content": msg}], output_format=Verdict)
    A.record(f"rule:{rule_id}", MODEL, SYSTEM, [{"role": "user", "content": msg}], resp)
    rel = path.relative_to(ROOT).as_posix()
    if resp.parsed_output is None:                  # no verdict (e.g. ran out of tokens): say so, never guess
        return f"{rel}: [ai:{rule_id}] NO VERDICT ({resp.stop_reason})"
    if not resp.parsed_output.breaks_rule:
        return None
    if want_suggestion:
        return f"{rel}: [ai:{rule_id}] -> {suggest(c, rule_id, path).relative_to(ROOT).as_posix()}"
    return f"{rel}: [ai:{rule_id}]"


def in_scope(rule: Rule, path: Path) -> bool:
    rel = path.resolve().relative_to(ROOT)
    return rel.parts[0] in rule.kinds and not path.name.startswith("_") and path.name != "index.md"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("files", nargs="*")
    ap.add_argument("--rule", action="append", choices=sorted(RULES), help="run only this rule (repeatable)")
    ap.add_argument("--list", action="store_true", help="list the rules")
    ap.add_argument("--suggest", action="store_true", help="for each file that breaks a rule, also ask for a rewrite")
    args = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")
    if args.list:
        for k, r in RULES.items():
            print(f"{k}  [{', '.join(r.kinds)} / ## {r.section}]  {r.question}")
        return 0

    jobs = []
    for rid in args.rule or sorted(RULES):
        rule = RULES[rid]
        paths = ([(ROOT / f).resolve() for f in args.files] if args.files
                 else sorted(p for k in rule.kinds for p in (ROOT / k).rglob("*.md")))
        jobs += [(rid, p) for p in paths if in_scope(rule, p)]

    OUT.mkdir(parents=True, exist_ok=True)
    A.LOG_PATH = OUT / "calls.jsonl"
    c = A.client()
    with ThreadPoolExecutor(max_workers=8) as pool:
        findings = sorted(f for f in pool.map(lambda j: check(c, *j, want_suggestion=args.suggest), jobs) if f)
    for f in findings:
        print(f)
    print(f"\n{len(jobs)} checks, {len(findings)} break a rule | API: {A.USAGE.calls} calls, "
          f"{A.USAGE.input} in / {A.USAGE.output} out tokens")
    return 1 if findings else 0


if __name__ == "__main__":
    sys.exit(main())
