import { Character, CharacterDescription } from "../../schema.ts";

export default class Neighbours extends Character {
  readonly id = "neighbours";
  readonly name = "%NEIGHBOUR_1%, %NEIGHBOUR_2%, etc.";
  readonly description = new CharacterDescription({
    narration: ["Ordinary %NEW_VILLAGE% families, neighbours used as needed for scenes and village reaction."],
    clothes: "Not specified.",
    hairAndFace: "Not specified.",
    carriage: "Not specified.",
    gives: { aware: [Neighbours] },
  });
  readonly role = "unnamed villagers, %NEW_VILLAGE% families";
}
