import { Event, Requirement, SkillRequirement, action, anyone, opportunity } from "../schema.ts";
import { Medicine, Superstitious, Survival, Violence } from "../skills.ts";
import type { CharacterRef, Effect, LocationRef } from "../schema.ts";
import Pawelek from "../characters/pawelek.ts";
import Penicillin from "../items/penicillin.ts";
import BarbarasHouse from "../locations/barbaras-house.ts";
import { Babcia, Barbara, Hag, TheFlood } from "../stubs.ts";
import * as clues from "../clues.ts";

export default class PawelekFallsIll extends Event {
  readonly id = "pawelek-falls-ill";
  readonly name = "Pawełek Falls Ill";
  readonly hook = "Word spreads that Barbara's boy is sick: at the PGR, the store, or from Dudka.";
  override at(): LocationRef {
    return BarbarasHouse;
  }

  override present(): CharacterRef[] {
    return [Barbara, Babcia, Pawelek];
  }
  readonly available = { fromDay: 3, after: [TheFlood] };
  composure = 1;

  onFire: Effect = (w) => {
    w.pawelek.condition = "sick";
  };

  ifMissed: Effect = (w) => {
    w.barbara.acceptsHelenasTerms = true;
  };

  readonly setup = [
    "Barbara's house is a sickroom; Pawełek on her bed, feverish.",
    "He raves about a lady who said not to drink, and round stones.",
    "Barbara beside him with cloths and water.",
    "Stefania lucid, upright, giving orders.",
    "Icons, candles, bread, water around the bed in a non-Roman pattern.",
    "Mirrors covered.",
    "Ryszard Dudka arrives within the hour with wood, water, a blanket.",
  ];


  // "Examine him" used to hand out different clues by HP and by Medicine.
  // Split per the rule "a skill opens an opportunity, never enriches an action".

  // ------------------------------------------------------------ actions

  readonly allActions = {
    examine: action({
      label: "Examine him",
      promptedBy: [PawelekFallsIll],
      cost: [{ time: 1 }],
      gives: { clues: [clues.PawelekBurnsWithFever] },
    }),
    // Was an ungated opportunity. Listening is player-initiated: a free action.
    listenToHisMuttering: action({
      label: "Listen to his muttering",
      promptedBy: [PawelekFallsIll],
      cost: [],
      gives: { aware: [Hag] },
    }),
    // Only pays at 2 HP or lower, so it is gated there (no empty outcomes).
    tendToHim: action({
      label: "Tend to him",
      requires: [new Requirement("Nothing shows yet; he's not that far gone.", { when: (w) => w.pawelek.hp <= 2 })],
      promptedBy: [PawelekFallsIll],
      cost: [{ time: 1 }],
      gives: { clues: [clues.PawelekPassesDarkUrine] },
    }),
    cleansingRitual: action({
      label: "Perform a cleansing ritual",
      requires: [new SkillRequirement(Superstitious)],
      promptedBy: [clues.PawelekNeedsACleansingRitual],
      cost: [{ time: 1 }],
      gives: { clues: [clues.BabciaIsLemko, clues.BabciaHasTheWords] },
    }),
    givePenicillin: action({
      label: "Give Pawełek the penicillin",
      requires: [
        new Requirement("You don't have the penicillin.", { items: [Penicillin] }),
        new Requirement("You don't know he needs penicillin.", { clues: [clues.PawelekNeedsPenicillin] }),
      ],
      cost: [{ time: 1 }, { item: Penicillin }],
      gives: {
        effects: (w) => {
          w.pawelek.cured = true;
        },
      },
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    hisEyes: opportunity({
      label: "His eyes",
      trigger: (w) => w.pawelek.hp <= 4,
      target: anyone,
      promptedBy: [PawelekFallsIll],
      gives: { clues: [clues.PawelekEyesAreRed] },
    }),
    hisEyesMedicine: opportunity({
      label: "His eyes, read by a medic",
      trigger: (w) => w.pawelek.hp <= 4,
      target: { skills: [Medicine] },
      promptedBy: [PawelekFallsIll],
      gives: { clues: [clues.PawelekEyesNotCrying] },
    }),
    theColourOfHim: opportunity({
      label: "The colour of him",
      trigger: (w) => w.pawelek.hp <= 3,
      target: anyone,
      promptedBy: [PawelekFallsIll],
      gives: { clues: [clues.PawelekTurnsYellow] },
    }),
    theColourOfHimMedicine: opportunity({
      label: "The colour of him, read by a medic",
      trigger: (w) => w.pawelek.hp <= 3,
      target: { skills: [Medicine] },
      promptedBy: [PawelekFallsIll],
      gives: { clues: [clues.PawelekOrgansFailing] },
    }),
    theLookOfIt: opportunity({
      label: "The look of it",
      trigger: (w) => w.pawelek.hp <= 3,
      target: { skills: [Survival] },
      promptedBy: [PawelekFallsIll],
      gives: { clues: [clues.PawelekGotItFromWater, clues.PawelekAteDeathCap] },
    }),
    theMarkOfPoison: opportunity({
      label: "The mark of poison",
      trigger: (w) => w.pawelek.hp <= 3,
      target: { skills: [Violence] },
      promptedBy: [PawelekFallsIll],
      gives: { clues: [clues.PawelekPhosphorusPoison] },
    }),
    theSignsOnTheChild: opportunity({
      label: "The signs on the child",
      target: { skills: [Superstitious] },
      promptedBy: [PawelekFallsIll],
      gives: { clues: [clues.PawelekWasPossessed] },
    }),
    examineMusclePain: opportunity({
      label: "Examine him: muscle pain",
      trigger: (w) => w.pawelekFallsIll.allActions.examine.done && w.pawelek.hp <= 5,
      target: anyone,
      gives: { clues: [clues.PawelekInMusclePain] },
    }),
    examineMedicEarly: opportunity({
      label: "Examine him, as a medic, early",
      trigger: (w) => w.pawelekFallsIll.allActions.examine.done && w.pawelek.hp >= 5,
      target: { skills: [Medicine] },
      gives: { clues: [clues.PawelekLooksLikeCommonFever] },
    }),
    examineMedicMid: opportunity({
      label: "Examine him, as a medic, at 4 HP",
      trigger: (w) => w.pawelekFallsIll.allActions.examine.done && w.pawelek.hp === 4,
      target: { skills: [Medicine] },
      gives: { clues: [clues.PawelekFeverNotPassing] },
    }),
    examineMedicLate: opportunity({
      label: "Examine him, as a medic, late",
      trigger: (w) => w.pawelekFallsIll.allActions.examine.done && w.pawelek.hp <= 3,
      target: { skills: [Medicine] },
      gives: { clues: [clues.PawelekNotCommonSickness] },
    }),
  };

  override get actions() {
    return this.allActions;
  }

  override get opportunities() {
    return this.allOpportunities;
  }
}
