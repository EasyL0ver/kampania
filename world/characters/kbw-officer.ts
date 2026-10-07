import { Character, CharacterDescription } from "../schema.ts";
import type { Checks } from "../schema.ts";

export default class KbwOfficer extends Character {
  readonly id = "kbw-officer";
  readonly name = "kpt. Henryk Ćwiek";
  readonly description = new CharacterDescription({
    narration: ["kpt. Henryk Ćwiek"],
    clothes: "KBW field uniform, officer belt, service boots, and rank insignia.",
    hairAndFace: "Regulation haircut; clean-shaven face; hard officer's stare.",
    carriage: "Upright, clipped, and used to command; he occupied space as state authority.",
    gives: { aware: [KbwOfficer] },
  });

  readonly role = "deceased KBW officer";
  override alive = false;

  bond: Checks = [
    "Identify his real role at %OLD_VILLAGE%",
    "Connect his death to the massacre sequence",
    "Preserve his rank and name accurately",
  ];
}
