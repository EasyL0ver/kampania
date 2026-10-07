import { Location, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";
import { Empathy } from "../skills.ts";
import Zofia from "../characters/zofia.ts";
import { todo, todoEffect } from "../todo.ts";

export default class PgrQuarters extends Location {
  readonly id = "pgr-quarters";
  readonly name = "PGR Workers' Quarters";
  readonly hook = "Behind the PGR main building: the stołówka and barracks.";
  readonly position = "behind the PGR main building: stołówka and barracks";
  // TODO: "Free for eating or brief talk; 1 action for deeper engagement".
  readonly visitCost = 1;
  // Zofia in work hours; unnamed workers at mealtimes; committee if housed here.
  override present(): CharacterRef[] {
    return [Zofia];
  }

  readonly setup = new Narrative({
    narration: [
      "The stołówka has a rough wooden counter, benches, a cast-iron stove, and food prepared by Zofia Pytlak.",
      "PGR workers eat here.",
      "Village talk passes through the stołówka.",
      "The barracks are a long low building with iron cots, thin mattresses, and a wood stove at each end.",
      "The barracks were built for seasonal workers.",
      "The committee sleeps here if por. Skowron arranged it.",
      "Zofia runs the kitchen efficiently.",
      "Zofia sees workers, visitors, meal patterns, and village interactions.",
    ],
    gives: { aware: [PgrQuarters] },
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    eatAndListen: action({
      label: "Eat and listen",
      cost: [],
      narrative: new Narrative({
        narration: [
          "The committee eats with workers and hears current village talk based on game state.",
        ],
        gives: { effects: todoEffect("NPC State Change: Zofia Pytlak and farm workers become more willing to speak during future meals.") },
      }),
    }),
    // TODO: cost "Free for brief talk; 1 action for deep conversation" — set free.
    talkToZofia: action({
      label: "Talk to Zofia",
      requires: [new Requirement("Zofia isn't in the kitchen right now.", { when: todo("Zofia Pytlak present") })],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Zofia shares opinions about village people except secrets that would betray Michał Pytlak.",
        ],
        gives: { effects: todoEffect("NPC State Change: Zofia Pytlak becomes more willing to confirm suspicions if she likes the committee.") },
      }),
    }),
    helpInTheKitchen: action({
      label: "Help in the kitchen",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The committee peels potatoes, hauls water, or chops wood with Zofia.",
        ],
        gives: { effects: todoEffect("NPC State Change: Zofia Pytlak and farm workers see the committee as useful rather than only official.") },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    kitchenWork: opportunity({
      label: "Kitchen work",
      target: { skills: [Empathy] },
      narrative: new Narrative({
        narration: [
          "Zofia speaks while cooking and keeps her hands busy.",
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
