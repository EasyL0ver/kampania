import { Character, CharacterDescription, Narrative, action, opportunity } from "../../schema.ts";
import { Survival } from "../../skills.ts";
import * as clues from "../../clues.ts";

export default class StaszekPytlak extends Character {
  readonly id = "staszek-pytlak";
  readonly name = "Staszek Pytlak";
  readonly description = new CharacterDescription({
    narration: ["Staszek Pytlak, a small village boy, Pawełek Kopacz's playmate."],
    clothes: "Not specified.",
    hairAndFace: "Not specified.",
    carriage: "Not specified.",
    gives: { aware: [StaszekPytlak] },
  });
  readonly role = "child, Pawełek Kopacz's friend";
  // TODO: no "Lives in" in the Markdown; parents are Michał and Zofia Pytlak, home not given.

  // ------------------------------------------------------------ actions

  readonly allActions = {
    askStaszekAboutTheirLastDay: action({
      label: "Ask Staszek about their last day",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He tells you they went into the woods and ate mushrooms they picked.",
        ],
        gives: { clues: [clues.PawelekAteMushroomsInTheForest] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  // Split from the action's inline "(requires: Survival)" gives.
  readonly allOpportunities = {
    whichMushrooms: opportunity({
      label: "Which mushrooms, read by a woodsman",
      trigger: (w) => w.staszekPytlak.allActions.askStaszekAboutTheirLastDay.done,
      target: { skills: [Survival] },
      narrative: new Narrative({
        narration: [
          "Press him on which kind and it is clear the boys know their mushrooms: they picked ordinary edible ones, and Staszek ate the same and stayed well.",
        ],
        gives: { clues: [clues.PawelekMushroomsWereHarmless] },
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
