import { Item, Narrative, Requirement, action, opportunity } from "../schema.ts";
import { Culture } from "../skills.ts";
import * as clues from "../clues.ts";
import GirlsDress from "./girls-dress.ts";

export default class Portrait extends Item {
  readonly id = "portrait";
  readonly name = "The Portrait";
  readonly hook = "A portrait of a dark-haired young woman in a blue dress, unwrapped from a bundle hidden in the ruined cerkiew.";
  readonly what = "keepsake (an oil portrait)";
  readonly description = new Narrative({
    narration: [
      "An oil portrait of a young dark-haired woman in a blue dress, found wrapped and sheltered in a dry corner of the ruined cerkiew at %OLD_VILLAGE%. It is painted with a care nothing around it gets. No name or label on the face, though the back of the canvas is not blank. The blue dress is rendered as carefully as her face.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // Was an ungated opportunity (prompted by only). Turning the canvas over is player-initiated: a free action.
    theDedicationOnTheBack: action({
      label: "The dedication on the back",
      promptedBy: [clues.PortraitHiddenInCerkiew],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Turn the canvas over and there is a line written on the back: \"For my forget-me-not, the only blue I ever got right.\" A private endearment, not a commission.",
        ],
        gives: { clues: [clues.PortraitDedicatedToForgetMeNot] },
      }),
    }),
    compareTheDressToThePortrait: action({
      label: "Compare the dress to the portrait",
      requires: [
        new Requirement("You don't have the blue dress.", { items: [GirlsDress] }),
        new Requirement("You don't have the portrait.", { items: [Portrait] }),
      ],
      promptedBy: [clues.PortraitWomanInBlueDress],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Set the portrait beside the blue dress taken from the wardrobe: the same cut, the same blue. The woman he painted wore it.",
        ],
        gives: { clues: [clues.BlueDressMatchesPortrait] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theSignature: opportunity({
      label: "The signature",
      target: { skills: [Culture] },
      promptedBy: [clues.PortraitHiddenInCerkiew],
      narrative: new Narrative({
        narration: [
          "Low in one corner sits a small, easily missed signature. A trained eye reads the hand and the mark: this is Emil Rzepka's own work.",
        ],
        gives: { clues: [clues.EmilSignedThePortrait] },
      }),
    }),
    theStyle: opportunity({
      label: "The style",
      target: { skills: [Culture] },
      promptedBy: [clues.PortraitHiddenInCerkiew],
      narrative: new Narrative({
        narration: [
          "The portrait is Fauvist: the woman and her dress carried in bold, unnatural, expressive colour, alive and full of light.",
        ],
        gives: { clues: [clues.PortraitIsFauvist] },
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
