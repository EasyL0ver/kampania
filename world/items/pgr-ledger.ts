import { Item, Narrative, Requirement, action } from "../schema.ts";
import * as clues from "../clues.ts";

export default class PgrLedger extends Item {
  readonly id = "pgr-ledger";
  readonly name = "PGR Worker Registry";
  readonly hook = "An official farm-worker register: names, jobs, daily rates, totals.";
  readonly what = "farm worker registry (document)";
  readonly description = new Narrative({
    narration: [
      "The 1967 staff and pay register for the farm — eight names, positions, daily rates, and a monthly cost summary. Kept by the Foreman. Cross-checked against the villagers players have actually met, one name on it belongs to no one you can find on the farm.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // TODO: "If confronted, Michał Pytlak enters Stage 1 deflection" is a follow-up
    // on the foreman, not this action's outcome; left in prose.
    crossCheckTheNames: action({
      label: "Cross-check the names",
      requires: [new Requirement("You don't have the registry.", { items: [PgrLedger] })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "One listed labourer — Tadeusz Mazur — draws a full daily wage but no one on the farm answers to him or has seen him work. Gives `mazur-paid-but-absent`. If confronted, Michał Pytlak enters Stage 1 deflection.",
        ],
        gives: { clues: [clues.MazurPaidButAbsent] },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }
}
