import { Character, CharacterDescription, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { Checks, LocationRef } from "../schema.ts";
import { Bureaucracy, Empathy, Finesse, Speech, Violence } from "../skills.ts";
import * as clues from "../clues.ts";
import BarbarasHouse from "../locations/barbaras-house.ts";
import NewVillage from "../locations/new-village.ts";
import OldVillageRuins from "../locations/old-village-ruins.ts";
import GirlsDress from "../items/girls-dress.ts";

export default class Barbara extends Character {
  readonly id = "barbara";
  readonly name = "Barbara Kopacz";
  readonly description = new CharacterDescription({
    narration: ["Barbara Kopacz, a PGR worker and young mother, lives with her family in the red-brick house."],
    clothes: "Faded floral housedress, oversized man's cardigan, rubber boots caked in mud",
    hairAndFace: "Soft brown hair in a loose practical bun; round face, high Lemko cheekbones, warm brown eyes",
    carriage: "Leans in when she talks, touches arms, and fills space with unguarded warmth. Voice: Loud, friendly, and easy to overhear across the yard",
    gives: { aware: [Barbara] },
  });

  readonly role = "villager";
  livesAt: LocationRef = BarbarasHouse;

  // ------------------------------------------------------------ state (used by other entities)

  trustsCommittee = false;
  broken = false;
  acceptsHelenasTerms = false;

  // ------------------------------------------------------------ actions

  readonly allActions = {
    censusInterview: action({
      label: "Census interview",
      promptedBy: [clues.CommitteeFillsCensus],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Barbara gives her name, age, household members, and employment cheerfully. She will not name Pawełek Kopacz's father.",
        ],
        gives: {
          clues: [clues.BarbaraRefusesFather],
          effects: (w) => { w.barbara.censusTaken = true; },
        },
      }),
    }),
    pushAboutTheFather: action({
      label: "Push about the father",
      requires: [
        new Requirement("She won't budge without pressure.", {
          when: (_w, me) => me.has(Violence) || me.has(Bureaucracy) || (me.knows(clues.BarbaraHasHelp) && me.has(Speech)),
        }),
      ],
      promptedBy: [clues.BarbaraRefusesFather],
      cost: [],
      narrative: new Narrative({
        narration: [
          "She names Marek Gajda and begs the players not to write it down. If they record it, Zbigniew Gajda sees the census form.",
        ],
        gives: { clues: [clues.MarekIsPaweleksFather] },
      }),
    }),
    propertyAssessment: action({
      label: "Property assessment",
      promptedBy: [clues.CommitteeNotesPropertyForDamage],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She names the red-brick house and small plot as hers, with vague papers. Pressed on who built or pays for it, she goes quiet.",
        ],
        gives: {
          clues: [clues.BarbaraHasHelp],
          effects: (w) => { w.barbara.propertyRecorded = true; },
        },
      }),
    }),
    askAboutTheVillage: action({
      label: "Ask about the village",
      promptedBy: [NewVillage],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Barbara gives a generous social map: Zbigniew Gajda has the phone, the Gajda siblings keep the church supplied, Ryszard Dudka helps her, Michał Pytlak is busy, and the old village is not somewhere people go. Every answer comes with a friendly question back.",
        ],
        gives: { clues: [clues.WojewodaHasOnlyPhone, clues.SiblingsFundTheChurch] },
      }),
    }),
    askAboutTheOldVillage: action({
      label: "Ask about the old village",
      promptedBy: [OldVillageRuins],
      cost: [],
      narrative: new Narrative({
        narration: [
          "She lowers her voice. Nobody goes up to the old village, she says; it is a bad place, haunted, and folk keep well away, after dark most of all. She is passing on the village feeling, not anything she has seen herself.",
        ],
        gives: { clues: [clues.OldVillageIsHaunted] },
      }),
    }),
    askBarbaraAboutTheThreeBarredCross: action({
      label: "Ask Barbara about the three-barred cross",
      promptedBy: [clues.ThreeBarredCrossInBabciasRoom],
      cost: [],
      narrative: new Narrative({
        narration: [
          "She says the cross is her mother's and that it belongs to \"the old way.\" She cannot explain the theology or history.",
        ],
        gives: { clues: [clues.ThreeBarredCrossIsLemko, clues.BabciaIsLemko] },
      }),
    }),
    showBarbaraTheDress: action({
      label: "Show Barbara the dress",
      requires: [new Requirement("You don't have the dress.", { items: [GirlsDress] })],
      promptedBy: [clues.GirlsDressInCiotkasHouse],
      cost: [],
      narrative: new Narrative({
        narration: [
          "She takes it, turns it over, and knows the cut at once: this was made for a teenage girl, not a grown woman and not a child.",
        ],
        gives: { clues: [clues.DressBelongedToTeenageGirl] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theMissingFatherMatters: opportunity({
      label: "The missing father matters",
      trigger: (w) => w.barbara.allActions.censusInterview.done,
      target: { skills: [Empathy] },
      narrative: new Narrative({
        narration: [
          "Her warmth stays in place, but her jaw sets and she waits for the question to pass.",
        ],
      }),
    }),
    theCensusOmissionIsFormal: opportunity({
      label: "The census omission is formal",
      trigger: (w) => w.barbara.allActions.censusInterview.done,
      target: { skills: [Bureaucracy] },
      narrative: new Narrative({
        narration: [
          "A census form with no father listed is a bureaucratic flag.",
        ],
      }),
    }),
    theHouseholdEconomicsDoNotFit: opportunity({
      label: "The household economics do not fit",
      trigger: (w) => w.barbara.allActions.censusInterview.done,
      target: { skills: [Bureaucracy] },
      narrative: new Narrative({
        narration: [
          "Three household members and one farm-labour income cannot explain the house and supplies.",
        ],
        gives: { clues: [clues.BarbaraHasHelp] },
      }),
    }),
    barbarasSocialMapHasOmissions: opportunity({
      label: "Barbara's social map has omissions",
      trigger: (w) => w.barbara.allActions.askAboutTheVillage.done,
      target: { skills: [Finesse] },
      narrative: new Narrative({
        narration: [
          "Her kind descriptions skip Stanisław Rezeń unless asked, soften Tadek Gajda, and avoid judging Helena Rzepka.",
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

  // ------------------------------------------------------------ bond

  bond: Checks = [
    "Help with Pawełek in a practical way",
    "Bring something small and kind for Pawełek",
    "Talk about ordinary life before questions",
  ];
}
