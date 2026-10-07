import { Item, Narrative, Requirement, SkillRequirement, action, opportunity } from "../schema.ts";
import { Chainsmoker, Finesse, Survival } from "../skills.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";

// "A scatter of butts" (requires: nothing) gave nothing: it is description, kept in prose.
export default class CigaretteButtsFromCiotkas extends Item {
  readonly id = "cigarette-butts-from-ciotkas";
  readonly name = "Carmen Cigarette Butts";
  readonly hook = "A small scatter of rain-softened, hand-pinched cigarette butts.";
  readonly what = "evidence (physical trace)";
  readonly description = new Narrative({
    narration: [
      "A small scatter of hand-pinched butts, oval, all one brand: Carmen. An aromatic premium smoke, dearer than the Sport and Extra Mocne the village runs on and rarely seen this far out. Rain has swollen them grey and soft. They were dropped at least a day before Janina died, not the night of.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    presentTheButtsAsEvidence: action({
      label: "Present the butts as evidence",
      requires: [
        new Requirement("You don't have the butts.", { items: [CigaretteButtsFromCiotkas] }),
        new Requirement("You need an audience: an accusation or the report.", { when: todo("a public accusation or the committee's report") }),
      ],
      promptedBy: [clues.ButtsAtCiotkasAreCarmen],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Naming the Carmen brand in the open turns the village on its two Carmen men, and set beside the boy's gifted Carmen it can be bent against Edek instead. It is a false lead: the butts are a day old and clear the death night (see above). Brandished without that caveat, they push a wrong verdict and feed the hunt for a scapegoat.",
        ],
        gives: {
          effects: todoEffect("World State Change: suspicion hardens against the Carmen smoker named | Ending Progress: advances a wrongful-punishment ending (The Lynch)"),
        },
      }),
    }),
    compareTheDoorAndWellButts: action({
      label: "Compare the door and well butts",
      requires: [
        new Requirement("You don't have the butts from Janina's door.", { items: [CigaretteButtsFromCiotkas] }),
        // TODO: the handful of butts gathered at the well has no item file.
        new Requirement("You don't have the butts from the well.", { when: todo("Holding the handful gathered at the well") }),
      ],
      promptedBy: [clues.CiotkaIsDead],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Laid side by side, both scatters are the same oval Carmen. The man who haunts the well left the same brand at her threshold.",
        ],
        gives: { clues: [clues.DoorAndWellButtsMatch] },
      }),
    }),
    compareWithTheCigaretteInEdeksRoom: action({
      label: "Compare with the cigarette in Edek's room",
      requires: [
        new Requirement("You don't have the butts.", { items: [CigaretteButtsFromCiotkas] }),
        // TODO: the single cigarette found in Edek's room has no item file.
        new Requirement("You don't have Edek's cigarette.", { when: todo("Holding the single cigarette found in Edek's room") }),
        new SkillRequirement(Finesse, Survival, Chainsmoker),
      ],
      promptedBy: [clues.ButtsAtCiotkasAreCarmen],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Laid side by side, the unsmoked cigarette from the boy's corner is the same oval Carmen as the butts at the door. Edek does not smoke, so someone gave it to him. Who can be learned by asking Edek.",
        ],
        gives: { clues: [clues.EdekHasCarmenCigarette] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    readTheBrand: opportunity({
      label: "Read the brand",
      target: { skills: [Chainsmoker] },
      promptedBy: [clues.CiotkaIsDead],
      narrative: new Narrative({
        narration: [
          "The oval shape and aroma give it away: Carmen, a premium smoke rarely seen this far out.",
        ],
        gives: { clues: [clues.ButtsAtCiotkasAreCarmen] },
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
