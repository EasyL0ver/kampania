import { Location, action, opportunity } from "../schema.ts";
import { Culture, Empathy, Handiwork, Language, Superstitious } from "../skills.ts";
import type { CharacterRef } from "../schema.ts";
import Pawelek from "../characters/pawelek.ts";
import { Babcia, Barbara, Hag } from "../stubs.ts";
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

  readonly setup = [
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
  ];

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // Was an ungated opportunity. Ungated is Setup, but Setup can't give a clue.
    lookAtBabciasCorner: action({
      label: "Look at Babcia's corner",
      promptedBy: [BarbarasHouse],
      cost: [],
      gives: { clues: [clues.ThreeBarredCrossInBabciasRoom] },
    }),
    // Was an opportunity gated on night; with phases gone it is player-initiated.
    singingOnTheWind: action({
      label: "Singing on the wind",
      promptedBy: [BarbarasHouse],
      cost: [],
      gives: { aware: [Hag] },
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    coveredMirrors: opportunity({
      label: "Covered mirrors",
      target: { when: (_w, me) => me.has(Culture) || me.has(Superstitious) },
      promptedBy: [BarbarasHouse],
      gives: { clues: [clues.CoveredMirrors] },
    }),
    redBrickHouse: opportunity({
      label: "Red-brick house",
      target: { skills: [Handiwork] },
      promptedBy: [BarbarasHouse],
      gives: { clues: [clues.BarbaraHasHelp] },
    }),
    dudkaAtTheFence: opportunity({
      label: "Dudka at the fence",
      target: { skills: [Empathy] },
      promptedBy: [BarbarasHouse],
      gives: { clues: [clues.BarbaraHasHelp] },
    }),
    herStrangeUkrainian: opportunity({
      label: "Her strange Ukrainian",
      target: { skills: [Language] },
      promptedBy: [BarbarasHouse],
    }),
    babciaAfterParaskewiasDeath: opportunity({
      label: "Babcia after Paraskewia's death",
      trigger: (w) => w.hag.dead,
      target: { skills: [Superstitious] },
      promptedBy: [BarbarasHouse],
      gives: { clues: [clues.SingingInTheNight] },
    }),
  };

  override get actions() {
    return this.allActions;
  }

  override get opportunities() {
    return this.allOpportunities;
  }
}
