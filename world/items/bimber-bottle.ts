import { Item, Narrative } from "../schema.ts";

export default class BimberBottle extends Item {
  readonly id = "bimber-bottle";
  readonly name = "Bottle of bimber";
  readonly hook = "An unlabelled bottle of home-distilled bimber.";
  readonly what = "drink (moonshine from the still)";
  readonly description = new Narrative({
    narration: [
      "An unlabelled bottle of home-distilled bimber.",
    ],
  });
}
