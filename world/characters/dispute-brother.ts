import { Character, CharacterDescription, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { Checks, LocationRef } from "../schema.ts";
import { Bureaucracy } from "../skills.ts";
import NewVillage from "../locations/new-village.ts";

export type Ruling = "pending" | "for-brother" | "for-sister";

export default class DisputeBrother extends Character {
  readonly id = "dispute-brother";
  readonly name = "%BROTHER%";
  readonly description = new CharacterDescription({
    narration: ["%BROTHER%, a lorry driver and deed-holder in a dispute over the border strip, lives in his late father's house."],
    clothes: "Worn village jacket over a clean-ish shirt; boots that do not spend every day in a field",
    hairAndFace: "Short practical haircut, clean-shaven or a day's stubble; soft, tired, unremarkable face",
    carriage: "Weight back, hands in pockets, unhurried. Voice: Plain and calm, without pleading or raised volume",
    gives: { aware: [DisputeBrother] },
  });

  readonly role = "heir with the deed (land-dispute red herring)";
  // TODO: "His late father's house in %NEW_VILLAGE%" has no location file; chose NewVillage.
  livesAt: LocationRef = NewVillage;

  // ------------------------------------------------------------ state

  // The sibling land dispute is on the committee docket (set by either sibling's
  // property assessment). Shared with dispute-sister.ts.
  onDocket = false;
  // How the committee settled the disputed strip.
  ruling: Ruling = "pending";

  // ------------------------------------------------------------ actions

  readonly allActions = {
    censusInterview: action({
      label: "Census interview",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He is cooperative, though often on the road. He gives his own details and his late father's house as his residence.",
        ],
        gives: { effects: (w) => { w.disputeBrother.censusTaken = true; } },
      }),
    }),
    propertyAssessment: action({
      label: "Property assessment",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He produces his father's deed to the house and disputed strip. He notes that %SISTER% farms the strip, but the paper is his.",
        ],
        gives: { effects: (w) => { w.disputeBrother.onDocket = true; w.disputeBrother.propertyRecorded = true; } },
      }),
    }),
    // TODO: original requirement "The committee settles the disputed strip in the compensation
    // assessment" modelled as docket + not yet ruled. "%SISTER% is dispossessed; the committee's
    // authority is unchallenged" not modelled beyond `ruling`.
    ruleTheBoundaryHisWay: action({
      label: "Rule the boundary his way",
      requires: [
        new Requirement("The dispute isn't before the committee.", { when: (w) => w.disputeBrother.onDocket }),
        new Requirement("The strip has already been settled.", { when: (w) => w.disputeBrother.ruling === "pending" }),
      ],
      cost: [],
      narrative: new Narrative({
        narration: [
          "The deed stands, and the strip and its compensation go to him. %SISTER% loses the ground she has worked for years.",
        ],
        gives: { effects: (w) => { w.disputeBrother.ruling = "for-brother"; } },
      }),
    }),
    // TODO: original requirement "The committee settles the strip in %SISTER%'s favour despite the
    // deed" modelled as docket + not yet ruled. "The committee's authority and standing are
    // damaged" (and his complaint via Skowron) not modelled beyond `ruling`.
    ruleTheBoundaryAgainstHim: action({
      label: "Rule the boundary against him",
      requires: [
        new Requirement("The dispute isn't before the committee.", { when: (w) => w.disputeBrother.onDocket }),
        new Requirement("The strip has already been settled.", { when: (w) => w.disputeBrother.ruling === "pending" }),
      ],
      cost: [],
      narrative: new Narrative({
        narration: [
          "He tells the committee the deed is his and they have overstepped. He files a formal complaint through por. Witold Skowron and the provincial office.",
        ],
        gives: { effects: (w) => { w.disputeBrother.ruling = "for-sister"; } },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    thePaperIsAirtight: opportunity({
      label: "The paper is airtight",
      trigger: (w) => w.disputeBrother.allActions.propertyAssessment.done,
      target: { skills: [Bureaucracy] },
      narrative: new Narrative({
        narration: [
          "The deed has father's title, proper transfer, and the strip plainly inside the line.",
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

  // ------------------------------------------------------------ bond / grudge

  bond: Checks = [
    "Treat the deed as evidence, not him as a thief",
    "Acknowledge that legal title matters",
    "Hear his claim without making him defend himself",
  ];

  grudge: Checks = [
    "Rule the boundary against his deed",
    "Treat him as a villain or thief to his face",
    "Use his father's deathbed words against him",
  ];
}
