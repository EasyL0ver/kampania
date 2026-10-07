import { Character, CharacterDescription } from "../schema.ts";
import type { Checks } from "../schema.ts";

export default class Officer extends Character {
  readonly id = "officer";
  readonly name = "por. Witold Skowron";
  readonly description = new CharacterDescription({
    narration: ["por. Witold Skowron, an official from outside the village who arrives by car on state business."],
    clothes: "Grey wool overcoat, pressed shirt and tie, polished shoes wrong for village mud",
    hairAndFace: "Clean-shaven, hair clipped short with geometric precision; forgettable features, but dark, intelligent eyes give him away",
    carriage: "Compact military posture he can't switch off; shoulders square, chin up, hands clasped behind his back when listening",
    gives: { aware: [Officer] },
  });

  readonly role = "SB secret police agent";
}
