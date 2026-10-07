import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, Effect, EventHook, LocationRef, Tick, WorldCond } from "../schema.ts";
import { todo, todoEffect } from "../todo.ts";
import { Empathy, Finesse } from "../skills.ts";
import * as clues from "../clues.ts";
import WojewodasHouse from "../locations/wojewodas-house.ts";
import Wojewoda from "../characters/wojewoda.ts";
import Wife from "../characters/wife.ts";

export default class IrenaConfrontsWojewoda extends Event {
  readonly id = "irena-confronts-wojewoda";
  readonly name = "Irena Confronts the Wojewoda";
  readonly hook = "Raised voices are audible from inside Zbigniew Gajda's house.";
  override at(): LocationRef {
    return WojewodasHouse;
  }

  override present(): CharacterRef[] {
    return [Wojewoda, Wife];
  }
  override readonly hooks: EventHook[] = [
    { text: "Raised voices are audible from inside Zbigniew Gajda's house.", heardAt: [WojewodasHouse] },
  ];
  // When Irena pivots (her mechanic; the GM sets it).
  override condition: WorldCond = (w) => w.wife.pivoted;
  readonly setup = new Narrative({
    narration: [
      "The voices are muffled by the closed door.",
      "Irena says enough for listeners to catch that Zbigniew was there in 1954.",
      "Zbigniew answers as a man who believes the killing was necessary.",
      "Irena shifts from accusation to tactical argument.",
      "Irena uses Rezeń, the body, and 1954 to frighten Zbigniew away from public confession.",
      "By the end, the marriage closes ranks instead of breaking.",
      "The door does not open on its own.",
    ],
  });

  resolve: Tick = (w) => {
    w.wife.phase = "protector";
    w.wojewoda.braced = true;
  };

  // "Present in the house" gates are implicit: the players are at this event.

  // ------------------------------------------------------------ actions

  readonly allActions = {
    strainToCatchIt: action({
      label: "Strain to catch it",
      // TODO: cost was "Free; 1 composure to stay pressed to the wall for the whole argument".
      cost: [{ composure: 1 }],
      narrative: new Narrative({
        narration: [
          "The players do not hear a full confession, but they learn that Zbigniew is guilty of a 1954 crime, is not sorry, considered bringing it into the open, and was stopped by Irena.",
        ],
        gives: { clues: [clues.WifeProtectsHusband] },
      }),
    }),
    openTheDoor: action({
      label: "Open the door",
      cost: [],
      narrative: new Narrative({
        narration: [
          "The argument stops immediately; Zbigniew restores his public mask and Irena physically places herself between him and the players.",
        ],
        gives: {
          effects: (w) => {
            w.wife.phase = "protector";
          },
        },
      }),
    }),
    approachIrenaAfterward: action({
      label: "Approach Irena afterward",
      requires: [
        new Requirement("You didn't overhear or interrupt the fight.", {
          when: (w): boolean =>
            w.irenaConfrontsWojewoda.allActions.strainToCatchIt.done ||
            w.irenaConfrontsWojewoda.allActions.openTheDoor.done,
        }),
        new Requirement("You have to catch Irena alone.", { when: todo("catch Irena alone afterward") }),
      ],
      promptedBy: [Wife],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Irena confirms by behavior that her cooperation is over and that she will keep Zbigniew silent and protected.",
        ],
        gives: {
          clues: [clues.WifeProtectsHusband],
          effects: todoEffect("World State Change: Irena's cooperation ends and her parallel leads dry up"),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theShapeOfTheFight: opportunity({
      label: "The shape of the fight",
      target: { skills: [Finesse] },
      promptedBy: [IrenaConfrontsWojewoda],
      narrative: new Narrative({
        narration: [
          "`(requires: present in the house and Finesse)` — the fight is about something buried from 1954, and Irena is trying to stop Zbigniew from speaking openly.",
        ],
        gives: { clues: [clues.WifeProtectsHusband] },
      }),
    }),
    whoIsControllingTheOutcome: opportunity({
      label: "Who is controlling the outcome",
      target: { skills: [Empathy] },
      promptedBy: [IrenaConfrontsWojewoda],
      narrative: new Narrative({
        narration: [
          "`(requires: present in the house and Empathy)` — Zbigniew is certain, not ashamed; Irena is protecting him from the consequences of his certainty.",
        ],
        gives: { clues: [clues.WifeProtectsHusband] },
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
