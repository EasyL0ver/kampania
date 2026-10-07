import { Location, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";
import { History, Language, Survival } from "../skills.ts";
import Glupek from "../characters/glupek.ts";
import DmytroKosach from "../characters/dmytro-kosach.ts";
import * as clues from "../clues.ts";
import { todoEffect } from "../todo.ts";

export default class UpaBunker extends Location {
  readonly id = "upa-bunker";
  readonly name = "UPA Bunker (Ziemianka)";
  // TODO: source has no ## Hook; written from the **Location:** header.
  readonly hook = "Deep forest northwest of %NEW_VILLAGE%: ventilation shafts breaking a hillside.";
  readonly position = "deep forest northwest of the village";
  readonly visitCost = 1;
  // Nobody; Edek sometimes near the entrance (not modelled).
  override present(): CharacterRef[] {
    return [Glupek];
  }

  readonly setup = new Narrative({
    narration: [
      "The bunker is an abandoned partisan ziemianka built in the mid-1940s.",
      "The dugout is low-ceilinged and earth-cut.",
      "Rotting timber reinforces the structure.",
      "The tunnel network has unknown extent.",
      "The entrance is camouflaged by vegetation and fallen trees.",
      "Ventilation shafts break the hillside.",
      "Some sections are partially collapsed.",
      "Lower areas are flooded.",
      "No recent human occupation is apparent.",
      "Rusted weapons, ammunition, Cyrillic inscriptions on wood, and rotting documents are scattered inside.",
      "One wall section has carved Cyrillic: Д. КОСАЧ and a date.",
      "A wrapped bundle near the carving contains a rusted pistol, spare ammunition, and a Ukrainian journal fragment mentioning the village by its Lemko name and a woman's name.",
      "Hazards include structural collapse, flooding, disorientation, and possible unexploded ordnance.",
    ],
    gives: { aware: [UpaBunker] },
  });

  // TODO: **Available:** "Requires forest exploration; ventilation shafts or entrance must be found." not modelled.

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // TODO: "aware of the bunker, or visible ventilation shafts or entrance" —
    // modelled as aware only.
    exploreTheBunker: action({
      label: "Explore the bunker",
      promptedBy: [UpaBunker],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The party enters the abandoned bunker and confirms old partisan use.",
        ],
        gives: { aware: [UpaBunker], clues: [clues.OldWartimePositions] },
      }),
    }),
    // TODO: pistol, ammunition and journal fragment have no item files; left as todoEffect.
    searchDmytroKosachsCache: action({
      label: "Search Dmytro Kosach's cache",
      requires: [new Requirement("You haven't explored the bunker yet.", { when: (w): boolean => w.upaBunker.allActions.exploreTheBunker.done })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The search finds the Д. КОСАЧ carving, a rusted pistol, spare ammunition, and a Ukrainian journal fragment.",
        ],
        gives: {
          aware: [DmytroKosach],
          effects: todoEffect("Item: rusted pistol | Item: spare ammunition | Item: journal fragment"),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    ventilationShafts: opportunity({
      label: "Ventilation shafts",
      target: { skills: [Survival] },
      narrative: new Narrative({
        narration: [
          "The shafts reveal an underground structure in the hillside.",
        ],
        gives: { aware: [UpaBunker] },
      }),
    }),
    upaWeaponsAndInsignia: opportunity({
      label: "UPA weapons and insignia",
      target: { skills: [History] },
      narrative: new Narrative({
        narration: [
          "The rusted weapons and markings show partisan presence.",
        ],
        gives: { clues: [clues.OldWartimePositions] },
      }),
    }),
    dmytroKosachsCache: opportunity({
      label: "Dmytro Kosach's cache",
      trigger: (w) => w.upaBunker.allActions.searchDmytroKosachsCache.done,
      target: { skills: [Language] },
      promptedBy: [UpaBunker],
      narrative: new Narrative({
        narration: [
          "The carved name, cache, and journal fragment connect Dmytro Kosach to the bunker and to Paraskewia Chyłak's cabin.",
        ],
        gives: { aware: [DmytroKosach] },
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
