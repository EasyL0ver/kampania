import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, Effect, EventHook, LocationRef, Tick, WorldCond } from "../schema.ts";
import { Empathy, Geology, Handiwork, History, Medicine } from "../skills.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";
import UpaBunker from "../locations/upa-bunker.ts";
import Foreman from "../characters/foreman.ts";
import Zofia from "../characters/zofia.ts";
import MakeshiftCharge from "../items/makeshift-charge.ts";
import ForemansFloodFight from "./foremans-flood-fight.ts";
import ClimbThePlugInTheRain from "./climb-the-plug-in-the-rain.ts";

export default class ForemanSavesVillage extends Event {
  readonly id = "foreman-saves-village";
  readonly name = "Michał Pytlak Saves the Village — The Engineering Ending";
  readonly hook = "Michał Pytlak has stopped hauling sand.";
  override at(): LocationRef {
    return UpaBunker;
  }

  override present(): CharacterRef[] {
    return [Foreman, Zofia];
  }
  override readonly hooks: EventHook[] = [
    { text: "Michał Pytlak has stopped hauling sand.", heardAt: "anywhere" },
    { text: "Michał Pytlak has a plan to save the village using old ordnance.", heardAt: "anywhere" },
  ];
  override condition: WorldCond = (w) => w.foremansFloodFight.status !== "pending"; // TODO: player agreement
  readonly setup = new Narrative({
    narration: [
      "Michał Pytlak says the village is drowning because the water cannot run through the plugged gap.",
      "The ground beyond the gap is the empty %BIG-BASIN%, big enough to take the water without drowning anyone.",
      "The plug is loose debris and soft shale, not hard sandstone.",
      "A charge placed in the right seam can start a notch.",
      "Floodwater can widen the breach after the blast.",
      "A charge placed wrong can bring more hillside down or open the gap too slowly.",
      "The UPA bunker is partially collapsed.",
      "The UPA bunker has flooded sections.",
      "The UPA bunker has rotten timbers.",
      "The old ordnance may have corroded casings, degraded filler, and sensitive fuses.",
      "Zofia Pytlak is trying to pull Michał Pytlak out of the plan.",
    ],
  });

  resolve: Tick = todoEffect(
    "Michał Pytlak goes for the bunker and ridge alone. | Michał Pytlak may die from the ordnance, the slope, or his failing body. | Michał Pytlak may save the village at the cost of his body and never return the same.",
  );

  // ------------------------------------------------------------ actions

  readonly allActions = {
    believeHim: action({
      label: "Believe him — commit to the plan",
      requires: [
        new Requirement("You haven't walked the plan or seen proof.", {
          when: todo("Walked the plan or holds survey proof."),
        }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The committee backs Michał Pytlak's water-gap plan.",
        ],
        gives: { effects: todoEffect("Ending Progress: the engineering ending is live.") },
      }),
    }),
    getTheExplosivesFromTheBunker: action({
      label: "Get the explosives from the bunker",
      requires: [
        new Requirement("You haven't committed to the plan.", {
          when: (w): boolean => w.foremanSavesVillage.allActions.believeHim.done,
        }),
        new Requirement("You can't get into the bunker.", { aware: [UpaBunker] }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The committee recovers usable old partisan charges from the bunker.",
        ],
        gives: { aware: [ClimbThePlugInTheRain], items: [MakeshiftCharge] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    thePlanIsSound: opportunity({
      label: "The plan is sound",
      target: {
        when: (_w, me) => me.has(Handiwork) || me.has(Geology) || me.knows(clues.GapIsBlocked),
      },
      promptedBy: [ForemanSavesVillage],
      narrative: new Narrative({
        narration: [
          "`(requires: Handiwork or Geology or holding `gap-is-blocked`)` — The plug dooms the village, the debris is breachable, and floodwater will widen a breach.",
        ],
        gives: { clues: [clues.GapIsBlocked] },
      }),
    }),
    theOrdnanceRisk: opportunity({
      label: "The ordnance risk",
      target: { when: (_w, me) => me.has(Handiwork) || me.has(History) },
      promptedBy: [ForemanSavesVillage],
      narrative: new Narrative({
        narration: [
          "Twenty-year-old buried munitions may detonate from a knock, drop, spark, or heat.",
        ],
      }),
    }),
    pytlaksState: opportunity({
      label: "Pytlak's state",
      target: { skills: [Medicine] },
      promptedBy: [ForemanSavesVillage],
      narrative: new Narrative({
        narration: [
          "Michał Pytlak's lack of sleep, food, cold response, and pain response is not normal endurance.",
        ],
      }),
    }),
    zofiaAtTheEdges: opportunity({
      label: "Zofia at the edges",
      target: { skills: [Empathy] },
      promptedBy: [ForemanSavesVillage],
      narrative: new Narrative({
        narration: [
          "Zofia Pytlak is weighing the village against her husband.",
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
