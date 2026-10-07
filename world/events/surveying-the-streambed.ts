import { Event, Narrative, Requirement, SkillRequirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef, WorldCond } from "../schema.ts";
import { Geology, Handiwork, Physique, Survival } from "../skills.ts";
import FarRidgeStreambed from "../locations/far-ridge-streambed.ts";
import Foreman from "../characters/foreman.ts";
import GeologistsKit from "../items/geologists-kit.ts";
import * as clues from "../clues.ts";
import { todoEffect } from "../todo.ts";

// TODO: mechanic "level-line cost" (6 cards solo, -1 per assistant, -2 per Physique
// assistant, floor 3; weather turn / knocked instrument restarts) not modelled yet
// (see prose/events/surveying-the-streambed.md).
export default class SurveyingTheStreambed extends Event {
  readonly id = "surveying-the-streambed";
  readonly name = "Surveying the Streambed";
  readonly hook = "Setting up a level line at the far-ridge streambed to measure toward the village.";
  override at(): LocationRef {
    return FarRidgeStreambed;
  }

  // TODO: "Survey party" = the players; Pytlak only if the party brought him here
  // (Bring him to the streambed). Chose to list him; not conditioned on state yet.
  override present(): CharacterRef[] {
    return [Foreman];
  }
  override readonly hooks: EventHook[] = [
    { text: "Setting up a level line at the far-ridge streambed to measure toward the village.", heardAt: "anywhere" },
  ];
  // TODO: condition should check if player knows StreambedIsCandidateDrain; gated in actions for now
  readonly setup = new Narrative({
    narration: [
      "The col of the dry streambed stands at the top of the far ridge, the village far below on the valley floor.",
      "Settling whether the col drains means one number: is it above or below house level.",
      "Getting it means running a level line from the col all the way down to the village, resetting the instrument every short stretch over rough ground. It is a full day's work.",
      "The geologist cannot run the instrument and hold the staff at once; every extra pair of hands shortens the day.",
      "A cooperative Michał Pytlak will come up and assist here (see Bring him to the streambed), counting as one helping hand, but only if the party brings him to this scene rather than the benchmark hunt.",
      "Weather on the ridge can turn: rain or fog stalls the leveling and the day is lost.",
      "This is the fast, sure route compared to searching for the old benchmarks, but it costs a geologist and most of a day.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    runTheLevelLine: action({
      label: "Run the level line",
      requires: [
        new SkillRequirement(Geology),
        new Requirement("You don't have the geologist's kit.", { items: [GeologistsKit] }),
      ],
      promptedBy: [clues.StreambedIsCandidateDrain],
      // TODO: real cost is ~6 cards solo, -1 per assisting PC, floor 3. Time caps at 4.
      cost: [{ time: 4 }],
      narrative: new Narrative({
        narration: [
          "You shoot the col and the village and record both heights: the raw figures for the outlet.",
        ],
        gives: {
          clues: [clues.StreambedParameters],
          effects: (w) => { w.surveyingTheStreambed.end(w); },
        },
      }),
    }),
    assistTheSurvey: action({
      label: "Assist the survey",
      requires: [
        new Requirement("You're the surveyor; you can't also assist.", { when: (_w, me) => !me.has(Geology) }),
      ],
      promptedBy: [clues.StreambedIsCandidateDrain],
      // TODO: "The assisting PC spends the day on the ridge"; chose 3 (the floor).
      cost: [{ time: 3 }],
      narrative: new Narrative({
        narration: [
          "An extra pair of hands lets the geologist reset and shoot the line faster. Each assisting PC cuts the level-line cost by 1 card, to a floor of 3.",
        ],
        gives: {
          effects: todoEffect("World state change: the \"Run the level line\" cost drops by 1 card per assisting PC (floor 3)."),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    readTheColByEye: opportunity({
      label: "Read the col by eye",
      target: { skills: [Geology] },
      promptedBy: [SurveyingTheStreambed],
      narrative: new Narrative({
        narration: [
          "A surveyor standing on the col can see it rides high, but \"high\" is not a number and will not settle the drain question; only the level line does. → No clue; sets expectations.",
        ],
      }),
    }),
    readTheWeatherOffTheRidge: opportunity({
      label: "Read the weather off the ridge",
      target: { skills: [Survival] },
      promptedBy: [SurveyingTheStreambed],
      narrative: new Narrative({
        narration: [
          "A woodsman reads the sky and times the level line around the front coming in, breaking before the rain or fog hits and resuming after. → No clue; the weather turn no longer wastes the day (see Mechanics).",
        ],
        gives: { effects: todoEffect("No clue; the weather turn no longer wastes the day (see Mechanics).") },
      }),
    }),
    carryTheHeavyWork: opportunity({
      label: "Carry the heavy work",
      target: { skills: [Physique] },
      promptedBy: [SurveyingTheStreambed],
      narrative: new Narrative({
        narration: [
          "Hauling the level and staff up the col and resetting them stretch after stretch over broken ground is the slow part; a strong back keeps the line moving. → No clue; a Physique PC assisting cuts the level line by 2 cards instead of 1 (still floor 3).",
        ],
        gives: { effects: todoEffect("No clue; a Physique PC assisting cuts the level line by 2 cards instead of 1 (still floor 3).") },
      }),
    }),
    keepTheInstrumentTrue: opportunity({
      label: "Keep the instrument true",
      target: { skills: [Handiwork] },
      promptedBy: [SurveyingTheStreambed],
      narrative: new Narrative({
        narration: [
          "The level and clinometer drift out of true with every move and a knocked tripod normally means re-shooting the last leg; a fixer re-levels and nurses the kit through the day. → No clue; a fumbled or knocked setup no longer forces a restart of the line (see Mechanics).",
        ],
        gives: { effects: todoEffect("No clue; a fumbled or knocked setup no longer forces a restart of the line (see Mechanics).") },
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
