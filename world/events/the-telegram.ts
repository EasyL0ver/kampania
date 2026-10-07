import { Event, Narrative, action, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef, WorldCond } from "../schema.ts";
import { Empathy, Finesse } from "../skills.ts";
import WojewodasHouse from "../locations/wojewodas-house.ts";
import Operator from "../characters/secondary/operator.ts";
import Wojewoda from "../characters/wojewoda.ts";
import TheFlood from "./the-flood.ts";
import OperatorRefusesHelp from "./operator-refuses-help.ts";
import * as clues from "../clues.ts";
import { todo } from "../todo.ts";

// TODO: mechanic (Hania plants the wire; Zbigniew cannot suppress it) kept in
// prose only (see prose/events/the-telegram.md).
export default class TheTelegram extends Event {
  readonly id = "the-telegram";
  readonly name = "The Telegram";
  readonly hook = "Mid-call, the operator breaks off procedure to read out a telegram just in for this number.";
  override at(): LocationRef {
    return WojewodasHouse;
  }

  // TODO: Zbigniew only "if in his office"; always listed.
  override present(): CharacterRef[] {
    return [Operator, Wojewoda];
  }
  override readonly hooks: EventHook[] = [
    { text: "Mid-call, the operator breaks off to read out a telegram for this number.", heardAt: "anywhere" },
  ];
  override condition: WorldCond = (w) => w.theFlood.status !== "pending" && w.operatorRefusesHelp.status === "running";

  readonly setup = new Narrative({
    narration: [
      "The operator stops the call to relay an incoming telegram for this number.",
      "She reads it flat and terse, per-word with STOP between lines, like any wire.",
      "It is addressed to the committee and signed BARNAŚ.",
      "Content: service papers and uniform buried under the old garden bed behind his house; take them.",
      "Edward Barnaś has been dead since 1954 and never knew the committee.",
      "The cache is in the backyard of his old house, where Janina Gajda now lives.",
      "The only working phone is in Zbigniew's office; if he is in the room, he hears the name read aloud.",
      "The operator names no sending office and does not repeat the wire.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // Requires "The committee heard the relayed telegram": implied by attending the event.
    actOnTheWire: action({
      label: "Act on the wire",
      promptedBy: [TheTelegram],
      cost: [],
      narrative: new Narrative({
        narration: [
          "The committee takes the directions as a real lead: under the old garden bed behind the Barnaś house, now Janina Gajda's, something is buried.",
        ],
        gives: { clues: [clues.TelegramPointsToBarnasYard] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    // TODO: "Zbigniew present" not modelled.
    zbigniewHearsTheName: opportunity({
      label: "Zbigniew hears the name",
      trigger: todo("Zbigniew present"),
      target: { skills: [Empathy] },
      promptedBy: [TheTelegram],
      narrative: new Narrative({
        narration: [
          "`(requires: Empathy, Zbigniew present)` — he keeps his face still, but Barnaś is a man he helped drown; a held breath, a beat too long before he hands the receiver back.",
        ],
      }),
    }),
    aSenderTwelveYearsDead: opportunity({
      label: "A sender twelve years dead",
      target: { skills: [Finesse] },
      promptedBy: [TheTelegram],
      narrative: new Narrative({
        narration: [
          "Barnaś cannot have sent a wire; someone living, with his name and a seat on the line, put it through.",
        ],
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }

  override get opportunities() {
    return this.allOpportunities;
  }
}
