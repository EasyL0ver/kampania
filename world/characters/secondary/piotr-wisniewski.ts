import { Character, CharacterDescription } from "../../schema.ts";

export default class PiotrWisniewski extends Character {
  readonly id = "piotr-wisniewski";
  readonly name = "Piotr Wiśniewski";
  readonly description = new CharacterDescription({
    narration: ["Piotr Wiśniewski, a young farmhand at the PGR farm."],
    clothes: "Not specified.",
    hairAndFace: "Not specified.",
    carriage: "Not specified.",
    gives: { aware: [PiotrWisniewski] },
  });
  readonly role = "farm labourer, younger and ambitious";
}
