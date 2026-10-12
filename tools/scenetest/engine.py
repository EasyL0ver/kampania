"""The deterministic half: what the player holds, what a move needs, what it costs and gives.

Free text (When conditions, Changes comments) is not decided here; the GM model
rules on it (agents.py).
"""
from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path

from . import scene as S
from .scene import ROOT, Move, Scene

SCENE_KINDS = ("characters", "events", "locations", "items")


@dataclass
class Player:
    cards: set[str] = field(default_factory=set)
    items: set[str] = field(default_factory=set)
    clues: set[str] = field(default_factory=set)   # clue:<id> and aware:<file> ids
    time: int = 0
    composure: int = 0

    def has(self, ref: str) -> bool:
        return ref in self.cards or ref in self.items or ref in self.clues

    def receive(self, refs: list[str]) -> list[str]:
        """Take what a move gives; returns what was new."""
        new = []
        for r in refs:
            bucket = self.cards if r.startswith("cards/") else self.items if r.startswith("items/") else self.clues
            if r not in bucket:
                bucket.add(r)
                new.append(r)
        return new

    def pay(self, cost: list[str]) -> None:
        for c in cost:
            kind, _, n = c.partition(":")
            if kind == "time":
                self.time += int(n)
            elif kind == "composure":
                self.composure += int(n)
            else:
                self.items.discard(c)
                self.cards.discard(c)


# --------------------------------------------------------------------------
# Requires / noticed by: link AND link OR ( ... ), AND binds tighter
# --------------------------------------------------------------------------

def check(expr: str, src: Path, p: Player) -> bool:
    if not expr.strip():
        return True
    tokens, rest = S.V._tokenize_requires(expr)
    if tokens is None:
        raise ValueError(f"cannot read requirement '{expr}' near '{rest}'")
    pos = 0

    def factor() -> bool:
        nonlocal pos
        t = tokens[pos]
        pos += 1
        if t == "(":
            v = disj()
            pos += 1   # ")"
            return v
        target = S.LINK.match(t)
        r = S.ref_id(target.group(2), src) if target else None
        return bool(r) and p.has(r)

    def conj() -> bool:
        nonlocal pos
        v = factor()
        while pos < len(tokens) and tokens[pos] == "AND":
            pos += 1
            v = factor() and v
        return v

    def disj() -> bool:
        nonlocal pos
        v = conj()
        while pos < len(tokens) and tokens[pos] == "OR":
            pos += 1
            v = conj() or v
        return v

    return disj()


def needs(expr: str, src: Path) -> list[str]:
    """Every card / item / clue a requirement names."""
    return S.refs(expr, src)


# --------------------------------------------------------------------------
# The starting context
# --------------------------------------------------------------------------

_givers: dict[str, list[Move]] | None = None


def givers() -> dict[str, list[Move]]:
    """clue/aware id -> every move in the repo that gives it."""
    global _givers
    if _givers is None:
        _givers = {}
        for k in SCENE_KINDS:
            for p in (ROOT / k).rglob("*.md"):
                if p.name.startswith("_") or p.name == "index.md":
                    continue
                f = S.V.parse(p)
                for mv in S._actions(f) + S._opportunities(f):
                    for g in mv.gives:
                        _givers.setdefault(g, []).append(mv)
    return _givers


def self_ref(ref: str, mv: Move) -> bool:
    """An aware: prompt pointing at the giver's own file, or at the bundle the giver sits in:
    "you are here", which tells nothing."""
    if not ref.startswith("aware:"):
        return False
    target, src = (ROOT / ref[6:]).resolve(), mv.src.resolve()
    in_bundle = src.parent.parent.name in SCENE_KINDS            # e.g. events/arrival/the-walk.md
    return target == src or (in_bundle and target.parent == src.parent)


def all_moves(sc: Scene) -> list[Move]:
    return sc.moves + [m for ms in sc.item_moves.values() for m in ms]


def starting_context(sc: Scene) -> tuple[Player, dict[str, list[str]]]:
    """Everything the scene needs and does not hand out itself:
    1 every card it requires, 2 every item it requires or costs,
    3 every clue its Prompted by / noticed by need that the scene does not give itself,
    with the prompted-by chain behind those clues across the repo."""
    moves = sc.moves                       # the scene's own paths; item actions are extras
    given_here = {g for m in all_moves(sc) for g in m.gives}
    named = [r for m in moves for r in needs(m.requires, m.src) + m.cost]
    cards = sorted({r for r in named if r.startswith("cards/") and r not in given_here})
    items = sorted({r for r in named if r.startswith("items/") and r not in given_here})

    clues: list[str] = []
    todo = [r for m in moves for r in m.prompted + needs(m.requires, m.src)
            if r.startswith(("clue:", "aware:")) and r not in given_here]
    seen: set[str] = set()
    while todo:
        c = todo.pop()
        if c in seen or c in given_here:
            continue
        seen.add(c)
        clues.append(c)
        for g in givers().get(c, []):          # the chain: what prompted its givers
            todo += [r for r in g.prompted if r.startswith(("clue:", "aware:")) and not self_ref(r, g)]
    p = Player(cards=set(cards), items=set(items), clues=set(clues))
    return p, {"cards": cards, "items": items, "clues": sorted(clues)}
