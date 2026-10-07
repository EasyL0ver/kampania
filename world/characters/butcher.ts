import { Character, CharacterDescription, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { Checks, LocationRef } from "../schema.ts";
import { Chainsmoker } from "../skills.ts";
import CarmenPack from "../items/carmen-pack.ts";
import BimberBottle from "../items/bimber-bottle.ts";
import VodkaBottle from "../items/vodka-bottle.ts";
import * as clues from "../clues.ts";
import { todo } from "../todo.ts";
import ButchersHouse from "../locations/butchers-house.ts";
import CigaretteButtsFromCiotkas from "../items/cigarette-butts-from-ciotkas.ts";

export default class Butcher extends Character {
  readonly id = "butcher";
  readonly name = "Stanisław Rezeń";
  readonly description = new CharacterDescription({
    narration: ["Stanisław Rezeń, the village butcher and widely avoided pariah, lives alone beyond the treeline with his dogs."],
    clothes: "Clean pressed shirt, good boots, cologne; sharper dress than the village norm",
    hairAndFace: "Dark hair slicked back with lard; weathered red-brown face, wide smile, pale grey eyes",
    carriage: "Broad-shouldered, stands too close, takes up too much space. Voice: Warm baritone pitched for an audience; loud laughter that can stop without warning",
    gives: { aware: [Butcher] },
  });

  // ------------------------------------------------------------ shared state (A pass)

  knowsCommitteeMovements = false;
  knowsPlayersFaces = false;
  escalated = false;
  hostileAboutWell = false;
  readonly role = "village pariah, compulsion killer";
  livesAt: LocationRef = ButchersHouse;

  // ------------------------------------------------------------ actions

  readonly allActions = {
    censusInterview: action({
      label: "Census interview",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He gives his name and age, then turns questions back on the interviewer with a grin.",
        ],
        gives: { effects: (w) => { w.butcher.censusTaken = true; } },
      }),
    }),
    propertyAssessment: action({
      label: "Property assessment",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He refuses assessment and tells the committee to mind the dogs. If pushed, the dogs stand up.",
        ],
        gives: { effects: (w) => { w.butcher.propertyRecorded = true; } },
      }),
    }),
    offerHimACarmen: action({
      label: "Offer him a Carmen",
      requires: [new Requirement("You have no Carmen to offer.", { items: [CarmenPack] })],
      cost: [],
      narrative: new Narrative({
        narration: [
          "He waves your pack away with a grin and lights one of his own Carmen, or takes yours as his brand, and makes a small show of it either way. Offer him a cheap Sport instead and you learn nothing: he just refuses it, he does not smoke that.",
        ],
        gives: { clues: [clues.ButcherSmokesCarmen] },
      }),
    }),
    offerHimADrink: action({
      label: "Offer him a drink",
      requires: [new Requirement("You have nothing to offer him.", { when: (_w, me) => me.holds(VodkaBottle) || me.holds(BimberBottle) })],
      cost: [],
      narrative: new Narrative({
        narration: [
          "He waves the bottle off without a second look, no grin, no banter, just a flat refusal. He does not drink, and he does not explain it.",
        ],
        gives: { clues: [clues.ButcherDoesntDrink] },
      }),
    }),
    askAboutEdekSmoking: action({
      label: "Ask about Edek smoking",
      promptedBy: [clues.EdekHasCarmenCigarette],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He laughs it off, warm and easy: the boy does not smoke, cannot even drag on one without coughing himself sick. He gave Edek a Carmen anyway, a boy has got to learn, and he talks about the lad like a fond nephew without ever noticing anything wrong in it.",
        ],
        gives: { clues: [clues.RezenGaveEdekCigarette] },
      }),
    }),
    askAboutTheCarmenCigarette: action({
      label: "Ask about the Carmen cigarette at Edek's",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "No dodge, no worry. He shrugs and admits he gave the boy one, a boy has got to learn. He talks about Edek warmly, like a nephew, and never once notices anything wrong with the fondness. He does not care that it places him near the door.",
        ],
        gives: { clues: [clues.RezenGaveEdekCigarette] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    alwaysSmoking: opportunity({
      label: "Always smoking",
      target: { skills: [Chainsmoker] },
      narrative: new Narrative({
        narration: [
          "Rezeń has a cigarette going almost every time you meet him. A smoker reads the brand at a glance: Carmen.",
        ],
        gives: { clues: [clues.ButcherSmokesCarmen] },
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
    "Watch him work and acknowledge his skill",
    "Ask for practical help without moralizing",
    "Stand your ground when he tests you",
  ];

  grudge: Checks = [
    "Show visible fear or revulsion",
    "Snoop around his property or ask neighbors",
    "Threaten him or invoke the law",
  ];
}
