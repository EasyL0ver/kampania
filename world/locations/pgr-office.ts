import { Location, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";
import { Bureaucracy, Geology } from "../skills.ts";
import Wojewoda from "../characters/wojewoda.ts";
import DitchConstructionSpec from "../items/ditch-construction-spec.ts";
import BarnasDepartureDeclaration from "../items/barnas-departure-declaration.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";

export default class PgrOffice extends Location {
  readonly id = "pgr-office";
  readonly name = "PGR Office";
  readonly hook = "Zbigniew Gajda's office in the PGR main building.";

  // ------------------------------------------------------------ shared state (A pass)

  // outside calls go through the office phone
  phoneUnlocked = false;
  readonly position = "Zbigniew Gajda's office, PGR main building";
  readonly visitCost = 1;
  // Zbigniew usually here during the day (not modelled).
  override present(): CharacterRef[] {
    return [Wojewoda];
  }

  readonly setup = new Narrative({
    narration: [
      "The room contains a clean desk, heavy bakelite phone, ledgers, topographic maps, a shelf, and a heavy iron wall safe.",
      "The safe is old, official, and locked.",
      "Tea is usually on the table.",
      "Zbigniew Gajda works here and receives visitors here.",
      "The phone is the only phone in the village.",
      "The maps show topography, rivers, old boundaries, and %OLD_VILLAGE%.",
      "The ledger is on the desk during census work.",
      "The shelf holds farm records, including construction and land-drainage (melioracja) files.",
    ],
    gives: { aware: [PgrOffice] },
  });

  // TODO: **Available:** "After arrival event" not modelled.
  // TODO: "Ask for the maps", "Tell Wojewoda about the flood" and "Report the
  // bimber still" only say "Resolve through" a Wojewoda / arrival move: treated
  // as cross-references (prose only), though the source gave them Gives lines.
  // TODO: the topographic maps have no item file; "Steal the maps" gives a
  // todoEffect and "Date the map" gates on todo("The topographic map").

  // ------------------------------------------------------------ actions

  readonly allActions = {
    stealTheMaps: action({
      label: "Steal the maps",
      requires: [new Requirement("Zbigniew is watching.", { when: todo("Zbigniew Gajda absent or distracted") })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Players take the maps; Zbigniew Gajda will notice eventually.",
        ],
        gives: { effects: todoEffect("Item: topographic maps | World State Change: village outskirts survey cost is reduced | NPC State Change: Zbigniew Gajda becomes suspicious if he discovers the theft.") },
      }),
    }),
    useThePhone: action({
      label: "Use the phone",
      requires: [new Requirement("Zbigniew hasn't let you use the phone.", { when: todo("Zbigniew Gajda grants access") })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Players can call prof. Tadeusz Bieńkowski, dr Leon Sawicki, or district authorities, subject to game state.",
        ],
        gives: {
          clues: [clues.PhoneIsLifeline],
          effects: (w) => { w.pgrOffice.phoneUnlocked = true; },
        },
      }),
    }),
    callTheSurveyArchive: action({
      label: "Call the survey archive",
      requires: [new Requirement("You have no access to the phone.", { when: (w): boolean => w.pgrOffice.phoneUnlocked })],
      promptedBy: [clues.TheFloodLinePotentiallyMiscalculated],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The district survey archive confirms the previous crew filed a thin report, drove only a handful of stakes, and closed the job early. On the record it reads as thin work, well short of a proper survey.",
        ],
        gives: { clues: [clues.OriginalReportIsThin] },
      }),
    }),
    dateTheMapAgainstTheGround: action({
      label: "Date the map against the ground",
      requires: [new Requirement("You don't have the topographic map.", { when: todo("The topographic map") })],
      promptedBy: [clues.LandslideInTheGap, clues.GapIsBlocked, clues.RiverDoesntMatchMap],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The map's survey date predates the landslide and the river's shift. It cannot be trusted on the gap or the river's course.",
        ],
        gives: { clues: [clues.MapIsOutdated] },
      }),
    }),
    pullTheDitchConstructionFile: action({
      label: "Pull the ditch construction file",
      promptedBy: [clues.DitchIsCandidateDrain],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The shelf's land-drainage files hold the ditch's construction spec: a concrete-lined channel the full run, signed off as built. Set against a walked ditch it is the paper proof the ditch fell short.",
        ],
        gives: { items: [DitchConstructionSpec] },
      }),
    }),
    // "Committee census work" read as committee authority: omitted.
    inspectThePgrLedger: action({
      label: "Inspect the PGR ledger",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The ledger lists PGR workers and wages; some names do not match anyone in the village.",
        ],
        gives: { clues: [clues.MazurPaidButAbsent] },
      }),
    }),
    crackTheSafe: action({
      label: "Crack the safe",
      requires: [
        new Requirement("Zbigniew is watching.", { when: todo("Zbigniew Gajda absent or distracted") }),
        new Requirement("You have no way to open the safe.", { when: todo("a way to open the safe") }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The safe contains the sołtys's loaded pistol and Edward Barnaś's Departure Declaration.",
        ],
        gives: {
          items: [BarnasDepartureDeclaration],
          clues: [clues.DepartureDeclarationForged],
          effects: todoEffect("Item: sołtys's pistol | NPC State Change: Zbigniew Gajda notices either item missing eventually."),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    mapsOnTheDesk: opportunity({
      label: "Maps on the desk",
      target: { skills: [Geology] },
      narrative: new Narrative({
        narration: [
          "The topographic maps mark %OLD_VILLAGE%.",
        ],
        gives: { clues: [clues.OldVillageWasLemko] },
      }),
    }),
    readTheTopographicMap: opportunity({
      label: "Read the topographic map",
      target: { skills: [Bureaucracy] },
      promptedBy: [clues.CommitteeRunsGeographicalSurvey],
      narrative: new Narrative({
        narration: [
          "The map draws the ridge water-gap as an open channel and draws a bridge spanning dry ground with the river running elsewhere.",
        ],
        gives: { clues: [clues.MapShowsGapOpen, clues.BridgeOverSolidLand] },
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
