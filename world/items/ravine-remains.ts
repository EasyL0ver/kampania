import { Item, Narrative, Requirement, SkillRequirement, action } from "../schema.ts";
import { Medicine } from "../skills.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";
import Priest from "../characters/priest.ts";

export default class RavineRemains extends Item {
  readonly id = "ravine-remains";
  readonly name = "Remains from the Ravine";
  readonly hook = "A grim bundle of loose bones and a rotted coat, wrapped for carrying.";
  readonly what = "unidentified human remains";
  readonly description = new Narrative({
    narration: [
      "A rotted coat, its colour long gone to the soil, and a scatter of bones — incomplete, gnawed and shifted by thirteen years of forest. No skull, so nothing that carries a face or a name. Wrapped in whatever the players had to hand, it is a light, grim bundle that smells of wet earth. To an untrained eye it could be anyone — Dudka called it Hania and buried it. But the bones themselves still hold facts for someone who knows how to read them: whether it's a man or a woman, how old, how they died. The name is gone; the body is not yet silent.",
    ],
  });

  // ------------------------------------------------------------ actions

  // "Examine the remains (Medicine)": 1 card per examination, deepening up to three,
  // in order. Split into three actions, each gated on the previous one.
  readonly allActions = {
    examineTheRemains: action({
      label: "Examine the remains",
      requires: [
        new SkillRequirement(Medicine),
        new Requirement("You don't have the remains.", { items: [RavineRemains] }),
      ],
      promptedBy: [clues.DudkaBuriedAFriendAtTheRavine],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "First examination — it's a woman. The pelvis and the surviving long bones read female. Whoever this was, she was a grown woman, not a child.",
        ],
        gives: { clues: [clues.RavineRemainsAWoman] },
      }),
    }),
    examineTheRemainsAgain: action({
      label: "Examine the remains: a second examination",
      requires: [
        new SkillRequirement(Medicine),
        new Requirement("You don't have the remains.", { items: [RavineRemains] }),
        new Requirement("Start with a first examination.", { when: (w): boolean => w.ravineRemains.allActions.examineTheRemains.done }),
      ],
      promptedBy: [clues.RavineRemainsAWoman],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Second examination — she died from a fall. The fracture pattern tells it: multiple breaks from a single heavy impact — ribs, a long bone, the way they splintered. Not a beating, not a blade. She fell from a height onto hard ground. Consistent with going over the edge of the ravine this meadow overlooks.",
        ],
        gives: { clues: [clues.RavineRemainsDiedFromFall] },
      }),
    }),
    examineTheRemainsAThirdTime: action({
      label: "Examine the remains: a third examination",
      requires: [
        new SkillRequirement(Medicine),
        new Requirement("You don't have the remains.", { items: [RavineRemains] }),
        new Requirement("A second examination comes first.", { when: (w): boolean => w.ravineRemains.allActions.examineTheRemainsAgain.done }),
      ],
      promptedBy: [clues.RavineRemainsDiedFromFall],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Third examination — she was around thirty. Bone density, joint wear, the fused ends of the long bones put her near thirty, give or take a couple of years. Not a teenager. A woman in her thirties.",
        ],
        gives: { clues: [clues.RavineRemainsAround30] },
      }),
    }),
    giveTheRemainsABurial: action({
      label: "Give the remains a burial",
      requires: [
        new Requirement("You don't have the remains.", { items: [RavineRemains] }),
        new Requirement("Someone has to say the words over her.", { when: todo("a willing officiant: ks. Władysław Pająk, or the players themselves") }),
      ],
      promptedBy: [Priest],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The bones go back into the ground with words said over them — in the churchyard, or wherever the players choose. Whoever she was, someone finally treated her as a person with a name, even if the name is a guess. It settles nothing factual and it changes the people who do it.",
        ],
        gives: { effects: todoEffect("World State Change: the remains are laid to rest; the players have chosen to honor a death they can't prove.") },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }
}
