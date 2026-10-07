import { Character, CharacterDescription } from "../../schema.ts";

export default class RomekGlowacz extends Character {
  readonly id = "romek-glowacz";
  readonly name = "Romek Głowacz";
  readonly description = new CharacterDescription({
    narration: ["Romek Głowacz, a village drunk, one of Tadek Gajda's drinking crew."],
    clothes: "Not specified.",
    hairAndFace: "Not specified.",
    carriage: "Not specified.",
    gives: { aware: [RomekGlowacz] },
  });
  readonly role = "village drunk, Tadek Gajda's drinking companion";
}
