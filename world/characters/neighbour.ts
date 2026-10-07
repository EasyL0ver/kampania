import { Character, CharacterDescription, Narrative, Requirement, SkillRequirement, action } from "../schema.ts";
import type { Checks, LocationRef } from "../schema.ts";
import { Empathy, Speech } from "../skills.ts";
import NeighboursHouse from "../locations/neighbours-house.ts";
import Jagna from "./jagna.ts";
import Soldier from "./soldier.ts";
import * as clues from "../clues.ts";

export default class Neighbour extends Character {
  readonly id = "neighbour";
  readonly name = "Ryszard Dudka";
  readonly description = new CharacterDescription({
    narration: ["Ryszard Dudka, a quiet farmer and licensed hunter, lives next door to Janina Gajda."],
    clothes: "Wool trousers held up by braces, flannel shirt with sleeves rolled in summer, heavy boots — same outfit every day",
    hairAndFace: "Flat cap he rarely removes; pale blue eyes, strong jaw, three-day stubble that never becomes a beard",
    carriage: "Lean hunter's build, quiet even indoors; shoulders slightly forward, watches hands and posture more than faces",
    gives: { aware: [Neighbour] },
  });

  // ------------------------------------------------------------ shared state (A pass)

  // NPC knowledge
  knowsOfficialInterest = false;
  readonly role = "bystander witness";
  livesAt: LocationRef = NeighboursHouse;

  // ------------------------------------------------------------ state

  // Mechanic "Humiliated": picked up if the hunters' clash runs its course and
  // Rezeń wins it (set by hunters-cross-paths); cleared by "Uplift Ryszard".
  humiliated = false;

  // Mechanic "Lynch Targets": running score per target; the highest when he
  // snaps is who he goes after. Starting scores from the Markdown.
  // TODO: mechanic "Lynch Targets" score changes (clue / player-deed table) and
  // "Vigilante Targeting" (clues leaking via Barbara) not modelled yet
  // (see prose/characters/neighbour.md). Only the starting scores are typed.
  lynchScoreRezen = 2;
  lynchScorePlayers = 1;
  lynchScoreZbigniew = 1;
  lynchScoreTadek = 0;
  lynchScoreHelena = 0;
  lynchScoreHag = 0;

  // ------------------------------------------------------------ actions

  readonly allActions = {
    censusInterview: action({
      label: "Census interview",
      promptedBy: [Neighbour],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He starts hostile to government people in his home, then cooperates with clipped answers. The household record notes the licensed hunting rifle on the wall.",
        ],
        gives: {
          clues: [clues.NeighbourHasRifle],
          effects: (w) => { w.neighbour.censusTaken = true; },
        },
      }),
    }),
    propertyAssessment: action({
      label: "Property assessment",
      promptedBy: [Neighbour],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He identifies his house and plot next to Janina's. His papers are in order and his answers stay clipped — the record shows he has held the plot since ~1948.",
        ],
        gives: {
          clues: [clues.NeighbourIsOldSettler],
          effects: (w) => { w.neighbour.propertyRecorded = true; },
        },
      }),
    }),
    askAboutTheTeenageGirl: action({
      label: "Ask about the teenage girl",
      promptedBy: [clues.DressBelongedToTeenageGirl],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Asked about the girl who lived with the Barnaś family, he confirms they had a teenage daughter, names her Hania, and claims she left with her father years back.",
        ],
        gives: { clues: [clues.BarnasHadADaughterHania], aware: [Jagna] },
      }),
    }),
    askAboutOldBarnas: action({
      label: "Ask about old Barnaś",
      promptedBy: [Soldier],
      cost: [],
      narrative: new Narrative({
        narration: [
          "He knew the man from the first day, next fence over, and says it flat and without warmth: Barnaś was a soldier, KBW, came into the valley with the resettlement in '47 and never left. He has no good word for him.",
        ],
        gives: { clues: [clues.SoldierWasKbw, clues.SoldierServedInAkcjaWisla] },
      }),
    }),
    askAboutCiotkasVisitors: action({
      label: "Ask about Ciotka's visitors",
      requires: [new Requirement("He doesn't like you enough to say.", { when: (w, me) => w.neighbour.bonded.of(me) })],
      promptedBy: [clues.CiotkaHadAVisitor],
      cost: [],
      narrative: new Narrative({
        narration: [
          "He says the day before she died, the Wojewoda's boy came and the two of them fought. He heard the raised voices carry over the fence.",
        ],
        gives: { clues: [clues.JuniorPressedCiotka] },
      }),
    }),
    upliftRyszard: action({
      label: "Uplift Ryszard",
      requires: [
        new Requirement("He has nothing to be lifted from.", { when: (w) => w.neighbour.humiliated }),
        new SkillRequirement(Empathy, Speech),
      ],
      cost: [],
      narrative: new Narrative({
        narration: [
          "The player puts the steel back in him and gives him his face back.",
        ],
        gives: {
          effects: (w) => {
            w.neighbour.humiliated = false;
          },
        },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }

  // ------------------------------------------------------------ bond / grudge

  bond: Checks = [
    "Treat Barbara and Pawełek as people, not sources",
    "Meet his 1954 guilt without contempt",
    "Stand with him against Rezeń",
  ];

  grudge: Checks = [
    "Side with Rezeń or humiliate him",
    "Endanger or use Barbara or Pawełek",
    "Treat him as a 1954 suspect",
  ];
}
