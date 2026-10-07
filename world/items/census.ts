import { Item, Narrative, Requirement, action, opportunity } from "../schema.ts";
import { Bureaucracy } from "../skills.ts";
import * as clues from "../clues.ts";
import PgrLedger from "./pgr-ledger.ts";

// The census is filled household by household through each character's census
// action, which sets that character's censusTaken.
export default class Census extends Item {
  readonly id = "census";
  readonly name = "Committee Census Register";
  readonly hook = "An official blank census book, ruled for households, names, ages, residence dates.";
  readonly what = "census register (document)";
  readonly description = new Narrative({
    narration: [
      "An official blank census book issued for the resettlement survey: ruled columns for household, names, ages, and years resident. It starts empty and fills as the committee works the village. In a settlement this small, a name on the farm's payroll that appears in no household stands out at once.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    crossCheckAgainstTheWorkerRegistry: action({
      label: "Cross-check against the worker registry",
      requires: [
        new Requirement("You don't have the census.", { items: [Census] }),
        new Requirement("The census has no households recorded yet.", {
          when: (w) =>
            w.babcia.censusTaken || w.barbara.censusTaken || w.butcher.censusTaken || w.ciotka.censusTaken ||
            w.disputeBrother.censusTaken || w.disputeSister.censusTaken || w.foreman.censusTaken ||
            w.glupek.censusTaken || w.hag.censusTaken || w.junior.censusTaken || w.matrona.censusTaken ||
            w.neighbour.censusTaken || w.painter.censusTaken || w.priest.censusTaken ||
            w.radioman.censusTaken || w.widow.censusTaken,
        }),
        new Requirement("You don't have the worker registry.", { items: [PgrLedger] }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The census records every living head in the village. One name on the farm's payroll, Tadeusz Mazur, belongs to no household: his widow is listed alone. A worker drawing wages that no household accounts for.",
        ],
        gives: { clues: [clues.MazurPaidButAbsent] },
      }),
    }),
    readTheFamilysSurnames: action({
      label: "Read the family's surnames",
      requires: [
        new Requirement("You don't have the census.", { items: [Census] }),
        new Requirement("You haven't recorded that household yet.", { when: (w) => w.ciotka.censusTaken || w.glupek.censusTaken }),
      ],
      promptedBy: [clues.EdeksFatherLeft],
      cost: [],
      narrative: new Narrative({
        narration: [
          "The boy and the father he never knew are set down as Barnaś; the woman raising him is Gajda. She never took his name. Read straight, she and Edward Barnaś were together but never married.",
        ],
        gives: { clues: [clues.CiotkaNeverMarried] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    notJustTheLiving: opportunity({
      label: "Not just the living",
      target: { skills: [Bureaucracy] },
      narrative: new Narrative({
        narration: [
          "The register is there to gauge damages, not only to count heads, so it has room for the dead as much as the living. A name can sit on a roll long after its owner is gone.",
        ],
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }

  override get opportunities() {
    return this.allOpportunities;
  }
}
