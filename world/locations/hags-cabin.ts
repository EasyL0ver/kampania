import { Location, Narrative, Requirement, action, anyone, opportunity } from "../schema.ts";
import type { CharacterRef, World } from "../schema.ts";
import { Culture, Finesse, Language } from "../skills.ts";
import Hag from "../characters/hag.ts";
import DmytroKosach from "../characters/dmytro-kosach.ts";
import * as clues from "../clues.ts";
import { todoEffect } from "../todo.ts";

export default class HagsCabin extends Location {
  readonly id = "hags-cabin";
  readonly name = "Paraskewia Chyłak's Cabin";
  // TODO: source has no ## Hook; written from the **Location:** header.
  readonly hook = "Deep in the forest, off an obscured path from %OLD_VILLAGE%.";
  readonly position = "deep forest, off an obscured path from %OLD_VILLAGE%";
  // TODO: "1 action to find, 1 action to interact"; finding not modelled.
  readonly visitCost = 1;
  // Paraskewia is usually here; she may be at the well or the cerkiew.
  override present(w: World): CharacterRef[] {
    return w.hag.alive ? [Hag] : [];
  }

  readonly setup = new Narrative({
    narration: [
      "Cabin: Small weathered wooden cabin.",
      "Cabin: Built or repurposed from a pre-war structure.",
      "Cabin: Hidden by trees and undergrowth.",
      "State: Maintained but sparse.",
      "State: Roof is weathered but functional.",
      "State: Walls hold.",
      "State: Hearth provides heat and cooking.",
      "State: No electricity or running water.",
      "Interior: Single room.",
      "Interior: Icons, candles, herbs, and prayer materials are kept here.",
      "Interior: A small three-barred crucifix hangs among the icons.",
      "Interior: A soft folded sheet of Cyrillic names is kept with the ritual materials.",
      "Interior: Foraged and preserved foods are stored here.",
      "Interior: Blankets, worn clothes, and cooking implements are present.",
      "Hidden tin: Floorboards hide a tin with Dmytro Kosach's photograph, a folding knife marked Д.К., and Ukrainian letters wrapped in oilcloth.",
      "Survival: Paraskewia survives by foraging, preserving food, and enduring isolation.",
      "Absence: She may be at the well or cerkiew performing rites.",
    ],
    gives: { aware: [HagsCabin] },
  });

  // TODO: **Available:** "Requires extensive forest exploration or guidance" not modelled.

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // "Requires: Access to the cabin" = being here; omitted.
    // TODO: photograph, knife and letters have no item files; left as todoEffect.
    searchTheHiddenFloorboardTin: action({
      label: "Search the hidden floorboard tin",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The players find Dmytro Kosach's photograph, folding knife marked Д.К., and Ukrainian letters wrapped in oilcloth.",
        ],
        gives: {
          aware: [DmytroKosach],
          effects: todoEffect("Item / Evidence: Dmytro Kosach's photograph, knife, and letters."),
        },
      }),
    }),
    // TODO: "dead or missing after Well Confrontation"; only `dead` is modelled.
    searchTheCabinAfterConfrontation: action({
      label: "Search the cabin after confrontation",
      requires: [new Requirement("Paraskewia is still living here.", { when: (w) => !w.hag.alive })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The cabin is empty, the fire is cold, supplies remain, and ritual materials show twenty years of tending the dead.",
        ],
        gives: { clues: [clues.HagTendsTheWell] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    ritualMaterials: opportunity({
      label: "Ritual materials",
      target: { skills: [Culture] },
      narrative: new Narrative({
        narration: [
          "The icons, candles, herbs, and prayers show someone has the ritual form.",
        ],
        gives: { clues: [clues.HagHasTheForm] },
      }),
    }),
    listOfTheDead: opportunity({
      label: "List of the dead",
      target: { when: (_w, me) => me.has(Language) || me.has(Finesse) },
      narrative: new Narrative({
        narration: [
          "The folded Cyrillic sheet names the dead and belongs with Paraskewia's List of the Dead.",
        ],
        gives: { clues: [clues.ParaskewiaNamedTheDead] },
      }),
    }),
    theThreeBarredCross: opportunity({
      label: "The three-barred cross",
      target: { skills: [Culture] },
      promptedBy: [HagsCabin],
      narrative: new Narrative({
        narration: [
          "A small three-barred crucifix hangs among the icons, unlike a Roman cross.",
        ],
        gives: { clues: [clues.ThreeBarredCrossInHagsCabin] },
      }),
    }),
    // TODO: "found the bunker inscription and the knife" are per-player finds;
    // modelled as world-level "the search was done".
    dmytroConnection: opportunity({
      label: "Dmytro connection",
      trigger: (w) => w.upaBunker.allActions.searchDmytroKosachsCache.done && w.hagsCabin.allActions.searchTheHiddenFloorboardTin.done,
      target: anyone,
      narrative: new Narrative({
        narration: [
          "The initials connect Dmytro Kosach's belongings to the bunker.",
        ],
        gives: { aware: [DmytroKosach] },
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
