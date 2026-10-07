import { Item, Narrative, Requirement, action } from "../schema.ts";
import * as clues from "../clues.ts";
import MartaKonieczna from "../characters/marta-konieczna.ts";

export default class PgrExpenses extends Item {
  readonly id = "pgr-expenses";
  readonly name = "PGR Expense Journal";
  readonly hook = "A worn farm expense ledger: rows of dates, payees, amounts.";
  readonly what = "farm expense journal (document)";
  readonly description = new Narrative({
    narration: [
      "A worn ledger of non-payroll farm spending — seed, transport, repairs, vet bills, seasonal slaughter — running 1950–1967. Page after page of ordinary numbers in a bookkeeper's hand. Nothing looks wrong until you know what you're reading against. Familiar village names recur (Gajda, Rezeń, Dudka, Rzepka) and make the two names that matter easy to skim past.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    readThe1965Entries: action({
      label: "Read the 1965 entries",
      requires: [new Requirement("You don't have the journal.", { items: [PgrExpenses] })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "May 1965: a silo repair, then one week later the largest single expense in the journal — an emergency grain purchase because the silo's contents were \"lost.\" A broken silo, grain gone, the biggest bill in years — and not one medical or hospital cost anywhere near it.",
        ],
        gives: { clues: [clues.LargeGrainPurchase] },
      }),
    }),
    // TODO: the Markdown has no Gives line; the outcome hands over Marta Konieczna's
    // surname. Modelled as awareness of her; no clue exists for "her surname is Konieczna".
    findTheNameKoniecznaMarta: action({
      label: "Find the name \"Konieczna, Marta\"",
      requires: [new Requirement("You don't have the journal.", { items: [PgrExpenses] })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "A single 1953 payment: \"Konieczna, Marta — mending work clothes.\" Her initials, M.K., match the love letters from the buried cache at Ciotka's house. This is the only place her full name is written down. It corroborates the M.K. thread and gives players the surname behind Marta Konieczna — the name the village erased.",
        ],
        gives: { aware: [MartaKonieczna] },
      }),
    }),
    traceTheBrickAndMasonry: action({
      label: "Trace the brick and masonry",
      requires: [new Requirement("You don't have the journal.", { items: [PgrExpenses] })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "1960: the farm buys 4,000 red bricks and pays a mason for \"worker housing\" — the only brick spending in the ledger. The village has one brick house: Barbara Kopacz's. State money built a labourer's house.",
        ],
        gives: { clues: [clues.BarbaraHasHelp] },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }
}
