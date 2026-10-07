import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef, Effect, WorldCond } from "../schema.ts";
import { Culture, Devotion, Empathy } from "../skills.ts";
import TheChurch from "../locations/the-church.ts";
import Priest from "../characters/priest.ts";
import Matrona from "../characters/matrona.ts";
import Wojewoda from "../characters/wojewoda.ts";
import Wujas from "../characters/wujas.ts";
import Neighbour from "../characters/neighbour.ts";
import Painter from "../characters/painter.ts";
import Butcher from "../characters/butcher.ts";
import Babcia from "../characters/babcia.ts";
import TheRitual from "./the-ritual.ts";
import { todo, todoEffect } from "../todo.ts";

// TODO: mechanic "Faith in Redemption" threshold (story-facts/spiritual-endings.md)
// not modelled yet; it decides between this event and The Seal-Break.
export default class TheOdpust extends Event {
  readonly id = "the-odpust";
  readonly name = "The Odpust — Grace at the Last";
  readonly hook = "The church bell rings steadily through the rain.";
  override at(): LocationRef {
    return TheChurch;
  }

  // TODO: conditional presence not modelled: Zbigniew (if survived Day 6),
  // Rezeń (if not killed), Stefania (conditional). Also villagers.
  override present(): CharacterRef[] {
    return [Priest, Matrona, Wojewoda, Wujas, Neighbour, Painter, Butcher, Babcia];
  }
  override readonly hooks: EventHook[] = [
    { text: "The church bell rings steadily through the rain.", heardAt: "anywhere" },
  ];
  override condition: WorldCond = (w) => w.theRitual.status === "pending";
  composure = 2;

  readonly setup = new Narrative({
    narration: [
      "The church is packed.",
      "Black water has reached under the door.",
      "Water spreads across the flagstones.",
      "Floor candles are drowned.",
      "ks. Pająk stands straight at the altar in clean vestments.",
      "He preaches on Isaiah: sins like scarlet becoming white.",
      "He looks at men he knows carry blood when he says scarlet.",
      "He does not name them.",
      "He says the water is the last chance for mercy, not the end of mercy.",
      "He offers general absolution to the congregation.",
      "If Rezeń lives, he attends despite skipping earlier Masses.",
      "If the players stirred the Lemko rite but did not finish Rest, Stefania Kopacz stands and pleads against washing killers clean while the dead in the well remain unnamed.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    receiveTheOdpust: action({
      label: "Receive the odpust",
      cost: [],
      narrative: new Narrative({
        narration: [
          "ks. Pająk grants general absolution to the congregation as the water rises.",
        ],
        gives: {
          effects: todoEffect("Ending Progress: the Grace ending fires | World State Change: Rest is foreclosed"),
        },
      }),
    }),
    bringASpecificGuiltySoulToTheRail: action({
      label: "Bring a specific guilty soul to the rail",
      requires: [
        new Requirement("No guilty soul is here within reach.", { when: todo("A guilty NPC is present and reachable.") }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The named soul is walked forward, made to kneel, and receives absolution with guilt spoken and answered.",
        ],
        gives: {
          effects: todoEffect("NPC State Change: the named guilty soul dies shriven and at peace"),
        },
      }),
    }),
    answerBabciasPleaByStopping: action({
      label: "Answer Babcia's plea by stopping",
      requires: [
        new Requirement("Stefania is not here.", { when: todo("Stefania Kopacz is present") }),
      ],
      promptedBy: [Babcia],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The players refuse to let the odpust be the final answer while the well dead remain unnamed.",
        ],
        gives: {
          aware: [TheRitual],
          effects: todoEffect("Ending Progress: Grace is interrupted"),
        },
      }),
    }),
    proceedPastBabciasPlea: action({
      label: "Proceed past Babcia's plea",
      requires: [
        new Requirement("Stefania is not here.", { when: todo("Stefania Kopacz is present") }),
      ],
      promptedBy: [Babcia],
      cost: [],
      narrative: new Narrative({
        narration: [
          "The odpust proceeds over Babcia's objection.",
        ],
        gives: {
          effects: todoEffect("World State Change: the Lemko dead turn vengeful | Ending Progress: see spiritual-endings.md"),
        },
      }),
    }),
    refuseItAndWalkOut: action({
      label: "Refuse it and walk out",
      cost: [],
      narrative: new Narrative({
        narration: [
          "That player refuses absolution and leaves the church; ks. Pająk continues the rite for the congregation.",
        ],
        gives: {
          effects: todoEffect("World State Change: the odpust proceeds without that player"),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theRestoredPriest: opportunity({
      label: "The restored priest",
      target: { skills: [Devotion] },
      promptedBy: [TheOdpust],
      narrative: new Narrative({
        narration: [
          "ks. Pająk has chosen mercy over judgment.",
        ],
      }),
    }),
    theRiteForming: opportunity({
      label: "The rite forming",
      target: { skills: [Culture] },
      promptedBy: [TheOdpust],
      narrative: new Narrative({
        narration: [
          "He is building toward general absolution for people in danger of death.",
        ],
      }),
    }),
    theWordScarlet: opportunity({
      label: "The word scarlet",
      target: { skills: [Devotion] },
      promptedBy: [TheOdpust],
      narrative: new Narrative({
        narration: [
          "His eyes go to Zbigniew, Tadek, and Rezeń, but not Helena.",
        ],
      }),
    }),
    // TODO: "Rezeń present" not modelled.
    theButcherInThePew: opportunity({
      label: "The butcher in the pew",
      trigger: todo("Rezeń present"),
      target: { skills: [Empathy] },
      promptedBy: [TheOdpust],
      narrative: new Narrative({
        narration: [
          "`(requires: Empathy and Rezeń present)` — Rezeń is accepting absolution without visible contrition.",
        ],
      }),
    }),
    // TODO: "Stefania Kopacz present" not modelled.
    babciasObjection: opportunity({
      label: "Babcia's objection",
      trigger: todo("Stefania Kopacz present"),
      target: { skills: [Culture] },
      promptedBy: [TheOdpust],
      narrative: new Narrative({
        narration: [
          "`(requires: Stefania Kopacz present and Culture)` — the Lemko dead have not been named or rested, so Catholic absolution does not answer their grievance.",
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
