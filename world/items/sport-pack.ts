import { Item, Narrative } from "../schema.ts";

export default class SportPack extends Item {
  readonly id = "sport-pack";
  readonly name = "Pack of Sport";
  readonly hook = "A pack of Sport, the cheap brand most of the valley smokes.";
  readonly what = "cigarettes (cheap brand, a day's supply)";
  readonly description = new Narrative({
    narration: [
      "A pack of Sport, the cheap brand most of the valley smokes.",
    ],
  });
}
