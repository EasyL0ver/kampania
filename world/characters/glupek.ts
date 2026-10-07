import { Character, CharacterDescription, Narrative, PerPlayer, Requirement, action } from "../schema.ts";
import type { Checks, LocationRef } from "../schema.ts";
import * as clues from "../clues.ts";
import { todo } from "../todo.ts";
import CiotkasHouse from "../locations/ciotkas-house.ts";

// Mechanic "Shelter": after Edek in the Bunker he is sheltered at the priest's
// (rectory cellar) or at Helena's — never both.
export type Shelter = "none" | "at-the-priests" | "at-helenas";

export default class Glupek extends Character {
  readonly id = "glupek";
  readonly name = "Edek Barnaś";
  readonly description = new CharacterDescription({
    narration: ["Edek Barnaś, Janina Gajda's large, simple-minded son and dependent."],
    clothes: "Always too small — trousers ending above the ankle, sleeves too short; whatever his aunt can find.",
    hairAndFace: "Blond hair cropped unevenly by his aunt's kitchen scissors; soft round boy's face, pale blue eyes.",
    carriage: "Huge for seventeen, with man's shoulders and boy's movements; moves slowly and goes still when frightened.",
    gives: { aware: [Glupek] },
  });

  // ------------------------------------------------------------ shared state (A pass)

  // fled to the UPA bunker after ciotka-found-dead
  inBunker = false;
  readonly role = "son of Edward Barnaś";
  livesAt: LocationRef = CiotkasHouse;

  // ------------------------------------------------------------ state

  // set by edek-in-the-bunker
  shelter: Shelter = "none";
  // "Edek warms to kind players" (NPC state from Talk to Edek).
  warm = new PerPlayer(false);

  // ------------------------------------------------------------ actions

  readonly allActions = {
    talkToEdek: action({
      label: "Talk to Edek",
      requires: [
        new Requirement("You can't get him alone or with Janina.", {
          when: todo("Janina Gajda present, or Edek found alone outside"),
        }),
      ],
      cost: [],
      narrative: new Narrative({
        narration: [
          "He answers in short, simple sentences. He can give his routines, likes, dislikes, and basic memories of living with Janina.",
        ],
        gives: {
          aware: [Glupek],
          effects: (w, me) => { w.glupek.warm.set(me, true); },
        },
      }),
    }),
    askEdekAboutHisMother: action({
      label: "Ask Edek about his mother",
      cost: [],
      narrative: new Narrative({
        narration: [
          "He calls Janina \"auntie,\" not mother. When asked about his real parents, he says he has only ever had his aunt.",
        ],
        gives: { clues: [clues.CiotkaAdoptedGlupek] },
      }),
    }),
    askEdekAboutTheButcher: action({
      label: "Ask Edek about the butcher",
      promptedBy: [Glupek],
      cost: [],
      narrative: new Narrative({
        narration: [
          "He goes quiet and small. He says the butcher's dogs make him hide, and when Rezeń passes he cannot move. He does not know why.",
        ],
        gives: { clues: [clues.GlupekFearsButcher] },
      }),
    }),
    censusInterview: action({
      label: "Census interview",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He gives short, willing answers: his name and that he lives with his aunt. If asked his age, he looks to Janina.",
        ],
        gives: { effects: (w) => { w.glupek.censusTaken = true; } },
      }),
    }),
    propertyAssessment: action({
      label: "Property assessment",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He does not understand the question. He says it is his aunt's house.",
        ],
        gives: { effects: (w) => { w.glupek.propertyRecorded = true; } },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }

  // ------------------------------------------------------------ bond

  bond: Checks = [
    "Talk to him directly",
    "Show interest in something he cares about",
    "Defend him when someone is dismissive or cruel",
  ];
}
