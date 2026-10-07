import { Event, Narrative, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef, WorldCond } from "../schema.ts";
import { Devotion } from "../skills.ts";
import * as clues from "../clues.ts";
import TheChurch from "../locations/the-church.ts";
import Priest from "../characters/priest.ts";
import Matrona from "../characters/matrona.ts";
import Painter from "../characters/painter.ts";
import Wojewoda from "../characters/wojewoda.ts";

export default class HolyMass extends Event {
  readonly id = "holy-mass";
  readonly name = "Holy Mass — Anti-Flood Prayer";
  readonly hook = "A Mass beginning in the church as the village gathers against the rising water.";
  override at(): LocationRef {
    return TheChurch;
  }

  // Also present: village congregation.
  override present(): CharacterRef[] {
    return [Priest, Matrona, Painter, Wojewoda];
  }
  override readonly hooks: EventHook[] = [
    { text: "A Mass beginning in the church as the village gathers against the rising water.", heardAt: [TheChurch] },
  ];
  override condition: WorldCond = (_w) => true; // TODO: Day 4 morning gate in calendar
  readonly setup = new Narrative({
    narration: [
      "This is the first flood Mass.",
      "Tadek Gajda is absent.",
      "Janina Gajda's pew is empty.",
      "Janina Gajda has not missed Mass in years.",
      "ks. Władysław Pająk preaches on Jonah 3:4 and the warning given to Nineveh.",
      "The sermon frames the rising water as a deadline before judgment.",
      "The priest names no specific sin.",
      "The priest tells the village the confessional will stay open after Mass all day.",
      "The priest asks the village to confess before the water comes.",
    ],
  });

  // TODO: Exit "After Mass, ks. Pająk sends someone to check Janina's house → Ciotka Found Dead"
  // may be an onFire/unlock of CiotkaFoundDead; left in prose.

  // No event-specific actions.

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    janinasEmptyPew: opportunity({
      label: "Janina's empty pew",
      target: { skills: [Devotion], clues: [clues.CiotkaIsDevout] },
      // TODO: prompted by `ciotka-lives-in-village`, which is not a clue in clues.ts (dangling link).
      promptedBy: [HolyMass],
      narrative: new Narrative({
        narration: [
          "`(prompted by: ciotka-lives-in-village)` — Janina Gajda's absence is the only gap in a full church, and the priest keeps looking at it.",
        ],
        gives: { clues: [clues.CiotkaMissedMass] },
      }),
    }),
    theSermonTarget: opportunity({
      label: "The sermon target",
      target: { skills: [Devotion] },
      promptedBy: [HolyMass],
      narrative: new Narrative({
        narration: [
          "The priest's general call to confession is aimed at particular people in the pews, not only at the village as a whole.",
        ],
        gives: { clues: [clues.PriestFearsDivineJudgment] },
      }),
    }),
  };

  override get opportunities() {
    return this.allOpportunities;
  }
}
