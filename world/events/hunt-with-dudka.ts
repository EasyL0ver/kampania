import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, Effect, EventHook, LocationRef, Tick, WorldCond } from "../schema.ts";
import { Empathy, Survival } from "../skills.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";
import PgrFarm from "../locations/pgr-farm.ts";
import MeadowByTheRavine from "../locations/meadow-by-the-ravine.ts";
import Neighbour from "../characters/neighbour.ts";
import Hag from "../characters/hag.ts";
import WolfAttack from "./wolf-attack.ts";

export default class HuntWithDudka extends Event {
  readonly id = "hunt-with-dudka";
  readonly name = "The Hunt with Dudka";
  readonly hook = "Dudka shouldering his rifle and heading into the forest after spotting Rezeń.";
  override at(): LocationRef {
    return PgrFarm;
  }

  // Players optional.
  override present(): CharacterRef[] {
    return [Neighbour];
  }
  override readonly hooks: EventHook[] = [
    { text: "Dudka shouldering his rifle and heading into the forest after spotting Rezeń.", heardAt: [PgrFarm] },
  ];
  override condition: WorldCond = (w) => w.wolfAttack.status !== "pending"; // TODO: next morning gate
  readonly setup = new Narrative({
    narration: [
      "Dudka enters the forest to track the same wolf pack Rezeń is hunting.",
      "Dudka knows the forest trails, scrapes, and likely wolf routes.",
      "Dudka grips the rifle too tightly and pushes deeper than needed.",
      "Dudka watches the treeline and reacts to Rezeń's dogs in the distance.",
      "Dudka dismisses the idea that Paraskewia Chyłak controls the wolves.",
    ],
  });

  resolve: Tick = todoEffect(
    "Dudka hunts alone and reports incomplete wolf information. | Dudka still visits the grave, but the players do not learn where it is from him. | Dudka's failure keeps pushing him toward the lynch.",
  );

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // Was an ungated opportunity.
    theBoarSummer: action({
      label: "The boar summer",
      promptedBy: [HuntWithDudka],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Rambling about game, Dudka mentions the boar glut two summers back, all rooting at one spot up past the farm where the PGR tipped a whole silo of spoiled grain.",
        ],
        gives: { clues: [clues.GrainHasBeenDumped] },
      }),
    }),
    theGraveInTheMeadow: action({
      label: "The grave in the meadow",
      requires: [
        new Requirement("Follow Dudka until the hunt swings far.", {
          when: todo("Follow Dudka long enough for the hunt to swing toward the far woods"),
        }),
      ],
      promptedBy: [clues.DudkaFailedWolfHunt],
      cost: [{ time: 1 }],
      // Scene Unlock of a location → aware.
      narrative: new Narrative({
        narration: [
          "Dudka leaves the wolf track and detours to a low cairn of moss-grown stones at the lip of a ravine, where he stops to pray. Asked, he identifies the grave only as an old friend he buried himself.",
        ],
        gives: { clues: [clues.DudkaBuriedAFriendAtTheRavine], aware: [MeadowByTheRavine] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    dudkasCompetence: opportunity({
      label: "Dudka's competence",
      target: { skills: [Survival] },
      promptedBy: [HuntWithDudka],
      narrative: new Narrative({
        narration: [
          "Dudka's failure is not lack of skill; one hunter is too little for a smart pack in a large forest.",
        ],
      }),
    }),
    dudkasAnger: opportunity({
      label: "Dudka's anger",
      target: { skills: [Empathy] },
      promptedBy: [clues.RezenHuntsWolves],
      narrative: new Narrative({
        narration: [
          "Dudka's anger is older and more personal than professional failure.",
        ],
        gives: { clues: [clues.DudkaDespisesRezen] },
      }),
    }),
    theDistantDogs: opportunity({
      label: "The distant dogs",
      target: { skills: [Empathy] },
      promptedBy: [clues.RezenHuntsWolves],
      narrative: new Narrative({
        narration: [
          "Dudka reacts to Rezeń's dogs before he forces himself calm.",
        ],
        gives: { clues: [clues.DudkaDespisesRezen] },
      }),
    }),
    // TODO: gate is a player asking about the rumour (really an action) and it gives nothing.
    theHagRumor: opportunity({
      label: "The hag rumor",
      target: { when: todo("players ask Dudka about the village rumor blaming Paraskewia Chyłak") },
      promptedBy: [Hag],
      narrative: new Narrative({
        narration: [
          "Dudka treats the wolves as animals reacting to rain, prey, and terrain, not witchcraft.",
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
