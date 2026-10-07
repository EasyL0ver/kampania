import { Character, CharacterDescription, Narrative, action, opportunity } from "../schema.ts";
import type { Checks, LocationRef } from "../schema.ts";
import { Devotion, Empathy } from "../skills.ts";
import * as clues from "../clues.ts";
import CiotkasHouse from "../locations/ciotkas-house.ts";
import Soldier from "./soldier.ts";
import Glupek from "./glupek.ts";

export default class Ciotka extends Character {
  readonly id = "ciotka";
  readonly name = "Janina Gajda";
  readonly description = new CharacterDescription({
    narration: ["Janina Gajda, a downtrodden, devout woman who keeps house with her son Edek, sister to the sołtys."],
    clothes: "Shapeless dark dresses buttoned to the throat; headscarf outdoors",
    hairAndFace: "Thin grey hair hidden under the scarf; gaunt cheeks, permanent dark circles",
    carriage: "Shoulders hunched, eyes down, flinches at raised voices; steadier at home with Edek Barnaś. Voice: Thin and breathy in public; silence when frightened",
    gives: { aware: [Ciotka] },
  });

  // ------------------------------------------------------------ shared state (A pass)

  knowsPawelekNeedsPenicillin = false;
  readonly role = "sibling (sister)";
  livesAt: LocationRef = CiotkasHouse;

  // ------------------------------------------------------------ actions

  readonly allActions = {
    mentionHerFamily: action({
      label: "Mention her family",
      promptedBy: [Ciotka],
      cost: [],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: {},
      }),
    }),
    censusInterview: action({
      label: "Census interview",
      promptedBy: [Ciotka],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She presents her son Edek to the committee, then lists herself as mother and Edward Barnaś as the father who left the village — a Barnaś, though her own name is Gajda. The house and boy are both presented as hers.",
        ],
        gives: {
          clues: [clues.EdeksFatherLeft, clues.GlupekWontDrinkCoffee],
          aware: [Soldier, Glupek],
          effects: (w) => { w.ciotka.censusTaken = true; },
        },
      }),
    }),
    propertyAssessment: action({
      label: "Property assessment",
      promptedBy: [Ciotka],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She says the house belongs to her brother, the sołtys, who gave it to her. She claims no deed and no title of her own.",
        ],
        gives: {
          clues: [clues.CiotkaHouseIsWojewodas],
          effects: (w) => { w.ciotka.propertyRecorded = true; },
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theFlinchAtFamily: opportunity({
      label: "The flinch at family",
      trigger: (w): boolean => w.ciotka.allActions.mentionHerFamily.done,
      target: { skills: [Empathy] },
      promptedBy: [Ciotka],
      narrative: new Narrative({
        narration: [
          "Every mention of her siblings pulls her tight; she changes the subject, hands busy. The distance is hers and it costs her.",
        ],
        gives: { clues: [clues.CiotkaAvoidsFamily] },
      }),
    }),
    theFaithIsReal: opportunity({
      label: "The faith is real",
      target: { skills: [Devotion] },
      promptedBy: [Ciotka],
      narrative: new Narrative({
        narration: [
          "The rosary in her apron pocket is worn to the string, beads rubbed pale at the decades. She murmurs before she eats and before she leaves a room, small reflexive prayers she does not perform for anyone. A believer who means it clocks the difference at once: hers is real, and it is heavy. She carries it like penance.",
        ],
        gives: { clues: [clues.CiotkaIsDevout] },
      }),
    }),
    sheLovesTheBoy: opportunity({
      label: "She loves the boy",
      target: { skills: [Empathy] },
      narrative: new Narrative({
        narration: [
          "Watch her with Edek and the fear leaves her face. She reads his moods before he shows them, warms his food to the temperature he likes, steadies him without being asked. Whatever else she is, this is a woman who loves this boy and has built her whole small life around caring for him.",
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
    "Ask about old ways, herbs, or customs",
    "Arrive without official bearing",
    "Treat Edek gently in her presence",
  ];

  grudge: Checks = [
    "Startle or upset Edek in her presence",
    "Flash credentials or use an official tone",
    "Mention Vistula, resettlement, or the old village",
  ];
}
