import { Item, Narrative } from "../schema.ts";

// The Markdown has empty Opportunities/Actions sections: no moves yet.
export default class PgrInventory extends Item {
  readonly id = "pgr-inventory";
  readonly name = "PGR Inventory";
  // TODO: hook shortened from the Markdown (128 chars); full line in prose.
  readonly hook = "A blank state stock-take form, columns \"declared\" and \"counted,\" for livestock, grain, machinery, stores.";
  readonly what = "blank farm stock-take form the committee fills out (document)";
  readonly description = new Narrative({
    narration: [
      "An empty remanent form the committee must complete before the farm can be evacuated. Fixed works are out of scope: the barns, the silo shell, the ditch, all written off to the water. Everything movable has to be found, counted, and signed for. The farm's own carried-forward figures are printed in the left column; the right column is blank for the committee's count. Under socialist accounting the two are supposed to balance. The work is walking the farm and filling every line.",
    ],
  });
}
