import { Event, Narrative, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef, WorldCond } from "../schema.ts";
import { Empathy, Finesse } from "../skills.ts";
import TheStore from "../locations/the-store.ts";
import Wojewoda from "../characters/wojewoda.ts";
import Butcher from "../characters/butcher.ts";
import HuntWithRezen from "./hunt-with-rezen.ts";
import { todo } from "../todo.ts";

export default class WojewodaConfrontsButcher extends Event {
  readonly id = "wojewoda-confronts-butcher";
  readonly name = "Wojewoda Confronts the Butcher";
  readonly hook = "Players near the village centre see Zbigniew walking toward Rezeń.";
  override at(): LocationRef {
    return TheStore;
  }

  override present(): CharacterRef[] {
    return [Wojewoda, Butcher];
  }
  override readonly hooks: EventHook[] = [
    { text: "Players near the village centre see Zbigniew walking toward Rezeń.", heardAt: "anywhere" },
  ];
  override condition: WorldCond = (w) => w.huntWithRezen.status !== "pending";
  readonly setup = new Narrative({
    narration: [
      "Zbigniew confronts Rezeń in public.",
      "Zbigniew orders him to go home.",
      "Rezeń does not comply.",
      "Rezeń smokes and handles his knife.",
      "Rezeń watches Zbigniew without deference.",
      "Zbigniew repeats the order.",
      "Rezeń stays.",
      "Zbigniew leaves first.",
      "Villagers who see it understand that Zbigniew failed to move him.",
    ],
  });

  // Markdown lists no actions ("None.").

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    powerDynamic: opportunity({
      label: "Power dynamic",
      target: { skills: [Finesse] },
      promptedBy: [WojewodaConfrontsButcher],
      narrative: new Narrative({
        narration: [
          "The sołtys gives an order and the butcher ignores it.",
        ],
      }),
    }),
    // TODO: "speaking to Zbigniew Gajda" not modelled.
    zbigniewAfter: opportunity({
      label: "Zbigniew after",
      target: { skills: [Empathy], when: todo("speaking to Zbigniew Gajda") },
      promptedBy: [WojewodaConfrontsButcher, Wojewoda],
      narrative: new Narrative({
        narration: [
          "`(requires: Empathy and speaking to Zbigniew Gajda)` — he is more rattled than the public exchange warrants.",
        ],
      }),
    }),
    // TODO: "speaking to Stanisław Rezeń" not modelled.
    rezenAfter: opportunity({
      label: "Rezeń after",
      target: { skills: [Empathy], when: todo("speaking to Stanisław Rezeń") },
      promptedBy: [WojewodaConfrontsButcher, Butcher],
      narrative: new Narrative({
        narration: [
          "`(requires: Empathy and speaking to Stanisław Rezeń)` — he is pleased that the order failed.",
        ],
      }),
    }),
    villagersAfter: opportunity({
      label: "Villagers after",
      target: { skills: [Finesse] },
      promptedBy: [WojewodaConfrontsButcher],
      narrative: new Narrative({
        narration: [
          "They have not seen Zbigniew fail to move someone before.",
        ],
      }),
    }),
  };

  override get opportunities() {
    return this.allOpportunities;
  }
}
