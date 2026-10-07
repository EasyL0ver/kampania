import { Location, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";
import { Finesse, Medicine, Survival, Violence } from "../skills.ts";
import Butcher from "../characters/butcher.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";

export default class ButchersHouse extends Location {
  readonly id = "butchers-house";
  readonly name = "Butcher's House";
  readonly hook = "The edge of %NEW_VILLAGE%, nearest the forest path toward %OLD_VILLAGE%.";
  readonly position = "village edge, nearest the forest path to %OLD_VILLAGE%";
  readonly visitCost = 1;
  // Also present: 3 dogs. Rezeń is often gone (not modelled).
  override present(): CharacterRef[] {
    return [Butcher];
  }

  readonly setup = new Narrative({
    narration: [
      "Exterior: Dark timber house with no paint and no curtains.",
      "Exterior: Butchering station behind the house.",
      "Exterior: The station has a scarred block, iron hooks, and a black-stained drainage channel.",
      "Dogs: Three dogs remain; villagers remember five.",
      "Dogs: The dogs growl low instead of barking.",
      "Dogs: One dog limps from an old bad heal.",
      "Dogs: One dog flinches when a hand rises.",
      "Rezeń: If home, Stanisław Rezeń reaches the door before visitors knock.",
      "Rezeń: He chain-smokes and leaves burn marks on the doorframe.",
      "Rezeń: He picks at scabs, scratches himself, and turns a knife in one hand.",
      "Rezeń: His friendliness is too eager and he watches faces closely.",
      "Rezeń: He makes lingering personal comments about female player characters.",
      "Path: A worn track runs from the back door into the forest.",
      "Path: The mud on the track is usually fresh.",
      "Path: The track leads toward %OLD_VILLAGE% and the well.",
      "Interior: The house contains no alcohol.",
      "Interior: Old blood smell is soaked into the wood.",
      "Interior: Modified blades hang on the wall rack.",
      "Interior: A KBW military knife is on the wall rack among butchering tools.",
      "Interior: A KBW rifle is hidden in the smokehouse rafters, wrapped in oilcloth and sacking.",
      "Interior: A folded state propaganda leaflet is tucked among his things: the white eagle driving a bayonet into a trident over the slogan \"DEATH TO THE BANDITS\". On this copy someone has inked a crude cartoon cock onto the eagle.",
      "Interior: A drawer in the bench-bed frame contains girl's undergarments taken from Hania Barnaś.",
    ],
    gives: { aware: [ButchersHouse] },
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    censusVisit: action({
      label: "Census visit",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Rezeń answers official questions on the doorstep, refuses entry, asks where the committee is staying and how long they will remain, and claims he came with the settlers.",
        ],
        gives: { effects: (w) => { w.butcher.knowsCommitteeMovements = true; } },
      }),
    }),
    observeFromDistance: action({
      label: "Observe from distance",
      requires: [new Requirement("You need cover or a safe vantage point.", { when: todo("Concealment or a safe vantage point") })],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Rezeń leaves at dawn, dusk, or night by the forest path and returns with mud on his hands and scraped knuckles.",
        ],
        gives: { clues: [clues.ButcherDumpsCarcassesInWell] },
      }),
    }),
    followIntoForest: action({
      label: "Follow into forest",
      requires: [new Requirement("Rezeń isn't heading out right now.", { when: todo("Rezeń leaves by the forest path") })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Rezeń goes to the well, sits on the rim, clears debris from the mouth, and listens down into it.",
        ],
        gives: {
          clues: [clues.ButcherDumpsCarcassesInWell],
          effects: (w) => { w.butcher.escalated = true; },
        },
      }),
    }),
    followIntoForestAtNight: action({
      label: "Follow into forest at night",
      requires: [new Requirement("He isn't carrying a dead dog out tonight.", { when: todo("Rezeń leaves at night carrying a dead dog") })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Rezeń carries the dead dog to the well and drops the carcass into it.",
        ],
        gives: {
          clues: [clues.ButcherDumpsCarcassesInWell],
          effects: (w) => { w.butcher.escalated = true; },
        },
      }),
    }),
    // TODO: KBW knife, KBW rifle and Hania's undergarments have no item files; left as todoEffect.
    // The propaganda leaflet (items/propaganda-leaflet) is in Setup/Outcome but not in Gives; not given here.
    enterWhileHesGone: action({
      label: "Enter while he's gone",
      requires: [
        new Requirement("Rezeń is home.", { when: todo("Rezeń absent") }),
        new Requirement("The door is locked.", { when: todo("door unlocked") }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The players find modified blades, a KBW military knife, the hidden KBW rifle, the folded propaganda leaflet, old blood smell in the wood, and Hania's undergarments in the bench-bed drawer; the military evidence cross-references KBW documents.",
        ],
        gives: {
          clues: [clues.ButcherHasSoldiersGun, clues.ButcherExSoldier, clues.ButcherDumpsCarcassesInWell],
          effects: todoEffect("Item / Evidence: KBW military knife, KBW rifle, Hania's undergarments."),
        },
      }),
    }),
    confrontAboutTheWell: action({
      label: "Confront about the well",
      promptedBy: [clues.ButcherDumpsCarcassesInWell],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Rezeń does not deny visiting the well, refuses to explain, and gives one warning to leave.",
        ],
        gives: { effects: (w) => { w.butcher.hostileAboutWell = true; } },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    forestPath: opportunity({
      label: "Forest path",
      target: { skills: [Survival] },
      narrative: new Narrative({
        narration: [
          "The track sees daily use and points straight toward %OLD_VILLAGE%.",
        ],
        gives: { clues: [clues.ButcherDumpsCarcassesInWell] },
      }),
    }),
    // TODO: "access to interior" modelled as having entered while he's gone;
    // being let in by Rezeń is not covered.
    noAlcohol: opportunity({
      label: "No alcohol",
      trigger: (w) => w.butchersHouse.allActions.enterWhileHesGone.done,
      target: { skills: [Finesse] },
      narrative: new Narrative({
        narration: [
          "The house contains no alcohol, not a single bottle.",
        ],
        gives: { clues: [clues.ButcherDoesntDrink] },
      }),
    }),
    dogsFear: opportunity({
      label: "Dogs' fear",
      target: { skills: [Violence] },
      narrative: new Narrative({
        narration: [
          "The dogs fear their owner and show signs of practiced cruelty.",
        ],
        gives: { clues: [clues.ButcherIsDangerous] },
      }),
    }),
    butcheringStation: opportunity({
      label: "Butchering station",
      target: { skills: [Medicine] },
      narrative: new Narrative({
        narration: [
          "The station has seen more use than ordinary livestock work explains.",
        ],
        gives: { clues: [clues.ButcherIsDangerous] },
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
