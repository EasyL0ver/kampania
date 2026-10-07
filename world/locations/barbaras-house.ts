import { Location, Narrative, action, opportunity } from "../schema.ts";
import { Culture, Empathy, Handiwork, Language, Superstitious } from "../skills.ts";
import type { CharacterRef } from "../schema.ts";
import Pawelek from "../characters/pawelek.ts";
import Babcia from "../characters/babcia.ts";
import Barbara from "../characters/barbara.ts";
import Hag from "../characters/hag.ts";
import * as clues from "../clues.ts";

export default class BarbarasHouse extends Location {
  readonly id = "barbaras-house";
  readonly name = "Barbara's House";
  readonly hook = "The edge of %NEW_VILLAGE%, beside Ryszard Dudka's house.";
  readonly position = "village edge, beside Dudka's house";
  readonly visitCost = 1;
  override present(): CharacterRef[] {
    return [Barbara, Babcia, Pawelek];
  }

  readonly setup = new Narrative({
    narration: [
      "One room, curtain dividing the sleeping area.",
      "Wood stove, table, two chairs. Clean but bare.",
      "Red brick, built by Zbigniew Gajda; other village houses are timber.",
      "Catholic cross on the wall.",
      "Every mirror covered with old, yellowed cloth.",
      "Stefania by the stove or window, muttering non-Polish prayers.",
      "Small three-barred crucifix above Stefania's corner.",
      "Pawełek plays near Stefania and repeats her words; often outside by day.",
      "Barbara at the PGR by day; offers tea and food when home.",
      "Dudka often at the fence; brings firewood, checks on Pawełek.",
      "Night: Stefania prays and paces; Pawełek talks in his sleep.",
      "Still nights: a woman's singing from the forest.",
      "Later days: Stefania more lucid.",
      "After Paraskewia is killed: Stefania agitated, watches the forest.",
    ],
    gives: { aware: [BarbarasHouse] },
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // Was an ungated opportunity. Ungated is Setup, but Setup can't give a clue.
    lookAtBabciasCorner: action({
      label: "Look at Babcia's corner",
      promptedBy: [BarbarasHouse],
      cost: [],
      narrative: new Narrative({
        narration: [
          "A small three-barred crucifix hangs in Babcia's corner, unlike the Roman cross on the wall.",
        ],
        gives: { clues: [clues.ThreeBarredCrossInBabciasRoom] },
      }),
    }),
    // Was an opportunity gated on night; with phases gone it is player-initiated.
    singingOnTheWind: action({
      label: "Singing on the wind",
      promptedBy: [BarbarasHouse],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Awake in the dark, you hear it yourself: a woman singing for the dead, far out in the forest. Someone lives out there.",
        ],
        gives: { aware: [Hag] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    coveredMirrors: opportunity({
      label: "Covered mirrors",
      target: { when: (_w, me) => me.has(Culture) || me.has(Superstitious) },
      promptedBy: [BarbarasHouse],
      narrative: new Narrative({
        narration: [
          "The coverings are systematic, old, and tied to death mourning.",
        ],
        gives: { clues: [clues.CoveredMirrors] },
      }),
    }),
    redBrickHouse: opportunity({
      label: "Red-brick house",
      target: { skills: [Handiwork] },
      promptedBy: [BarbarasHouse],
      narrative: new Narrative({
        narration: [
          "The construction quality does not match Barbara's poverty; the work used better resources than she could afford.",
        ],
        gives: { clues: [clues.BarbaraHasHelp] },
      }),
    }),
    dudkaAtTheFence: opportunity({
      label: "Dudka at the fence",
      target: { skills: [Empathy] },
      promptedBy: [BarbarasHouse],
      narrative: new Narrative({
        narration: [
          "His help reads as guilt and obligation, not courtship.",
        ],
        gives: { clues: [clues.BarbaraHasHelp] },
      }),
    }),
    herStrangeUkrainian: opportunity({
      label: "Her strange Ukrainian",
      target: { skills: [Language] },
      promptedBy: [BarbarasHouse],
      narrative: new Narrative({
        narration: [
          "To a Ukrainian speaker, her muttering is a very weird, unfamiliar variant of the language.",
        ],
      }),
    }),
    babciaAfterParaskewiasDeath: opportunity({
      label: "Babcia after Paraskewia's death",
      trigger: (w) => !w.hag.alive,
      target: { skills: [Superstitious] },
      promptedBy: [BarbarasHouse],
      narrative: new Narrative({
        narration: [
          "Babcia notices the night singing has stopped.",
        ],
        gives: { clues: [clues.SingingInTheNight] },
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
