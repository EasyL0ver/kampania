#!/usr/bin/env python3
"""PostToolUse hook: validate an edited .md file with validate.py.

Reads the hook payload on stdin. If the edited file is a .md inside the repo
(outside world/), runs `python validate.py <file>`. Errors are printed to
stderr with exit code 2, which feeds them back to Claude; warnings never block.
"""

import json
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]


def main() -> int:
    try:
        data = json.load(sys.stdin)
    except json.JSONDecodeError:
        return 0
    path = (data.get("tool_input") or {}).get("file_path") or (data.get("tool_response") or {}).get("filePath")
    if not path:
        return 0
    file = Path(path).resolve()
    if file.suffix != ".md":
        return 0
    try:
        rel = file.relative_to(REPO)
    except ValueError:
        return 0
    if rel.parts and rel.parts[0] in ("world", ".git", ".claude"):
        return 0

    result = subprocess.run(
        [sys.executable, str(REPO / "validate.py"), str(rel)],
        cwd=REPO, capture_output=True, text=True, encoding="utf-8",
    )
    if result.returncode == 0:
        return 0
    errors = [l for l in result.stdout.splitlines() if ": error [" in l]
    print(f"validate.py found {len(errors)} error(s) in {rel.as_posix()}; fix them:", file=sys.stderr)
    print("\n".join(errors), file=sys.stderr)
    return 2


if __name__ == "__main__":
    sys.exit(main())
