import { Character, CharacterDescription } from "../../schema.ts";

export default class JozefNowak extends Character {
  readonly id = "jozef-nowak";
  readonly name = "Józef Nowak";
  readonly description = new CharacterDescription({
    narration: ["Józef Nowak, a farmhand at the PGR farm."],
    clothes: "Not specified.",
    hairAndFace: "Not specified.",
    carriage: "Not specified.",
    gives: { aware: [JozefNowak] },
  });
  readonly role = "farm labourer, migrant or day worker";
}
