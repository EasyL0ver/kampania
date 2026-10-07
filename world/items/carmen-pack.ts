import { Item, Narrative } from "../schema.ts";

export default class CarmenPack extends Item {
  readonly id = "carmen-pack";
  readonly name = "Pack of Carmen";
  readonly hook = "A pack of Carmen, the premium brand.";
  readonly what = "cigarettes (premium brand, a day's supply)";
  readonly description = new Narrative({
    narration: [
      "A pack of Carmen, the premium brand.",
    ],
  });
}
