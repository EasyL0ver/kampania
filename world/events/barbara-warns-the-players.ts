import { Event, Narrative, action, opportunity } from "../schema.ts";
import type { CharacterRef, Effect, EventHook, LocationRef, Tick, WorldCond } from "../schema.ts";
import { Empathy, Finesse, Violence } from "../skills.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";
import BarbarasHouse from "../locations/barbaras-house.ts";
import Barbara from "../characters/barbara.ts";
import PunishmentLynch from "./punishment-lynch.ts";

export default class BarbaraWarnsThePlayers extends Event {
  readonly id = "barbara-warns-the-players";
  readonly name = "Barbara Warns the Players";
  readonly hook = "Barbara Kopacz comes to the committee or catches a trusted player in a yard.";
  // TODO: she may find the trusted player "in a yard"; the Markdown links her house.
  override at(): LocationRef {
    return BarbarasHouse;
  }

  override present(): CharacterRef[] {
    return [Barbara];
  }
  override readonly hooks: EventHook[] = [
    { text: "Barbara Kopacz comes to the committee or catches a trusted player in a yard.", heardAt: "anywhere" },
    { text: "Barbara Kopacz has no cardigan and is muddy to the shins.", heardAt: "anywhere" },
    { text: "Barbara Kopacz is out of breath from running.", heardAt: "anywhere" },
  ];
  // TODO: at least one player has Bond with Barbara
  override condition: WorldCond = (_w) => todo("at least one player has Bond with Barbara")();
  readonly setup = new Narrative({
    narration: [
      "Barbara Kopacz keeps looking toward the fence line and Ryszard Dudka's house.",
      "Barbara Kopacz grips the trusted player's arm tightly.",
      "Barbara Kopacz says Ryszard Dudka has been drinking.",
      "Barbara Kopacz says men have been at Ryszard Dudka's place.",
      "Barbara Kopacz says Ryszard Dudka took down, cleaned, and did not replace his rifle.",
      "Barbara Kopacz says Ryszard Dudka spoke about someone finally answering for what they did.",
      "Barbara Kopacz says Ryszard Dudka did not come to the fence tonight.",
      "Barbara Kopacz does not know she has been passing the committee's information to Ryszard Dudka.",
    ],
  });
  composure = 1;

  resolve: Tick = todoEffect("Barbara Kopacz stands with Ryszard Dudka when the mob forms.");

  // ------------------------------------------------------------ actions

  readonly allActions = {
    getTheTimingOutOfHer: action({
      label: "Get the timing out of her",
      cost: [],
      // TODO: "with advance warning before nightfall" not modelled.
      narrative: new Narrative({
        narration: [
          "Barbara Kopacz confirms the men gathered tonight, the rifle is gone, and Ryszard Dudka is not at the fence.",
        ],
        gives: { aware: [PunishmentLynch] },
      }),
    }),
    sendHerHome: action({
      label: "Send her home / keep her clear",
      cost: [],
      narrative: new Narrative({
        narration: [
          "Barbara Kopacz goes home, locks the door, and keeps Pawełek Kopacz inside.",
        ],
        gives: { effects: todoEffect("NPC State Change: Barbara Kopacz stays clear of the lynch.") },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    thePreparation: opportunity({
      label: "The preparation",
      target: { skills: [Violence] },
      promptedBy: [BarbaraWarnsThePlayers],
      narrative: new Narrative({
        narration: [
          "Barbara Kopacz is describing preparations, not a mood.",
        ],
        gives: { clues: [clues.NeighbourHasRifle] },
      }),
    }),
    theVerdictPhrase: opportunity({
      label: "The verdict phrase",
      target: { skills: [Finesse] },
      promptedBy: [BarbaraWarnsThePlayers],
      narrative: new Narrative({
        narration: [
          "The phrase about someone answering for what they did sounds like a verdict, not grief.",
        ],
      }),
    }),
    barbarasFear: opportunity({
      label: "Barbara's fear",
      target: { skills: [Empathy] },
      promptedBy: [BarbaraWarnsThePlayers],
      narrative: new Narrative({
        narration: [
          "Barbara Kopacz is afraid for Ryszard Dudka, not afraid of him.",
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
