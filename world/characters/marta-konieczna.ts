import { Character, CharacterDescription } from "../schema.ts";
import type { Checks } from "../schema.ts";

export default class MartaKonieczna extends Character {
  readonly id = "marta-konieczna";
  readonly name = "Marta Konieczna";
  readonly description = new CharacterDescription({
    narration: ["Marta Konieczna, the woman who lived with Edward Barnaś; gone with the family since 1954."],
    clothes: "Not present in 1967; any description comes through records, objects, or testimony.",
    hairAndFace: "Not described in surviving campaign material.",
    carriage: "Remembered only as the mother of both Barnaś children.",
    gives: { aware: [MartaKonieczna] },
  });

  readonly role = "Edward Barnaś's unmarried partner (deceased)";
  override alive = false;

  bond: Checks = [
    "Treat her as a person and a mother",
    "Notice her missing surname is evidence",
    "Name what was done to her and her children",
  ];
}
