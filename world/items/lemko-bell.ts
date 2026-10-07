import { Item, Narrative } from "../schema.ts";

export default class LemkoBell extends Item {
  readonly id = "lemko-bell";
  readonly name = "Lemko Bell";
  readonly hook = "A small brass bell with Cyrillic lettering around the rim.";
  readonly what = "evidence";
  readonly description = new Narrative({
    narration: [
      "A small brass Greek Catholic liturgical bell, Cyrillic lettering around the rim. It can be compared with the cerkiew or shown to Stefania Kopacz or Paraskewia Chyłak.",
    ],
  });
}
