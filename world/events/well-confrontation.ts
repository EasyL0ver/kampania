import { Event, Narrative, Requirement, SkillRequirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, Effect, EventHook, LocationRef, Tick, WorldCond } from "../schema.ts";
import { Culture, Empathy, Physique, Survival, Violence } from "../skills.ts";
import OldVillageRuins from "../locations/old-village-ruins.ts";
import Hag from "../characters/hag.ts";
import Butcher from "../characters/butcher.ts";
import Neighbour from "../characters/neighbour.ts";
import Wojewoda from "../characters/wojewoda.ts";
import WolfAttack from "./wolf-attack.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";

// TODO: "Wounded" (a cost on several moves) is not a Cost kind; noted per move.
export default class WellConfrontation extends Event {
  readonly id = "well-confrontation";
  readonly name = "The Well Confrontation";
  readonly hook = "From the ruins: Lemko chanting carries across the well clearing.";
  override at(): LocationRef {
    return OldVillageRuins;
  }

  // TODO: Dudka only "if the players got him here and left him his rifle"; always listed.
  override present(): CharacterRef[] {
    return [Hag, Butcher, Neighbour];
  }
  override readonly hooks: EventHook[] = [
    { text: "Lemko chanting carries across the well clearing.", heardAt: [OldVillageRuins] },
    { text: "Dogs and a man's footsteps ahead on the forest path.", heardAt: "anywhere" },
  ];
  override condition: WorldCond = (w) => w.wolfAttack.status !== "pending" && !w.hag.hostile;
  // Without player intervention or armed Dudka, Rezeń kills her.
  resolve: Tick = (w) => {
    w.hag.alive = w.hag.alive && (
      w.wellConfrontation.allActions.grabTheHagAndRun.done ||
      w.wellConfrontation.allActions.fightHim.done ||
      w.wellConfrontation.allActions.drawAFirearm.done ||
      w.wellConfrontation.allActions.shootTheRetreatingRezen.done ||
      w.wellConfrontation.allActions.dudkasRifle.done);
  };

  readonly setup = new Narrative({
    narration: [
      "Paraskewia Chyłak kneels at the well rim.",
      "Beeswax candles form a semicircle.",
      "An icon of the Theotokos faces the water.",
      "Bread, a cloth, water, herbs, and church incense are set near the rim.",
      "She chants in Lemko.",
      "Stanisław Rezeń arrives from the village path with three dogs.",
      "He carries a dead wolf.",
      "He drops the wolf near the well.",
      "He tells Paraskewia to go home.",
      "She recognizes him as the auxiliary from 1947.",
      "He does not recognize her.",
      "He circles her with a knife in his hand.",
      "The dogs watch the players' hands.",
      "If no one intervenes, he kills her, drops her and the wolf into the well, whistles the dogs, and leaves.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    grappleHim: action({
      label: "Grapple him",
      requires: [new Requirement("Not with a gun in your hand.", { when: todo("Present, no firearm") })],
      // TODO: 2 composure; 1 composure with Physique or Violence; optional Wounded
      // to take the dogs head-on. Chose 2 composure.
      cost: [{ composure: 2 }],
      narrative: new Narrative({
        narration: [
          "The player occupies Rezeń and the dogs long enough to protect another action.",
        ],
        gives: {
          clues: [clues.ButcherIsDangerous],
          effects: todoEffect("World State Change: the dogs are occupied for Fight him"),
        },
      }),
    }),
    grabTheHagAndRun: action({
      label: "Grab the hag and run",
      requires: [
        new Requirement("Not with a gun in your hand.", { when: todo("Present, no firearm") }),
        new SkillRequirement(Physique),
      ],
      // TODO: also costs Wounded.
      cost: [{ composure: 1 }],
      narrative: new Narrative({
        narration: [
          "The player carries Paraskewia Chyłak clear; Rezeń does not pursue.",
        ],
        gives: {
          effects: todoEffect("World State Change: the hag survives but is badly hurt"),
        },
      }),
    }),
    fightHim: action({
      label: "Fight him",
      requires: [
        new Requirement("Not with a gun in your hand.", { when: todo("Present, no firearm") }),
        new SkillRequirement(Violence),
        // TODO: should be "at least one OTHER player has completed Grapple him".
        new Requirement("Someone must grapple him first.", {
          when: (w): boolean => w.wellConfrontation.allActions.grappleHim.done,
        }),
      ],
      // TODO: also costs Wounded (the fighter).
      cost: [{ composure: 2 }],
      narrative: new Narrative({
        narration: [
          "The fighter drives Rezeń off while the dogs are occupied.",
        ],
        gives: {
          effects: todoEffect("World State Change: the hag survives and Rezeń knows the players' faces"),
        },
      }),
    }),
    drawAFirearm: action({
      label: "Draw a firearm",
      requires: [
        new Requirement("You aren't holding a gun.", {
          when: todo("holding a gun — Dudka's rifle or Zbigniew's pistol"),
        }),
      ],
      promptedBy: [Neighbour, Wojewoda],
      // TODO: "1 composure if the player commits to shoot".
      cost: [{ composure: 1 }],
      narrative: new Narrative({
        narration: [
          "Rezeń reads the resolve, lowers the knife, and retreats with the dogs.",
        ],
        gives: {
          effects: todoEffect("World State Change: the hag survives and Rezeń remains loose"),
        },
      }),
    }),
    shootTheRetreatingRezen: action({
      label: "Shoot the retreating Rezeń",
      requires: [
        new Requirement("Nobody has drawn on him.", {
          when: (w): boolean => w.wellConfrontation.allActions.drawAFirearm.done,
        }),
      ],
      cost: [{ composure: 2 }],
      narrative: new Narrative({
        narration: [
          "The player shoots Rezeń in the back; he crawls to the well and goes into the water.",
        ],
        gives: {
          effects: todoEffect("World State Change: Rezeń's body is in the well"),
        },
      }),
    }),
    dudkasRifle: action({
      label: "Dudka's rifle",
      requires: [
        new Requirement("Dudka isn't here with his rifle.", {
          when: todo("The players got Ryszard Dudka here and left him his rifle"),
        }),
        new Requirement("Dudka is humiliated; uplift him first.", {
          when: todo("if he is Humiliated, a player must use Uplift Ryszard"),
        }),
      ],
      promptedBy: [Neighbour],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Dudka aims at Rezeń from the trees; Rezeń backs off and leaves with the dogs.",
        ],
        gives: {
          effects: todoEffect("World State Change: the hag survives, Dudka and Rezeń can no longer pretend ignorance, and the village silence cracks"),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theRites: opportunity({
      label: "The rites",
      target: { skills: [Culture] },
      promptedBy: [WellConfrontation],
      narrative: new Narrative({
        narration: [
          "The candles, icon, bread, incense, and chant form a Lemko rite for the dead, not witchcraft.",
        ],
        gives: { clues: [clues.HagTendsTheWell] },
      }),
    }),
    theDeadWolf: opportunity({
      label: "The dead wolf",
      target: { skills: [Survival] },
      promptedBy: [WellConfrontation],
      narrative: new Narrative({
        narration: [
          "He brought the wolf here as part of a repeated pattern.",
        ],
        gives: { clues: [clues.ButcherDumpsCarcassesInWell] },
      }),
    }),
    paraskewiaHoldsPosition: opportunity({
      label: "Paraskewia holds position",
      target: { skills: [Empathy] },
      promptedBy: [WellConfrontation],
      narrative: new Narrative({
        narration: [
          "Tending the well matters to her more than leaving alive.",
        ],
      }),
    }),
    rezenWithTheKnife: opportunity({
      label: "Rezeń with the knife",
      target: { skills: [Violence] },
      promptedBy: [WellConfrontation],
      narrative: new Narrative({
        narration: [
          "He is calm, controlled, and ready to kill.",
        ],
        gives: { clues: [clues.ButcherIsDangerous] },
      }),
    }),
    theDogs: opportunity({
      label: "The dogs",
      target: { skills: [Violence] },
      promptedBy: [WellConfrontation],
      narrative: new Narrative({
        narration: [
          "One person cannot handle Rezeń and the three dogs at the same time.",
        ],
      }),
    }),
    theAmbiguousMotive: opportunity({
      label: "The ambiguous motive",
      target: { skills: [Empathy] },
      promptedBy: [WellConfrontation],
      narrative: new Narrative({
        narration: [
          "The well's compulsion and Rezeń's own appetite both fit what he is doing.",
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
