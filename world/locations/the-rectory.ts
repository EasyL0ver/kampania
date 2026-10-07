import { Location, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";
import { Chainsmoker } from "../skills.ts";
import Priest from "../characters/priest.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";

export default class TheRectory extends Location {
  readonly id = "the-rectory";
  readonly name = "The Rectory (Plebania)";
  readonly hook = "The plebania beside the church in %NEW_VILLAGE%.";
  readonly position = "plebania beside the church";
  readonly visitCost = 1;
  // The priest is usually inside (not modelled).
  override present(): CharacterRef[] {
    return [Priest];
  }

  readonly setup = new Narrative({
    narration: [
      "The plebania stands adjacent to the church.",
      "The plebania has a stone foundation older than %NEW_VILLAGE%, a kitchen, a book-lined study, a spare room with a cot, and a cellar.",
      "The study is small and cold, with one lamp and the parish ledger.",
      "The cellar has stone walls, old liturgical supplies, jars, dust, and a door with a newer padlock.",
      "A thread of stale tobacco hangs in the study, though no ashtray is in sight.",
    ],
    gives: { aware: [TheRectory] },
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // TODO: "after the priest shelters Edek" cellar contents are a conditional
    // part of the outcome; left in the todoEffect.
    searchTheRectory: action({
      label: "Search the rectory",
      requires: [new Requirement("The priest is watching.", { when: todo("Priest absent or distracted") })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The parish ledger records Hania Barnaś's First Communion in the early 1950s; after the priest shelters Edek, the cellar also holds a straw mattress, blanket, food scraps, and a water jug.",
        ],
        gives: {
          clues: [clues.BarnasHadADaughterHania],
          effects: todoEffect("NPC State Change: if Edek is in the cellar, players can confront the priest about hiding him."),
        },
      }),
    }),
    findTheHiddenCigarettes: action({
      label: "Find the hidden cigarettes",
      requires: [new Requirement("The priest is watching.", { when: todo("Priest absent or distracted") })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Tucked out of sight is a pack of Carmen, the premium brand. He smokes the same brand the village would name at Janina's door, and hides it.",
        ],
        gives: { clues: [clues.PriestSmokesCarmen] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theSmokeUnderTheDamp: opportunity({
      label: "The smoke under the damp",
      target: { skills: [Chainsmoker] },
      narrative: new Narrative({
        narration: [
          "The stale smell and a smoker's stain on his fingers give him away. The priest smokes, and hides it. The brand does not show from this alone.",
        ],
        gives: { clues: [clues.PriestSmokes] },
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
