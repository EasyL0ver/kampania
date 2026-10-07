import { Item, Narrative, Requirement, SkillRequirement, action } from "../schema.ts";
import { Culture, Language } from "../skills.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";
import Babcia from "../characters/babcia.ts";

export default class ParaskewiasList extends Item {
  readonly id = "paraskewias-list";
  readonly name = "Paraskewia's List of the Dead";
  readonly hook = "A soft, much-folded sheet covered in old Cyrillic handwriting and small crosses.";
  readonly what = "a written roll of names (document / relic)";
  readonly description = new Narrative({
    narration: [
      "A single sheet, soft as cloth from twenty years of handling, folded and refolded until the creases have gone furry. Names written in Cyrillic in a careful, old-fashioned hand — Paraskewia's. Some in ink gone brown, some later ones in pencil, a few traced over twice where the line faded. A small cross is inked beside each name. It is not a document in any official sense. It is a woman keeping her dead from disappearing, one name at a time, because no state, church, or grave ever would.",
      "To anyone without the language it is a column of foreign letters. To anyone who can read it, it is a village.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    readTheNames: action({
      label: "Read the names",
      requires: [
        new Requirement("You don't have the list.", { items: [ParaskewiasList] }),
        new SkillRequirement(Language, Culture),
      ],
      cost: [],
      narrative: new Narrative({
        narration: [
          "The players can now name the 1947 dead — the twelve villagers and Dmytro Kosach — the core of the truth the rite requires. Without the skill, the names stay locked in the script until someone reads it for them.",
        ],
        gives: { clues: [clues.ParaskewiaNamedTheDead] },
      }),
    }),
    takeItToBabcia: action({
      label: "Take it to Babcia",
      requires: [
        new Requirement("You don't have the list.", { items: [ParaskewiasList] }),
        new Requirement("You can't get to Stefania Kopacz.", { when: todo("access to Stefania Kopacz") }),
      ],
      promptedBy: [Babcia],
      cost: [{ time: 1 }],
      // TODO: could become a typed state on Babcia (willing to go to the well) once babcia.ts models it.
      narrative: new Narrative({
        narration: [
          "She didn't know these people — she is Lemko, but from another village, a stranger to %OLD_VILLAGE%. It doesn't matter. She reads the Cyrillic aloud in the old tongue, slow and certain, and over each name she says the words for the dead. An elder giving twelve strangers the mourning no one ever gave them, because they are her people by blood and by faith. The fog lifts while she reads. She can't confirm the list is complete — only Paraskewia could — but she can give it the prayer, binding the Words to the names.",
        ],
        gives: { effects: todoEffect("NPC State Change: Reading her people's names moves Babcia toward being willing to go to the well.") },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }
}
