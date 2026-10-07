import { Character, CharacterDescription, Narrative, Requirement, action } from "../schema.ts";
import * as clues from "../clues.ts";

export default class Sawicki extends Character {
  readonly id = "sawicki";
  readonly name = "dr Leon Sawicki";
  readonly description = new CharacterDescription({
    narration: ["dr Leon Sawicki"],
    clothes: "Not seen.",
    hairAndFace: "Not seen.",
    carriage: "Voice only, on a bad line.",
    gives: { aware: [Sawicki] },
  });
  readonly role = "authority figure, accessible only by phone";

  // ------------------------------------------------------------ actions

  readonly allActions = {
    describeTheCommonSymptoms: action({
      label: "Describe the common symptoms",
      requires: [
        new Requirement("You have no phone line out.", { when: (w) => w.pgrOffice.phoneUnlocked }),
        // TODO: "relays ONLY fever and/or muscle pain" — the "only" (not also the
        // distinctive symptoms) is not modelled.
        new Requirement("You have no symptoms to describe.", {
          when: (_w, me) => me.knows(clues.PawelekBurnsWithFever) || me.knows(clues.PawelekInMusclePain),
        }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Hearing only fever and aches, Sawicki judges it an ordinary fever going round after the flood. He expects it to pass and says to keep the child cool and watered.",
        ],
        gives: { clues: [clues.PawelekLooksLikeCommonFever] },
      }),
    }),
    describeTheDistinctiveSymptoms: action({
      label: "Describe the distinctive symptoms",
      requires: [
        new Requirement("You have no phone line out.", { when: (w) => w.pgrOffice.phoneUnlocked }),
        new Requirement("You've seen nothing distinctive yet.", {
          when: (_w, me) =>
            me.knows(clues.PawelekTurnsYellow) ||
            me.knows(clues.PawelekEyesAreRed) ||
            me.knows(clues.PawelekPassesDarkUrine),
        }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The yellow skin and dark urine settle it for him: infectious hepatitis, a sickness of the liver. He is confident. There is no drug for it, he says, so keep the child rested and warm and hope it turns. He is wrong, but he does not doubt it.",
        ],
        gives: { clues: [clues.PawelekHasHepatitis] },
      }),
    }),
    tellHimItCameFromTheWater: action({
      label: "Tell him it came from the water",
      promptedBy: [clues.PawelekGotItFromWater],
      requires: [
        new Requirement("You have no phone line out.", { when: (w) => w.pgrOffice.phoneUnlocked }),
        new Requirement("He hasn't heard the distinctive symptoms.", {
          when: (w): boolean => w.sawicki.allActions.describeTheDistinctiveSymptoms.done,
        }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Foul water changes everything for him. Not the liver sickness, the water fever, leptospirosis, a bacterial one. He drops the rest-and-hope line and prescribes penicillin at once, with a dose for a child Pawełek's size.",
        ],
        gives: { clues: [clues.PawelekHasWaterFever, clues.PawelekNeedsPenicillin] },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }
}
