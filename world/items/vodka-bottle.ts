import { Item, Narrative } from "../schema.ts";

export default class VodkaBottle extends Item {
  readonly id = "vodka-bottle";
  readonly name = "Bottle of vodka";
  readonly hook = "A bottle of state vodka from the store.";
  readonly what = "drink (shop vodka)";
  readonly description = new Narrative({
    narration: [
      "A bottle of state vodka from the store.",
    ],
  });
}
