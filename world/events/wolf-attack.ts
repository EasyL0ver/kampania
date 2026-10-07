import { Event, Narrative, action, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef } from "../schema.ts";
import { Culture, Empathy, Finesse, Handiwork, Speech, Survival } from "../skills.ts";
import PgrFarm from "../locations/pgr-farm.ts";
import Foreman from "../characters/foreman.ts";
import Wojewoda from "../characters/wojewoda.ts";
import Neighbour from "../characters/neighbour.ts";
import * as clues from "../clues.ts";
import { todoEffect } from "../todo.ts";

export default class WolfAttack extends Event {
  readonly id = "wolf-attack";
  readonly name = "The Wolf Attack";
  readonly hook = "Workers gather at the pen at dawn.";
  override at(): LocationRef {
    return PgrFarm;
  }

  // Also: farm workers.
  override present(): CharacterRef[] {
    return [Foreman, Wojewoda, Neighbour];
  }
  override readonly hooks: EventHook[] = [
    { text: "Workers gather at the pen at dawn.", heardAt: [PgrFarm] },
  ];
  readonly setup = new Narrative({
    narration: [
      "A sheep lies dead in the pen.",
      "Its throat is torn.",
      "Blood is in the mud.",
      "Drag marks lead toward the treeline.",
      "The other animals crowd in the far corner.",
      "Zbigniew Gajda counts the damage.",
      "Ryszard Dudka stands nearby with his rifle.",
      "Zbigniew blames Dudka in front of the workers.",
      "Zbigniew tells Michał Pytlak he will handle it.",
      "Zbigniew later sends Tadek to the edge house with the request that Rezeń deal with the wolves; see Tadek Visits the Butcher.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    reinforceTheFarm: action({
      label: "Reinforce the farm",
      promptedBy: [WolfAttack],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The players help Michał Pytlak and the workers repair fence, move livestock, and haul feed.",
        ],
        gives: {
          effects: todoEffect("World State Change: the farm is temporarily reinforced | NPC State Change: Pytlak talks more freely while working"),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theKill: opportunity({
      label: "The kill",
      target: { skills: [Survival] },
      promptedBy: [WolfAttack],
      narrative: new Narrative({
        narration: [
          "One animal worked confidently inside a known pen.",
        ],
      }),
    }),
    gajdaAtTheFence: opportunity({
      label: "Gajda at the fence",
      target: { skills: [Empathy] },
      promptedBy: [WolfAttack],
      narrative: new Narrative({
        narration: [
          "He is bracing to authorize the thing he avoided for thirteen years.",
        ],
      }),
    }),
    dudkaTakingBlame: opportunity({
      label: "Dudka taking blame",
      target: { skills: [Empathy] },
      promptedBy: [WolfAttack],
      narrative: new Narrative({
        narration: [
          "The humiliation is less important than who will replace him.",
        ],
      }),
    }),
    dudkaAloneAfter: opportunity({
      label: "Dudka alone after",
      target: { skills: [Speech] },
      promptedBy: [WolfAttack],
      narrative: new Narrative({
        narration: [
          "His failure is real and his fear of Rezeń is older than the wolves.",
        ],
      }),
    }),
    workersMuttering: opportunity({
      label: "Workers muttering",
      target: { skills: [Finesse] },
      promptedBy: [clues.WolvesAttackingLivestock],
      narrative: new Narrative({
        narration: [
          "Workers say Dudka has failed for weeks and that the other hunter is good with a knife.",
        ],
        gives: { clues: [clues.DudkaFailedWolfHunt] },
      }),
    }),
    workersBlameTheHag: opportunity({
      label: "Workers blame the hag",
      target: { when: (_w, me) => me.has(Finesse) || me.has(Culture) },
      promptedBy: [clues.WolvesAttackingLivestock],
      narrative: new Narrative({
        narration: [
          "`(requires: Finesse or Culture)` — workers connect the wolf attacks to fires and chanting in the ruins.",
        ],
        gives: { clues: [clues.HagBlamedForWolves] },
      }),
    }),
    fenceConditionAfterRepairs: opportunity({
      label: "Fence condition after repairs",
      trigger: (w): boolean => w.wolfAttack.allActions.reinforceTheFarm.done,
      target: { skills: [Handiwork] },
      promptedBy: [clues.WolvesAttackingLivestock],
      narrative: new Narrative({
        narration: [
          "`(requires: Reinforce the farm and Handiwork)` — the fence was rotten before the rains and the wolves used an existing weakness.",
        ],
        gives: { clues: [clues.PgrUnderfundedFences] },
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
