import { Item } from "../schema.ts";

export default class Penicillin extends Item {
  readonly id = "penicillin";
  readonly name = "Penicillin";
  readonly hook = "Small glass ampoules of penicillin, the store's only stock.";
  readonly what = "drug (glass ampoules)";
}
