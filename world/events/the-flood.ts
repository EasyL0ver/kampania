import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef } from "../schema.ts";
import { Finesse, Handiwork } from "../skills.ts";
import NewVillage from "../locations/new-village.ts";
import OldVillageRuins from "../locations/old-village-ruins.ts";
import WojewodasHouse from "../locations/wojewodas-house.ts";
import OperatorRefusesHelp from "./operator-refuses-help.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";

export default class TheFlood extends Event {
  readonly id = "the-flood";
  readonly name = "The Flood";
  readonly hook = "Rain has continued since Day 1.";
  override at(): LocationRef {
    return NewVillage;
  }

  // TODO: Present is "Everyone"; left empty.
  override present(): CharacterRef[] {
    return [];
  }

  // Day 3 morning; automatic.
  override readonly hooks: EventHook[] = [
    { text: "In the morning, water drums on roofs across the village.", heardAt: "anywhere" },
  ];

  readonly setup = new Narrative({
    narration: [
      "Players wake to heavy rain.",
      "The windows are grey with flood weather.",
      "The road the committee drove in on is gone under mud and flowing water.",
      "The bridge over the creek is underwater.",
      "The creek has become a flood channel.",
      "The village is cut off.",
      "por. Witold Skowron was supposed to return yesterday and has not.",
      "There is no car, word, or explanation from him.",
      "The phone in Zbigniew Gajda's office is the only connection to the outside if the line works.",
      "Villagers are already working with sandbags near lower houses.",
      "Michał Pytlak has PGR workers reinforcing the livestock barn.",
      "The village recognizes this as a severe flood.",
      "The water table is rising.",
      "Cellars are filling.",
      "The ground is saturated.",
      "Surveyors' stakes marking the projected flood line run across the %NEW_VILLAGE% slope, and the water is already climbing past them.",
      "The committee is outside the village's normal flood-response machinery.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    tryThePhone: action({
      label: "Try the phone",
      requires: [
        new Requirement("You can't get into Zbigniew's office.", { when: todo("Access to Zbigniew's office.") }),
      ],
      promptedBy: [WojewodasHouse],
      // TODO: "Free for the first attempt; 1 action for repeated attempts." Chose free.
      cost: [],
      narrative: new Narrative({
        narration: [
          "The line may reach the powiat office, fail, or route through the exchange. Any outside call is unreliable and monitored if Zbigniew is present.",
        ],
        gives: { aware: [OperatorRefusesHelp], clues: [clues.PhoneIsLifeline] },
      }),
    }),
    helpWithFloodResponse: action({
      label: "Help with flood response",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Players help with sandbags, drainage, or livestock. PGR workers mention that the old village floods worse because water pools there.",
        ],
        gives: {
          clues: [clues.OldVillageFlooding],
          effects: todoEffect("NPC State Change: Michał Pytlak talks more freely during shared work"),
        },
      }),
    }),
    checkOnVillagers: action({
      label: "Check on villagers",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Players go door-to-door under cover of flood safety checks.",
        ],
        gives: {
          effects: todoEffect("World State Change: players gain a natural excuse to visit any house and speak to NPCs at home"),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theWashedOutRoad: opportunity({
      label: "The washed-out road",
      target: { skills: [Handiwork] },
      promptedBy: [TheFlood],
      narrative: new Narrative({
        narration: [
          "The road failed because poor drainage and weak foundation met heavy rain. Repair will take days after the water drops.",
        ],
        gives: { clues: [clues.RoadWashesOut] },
      }),
    }),
    theOfficePhone: opportunity({
      label: "The office phone",
      target: { skills: [Finesse] },
      promptedBy: [TheFlood],
      narrative: new Narrative({
        narration: [
          "Zbigniew Gajda offers access and stays close enough to hear what is reported.",
        ],
        gives: { clues: [clues.PhoneIsLifeline] },
      }),
    }),
    theVillageResponse: opportunity({
      label: "The village response",
      target: { skills: [Finesse] },
      promptedBy: [TheFlood],
      narrative: new Narrative({
        narration: [
          "Zbigniew gives quiet orders, Pytlak runs the PGR response, and villagers ignore outsider attempts to lead.",
        ],
      }),
    }),
    // TODO: "prior visit to %OLD_VILLAGE%" approximated as knowing the ruins exist.
    theRisingWaterTable: opportunity({
      label: "The rising water table",
      target: { skills: [Handiwork], aware: [OldVillageRuins] },
      promptedBy: [TheFlood],
      narrative: new Narrative({
        narration: [
          "`(requires: Handiwork and prior visit to %OLD_VILLAGE%)` — the well at the old village is filling too.",
        ],
        gives: { clues: [clues.OldVillageFlooding] },
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
