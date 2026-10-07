import { Character, CharacterDescription, Narrative, Requirement, action, anyone, opportunity } from "../schema.ts";
import type { Checks, LocationRef } from "../schema.ts";
import { Empathy } from "../skills.ts";
import WojewodasHouse from "../locations/wojewodas-house.ts";
import { todo, todoEffect } from "../todo.ts";

// Mechanic "Two Phases": rival investigator, then Zbigniew's protector after
// irena-confronts-wojewoda (that event should set phase = "protector").
export type Phase = "investigating" | "protector";

export default class Wife extends Character {
  readonly id = "wife";
  readonly name = "Irena Gajda";
  readonly description = new CharacterDescription({
    narration: ["Irena Gajda, the sołtys's wife."],
    clothes: "Pressed blouses, wool skirts without patches; dresses better than most village women.",
    hairAndFace: "Dark hair pulled back in a severe bun going grey at the temples; angular face, high cheekbones.",
    carriage: "Tall, straight posture; hands always busy while her eyes watch the room.",
    gives: { aware: [Wife] },
  });

  readonly role = "the sołtys's wife / shadow investigator";
  livesAt: LocationRef = WojewodasHouse;

  // ------------------------------------------------------------ state

  phase: Phase = "investigating";
  // She has connected Zbigniew to the 1954 killing. GM-timed from player
  // behaviour (her mechanic) and it may never happen; starts Irena Confronts.
  pivoted = false;

  // TODO: Phase 1 "trades cautiously with players who treat her as a peer;
  // shares nothing with players who patronize her" not modelled (per-player?).

  // ------------------------------------------------------------ actions

  readonly allActions = {
    tradeClues: action({
      label: "Trade clues (Phase 1)",
      requires: [
        new Requirement("She has closed ranks around her husband.", { when: (w) => w.wife.phase === "investigating" }),
        new Requirement("You have nothing new on 1954 to trade.", {
          when: todo("a 1954 clue she does not already hold"),
        }),
      ],
      cost: [{ time: 1 }],
      // TODO: gives one clue of the GM's choice (e.g. jagna-painter-affair or
      // ciotka-lives-in-soldiers-house); not modelled as a fixed clue.
      narrative: new Narrative({
        narration: [
          "She waits for a real fact before she gives one back. Once the players put a useful clue on the table, she trades one for one.",
        ],
        gives: {
          effects: todoEffect(
            "NPC State Change: Irena becomes a wary rival who will trade | one clue she can spare, GM's choice — e.g. jagna-painter-affair or ciotka-lives-in-soldiers-house",
          ),
        },
      }),
    }),
    censusInterview: action({
      label: "Census interview",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She gives precise household details: names, ages, employment, no wasted words.",
        ],
        gives: { effects: (w) => { w.wife.censusTaken = true; } },
      }),
    }),
    propertyAssessment: action({
      label: "Property assessment",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She says the house is her husband's and the papers are in order.",
        ],
        gives: {
          // TODO: also "NPC State Change: Irena grows watchful of the committee unless the flood is openly disclosed"
          effects: (w) => { w.wife.propertyRecorded = true; },
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    avoidedThread: opportunity({
      label: "Avoided thread",
      trigger: (w) => w.wife.phase === "investigating" && w.wife.allActions.tradeClues.done,
      target: { skills: [Empathy] },
      narrative: new Narrative({
        narration: [
          "She trades on anyone except her own husband; his name never comes up, and she changes direction when it nears.",
        ],
      }),
    }),
    committeeScrutiny: opportunity({
      label: "Committee scrutiny",
      // TODO: also requires "flood not openly disclosed" — not modelled.
      trigger: (w) => w.wife.allActions.propertyAssessment.done,
      target: anyone,
      narrative: new Narrative({
        narration: [
          "Her questions sharpen around why land is being valued.",
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

  // ------------------------------------------------------------ bond / grudge

  bond: Checks = [
    "Share information with her that her husband withheld",
    "Ask her opinion on something investigative",
    "Be honest with her when caught in a contradiction",
  ];

  grudge: Checks = [
    "Speak to her in a patronizing or dismissive tone",
    "Side with Zbigniew in a disagreement in her presence",
    "Ignore or brush off one of her pointed hints",
  ];
}
