import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef, Effect, WorldCond } from "../schema.ts";
import { Chainsmoker, Culture, Devotion, Empathy, History } from "../skills.ts";
import TheChurch from "../locations/the-church.ts";
import Priest from "../characters/priest.ts";
import Matrona from "../characters/matrona.ts";
import Wojewoda from "../characters/wojewoda.ts";
import Wujas from "../characters/wujas.ts";
import Neighbour from "../characters/neighbour.ts";
import Painter from "../characters/painter.ts";
import Butcher from "../characters/butcher.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";

// TODO: mechanic "Faith in Redemption" threshold (story-facts/spiritual-endings.md)
// not modelled yet; mutually exclusive with The Odpust.
export default class TheSealBreak extends Event {
  readonly id = "the-seal-break";
  readonly name = "The Seal-Break — The Priest Names the Dead";
  readonly hook = "The church bell rings wrong and too long.";
  override at(): LocationRef {
    return TheChurch;
  }

  // TODO: conditional presence not modelled: Helena, Tadek, Dudka, Emil (if alive),
  // Zbigniew (if survived Day 6), Rezeń (if not taken by the mob).
  override present(): CharacterRef[] {
    return [Priest, Matrona, Wojewoda, Wujas, Neighbour, Painter, Butcher];
  }
  override readonly hooks: EventHook[] = [
    { text: "The church bell rings wrong and too long, then stops.", heardAt: "anywhere" },
  ];
  override condition: WorldCond = (w) => w.theOdpust.status === "pending";
  composure = 2;

  readonly setup = new Narrative({
    narration: [
      "The church is packed.",
      "Black water is under the door and spreading over the flagstones.",
      "Floor candles are drowning.",
      "ks. Władysław Pająk sits on the altar table with bimber.",
      "His collar is off.",
      "His vestments are half-undone.",
      "He is drunk.",
      "A Carmen cigarette burns in his hand; he smokes openly in the church he once forbade it in.",
      "He says he has decided to stop lying.",
      "He calls the water judgment over a valley built on a grave.",
      "He names the acts from the 1954 lynch.",
      "He names Zbigniew Gajda, Tadek, and Stanisław Rezeń.",
      "He grieves Janina Gajda as the source of years of confession.",
      "He does not name Helena Rzepka.",
      "His account reaches from the 1954 lynch back to the old village and the state cover-up.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // Was an ungated opportunity ("requires: nothing", prompted by aware of this event).
    theOpenVice: action({
      label: "The open vice",
      promptedBy: [TheSealBreak],
      cost: [],
      narrative: new Narrative({
        narration: [
          "`(requires: nothing)` `(prompted by: aware:events/the-seal-break.md)`: the man who hid his habit now smokes on the altar, plain to everyone present.",
        ],
        gives: { clues: [clues.PriestSmokes] },
      }),
    }),
    letHimFinish: action({
      label: "Let him finish",
      cost: [],
      narrative: new Narrative({
        narration: [
          "He names the full lynch account and the shape of 1947 beneath it in front of the surviving village.",
        ],
        gives: {
          effects: todoEffect("World State Change: the guilty drown unabsolved and The Odpust is foreclosed"),
        },
      }),
    }),
    carryTheTestimonyOut: action({
      label: "Carry the testimony out",
      cost: [],
      narrative: new Narrative({
        narration: [
          "The player carries the public testimony into the report.",
        ],
        gives: {
          effects: todoEffect("World State Change: the report is armed with the full account and the property ledger's field 3 is corroborated"),
        },
      }),
    }),
    stopHim: action({
      label: "Stop him",
      cost: [{ composure: 1 }],
      narrative: new Narrative({
        narration: [
          "The priest stops before the full account is spoken, but whatever names he already said remain public.",
        ],
        gives: {
          effects: todoEffect("NPC State Change: remaining guilty villagers owe the player and honest villagers turn cold | World State Change: partial public testimony exists"),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    thePriestOnTheAltar: opportunity({
      label: "The priest on the altar",
      target: { skills: [Devotion] },
      promptedBy: [TheSealBreak],
      narrative: new Narrative({
        narration: [
          "He knows what breaking the seal costs and does it deliberately.",
        ],
      }),
    }),
    theBrokenSeal: opportunity({
      label: "The broken seal",
      target: { skills: [Culture] },
      promptedBy: [TheSealBreak],
      narrative: new Narrative({
        narration: [
          "A priest violating the seal of confession is committing one of the gravest violations in his faith.",
        ],
      }),
    }),
    theNamesAsTheyLand: opportunity({
      label: "The names as they land",
      target: { skills: [Empathy] },
      promptedBy: [TheSealBreak],
      narrative: new Narrative({
        narration: [
          "Zbigniew Gajda looks for an exit; Tadek weeps; Helena Rzepka waits for her name and does not hear it.",
        ],
      }),
    }),
    theValleyBuiltOnAGrave: opportunity({
      label: "The valley built on a grave",
      target: { when: (_w, me) => me.has(History) || me.has(Culture) },
      promptedBy: [TheSealBreak],
      narrative: new Narrative({
        narration: [
          "`(requires: History or Culture)` — his account connects the lynch to the old village, the people officially called resettled, and the buried cover-up.",
        ],
      }),
    }),
    theBrandOnThePaper: opportunity({
      label: "The brand on the paper",
      target: { skills: [Chainsmoker], clues: [clues.PriestSmokes] },
      promptedBy: [TheSealBreak],
      narrative: new Narrative({
        narration: [
          "`(requires: Chainsmoker and priest-smokes)` — a smoker reads the brand off the paper burning in his hand: premium Carmen, the same the village would name at Janina's door.",
        ],
        gives: { clues: [clues.PriestSmokesCarmen] },
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
