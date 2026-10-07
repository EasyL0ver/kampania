import { Event, Narrative, action, opportunity } from "../schema.ts";
import type { CharacterRef, Effect, EventHook, LocationRef, Tick, WorldCond } from "../schema.ts";
import { Empathy, Finesse, Medicine } from "../skills.ts";
import * as clues from "../clues.ts";
import { todoEffect } from "../todo.ts";
import PgrFarm from "../locations/pgr-farm.ts";
import Zofia from "../characters/zofia.ts";
import Foreman from "../characters/foreman.ts";
import ForemanSavesVillage from "./foreman-saves-village.ts";

export default class ForemansFloodFight extends Event {
  readonly id = "foremans-flood-fight";
  readonly name = "Zofia Comes to the Committee";
  readonly hook = "Zofia Pytlak crosses the village looking for the committee.";
  override at(): LocationRef {
    return PgrFarm;
  }

  override present(): CharacterRef[] {
    return [Zofia, Foreman];
  }
  override readonly hooks: EventHook[] = [
    { text: "Zofia Pytlak crosses the village looking for the committee.", heardAt: "anywhere" },
  ];
  override condition: WorldCond = (_w) => true; // TODO: Day 5 only gate in calendar
  // Setup states "Composure: 0" — no composure field set.
  readonly setup = new Narrative({
    narration: [
      "Zofia Pytlak finds the committee.",
      "Zofia Pytlak says something is wrong with her husband.",
      "Michał Pytlak has not come home since the flood started.",
      "Michał Pytlak does not eat what Zofia Pytlak brings him.",
      "Michał Pytlak does not sleep.",
      "Michał Pytlak is 57 years old with a bad knee.",
      "Michał Pytlak is outlifting younger men.",
      "Michał Pytlak's hands bled on the first day and no longer do.",
      "Michał Pytlak does not shiver in floodwater.",
      "Michał Pytlak does not slow down.",
      "Michał Pytlak has been asking about a bunker in the forest.",
      "Michał Pytlak wants dynamite.",
      "Zofia Pytlak does not know Michał Pytlak's plan.",
      "Zofia Pytlak wants the committee to save her husband rather than the farm.",
      "The workers keep following Michał Pytlak because he is the only person still fighting the flood.",
    ],
  });

  onFire: Tick = (w) => {
    w.foreman.inFloodWork = true;
  };

  resolve: Tick = todoEffect(
    "Zofia Pytlak returns to watching Michał Pytlak alone. | The engineering ending path becomes harder to access. | Zofia Pytlak's trust window closes.",
  );

  // ------------------------------------------------------------ actions

  readonly allActions = {
    goSeePytlakAtTheFloodLine: action({
      label: "Go see Pytlak at the flood line",
      promptedBy: [clues.FloodIsImminent],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The committee finds Michał Pytlak knee-deep in floodwater, directing workers, hauling sandbags, and explaining that explosives can reopen the plugged water-gap above the village, and that the only explosives in reach are the old partisan ordnance left in the UPA bunkers scattered through these hills.",
        ],
        gives: { aware: [ForemanSavesVillage],
          clues: [clues.GapIsBlocked, clues.UpaBunkersInTheArea],
          },
      }),
    }),
    talkToZofiaPytlak: action({
      label: "Talk to Zofia Pytlak",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Zofia Pytlak says the flood fight is not new for Michał Pytlak, but this is different, and he was already carrying a weight before the flood.",
        ],
        gives: {
          effects: todoEffect("NPC State Change: Zofia Pytlak trusts the committee and remains reachable later."),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    zofiasFear: opportunity({
      label: "Zofia's fear",
      target: { skills: [Empathy] },
      promptedBy: [ForemansFloodFight],
      narrative: new Narrative({
        narration: [
          "Zofia Pytlak is describing observed physical changes, not exaggerating.",
        ],
      }),
    }),
    theImpossibleEndurance: opportunity({
      label: "The impossible endurance",
      target: { skills: [Medicine] },
      promptedBy: [ForemansFloodFight],
      narrative: new Narrative({
        narration: [
          "The described lack of fatigue, pain response, and cold response has no medical explanation.",
        ],
      }),
    }),
    theBunkerQuestion: opportunity({
      label: "The bunker question",
      target: { skills: [Finesse] },
      promptedBy: [ForemansFloodFight],
      narrative: new Narrative({
        narration: [
          "UPA partisan bunkers in Bieszczady forests can hold old ordnance.",
        ],
        gives: { clues: [clues.UpaBunkersInTheArea] },
      }),
    }),
    theDilemma: opportunity({
      label: "The dilemma",
      target: { skills: [Empathy] },
      promptedBy: [ForemansFloodFight],
      narrative: new Narrative({
        narration: [
          "Zofia Pytlak knows she is asking the committee to choose Michał Pytlak over the village's flood defense.",
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
