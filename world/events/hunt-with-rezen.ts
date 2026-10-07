import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, Effect, EventHook, LocationRef, Tick, WorldCond } from "../schema.ts";
import { todo, todoEffect } from "../todo.ts";
import { Empathy, Survival, Violence } from "../skills.ts";
import * as clues from "../clues.ts";
import PgrFarm from "../locations/pgr-farm.ts";
import Butcher from "../characters/butcher.ts";
import WolfAttack from "./wolf-attack.ts";

export default class HuntWithRezen extends Event {
  readonly id = "hunt-with-rezen";
  readonly name = "The Hunt with Rezeń";
  readonly hook = "Rezeń at the PGR gate with three dogs, starting to track from the mud.";

  // ------------------------------------------------------------ shared state (A pass)

  // Rezeń's hunt killed a wolf
  succeeded = false;
  override at(): LocationRef {
    return PgrFarm;
  }

  // Players optional.
  override present(): CharacterRef[] {
    return [Butcher];
  }
  override readonly hooks: EventHook[] = [
    { text: "Rezeń at the PGR gate with three dogs, starting to track from the mud.", heardAt: [PgrFarm] },
  ];
  // TODO: Gajda authorizes Rezeń; next morning after wolf attack
  override condition: WorldCond = (w) => w.wolfAttack.status !== "pending" && todo("Gajda authorizes Rezeń")();
  readonly setup = new Narrative({
    narration: [
      "Rezeń handles the dogs through small hand signals and quiet sounds.",
      "Rezeń reads wolf sign before anyone gives him instructions.",
      "Rezeń keeps a knife in his hand and turns it idly.",
      "Rezeń is calmer in the forest than in the village.",
      "Rezeń's route drifts toward the deeper forest and the old village.",
    ],
  });

  resolve: Tick = todoEffect(
    "Rezeń hunts alone and locates the den on high ground. | If Rezeń kills a wolf, he puts the carcass in the well without witnesses.",
  );

  // ------------------------------------------------------------ actions

  readonly allActions = {
    followHimIntoTheForest: action({
      label: "Follow him into the forest",
      promptedBy: [clues.DudkaFailedWolfHunt],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Rezeń finds scat, scrapes, wool on brush, likely denning ground, and passable routes without hesitation.",
        ],
        gives: { clues: [clues.RezenHuntsWolves] },
      }),
    }),
    stayWithHimIfHeMakesAKill: action({
      label: "Stay with him if he makes a kill",
      requires: [
        new Requirement("You have to follow him into the forest first.", {
          when: (w): boolean => w.huntWithRezen.allActions.followHimIntoTheForest.done,
        }),
        // TODO: whether he makes a kill is not modelled.
        new Requirement("He hasn't killed a wolf.", { when: todo("Follow Rezeń to a killed wolf") }),
      ],
      promptedBy: [clues.RezenHuntsWolves],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Rezeń carries the carcass deeper toward the old village and drops it into the well.",
        ],
        gives: { clues: [clues.ButcherDumpsCarcassesInWell] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theDogs: opportunity({
      label: "The dogs",
      target: { skills: [Survival] },
      promptedBy: [clues.DudkaFailedWolfHunt],
      narrative: new Narrative({
        narration: [
          "The dogs move as an extension of Rezeń's body.",
        ],
        gives: { clues: [clues.RezenHuntsWolves] },
      }),
    }),
    theKnife: opportunity({
      label: "The knife",
      target: { skills: [Violence] },
      promptedBy: [HuntWithRezen],
      narrative: new Narrative({
        narration: [
          "Rezeń is not nervous; his hands want something sharp.",
        ],
        gives: { clues: [clues.ButcherIsDangerous] },
      }),
    }),
    theCalmHunter: opportunity({
      label: "The calm hunter",
      target: { skills: [Empathy] },
      promptedBy: [HuntWithRezen],
      narrative: new Narrative({
        narration: [
          "Rezeń is most relaxed while tracking prey in the forest.",
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
