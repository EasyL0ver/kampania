import { Event, Narrative, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef, WorldCond } from "../schema.ts";
import { Culture, Devotion } from "../skills.ts";
import * as clues from "../clues.ts";
import TheChurch from "../locations/the-church.ts";
import Priest from "../characters/priest.ts";
import Wojewoda from "../characters/wojewoda.ts";
import Matrona from "../characters/matrona.ts";
import Wujas from "../characters/wujas.ts";

export default class FuneralMass extends Event {
  readonly id = "funeral-mass";
  readonly name = "Funeral Mass — Janina Gajda";
  readonly hook = "A funeral Mass beginning in the church, the coffin set before the congregation.";
  override at(): LocationRef {
    return TheChurch;
  }

  // Also present: Janina Gajda's coffin, village congregation.
  override present(): CharacterRef[] {
    return [Priest, Wojewoda, Matrona, Wujas];
  }
  override readonly hooks: EventHook[] = [
    { text: "A funeral Mass beginning in the church, the coffin set before the congregation.", heardAt: [TheChurch] },
  ];
  override condition: WorldCond = (_w) => true; // TODO: Day 5 morning gate in calendar
  readonly setup = new Narrative({
    narration: [
      "Janina Gajda's coffin remains inside the church because the flood has taken the cemetery.",
      "The Gajda siblings attend the funeral Mass for their sister.",
      "Tadek Gajda attends the funeral after days of drinking.",
      "ks. Władysław Pająk preaches from Deuteronomy 21:1-9.",
      "The sermon frames an unsolved killing as blood-guilt shared by the nearest community until the elders answer for it.",
      "The priest looks at the village elders when the sermon turns to washed hands and innocent blood.",
    ],
  });

  // No event-specific actions.

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theSermonAsAccusation: opportunity({
      label: "The sermon as accusation",
      target: { skills: [Devotion] },
      promptedBy: [FuneralMass],
      narrative: new Narrative({
        narration: [
          "ks. Władysław Pająk is not only burying Janina; he is warning the living that unconfessed blood-guilt stains the whole valley.",
        ],
        gives: { clues: [clues.PriestFearsDivineJudgment] },
      }),
    }),
    theUnburiedCoffin: opportunity({
      label: "The unburied coffin",
      target: { skills: [Culture] },
      promptedBy: [FuneralMass],
      narrative: new Narrative({
        narration: [
          "The flood has stopped a normal burial and left Janina's body inside the church.",
        ],
      }),
    }),
  };

  override get opportunities() {
    return this.allOpportunities;
  }
}
