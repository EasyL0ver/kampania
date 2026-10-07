import { Character, CharacterDescription } from "../../schema.ts";

export default class KrystianRzepka extends Character {
  readonly id = "krystian-rzepka";
  readonly name = "Krystian Rzepka";
  readonly description = new CharacterDescription({
    narration: ["Krystian Rzepka, the youngest Rzepka child, altar boy at the church."],
    clothes: "Not specified.",
    hairAndFace: "Not specified.",
    carriage: "Not specified.",
    gives: { aware: [KrystianRzepka] },
  });
  readonly role = "Helena and Emil Rzepka's youngest, altar boy";
}
