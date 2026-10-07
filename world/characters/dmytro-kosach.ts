import { Character, CharacterDescription } from "../schema.ts";

// Deceased: no home, no moves, no bond in the source.
export default class DmytroKosach extends Character {
  readonly id = "dmytro-kosach";
  readonly name = "Dmytro Kosach";
  readonly description = new CharacterDescription({
    narration: ["Dmytro Kosach, a UPA fighter from %OLD_VILLAGE%, killed in the 1947 massacre."],
    clothes: "Not specified.",
    hairAndFace: "Not specified.",
    carriage: "Not specified.",
    gives: { aware: [DmytroKosach] },
  });
  readonly role = "deceased UPA fighter, Paraskewia's lover";
  override alive = false;
}
