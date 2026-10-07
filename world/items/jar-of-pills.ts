import { Item, Narrative, opportunity } from "../schema.ts";
import { Bureaucracy, Medicine } from "../skills.ts";

export default class JarOfPills extends Item {
  readonly id = "jar-of-pills";
  readonly name = "Jar of Pills";
  readonly hook = "An open medicine jar with some pills missing.";
  readonly what = "evidence";
  readonly description = new Narrative({
    narration: [
      "A jar of pills on the table, cap off. Some are missing.",
    ],
  });

  // ------------------------------------------------------------ opportunities

  // Both are atmosphere in the Markdown (no Gives).
  readonly allOpportunities = {
    theDose: opportunity({
      label: "The dose",
      target: { skills: [Medicine] },
      narrative: new Narrative({
        narration: [
          "A strong sedative. Enough of it can kill. Pills are missing from the jar.",
        ],
      }),
    }),
    theLabel: opportunity({
      label: "The label",
      target: { skills: [Bureaucracy] },
      narrative: new Narrative({
        narration: [
          "Strong medication like this comes only from an official pharmacy, prescribed to Janina Gajda herself.",
        ],
      }),
    }),
  };

  override get opportunities() {
    return this.allOpportunities;
  }
}
