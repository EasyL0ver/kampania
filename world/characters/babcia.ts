import { Character, CharacterDescription, Narrative, SkillRequirement, action } from "../schema.ts";
import type { Checks, LocationRef } from "../schema.ts";
import { Language } from "../skills.ts";
import * as clues from "../clues.ts";
import BarbarasHouse from "../locations/barbaras-house.ts";

export default class Babcia extends Character {
  readonly id = "babcia";
  readonly name = "Stefania Kopacz";
  readonly description = new CharacterDescription({
    narration: ["Stefania Kopacz, an elderly woman living with Barbara and Pawełek."],
    clothes: "Faded black housedress, knitted shawl in every season, wool stockings sagging at the ankles",
    hairAndFace: "Thin white hair pinned back with one black hairpin; sharp Lemko cheekbones, pale grey eyes",
    carriage: "Hunched almost double, rocking in her chair; gnarled hands curled from fieldwork. Voice & smell: Woodsmoke and camphor; sudden hard focus between long stretches of muttering",
    gives: { aware: [Babcia] },
  });

  readonly role = "elder Lemko woman";
  livesAt: LocationRef = BarbarasHouse;

  // ------------------------------------------------------------ actions

  readonly allActions = {
    speakUkrainianToBabcia: action({
      label: "Speak Ukrainian to Babcia",
      requires: [new SkillRequirement(Language)],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Ukrainian is not her language, but it is close enough; she understands and warms to hearing the old tongue, taking you for a friend. She tries to tell you more, but it comes in pieces too broken to point anywhere: only that she hears another woman singing for the dead, far off on the wind at night, and that the dead here are unquiet and were never laid to rest.",
        ],
        gives: { clues: [clues.SingingInTheNight, clues.SpiritsAreRestless] },
      }),
    }),
    censusInterview: action({
      label: "Census interview",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She answers with dead names, slips into Lemko, or orders you out. Barbara Kopacz supplies the household details instead.",
        ],
        gives: { effects: (w) => { w.babcia.censusTaken = true; } },
      }),
    }),
    propertyAssessment: action({
      label: "Property assessment",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She owns nothing and lives in her daughter's house. If she registers the question, she waves it off as none of your business.",
        ],
        gives: { effects: (w) => { w.babcia.propertyRecorded = true; } },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }

  // ------------------------------------------------------------ bond

  bond: Checks = [
    "Attempt a Lemko word or phrase",
    "Sit with her in silence",
    "Respect a Lemko custom, shrine, or cemetery",
  ];
}
