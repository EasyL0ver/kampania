import { Item, Narrative, Requirement, SkillRequirement, action } from "../schema.ts";
import { Bureaucracy } from "../skills.ts";
import * as clues from "../clues.ts";
import { todo } from "../todo.ts";

export default class BarnasDepartureDeclaration extends Item {
  readonly id = "barnas-departure-declaration";
  readonly name = "Edward Barnaś's Departure Declaration";
  readonly hook = "A single stamped administrative sheet with a dated signature.";
  readonly what = "property record (forged document)";
  readonly description = new Narrative({
    narration: [
      "A single administrative sheet, official stamps, dated 1954. It records Edward Barnaś surrendering his house, buildings, and land and resettling his household west \"of his own free will.\" At the bottom, his signature. The paper is what let the \"they moved away\" story stand for thirteen years.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    compareItAgainstEdwardsHand: action({
      label: "Compare it against Edward's hand",
      requires: [
        new Requirement("You don't have the declaration.", { items: [BarnasDepartureDeclaration] }),
        // TODO: the love letters to "M.K." (Ciotka's backyard cache) have no item file yet.
        new Requirement("You have no sample of Edward's writing.", { when: todo("a genuine sample of Edward's writing: his love letters to M.K. buried in Ciotka's backyard") }),
        new SkillRequirement(Bureaucracy),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Held beside the letters, the signature doesn't match the man who wrote them — the letters flow, this is stiff and traced. Someone copied his hand.",
        ],
        gives: { clues: [clues.DepartureDeclarationForged] },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }
}
