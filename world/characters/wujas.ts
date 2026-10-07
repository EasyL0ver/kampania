import { Character, CharacterDescription, Narrative, PerPlayer, Requirement, action, anyone, opportunity } from "../schema.ts";
import type { Checks, LocationRef } from "../schema.ts";
import { Chainsmoker, Empathy } from "../skills.ts";
import BimberStill from "../locations/bimber-still.ts";
import Penicillin from "../items/penicillin.ts";
import WujasCracks from "../events/wujas-cracks.ts";
import Butcher from "./butcher.ts";
import * as clues from "../clues.ts";

export default class Wujas extends Character {
  readonly id = "wujas";
  readonly name = "Tadek Gajda";
  readonly description = new CharacterDescription({
    narration: ["Tadek Gajda, the sołtys's brother and the village drunk, rarely without a bottle."],
    clothes: "Checked shirt with rolled sleeves, old marynarka with elbow patches, maciejówka cap cocked forward.",
    hairAndFace: "Still handsome under the wear; unshaven, bloodshot eyes visible up close.",
    carriage: "Lean and rangy; moves loose and easy, like he is still the life of the party.",
    gives: { aware: [Wujas] },
  });

  // ------------------------------------------------------------ shared state (A pass)

  // NPC knowledge
  knowsCommitteeRunsSurvey = false;
  readonly role = "sibling (brother)";
  // TODO: "Bimber still area / drifts between siblings' homes" — chose the still.
  livesAt: LocationRef = BimberStill;

  // ------------------------------------------------------------ state

  // Mechanic "Drinking Buddy": one full, non-judgemental drinking session makes
  // a PC a buddy for the rest of the game. Not exclusive, never lost.
  // TODO: set by "Drink with the crew" (the-store) and drinking at dinner — those
  // files must set w.wujas.drinkingBuddy.set(me, true).
  drinkingBuddy = new PerPlayer(false);

  // Set by the first bimber-play leverage visit: Tadek owes the players and
  // will keep talking if they return.
  owesPlayers = false;

  // ------------------------------------------------------------ actions

  readonly allActions = {
    getShitfacedWithTadek: action({
      label: "Get shitfaced with Tadek",
      requires: [
        new Requirement("He doesn't drink like that with you.", { when: (w, me) => w.wujas.drinkingBuddy.of(me) }),
      ],
      cost: [{ time: 2 }, { composure: 1 }],
      narrative: new Narrative({
        narration: [
          "The committee drinks Tadek past the point of guard. He gets loud, then maudlin, and grief for a woman he won't name slips out before he can catch it.",
        ],
        gives: { clues: [clues.WujasMissesSomeone] },
      }),
    }),
    askAboutTheButcher: action({
      label: "Ask about the butcher",
      requires: [
        new Requirement("He doesn't drink like that with you.", { when: (w, me) => w.wujas.drinkingBuddy.of(me) }),
      ],
      promptedBy: [Butcher],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Loose with drink, Tadek remembers Rezeń sitting in on the crew's sessions years back, bottle in hand like any of them. Then one day he just stopped, and never came back to the fire.",
        ],
        gives: { clues: [clues.ButcherUsedToDrinkWithTheCrew] },
      }),
    }),
    censusInterview: action({
      label: "Census interview",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He gives his name and age, reaches for the bottle, and tries to end the questions quickly.",
        ],
        gives: { effects: (w) => { w.wujas.censusTaken = true; } },
      }),
    }),
    propertyAssessment: action({
      label: "Property assessment",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He says he owns nothing and drifts between siblings' kitchens and the still.",
        ],
        gives: { effects: (w) => { w.wujas.propertyRecorded = true; } },
      }),
    }),
    getPawelekThePenicillin: action({
      label: "Get Pawełek the penicillin",
      promptedBy: [clues.PawelekNeedsPenicillin, clues.WujasIsPaweleksFather],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Faced with the sick boy being his own, Tadek goes to his sister Helena. She opens the cabinet for her brother and counts out a child's course, and no census changes hands.",
        ],
        gives: { items: [Penicillin] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    smokingWhileDrinking: opportunity({
      label: "Smoking while drinking",
      // Drinking at the still or the store; where he is isn't modelled.
      trigger: (w) => w.wujas.drunk,
      target: { skills: [Chainsmoker] },
      promptedBy: [Wujas],
      narrative: new Narrative({
        narration: [
          "With a bottle in hand he chain-smokes. A smoker reads the brand: the cheapest Sport, never Carmen.",
        ],
        gives: { clues: [clues.TadekSmokesCheapest] },
      }),
    }),
    censusNerves: opportunity({
      label: "Census nerves",
      trigger: (w) => w.wujas.allActions.censusInterview.done,
      target: { skills: [Empathy] },
      narrative: new Narrative({
        narration: [
          "He is not nervous about the census; he is nervous about being asked anything at all.",
        ],
        gives: { clues: [clues.WujasIsGuilty] },
      }),
    }),
    drunkCensusPerformance: opportunity({
      label: "Drunk census performance",
      trigger: (w) => w.wujas.allActions.censusInterview.done && w.wujas.drunk,
      target: anyone,
      narrative: new Narrative({
        narration: [
          "He turns the answers into absurd village theatre.",
        ],
      }),
    }),
    drunkPropertyPerformance: opportunity({
      label: "Drunk property performance",
      trigger: (w) => w.wujas.allActions.propertyAssessment.done && w.wujas.drunk,
      target: anyone,
      narrative: new Narrative({
        narration: [
          "He claims a fake grand estate made of the still, his brother's house, and moonlight.",
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

  // ------------------------------------------------------------ bond / grudge

  bond: Checks = [
    "Share a drink with him and match his pace",
    "Ask about his youth or his music",
    "Encounter his still and say nothing to anyone",
  ];

  grudge: Checks = [
    "Pour out his bottle, cut him off, or refuse to let him drink",
    "Moralise at him about the drinking",
    "Pull rank on him — threaten him with the committee's authority",
  ];
}
