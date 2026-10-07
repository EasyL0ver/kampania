import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef, Tick } from "../schema.ts";
import { Empathy, Finesse } from "../skills.ts";
import ButchersHouse from "../locations/butchers-house.ts";
import Wujas from "../characters/wujas.ts";
import Butcher from "../characters/butcher.ts";
import Wojewoda from "../characters/wojewoda.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";

export default class WujasVisitsButcher extends Event {
  readonly id = "wujas-visits-butcher";
  readonly name = "Tadek Visits the Butcher";
  readonly hook = "Players may see Tadek walking toward the village edge.";
  override at(): LocationRef {
    return ButchersHouse;
  }

  override present(): CharacterRef[] {
    return [Wujas, Butcher];
  }
  override readonly hooks: EventHook[] = [
    { text: "Players may see Tadek walking toward the village edge.", heardAt: "anywhere" },
  ];
  // Recurring: once over, it can happen again.
  resolve: Tick = (w) => { w.wujasVisitsButcher.status = "pending"; };
  readonly setup = new Narrative({
    narration: [
      "Tadek walks to the edge house.",
      "He brings cigarettes or a butchering job.",
      "He stays at the threshold for less than half an hour.",
      "He does not go inside.",
      "Rezeń takes what Tadek brings.",
      "The exchange is functional, not friendly.",
      "Villagers treat the visits as drinking-buddy business.",
      "Rezeń does not drink.",
      "Zbigniew does not visit Rezeń himself.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    observeTheFinalVisit: action({
      label: "Observe the final visit",
      requires: [
        new Requirement("The wolf authorization has already gone out.", {
          when: todo("Day 1–2, before the wolf authorization finishes"),
        }),
      ],
      promptedBy: [clues.DudkaFailedWolfHunt],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Tadek carries Zbigniew's real request to Rezeń: deal with the wolves. Rezeń treats the request as a call back into the village.",
        ],
        gives: {
          clues: [clues.RezenHuntsWolves],
          effects: todoEffect("World State Change: the containment arrangement ends"),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    regularPattern: opportunity({
      label: "Regular pattern",
      target: { skills: [Finesse] },
      promptedBy: [WujasVisitsButcher],
      narrative: new Narrative({
        narration: [
          "Tadek visits the edge house regularly.",
        ],
      }),
    }),
    // TODO: "Follow Tadek to the edge house" taken as attending this event.
    noFriendship: opportunity({
      label: "No friendship",
      target: { skills: [Empathy] },
      promptedBy: [WujasVisitsButcher],
      narrative: new Narrative({
        narration: [
          "`(requires: Follow Tadek to the edge house and Empathy)` — the handoff is an errand, not a social visit.",
        ],
      }),
    }),
    // TODO: "Ask Tadek Gajda" (a move on another entity) not modelled.
    tadekDeflects: opportunity({
      label: "Tadek deflects",
      target: { skills: [Empathy], when: todo("Ask Tadek Gajda") },
      promptedBy: [WujasVisitsButcher, Wujas],
      narrative: new Narrative({
        narration: [
          "`(requires: Ask Tadek Gajda and Empathy)` — he cannot explain the visits without shutting down.",
        ],
      }),
    }),
    // TODO: "Ask Zbigniew Gajda" (a move on another entity) not modelled.
    zbigniewPauses: opportunity({
      label: "Zbigniew pauses",
      target: { skills: [Empathy], when: todo("Ask Zbigniew Gajda") },
      promptedBy: [WujasVisitsButcher, Wojewoda],
      narrative: new Narrative({
        narration: [
          "`(requires: Ask Zbigniew Gajda and Empathy)` — he knows exactly what Tadek is doing.",
        ],
      }),
    }),
    // TODO: "Ask Stanisław Rezeń" (a move on another entity) not modelled.
    rezenAnswersPlainly: opportunity({
      label: "Rezeń answers plainly",
      target: { skills: [Empathy], when: todo("Ask Stanisław Rezeń") },
      promptedBy: [WujasVisitsButcher, Butcher],
      narrative: new Narrative({
        narration: [
          "`(requires: Ask Stanisław Rezeń and Empathy)` — the visits matter only as deliveries to him.",
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
