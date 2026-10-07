import { Item, Narrative, Requirement, action, opportunity } from "../schema.ts";
import { Bureaucracy, Violence } from "../skills.ts";
import * as clues from "../clues.ts";

export default class BarnasLetter extends Item {
  readonly id = "barnas-letter";
  readonly name = "Edward Barnaś's Unopened Letter";
  readonly hook = "A yellowed, still-sealed envelope in a blunt, barrack-trained hand, postmarked 1955.";
  readonly what = "letter (unopened, dated 1955)";
  readonly description = new Narrative({
    narration: [
      "A sealed envelope gone soft and yellow with damp and years, never opened. It is addressed to Edward Barnaś at the village in a heavy, barrack-trained hand, and the postmark is dated 1955. Inside is a single folded sheet from an old service comrade.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    readTheLetter: action({
      label: "Read the letter",
      requires: [new Requirement("You don't have the letter.", { items: [BarnasLetter] })],
      promptedBy: [BarnasLetter],
      cost: [],
      narrative: new Narrative({
        narration: [
          "A few lines from an old comrade named Bronek, warm and uneasy, teasing Edward for turning farmer and sending a greeting to Rezeń. The envelope is postmarked 1955, a year after the village says the family left. The words never name a uniform, but a soldier's or clerk's eye reads the rank and unit markings on the sheet as KBW.",
        ],
        gives: { clues: [clues.BarnasLetterDate55, clues.ButcherMentionedInTheLetter] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theWarmthOfIt: opportunity({
      label: "The warmth of it",
      target: { skills: [Violence] },
      narrative: new Narrative({
        narration: [
          "Those two did wet work together, and the easy jokes are what grows over it.",
        ],
      }),
    }),
    // Split from "Read the letter": "with a soldier's or clerk's eye" also gives soldier-was-kbw.
    // TODO: read "soldier's or clerk's eye" as Violence or Bureaucracy; confirm the cards.
    theUnitMarkings: opportunity({
      label: "The unit markings, read by a soldier or clerk",
      trigger: (w) => w.barnasLetter.allActions.readTheLetter.done,
      target: { when: (_w, me) => me.has(Violence) || me.has(Bureaucracy) },
      narrative: new Narrative({
        narration: [
          "(Split from readTheLetter.) Gives: with a soldier's or clerk's eye, `soldier-was-kbw`.",
        ],
        gives: { clues: [clues.SoldierWasKbw] },
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
