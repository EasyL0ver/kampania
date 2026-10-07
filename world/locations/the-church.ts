import { Location, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";
import { Handiwork } from "../skills.ts";
import Priest from "../characters/priest.ts";
import Widow from "../characters/widow.ts";
import NewVillage from "./new-village.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";

export default class TheChurch extends Location {
  readonly id = "the-church";
  readonly name = "The Church";
  readonly hook = "The church on the hill in %NEW_VILLAGE%, beside the cemetery.";
  readonly position = "church on the hill in the village, cemetery adjacent";
  readonly visitCost = 1;
  // Priest usually inside; Wanda at the cemetery most days (not modelled).
  override present(): CharacterRef[] {
    return [Priest, Widow];
  }

  readonly setup = new Narrative({
    narration: [
      "The wooden church stands on the hill above the village.",
      "The church is unusually well-maintained for the village's poverty.",
      "Fresh paint, a solid roof, stacked firewood, supplies, icons, candles, and incense are present.",
      "The cemetery is adjacent to the church.",
      "The cemetery has a few dozen graves, most weathered.",
      "All visible graves are post-1947.",
      "Wanda Mazur often kneels beside a freshly tended grave.",
      "A well-tended double grave has fresh flowers, a Polonised surname, and a small three-barred cross partly hidden under lichen.",
      "The plebania stands adjacent to the church.",
      "The plebania has a stone foundation older than %NEW_VILLAGE%, a kitchen, a study, a spare room with a cot, and a cellar.",
      "The plebania cellar has stone walls, old liturgical supplies, jars, dust, and a door with a newer padlock.",
    ],
    gives: { aware: [TheChurch] },
  });

  // "Search the plebania" only points to The Rectory: cross-reference, prose only.

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // TODO: cost "Free for first visit; 1 action for deeper conversation" — set free.
    talkToPriest: action({
      label: "Talk to Priest",
      cost: [],
      narrative: new Narrative({
        narration: [
          "ks. Władysław Pająk is cold toward government people unless they show faith, knowledge of commandments, or genuine spiritual respect; resolve the full interaction through Priest character file.",
        ],
        gives: { effects: todoEffect("NPC State Change: ks. Władysław Pająk can move from cold contact toward the priest thread.") },
      }),
    }),
    talkToWidowAtTheGrave: action({
      label: "Talk to Widow at the grave",
      requires: [new Requirement("Wanda isn't at the cemetery right now.", { when: todo("Wanda Mazur present") })],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Wanda talks about her husband, his PGR work, his accident, and her wish that the committee include him in the census.",
        ],
        gives: {
          clues: [clues.WandaReceivesPension],
          effects: todoEffect("NPC State Change: Wanda Mazur is willing to answer follow-up questions about her husband's work."),
        },
      }),
    }),
    // TODO: "Talked to Wanda Mazur at the grave" is per player in spirit; uses the world-level done flag.
    askWidowAboutHerHusbandsWork: action({
      label: "Ask Widow about her husband's work",
      requires: [new Requirement("You haven't spoken with Wanda yet.", { when: (w): boolean => w.theChurch.allActions.talkToWidowAtTheGrave.done })],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Wanda gives her husband's name, PGR role, and death date; the name matches a current worker if players have the ledger worker list.",
        ],
        gives: { clues: [clues.MazurDiedInTheSilo] },
      }),
    }),
    lookForMazursGrave: action({
      label: "Look for Mazur's grave",
      cost: [],
      narrative: new Narrative({
        narration: [
          "The freshly tended grave Wanda kneels beside carries Tadeusz Mazur's name and a recent death date.",
        ],
        gives: { clues: [clues.MazurBuriedInCemetery] },
      }),
    }),
    lookForGajdaGraves: action({
      label: "Look for Gajda graves",
      cost: [],
      narrative: new Narrative({
        narration: [
          "The well-tended double grave with the Polonised surname belongs to Zbigniew Gajda's parents; a small three-barred cross sits half-hidden under the lichen on it.",
        ],
        gives: { clues: [clues.ThreeBarredCrossOnGajdaGrave] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    churchCondition: opportunity({
      label: "Church condition",
      target: { skills: [Handiwork] },
      promptedBy: [NewVillage],
      narrative: new Narrative({
        narration: [
          "The church has better repairs, supplies, and firewood than the village should afford.",
        ],
        gives: { clues: [clues.ChurchTooNice] },
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
