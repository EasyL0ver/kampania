import { Character, CharacterDescription, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { Checks, LocationRef } from "../schema.ts";
import { Empathy, Speech } from "../skills.ts";
import * as clues from "../clues.ts";
import { todoEffect } from "../todo.ts";
import PgrQuarters from "../locations/pgr-quarters.ts";
import Anchor from "../items/anchor.ts";

export default class Foreman extends Character {
  readonly id = "foreman";
  readonly name = "Michał Pytlak";
  readonly description = new CharacterDescription({
    narration: ["Michał Pytlak, the PGR farm overseer, directing work around the farm."],
    clothes: "Wool flat cap in all weather, oil-stained trousers held up by braces, collarless shirt.",
    hairAndFace: "Short cropped hair under the cap; broad jaw, flat nose broken once and set crooked, small shrewd eyes under heavy brows.",
    carriage: "Stocky, barrel-chested, low to the ground; slight limp from an old tractor injury; hands drum, grip, and point.",
    gives: { aware: [Foreman] },
  });

  // ------------------------------------------------------------ shared state (A pass)

  // set while foremans-flood-fight runs
  inFloodWork = false;
  readonly role = "farm overseer";
  livesAt: LocationRef = PgrQuarters;

  // ------------------------------------------------------------ state

  knowsFloodLineMiscalculated = false;
  willingToCoordinate = false;

  // ------------------------------------------------------------ actions

  readonly allActions = {
    censusInterview: action({
      label: "Census interview",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He answers quickly and gives himself, Zofia, and Staszek.",
        ],
        gives: { effects: (w) => { w.foreman.censusTaken = true; } },
      }),
    }),
    propertyAssessment: action({
      label: "Property assessment",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He says he owns nothing: he lives in PGR quarters and the farm is state land. He treats questions about land value as odd.",
        ],
        gives: {
          effects: (w) => {
            w.foreman.propertyRecorded = true;
            w.wojewoda.raiseMiscalculation("suspicious");
          },
        },
      }),
    }),
    askAboutTheArmedConflict: action({
      label: "Ask about the armed conflict",
      promptedBy: [clues.OldWartimePositions],
      cost: [],
      narrative: new Narrative({
        narration: [
          "No secret to him. He lays out the war years plainly: the whole range was cleared in '47 under Akcja Wisła, the people loaded up and sent west, and the partisans left old dugouts scattered through the forest, more than one, up in the hills. He does not know the bunkers from the inside, but he knows they are out there.",
        ],
        gives: { clues: [clues.UpaBunkersInTheArea, clues.OldVillageResettledDuringVistula] },
      }),
    }),
    talkToHimAboutTheFlood: action({
      label: "Talk to him about the flood",
      promptedBy: [clues.CommitteeRunsGeographicalSurvey],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Michał describes drainage ditches, sandbags, and water diversion as practical flood defences. He lays out the valley plainly: when the reservoir rises the water can only leave three ways, through the ridge gap, down his irrigation ditch, or over the far-ridge streambed. When the ditch comes up he is blunt: it is concrete only for a short run near the fields, an unlined dugout the rest of the way, and it will not carry a flood off.",
        ],
        gives: {
          clues: [clues.DitchIsCandidateDrain],
          effects: (w) => { w.foreman.willingToCoordinate = true; },
        },
      }),
    }),
    tellHimTheFloodLineMayBeWrong: action({
      label: "Tell him the flood line may be wrong",
      cost: [],
      narrative: new Narrative({
        narration: [
          "Michał goes still, then drops the reassurances. He admits the ditch is concrete only for a short run near the fields and an unlined dugout the rest of the way, and that it will not carry a flood off.",
        ],
        gives: {
          clues: [clues.DitchNotBuiltToSpec],
          effects: (w) => { w.foreman.knowsFloodLineMiscalculated = true; },
        },
      }),
    }),
    askHisOpinionOnTheDrainRoutes: action({
      label: "Ask his opinion on the drain routes",
      requires: [
        new Requirement("He still believes the village is safe.", { when: (w) => w.foreman.knowsFloodLineMiscalculated }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "With nothing left to protect, Michał walks the outlets from memory. He names the landslide sitting in the ridge gap, though he cannot say whether it seals the notch fully or leaks.",
        ],
        gives: { clues: [clues.LandslideInTheGap] },
      }),
    }),
    askWhereTheSurveyorsHaveAlreadyBeen: action({
      label: "Ask where the surveyors have already been",
      requires: [
        new Requirement("He isn't working with you on the flood.", { when: (w) => w.foreman.willingToCoordinate }),
      ],
      promptedBy: [clues.StreambedIsCandidateDrain],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Michał remembers the Solina dam survey crews working the valley years back. They set benchmark markers across it, up at the far-ridge streambed col and down by the village among them. \"If it's the streambed's height you want, their marks are still out there.\"",
        ],
        gives: { clues: [clues.DamBuildersSurveyedStreambed] },
      }),
    }),
    bringHimToTheStreambed: action({
      label: "Bring him to the streambed",
      requires: [
        new Requirement("He isn't working with you on the flood.", { when: (w) => w.foreman.willingToCoordinate }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Michał comes up to the far ridge and works alongside the committee. He can join only one of the two streambed scenes, not both, and he sticks with whichever the party runs first. In Surveying the Streambed he counts as an assisting hand: hauling the level, holding the staff, recording. Cuts the level-line cost by 1 card (floor 3), same as a helping PC. In Search for the Benchmarks he searches one site himself: he watched the dam crews work and remembers roughly where they drove the markers, clearing that site for 2 cards instead of 4.",
        ],
        gives: {
          effects: todoEffect("World state change: Pytlak joins one streambed scene as a helper (survey assist or one search site), never both."),
        },
      }),
    }),
    showHimTheStreambedFigures: action({
      label: "Show him the streambed figures",
      requires: [
        new Requirement("You have no streambed figures.", { clues: [clues.StreambedParameters] }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Michał reads the two elevations without hesitation. He has worked this valley for years, and a col standing above house level tells him at once that the water tops the village long before it reaches the streambed. He confirms the streambed is no outlet.",
        ],
        gives: { clues: [clues.StreambedDeadEnds] },
      }),
    }),
    borrowTheAnchorAndHammer: action({
      label: "Borrow the anchor and hammer",
      requires: [
        new Requirement("He won't lend farm gear to you.", {
          when: (w, me) => w.foreman.willingToCoordinate || w.foreman.bonded.of(me) || me.has(Speech),
        }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Michał hands over the steel clamp and driving hammer from the farm's gear, on the understanding it comes back. Cooperative or bonded, he lends it without a second thought; otherwise a convincing enough story pries it out of a wary man.",
        ],
        gives: { items: [Anchor] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theDitchShamesHim: opportunity({
      label: "The ditch shames him",
      target: { skills: [Empathy], clues: [clues.DitchIsCandidateDrain] },
      narrative: new Narrative({
        narration: [
          "As Michał talks up his irrigation ditch, his voice tightens and he will not hold your eye on it. He does not believe his own reassurance: the concrete runs only a short way and he knows it.",
        ],
        gives: { clues: [clues.DitchNotBuiltToSpec] },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }

  override get opportunities() {
    return this.allOpportunities;
  }

  // ------------------------------------------------------------ bond / grudge

  bond: Checks = [
    "Help with physical labor in flood preparations",
    "Show practical engineering or farming knowledge",
    "Don't mention the silo or Mazur in two meetings",
  ];

  grudge: Checks = [
    "Ask directly about the silo or Mazur's death",
    "Threaten PGR workers with exposure",
    "Refuse to help during the flood crisis",
  ];
}
