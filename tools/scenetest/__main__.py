"""Play one scene with one AI player until every path is explored, and report when.

    python -m tools.scenetest events/the-car-in/the-drive.md [--turns N]

The player starts with the scene's starting context (engine.starting_context):
every card it requires, every item it requires or costs, and every clue its
Prompted by / noticed by need that it does not give itself, with that clue's
prompted-by chain. A path is one of the scene's own moves (its file plus the
bundle default it runs inside); the actions of items held are playable extras.
The report notes, for every path, the turn it was explored on, its own cost,
and the time spent so far. Each run keeps tools/scenetest/runs/<scene>-<time>/:
report.md and calls.jsonl (every model call: prompt, output, tokens).
"""
from __future__ import annotations

import argparse
import datetime as dt
import sys
from pathlib import Path

from . import agents as A
from . import engine as E
from . import scene as S

RUNS = Path(__file__).resolve().parent / "runs"


def label(ref: str) -> str:
    return ref.split("/")[-1].removesuffix(".md").replace("clue:", "")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("scene")
    ap.add_argument("--turns", type=int, default=None, help="player turns; default: the scene's actions + 2")
    args = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")

    sc = S.load(Path(args.scene))
    p, ctx = E.starting_context(sc)
    c = A.client()
    paths = {m.id: m for m in sc.moves}
    turns = args.turns or sum(m.kind == "action" for m in sc.moves) + 2
    explored: dict[str, dict] = {}                    # id -> turn, cost, time
    tried: dict[str, str] = {}                        # id -> why it was refused
    values = {m.name: m.start for m in sc.mechanics if m.start}
    happened: list[str] = []
    log: list[str] = []

    def open_moves() -> list:
        extras = [m for item, ms in sc.item_moves.items() if item in p.items for m in ms]
        # A conditional Present person counts as there, whatever their condition: for now the
        # test keeps every move in reach (Move.present_if is recorded, not enforced).
        return [m for m in sc.moves + extras if m.id not in explored]

    def referee(changes: list[str]) -> set[str]:
        r = A.rule(c, sc.mechanics, values, changes, happened, open_moves(), sc.setup)
        values.update({mv.name: mv.value for mv in r.mechanics})
        log.append(f"*state:* {', '.join(f'{k}={v}' for k, v in values.items()) or '-'}")
        return set(r.when_true)

    def notice(when_true: set[str], turn: int) -> list[tuple[str, str]]:
        out = []
        for m in open_moves():
            if m.kind == "opportunity" and E.check(m.requires, m.src, p) and (not m.when or m.id in when_true):
                p.receive(m.gives)
                explored[m.id] = {"turn": turn, "cost": "free", "time": p.time}
                happened.append(f"noticed: {m.text}")
                out.append(("NOTICED", m.text))
        return out

    player = A.AIPlayer(c)
    places = {q.relative_to(S.ROOT).as_posix(): S.plain(q.read_text(encoding="utf-8").splitlines()[0].lstrip("# "), q)
              for q in sorted((S.ROOT / "locations").rglob("*.md"))
              if not q.name.startswith("_") and q.name != "index.md"}
    say = lambda items: "\n".join(text for _, text in items) or "Nothing happens."
    log.append(f"# {sc.title}\n\nStarting context: cards {', '.join(map(label, ctx['cards']))}; "
               f"items {', '.join(map(label, ctx['items']))}; clues {', '.join(map(label, ctx['clues'])) or 'none'}\n")

    run = RUNS / f"{sc.path.stem}-{dt.datetime.now():%Y%m%d-%H%M%S}"
    run.mkdir(parents=True, exist_ok=True)
    out = run / "report.md"
    A.LOG_PATH = run / "calls.jsonl"                  # every model call, kept for feedback

    def write_report(turn: int, final: bool = False) -> int:
        done = [i for i in explored if i in paths]
        lines = [f"# Scene test: {sc.title}", "",
                 f"- scene: `{sc.rel}`",
                 f"- explored **{len(done)}/{len(paths)}** paths in **{turn}** turns, **{p.time}** time spent, {p.composure} composure",
                 f"- starting context: cards {', '.join(map(label, ctx['cards']))}; items {', '.join(map(label, ctx['items']))}; "
                 f"clues {', '.join(map(label, ctx['clues'])) or 'none'}",
                 f"- API: {A.USAGE.calls} calls, {A.USAGE.input} in / {A.USAGE.output} out tokens "
                 + "; ".join(f"{k}: {v[0]}/{v[1]}" for k, v in A.USAGE.by_model.items()),
                 "", "| path | kind | turn | cost | time spent by then |", "|---|---|---|---|---|"]
        for m in sc.moves:
            e = explored.get(m.id)
            lines.append(f"| {m.name} | {m.kind} | {e['turn'] if e else '—'} | {e['cost'] if e else ' + '.join(m.cost) or 'free'} "
                         f"| {e['time'] if e else '—'} |")
        missed = [m for m in sc.moves if m.id not in explored]
        if missed:
            lines += ["", "## Not explored", ""] + [f"- **{m.name}**: {tried.get(m.id, 'never attempted')}" for m in missed]
        lines += ["", "## Transcript", ""] + log
        out.write_text("\n".join(lines) + "\n", encoding="utf-8")
        if final:
            print("\n".join(lines[:5]))
            print(f"report: {out.relative_to(S.ROOT).as_posix()}")
        return 0 if not missed else 1


    print(f"{sc.title}: {len(paths)} paths, {turns} turns | report {out.relative_to(S.ROOT).as_posix()}", flush=True)
    when_true = referee([])
    first = [("SETUP", s) for s in sc.setup] + notice(when_true, 0)
    scene_text = say(first)
    player.hear(scene_text)
    log.append(f"**Scene:**{chr(10)}{scene_text}")

    turn = 0
    while turn < turns and len([i for i in explored if i in paths]) < len(paths):
        turn += 1
        line = player.speak()
        log.append(f"\n### Turn {turn} (time spent {p.time})\n**Player:** {line}")
        picks, go = A.arbitrate(c, line, [m for m in open_moves() if m.kind == "action"], player.recent(), places)
        log.append(f"*arbiter:* {', '.join(m.name for m in picks) or 'none'}{f' | go: {go}' if go else ''}")
        items, changes = [], []
        if go:                                       # travel: only to a place they know of
            if p.has(f"aware:{go}"):
                items.append(("REFUSED", f"You can go to {places[go]} later; this scene is not over."))
            else:
                items.append(("REFUSED", "You don't know where that is yet."))
        for m in picks:
            if m.kind == "opportunity":
                continue
            if not E.check(m.requires, m.src, p):
                tried[m.id] = f"requires {m.requires}"
                items.append(("REFUSED", f"You can't: {m.name}. Requires: {S.plain(m.requires, m.src)}"))
                continue
            if m.when and m.id not in when_true:
                tried[m.id] = f"when: {m.when}"
                items.append(("REFUSED", f"Not now: {m.name}."))
                continue
            p.pay(m.cost)
            new = p.receive(m.gives)
            explored[m.id] = {"turn": turn, "cost": " + ".join(m.cost) or "free", "time": p.time}
            happened.append(f"did: {m.name}")
            items.append(("DONE", m.text))
            if m.changes:
                changes.append(m.changes)
            log.append(f"*performed:* {m.name} (cost {explored[m.id]['cost']}; gained {', '.join(map(label, new)) or '-'})")
        # Every turn: re-judge the open When conditions (the state or what has
        # happened may have moved), then fire every opportunity whose When now holds.
        if changes or any(m.when for m in open_moves()):
            when_true = referee(changes)
        items += notice(when_true, turn)
        scene_text = say(items)
        player.hear(scene_text)
        log.append(f"**Scene:** {scene_text}")
        n = len([i for i in explored if i in paths])
        print(f"turn {turn:>2} | {n}/{len(paths)} explored | time {p.time} | "
              f"{', '.join(m.name for m in picks) or '-'} | {line[:70]}", flush=True)
        write_report(turn)

    return write_report(turn, final=True)


if __name__ == "__main__":
    sys.exit(main())
