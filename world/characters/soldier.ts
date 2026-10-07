import { Character, CharacterDescription } from "../schema.ts";
import type { Checks, LocationRef } from "../schema.ts";
import CiotkasHouse from "../locations/ciotkas-house.ts";

export default class Soldier extends Character {
  readonly id = "soldier";
  readonly name = "Edward Barnaś";
  readonly description = new CharacterDescription({
    narration: ["Edward Barnaś"],
    clothes: "Not present in 1967; any description comes through records, objects, or testimony.",
    hairAndFace: "Not described in surviving campaign material.",
    carriage: "Remembered as steady, hard-working, and devoted to his children.",
    gives: { aware: [Soldier] },
  });

  readonly role = "deceased settler / massacre participant";
  livesAt: LocationRef = CiotkasHouse;

  override alive = false;

  bond: Checks = [
    "Treat his surviving children as people, not case details",
    "Notice that his land, house, and signature are evidence",
    "Name his 1947 guilt and his 1954 death together",
  ];
}
