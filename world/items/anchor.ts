import { Item, Narrative } from "../schema.ts";

export default class Anchor extends Item {
  readonly id = "anchor";
  readonly name = "Anchor and Hammer";
  readonly hook = "A short steel clamp and a battered hammer, kept together as a field set.";
  readonly what = "clamp and driving hammer for the crux";
  readonly description = new Narrative({
    narration: [
      "A short steel clamp and a battered hammer, kept together as a single field set. The clamp is driven into the shale seam under the overhang; the hammer drives it home. Once planted, the seam becomes a fixed point and a party can seat the charge clean rather than free-soloing the slab in the rain.",
    ],
  });
}
