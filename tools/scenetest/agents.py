"""The AI half: the referee (rules on free-text When and Changes), the arbiter
(maps a player's line to moves), and the player (only ever reads the scene's own lines).
"""
from __future__ import annotations

import json
import os
from pathlib import Path
from dataclasses import dataclass, field

import anthropic
from pydantic import BaseModel

from .scene import ROOT, Mechanic, Move

PLAYER_MODEL = os.environ.get("SCENETEST_PLAYER_MODEL", "claude-haiku-5-5")
ARBITER_MODEL = os.environ.get("SCENETEST_ARBITER_MODEL", "claude-haiku-5-5")
REFEREE_MODEL = os.environ.get("SCENETEST_REFEREE_MODEL", "claude-haiku-5-5")


def client() -> anthropic.Anthropic:
    """Key from the environment, else world/.env (never committed)."""
    env = ROOT / "world" / ".env"
    if not os.environ.get("ANTHROPIC_API_KEY") and env.is_file():
        for line in env.read_text(encoding="utf-8").splitlines():
            k, _, v = line.partition("=")
            if k.strip() and v.strip() and k.strip() not in os.environ:
                os.environ[k.strip()] = v.strip().strip('"').strip("'")
    return anthropic.Anthropic()


@dataclass
class Usage:
    calls: int = 0
    input: int = 0
    output: int = 0
    by_model: dict[str, list[int]] = field(default_factory=dict)

    def add(self, model: str, u) -> None:
        self.calls += 1
        self.input += u.input_tokens
        self.output += u.output_tokens
        row = self.by_model.setdefault(model, [0, 0])
        row[0] += u.input_tokens
        row[1] += u.output_tokens


USAGE = Usage()
LOG_PATH: Path | None = None      # set by the runner: every call is appended here as JSON


def record(role: str, model: str, system: str, messages: list, resp) -> None:
    """Count the tokens and keep the whole exchange, for feedback later."""
    USAGE.add(model, resp.usage)
    if LOG_PATH is None:
        return
    parsed = getattr(resp, "parsed_output", None)
    entry = {
        "role": role, "model": model, "system": system, "messages": messages,
        "output": _text(resp), "parsed": parsed.model_dump() if parsed is not None else None,
        "usage": {"input": resp.usage.input_tokens, "output": resp.usage.output_tokens},
        "stop_reason": resp.stop_reason,
    }
    with LOG_PATH.open("a", encoding="utf-8") as fh:
        fh.write(json.dumps(entry, ensure_ascii=False) + chr(10))


def _text(resp) -> str:
    return "".join(b.text for b in resp.content if b.type == "text").strip()


# --------------------------------------------------------------------------
# GM: rules
# --------------------------------------------------------------------------

class MechValue(BaseModel):
    name: str
    value: str


class Ruling(BaseModel):
    mechanics: list[MechValue]       # every state mechanic, its value now
    when_true: list[str]             # ids of the listed moves whose When condition holds now


RULES_SYSTEM = """You are the rules referee of a tabletop RPG scene. You keep the scene's state and decide
conditions written in free text. You never narrate.

You get: the scene's mechanics (type, start, notes), their current values, the changes just made by
the players' actions (written as "[Mechanic] — new value or comment"), and a list of moves whose
"When" condition you must judge.

1. Apply the changes to the mechanics, following each mechanic's notes (including rules that fire on
   their own, e.g. "when every player is at 0 ..."). There is exactly ONE player in this scene, so
   "every player" means that player. Return every bool/int/enum mechanic with its value now. Skip
   mechanics of type rule or list.
2. For each listed move, decide whether its When condition holds right now, given the state and
   what has happened. Return the ids of those that hold. A condition about people being present or
   the situation in the scene's setup holds unless something has changed it."""


def rule(c: anthropic.Anthropic, mechanics: list[Mechanic], values: dict[str, str],
         changes: list[str], happened: list[str], moves: list[Move], setup: list[str]) -> Ruling:
    mech = "\n".join(
        f"- {m.name} ({m.type}{', per ' + m.per if m.per else ''}{', start ' + m.start if m.start else ''})"
        + "".join(f"\n    note: {n}" for n in m.notes) for m in mechanics)
    vals = "\n".join(f"- {k}: {v}" for k, v in values.items()) or "(none)"
    whens = "\n".join(f"- {m.id}: {m.when}" for m in moves if m.when) or "(none)"
    msg = (f"SETUP:\n" + "\n".join(f"- {s}" for s in setup)
           + f"\n\nMECHANICS:\n{mech or '(none)'}\n\nCURRENT VALUES:\n{vals}"
           + f"\n\nWHAT HAS HAPPENED SO FAR:\n" + ("\n".join(f"- {h}" for h in happened) or "- nothing yet")
           + f"\n\nCHANGES JUST MADE:\n" + ("\n".join(f"- {x}" for x in changes) or "- none")
           + f"\n\nMOVES TO JUDGE (id: When):\n{whens}")
    resp = c.messages.parse(
        model=REFEREE_MODEL, max_tokens=4000, output_config={"effort": "low"},
        system=RULES_SYSTEM, messages=[{"role": "user", "content": msg}], output_format=Ruling)
    record("referee", REFEREE_MODEL, RULES_SYSTEM, [{"role": "user", "content": msg}], resp)
    return resp.parsed_output


# --------------------------------------------------------------------------
# Arbiter
# --------------------------------------------------------------------------

class Pick(BaseModel):
    keys: list[str]
    go: str          # key of the place the line tries to go to, or "" if none
    reason: str


def arbitrate(c: anthropic.Anthropic, line: str, moves: list[Move], recent: list[str],
              places: dict[str, str]) -> tuple[list[Move], str]:
    """The actions the line does, and the place (a location id) it tries to go to, if any."""
    by_key = {str(i): m for i, m in enumerate(moves)}
    place_keys = {f"p{i}": pid for i, pid in enumerate(places)}
    listing = "\n".join(f"- {k}: \"{m.name}\"" for k, m in by_key.items()) or "(none)"
    place_listing = "\n".join(f"- {k}: {places[pid]}" for k, pid in place_keys.items())
    system = ("You are the arbiter of a tabletop RPG. A player says what their character says or does. "
              "Return the keys of the listed actions the line does, in order: usually one, several only "
              "when the line clearly does several things. Be lenient with paraphrase and casual wording "
              "when the intent is clearly that action. Do not stretch: chatter or something no action "
              "covers gets an empty list. Separately, if the line tries to go somewhere (travel, stop "
              "and walk to, head for a place), give the key of that place in `go`; otherwise \"\".")
    messages = [{"role": "user", "content":
                 (("Context:\n" + "\n".join(recent) + "\n\n") if recent else "")
                 + f"Actions:\n{listing}\n\nPlaces:\n{place_listing}\n\nThe player says: {line}"}]
    resp = c.messages.parse(model=ARBITER_MODEL, max_tokens=1000, system=system,
                            messages=messages, output_format=Pick)
    record("arbiter", ARBITER_MODEL, system, messages, resp)
    out = resp.parsed_output
    return [by_key[k] for k in dict.fromkeys(out.keys) if k in by_key], place_keys.get(out.go, "")


# --------------------------------------------------------------------------
# Player
# --------------------------------------------------------------------------

class AIPlayer:
    """A bare decision-maker: reads the scene's lines, names one thing to do next."""

    SYSTEM = ("You are a detective. Your goal is to uncover every secret in this scene. You read short "
              "descriptions of what is in front of you. Reply with ONE thing you do next, in at most ten "
              "words, e.g. \"Ask the driver what he lost.\" Uncover every secret as fast as you can, and "
              "don't repeat what got you nothing. No explanations.")

    def __init__(self, c: anthropic.Anthropic):
        self.c = c
        self.history: list[dict] = []

    def hear(self, text: str) -> None:
        if self.history and self.history[-1]["role"] == "user":
            self.history[-1]["content"] += chr(10) + text
        else:
            self.history.append({"role": "user", "content": text})

    def speak(self) -> str:
        resp = self.c.messages.create(model=PLAYER_MODEL, max_tokens=60, system=self.SYSTEM,
                                      thinking={"type": "disabled"}, output_config={"effort": "low"},
                                      messages=self.history)
        record("player", PLAYER_MODEL, self.SYSTEM, list(self.history), resp)
        line = _text(resp)
        self.history.append({"role": "assistant", "content": line})
        return line

    def recent(self, n: int = 4) -> list[str]:
        return [f"{'Scene' if m['role'] == 'user' else 'Player'}: {m['content']}" for m in self.history[-n:]]
