import { Location, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";
import { Geology } from "../skills.ts";
import Foreman from "../characters/foreman.ts";
import Rope from "../items/rope.ts";
import MakeshiftCharge from "../items/makeshift-charge.ts";
import ClimbThePlug from "../events/climb-the-plug.ts";
import ClimbThePlugInTheRain from "../events/climb-the-plug-in-the-rain.ts";
import * as clues from "../clues.ts";

export default class TheRidgeGap extends Location {
  readonly id = "the-ridge-gap";
  readonly name = "The Ridge Gap";
  // TODO: source has no ## Hook; written from the **Location:** header.
  readonly hook = "The notch in the ridge between the %NEW_VILLAGE% valley and the empty %BIG-BASIN% beyond.";
  readonly position = "ridge notch between the valley and %BIG-BASIN%";
  // TODO: "1 action per interaction; climbing the plug is its own scene".
  readonly visitCost = 1;
  // Michał only if brought on the survey (not modelled).
  override present(): CharacterRef[] {
    return [Foreman];
  }

  readonly setup = new Narrative({
    narration: [
      "The gap is the low notch where the ridge dips between the %NEW_VILLAGE% valley and %BIG-BASIN%.",
      "The state map draws it as an open channel, the valley's main drain.",
      "An old landslide has choked the notch with fallen rock and earth.",
      "From the base the fill looks like loose rubble floodwater would seep straight through.",
      "The plug is a steep bank about two storeys high. Climbing it is its own scene: Climb the Plug on the survey, and Climb the Plug in the Rain for the finale charge.",
      "The fill can be sampled at the toe, but that only settles whether it seeps. What decides the outlet is read only at the crest: the height of the plug's lowest saddle (the sill the rising water must top to spill into %BIG-BASIN%) and whether the slid mass beds against the intact ridge or leaves a channel. Both are invisible from below.",
      "The top of the plug overlooks the empty %BIG-BASIN%, the ground the map says the valley's water should drain into.",
      "Nothing but this fill stands between the valley and %BIG-BASIN%.",
    ],
    gives: { aware: [TheRidgeGap] },
  });

  // TODO: **Available:** "After reaching the gap from the survey routes" not modelled.

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // "reaching the foot of the plug (no climb)" = being here; omitted.
    // The Geology branch in the source gives no extra clue; kept in prose.
    examineTheFillAtTheToe: action({
      label: "Examine the fill at the toe",
      promptedBy: [clues.LandslideInTheGap, clues.GapMaySeep],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Scramble to the base of the plug and dig into it. From a distance the fill looks like loose rubble the water would run straight through; up close it is dense clay and shattered rock packed tight, impermeable. This settles only whether the plug leaks, not whether the water level can rise over it (that is the crest sill, which needs the climb). Geology: reads the fill directly and confirms it will not pass water at flood pressure.",
        ],
        gives: { clues: [clues.GapFillExamined] },
      }),
    }),
    climbThePlug: action({
      label: "Climb the plug",
      requires: [
        new Requirement("You need a rope for the killzone.", { items: [Rope] }),
      ],
      promptedBy: [clues.LandslideInTheGap, clues.WaterMayFlowOver],
      cost: [],
      narrative: new Narrative({
        narration: [
          "The party sets up at the foot of the plug and goes for the crest. Play Climb the Plug.",
        ],
        gives: { aware: [ClimbThePlug] },
      }),
    }),
    // "demolition charges" read as items/makeshift-charge.
    climbThePlugInTheRain: action({
      label: "Climb the plug in the rain",
      requires: [
        new Requirement("You have no charge to set.", { items: [MakeshiftCharge] }),
        new Requirement("You have no engineering plan yet.", { when: (w) => w.foremanSavesVillage.allActions.believeHim.done }),
      ],
      cost: [],
      narrative: new Narrative({
        narration: [
          "With the charges in hand and the flood cresting, the party goes back up to set the charge. Play Climb the Plug in the Rain.",
        ],
        gives: { aware: [ClimbThePlugInTheRain] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theFillLooksLoose: opportunity({
      label: "The fill looks loose",
      target: { clues: [clues.LandslideInTheGap] },
      narrative: new Narrative({
        narration: [
          "At the foot of the plug the fill looks like loose, open rubble the water would run straight through, so the gap might yet drain by seeping through it.",
        ],
        gives: { clues: [clues.GapMaySeep] },
      }),
    }),
    waterWouldHaveToTopTheSaddle: opportunity({
      label: "Water would have to top the saddle",
      target: { clues: [clues.GapIsCandidateDrain] },
      narrative: new Narrative({
        narration: [
          "For the gap to drain, rising water must clear the plug's lowest saddle and spill into %BIG-BASIN%; whether that saddle sits below the flood line is the open question.",
        ],
        gives: { clues: [clues.WaterMayFlowOver] },
      }),
    }),
    theGapWontDrain: opportunity({
      label: "The gap won't drain",
      target: { clues: [clues.GapFillExamined, clues.GapSillAboveFlood], skills: [Geology] },
      narrative: new Narrative({
        narration: [
          "Put the two readings together: the fill will not seep and the sill will not overtop, so water can leave the valley neither through the plug nor over it. The outlet is dead.",
        ],
        gives: { clues: [clues.GapIsBlocked] },
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
