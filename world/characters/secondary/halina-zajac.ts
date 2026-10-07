import { Character, CharacterDescription, Narrative, Requirement, action } from "../../schema.ts";
import type { Checks } from "../../schema.ts";
import { todo } from "../../todo.ts";
import * as clues from "../../clues.ts";

export default class HalinaZajac extends Character {
  readonly id = "halina-zajac";
  readonly name = "Halina Zając";
  readonly description = new CharacterDescription({
    narration: ["Halina Zając, the woman behind the counter at Helena Rzepka's store."],
    clothes: "Not specified.",
    hairAndFace: "Not specified.",
    carriage: "Not specified.",
    gives: { aware: [HalinaZajac] },
  });

  readonly role = "store worker, Helena Rzepka's employee";
  // Works at Helena Rzepka's store; no home given in the Markdown, so no livesAt.

  // ------------------------------------------------------------ actions

  readonly allActions = {
    askWhoSmokesWhat: action({
      label: "Ask who smokes what",
      requires: [
        new Requirement("Halina doesn't trust you enough.", { when: (w, me) => w.halinaZajac.bonded.of(me) }),
        // TODO: "at the counter" is location/presence state, not modelled.
        new Requirement("You need to catch her at the counter.", { when: todo("at the counter") }),
      ],
      promptedBy: [clues.ButtsAtCiotkasAreCarmen],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Nobody reads the village like the woman at the till. She rattles off who buys what: the cheap Sport that Tadek and half the valley burn through, and the pricey Carmen only two men ever pay for, the Gajda boy Marek and the butcher Rezeń. The brand marks the man, and she keeps the accounts in her head.",
        ],
        gives: { clues: [clues.JuniorSmokesCarmen, clues.ButcherSmokesCarmen, clues.TadekSmokesCheapest] },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }

  // ------------------------------------------------------------ bond

  bond: Checks = [
    "Take her side against Helena Rzepka",
    "Deal with or clear out the drunks at her counter",
    "Ask about her work and what she notices",
  ];
}
