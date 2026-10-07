import { Character, CharacterDescription, Narrative, Requirement, action } from "../../schema.ts";
import { todo } from "../../todo.ts";
import Wujas from "../wujas.ts";

export default class DrinkingCrew extends Character {
  readonly id = "drinking-crew";
  readonly name = "Tadek Gajda's Drinking Circle";
  readonly description = new CharacterDescription({
    narration: ["The loose pack of village drunks who drink with Tadek Gajda, seen outside the store and at the still."],
    clothes: "",  // TODO: appearance
    hairAndFace: "",  // TODO: appearance
    carriage: "",  // TODO: appearance
    gives: { aware: [DrinkingCrew] },
  });
  readonly role = "Tadek Gajda's regular drinking companions";

  // ------------------------------------------------------------ state

  // Mechanics — Hostile: shared crew state, set by Caught at the Still.
  hostile = false;

  // ------------------------------------------------------------ actions

  readonly allActions = {
    drinkWithTheCrew: action({
      label: "Drink with the crew",
      requires: [
        // TODO: "Drink" is not a card in skills.ts; kept as todo together with Alcoholic.
        new Requirement("You'd have to drink with them.", { when: todo("Drink or Alcoholic") }),
        new Requirement("The crew isn't here.", { when: todo("crew present (outside the store or at the still) or an invitation from Tadek") }),
        new Requirement("The crew wants nothing to do with you.", { when: (w) => !w.drinkingCrew.hostile }),
      ],
      promptedBy: [Wujas],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The committee buys a round and shares a full session in the drinking circle. Tadek warms to whoever kept pace without judging him.",
        ],
        gives: { effects: (w, me) => { w.wujas.drinkingBuddy.set(me, true); } },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }
}
