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
# Requires / noticed by: validate.parse_bool (AND binds tighter than OR)
# --------------------------------------------------------------------------

def check(expr: str, src: Path, p: Player) -> bool:
    """A Requires / Noticed by expression, read by the validator's one boolean parser: each card, item
    or clue link holds if the player has it."""
    if not expr.strip():
        return True
    tree, err = S.V.parse_bool(expr)
    if err:
        raise ValueError(f"cannot read requirement '{expr}': {err}")

    def holds(term: str) -> bool:
        tag = S.V.TAG_LINK.match(term)
        if tag:                                       # a tag: holding any item that carries it
            want = (S.V.TAGS_DIR / Path(tag.group(1)).name).resolve()
            return any(want in {t.path.resolve() for t in S.tags_of(S.V.parse(S.ROOT / i))}
                       for i in p.items if (S.ROOT / i).is_file())
        target = S.LINK.match(term)
        r = S.ref_id(target.group(2), src) if target else None
        return bool(r) and p.has(r)

    return S.V.evaluate(tree, holds)


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
    in_bundle = (src.parent / f"{src.parent.name}.md").is_file()   # any bundle, nested or not
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
