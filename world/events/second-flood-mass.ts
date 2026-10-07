import { Event, Narrative, action, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef } from "../schema.ts";
import { Culture, Devotion, History, Violence } from "../skills.ts";
import { todoEffect } from "../todo.ts";
import TheChurch from "../locations/the-church.ts";
import Priest from "../characters/priest.ts";
import Matrona from "../characters/matrona.ts";
import Painter from "../characters/painter.ts";
import Wojewoda from "../characters/wojewoda.ts";
import Wujas from "../characters/wujas.ts";

export default class SecondFloodMass extends Event {
  readonly id = "second-flood-mass";
  readonly name = "Second Flood Mass";
  readonly hook = "Church bells call the village to Mass in the morning rain.";
  override at(): LocationRef {
    return TheChurch;
  }

  // Also present: villagers.
  override present(): CharacterRef[] {
    return [Priest, Matrona, Painter, Wojewoda, Wujas];
  }
  override readonly hooks: EventHook[] = [
    { text: "Church bells call the village to Mass in the morning rain.", heardAt: "anywhere" },
  ];
  readonly setup = new Narrative({
    narration: [
      "ks. Pająk preaches on Habakkuk 2:11-12.",
      "The sermon says a town built on blood becomes its own witness.",
      "He says stones and beams cry out against a guilty foundation.",
      "He is no longer speaking only about 1954.",
      "He points toward the old village, the buried dead, and the valley's deeper debt.",
      "The village hears the flood framed as reckoning.",
      "This sermon fuels the mob that forms that night.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    letTheSermonStand: action({
      label: "Let the sermon stand",
      cost: [],
      narrative: new Narrative({
        narration: [
          "The sermon lands on the whole congregation and becomes part of the night's violence.",
        ],
        gives: {
          effects: todoEffect("World State Change: the mob-justice pressure rises toward The Lynch"),
        },
      }),
    }),
    challengeTheJudgmentReading: action({
      label: "Challenge the judgment reading",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The challenge gives ks. Pająk and the parish a visible alternative to judgment.",
        ],
        gives: {
          effects: todoEffect("Ending Progress: +1 to the Faith in Redemption score"),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theSermonTarget: opportunity({
      label: "The sermon target",
      target: { when: (_w, me) => me.has(Culture) || me.has(History) },
      promptedBy: [SecondFloodMass],
      narrative: new Narrative({
        narration: [
          "Habakkuk points to a settlement founded on blood, not only a personal sin.",
        ],
      }),
    }),
    theVillageReaction: opportunity({
      label: "The village reaction",
      target: { skills: [Violence] },
      promptedBy: [SecondFloodMass],
      narrative: new Narrative({
        narration: [
          "The parish is primed to seek a body to blame.",
        ],
      }),
    }),
    tadeksAttendance: opportunity({
      label: "Tadek's attendance",
      target: { skills: [Devotion] },
      promptedBy: [Wujas],
      narrative: new Narrative({
        narration: [
          "Tadek has attended every Mass since burying his sister.",
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
