import { Location, Narrative, Requirement, SkillRequirement, action, opportunity } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";
import { Culture, Geology, History, Language, Superstitious, Survival, Violence } from "../skills.ts";
import UpaBunker from "./upa-bunker.ts";
import GeologistsKit from "../items/geologists-kit.ts";
import SurveyingTheStreambed from "../events/surveying-the-streambed.ts";
import SearchForTheBenchmarks from "../events/search-for-the-benchmarks.ts";
import * as clues from "../clues.ts";
import { todoEffect } from "../todo.ts";

export default class FarRidgeStreambed extends Location {
  readonly id = "far-ridge-streambed";
  readonly name = "Far-Ridge Streambed";
  // TODO: source has no ## Hook; written from the **Location:** header.
  readonly hook = "The far ridge across the valley from %NEW_VILLAGE%, where a dry streambed crosses the col.";
  readonly position = "far ridge across the valley; dry col toward the next valley";
  // TODO: "1 action to reach; fieldwork costs vary by action."
  readonly visitCost = 1;
  override present(): CharacterRef[] {
    return [];
  }

  readonly setup = new Narrative({
    narration: [
      "A dry streambed runs over the far ridge and appears to spill toward the next valley.",
      "The streambed's col (its high point) sits above %NEW_VILLAGE% house level, so water tops the village before it ever reaches here. Nothing on the ground announces this; only elevation figures show it.",
      "The map draws the streambed honestly but never marks the col's elevation.",
      "The dam-survey crews left stamped geodetic benchmarks (repery) at the col and beside %NEW_VILLAGE%.",
      "The markers are old and half-buried; finding them takes searching.",
      "The col commands the whole valley: from here you look straight down on %NEW_VILLAGE%, across to the %OLD_VILLAGE% ruins, and over the ground the reservoir will drown. It is the natural place to watch the valley from, and men have.",
      "Just below the col, under gorse and slid earth, a collapsed dugout with a firing slot faces the valley floor; rusted metal and a rotted timber lip still show. Partisans held this line in the war years.",
      "Only if the party turned up the hut on the benchmark search (abandoned-house-by-streambed): an abandoned shepherd's koliba stands hidden in the gorse higher on the slope, its low doorway still up, a weathered ram's skull fixed over the lintel and marks cut into the frame, facing out. Parties who have not found it do not see it and get no koliba description.",
      "Getting the streambed's elevations plays out as one of two competing scenes: Surveying the Streambed (fast, needs a geologist and most of a day) or Search for the Benchmarks (no geologist, but 8 cards of combing, halved to 4 with Survival). Either yields streambed-parameters.",
    ],
    gives: { aware: [FarRidgeStreambed] },
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // "Requires: Time on the far ridge" = being here; omitted.
    searchTheFarRidge: action({
      label: "Search the far ridge",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Quartering the slopes and gullies beyond the dry streambed, pushing through the gorse, you turn up an abandoned shepherd's koliba half-swallowed on the slope, easy to miss and long empty.",
        ],
        gives: { clues: [clues.AbandonedHouseByStreambed] },
      }),
    }),
    trackTheUpaBunker: action({
      label: "Track the UPA bunker",
      requires: [
        new SkillRequirement(Survival),
      ],
      promptedBy: [clues.UpaBunkersInTheArea, clues.OldWartimePositions],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Working out from the firing position, a tracker picks up the old partisan paths worn between the hillside strongpoints and follows them to a camouflaged dugout deep in the forest northwest, its ventilation shafts breaking the slope. You now know exactly where the UPA bunker lies.",
        ],
        gives: { aware: [UpaBunker] },
      }),
    }),
    // TODO: source says "a PC with Geology and the kit" (party-level); modelled per player.
    startASurvey: action({
      label: "Start a survey",
      requires: [
        new SkillRequirement(Geology),
        new Requirement("You don't have the geologist's kit.", { items: [GeologistsKit] }),
      ],
      promptedBy: [clues.StreambedIsCandidateDrain],
      cost: [],
      narrative: new Narrative({
        narration: [
          "The party commits to shooting the col's elevation themselves. Opens Surveying the Streambed.",
        ],
        gives: { aware: [SurveyingTheStreambed] },
      }),
    }),
    startASearch: action({
      label: "Start a search",
      promptedBy: [clues.DamBuildersSurveyedStreambed],
      cost: [],
      narrative: new Narrative({
        narration: [
          "The party commits to hunting the dam crews' benchmark markers. Opens Search for the Benchmarks.",
        ],
        gives: { aware: [SearchForTheBenchmarks] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    readTheOldPosition: opportunity({
      label: "Read the old position",
      target: { when: (_w, me) => me.has(History) || me.has(Violence) },
      promptedBy: [clues.StreambedIsCandidateDrain],
      narrative: new Narrative({
        narration: [
          "The collapsed dugout below the col is a wartime firing position, sited to watch and command the valley: rusted metal, a rotted timber lip, the shape of a partisan line.",
        ],
        gives: { clues: [clues.OldWartimePositions] },
      }),
    }),
    readTheKoliba: opportunity({
      label: "Read the koliba",
      target: { clues: [clues.AbandonedHouseByStreambed], skills: [Culture] },
      narrative: new Narrative({
        narration: [
          "The tumbled stones and rotten roof-poles are a koliba, a Lemko shepherd's summer hut; the build and the worn pasture ground read as Greek Catholic hill herders' work, from before the valley was cleared.",
        ],
        gives: { clues: [clues.OldVillageWasLemko] },
      }),
    }),
    duckInsideTheHut: opportunity({
      label: "Duck inside the hut",
      target: { clues: [clues.AbandonedHouseByStreambed] },
      narrative: new Narrative({
        narration: [
          "Under the ram's skull is a single smoke-blackened room, empty for decades yet armoured against the dark: ash crosses smeared across a long-cold hearth where the shepherd's watra once burned, iron driven into the threshold, the black remains of herb bundles hanging from the rafters, three-barred crosses cut so deep and so often into the timber that whole boards are furred with them. The wards all face outward, to keep something out.",
        ],
        gives: { clues: [clues.ThreeBarredCrossInAbandonedHouse] },
      }),
    }),
    // TODO: "inside the hut" read as holding the clue the hut gives.
    nameTheWarding: opportunity({
      label: "Name the warding",
      target: { clues: [clues.ThreeBarredCrossInAbandonedHouse], skills: [Culture] },
      narrative: new Narrative({
        narration: [
          "Greek Catholic hill-herders' warding against wolves and the restless dead, the same tradition that mourns the unburied. Whatever they feared up here, they lined every surface against it, then one season walked down the mountain and never came back. → No clue; understanding.",
        ],
      }),
    }),
    readTheScratchedCyrillic: opportunity({
      label: "Read the scratched Cyrillic",
      target: { clues: [clues.ThreeBarredCrossInAbandonedHouse], skills: [Language] },
      narrative: new Narrative({
        narration: [
          "Among the crosses are names, and a plea for the dead to lie still. → No clue.",
        ],
      }),
    }),
    // TODO: an opportunity can't cost; the "1 composure" (GM's call) is a todoEffect.
    feelWhatItWardsAgainst: opportunity({
      label: "Feel what it wards against",
      target: { clues: [clues.ThreeBarredCrossInAbandonedHouse], skills: [Superstitious] },
      narrative: new Narrative({
        narration: [
          "You do not read this room, you feel it, and you know exactly what it is warding against. → No clue; GM's call, 1 composure.",
        ],
        gives: { effects: todoEffect("GM's call, 1 composure") },
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
