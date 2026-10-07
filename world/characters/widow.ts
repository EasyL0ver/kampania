import { Character, CharacterDescription, Narrative, Requirement, SkillRequirement, action } from "../schema.ts";
import type { Checks } from "../schema.ts";
import { Finesse } from "../skills.ts";
import MazurDiary from "../items/mazur-diary.ts";
import * as clues from "../clues.ts";

export default class Widow extends Character {
  readonly id = "widow";
  readonly name = "Wanda Mazur";
  readonly description = new CharacterDescription({
    narration: ["Wanda Mazur, the grieving widow of a PGR worker, lives alone in a small house near the church."],
    clothes: "Same brown wool coat regardless of season; faded floral headscarf tied tight under the chin.",
    hairAndFace: "Thin grey hair under the scarf; deeply lined face, pale watery eyes slightly unfocused.",
    carriage: "Small and thinning; moves as if afraid of disturbing someone.",
    gives: { aware: [Widow] },
  });

  readonly role = "grieving widow";
  // TODO: lives in a "small house near the church" — no location file; no livesAt.

  // ------------------------------------------------------------ state

  // Set by "Shield her pension": she is in the committee's debt and talks
  // openly about the past.
  indebted = false;

  // ------------------------------------------------------------ actions

  readonly allActions = {
    censusInterview: action({
      label: "Census interview",
      promptedBy: [clues.CommitteeFillsCensus],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She answers softly: herself, alone, with her late husband Tadeusz named as dead. Asked when they came, she says they were among the first here, arriving not long after the war to work the land. She drifts, fondly, into talk of Tadeusz: he wrote everything down, kept a diary all his years, and she still reads it of an evening to remember him.",
        ],
        gives: {
          clues: [clues.MazurAndWidowAreOldSettlers, clues.MazurWroteDetailedDiary],
          effects: (w) => { w.widow.censusTaken = true; },
        },
      }),
    }),
    propertyAssessment: action({
      label: "Property assessment",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She names her small house near the church.",
        ],
        gives: { effects: (w) => { w.widow.propertyRecorded = true; } },
      }),
    }),
    shieldHerPension: action({
      label: "Shield her pension",
      promptedBy: [clues.MazurDeathCoveredUp],
      // Telling her the truth and choosing not to report it is the action itself.
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Told plainly that the \"pension\" is a dead man's wages and the death was never recorded, Wanda does not break. She goes very still, then asks what it means for her. When the committee promises to leave the pension alone and keep her name out of any report, something settles in her. She says she is in their debt, and means it. From here she will speak freely about the old days. She tells them Tadeusz kept a diary all his years in the valley, and fetches it down for them without being asked.",
        ],
        gives: {
          items: [MazurDiary],
          effects: (w) => {
            w.widow.indebted = true;
          },
        },
      }),
    }),
    shareTheDiary: action({
      label: "Share the diary",
      requires: [new Requirement("Wanda doesn't trust you enough.", { when: (w, me) => w.widow.bonded.of(me) })],
      promptedBy: [clues.MazurWroteDetailedDiary],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Treated as a person and not a case, Wanda wants them to know the man Tadeusz was. She takes his diary down from its shelf and presses it into their hands, glad that someone cares to read how he saw the valley and the years.",
        ],
        gives: { items: [MazurDiary] },
      }),
    }),
    takeTheDiary: action({
      label: "Take the diary",
      requires: [new SkillRequirement(Finesse)],
      promptedBy: [clues.MazurWroteDetailedDiary],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "While Wanda is at church, the house stands empty. The diary sits where she keeps it, on the shelf by her reading chair. They let themselves in and lift it.",
        ],
        gives: { items: [MazurDiary] },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }

  // ------------------------------------------------------------ bond

  bond: Checks = [
    "Sit with her in the church pew and say nothing",
    "Ask about Tadeusz as a person, not as a case",
    "Bring her something practical — bread, firewood, a repaired item",
  ];
}
