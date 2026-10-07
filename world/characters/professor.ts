import { Character, CharacterDescription, Narrative, Requirement, action } from "../schema.ts";
import type { Checks } from "../schema.ts";
import VillageOutskirts from "../locations/village-outskirts.ts";
import * as clues from "../clues.ts";
import { todo } from "../todo.ts";

export default class Professor extends Character {
  readonly id = "professor";
  readonly name = "prof. Tadeusz Bieńkowski";
  readonly description = new CharacterDescription({
    narration: ["prof. Tadeusz Bieńkowski, a Kraków hydrologist tied to the Solina Dam project, reachable via the telephone exchange."],
    clothes: "Corduroy jacket with leather elbow patches, shirt pocket full of pens, city shoes wrong for fieldwork",
    hairAndFace: "Thinning hair combed to one side, wire-rimmed glasses sliding down a narrow nose, ink-stained fingers",
    carriage: "Lean, restless academic energy; forgets to eat, talks with both hands when excited",
    gives: { aware: [Professor] },
  });

  // ------------------------------------------------------------ shared state (A pass)

  // the committee reached him by phone
  called = false;
  readonly role = "outsider / catalyst";
  // Lives in Kraków — university housing. No livesAt.

  // ------------------------------------------------------------ state

  // Set by "Call him for help": he is engaged and waiting for the field readings.
  engaged = false;

  // ------------------------------------------------------------ actions

  readonly allActions = {
    certifyThePlug: action({
      label: "Certify the plug",
      requires: [
        new Requirement("You have no phone line out.", { when: (w) => w.pgrOffice.phoneUnlocked }),
        new Requirement("You haven't examined the fill.", { clues: [clues.GapFillExamined] }),
        new Requirement("You haven't read the crest sill.", { clues: [clues.GapSillAboveFlood] }),
      ],
      promptedBy: [clues.GapFillExamined, clues.GapSillAboveFlood],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The party describes the sill height at the crest and the packed clay and shattered rock behind it. He judges the water can neither top the plug nor seep through it into %BIG-BASIN%, and documents the ridge gap as a dead outlet.",
        ],
        gives: { clues: [clues.GapIsBlocked], effects: (w) => { w.professor.called = true; } },
      }),
    }),
    certifyTheStreambed: action({
      label: "Certify the streambed",
      requires: [
        new Requirement("You have no phone line out.", { when: (w) => w.pgrOffice.phoneUnlocked }),
        new Requirement("You don't have the streambed elevations.", { clues: [clues.StreambedParameters] }),
      ],
      promptedBy: [clues.StreambedParameters],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The party reads him the col height and the village height. He compares the two and certifies the col sits above house level, so the rising water tops the village long before it reaches the streambed: a dead outlet.",
        ],
        gives: { clues: [clues.StreambedDeadEnds], effects: (w) => { w.professor.called = true; } },
      }),
    }),
    certifyTheDitch: action({
      label: "Certify the ditch",
      requires: [
        new Requirement("You have no phone line out.", { when: (w) => w.pgrOffice.phoneUnlocked }),
        new Requirement("You haven't measured the concrete head.", { clues: [clues.ConcreteDitchMeasurements] }),
        new Requirement("You haven't measured the dugout.", { clues: [clues.DugoutMeasurements] }),
      ],
      promptedBy: [clues.ConcreteDitchMeasurements, clues.DugoutMeasurements],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The party reads him the two cross-sections: the ample concrete head and the shallow earth dugout that carries most of the length. He runs the drainage figures over the real channel rather than the head alone and certifies the ditch backs up and overflows at flood volume, far too small to carry the water off.",
        ],
        gives: { clues: [clues.DitchDrainsNothing], effects: (w) => { w.professor.called = true; } },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }

  // ------------------------------------------------------------ bond

  bond: Checks = [
    "Reference his published work or show familiarity with hydrology",
    "Provide hard data — measurements, dates, observations from the field",
    "Call him back with follow-up information",
  ];
}
