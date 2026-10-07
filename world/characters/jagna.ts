import { Character, CharacterDescription } from "../schema.ts";
import type { Checks } from "../schema.ts";

export default class Jagna extends Character {
  readonly id = "jagna";
  readonly name = "Hania Barnaś";
  readonly description = new CharacterDescription({
    narration: ["Hania Barnaś"],
    clothes: "Better-kept than the village expected from the Barnaś house; plain skirts and blouses worn with deliberate neatness.",
    hairAndFace: "Dark hair pinned or braided tight; bright, watchful eyes; a face that looked older when she was listening.",
    carriage: "Quick, upright, and slightly defiant; she held eye contact too long for village comfort.",
    gives: { aware: [Jagna] },
  });

  readonly role = "Edward Barnaś's daughter, presumed dead";

  bond: Checks = [
    "Treat Hania as a person, not a scandal or victim",
    "Protect Edek from cruelty or dismissal",
    "Preserve evidence of what happened to her family",
  ];
}
