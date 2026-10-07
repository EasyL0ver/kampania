import { Item, Narrative, Requirement, action } from "../schema.ts";
import * as clues from "../clues.ts";

export default class WaterHoseContraption extends Item {
  readonly id = "water-hose-contraption";
  readonly name = "Water Hose Contraption";
  readonly hook = "A long, mud-stiffened coil of cracked rubber irrigation hose.";
  readonly what = "a length of irrigation hose";
  readonly description = new Narrative({
    narration: [
      "A long coil of rubber irrigation hose, cracked at the bends and stiff with dried mud. The ends are open and wide enough to hold water. Filled and held up at both ends, the water settles to the same height on each side, a farmer's level: the trick used to lay out ditches and terraces dead flat. The rubber is opaque, so the water gets read at the open mouths, a bottle neck jammed into each end as a sight glass for a clean line; you run water through first to chase the air bubbles that throw the reading. Distance costs it nothing, water finds the same level however far the hose runs, but it only compares points of near-equal height, so climbing a rise means leapfrogging one rod-length at a time. The number of steps follows the height gained, not the distance, so a long gentle run is a lot of hose but not endless stations. Paired with the kit's plumb line, it lets a handy pair of hands read the plug's sill against the flood mark the slow way, where a geologist would just use the level.",
    ],
  });

  // ------------------------------------------------------------ actions

  // "Level a relative point": 2 cards per point, the player picks the point.
  // TODO: split into one action per point (my choice; same in geologists-kit). Confirm.
  readonly allActions = {
    levelTheLowerVillage: action({
      label: "Level a relative point: the lower village",
      requires: [new Requirement("You don't have the hose.", { items: [WaterHoseContraption] })],
      promptedBy: [clues.FloodMarkLeftByDamBuilders],
      cost: [{ time: 2 }],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { clues: [clues.LowerVillageLevel] },
      }),
    }),
    levelTheUpperVillage: action({
      label: "Level a relative point: the upper village",
      requires: [new Requirement("You don't have the hose.", { items: [WaterHoseContraption] })],
      promptedBy: [clues.FloodMarkLeftByDamBuilders],
      cost: [{ time: 2 }],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { clues: [clues.UpperVillageLevel] },
      }),
    }),
    levelTheSouthernRise: action({
      label: "Level a relative point: the southern rise",
      requires: [new Requirement("You don't have the hose.", { items: [WaterHoseContraption] })],
      promptedBy: [clues.FloodMarkLeftByDamBuilders],
      cost: [{ time: 2 }],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { clues: [clues.SouthernRiseLevel] },
      }),
    }),
    levelTheOldVillageBowl: action({
      label: "Level a relative point: the old-village bowl",
      requires: [new Requirement("You don't have the hose.", { items: [WaterHoseContraption] })],
      promptedBy: [clues.FloodMarkLeftByDamBuilders],
      cost: [{ time: 2 }],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { clues: [clues.OldVillageBowlLevel] },
      }),
    }),
    levelTheBigBasinFloor: action({
      label: "Level a relative point: the %BIG-BASIN% floor",
      requires: [new Requirement("You don't have the hose.", { items: [WaterHoseContraption] })],
      promptedBy: [clues.FloodMarkLeftByDamBuilders],
      cost: [{ time: 2 }],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { clues: [clues.BigBasinFloorLevel] },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }
}
