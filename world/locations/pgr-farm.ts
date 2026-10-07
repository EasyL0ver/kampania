import { Location, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";
import { Bureaucracy, Handiwork } from "../skills.ts";
import Foreman from "../characters/foreman.ts";
import Barbara from "../characters/barbara.ts";
import JozefNowak from "../characters/secondary/jozef-nowak.ts";
import PiotrWisniewski from "../characters/secondary/piotr-wisniewski.ts";
import TheIrrigationDitch from "./the-irrigation-ditch.ts";
import PgrLedger from "../items/pgr-ledger.ts";
import PgrExpenses from "../items/pgr-expenses.ts";
import WolfAttack from "../events/wolf-attack.ts";
import HuntWithRezen from "../events/hunt-with-rezen.ts";
import HuntWithDudka from "../events/hunt-with-dudka.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";

export default class PgrFarm extends Location {
  readonly id = "pgr-farm";
  readonly name = "The PGR Farm";
  readonly hook = "The State Agricultural Farm: fields, barns, livestock pens, tool shed.";
  readonly position = "State Agricultural Farm: fields, barns, pens, tool shed";
  readonly visitCost = 1;
  // Michał by day, Barbara in working hours, Józef and Piotr variable (not modelled).
  override present(): CharacterRef[] {
    return [Foreman, Barbara, JozefNowak, PiotrWisniewski];
  }

  readonly setup = new Narrative({
    narration: [
      "The farm has two long barns, a concrete grain silo, a tool shed, livestock pens, and ploughed fields running toward the tree line.",
      "One side of the concrete grain silo carries a patch of newer, cruder concrete.",
      "A concrete-headed irrigation ditch runs off the fields toward the low ground; Zbigniew Gajda calls it the village's flood drain. Following it its full length is its own scene: The Irrigation Ditch.",
      "Chickens move between the buildings.",
      "The office is in the main building.",
      "The workers' quarters sit behind the main buildings.",
      "Michał Pytlak works in the fields, barns, or feed areas during the day.",
      "Józef Nowak and Piotr Wiśniewski keep working unless addressed.",
      "Barbara Kopacz works apart from the men.",
      "A battered wooden desk in the tool shed holds supply orders, receipts, delivery slips, the worker registry, and the expense journal.",
      "The farm has 7 real workers present or accounted for.",
      "The ledger lists 8 workers.",
      "Bloodstains, patched fences, and nervous animals are visible from Day 1.",
      "Day 1–2: fresh wolf damage may bring Zbigniew Gajda to the farm.",
    ],
    gives: { aware: [PgrFarm] },
  });

  // TODO: **Available:** "Daytime, any day. Repeatable." not modelled.
  // "Talk to Michał Pytlak" is a cross-reference to characters/foreman.md: prose only.

  // ------------------------------------------------------------ actions

  readonly allActions = {
    inspectTheFarmBooks: action({
      label: "Inspect the farm books",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The farm books show mostly ordinary farm spending, plus Tadeusz Mazur listed as a current worker drawing wages with no work logs for the past two years.",
        ],
        gives: { clues: [clues.MazurPaidButAbsent], items: [PgrLedger, PgrExpenses] },
      }),
    }),
    // "Scene Unlock" of a location → aware. TODO: source cost "See The Irrigation
    // Ditch"; set free here, the ditch's own visitCost applies.
    walkTheIrrigationDitch: action({
      label: "Walk the irrigation ditch",
      cost: [],
      narrative: new Narrative({
        narration: [
          "Walking the ditch its full length is its own scene. See The Irrigation Ditch, which gives ditch-concrete-stops-short.",
        ],
        gives: { aware: [TheIrrigationDitch] },
      }),
    }),
    talkToBarbaraKopacz: action({
      label: "Talk to Barbara Kopacz",
      requires: [new Requirement("Barbara isn't at work right now.", { when: todo("Barbara Kopacz present during working hours") })],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Barbara answers questions about work, refuses to discuss Pawełek Kopacz's father, and becomes slightly more willing to speak if treated kindly.",
        ],
        gives: { effects: todoEffect("NPC State Change: Barbara Kopacz becomes more open to future contact, including access to Stefania Kopacz.") },
      }),
    }),
    offerToHelpWithFarmWork: action({
      label: "Offer to help with farm work",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The committee works alongside the farm workers.",
        ],
        gives: { effects: todoEffect("NPC State Change: Michał Pytlak and the workers treat the committee as useful labour | World State Change: village outskirts survey trips are reduced by 1.") },
      }),
    }),
    // TODO: cost "Free for inspection; 1 action to join the hunt" — set free; the hunts cost inside their scenes.
    reportWolfDamage: action({
      label: "Report wolf damage",
      requires: [new Requirement("There's no wolf damage to see yet.", { when: todo("Day 1+ and wolf damage visible") })],
      promptedBy: [PgrFarm],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Michał shows dead sheep, patched fences, and tracks.",
        ],
        gives: { aware: [WolfAttack, HuntWithRezen, HuntWithDudka], clues: [clues.WolvesAttackingLivestock] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    workerCountMismatch: opportunity({
      label: "Worker count mismatch",
      target: { skills: [Bureaucracy] },
      narrative: new Narrative({
        narration: [
          "One ledger name does not match any worker present or recognized on the farm.",
        ],
        gives: { clues: [clues.MazurPaidButAbsent] },
      }),
    }),
    wolfDamage: opportunity({
      label: "Wolf damage",
      target: { skills: [Handiwork] },
      promptedBy: [PgrFarm],
      narrative: new Narrative({
        narration: [
          "The livestock pens show repeated wolf attacks over several weeks.",
        ],
        gives: { clues: [clues.WolvesAttackingLivestock] },
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
