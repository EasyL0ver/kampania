import { Event, Narrative, WithoutSkillRequirement, action, anyone, opportunity } from "../schema.ts";
import type { CharacterRef, Effect, EventHook, LocationRef, Tick, WorldCond } from "../schema.ts";
import { Devotion, Empathy, Finesse, Wszywka } from "../skills.ts";
import * as clues from "../clues.ts";
import { todoEffect } from "../todo.ts";
import WojewodasHouse from "../locations/wojewodas-house.ts";
import TheStore from "../locations/the-store.ts";
import Wojewoda from "../characters/wojewoda.ts";
import Wife from "../characters/wife.ts";
import Zofia from "../characters/zofia.ts";
import Matrona from "../characters/matrona.ts";
import Painter from "../characters/painter.ts";
import Junior from "../characters/junior.ts";
import Wujas from "../characters/wujas.ts";
import Arrival from "./arrival.ts";

export default class Dinner extends Event {
  readonly id = "dinner";
  readonly name = "Dinner at Wojewoda's";
  readonly hook = "Zofia Pytlak sets the table.";
  override at(): LocationRef {
    return WojewodasHouse;
  }

  override present(): CharacterRef[] {
    return [Wojewoda, Wife, Zofia, Matrona, Painter, Junior, Wujas];
  }
  override readonly hooks: EventHook[] = [
    { text: "Zofia Pytlak sets the table.", heardAt: [WojewodasHouse] },
    { text: "Food smell reaches the office or upstairs rooms.", heardAt: "anywhere" },
  ];
  override condition: WorldCond = (w) => w.arrival.status !== "pending" && !w.arrival.floodRiskRaised;
  // TODO: distil setup facts from prose (lodging offers depend on how well players engage).
  readonly setup = new Narrative({
    narration: [
      "Zofia Pytlak has laid out a proper meal.",
      "Zbigniew Gajda hosts the committee at his table.",
      "Irena Gajda is polite and attentive.",
      "Marek Gajda arrives late.",
      "Marek Gajda does not apologise.",
      "Marek Gajda sits, eats, and barely engages.",
      "Zbigniew Gajda looks at Marek Gajda but says nothing.",
      "Tadek Gajda arrives midway through dinner.",
      "Tadek Gajda is drunk and uninvited.",
      "Tadek Gajda lets himself in.",
      "Zbigniew Gajda tenses.",
      "Irena Gajda goes quiet.",
      "Zofia Pytlak sets another plate without being asked.",
      "Helena Rzepka asks aloud why Janina Gajda is not at the table.",
      "Someone says Janina begged off; the answer is brushed past quickly.",
      "Attending dinner makes the Gajda household treat the committee as guests rather than only officials.",
      "If players engage well, Zbigniew Gajda offers lodging at his house.",
      "If players engage well, Helena Rzepka picks the most inquisitive players to stay at hers.",
      "If the evening is cold, the committee is sent to PGR quarters for the night.",
    ],
  });

  resolve: Tick = todoEffect("Lodging defaults to PGR quarters.");

  // ------------------------------------------------------------ opportunities

  // The Markdown has an empty Actions section.
  // ------------------------------------------------------------ actions

  readonly allActions = {
    drinkWithTadek: action({
      label: "Drink with Tadek",
      requires: [new WithoutSkillRequirement(Wszywka, "Your implant won't let you drink.")],
      cost: [],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: {
          effects: (w, me) => {
            w.wujas.drunk = true;
            w.wujas.drinkingBuddy.set(me, true);
          },
        },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    irenaWatching: opportunity({
      label: "Irena watching",
      target: { skills: [Finesse] },
      promptedBy: [Dinner],
      narrative: new Narrative({
        narration: [
          "Irena Gajda tracks the committee more closely than the conversation requires.",
        ],
        gives: { clues: [clues.IrenaIsWatchful] },
      }),
    }),
    janinasEmptyPlace: opportunity({
      label: "Janina's empty place",
      target: { skills: [Empathy] },
      promptedBy: [Dinner],
      narrative: new Narrative({
        narration: [
          "Helena Rzepka's question about the absent Janina Gajda reveals it: Janina begged off, as she always does — the distance is hers.",
        ],
        gives: { clues: [clues.CiotkaAvoidsFamily] },
      }),
    }),
    sheNeverMissesMass: opportunity({
      label: "She never misses mass",
      target: { skills: [Devotion] },
      promptedBy: [Dinner],
      narrative: new Narrative({
        narration: [
          "Someone at the table notes that Janina keeps her distance from the family but never from the church: she is the most devout in the village and has not missed a Sunday in years.",
        ],
        gives: { clues: [clues.CiotkaIsDevout] },
      }),
    }),
    // Loosened and glad of the company, he tells them to come drink with him at
    // the store any day.
    tadekTakesToThem: opportunity({
      label: "Tadek takes to them",
      trigger: (w): boolean => w.dinner.allActions.drinkWithTadek.done,
      target: anyone,
      promptedBy: [Wujas],
      narrative: new Narrative({
        narration: [
          "`(requires: drank with Tadek Gajda during dinner — Physique or Alcoholic)` — loosened and glad of the company, Tadek tells them to come drink with him at the store any day.",
        ],
        gives: { aware: [TheStore] },
      }),
    }),
  };

  override get opportunities() {
    return this.allOpportunities;
  }
}
