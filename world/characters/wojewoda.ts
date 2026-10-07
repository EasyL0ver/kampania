import { Character, CharacterDescription, Narrative, Requirement, action, anyone, opportunity } from "../schema.ts";
import type { Checks, LocationRef } from "../schema.ts";
import WojewodasHouse from "../locations/wojewodas-house.ts";
import OldVillageRuins from "../locations/old-village-ruins.ts";
import BimberStill from "../locations/bimber-still.ts";
import BarnasDepartureDeclaration from "../items/barnas-departure-declaration.ts";
import TheDisclosure from "../events/the-disclosure.ts";
import Ciotka from "./ciotka.ts";
import Foreman from "./foreman.ts";
import Neighbour from "./neighbour.ts";
import Painter from "./painter.ts";
import Wife from "./wife.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";

export type Miscalculation = "unaware" | "suspicious" | "needProof" | "convinced";

export default class Wojewoda extends Character {
  readonly id = "wojewoda";
  readonly name = "Zbigniew Gajda";
  readonly description = new CharacterDescription({
    narration: ["Zbigniew Gajda, the village sołtys and principal official, received at his house or office."],
    clothes: "Pressed trousers, polished shoes, wool vest over white shirt even in summer.",
    hairAndFace: "Thinning grey-black hair combed straight back with water; thick grey moustache neatly trimmed; heavy brows over sharp dark eyes.",
    carriage: "Stocky and barrel-chested; feet planted, hands behind his back, taking space deliberately.",
    gives: { aware: [Wojewoda] },
  });

  // ------------------------------------------------------------ shared state (A pass)

  // NPC knowledge
  readonly role = "sibling (brother) / sołtys";
  livesAt: LocationRef = WojewodasHouse;

  // ------------------------------------------------------------ state

  // Mechanic "Braced": only if Irena learns the truth and sides with him
  // (irena-confronts-wojewoda should set it).
  braced = false;
  // What he knows of the flood-line miscalculation (never goes back down):
  // warned at Arrival, asked about property records, or told of the property
  // census → suspicious; told the line may be wrong → needProof; shown the
  // geological proof → convinced.
  awareOfMiscalculation: Miscalculation = "unaware";

  // Move him up the ladder; he never goes back down.
  raiseMiscalculation(to: Miscalculation): void {
    const ladder: Miscalculation[] = ["unaware", "suspicious", "needProof", "convinced"];
    this.awareOfMiscalculation = ladder[Math.max(ladder.indexOf(this.awareOfMiscalculation), ladder.indexOf(to))];
  }
  // He has made his private ask of the committee (Wojewoda's Ask).
  sharedHisAsk = false;

  // ------------------------------------------------------------ actions

  readonly allActions = {
    censusInterview: action({
      label: "Census interview",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He gives the whole household's details himself.",
        ],
        gives: { effects: (w) => { w.wojewoda.censusTaken = true; } },
      }),
    }),
    askForTheVillageHouseholdRoster: action({
      label: "Ask for the village household roster",
      promptedBy: [clues.CommitteeFillsCensus],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "As the committee's point of contact, he runs down who lives where. Among the households he names his sister Janina Gajda, the widow who keeps the best house at the edge of the village and cares for the boy, living apart from the rest. He also names Ryszard Dudka, the neighbour whose house sits between Janina's and Barbara's, and the Rzepka household, where Emil Rzepka, the local painter, lives with his wife.",
        ],
        gives: { aware: [Ciotka, Neighbour, Painter] },
      }),
    }),
    propertyAssessment: action({
      label: "Property assessment",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He names his house and land and says the papers are in order.",
        ],
        gives: {
          effects: (w) => {
            w.wojewoda.propertyRecorded = true;
            w.wojewoda.raiseMiscalculation("suspicious");
          },
        },
      }),
    }),
    tellHimYoureAssessingProperty: action({
      label: "Tell him you're assessing property",
      cost: [],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { effects: (w) => { w.wojewoda.raiseMiscalculation("suspicious"); } },
      }),
    }),
    askForTheMaps: action({
      label: "Ask for the maps",
      requires: [
        new Requirement("He hasn't seen your flood proof.", {
          when: (w) => w.wojewoda.awareOfMiscalculation === "convinced",
        }),
      ],
      cost: [],
      // TODO: the maps are not an item file yet.
      narrative: new Narrative({
        narration: [
          "He hands over the maps because saving the village matters more than hiding the old terrain.",
        ],
        gives: { effects: todoEffect("Item: maps useful for survey and old village navigation.") },
      }),
    }),
    tellWithGeologicalProof: action({
      label: "Tell with geological proof",
      requires: [
        new Requirement("You have no survey results yet.", {
          when: todo("Players have completed survey at the village outskirts / field measurements"),
        }),
      ],
      cost: [],
      narrative: new Narrative({
        narration: [
          "He believes it, loses his temper, then pulls himself back into command.",
        ],
        gives: {
          // TODO: also "NPC State Change: Zbigniew becomes an urgent partner | World State Change: the census accelerates | Michał Pytlak receives the flood-defense order"
          effects: (w) => { w.wojewoda.raiseMiscalculation("convinced"); },
        },
      }),
    }),
    tellHimAboutTheFloodRisk: action({
      label: "Tell him about the flood risk",
      requires: [
        new Requirement("You have no reason to doubt the flood line.", {
          clues: [clues.TheFloodLinePotentiallyMiscalculated],
        }),
      ],
      cost: [],
      narrative: new Narrative({
        narration: [
          "The committee raises the risk without proof: the flood line may be wrong, the valley may not drain. Zbigniew does not need convincing to act careful. He immediately calls for Michał Pytlak and, telling him the warning, orders him to put the farm, his men, and himself at the committee's disposal.",
        ],
        gives: {
          effects: (w) => {
            w.foreman.knowsFloodLineMiscalculated = true;
            w.wojewoda.raiseMiscalculation("needProof");
          },
        },
      }),
    }),
    convinceHimToRevealTheFlood: action({
      label: "Convince him to reveal the flood",
      requires: [
        new Requirement("He hasn't seen your flood proof.", {
          when: (w) => w.wojewoda.awareOfMiscalculation === "convinced",
        }),
        new Requirement("You have no way out to offer him.", {
          when: todo("a way out such as an evacuation plan, army rescue, or the phone line cracked"),
        }),
        new Requirement("Zbigniew doesn't trust you enough.", { when: (w, me) => w.wojewoda.bonded.of(me) }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The players give him a version of disclosure he can lead: public alarm with a plan. He decides the village must be told by him.",
        ],
        gives: {
          aware: [TheDisclosure],
          effects: (w) => {
            w.theDisclosure.form = "called";
          },
        },
      }),
    }),
    forceTheDisclosure: action({
      label: "Force the disclosure — the ultimatum",
      requires: [new Requirement("You have no flood proof.", { when: todo("Players hold the flood proof") })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "They corner him with proof and a public threat. He agrees to disclose the flood on his own terms.",
        ],
        gives: {
          aware: [TheDisclosure],
          effects: (w, me) => {
            w.theDisclosure.form = "called";
            w.wojewoda.grudgeHeld.set(me, true);
          },
        },
      }),
    }),
    askAboutTheOldVillage: action({
      label: "Ask about the old village",
      promptedBy: [OldVillageRuins],
      cost: [],
      narrative: new Narrative({
        narration: [
          "He treats it as nothing worth the committee's time: there was a village up the valley once, cleared out in '47 with the rest of the range, Akcja Wisła, the people sent west. Old history, he says, no bearing on the flood or the census. He does not guard it; he just does not see why they care.",
        ],
        gives: { clues: [clues.OldVillageResettledDuringVistula] },
      }),
    }),
    askAboutBarbarasHouse: action({
      label: "Ask about Barbara's house",
      requires: [new Requirement("He hasn't made his ask yet.", { when: (w) => w.wojewoda.sharedHisAsk })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He says the house is the farm's on paper, built with PGR brick and labour for a young mother with no one to lean on.",
        ],
        gives: { clues: [clues.BarbaraHasHelp] },
      }),
    }),
    askAboutJaninasHouse: action({
      label: "Ask about Janina's house",
      requires: [new Requirement("He hasn't made his ask yet.", { when: (w) => w.wojewoda.sharedHisAsk })],
      promptedBy: [clues.CiotkaHouseIsWojewodas],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He says the house was abandoned, left to the state, and administered by the farm; he put Janina in it because she keeps the boy and the place.",
        ],
        gives: { clues: [clues.CiotkaHouseIsPgrs] },
      }),
    }),
    showThePaperworkForJaninasHouse: action({
      label: "Show the paperwork for Janina's house",
      promptedBy: [clues.HouseBelongedToEdwardSenior, clues.CiotkaHouseIsPgrs],
      requires: [
        new Requirement("He hasn't made his ask yet.", { when: (w) => w.wojewoda.sharedHisAsk }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He produces the file and lets them read the 1954 declaration with Edward Barnaś's signature. He keeps the document in his hands; see Edward Barnaś's Departure Declaration.",
        ],
        gives: {
          clues: [clues.SoldierLeftHisHouseForState, clues.CiotkaMovedInAfterTheyWereGone],
          aware: [BarnasDepartureDeclaration],
        },
      }),
    }),
    reportTheBimberStill: action({
      label: "Report the bimber still",
      promptedBy: [BimberStill],
      cost: [],
      narrative: new Narrative({
        narration: [
          "He says he will handle it and shows no surprise.",
        ],
        gives: { clues: [clues.BimberStill] },
      }),
    }),
    confrontHimAboutMazursPension: action({
      label: "Confront him about Mazur's pension",
      promptedBy: [clues.MazurDeathCoveredUp],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He goes still and quiet, then does not deny it. In his mind there is nothing to deny: a man died on the farm, the state would have cut his widow off, so he kept the wage flowing and called it a pension. He lays it out as order and mercy, not crime, and names it as his decision and Michał's doing. He warns that filing it destroys Wanda for nothing.",
        ],
        gives: {
          effects: todoEffect("NPC State Change: Zbigniew now knows the committee has the coverup and sets a grudge"),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    propertySuspicion: opportunity({
      label: "Property suspicion",
      // TODO: also "flood not disclosed and no convincing cover" — not modelled.
      trigger: (w) => w.wojewoda.allActions.propertyAssessment.done,
      target: anyone,
      narrative: new Narrative({
        narration: [
          "His questions turn controlled, and he starts tracking where the committee goes. See Tell Wojewoda about the flood risk.",
        ],
        gives: { clues: [clues.CommitteeHidesTheFlood] },
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
    "Acknowledge his burden openly",
    "Solve a practical problem for him without being asked",
    "Ask his advice on how to approach a villager",
  ];

  grudge: Checks = [
    "Challenge his authority in front of another villager",
    "Go to a villager with questions after he told you not to",
    "Ask about or threaten his family's involvement in the old violence",
  ];
}
