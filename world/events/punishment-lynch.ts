import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, Effect, EventHook, LocationRef, Tick, WorldCond } from "../schema.ts";
import { Culture, Empathy, Finesse, History, Violence } from "../skills.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";
import PgrOffice from "../locations/pgr-office.ts";
import Neighbour from "../characters/neighbour.ts";
import Wojewoda from "../characters/wojewoda.ts";
import Barbara from "../characters/barbara.ts";
import DrinkingCrew from "../characters/secondary/drinking-crew.ts";
import Butcher from "../characters/butcher.ts";

export default class PunishmentLynch extends Event {
  readonly id = "punishment-lynch";
  readonly name = "The Lynch";
  readonly hook = "During Day 6, the drinking circle turns louder and more purposeful.";

  // TODO: the mob starts at the PGR office, then moves to the well (old-village-ruins);
  // there is no state for "the mob has moved", so only the office is modelled.
  override at(): LocationRef {
    return PgrOffice;
  }

  // Also present: the target from Dudka's targeting score.
  // TODO: Barbara only "if not warned"; Zbigniew's state comes from Irena's confrontation.
  override present(): CharacterRef[] {
    return [Neighbour, Wojewoda, Barbara, DrinkingCrew];
  }
  override readonly hooks: EventHook[] = [
    { text: "The drinking circle turns louder, more purposeful.", heardAt: [PgrOffice] },
    { text: "Lamps move on the road after dark; boots cross gravel; dogs bark down the valley.", heardAt: "anywhere" },
  ];
  readonly setup = new Narrative({
    narration: [
      "The mob starts at the PGR office.",
      "The mob wants the sołtys to bless, lead, or stop the killing.",
      "If Zbigniew is braced, the office is dark and locked; he stays inside.",
      "If Zbigniew is breaking, he comes onto the steps and tries to command the crowd.",
      "If Zbigniew is breaking, his authority fails.",
      "If Dudka is Humiliated or has already acted at the well, the crowd can turn on Zbigniew.",
      "Otherwise, the crowd shoulders past Zbigniew and moves toward the well.",
      "The crowd moves down the road toward %OLD_VILLAGE%.",
      "Dudka is at the front with the rifle.",
      "The chosen target is dragged, pushed, or guarded by the mob.",
      "If Barbara was warned and sent home, she is absent.",
      "If no player ever bonded with Barbara, she stands at Dudka's shoulder.",
      "Barbara's presence makes the mob harder to turn.",
    ],
  });
  composure = 2;
  // TODO: condition should gate on flood status and other prerequisites from Dudka's targeting logic

  // TODO: mechanic "Dudka's targeting score" (characters/neighbour.md#lynch-targets) not modelled yet.

  resolve: Tick = todoEffect(
    "The lynch still happens. | The target is decided by Dudka's targeting score. | If Zbigniew was braced, he arrives after the body is in the well and disperses the spent crowd. | If Zbigniew was breaking and targeted, he dies in the well. | If Zbigniew was breaking and not targeted, he survives without authority. | The final day starts with a fresh body in the well.",
  );

  // ------------------------------------------------------------ actions

  readonly allActions = {
    backZbigniewOnTheSteps: action({
      label: "Back Zbigniew on the steps",
      requires: [
        new Requirement("Zbigniew hasn't come out onto the steps.", { when: (w) => w.wojewoda.breaking }),
      ],
      promptedBy: [Wojewoda],
      cost: [{ composure: 1 }],
      narrative: new Narrative({
        narration: [
          "The crowd hesitates longer at the office.",
        ],
        gives: {
          effects: todoEffect(
            "World State Change: the mob is one step more turnable at the well | NPC State Change: if Zbigniew lives, he remembers who stood with him",
          ),
        },
      }),
    }),
    feedZbigniewToTheMob: action({
      label: "Feed Zbigniew to the mob",
      requires: [
        // TODO: "or other proof" — modelled as either of the two clues.
        new Requirement("You have no proof Zbigniew was one of them.", {
          when: (_w, me) => me.knows(clues.WifeProtectsHusband) || me.knows(clues.WojewodaParticipatedInLynch),
        }),
      ],
      promptedBy: [clues.WifeProtectsHusband],
      cost: [],
      narrative: new Narrative({
        narration: [
          "The crowd's aim swings toward Zbigniew at the office.",
        ],
        gives: {
          effects: todoEffect(
            "World State Change: Zbigniew enters Dudka's targeting score high | World State Change: the leash on Rezeń is cut",
          ),
        },
      }),
    }),
    turnTheAimOntoAPerpetrator: action({
      label: "Turn the aim onto a perpetrator",
      requires: [
        new Requirement("You have no proof against any of them.", {
          when: todo("Proof that points at Rezeń, a sibling, Helena, or a breaking Zbigniew."),
        }),
      ],
      promptedBy: [Butcher],
      cost: [],
      narrative: new Narrative({
        narration: [
          "The crowd accepts a guilty target and carries that target to the well.",
        ],
        gives: {
          effects: todoEffect(
            "World State Change: the lynch completes on a perpetrator | Ending Progress: Punishment / mob-justice ending advances",
          ),
        },
      }),
    }),
    turnTheAimOffAnInnocent: action({
      label: "Turn the aim off an innocent",
      requires: [
        new Requirement("The mob's target isn't innocent.", {
          when: todo("The current target from Dudka's targeting score is innocent"),
        }),
        new Requirement("You have no other name with weight.", {
          when: todo("the players provide a different name with weight"),
        }),
      ],
      cost: [{ composure: 1 }],
      narrative: new Narrative({
        narration: [
          "The mob leaves the innocent target and takes the replacement target.",
        ],
        gives: {
          effects: todoEffect("World State Change: the target shifts | Ending Progress: the well still takes a body"),
        },
      }),
    }),
    putYourselfBetweenThemAndTheTarget: action({
      label: "Put yourself between them and the target",
      // TODO: cost was "Grave" (the player may die); no matching cost type.
      cost: [],
      narrative: new Narrative({
        narration: [
          "The target can be saved; the mob may take the player instead.",
        ],
        gives: {
          effects: todoEffect(
            "World State Change: the original target is saved | World State Change: a player may die in the target's place",
          ),
        },
      }),
    }),
    convinceDudkaJusticeWillBeDelivered: action({
      label: "Convince Dudka justice will be delivered",
      requires: [
        new Requirement("Dudka won't listen to you.", {
          // Uplift Ryszard clears Humiliated, so "not Humiliated" covers "Uplifted".
          when: (w, me) => w.neighbour.bonded.of(me) || !w.neighbour.humiliated,
        }),
        new Requirement("You can't show justice is already moving.", {
          when: todo("proof that justice is already moving"),
        }),
      ],
      promptedBy: [Neighbour],
      cost: [{ composure: 1 }],
      narrative: new Narrative({
        narration: [
          "Dudka lowers the rifle, gives testimony, and the denied mob turns on him.",
        ],
        gives: {
          effects: todoEffect(
            "World State Change: the intended target lives | World State Change: Dudka dies in the well | Ending Progress: the truth is on record toward Justice",
          ),
        },
      }),
    }),
    letItRun: action({
      label: "Let it run",
      cost: [],
      narrative: new Narrative({
        narration: [
          "The mob goes to the well and the target from Dudka's targeting score goes in.",
        ],
        gives: {
          effects: todoEffect(
            "World State Change: the lynch completes | Ending Progress: Punishment / mob-justice ending advances",
          ),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theOfficeState: opportunity({
      label: "The office state",
      target: { skills: [Finesse] },
      promptedBy: [PunishmentLynch],
      narrative: new Narrative({
        narration: [
          "The dark locked office or the man on the steps shows whether Irena reached Zbigniew.",
        ],
      }),
    }),
    theMobsStructure: opportunity({
      label: "The mob's structure",
      target: { skills: [Finesse] },
      promptedBy: [PunishmentLynch],
      narrative: new Narrative({
        narration: [
          "Only a handful of men are driving the lynch. Most are drunk followers. Dudka is the main driver unless Barbara is present.",
        ],
      }),
    }),
    theTarget: opportunity({
      label: "The target",
      target: { skills: [Violence] },
      promptedBy: [PunishmentLynch],
      narrative: new Narrative({
        narration: [
          "The target may be guilty, innocent, or one of the players. The mob treats the distinction as irrelevant.",
        ],
      }),
    }),
    dudkasFace: opportunity({
      label: "Dudka's face",
      target: { skills: [Empathy] },
      promptedBy: [PunishmentLynch],
      narrative: new Narrative({
        narration: [
          "He is acting from guilt over his own inaction, not certainty.",
        ],
      }),
    }),
    theRepetition: opportunity({
      label: "The repetition",
      target: { when: (_w, me) => me.has(History) || me.has(Culture) },
      promptedBy: [PunishmentLynch],
      narrative: new Narrative({
        narration: [
          "The same drink, dark road, and well repeat the 1954 pattern.",
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
}
