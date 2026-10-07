import { Character, CharacterDescription, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { Checks, LocationRef } from "../schema.ts";
import { Chainsmoker } from "../skills.ts";
import CarmenPack from "../items/carmen-pack.ts";
import * as clues from "../clues.ts";
import WojewodasHouse from "../locations/wojewodas-house.ts";

export default class Junior extends Character {
  readonly id = "junior";
  readonly name = "Marek Gajda";
  readonly description = new CharacterDescription({
    narration: ["Marek Gajda, the sołtys's hot-tempered young son."],
    clothes: "Newer leather jacket over a dark turtleneck, scuffed boots, jeans when he can get them.",
    hairAndFace: "Dark hair grown longer than the village approves of, swept back with Brylcreem; sharp jaw, father's hard eyes.",
    carriage: "Lean, wiry, unable to sit still; shifts weight, drums fingers, cracks knuckles.",
    gives: { aware: [Junior] },
  });

  readonly role = "sołtys's son, false suspect";
  livesAt: LocationRef = WojewodasHouse;

  // ------------------------------------------------------------ state

  // drinking with the crew at the store
  drinking = false;

  // ------------------------------------------------------------ actions

  readonly allActions = {
    offerHimACarmen: action({
      label: "Offer him a Carmen",
      requires: [new Requirement("You have no Carmen to offer.", { items: [CarmenPack] })],
      cost: [],
      narrative: new Narrative({
        narration: [
          "He takes it as his own, the one thing he spends on to feel above the place. Offer him a cheap Sport and he waves it off: that is not what he smokes, and you learn nothing.",
        ],
        gives: { clues: [clues.JuniorSmokesCarmen] },
      }),
    }),
    censusInterview: action({
      label: "Census interview",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He gives his name and age, and treats the interview like a joke. He answers for himself only.",
        ],
        gives: { effects: (w) => { w.junior.censusTaken = true; } },
      }),
    }),
    propertyAssessment: action({
      label: "Property assessment",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He says he owns nothing and lives under his father's roof. He waves the question off.",
        ],
        gives: { effects: (w) => { w.junior.propertyRecorded = true; } },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    smokingWithTheCrew: opportunity({
      label: "Smoking with the crew",
      trigger: (w) => w.junior.drinking,
      target: { skills: [Chainsmoker] },
      narrative: new Narrative({
        narration: [
          "Away from his father, drinking with the crew, Junior lights up. A smoker reads the brand: Carmen.",
        ],
        gives: { clues: [clues.JuniorSmokesCarmen] },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }

  override get opportunities() {
    return this.allOpportunities;
  }

  // ------------------------------------------------------------ bond

  bond: Checks = [
    "Talk to him about life in the city",
    "Ask his opinion and wait for the full answer",
    "Offer him something from outside",
  ];
}
