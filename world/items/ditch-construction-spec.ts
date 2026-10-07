import { Item, Narrative, Requirement, action } from "../schema.ts";
import * as clues from "../clues.ts";

export default class DitchConstructionSpec extends Item {
  readonly id = "ditch-construction-spec";
  readonly name = "PGR Irrigation Ditch Construction Spec";
  readonly hook = "An official folder: a ditch cross-section drawing, concrete figures, a signed acceptance note.";
  readonly what = "construction and drainage specification (document)";
  readonly description = new Narrative({
    narration: [
      "A land-reclamation (melioracja) file in an official folder: an approved cross-section drawing, a bill of concrete, and a signed acceptance note. It specifies a concrete-lined trapezoidal channel for the ditch's entire run from the field head down to the low ground, not just the head, sized to carry the fields' flood runoff. The acceptance note declares the work completed and lined as drawn. A layman reads it as ordinary farm paperwork. Set against a walked ditch, the paper and the ground do not agree past the first short stretch.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    compareTheSpecToTheDitch: action({
      label: "Compare the spec to the ditch",
      requires: [
        new Requirement("You don't have the spec.", { items: [DitchConstructionSpec] }),
        new Requirement("You haven't walked the ditch yet.", { clues: [clues.DitchConcreteStopsShort] }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The file specifies concrete lining the full run, head to low ground, accepted as built. The walked ditch is concrete only at the head and a shallow earth dugout the rest of the way. The paper and the ground do not match: the ditch was never built to the spec it was signed off against.",
        ],
        gives: { clues: [clues.DitchNotBuiltToSpec] },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }
}
