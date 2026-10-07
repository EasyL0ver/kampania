import { Location, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";
import { Handiwork, Survival } from "../skills.ts";
import * as clues from "../clues.ts";
import { todo } from "../todo.ts";

export default class TheIrrigationDitch extends Location {
  readonly id = "the-irrigation-ditch";
  readonly name = "The Irrigation Ditch";
  readonly hook = "The ditch running from the PGR fields down to the low ground east of %NEW_VILLAGE%.";
  readonly position = "PGR fields down to the low ground east of the village";
  // TODO: "1 action to reach; walking its length costs by action."
  readonly visitCost = 1;
  override present(): CharacterRef[] {
    return [];
  }

  readonly setup = new Narrative({
    narration: [
      "The ditch begins at a concrete head by the PGR fields, which Zbigniew Gajda calls the village's flood drain.",
      "The concrete lining is sound but runs only a short stretch; past it the channel bends away toward the low ground and out of sight.",
      "From the head alone it reads as a fine concrete channel of ample capacity.",
      "Past the concrete it degrades to a shallow, unlined dugout for most of its length. Nothing at the head announces this; only walking the full length reveals it.",
      "The channel runs a long way, fields to low ground, over rough and boggy going.",
      "Where the dugout peters out into the low ground, one broad patch grows rank and wrong: coarse cereal sprouting thick and volunteer, the wet soil beneath it caked and sour.",
    ],
    gives: { aware: [TheIrrigationDitch] },
  });

  // TODO: **Available:** "Daytime, any day" not modelled.
  // TODO: no tape-measure item exists; "A tape" is a todo gate.

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // "Requires: Following the ditch its full length" = doing this action; omitted.
    walkTheIrrigationDitch: action({
      label: "Walk the irrigation ditch",
      promptedBy: [clues.DitchIsCandidateDrain],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The concrete lining ends after a short run and the channel becomes a plain earth dugout the rest of the way. Walking it tells you the concrete does not go all the way. It does not tell you whether that is a fault, a shortfall against spec, or the intended build, and it does not tell you whether the ditch can carry the flood.",
        ],
        gives: { clues: [clues.DitchConcreteStopsShort] },
      }),
    }),
    measureTheConcreteHead: action({
      label: "Measure the concrete head",
      requires: [new Requirement("You have nothing to measure with.", { when: todo("A tape at the concrete head") })],
      promptedBy: [clues.DitchIsCandidateDrain],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "You tape off the lined channel at the head: width, depth, and fall. No skill needed. The figures alone say nothing; someone who can run drainage figures turns them into a drainage answer.",
        ],
        gives: { clues: [clues.ConcreteDitchMeasurements] },
      }),
    }),
    measureTheDugout: action({
      label: "Measure the dugout",
      promptedBy: [clues.DitchConcreteStopsShort],
      requires: [
        new Requirement("You have nothing to measure with.", { when: todo("A tape") }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Where the concrete gives out, you tape off the earth channel: width and depth of the shallow dugout that runs the rest of the way. No skill needed. Paired with the head figures, anyone who can run drainage figures can size the real ditch.",
        ],
        gives: { clues: [clues.DugoutMeasurements] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theRankPatch: opportunity({
      label: "The rank patch",
      target: { when: (_w, me) => me.has(Survival) || me.has(Handiwork) },
      promptedBy: [TheIrrigationDitch],
      narrative: new Narrative({
        narration: [
          "The thick volunteer cereal and the sour, caked ground read plainly to a country eye: a large quantity of grain was tipped out here and left to rot, not spread as feed or sown as seed.",
        ],
        gives: { clues: [clues.GrainHasBeenDumped] },
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
