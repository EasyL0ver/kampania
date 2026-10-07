import { Location, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";
import { Bureaucracy, Chainsmoker, Finesse, Geology, Survival } from "../skills.ts";
import Wujas from "../characters/wujas.ts";
import SzymekKepa from "../characters/secondary/szymek-kepa.ts";
import RomekGlowacz from "../characters/secondary/romek-glowacz.ts";
import FranekMucha from "../characters/secondary/franek-mucha.ts";
import BimberBottle from "../items/bimber-bottle.ts";
import * as clues from "../clues.ts";
import { todo } from "../todo.ts";

export default class BimberStill extends Location {
  readonly id = "bimber-still";
  readonly name = "Bimber Still";
  // TODO: source has no ## Hook; written from the **Location:** header.
  readonly hook = "A forest clearing by a stream, between %NEW_VILLAGE% and %OLD_VILLAGE%.";
  readonly position = "forest clearing by a stream, between the villages";
  readonly visitCost = 1;
  // TODO: crew is only present on irregular evenings; not modelled.
  override present(): CharacterRef[] {
    return [Wujas, SzymekKepa, RomekGlowacz, FranekMucha];
  }

  readonly setup = new Narrative({
    narration: [
      "Site: Crude copper still under camouflage netting.",
      "Site: Clearing beside a stream.",
      "Site: Empty sugar sacks, barrels, stacked firewood, and a small fire pit.",
      "Use: Warm ashes show recent use.",
      "Use: Fermentation smell is strong.",
      "Use: Cheap Sport cigarette butts are ground into the mud all around the fire and the still.",
      "Path: A packed footpath leads in from %NEW_VILLAGE%.",
      "Scale: The number of barrels and bottles exceeds personal drinking.",
      "If crew present: The men sit around the fire with bottles and cards.",
      "If crew present: The crew hears visitors before seeing them.",
      "If crew absent: Fresh boot prints, warm ashes, and half-full bottles remain.",
      "Negative evidence: No weapons, documents, hidden room, or grave are visible here.",
    ],
    gives: { aware: [BimberStill] },
  });

  // TODO: **Available:** "Requires forest exploration or following Tadek's crew
  // from Village Outskirts" is not modelled (locations have no availability gate).

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // TODO: not in the Markdown (it only describes bottles around the fire); added as a choice.
    takeABottleOfBimber: action({
      label: "Take a bottle of bimber",
      cost: [],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { items: [BimberBottle] },
      }),
    }),
    sitDownAndDrinkWithTheCrew: action({
      label: "Sit down and drink with the crew",
      requires: [
        new Requirement("The crew isn't here right now.", { when: todo("Crew present") }),
        // TODO: "Drink" is not a card; Alcoholic is a modifier. Left as todo.
        new Requirement("You'd have to actually drink with them.", { when: todo("Drink or Alcoholic") }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The committee takes the offered bottle and makes it clear they are not here to shut the still down. The crew relaxes and the night turns into a session. Tadek warms to whoever kept pace without judging him.",
        ],
        gives: { effects: (w, me) => { w.wujas.drinkingBuddy.set(me, true); } },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    workedStill: opportunity({
      label: "Worked still",
      target: { skills: [Finesse] },
      narrative: new Narrative({
        narration: [
          "The operation is commercial scale, old, and tolerated.",
        ],
        gives: { clues: [clues.BimberStill] },
      }),
    }),
    sugarSacks: opportunity({
      label: "Sugar sacks",
      target: { when: (_w, me) => me.has(Bureaucracy) || me.has(Finesse) },
      narrative: new Narrative({
        narration: [
          "The sugar supply traces to Helena Rzepka's store, which means she profits from the operation.",
        ],
        gives: { clues: [clues.BimberStill] },
      }),
    }),
    // TODO: "searched the site" has no matching action; todo trigger.
    noDeeperCache: opportunity({
      label: "No deeper cache",
      trigger: todo("searched the site"),
      target: { skills: [Finesse] },
      narrative: new Narrative({
        narration: [
          "The site is exactly what it looks like: moonshine production, not a murder cache.",
        ],
        gives: { clues: [clues.BimberStill] },
      }),
    }),
    carpetOfCheapButts: opportunity({
      label: "Carpet of cheap butts",
      target: { when: (_w, me) => me.has(Finesse) || me.has(Survival) || me.has(Chainsmoker) },
      promptedBy: [BimberStill],
      narrative: new Narrative({
        narration: [
          "The ground is littered with butts, all the cheapest Sport, Tadek's brand. Nothing premium here, no Carmen: the brand marks the man.",
        ],
        gives: { clues: [clues.TadekSmokesCheapest] },
      }),
    }),
    theLastSurveyCrew: opportunity({
      label: "The last survey crew",
      target: { when: (w, me) => w.wujas.drinkingBuddy.of(me) },
      promptedBy: [clues.TheFloodLinePotentiallyMiscalculated],
      narrative: new Narrative({
        narration: [
          "The crew laugh about the state surveyors who came before: they drank more than they measured, drove a few stakes, and left early.",
        ],
        gives: { clues: [clues.GeologistsWereDrinking] },
      }),
    }),
    ribbedAsOneOfThem: opportunity({
      label: "Ribbed as one of them",
      trigger: (w) => w.wujas.knowsCommitteeRunsSurvey,
      target: { skills: [Geology] },
      narrative: new Narrative({
        narration: [
          "The crew clock the geologist for what they are and lean into the joke: survey men are all famous drunks, and the last lot who came drank through their whole visit.",
        ],
        gives: { clues: [clues.SurveyorsAreKnownDrunks] },
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
