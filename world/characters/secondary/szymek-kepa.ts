import { Character, CharacterDescription } from "../../schema.ts";

export default class SzymekKepa extends Character {
  readonly id = "szymek-kepa";
  readonly name = "Szymek Kępa";
  readonly description = new CharacterDescription({
    narration: ["Szymek Kępa, a village drunk, one of Tadek Gajda's drinking crew."],
    clothes: "Not specified.",
    hairAndFace: "Not specified.",
    carriage: "Not specified.",
    gives: { aware: [SzymekKepa] },
  });
  readonly role = "village drunk, Tadek Gajda's drinking companion";
}
