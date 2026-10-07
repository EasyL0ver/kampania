import { Character, CharacterDescription, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { Checks, LocationRef } from "../schema.ts";
import { Empathy } from "../skills.ts";
import PgrQuarters from "../locations/pgr-quarters.ts";
import ForemansFloodFight from "../events/foremans-flood-fight.ts";
import { todo, todoEffect } from "../todo.ts";

export default class Zofia extends Character {
  readonly id = "zofia";
  readonly name = "Zofia Pytlak";
  readonly description = new CharacterDescription({
    narration: ["Zofia Pytlak, the warm, well-liked PGR cook."],
    clothes: "Flour-dusted apron over a faded print dress; always looks like she just left the stove.",
    hairAndFace: "Dark hair pinned up loosely, strands escaping; round face, deep laugh lines around brown eyes.",
    carriage: "Sturdy, broad red hands always in motion — stirring, kneading, wiping a child's face.",
    gives: { aware: [Zofia] },
  });

  readonly role = "PGR cook / the village's warmth";
  // TODO: "Pytlak household, near the PGR farm" — no own location; chose PGR
  // quarters to match Michał (foreman.ts).
  livesAt: LocationRef = PgrQuarters;

  // ------------------------------------------------------------ state

  // Set by "Prepare the soft landing": an evacuation forms around Zofia and the
  // vulnerable are already out when the flood peaks.
  evacuationFormed = false;

  // ------------------------------------------------------------ actions

  readonly allActions = {
    prepareTheSoftLanding: action({
      label: "Prepare the soft landing (evacuation)",
      requires: [
        new Requirement("She doesn't trust you yet.", {
          when: todo("Her trust (Bond earned), or the flood has begun"),
        }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She has already decided who must leave first: Wanda, Babcia, Barbara, Pawełek, and Staszek. With committee support, she can move the vulnerable before the flood peaks.",
        ],
        gives: {
          effects: (w) => {
            w.zofia.evacuationFormed = true;
          },
        },
      }),
    }),
    sendZofiaToMichal: action({
      label: "Send Zofia to Michał (the flood line)",
      requires: [
        new Requirement("She doesn't trust you yet.", { when: (w, me) => w.zofia.bonded.of(me) }),
        // TODO: should read Michał's / foremans-flood-fight state once modelled.
        new Requirement("Michał isn't on the flood line.", {
          when: todo("Michał is in the grip of the flood-work (foremans-flood-fight)"),
        }),
      ],
      promptedBy: [ForemansFloodFight],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She tells him it is done, that she is proud of him, and that she is not burying a husband to save a farm. He comes back into his own body and walks home.",
        ],
        gives: {
          effects: todoEffect(
            "World State Change: Michał survives, the flood defense collapses, and the engineering ending (foreman-saves-village) closes",
          ),
        },
      }),
    }),
    censusInterview: action({
      label: "Census interview",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She feeds the players first, then answers the household questions plainly and completely.",
        ],
        gives: { effects: (w) => { w.zofia.censusTaken = true; } },
      }),
    }),
    propertyAssessment: action({
      label: "Property assessment",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She says they own nothing; the house comes with Michał's PGR post.",
        ],
        gives: { effects: (w) => { w.zofia.propertyRecorded = true; } },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    evacuationClarity: opportunity({
      label: "Evacuation clarity",
      trigger: (w) => w.zofia.allActions.prepareTheSoftLanding.done,
      target: { skills: [Empathy] },
      narrative: new Narrative({
        narration: [
          "She is not panicking; she has accepted that the water wins and has turned grief into a list of people to save.",
        ],
      }),
    }),
    floodLineKey: opportunity({
      label: "Flood-line key",
      trigger: (w) => w.zofia.allActions.sendZofiaToMichal.done,
      target: { skills: [Empathy] },
      narrative: new Narrative({
        narration: [
          "Force and reason will not reach Michał; her voice can.",
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

  // ------------------------------------------------------------ bond

  bond: Checks = [
    "Listen to her fears about Michał without dismissing them",
    "Offer concrete help — \"I'll talk to him\" or \"I'll check on the situation\"",
    "Be kind without condescension — talk to her as an equal",
  ];
}
