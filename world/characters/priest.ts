import { Character, CharacterDescription, Narrative, Requirement, SkillRequirement, action } from "../schema.ts";
import type { Checks, LocationRef } from "../schema.ts";
import { Loaded } from "../skills.ts";
import TheRectory from "../locations/the-rectory.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";

export default class Priest extends Character {
  readonly id = "priest";
  readonly name = "ks. Władysław Pająk";
  readonly description = new CharacterDescription({
    narration: ["ks. Władysław Pająk, the village's Roman Catholic priest, found at the church and rectory."],
    clothes: "Black cassock daily, brushed, collar a stark white line; in cold weather a heavy wool overcoat and black beret",
    hairAndFace: "Receding hairline, dark hair combed back, clean-shaven; long narrow face, deep-set brown eyes that hold yours too long",
    carriage: "Tall and slightly stooped; bends to listen, moves slowly, and makes people orient around his stillness",
    gives: { aware: [Priest] },
  });

  readonly role = "village priest";
  livesAt: LocationRef = TheRectory;

  // ------------------------------------------------------------ state

  // TODO: mechanic "The Grace Arc — judgment vs. mercy" (Faith in Redemption
  // score, Day-7 odpust vs. seal-break) not modelled yet; spiritual-endings
  // scoring is out of scope (see prose/characters/priest.md).

  // ------------------------------------------------------------ actions

  readonly allActions = {
    driveOutTheDevil: action({
      label: "Drive out the devil",
      requires: [
        new Requirement("He isn't at the sickroom.", {
          when: todo("ks. Władysław Pająk brought to Pawełek's sickroom"),
        }),
      ],
      promptedBy: [clues.PawelekWasPossessed],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He prays loudly over the boy, commanding the devil out, a Roman Catholic blessing that rises to shouting. It does nothing for the fever, and the noise frightens the delirious child. Stefania Kopacz comes out of her chair, sharply lucid, and drives him off: the boy is not a demon, and he is not to shout and terrify a sick child. This is not his faith and not his rite.",
        ],
        gives: { clues: [clues.BabciaOpposedToChurch, clues.BabciaMindReturns] },
      }),
    }),
    askAboutTheThreeBarredCross: action({
      label: "Ask about the three-barred cross",
      promptedBy: [clues.ThreeBarredCrossOnGajdaGrave],
      cost: [],
      narrative: new Narrative({
        narration: [
          "He explains what Barbara could not: the three-barred cross is Eastern-rite, Greek Catholic, the old faith of this valley before the Roman parish. He states it plainly as church history, nothing he guards.",
        ],
        gives: { clues: [clues.ThreeBarredCrossIsLemko] },
      }),
    }),
    censusInterview: action({
      label: "Census interview",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He cooperates and gives his details: himself, alone at the rectory.",
        ],
        gives: { effects: (w) => { w.priest.censusTaken = true; } },
      }),
    }),
    propertyAssessment: action({
      label: "Property assessment",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He says the rectory and church are parish property, not his. He refers the committee to the diocese for anything on paper.",
        ],
        gives: { effects: (w) => { w.priest.propertyRecorded = true; } },
      }),
    }),
    donateToTheChurch: action({
      label: "Donate to the church",
      requires: [new SkillRequirement(Loaded)],
      // He gives the money for good and loses the trait.
      cost: [{ card: Loaded }],
      narrative: new Narrative({
        narration: [
          "A committee member puts real money into the parish, no bribe, nothing asked for, just given. ks. Władysław Pająk did not expect it and cannot quite believe it: one of the state's own clerks choosing a plain good thing. In a man whose faith in people is in crisis, it lands, and he watches the committee differently after.",
        ],
        gives: { effects: todoEffect("Ending Progress: +2 Faith in Redemption") },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }

  // ------------------------------------------------------------ bond / grudge

  bond: Checks = [
    "Ask for his blessing or spiritual counsel",
    "Confide something personal to him — show vulnerability",
    "Show respect for the church building itself",
  ];

  // TODO: the Markdown lists 4 grudge checks; dropped "Threaten or pressure one
  // of his parishioners in his presence" (full list in prose).
  grudge: Checks = [
    "Demand he reveal what he heard in confession",
    "Disturb the dead: handle Janina Gajda's body crudely",
    "Disrespect the church (smoke inside, shout, handle sacred objects carelessly)",
  ];
}
