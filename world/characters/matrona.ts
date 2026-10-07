import { Character, CharacterDescription, Narrative, Requirement, action, opportunity } from "../schema.ts";
import { todoEffect } from "../todo.ts";
import { Finesse } from "../skills.ts";
import type { Checks, LocationRef } from "../schema.ts";
import MatronasHouse from "../locations/matronas-house.ts";
import Census from "../items/census.ts";
import Penicillin from "../items/penicillin.ts";
import * as clues from "../clues.ts";
import Ciotka from "./ciotka.ts";

export default class Matrona extends Character {
  readonly id = "matrona";
  readonly name = "Helena Rzepka (née Gajda)";
  readonly description = new CharacterDescription({
    narration: ["Helena Rzepka, the devout woman who manages the village store."],
    clothes: "Immaculate dark clothes — cardigan buttoned to the throat, always an apron, small crucifix at her collar.",
    hairAndFace: "Dark hair pinned tight beneath a headscarf; thin lips, pale grey unblinking eyes.",
    carriage: "Tall, straight-backed, and economical; hands busy with rosary, knitting, or wiping something already clean.",
    gives: { aware: [Matrona] },
  });

  // ------------------------------------------------------------ shared state (A pass)

  // NPC knowledge
  knowsPawelekNeedsPenicillin = false;
  knowsStoreBrokenInto = false;
  knowsPenicillinStolen = false;
  knowsMoneyStolen = false;
  knowsCommitteeStolePenicillin = false;
  stoppedQuietSolution = false;
  readonly role = "sibling (sister) / true architect of the lynch";
  livesAt: LocationRef = MatronasHouse;

  // ------------------------------------------------------------ state

  // Set by "Agree to her terms": the committee lost the census register and
  // Helena fills it herself.
  fillsCensus = false;

  // TODO: mechanic "Grace ending node" not modelled yet (see prose/characters/matrona.md)
  // TODO: mechanic "Forged paper thread" not modelled yet (see prose/characters/matrona.md)

  // ------------------------------------------------------------ actions

  readonly allActions = {
    censusInterview: action({
      label: "Census interview",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She gives herself, Emil, and the two children before the question is finished.",
        ],
        gives: { effects: (w) => { w.matrona.censusTaken = true; } },
      }),
    }),
    propertyAssessment: action({
      label: "Property assessment",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She names the house and the store she runs, with papers in order.",
        ],
        gives: { effects: (w) => { w.matrona.propertyRecorded = true; } },
      }),
    }),
    askForThePenicillin: action({
      label: "Ask for the penicillin",
      promptedBy: [clues.PawelekNeedsPenicillin],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She holds the only cabinet key and will not turn it for nothing. The penicillin is theirs, she says, on one condition: the committee lets her fill the village census in their stead, a kindness to spare busy officials the walking. She will not open the cabinet until they agree. Word of the sick child and what he needs reaches her sister Janina.",
        ],
        gives: {
          clues: [clues.HelenaDemandsTheCensus],
          effects: (w) => {
            w.matrona.knowsPawelekNeedsPenicillin = true;
            w.ciotka.knowsPawelekNeedsPenicillin = true;
          },
        },
      }),
    }),
    agreeToHerTerms: action({
      label: "Agree to her terms",
      requires: [new Requirement("She hasn't named her price yet.", { clues: [clues.HelenaDemandsTheCensus] })],
      cost: [{ time: 1 }, { item: Census }],
      narrative: new Narrative({
        narration: [
          "They agree, and she turns the key. She counts out a child's course of penicillin and takes the census book from their hands: from now the count is hers to fill, hers to decide what it shows.",
        ],
        gives: {
          items: [Penicillin],
          effects: (w) => {
            w.matrona.fillsCensus = true;
          },
        },
      }),
    }),
    confrontHelenaRzepka: action({
      label: "Confront Helena Rzepka",
      promptedBy: [Matrona],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: {
          effects: todoEffect(
            "NPC State Change: Helena recognizes the committee is testing the 1954 story and increases pressure on Emil",
          ),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    helenasPerformance: opportunity({
      label: "Helena's performance",
      target: { skills: [Finesse] },
      promptedBy: [Matrona],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { clues: [clues.MatronaControlsPainter] },
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
    "Accept her tea and her framing of events without contradiction",
    "Compliment her household, her faith, or her role in the community",
    "Ask her to introduce you to someone — let her be the gatekeeper",
  ];

  grudge: Checks = [
    "Contradict her version of events in front of another villager",
    "Show disrespect in her home",
    "Ask directly about the Rzepka family's role in the old violence",
  ];
}
