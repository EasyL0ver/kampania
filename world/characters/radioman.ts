import { Character, CharacterDescription, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { Checks } from "../schema.ts";
import { Bureaucracy, History } from "../skills.ts";
import OldVillageRuins from "../locations/old-village-ruins.ts";
import * as clues from "../clues.ts";

export default class Radioman extends Character {
  readonly id = "radioman";
  readonly name = "%RADIOMAN%";
  readonly description = new CharacterDescription({
    narration: ["The village drunk who was once its schoolteacher, loud against the authorities to anyone who'll share a bottle."],
    clothes: "Grey suit jacket gone shiny at the elbows, the last relic of the teacher he was, over peasant trousers and a collarless shirt; nothing fits, nothing is clean",
    hairAndFace: "Grey stubble he shaves twice a week; wire spectacles mended with copper wire; broken veins across the nose; eyes still sharp when drink has not dulled them",
    carriage: "Stands too straight when making a point, then folds again; hands tremble until the first glass steadies them",
    gives: { aware: [Radioman] },
  });

  readonly role = "the village drunk / anti-establishment loudmouth";
  // TODO: lives in "a run-down cottage on the edge of %NEW_VILLAGE%" — no location file; no livesAt.

  // TODO: mechanic "Signal in the noise" (GM ratio of truth vs. froth) not
  // modelled; it is GM guidance (see prose/characters/radioman.md).

  // ------------------------------------------------------------ state

  // ------------------------------------------------------------ actions

  readonly allActions = {
    askWhereTheGoodBimberComesFrom: action({
      label: "Ask where the good bimber comes from",
      cost: [],
      narrative: new Narrative({
        narration: [
          "He points the player toward Tadek's crew and the treeline without coaxing.",
        ],
        gives: { clues: [clues.DrinkingCrewHeadsToForest] },
      }),
    }),
    whatTheLastSurveyCrewReallyDid: action({
      label: "What the last survey crew really did",
      promptedBy: [clues.CommitteeRunsGeographicalSurvey],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Ask him about the survey and he lights up: the last crew who came to re-check the ground drank at Tadek's still for the best part of a week, drove a few stakes by the road, and left. \"They surveyed the bottom of a bottle, and the state signed it.\" Drunk testimony, but he watched it happen, and the teacher in him read exactly how little work went into what they filed.",
        ],
        gives: { clues: [clues.GeologistsWereDrinking, clues.OriginalReportIsThin] },
      }),
    }),
    whyHeSaysTheyDidItOnPurpose: action({
      label: "Why he says they did it on purpose",
      promptedBy: [clues.OriginalReportIsThin],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Press him on it and the teacher's logic curdles into paranoia: a crew does not drink a survey away by accident, he insists, the state wanted it thin, a false all-clear so the village would be built where it would drown. He is certain it was deliberate. It may be the bimber and the bitterness talking, or the one time the pattern is real.",
        ],
        gives: { clues: [clues.SurveyWasFaked] },
      }),
    }),
    doTheArithmeticOnTheDitch: action({
      label: "Do the arithmetic on the ditch",
      requires: [
        new Requirement("You haven't measured the concrete head.", { clues: [clues.ConcreteDitchMeasurements] }),
        new Requirement("You haven't measured the dugout.", { clues: [clues.DugoutMeasurements] }),
      ],
      promptedBy: [clues.DitchConcreteStopsShort],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Show the drunk teacher the figures and he sobers enough to work them like a class problem: the fine concrete head carries plenty, but it runs a fraction of the length; the shallow dugout that carries the rest chokes at flood volume and spills. To him it is proof the state built a sham drain and knew it.",
        ],
        gives: { clues: [clues.DitchDrainsNothing] },
      }),
    }),
    askAboutTheOldVillage: action({
      label: "Ask about the old village",
      promptedBy: [OldVillageRuins],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The teacher gives the official history without hesitation: it was a Lemko village, Greek Catholic, up the valley, and in 1947 the state cleared the whole range under Akcja Wisła and scattered the people west. \"On paper they were resettled. On paper.\" He knows the record; he has no idea what the record buried.",
        ],
        gives: { clues: [clues.OldVillageWasLemko, clues.OldVillageResettledDuringVistula] },
      }),
    }),
    askAboutTheTrident: action({
      label: "Ask about the trident",
      promptedBy: [clues.TridentOnTheBayonet],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He knows the mark the moment they describe it. The state called them bands, he says, but that three-pronged sign is the partisans' own emblem, the UPA, the Ukrainians the army was sent to clear out of these hills.",
        ],
        gives: { clues: [clues.TridentStandsForUpa] },
      }),
    }),
    askAboutGermanEquipment: action({
      label: "Ask about German equipment",
      promptedBy: [clues.EdeksBayonetIsGerman],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "A German weapon in these hills is no mystery to him. The partisans fought with whatever they stripped off the war, he says, German rifles and blades, Soviet kit too, anything they could carry out of the fighting. The teacher recites it like a lesson.",
        ],
        gives: { clues: [clues.UpaUsedGermanEquipment] },
      }),
    }),
    censusInterview: action({
      label: "Census interview",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The census sets him off, but he gives name and age inside a tirade about the teaching post they took and the years they gave him for \"agitation.\"",
        ],
        gives: { effects: (w) => { w.radioman.censusTaken = true; } },
      }),
    }),
    propertyAssessment: action({
      label: "Property assessment",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He gestures at the falling-down cottage the state parked him in.",
        ],
        gives: { effects: (w) => { w.radioman.propertyRecorded = true; } },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theSuitJacketAndPhrasing: opportunity({
      label: "The suit jacket and phrasing",
      target: { when: (_w, me) => me.has(Bureaucracy) || me.has(History) },
      narrative: new Narrative({
        narration: [
          "The jacket and cadence mark what he was before the bottle: an educated man, a teacher, and someone the state broke on purpose.",
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
    "Hear out a full tirade without mocking him or walking off",
    "Share the bottle — drink with him as an equal",
    "Treat him as the mind he was",
  ];

  grudge: Checks = [
    "Mock him or dismiss him as \"just the village drunk\" to his face",
    "Take the sołtys's or the authorities' side in front of him",
    "Repeat what he told you to someone who could report it",
  ];
}
