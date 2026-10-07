import { Item, Narrative, opportunity } from "../schema.ts";
import { Culture } from "../skills.ts";
import * as clues from "../clues.ts";

export default class GirlsDress extends Item {
  readonly id = "girls-dress";
  readonly name = "The Blue Dress";
  readonly hook = "A blue dress, folded and kept, lifted from the back of the attic wardrobe.";
  readonly what = "keepsake (a blue dress)";
  readonly description = new Narrative({
    narration: [
      "A blue dress, worn but clean. It is folded and set at the back of the wardrobe, kept rather than thrown out or handed down, put away with some care. No one wears it in Janina's house now.",
    ],
  });

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    aDressKeptAndMourned: opportunity({
      label: "A dress, kept and mourned",
      target: { items: [GirlsDress] },
      promptedBy: [clues.CiotkaIsDead],
      narrative: new Narrative({
        narration: [
          "The dress is folded and kept like something mourned, not stored for use. Whoever wore it is gone.",
        ],
        gives: { clues: [clues.GirlsDressInCiotkasHouse] },
      }),
    }),
    readTheCut: opportunity({
      label: "Read the cut",
      // TODO: gate was "Culture, or a woman on the committee"; the woman-on-the-committee
      // alternative is not modelled (no player gender in the schema).
      target: { items: [GirlsDress], when: (_w, me) => me.has(Culture) },
      promptedBy: [clues.GirlsDressInCiotkasHouse],
      narrative: new Narrative({
        narration: [
          "The size and the cut place it: this was made for a teenage girl, not a grown woman and not a child.",
        ],
        gives: { clues: [clues.DressBelongedToTeenageGirl] },
      }),
    }),
  };

  override get opportunities() {
    return this.allOpportunities;
  }
}
