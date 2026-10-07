import { Character, CharacterDescription } from "../../schema.ts";

export default class EwaRzepka extends Character {
  readonly id = "ewa-rzepka";
  readonly name = "Ewa Rzepka";
  readonly description = new CharacterDescription({
    narration: ["Ewa Rzepka, the eldest child of Helena and Emil Rzepka."],
    clothes: "Not specified.",
    hairAndFace: "Not specified.",
    carriage: "Not specified.",
    gives: { aware: [EwaRzepka] },
  });
  readonly role = "Helena and Emil Rzepka's eldest child";
}
