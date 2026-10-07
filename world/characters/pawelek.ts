import { Character, CharacterDescription, Narrative, PerPlayer, Requirement, SkillRequirement, action, opportunity } from "../schema.ts";
import { Empathy, Geology, Handiwork, Language, Medicine, Speech, Survival, Violence } from "../skills.ts";
import type { Checks, LocationRef } from "../schema.ts";
import BarbarasHouse from "../locations/barbaras-house.ts";
import Hag from "./hag.ts";
import OldVillageRuins from "../locations/old-village-ruins.ts";
import * as clues from "../clues.ts";

export type Condition = "well" | "sick" | "dead";

export default class Pawelek extends Character {
  readonly id = "pawelek";
  readonly name = "Pawełek Kopacz";
  readonly description = new CharacterDescription({
    narration: ["Pawełek Kopacz, Barbara's lively four-year-old son."],
    clothes: "Oversized hand-me-down shirt with rolled sleeves, shorts held up with twine, bare feet black with mud, pockets full of stones and dead beetles",
    hairAndFace: "Sandy-brown hair cut unevenly with kitchen scissors and always in his eyes; round face, gap-toothed grin, skinned knees",
    carriage: "Runs everywhere, climbs everything, grabs your hand and drags you; no concept of personal space or boundaries",
    gives: { aware: [Pawelek] },
  });

  readonly role = "child";
  livesAt: LocationRef = BarbarasHouse;

  // ------------------------------------------------------------ state

  condition: Condition = "well";
  cured = false;
  trusts = new PerPlayer(false);

  hp = 6;

  // ------------------------------------------------------------ moves by condition

  override get actions() {
    return { well: this.wellActions, sick: this.sickActions, dead: {} }[this.condition];
  }

  override get opportunities() {
    return { well: this.wellOpportunities, sick: this.sickOpportunities, dead: {} }[this.condition];
  }

  readonly wellActions = {
    buildWithPawelek: action({
      label: "Build with Pawełek",
      requires: [new SkillRequirement(Handiwork)],
      cost: [],
      narrative: new Narrative({
        narration: [
          "The player helps him build the circular pattern he has been copying from memory. An engineer recognizes the pattern as a well rim.",
        ],
        gives: { clues: [clues.PawelekWandersToOldVillage], aware: [OldVillageRuins] },
      }),
    }),
    playCops: action({
      label: "Play cops with Pawełek",
      requires: [new SkillRequirement(Violence)],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Through play, he acts out men around a fire, shouting, bottles, and bad guys hiding in the forest.",
        ],
        gives: { clues: [clues.DrinkingCrewHeadsToForest] },
      }),
    }),
    speakLemko: action({
      label: "Speak Lemko with Pawełek",
      requires: [new SkillRequirement(Language)],
      cost: [],
      narrative: new Narrative({
        narration: [
          "He recognizes the speech as like Babcia's and like the lady's. He repeats softer words from an old woman in the forest who has been kind to him.",
        ],
        gives: { aware: [Hag] },
      }),
    }),
    thePlaceYouCantGetThrough: action({
      label: "The place you can't get through",
      promptedBy: [clues.CommitteeRunsGeographicalSurvey],
      cost: [],
      narrative: new Narrative({
        narration: [
          "He mentions, offhand, that you can't get through the notch in the hill anymore because it all fell down in a big pile of rocks. The lady showed him.",
        ],
        gives: { clues: [clues.LandslideInTheGap] },
      }),
    }),
    play: action({
      label: "Play with Pawełek",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The player spends time with him in chase, hide-and-seek, or throwing stones at a tree. He is delighted that an adult plays with him.",
        ],
        gives: { effects: (w, me) => { w.pawelek.trusts.set(me, true); } },
      }),
    }),
  };

  readonly sickActions = {
    stabilize: action({
      label: "Stabilize Pawełek",
      requires: [new SkillRequirement(Medicine)],
      cost: [{ time: 2 }],
      narrative: new Narrative({
        narration: [
          "Clean water, salt, boiled cloths, cool compresses, controlled hydration, and monitoring stop the HP drain for the rest of the day. The effect resets next morning.",
        ],
        gives: { effects: (w) => { w.barbara.trustsCommittee = true; } },
      }),
    }),
    askDrinkingWater: action({
      label: "Ask about drinking water",
      requires: [
        new Requirement("He's too delirious to answer.", { when: (w) => w.pawelek.hp >= 5 }),
        new Requirement("He doesn't trust you yet.", { when: (w, me) => w.pawelek.trusts.of(me) || me.has(Speech) }),
      ],
      cost: [],
      narrative: new Narrative({
        narration: [
          "He says he drank by the round stones where the water comes up, and that the lady told him not to drink it but he was thirsty.",
        ],
        gives: { clues: [clues.WellWaterContaminated], aware: [OldVillageRuins] },
      }),
    }),
  };

  readonly wellOpportunities = {
    babciasSounds: opportunity({
      label: "Babcia's sounds",
      target: { skills: [Language] },
      narrative: new Narrative({
        narration: [
          "Pawełek reproduces Babcia's prayer fragments with eerie accuracy. A child is acting as an unconscious vessel for a dying language.",
        ],
      }),
    }),
    barbaraWatching: opportunity({
      label: "Barbara watching Babcia and Pawełek",
      target: { skills: [Empathy] },
      narrative: new Narrative({
        narration: [
          "Barbara watches from the kitchen. She does not understand what Babcia says either, and she is watching her son become part of something she was never part of.",
        ],
      }),
    }),
  };

  readonly sickOpportunities = {
    medicineDiagnosis: opportunity({
      label: "Medicine diagnosis",
      trigger: (w) => w.pawelek.sickActions.stabilize.done,
      target: { skills: [Medicine] },
      narrative: new Narrative({
        narration: [
          "The illness will not resolve on its own in a child this size. He needs antibacterial medication; stabilization only buys time.",
        ],
        gives: { clues: [clues.PaweleksDiagnosis] },
      }),
    }),
    contaminationPattern: opportunity({
      label: "Contamination pattern",
      trigger: (w) => w.pawelek.sickActions.stabilize.done,
      target: { skills: [Medicine] },
      narrative: new Narrative({
        narration: [
          "The bacterial load points to decomposing organic matter in a confined water source over years: a cistern, cellar, or well filled with something large and organic.",
        ],
        gives: { clues: [clues.PaweleksContamination] },
      }),
    }),
    waterTableMapping: opportunity({
      label: "Water table mapping",
      trigger: (w) => w.pawelek.sickActions.askDrinkingWater.done,
      target: { skills: [Geology] },
      narrative: new Narrative({
        narration: [
          "Contamination follows the water table downhill from the old village. Mapping the flow points toward %OLD_VILLAGE% and the well.",
        ],
        gives: { aware: [OldVillageRuins] },
      }),
    }),
    mudOnHisShoes: opportunity({
      label: "Mud on his shoes",
      trigger: (w) => w.pawelek.sickActions.askDrinkingWater.done,
      target: { skills: [Survival] },
      narrative: new Narrative({
        narration: [
          "His shoes by the door carry dark, silty mud with stone dust fragments: forest-path mud with worked stone.",
        ],
        gives: { aware: [OldVillageRuins] },
      }),
    }),
  };

  // ------------------------------------------------------------ bond

  bond: Checks = [
    "Get on the ground and play with him",
    "Make him laugh",
    "Give him something small",
  ];
}
