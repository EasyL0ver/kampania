import { Event, Narrative, Requirement, SkillRequirement, action, anyone, opportunity } from "../schema.ts";
import { Medicine, Superstitious, Survival, Violence } from "../skills.ts";
import PgrFarm from "../locations/pgr-farm.ts";
import TheStore from "../locations/the-store.ts";
import type { CharacterRef, Effect, EventHook, LocationRef, Tick, WorldCond } from "../schema.ts";
import Pawelek from "../characters/pawelek.ts";
import Penicillin from "../items/penicillin.ts";
import BarbarasHouse from "../locations/barbaras-house.ts";
import Babcia from "../characters/babcia.ts";
import Barbara from "../characters/barbara.ts";
import Hag from "../characters/hag.ts";
import TheFlood from "./the-flood.ts";
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
  override readonly hooks: EventHook[] = [
    { text: "Word spreads that Barbara's boy is sick.", heardAt: [PgrFarm, TheStore] },
    { text: "Ryszard Dudka comes looking for a doctor among the committee.", heardAt: "anywhere" },
  ];
  override condition: WorldCond = (w) => w.theFlood.status !== "pending";
  composure = 1;

  onFire: Tick = (w) => {
    w.pawelek.condition = "sick";
  };

  // Unless the committee cured him or earned her trust, Barbara goes to Helena.
  resolve: Tick = (w) => {
    w.barbara.acceptsHelenasTerms = w.barbara.acceptsHelenasTerms || (!w.pawelek.cured && !w.barbara.trustsCommittee);
  };

  readonly setup = new Narrative({
    narration: [
      "Barbara's house is being used as a sickroom.",
      "Pawełek lies on Barbara's bed, sweating, feverish, and breathing fast.",
      "In his fever he raves, half-words about a lady who told him not to drink and about round stones.",
      "Barbara stays beside him with cloths, water, and unfinished prayers.",
      "Stefania Kopacz is lucid, upright, and giving orders.",
      "Stefania has rearranged icons, candles, bread, and water around the bed in a non-Roman Catholic pattern.",
      "The mirrors are covered.",
      "Ryszard Dudka arrives within the hour with firewood, clean water, and a blanket.",
    ],
  });


  // "Examine him" used to hand out different clues by HP and by Medicine.
  // Split per the rule "a skill opens an opportunity, never enriches an action".

  // ------------------------------------------------------------ actions

  readonly allActions = {
    examine: action({
      label: "Examine him",
      promptedBy: [PawelekFallsIll],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "His skin is burning hot, and once the muscle pain has set in he screams when you move his legs and back. A medic examining him once he is yellowing reads that this is no common sickness.",
        ],
        gives: { clues: [clues.PawelekBurnsWithFever] },
      }),
    }),
    // Was an ungated opportunity. Listening is player-initiated: a free action.
    listenToHisMuttering: action({
      label: "Listen to his muttering",
      promptedBy: [PawelekFallsIll],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Sit close and listen through the fever. He cries for a lady from the woods who gave him bread and told him not to drink, then trails off into sounds that make no sense.",
        ],
        gives: { aware: [Hag] },
      }),
    }),
    // Only pays at 2 HP or lower, so it is gated there (no empty outcomes).
    tendToHim: action({
      label: "Tend to him",
      requires: [new Requirement("Nothing shows yet; he's not that far gone.", { when: (w) => w.pawelek.hp <= 2 })],
      promptedBy: [PawelekFallsIll],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Cool cloths, water, keeping him still. Nothing you do slows the fever; he keeps sinking on the clock all the same. At 2 HP or lower you see he passes little urine, dark as strong tea.",
        ],
        gives: { clues: [clues.PawelekPassesDarkUrine] },
      }),
    }),
    cleansingRitual: action({
      label: "Perform a cleansing ritual",
      requires: [new SkillRequirement(Superstitious)],
      promptedBy: [clues.PawelekNeedsACleansingRitual],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "You work the old warding rite over the boy. It does nothing for his fever. But Stefania, silent in her chair, watches, then corrects your hands and your words and takes up the prayer herself. She knows this rite far better than you do.",
        ],
        gives: { clues: [clues.BabciaIsLemko, clues.BabciaHasTheWords] },
      }),
    }),
    givePenicillin: action({
      label: "Give Pawełek the penicillin",
      promptedBy: [clues.PawelekNeedsPenicillin],
      requires: [
        new Requirement("You don't have the penicillin.", { items: [Penicillin] }),
      ],
      cost: [{ time: 1 }, { item: Penicillin }],
      // The cure ends the illness. TODO: his death should end it too.
      narrative: new Narrative({
        narration: [
          "You give the boy the penicillin at a child's dose. The fever breaks. His HP loss stops for good and he begins to recover.",
        ],
        gives: {
          effects: (w) => {
            w.pawelekFallsIll.end(w);
            w.pawelek.cured = true;
          },
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    hisEyes: opportunity({
      label: "His eyes",
      trigger: (w) => w.pawelek.hp <= 4,
      target: anyone,
      promptedBy: [PawelekFallsIll],
      narrative: new Narrative({
        narration: [
          "The whites of his eyes have gone bloodshot and crimson.",
        ],
        gives: { clues: [clues.PawelekEyesAreRed] },
      }),
    }),
    hisEyesMedicine: opportunity({
      label: "His eyes, read by a medic",
      trigger: (w) => w.pawelek.hp <= 4,
      target: { skills: [Medicine] },
      promptedBy: [PawelekFallsIll],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { clues: [clues.PawelekEyesNotCrying] },
      }),
    }),
    theColourOfHim: opportunity({
      label: "The colour of him",
      trigger: (w) => w.pawelek.hp <= 3,
      target: anyone,
      promptedBy: [PawelekFallsIll],
      narrative: new Narrative({
        narration: [
          "His skin and the whites of his eyes have turned yellow.",
        ],
        gives: { clues: [clues.PawelekTurnsYellow] },
      }),
    }),
    theColourOfHimMedicine: opportunity({
      label: "The colour of him, read by a medic",
      trigger: (w) => w.pawelek.hp <= 3,
      target: { skills: [Medicine] },
      promptedBy: [PawelekFallsIll],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { clues: [clues.PawelekOrgansFailing] },
      }),
    }),
    theLookOfIt: opportunity({
      label: "The look of it",
      trigger: (w) => w.pawelek.hp <= 3,
      target: { skills: [Survival] },
      promptedBy: [PawelekFallsIll],
      narrative: new Narrative({
        narration: [
          "A woodsman reads the yellowing two ways and cannot settle it: a sickness that comes from foul water, or a child who ate a death cap in the woods.",
        ],
        gives: { clues: [clues.PawelekGotItFromWater, clues.PawelekAteDeathCap] },
      }),
    }),
    theMarkOfPoison: opportunity({
      label: "The mark of poison",
      trigger: (w) => w.pawelek.hp <= 3,
      target: { skills: [Violence] },
      promptedBy: [PawelekFallsIll],
      narrative: new Narrative({
        narration: [
          "You have seen what the yellow rat poison does to a body; the boy's signs could be phosphorus, and that would mean a hand behind it.",
        ],
        gives: { clues: [clues.PawelekPhosphorusPoison] },
      }),
    }),
    theSignsOnTheChild: opportunity({
      label: "The signs on the child",
      target: { skills: [Superstitious] },
      promptedBy: [PawelekFallsIll],
      narrative: new Narrative({
        narration: [
          "He raves of a lady and round stones, and he alone sickens while everyone else is spared. To you the meaning is plain: this is the well's work, not a fever.",
        ],
        gives: { clues: [clues.PawelekWasPossessed] },
      }),
    }),
    examineMusclePain: opportunity({
      label: "Examine him: muscle pain",
      trigger: (w) => w.pawelekFallsIll.allActions.examine.done && w.pawelek.hp <= 5,
      target: anyone,
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { clues: [clues.PawelekInMusclePain] },
      }),
    }),
    examineMedicEarly: opportunity({
      label: "Examine him, as a medic, early",
      trigger: (w) => w.pawelekFallsIll.allActions.examine.done && w.pawelek.hp >= 5,
      target: { skills: [Medicine] },
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { clues: [clues.PawelekLooksLikeCommonFever] },
      }),
    }),
    examineMedicMid: opportunity({
      label: "Examine him, as a medic, at 4 HP",
      trigger: (w) => w.pawelekFallsIll.allActions.examine.done && w.pawelek.hp === 4,
      target: { skills: [Medicine] },
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { clues: [clues.PawelekFeverNotPassing] },
      }),
    }),
    examineMedicLate: opportunity({
      label: "Examine him, as a medic, late",
      trigger: (w) => w.pawelekFallsIll.allActions.examine.done && w.pawelek.hp <= 3,
      target: { skills: [Medicine] },
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { clues: [clues.PawelekNotCommonSickness] },
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
