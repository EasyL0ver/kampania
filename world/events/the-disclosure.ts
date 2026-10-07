import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef } from "../schema.ts";
import { Finesse, Speech } from "../skills.ts";
import WojewodasHouse from "../locations/wojewodas-house.ts";
import Wojewoda from "../characters/wojewoda.ts";
import Neighbour from "../characters/neighbour.ts";
import Foreman from "../characters/foreman.ts";
import Zofia from "../characters/zofia.ts";
import Barbara from "../characters/barbara.ts";
import Matrona from "../characters/matrona.ts";
import Junior from "../characters/junior.ts";
import Priest from "../characters/priest.ts";
import OperatorRefusesHelp from "./operator-refuses-help.ts";
import { todo, todoEffect } from "../todo.ts";

// Form A ("called"): Zbigniew called the gathering and speaks from the step.
// Form B ("crowd"): the crowd assembled itself and turns on him.
type DisclosureForm = "called" | "crowd";

export default class TheDisclosure extends Event {
  readonly id = "the-disclosure";
  readonly name = "The Disclosure";
  readonly hook = "Voices gather in the rain.";

  // TODO: route (enlisted / forced / broken) decides the form; nothing sets
  // `form` yet. Enlisted and forced → "called", broken → "crowd".
  form: DisclosureForm = "called";
  // The truth (how long the danger was known) has broken in front of the crowd.
  truthBroken = false;

  // Scene is the yard and square outside the sołtys office.
  override at(): LocationRef {
    return WojewodasHouse;
  }

  // Also: villagers.
  override present(): CharacterRef[] {
    return [Wojewoda, Neighbour, Foreman, Zofia, Barbara, Matrona, Junior, Priest];
  }
  override readonly hooks: EventHook[] = [
    { text: "Voices gather in the rain; doors open across the village; people call toward the sołtys office.", heardAt: "anywhere" },
  ];
  // TODO: also "after proof that %NEW_VILLAGE% will flood exists and the truth breaks".

  readonly setup = new Narrative({
    narration: [
      "The scene happens in the muddy yard and square outside the sołtys office.",
      "Form A: Zbigniew called the gathering.",
      "In Form A, Zbigniew stands on the office step above the crowd.",
      "In Form A, he says %NEW_VILLAGE% will flood.",
      "In Form A, he does not say how long it was known.",
      "In Form A, he promises compensation, relocation, and state help.",
      "If enlisted, he names the players as the ones who found the danger in time.",
      "If forced, he does not name the players.",
      "In Form A, the village still listens to him.",
      "Form B: the crowd assembled itself.",
      "In Form B, Zbigniew is behind a shut door or forced into a yard that is turning on him.",
      "In Form B, the crowd accuses the state and the committee of lying.",
      "In Form B, Dudka is loudest.",
      "In either form, the rising water gives the scene a time limit.",
      "Stefania Kopacz is not present; she stays in her house.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    backZbigniewsLine: action({
      label: "Back Zbigniew's line",
      requires: [
        new Requirement("Zbigniew did not call this gathering.", { when: (w) => w.theDisclosure.form === "called" }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Players reinforce his framing: there is a plan, the state will help, and people must move in order.",
        ],
        gives: {
          effects: todoEffect("World State Change: the disclosure lands as orderly evacuation footing"),
        },
      }),
    }),
    tellTheWholeTruth: action({
      label: "Tell the whole truth",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "A player says the state knew the danger and reassured the village anyway.",
        ],
        gives: {
          // TODO: not modelled: "World State Change: the disclosure curdles toward panic and
          // every-family-for-itself; NPC State Change: Dudka becomes dangerous"
          effects: (w) => {
            w.theDisclosure.truthBroken = true;
          },
        },
      }),
    }),
    faceTheCrowdWithAPlan: action({
      label: "Face the crowd with a plan",
      requires: [
        new Requirement("The truth hasn't broken yet.", {
          when: (w) => w.theDisclosure.form === "crowd" || w.theDisclosure.truthBroken,
        }),
        new Requirement("You have no credible plan to offer.", {
          when: todo("a credible evacuation route, army rescue, or place to send people"),
        }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Players take the anger and give the crowd logistics instead of blame.",
        ],
        gives: {
          effects: todoEffect("World State Change: fear turns toward movement | World State Change: the crowd remains angry but usable for evacuation"),
        },
      }),
    }),
    faceTheCrowdWithoutAPlan: action({
      label: "Face the crowd without a plan",
      requires: [
        new Requirement("The truth hasn't broken yet.", {
          when: (w) => w.theDisclosure.form === "crowd" || w.theDisclosure.truthBroken,
        }),
        new Requirement("You do have a plan; use it.", {
          when: todo("no credible route or deliverable promise"),
        }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Players admit the lie or redirect blame without offering safety.",
        ],
        gives: {
          effects: todoEffect("World State Change: anger settles on the players, Zbigniew, or the distant state | World State Change: risk of violence against the players rises"),
        },
      }),
    }),
    forceZbigniewToAnswerTheCrowd: action({
      label: "Force Zbigniew to answer the crowd",
      requires: [
        new Requirement("The crowd isn't against him yet.", { when: (w) => w.theDisclosure.form === "crowd" }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The crowd's question turns onto Zbigniew.",
        ],
        gives: {
          effects: todoEffect("NPC State Change: Zbigniew Gajda becomes an open antagonist toward the players | World State Change: heat splits off the players if the move lands, or returns to them harder if it fails"),
        },
      }),
    }),
    calmItDown: action({
      label: "Calm it down",
      requires: [
        new Requirement("You have no way out to offer.", {
          when: todo("A credible way out: evacuation plan, the phone line to the army, or somewhere people can go."),
        }),
      ],
      promptedBy: [OperatorRefusesHelp],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Players turn the gathering into evacuation logistics: who goes first, where people muster, and when they move.",
        ],
        gives: {
          effects: todoEffect("World State Change: the scene resolves toward evacuation footing instead of riot"),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theCrowdFracture: opportunity({
      label: "The crowd fracture",
      target: { skills: [Speech] },
      promptedBy: [TheDisclosure],
      narrative: new Narrative({
        narration: [
          "Dudka wants someone to hit; Marek sees a way out; Zofia is ready to leave; Pytlak wants to fight the water; Barbara is terrified; Helena follows Zbigniew's cue.",
        ],
      }),
    }),
    zbigniewsSpentAuthority: opportunity({
      label: "Zbigniew's spent authority",
      trigger: (w) => w.theDisclosure.form === "called",
      target: { skills: [Finesse] },
      promptedBy: [TheDisclosure],
      narrative: new Narrative({
        narration: [
          "`(requires: Finesse and Form A)` — he is spending authority he cannot replace. Public contradiction can break the gathering.",
        ],
      }),
    }),
    theUnaskedQuestion: opportunity({
      label: "The unasked question",
      target: { skills: [Speech] },
      promptedBy: [TheDisclosure],
      narrative: new Narrative({
        narration: [
          "The crowd wants to know how long the danger was known. The honest answer can turn the gathering into a mob.",
        ],
      }),
    }),
    thePriestsWeight: opportunity({
      label: "The priest's weight",
      target: { skills: [Finesse] },
      promptedBy: [TheDisclosure],
      narrative: new Narrative({
        narration: [
          "The crowd checks ks. Władysław Pająk. A word from him can bless evacuation or violence.",
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
