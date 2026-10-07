import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, Effect, EventHook, LocationRef, Tick, WorldCond } from "../schema.ts";
import { Bureaucracy, Empathy } from "../skills.ts";
import PgrOffice from "../locations/pgr-office.ts";
import Wojewoda from "../characters/wojewoda.ts";
import BarnasDepartureDeclaration from "../items/barnas-departure-declaration.ts";
import Arrival from "./arrival.ts";
import * as clues from "../clues.ts";
import { todoEffect } from "../todo.ts";

// The three asks duplicate actions on characters/wojewoda (Ask about Barbara's
// house, Ask about Janina's house, Show the paperwork for Janina's house).
// TODO: decide whether they live here, on Zbigniew, or both.
export default class WojewodasAsk extends Event {
  readonly id = "wojewodas-ask";
  readonly name = "Wojewoda's Ask";
  readonly hook = "Zbigniew Gajda closing the PGR office door to speak with the committee privately.";

  // ------------------------------------------------------------ shared state (A pass)

  underway = false;
  override at(): LocationRef {
    return PgrOffice;
  }

  override present(): CharacterRef[] {
    return [Wojewoda];
  }
  override readonly hooks: EventHook[] = [
    { text: "Zbigniew Gajda closing the PGR office door to speak with the committee privately.", heardAt: "anywhere" },
  ];
  // He knows the flood is possible and that the committee is assessing property.
  override condition: WorldCond = (w) =>
    (w.wojewoda.awareOfMiscalculation === "needProof" || w.wojewoda.awareOfMiscalculation === "convinced") &&
    (w.wojewoda.allActions.tellHimYoureAssessingProperty.done || w.wojewoda.allActions.propertyAssessment.done);

  onFire: Tick = (w) => {
    w.wojewodasAsk.underway = true;
    w.wojewoda.sharedHisAsk = true;
  };

  readonly setup = new Narrative({
    narration: [
      "Zbigniew closes the office door.",
      "State compensation follows deeds and recorded ownership.",
      "PGR labourers live in PGR housing.",
      "Money for PGR housing goes to the state, not the people living there.",
      "Zbigniew asks the committee to record those houses as the villagers' own.",
      "He does not name Barbara's brick house.",
      "He does not name Janina's cottage.",
      "The false record would defraud the state and pay villagers who are about to lose everything.",
    ],
  });

  // ------------------------------------------------------------ actions

  // "Wojewoda's Ask is underway" is implied by being in this event.
  readonly allActions = {
    askAboutBarbarasHouse: action({
      label: "Ask about Barbara's house",
      promptedBy: [WojewodasAsk],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Zbigniew says the house was built with PGR brick and labour for a young mother with no support.",
        ],
        gives: { clues: [clues.BarbaraHasHelp] },
      }),
    }),
    askAboutJaninasHouse: action({
      label: "Ask about Janina's house",
      promptedBy: [clues.CiotkaHouseIsWojewodas],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Zbigniew says the house was abandoned, left to the state, administered by the PGR, and allocated to Janina.",
        ],
        gives: { clues: [clues.CiotkaHouseIsPgrs] },
      }),
    }),
    showThePaperworkForJaninasHouse: action({
      label: "Show the paperwork for Janina's house",
      promptedBy: [clues.CiotkaHouseIsPgrs],
      cost: [{ time: 1 }],
      // TODO: "Item / Evidence: the players have seen the declaration and where it is
      // kept" — he does not hand it over, so modelled as awareness, not the item.
      narrative: new Narrative({
        narration: [
          "Zbigniew shows the 1954 file with Edward Barnaś's forged declaration, but does not hand it over.",
        ],
        gives: {
          aware: [BarnasDepartureDeclaration],
          effects: todoEffect("Item / Evidence: the players have seen the declaration and where it is kept"),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    noPersonalCut: opportunity({
      label: "No personal cut",
      target: { skills: [Empathy] },
      promptedBy: [WojewodasAsk],
      narrative: new Narrative({
        narration: [
          "Zbigniew is asking for the villagers, not for his own compensation.",
        ],
      }),
    }),
    fraudOnPaper: opportunity({
      label: "Fraud on paper",
      target: { skills: [Bureaucracy] },
      promptedBy: [WojewodasAsk],
      narrative: new Narrative({
        narration: [
          "The request is deliberate false property recording against the state.",
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
}
