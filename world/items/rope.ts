import { Item, Narrative } from "../schema.ts";

export default class Rope extends Item {
  readonly id = "rope";
  readonly name = "Rope";
  readonly hook = "A rough field rope of mixed lengths and knots.";
  readonly what = "climbing and hauling line";
  readonly description = new Narrative({
    narration: [
      "A field rope of mixed lengths and knots, rough but serviceable. It smells of sawdust, damp, and old tar. The line is long enough to cover the lower pitch and the killzone, wide enough to take a body and a charge when used as a haul.",
    ],
  });
}
