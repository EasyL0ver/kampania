#!/usr/bin/env python3
"""Build setups/: the full opening of every location and event, as a player hears it.

The opening is the scene tester's (tools/scenetest/scene.py, opening()): the place
(each location's Setup), the active events (an outer event when Available says
"During", then the scene's own Setup), then who is here (each Present character's
Hook), with every [@field] ref rendered to its name.

One file per scene, mirroring the repo: setups/events/arrival/the-walk.md, ...
setups/ is gitignored and rebuilt by the edit hook. Run by hand:
    python tools/build_setups.py
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
from tools.scenetest import scene as S  # noqa: E402

OUT = ROOT / "setups"


def main() -> None:
    files = [p for k in ("locations", "events") for p in (ROOT / k).rglob("*.md")
             if not p.name.startswith("_") and p.name != "index.md"]
    written = set()
    for p in sorted(files):
        sc = S.load(p)
        rel = p.relative_to(ROOT)
        out = OUT / rel
        out.parent.mkdir(parents=True, exist_ok=True)
        body = f"# {S.plain(sc.title, p)}\n\n" + "\n".join(f"- {line}" for line in sc.setup) + "\n"
        if not out.is_file() or out.read_text(encoding="utf-8") != body:
            out.write_text(body, encoding="utf-8", newline="\n")
        written.add(out)
    for stale in OUT.rglob("*.md"):                     # scenes that no longer exist
        if stale not in written:
            stale.unlink()
    print(f"setups/: {len(written)} scenes")


if __name__ == "__main__":
    main()
