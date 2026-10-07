import { Character, CharacterDescription, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { Checks, LocationRef } from "../schema.ts";
import { Culture, Empathy } from "../skills.ts";
import * as clues from "../clues.ts";
import { todo } from "../todo.ts";
import NewVillage from "../locations/new-village.ts";

export default class DisputeSister extends Character {
  readonly id = "dispute-sister";
  readonly name = "%SISTER%";
  readonly description = new CharacterDescription({
    narration: ["%SISTER%, a farmer who has worked the disputed border strip for years, lives at her husband's family farmhouse."],
    clothes: "Headscarf, heavy skirt, man's jacket, field boots; red cracked hands",
    hairAndFace: "Weathered younger than her years; hair pulled back hard; jaw set until the strip comes up",
    carriage: "Strong, quick, and economical; arms fold tight when she speaks about her father. Voice: Blunt and tired, sharper when the deed is mentioned",
    gives: { aware: [DisputeSister] },
  });

  readonly role = "farmer working the land (land-dispute red herring)";
  // TODO: "Her husband's family farmhouse in %NEW_VILLAGE%" has no location file; chose NewVillage.
  livesAt: LocationRef = NewVillage;

  // ------------------------------------------------------------ state

  // She has withdrawn her father's deathbed account from the dispute.
  withdrewTestimony = false;
  // She has told the committee her father's deathbed words (Take her plea seriously).
  toldFathersWords = false;

  // ------------------------------------------------------------ actions

  readonly allActions = {
    censusInterview: action({
      label: "Census interview",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She answers plainly with her own details and her husband's family farmhouse.",
        ],
        gives: { effects: (w) => { w.disputeSister.censusTaken = true; } },
      }),
    }),
    propertyAssessment: action({
      label: "Property assessment",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She has no deed and claims the border strip by years of labour. She names her brother's paper as the theft.",
        ],
        gives: { effects: (w) => { w.disputeBrother.onDocket = true; w.disputeSister.propertyRecorded = true; } },
      }),
    }),
    // TODO: should this also require she still offers the testimony (!withdrewTestimony)?
    // Player-intent gate "engages with her as a claimant" dropped (it is the action itself).
    takeHerPleaSeriously: action({
      label: "Take her plea seriously",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She repeats her father's dying words: the land was never theirs to pass down, the old village people were killed, and the fire hid it. She offers it as proof that the deed is dirty.",
        ],
        gives: {
          clues: [clues.ArmyMassacredCiviliansIn1947],
          effects: (w) => { w.disputeSister.toldFathersWords = true; },
        },
      }),
    }),
    // Original also requires "the players tell her plainly what her father witnessed": that is the action itself.
    askHerToFaceWhatTheWordsMean: action({
      label: "Ask her to face what the words mean",
      promptedBy: [clues.ArmyMassacredCiviliansIn1947],
      requires: [
        new Requirement("She hasn't told you her father's words.", {
          when: (w) => w.disputeSister.toldFathersWords,
        }),
      ],
      cost: [],
      narrative: new Narrative({
        narration: [
          "She goes still and stops using the deathbed account as a property argument. She will not repeat it in an official room again.",
        ],
        gives: { effects: (w) => { w.disputeSister.withdrewTestimony = true; } },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    sheIsHoldingBackHerFathersLastWords: opportunity({
      label: "She is holding back her father's last words",
      target: { skills: [Empathy] },
      narrative: new Narrative({
        narration: [
          "Her anger about the strip is direct, but she keeps circling her father's deathbed without naming it.",
        ],
      }),
    }),
    // TODO: "old village in view" is world state, but todo() is a Cond and trigger takes a
    // WorldCond, so it sits in target.when until modelled.
    sheWillNotFaceTheRuins: opportunity({
      label: "She will not face the ruins",
      target: { skills: [Culture], when: todo("old village in view") },
      narrative: new Narrative({
        narration: [
          "Her unease fits someone told a place is bloodied, not someone who merely dislikes ruins.",
        ],
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }

  override get opportunities() {
    return this.allOpportunities;
  }

  // ------------------------------------------------------------ bond / grudge

  bond: Checks = [
    "Take her side of the dispute honestly",
    "Let her father's deathbed account stand as real",
    "Sit with the fear under the account",
  ];

  grudge: Checks = [
    "Dismiss her as a nuisance before hearing her",
    "Use her father's words, then rule against her",
    "Mock the unlucky ground or her dread of the ruins",
  ];
}
