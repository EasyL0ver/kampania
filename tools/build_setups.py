#!/usr/bin/env python3
"""Build setups/: every location and event as a player starts it, readable cold.

Each sheet holds:
- The opening, in three parts: the place (each location's Setup), what is happening
  (the scene's own Setup), who
  is here (the [@setup] refs in an event's Setup; schedules in a location). From the scene tester (scene.py).
- What you start with: the cards, items and knowledge the scene needs but does not
  hand out itself, with the prompted-by chain (engine.starting_context()). Every
  reference is spelled out: a clue by its text, an item by its Hook, a place or
  person you know of by its Hook.

All [@field] refs are rendered to names. One file per scene, mirroring the repo:
setups/events/arrival/the-walk.md, ... setups/ is gitignored. It takes ~12 s, so the
edit hook does not run it; run it by hand:
    python tools/build_setups.py
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
from tools.scenetest import engine as E  # noqa: E402
from tools.scenetest import scene as S  # noqa: E402

OUT = ROOT / "setups"
CLUES = ROOT / "clues" / "clues.md"
_clues: dict[str, str] | None = None


def clue_text(cid: str) -> str:
    """A clue's own text, as a reader sees it (its first paragraph)."""
    global _clues
    if _clues is None:
        _clues, current = {}, None
        for line in CLUES.read_text(encoding="utf-8").splitlines():
            m = re.match(r"^### (\S+)$", line)
            if m:
                current = m.group(1)
            elif line.startswith("#"):
                current = None
            elif current and line.strip() and current not in _clues and not line.startswith("**Synthesis"):
                _clues[current] = S.plain(line.strip(), CLUES)
    return _clues.get(cid, cid)


def hook(path: str) -> str:
    """An entity's Hook: what you know of it from having met it or heard of it."""
    p = ROOT / path
    if not p.is_file():
        return path
    f = S.V.parse(p)
    return " ".join(S._bullets(f, "Hook")) or S.plain(f.title, p)


def title(path: str) -> str:
    return S.plain(S.V.parse(ROOT / path).title, ROOT / path) if (ROOT / path).is_file() else path


def sheet(p: Path) -> str:
    sc = S.load(p)
    _, ctx = E.starting_context(sc)
    out = [f"# {S.plain(sc.title, p)}", ""]
    for heading, lines in sc.parts:
        out += [f"## {heading}", ""] + ([f"- {l}" for l in lines] or ["- (nothing)"]) + [""]
    out += ["## Present", ""]
    out += [f"- {x}" for x in sc.present] or ["- nobody"]
    out += ["", "## What you start with", ""]
    out.append(f"- **Skills and cards:** {', '.join(title(c) for c in ctx['cards']) or 'none'}")
    out.append("- **You carry:** " + ("none" if not ctx["items"] else ""))
    out += [f"  - {title(i)}: {hook(i)}" for i in ctx["items"]]
    known = [c for c in ctx["clues"] if c.startswith("aware:")]
    facts = [c for c in ctx["clues"] if c.startswith("clue:")]
    out.append("- **You know of:** " + ("none" if not known else ""))
    out += [f"  - {hook(E.S.aware_id(k[6:]))}" for k in known]
    out.append("- **You know that:** " + ("none" if not facts else ""))
    out += [f"  - {clue_text(c[5:])}" for c in facts]
    return "\n".join(out) + "\n"


def main() -> None:
    files = [p for k in ("locations", "events") for p in (ROOT / k).rglob("*.md")
             if not p.name.startswith("_") and p.name != "index.md"]
    written = set()
    for p in sorted(files):
        out = OUT / p.relative_to(ROOT)
        out.parent.mkdir(parents=True, exist_ok=True)
        body = sheet(p)
        if not out.is_file() or out.read_text(encoding="utf-8") != body:
            out.write_text(body, encoding="utf-8", newline="\n")
        written.add(out)
    for stale in OUT.rglob("*.md"):                     # scenes that no longer exist
        if stale not in written:
            stale.unlink()
    print(f"setups/: {len(written)} scenes")


if __name__ == "__main__":
    main()
