import { Event, Narrative, Requirement, SkillRequirement, action } from "../schema.ts";
import NewVillage from "../locations/new-village.ts";
import type { CharacterRef, EventHook, LocationRef, Tick, World, WorldCond } from "../schema.ts";
import { Finesse } from "../skills.ts";
import * as clues from "../clues.ts";
import { todoEffect } from "../todo.ts";
import BarbarasHouse from "../locations/barbaras-house.ts";
import OldVillageCerkiew from "../locations/old-village-cerkiew.ts";
import OldVillageRuins from "../locations/old-village-ruins.ts";
import Hag from "../characters/hag.ts";

export default class HagsPrayer extends Event {
  readonly id = "hags-prayer";
  readonly name = "Hag's Prayer";
  // TODO: hook shortened from the ## Hook bullet (full text in prose).
  readonly hook = "Faint singing on the wind from the forest at night, heard from Barbara's House or outside.";

  // Heard from Barbara's House; following the singing leads to the cerkiew.
  // TODO: header names Barbara's House; the Setup and opportunities happen at the cerkiew.
  override at(w: World): LocationRef {
    return w.hagsPrayer.allActions.followTheSinging.done ? OldVillageCerkiew : BarbarasHouse;
  }

  // Heard, not seen.
  override present(): CharacterRef[] {
    return [Hag];
  }
  // TODO: "Any night, while Paraskewia is alive and not hostile" — fires every night; not modelled.
  override readonly hooks: EventHook[] = [
    { text: "Faint singing carries on the wind from the forest.", heardAt: [BarbarasHouse, NewVillage] },
  ];
  // Recurring: once over, it can happen again.
  resolve: Tick = (w) => { w.hagsPrayer.status = "pending"; };
  override condition: WorldCond = (w) => w.hag.alive && !w.hag.hostile;
  readonly setup = new Narrative({
    narration: [
      "Following the singing leads to the old-village cerkiew.",
      "The ruined nave is dark but for her candles and a low fire; incense, bread, and honey are set on the stones.",
      "Paraskewia Chyłak stands over the well, singing the names of the dead; the sound carries off the bare stone.",
      "The instant she sees or hears the players, the singing stops and she is gone into the forest.",
    ],
  });

  // TODO: mechanic "She cannot be caught here" not modelled yet (see prose/events/hags-prayer.md)

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // Was an ungated opportunity.
    hearTheSinging: action({
      label: "Hear the singing",
      promptedBy: [HagsPrayer],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Being here at night, the players hear it themselves: a woman singing prayers out in the forest.",
        ],
        gives: { clues: [clues.SingingInTheNight] },
      }),
    }),
    // Was an ungated opportunity.
    // TODO: gated on following the singing, since she is at the well — source had no gate.
    noticeTheHag: action({
      label: "Notice the hag",
      requires: [
        new Requirement("She's at the well; follow the singing first.", {
          when: (w): boolean => w.hagsPrayer.allActions.followTheSinging.done,
        }),
      ],
      promptedBy: [HagsPrayer],
      cost: [],
      narrative: new Narrative({
        narration: [
          "A woman is there at the well, singing, before she bolts into the dark.",
        ],
        gives: { aware: [Hag] },
      }),
    }),
    followTheSinging: action({
      label: "Follow the singing",
      promptedBy: [HagsPrayer],
      cost: [{ time: 1 }],
      // TODO: Gives said the ruins; the outcome says the cerkiew. Kept the ruins.
      narrative: new Narrative({
        narration: [
          "The singing leads through the forest to the old-village cerkiew.",
        ],
        gives: { aware: [OldVillageRuins] },
      }),
    }),
    sneakCloserAndWatch: action({
      label: "Sneak closer and watch",
      requires: [new SkillRequirement(Finesse)],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "You creep closer through the dark, near enough to the well to watch Paraskewia perform the full rite unseen: fire, incense, bread, honey, and the names of the dead sung one by one.",
        ],
        gives: { clues: [clues.HagPerformsRite] },
      }),
    }),
    chaseAfterHer: action({
      label: "Chase after her",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "You break cover and run after her. She is gone into the dark before you reach the well and the chase fails. She has now seen the players come at her, and she knows the village means her harm.",
        ],
        gives: {
          effects: (w) => {
            w.hag.hostile = true;
          },
        },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }
}
