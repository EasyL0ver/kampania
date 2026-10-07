import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, Effect, EventHook, LocationRef, Tick, WorldCond } from "../schema.ts";
import { Empathy, Survival, Violence } from "../skills.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";
import OldVillageRuins from "../locations/old-village-ruins.ts";
import Neighbour from "../characters/neighbour.ts";
import Butcher from "../characters/butcher.ts";
import HuntWithRezen from "./hunt-with-rezen.ts";
import HuntWithDudka from "./hunt-with-dudka.ts";

export default class HuntersCrossPaths extends Event {
  readonly id = "hunters-cross-paths";
  readonly name = "The Hunters Cross Paths";
  readonly hook = "A rifleman confronting a knife-wielding hunter as dogs scatter through the clearing.";
  override at(): LocationRef {
    return OldVillageRuins;
  }

  // Players: with whichever hunter they followed.
  override present(): CharacterRef[] {
    return [Neighbour, Butcher];
  }
  override readonly hooks: EventHook[] = [
    { text: "A rifleman confronting a knife-wielding hunter as dogs scatter through the clearing.", heardAt: [OldVillageRuins] },
  ];
  override condition: WorldCond = (w) => (w.huntWithRezen.status === "running" || w.huntWithDudka.status === "running"); // TODO: during hunt gate
  readonly setup = new Narrative({
    narration: [
      "Dudka is hidden with his rifle trained on the wolves.",
      "The wolves are in the open and unaware of Dudka.",
      "Rezeń's three dogs crash through the brush and drive the wolves into the trees.",
      "Dudka's shot is lost.",
      "Dudka confronts Rezeń with the rifle in his hands.",
      "Rezeń goes still, keeps his knife in hand, and lets the dogs fan out around him.",
      "Both men are close enough to violence that one wrong movement can start a killing.",
    ],
  });

  // Unless someone got between them, Rezeń humiliates Dudka.
  resolve: Tick = (w) => {
    w.neighbour.humiliated = w.neighbour.humiliated || !w.huntersCrossPaths.allActions.getBetweenThem.done;
  };

  // ------------------------------------------------------------ actions

  readonly allActions = {
    getBetweenThem: action({
      label: "Get between them",
      requires: [
        new Requirement("Someone has to step in or order them down.", {
          when: todo("A player steps into the gap or clearly orders both men down"),
        }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The standoff ends before blood is drawn; Rezeń pockets the knife and Dudka is denied the public humiliation of losing to him.",
        ],
        gives: {
          clues: [clues.ButcherIsDangerous],
          effects: todoEffect("World State Change: Dudka and Rezeń are separated with no one hurt"),
        },
      }),
    }),
    // TODO: "Let it burn" and "Get between them" should be mutually exclusive.
    letItBurn: action({
      label: "Let it burn",
      requires: [
        new Requirement("You chose to intervene.", { when: todo("The players choose not to intervene") }),
      ],
      promptedBy: [clues.DudkaDespisesRezen],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Rezeń ends the standoff by mocking Dudka for failing to stop him in the past; Dudka is publicly humiliated and Rezeń leaves with his dogs.",
        ],
        gives: {
          clues: [clues.ButcherIsDangerous, clues.DudkaDespisesRezen, clues.RezenMocksAnOldFailure],
          effects: (w) => {
            w.neighbour.humiliated = true;
            // TODO: also "Ending Progress: Dudka moves closer to the lynch ending"
          },
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theStandoff: opportunity({
      label: "The standoff",
      target: { skills: [Violence] },
      promptedBy: [HuntersCrossPaths],
      narrative: new Narrative({
        narration: [
          "Dudka is louder, but Rezeń is the one ready to kill.",
        ],
        gives: { clues: [clues.ButcherIsDangerous] },
      }),
    }),
    dudkasFury: opportunity({
      label: "Dudka's fury",
      target: { skills: [Empathy] },
      promptedBy: [clues.RezenHuntsWolves],
      narrative: new Narrative({
        narration: [
          "Dudka openly names Rezeń as more dangerous than the wolves.",
        ],
        gives: { clues: [clues.DudkaDespisesRezen] },
      }),
    }),
    // TODO: same gate and clue as theStandoff; consider merging.
    rezensCold: opportunity({
      label: "Rezeń's cold",
      target: { skills: [Violence] },
      promptedBy: [HuntersCrossPaths],
      narrative: new Narrative({
        narration: [
          "Rezeń's breathing stays even, his eyes stay flat, and the knife is already out.",
        ],
        gives: { clues: [clues.ButcherIsDangerous] },
      }),
    }),
    theDogs: opportunity({
      label: "The dogs",
      target: { skills: [Survival] },
      promptedBy: [HuntersCrossPaths],
      narrative: new Narrative({
        narration: [
          "If the standoff turns violent, it will be Rezeń and three trained dogs against Dudka.",
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
