import { Location, Narrative, Requirement, action } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";
import Butcher from "../characters/butcher.ts";
import Hag from "../characters/hag.ts";
import OldVillageCerkiew from "./old-village-cerkiew.ts";
import * as clues from "../clues.ts";
import { todo } from "../todo.ts";

export default class OldVillageRuins extends Location {
  readonly id = "old-village-ruins";
  readonly name = "%OLD_VILLAGE% — Homestead Ruins";
  // TODO: source has no ## Hook; written from the **Location:** header.
  readonly hook = "The burned ruins of %OLD_VILLAGE%: stone foundations and chimneys in the forest.";
  readonly position = "scattered across %OLD_VILLAGE%: foundations and chimneys";
  // TODO: "1 action per area searched".
  readonly visitCost = 1;
  // Nobody by day; Rezeń visits the well regularly; Paraskewia holds night rites
  // at the well (not modelled).
  override present(): CharacterRef[] {
    return [Butcher, Hag];
  }

  readonly setup = new Narrative({
    narration: [
      "Wooden buildings burned in 1947.",
      "Stone foundations survived.",
      "Stone foundations stand 1–2 feet above ground level.",
      "Chimneys are partially intact.",
      "Interiors are flooded or filled with debris.",
      "Underground root cellars and storage pits remain; many are water-filled.",
      "Pottery shards, rusted tools, and household fragments lie on the surface.",
      "Overgrown orchards still bear apples and plums.",
      "Hidden cellar holes, unstable stones, and flooded cellars make searching dangerous.",
      "Burn marks remain on surviving stone.",
      "The well is stone-lined, its top partially collapsed or sealed with debris; moss and age on the stone, the interior dark, depth unknown, water level obscured.",
      "Some well debris has been cleared recently; other debris piled back; candle wax is present near the disturbed debris.",
      "Cigarette butts collect in the grass and stone cracks around the well rim, more than any single visit would leave.",
      "If dam floods reach %OLD_VILLAGE%, the well goes underwater.",
      "Well hazards: unstable stone, unknown depth, water, unsafe excavation.",
      "Day 2+ after the wolf hunt: fresh blood can be visible on the well's stone rim.",
      "Set apart from the homestead ruins, a larger timber building still stands: the village cerkiew, its roof sagging and fire-marked but upright.",
    ],
    gives: { aware: [OldVillageRuins] },
  });

  // TODO: **Available:** "After reaching %OLD_VILLAGE%." not modelled.

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // Was an ungated opportunity. Ungated is Setup, but Setup can't give a clue.
    burnedBuildings: action({
      label: "Burned buildings",
      promptedBy: [OldVillageRuins],
      cost: [],
      narrative: new Narrative({
        narration: [
          "The wooden buildings stand charred and collapsed; the village burned.",
        ],
        gives: { clues: [clues.OldVillageWasBurned] },
      }),
    }),
    // Was an ungated opportunity.
    theOldChurch: action({
      label: "The old church",
      promptedBy: [OldVillageRuins],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Apart from the homesteads a larger timber building still stands, clearly the village cerkiew.",
        ],
        gives: { aware: [OldVillageCerkiew] },
      }),
    }),
    investigateTheAreaAroundTheWell: action({
      label: "Investigate the area around the well",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "A close look at the rim turns up cigarette butts in the grass and stone cracks and burnt-down candles left around the well.",
        ],
        gives: { clues: [clues.CigaretteButtsByTheWell, clues.CandlesByTheWell] },
      }),
    }),
    // Second "Investigate the area around the well" in the source.
    investigateTheAreaAroundTheWellAgain: action({
      label: "Investigate the area around the well, a day later",
      promptedBy: [clues.CandlesByTheWell],
      requires: [
        new Requirement("Nothing has changed since your last look.", { when: todo("one day passing") }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The candles from the earlier visit have been replaced with fresh ones. Someone tends the well on a regular basis.",
        ],
        gives: { clues: [clues.SomeoneTendsTheWellRegularly] },
      }),
    }),
    // Third "Investigate the area around the well" in the source.
    investigateTheAreaAroundTheWellAfterTheHunt: action({
      label: "Investigate the area around the well, after the hunt",
      requires: [new Requirement("There's nothing new on the rim.", { when: (w) => w.huntWithRezen.succeeded })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Minor blood stains mark the stone around the well rim.",
        ],
        gives: { clues: [clues.BloodStainsByTheWell] },
      }),
    }),
    lookInsideTheWell: action({
      label: "Look inside the well",
      cost: [{ time: 1 }, { composure: 1 }],
      narrative: new Narrative({
        narration: [
          "Leaning over the shaft, you feel a compulsion to climb in. Lose 1 composure.",
        ],
        gives: { clues: [clues.YouShouldJumpInside] },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }
}
