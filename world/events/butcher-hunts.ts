import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef, WorldCond } from "../schema.ts";
import { Finesse, Survival, Violence } from "../skills.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";
import VillageOutskirts from "../locations/village-outskirts.ts";
import Butcher from "../characters/butcher.ts";

export default class ButcherHunts extends Event {
  readonly id = "butcher-hunts";
  readonly name = "Stanisław Rezeń Hunts";
  readonly hook = "Stanisław Rezeń's dogs appear near places the players visit.";
  override at(): LocationRef {
    return VillageOutskirts;
  }

  override present(): CharacterRef[] {
    return [Butcher];
  }
  override readonly hooks: EventHook[] = [
    { text: "Stanisław Rezeń's dogs appear near places the players visit.", heardAt: "anywhere" },
    { text: "Stanisław Rezeń is seen watching from a distance.", heardAt: "anywhere" },
    { text: "A door is left open or something goes missing.", heardAt: "anywhere" },
    { text: "A dead animal is left on a doorstep.", heardAt: "anywhere" },
  ];
  // TODO: players investigated too deeply
  override condition: WorldCond = (w) => todo("players investigated too deeply")() || w.butcher.escalated;
  readonly setup = new Narrative({
    narration: [
      "Stanisław Rezeń tracks what the players do.",
      "Stanisław Rezeń tracks who the players talk to.",
      "Stanisław Rezeń tracks where the players go.",
      "The road is flooded.",
      "The forest edge and village edge are isolated.",
      "Stanisław Rezeń's dogs move with him.",
      "Lone players at night, near %OLD_VILLAGE%, or on the village edge are vulnerable.",
      "Stanisław Rezeń gives no direct warning before escalation.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    confrontHim: action({
      label: "Confront him",
      requires: [
        new Requirement("He hasn't moved past watching yet.", {
          when: (w) => w.butcher.escalated,
        }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Stanisław Rezeń goes cold under pressure; his knife and dogs are ready before he raises his voice.",
        ],
        gives: { clues: [clues.ButcherIsDangerous] },
      }),
    }),
    useZbigniewGajda: action({
      label: "Use Zbigniew Gajda",
      requires: [
        new Requirement("You can't reach Zbigniew in time.", {
          when: todo("Access to Zbigniew Gajda before a direct attack."),
        }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Zbigniew Gajda intervenes and Stanisław Rezeń pauses the escalation.",
        ],
        gives: {
          effects: todoEffect("NPC State Change: Zbigniew Gajda is now actively restraining Stanisław Rezeń."),
        },
      }),
    }),
    turnTheVillageAgainstHim: action({
      label: "Turn the village against him",
      requires: [
        new Requirement("The village won't accept what you have.", {
          when: todo("Evidence the village will accept against Stanisław Rezeń."),
        }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Stanisław Rezeń loses the village's passive tolerance.",
        ],
        gives: {
          effects: todoEffect(
            "World State Change: Stanisław Rezeń is exposed as a direct threat rather than a tolerated outcast.",
          ),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    dogsNearTheCommittee: opportunity({
      label: "Dogs near the committee",
      target: { skills: [Survival] },
      promptedBy: [ButcherHunts],
      narrative: new Narrative({
        narration: [
          "The same dogs appear near multiple places the players visit.",
        ],
      }),
    }),
    watcherAtDistance: opportunity({
      label: "Watcher at distance",
      target: { skills: [Finesse] },
      promptedBy: [ButcherHunts],
      narrative: new Narrative({
        narration: [
          "Stanisław Rezeń is present often enough that coincidence is unlikely.",
        ],
      }),
    }),
    wordlessIntimidation: opportunity({
      label: "Wordless intimidation",
      target: { skills: [Violence] },
      promptedBy: [ButcherHunts],
      narrative: new Narrative({
        narration: [
          "Missing items, open doors, or dead animals are threats without written messages.",
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
