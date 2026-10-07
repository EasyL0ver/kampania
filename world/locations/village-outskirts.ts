import { Location, Narrative, Requirement, SkillRequirement, action, opportunity } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";
import { Finesse, Survival } from "../skills.ts";
import Foreman from "../characters/foreman.ts";
import Hag from "../characters/hag.ts";
import OldVillageRuins from "./old-village-ruins.ts";
import TheRidgeGap from "./the-ridge-gap.ts";
import BimberStill from "./bimber-still.ts";
import CaughtAtTheStill from "../events/caught-at-the-still.ts";
import HagsCabin from "./hags-cabin.ts";
import UpaBunker from "./upa-bunker.ts";
import ClimbThePlug from "../events/climb-the-plug.ts";
import ForemanSavesVillage from "../events/foreman-saves-village.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";

export default class VillageOutskirts extends Location {
  readonly id = "village-outskirts";
  // TODO: skeleton name was the id; set from the H1.
  readonly name = "Village Outskirts";
  readonly hook = "The river, hillsides, and forest edges around %NEW_VILLAGE%.";
  readonly position = "terrain around the village: river, hillsides, forest edges";
  // TODO: "1 action per site surveyed; full survey is four sites; office maps or
  // Michał Pytlak waive the three easy sites" — not modelled.
  readonly visitCost = 1;
  // Survey party; Michał only if invited (not modelled).
  override present(): CharacterRef[] {
    return [Foreman];
  }

  readonly setup = new Narrative({
    narration: [
      "The terrain includes the river, hillsides, forest edges, ridges, and valley floors around %NEW_VILLAGE%.",
      "The survey uses an old military topographic map and instruments.",
      "The map is outdated.",
      "The river has shifted.",
      "The river is higher than expected.",
      "Soil near the valley floor is saturated.",
      "The local geology is Carpathian flysch: hard sandstone ridges over soft, slip-prone shale.",
      "Long parallel ridges separate valleys.",
      "Streams cross ridges through narrow water-gaps.",
      "%NEW_VILLAGE% sits in one valley.",
      "%OLD_VILLAGE% lies in the lower valley beyond a sandstone ridge.",
      "The map marks a water-gap through the ridge between the new-village valley and the empty %BIG-BASIN%.",
      "The marked water-gap is blocked by loose earth and broken rock from an old landslide.",
      "A far ridge across the valley carries an old dry streambed that appears to spill toward the next valley; see the Far-Ridge Streambed.",
      "The wojewoda's new bridge spans the river's present bed; on the map that ground is drawn dry, with the river on its old course.",
      "The southern approach rises into a low ridge of higher ground.",
      "The survey route can pass the old village ruins.",
      "One route passes the last house before the treeline, Stanisław Rezeń's house.",
      "One route crosses the track used by Tadek Gajda's drinking crew.",
    ],
    gives: { aware: [VillageOutskirts] },
  });

  // TODO: **Available:** "geological survey requires geological knowledge" not modelled.
  // TODO: "on a survey route" / "near the treeline" route conditions on the
  // opportunities are not modelled (the outskirts are one location here).

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // "Requires: Reaching the ridge water-gap" = doing this action; omitted.
    walkToTheRidgeGap: action({
      label: "Walk to the ridge gap",
      promptedBy: [clues.GapIsCandidateDrain, clues.RiverDoesntMatchMap, clues.BridgeOverSolidLand],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "You reach the notch. A landslide has choked the gap with fallen rock and earth. Whether that fill actually stops the water is a further question, settled at The Ridge Gap by climbing the plug for a geological read on-site or by describing it to prof. Bieńkowski.",
        ],
        gives: {
          clues: [clues.LandslideInTheGap],
          aware: [TheRidgeGap, ClimbThePlug, ForemanSavesVillage],
          },
      }),
    }),
    // TODO: the GM gives ONE of these leads, not all; modelled as giving all.
    wanderTheForest: action({
      label: "Wander the forest",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The GM gives one missing forest lead from bottle glass and cold ash, deep boot-prints, woodsmoke and burnt herbs, collapsed dugouts and rusted metal, or Stanisław Rezeń watching from the treeline.",
        ],
        gives: {
          clues: [clues.DrinkingCrewHeadsToForest, clues.ButcherHeadsTowardForest, clues.OldWartimePositions],
          aware: [Hag],
          effects: todoEffect("World State Change: Rezeń notices the party if he is the lead shown."),
        },
      }),
    }),
    followTheDrinkingCrew: action({
      label: "Follow the drinking crew",
      promptedBy: [clues.DrinkingCrewHeadsToForest],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The trail leads to the bimber still.",
        ],
        gives: { clues: [clues.BimberStill], aware: [BimberStill, CaughtAtTheStill] },
      }),
    }),
    followTheButchersPath: action({
      label: "Follow the Butcher's path",
      promptedBy: [clues.ButcherHeadsTowardForest],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Rezeń's trail leads past the old village toward the ridge.",
        ],
        gives: { clues: [clues.ButcherDumpsCarcassesInWell] },
      }),
    }),
    trackTheHagToHerCabin: action({
      label: "Track the hag to her cabin",
      promptedBy: [Hag],
      requires: [
        new SkillRequirement(Survival),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Knowing someone lives out here, a tracker cuts her sign from the forest floor: silent footfalls, snapped herbs, a worn path under the undergrowth. The trail runs back to the hag's cabin.",
        ],
        gives: { aware: [HagsCabin] },
      }),
    }),
    // TODO: the topographic map has no item file; todo gate.
    searchTheOldWartimePositions: action({
      label: "Search the old wartime positions",
      requires: [new Requirement("You don't know where to look.", { when: todo("The military map from Wojewoda's office, or Michał Pytlak's terrain hints") })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The search finds collapsed dugouts and rusted metal.",
        ],
        gives: { clues: [clues.OldWartimePositions] },
      }),
    }),
    lookForTheUpaBunker: action({
      label: "Look for the UPA bunker",
      requires: [new Requirement("You don't know there's a bunker out here.", {
        when: (_w, me) => me.knows(clues.OldWartimePositions) || me.knows(clues.UpaBunkersInTheArea),
      })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Ventilation shafts and a hidden entrance reveal the UPA bunker; Edek Barnaś may be near the mouth.",
        ],
        gives: { aware: [UpaBunker] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    spotTheOldVillage: opportunity({
      label: "Spot the old village",
      target: { skills: [Survival] },
      narrative: new Narrative({
        narration: [
          "Stone ruins are visible through the trees.",
        ],
        gives: { aware: [OldVillageRuins] },
      }),
    }),
    spotButcherAtHisHouse: opportunity({
      label: "Spot Butcher at his house",
      target: { skills: [Finesse] },
      narrative: new Narrative({
        narration: [
          "Rezeń is alone near the treeline and using the same direction repeatedly.",
        ],
        gives: { clues: [clues.ButcherHeadsTowardForest] },
      }),
    }),
    spotTheDrinkingCrewHeadingIntoTheForest: opportunity({
      label: "Spot the drinking crew heading into the forest",
      target: { skills: [Survival] },
      narrative: new Narrative({
        narration: [
          "Tadek Gajda and the crew carry bottles toward the forest.",
        ],
        gives: { clues: [clues.DrinkingCrewHeadsToForest] },
      }),
    }),
    seeTheLandslidePlug: opportunity({
      label: "See the landslide plug",
      target: { skills: [Survival] },
      promptedBy: [clues.CommitteeRunsGeographicalSurvey],
      narrative: new Narrative({
        narration: [
          "The notch in the ridge is choked with fallen rock and earth.",
        ],
        gives: { clues: [clues.LandslideInTheGap] },
      }),
    }),
    theRiverIsntWhereTheMapDrawsIt: opportunity({
      label: "The river isn't where the map draws it",
      target: { when: todo("observation comparing map to ground") },
      promptedBy: [clues.CommitteeRunsGeographicalSurvey],
      narrative: new Narrative({
        narration: [
          "The wojewoda's bridge spans running water, but the map shows that ground dry and the river on its old course.",
        ],
        gives: { clues: [clues.RiverDoesntMatchMap] },
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
