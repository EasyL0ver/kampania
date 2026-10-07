import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, Effect, EventHook, LocationRef, Tick, WorldCond } from "../schema.ts";
import { Empathy, Finesse, Survival } from "../skills.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";
import TheChurch from "../locations/the-church.ts";
import Butcher from "../characters/butcher.ts";
import FuneralMass from "./funeral-mass.ts";
import TheFlood from "./the-flood.ts";

export default class RezenTakesTheBody extends Event {
  readonly id = "rezen-takes-the-body";
  readonly name = "Rezeń Takes the Body";
  readonly hook = "Rezeń's dogs move in the dark between the church and the forest.";

  // TODO: "The church, then the well" — only the church is modelled.
  override at(): LocationRef {
    return TheChurch;
  }

  // Also: his dogs.
  // TODO: Rezeń only "if alive and loose"; not modelled.
  override present(): CharacterRef[] {
    return [Butcher];
  }
  override readonly hooks: EventHook[] = [
    { text: "Rezeń's dogs move in the dark between the church and the forest.", heardAt: "anywhere" },
  ];
  override condition: WorldCond = (w) => w.theFlood.status !== "pending" && w.funeralMass.status !== "pending";
  readonly setup = new Narrative({
    narration: [
      "If discovered on Day 6 morning, the church door is ajar.",
      "Rain pools inside the church.",
      "The coffin at the front is open and empty.",
      "A candle is knocked over.",
      "A wet drag trail crosses the flagstones and leaves the church.",
      "Heel-furrows in the mud lead toward %OLD_VILLAGE% and the well.",
      "Dog prints run alongside the drag trail.",
      "The village is not awake yet.",
      "If players kept vigil, Rezeń enters after midnight, soaked and calm.",
      "If players kept vigil, his dogs wait at the threshold.",
      "If no one stops him, he lifts Janina's body and carries it out.",
    ],
  });
  composure = 1;

  resolve: Tick = todoEffect(
    "If players do not guard the body and do not find the trail before the village wakes, others discover the empty coffin. | The village blames Rezeń. | Janina remains in the well. | If found later, her body is fresh among the older dead.",
  );

  // ------------------------------------------------------------ actions

  readonly allActions = {
    keepVigilOverTheBody: action({
      label: "Keep vigil over the body",
      promptedBy: [FuneralMass],
      // TODO: cost was "A night; no rest; exhaustion the next day" — modelled as 2 time.
      cost: [{ time: 2 }],
      narrative: new Narrative({
        narration: [
          "Rezeń comes for the body after midnight, stops when caught, explains himself, and leaves without the body.",
        ],
        gives: {
          clues: [clues.ButcherDumpsCarcassesInWell],
          effects: todoEffect("World State Change: rezen-fed-ciotka-to-well does not happen"),
        },
      }),
    }),
    followTheDragTrail: action({
      label: "Follow the drag trail",
      requires: [
        new Requirement("You haven't found the empty coffin and trail.", {
          when: todo("Found the empty coffin and the trail."),
        }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The trail reaches the well in %OLD_VILLAGE%; a shawl or shoe is caught on the stone; Rezeń's tracks lead back to his house.",
        ],
        gives: { clues: [clues.CiotkaBodyTaken] },
      }),
    }),
    // TODO: after a kept vigil this still gives rezen-fed-ciotka-to-well, which the vigil prevents.
    confrontRezen: action({
      label: "Confront Rezeń",
      requires: [
        new Requirement("You haven't caught him or tracked the body.", {
          when: (w): boolean =>
            w.rezenTakesTheBody.allActions.keepVigilOverTheBody.done ||
            w.rezenTakesTheBody.allActions.followTheDragTrail.done,
        }),
      ],
      promptedBy: [Butcher],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Rezeń does not deny taking the body. He says the flood left Janina unburied, the body was turning, and the well is where he put her.",
        ],
        gives: {
          clues: [clues.RezenFedCiotkaToWell],
          effects: todoEffect(
            "NPC State Change: village suspicion of Rezeń hardens if this becomes public | Ending Progress: Punishment / mob-justice ending against Rezeń advances",
          ),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theDragTrail: opportunity({
      label: "The drag trail",
      target: { skills: [Survival] },
      promptedBy: [RezenTakesTheBody],
      narrative: new Narrative({
        narration: [
          "The trail is fresh, made within the last few hours, and points straight toward %OLD_VILLAGE%.",
        ],
        gives: { clues: [clues.CiotkaBodyTaken] },
      }),
    }),
    theEmptyCoffin: opportunity({
      label: "The empty coffin",
      target: { skills: [Finesse] },
      promptedBy: [RezenTakesTheBody],
      narrative: new Narrative({
        narration: [
          "There is no sign of struggle, theft, or vandalism. Whoever came wanted the body only.",
        ],
      }),
    }),
    theDogs: opportunity({
      label: "The dogs",
      target: { skills: [Survival] },
      promptedBy: [RezenTakesTheBody],
      narrative: new Narrative({
        narration: [
          "The dogs are Rezeń's dogs and move between the church and the forest path.",
        ],
      }),
    }),
    rezensCalm: opportunity({
      label: "Rezeń's calm",
      target: { skills: [Empathy] },
      promptedBy: [RezenTakesTheBody],
      narrative: new Narrative({
        narration: [
          "He is steadier after taking the body than he has been in days.",
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
