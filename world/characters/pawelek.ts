import { Character, PerPlayer, Requirement, SkillRequirement, action, opportunity } from "../schema.ts";
import { Empathy, Geology, Handiwork, Language, Medicine, Speech, Survival, Violence } from "../skills.ts";
import type { Checks, LocationRef } from "../schema.ts";
import BarbarasHouse from "../locations/barbaras-house.ts";
import { Hag, OldVillageRuins } from "../stubs.ts";
import * as clues from "../clues.ts";

export type Condition = "well" | "sick" | "dead";

export default class Pawelek extends Character {
  readonly id = "pawelek";
  readonly name = "Pawełek Kopacz";
  readonly hook = "Pawełek Kopacz, Barbara's lively four-year-old son.";
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
      gives: { clues: [clues.PawelekWandersToOldVillage], aware: [OldVillageRuins] },
    }),
    playCops: action({
      label: "Play cops with Pawełek",
      requires: [new SkillRequirement(Violence)],
      cost: [],
      gives: { clues: [clues.DrinkingCrewHeadsToForest] },
    }),
    speakLemko: action({
      label: "Speak Lemko with Pawełek",
      requires: [new SkillRequirement(Language)],
      cost: [],
      gives: { aware: [Hag] },
    }),
    thePlaceYouCantGetThrough: action({
      label: "The place you can't get through",
      promptedBy: [clues.CommitteeRunsGeographicalSurvey],
      cost: [],
      gives: { clues: [clues.LandslideInTheGap] },
    }),
    play: action({
      label: "Play with Pawełek",
      cost: [{ time: 1 }],
      gives: { effects: (w, me) => { w.pawelek.trusts.set(me, true); } },
    }),
  };

  readonly sickActions = {
    stabilize: action({
      label: "Stabilize Pawełek",
      requires: [new SkillRequirement(Medicine)],
      cost: [{ time: 2 }],
      gives: { effects: (w) => { w.barbara.trustsCommittee = true; } },
    }),
    askDrinkingWater: action({
      label: "Ask about drinking water",
      requires: [
        new Requirement("He's too delirious to answer.", { when: (w) => w.pawelek.hp >= 5 }),
        new Requirement("He doesn't trust you yet.", { when: (w, me) => w.pawelek.trusts.of(me) || me.has(Speech) }),
      ],
      cost: [],
      gives: { clues: [clues.WellWaterContaminated], aware: [OldVillageRuins] },
    }),
  };

  readonly wellOpportunities = {
    babciasSounds: opportunity({
      label: "Babcia's sounds",
      target: { skills: [Language] },
    }),
    barbaraWatching: opportunity({
      label: "Barbara watching Babcia and Pawełek",
      target: { skills: [Empathy] },
    }),
  };

  readonly sickOpportunities = {
    medicineDiagnosis: opportunity({
      label: "Medicine diagnosis",
      trigger: (w) => w.pawelek.sickActions.stabilize.done,
      target: { skills: [Medicine] },
      gives: { clues: [clues.PaweleksDiagnosis] },
    }),
    contaminationPattern: opportunity({
      label: "Contamination pattern",
      trigger: (w) => w.pawelek.sickActions.stabilize.done,
      target: { skills: [Medicine] },
      gives: { clues: [clues.PaweleksContamination] },
    }),
    waterTableMapping: opportunity({
      label: "Water table mapping",
      trigger: (w) => w.pawelek.sickActions.askDrinkingWater.done,
      target: { skills: [Geology] },
      gives: { aware: [OldVillageRuins] },
    }),
    mudOnHisShoes: opportunity({
      label: "Mud on his shoes",
      trigger: (w) => w.pawelek.sickActions.askDrinkingWater.done,
      target: { skills: [Survival] },
      gives: { aware: [OldVillageRuins] },
    }),
  };

  // ------------------------------------------------------------ bond

  bond: Checks = [
    "Get on the ground and play with him",
    "Make him laugh",
    "Give him something small",
  ];
}
