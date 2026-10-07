import { Location, Narrative } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";

export default class NewVillage extends Location {
  readonly id = "new-village";
  readonly name = "%NEW_VILLAGE%";
  // TODO: source has no ## Hook; written from the **Location:** header.
  readonly hook = "The village on the valley floor, below the planned reservoir.";
  readonly position = "valley floor, below the planned reservoir";
  readonly visitCost = 0;
  // Present: "Villagers" (no named characters).
  override present(): CharacterRef[] {
    return [];
  }

  readonly setup = new Narrative({
    narration: [
      "Postwar resettlement village in the valley below the planned reservoir.",
      "Where the committee's whole visit takes place.",
    ],
    gives: { aware: [NewVillage] },
  });
}
