import { Item, Narrative } from "../schema.ts";

export default class Penicillin extends Item {
  readonly id = "penicillin";
  readonly name = "Penicillin";
  readonly hook = "Small glass ampoules of penicillin, the store's only stock.";
  readonly what = "drug (glass ampoules)";
  readonly description = new Narrative({
    narration: [
      "A few small glass ampoules of penicillin from the store's locked cabinet, the only stock of it in the village.",
    ],
  });
}
