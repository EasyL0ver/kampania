import { Character, CharacterDescription } from "../../schema.ts";

export default class FranekMucha extends Character {
  readonly id = "franek-mucha";
  readonly name = "Franek Mucha";
  readonly description = new CharacterDescription({
    narration: ["Franek Mucha, a village drunk and brawler, one of Tadek Gajda's drinking crew."],
    clothes: "Not specified.",
    hairAndFace: "Not specified.",
    carriage: "Not specified.",
    gives: { aware: [FranekMucha] },
  });
  readonly role = "village drunk, troublemaker";
}
