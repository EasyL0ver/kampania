import { Location, Narrative, Requirement, SkillRequirement, action, opportunity } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";
import { Empathy, Finesse, Medicine, Physique, Speech } from "../skills.ts";
import HalinaZajac from "../characters/secondary/halina-zajac.ts";
import Wujas from "../characters/wujas.ts";
import Neighbour from "../characters/neighbour.ts";
import Junior from "../characters/junior.ts";
import DrinkingCrew from "../characters/secondary/drinking-crew.ts";
import NewVillage from "./new-village.ts";
import CarmenPack from "../items/carmen-pack.ts";
import Rope from "../items/rope.ts";
import SportPack from "../items/sport-pack.ts";
import VodkaBottle from "../items/vodka-bottle.ts";
import Penicillin from "../items/penicillin.ts";
import CigaretteButtsFromCiotkas from "../items/cigarette-butts-from-ciotkas.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";

export default class TheStore extends Location {
  readonly id = "the-store";
  readonly name = "The Store";
  readonly hook = "Helena Rzepka's general store.";
  readonly position = "Helena Rzepka's general store";
  readonly visitCost = 1;
  // Halina inside; Tadek, Dudka and the crew outside; Marek some evenings (not modelled).
  override present(): CharacterRef[] {
    return [HalinaZajac, Wujas, Neighbour, Junior, DrinkingCrew];
  }

  readonly setup = new Narrative({
    narration: [
      "The store is the village social hub.",
      "Men sit outside on benches and crates, passing bimber.",
      "Tadek Gajda is usually outside.",
      "Ryszard Dudka drifts in and out.",
      "Stanisław Rezeń does not drink here.",
      "Halina Zając runs the counter inside.",
      "Helena Rzepka owns the store but is rarely behind the counter.",
      "The shelves are sparse but functional.",
      "Cigarettes are sold over the counter: cheap Sport on the shelf, a pricier premium brand for those who ask.",
      "Bimber is kept under the counter.",
      "The crew enters to buy rounds, banter with Halina, and get sent back outside.",
      "Marek Gajda drinks with the crew some evenings, away from his father.",
      "Halina resents Helena Rzepka and speaks sharply about the work.",
      "The back room has a locked pharmaceutical cabinet.",
      "The cabinet contains penicillin, aspirin, bandages, and iodine.",
      "Helena Rzepka keeps the only cabinet key.",
      "Halina Zając cannot open the medicine cabinet.",
      "Government people are treated with suspicion outside unless they are Tadek Gajda's drinking buddies.",
    ],
    gives: { aware: [TheStore] },
  });

  // TODO: **Available:** "Daytime, any day. Repeatable." not modelled.

  // ------------------------------------------------------------ actions

  readonly allActions = {
    buyCarmenPack: action({
      label: "Buy a pack of Carmen",
      cost: [],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { items: [CarmenPack] },
      }),
    }),
    buySportPack: action({
      label: "Buy a pack of Sport",
      cost: [],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { items: [SportPack] },
      }),
    }),
    // TODO: the Markdown doesn't list buying vodka (the crew "buys rounds"); added as a choice.
    buyVodka: action({
      label: "Buy a bottle of vodka",
      cost: [],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { items: [VodkaBottle] },
      }),
    }),
    buyRope: action({
      label: "Buy rope",
      cost: [],
      narrative: new Narrative({
        narration: [
          "Halina sells a coil of field line off the shelf, mixed lengths knotted serviceable, long enough for the ridge climb.",
        ],
        gives: { items: [Rope] },
      }),
    }),
    // TODO: "Holding the butts" read as items/cigarette-butts-from-ciotkas.
    askWhoSmokesCarmen: action({
      label: "Ask who smokes Carmen",
      requires: [
        new Requirement("You have no butts to show.", { items: [CigaretteButtsFromCiotkas] }),
        new SkillRequirement(Speech, Finesse),
      ],
      promptedBy: [clues.ButtsAtCiotkasAreCarmen],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Nobody in the village wastes money on Carmen except two men: the Gajda boy Marek, who buys what marks him as above the place, and the butcher Stanisław Rezeń, who buys what he pleases. The brand narrows the door to the pair of them, and clears no one.",
        ],
        gives: { clues: [clues.JuniorSmokesCarmen, clues.ButcherSmokesCarmen] },
      }),
    }),
    // TODO: "Physique, or the stolen store cabinet key" — the key has no item
    // file, so the whole OR is a todo. Physique/key branches differ only in prose.
    breakIntoTheCabinet: action({
      label: "Break into the cabinet",
      promptedBy: [clues.StoreHasDrugCabinet],
      requires: [
        new Requirement("You need force or Helena's key.", { when: todo("Physique, or the stolen store cabinet key") }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The penicillin is in the locked cabinet. Physique: You bash the little door until the lock tears out of the wood. Quick and loud, and the splintered frame shows at a glance that someone forced it. With the key: Helena's own key lets you in past the doors and opens the cabinet clean. You take the child's course and lock up after you, but the missing stock will not go unnoticed for long.",
        ],
        gives: {
          items: [Penicillin],
          // TODO: also "World State Change: the cabinet has been robbed."
          effects: (w) => {
            w.matrona.knowsStoreBrokenInto = true;
            w.matrona.knowsPenicillinStolen = true;
          },
        },
      }),
    }),
    smashTheRegisterOpen: action({
      label: "Smash the register open",
      requires: [
        new Requirement("You're not inside the store.", { when: (w): boolean => w.theStore.allActions.breakIntoTheCabinet.done }),
        new SkillRequirement(Physique),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "You pry the cash drawer until it springs. There is not much inside, a day's small takings, but it is gone now, and an emptied till reads as a plain robbery rather than a hand reaching for one thing.",
        ],
        gives: {
          // TODO: also "Item: the till cash"
          effects: (w) => { w.matrona.knowsMoneyStolen = true; },
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theMedicineCabinet: opportunity({
      label: "The medicine cabinet",
      target: { skills: [Medicine] },
      promptedBy: [TheStore],
      narrative: new Narrative({
        narration: [
          "In the back room a locked cabinet holds penicillin, aspirin, bandages, and iodine; a trained eye reads it as a *szafka apteczna*, the state medicine point for miles.",
        ],
        gives: { clues: [clues.StoreHasDrugCabinet] },
      }),
    }),
    ryszardDudkasNervousness: opportunity({
      label: "Ryszard Dudka's nervousness",
      target: { skills: [Empathy], when: (w, me) => w.wujas.drinkingBuddy.of(me) },
      narrative: new Narrative({
        narration: [
          "Dudka drinks too fast and shuts down when the past comes up.",
        ],
        gives: { clues: [clues.NeighbourIsRattled] },
      }),
    }),
    juniorJoinsTheCrew: opportunity({
      label: "Junior joins the crew",
      target: { when: todo("Marek Gajda present, or drinking buddy with Tadek if he is not") },
      promptedBy: [NewVillage],
      narrative: new Narrative({
        narration: [
          "Present, Marek sits plainly among the crew on the benches, away from his father; absent, the crew mention the sołtys's son who drinks with them.",
        ],
        gives: { clues: [clues.JuniorDrinksWithCrew] },
      }),
    }),
    juniorBragsAboutThePistol: opportunity({
      label: "Junior brags about the pistol",
      target: { skills: [Physique] },
      promptedBy: [clues.JuniorDrinksWithCrew],
      narrative: new Narrative({
        narration: [
          "Drinking with the crew, Marek puffs up and talks about the gun in his father's office desk.",
        ],
        gives: { clues: [clues.WojewodaHasGun] },
      }),
    }),
    oldFloodsOnTheBenches: opportunity({
      label: "Old floods on the benches",
      target: { when: (w, me) => w.wujas.drinkingBuddy.of(me) || me.has(Empathy) },
      promptedBy: [clues.StreambedIsCandidateDrain],
      narrative: new Narrative({
        narration: [
          "The old men remember the bad floods. The dry streambed on the far ridge never carried any of it off; the water just pooled against the rock and stopped.",
        ],
        gives: { clues: [clues.StreambedNeverDrained] },
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
