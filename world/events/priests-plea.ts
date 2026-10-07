import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, Effect, EventHook, LocationRef, Tick, WorldCond } from "../schema.ts";
import { Chainsmoker, Culture, Devotion, Empathy, History } from "../skills.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";
import TheRectory from "../locations/the-rectory.ts";
import Priest from "../characters/priest.ts";
import HolyMass from "./holy-mass.ts";

export default class PriestsPlea extends Event {
  readonly id = "priests-plea";
  readonly name = "The Priest's Plea";
  readonly hook = "ks. Pająk asks the player for a private talk after Mass.";
  override at(): LocationRef {
    return TheRectory;
  }

  // Also: one player with progressed bond with the priest.
  override present(): CharacterRef[] {
    return [Priest];
  }
  override readonly hooks: EventHook[] = [
    { text: "ks. Pająk asks the player for a private talk after Mass.", heardAt: "anywhere" },
  ];
  override condition: WorldCond = (w) => w.holyMass.status !== "pending";
  readonly setup = new Narrative({
    narration: [
      "The meeting happens in the rectory beside the church.",
      "The rectory is small, book-lined, and cold.",
      "One lamp is lit.",
      "Rain hits the window.",
      "ks. Pająk pours tea and does not drink it.",
      "He says the flood may be divine judgment, not engineering failure.",
      "He cites Noah, Sodom, and other judgment stories.",
      "He says a place can carry a wrong so long that heaven answers with water.",
      "He does not name the sin.",
      "He asks whether a man who has done something unforgivable can still be forgiven.",
      "He is asking about someone specific.",
      "He will not say who.",
      "He may be asking about himself.",
    ],
  });
  // TODO: Setup says "Composure: 0; restores 1 for a player of faith" — restore not modelled.
  composure = 0;

  resolve: Tick = todoEffect(
    "ks. Pająk carries the fear alone. | His crisis defaults toward judgment across Second Flood Mass and The Seal-Break.",
  );

  // TODO: mercy and judgment answers should be mutually exclusive; the Faith in Redemption
  // score (story-facts/spiritual-endings.md) is not modelled.

  // ------------------------------------------------------------ actions

  readonly allActions = {
    tellHimPeopleCanBeForgiven: action({
      label: "Tell him people can be forgiven",
      requires: [
        new Requirement("Your answer has to lean toward mercy.", {
          when: todo("The player answers his question toward mercy."),
        }),
      ],
      cost: [],
      narrative: new Narrative({
        narration: [
          "ks. Pająk steadies. Mercy becomes a possible answer to his crisis.",
        ],
        gives: {
          clues: [clues.PriestFearsDivineJudgment],
          effects: todoEffect(
            "NPC State Change: the Grace arc opens | Ending Progress: +2 to the Faith in Redemption score",
          ),
        },
      }),
    }),
    askHimWhatHeNeeds: action({
      label: "Ask him what he needs",
      cost: [],
      narrative: new Narrative({
        narration: [
          "ks. Pająk says the lost must be brought back to God before the water comes, especially those with the most to answer for.",
        ],
        gives: {
          clues: [clues.PriestFearsDivineJudgment],
          effects: todoEffect("NPC State Change: players know the Grace path requires getting the guilty to confess"),
        },
      }),
    }),
    pushHimToNameTheSin: action({
      label: "Push him to name the sin",
      requires: [
        new Requirement("You have to press him.", { when: todo("The player presses him to say what he knows.") }),
      ],
      cost: [],
      narrative: new Narrative({
        narration: [
          "ks. Pająk refuses to betray the confessional and ends the meeting.",
        ],
        gives: {
          effects: todoEffect(
            "NPC State Change: his bond with that player cools | Ending Progress: -2 to the Faith in Redemption score",
          ),
        },
      }),
    }),
    tellHimTheValleyDeservesJudgment: action({
      label: "Tell him the valley deserves judgment",
      requires: [
        new Requirement("Your answer has to lean toward judgment.", {
          when: todo("The player answers his question toward condemnation."),
        }),
      ],
      cost: [],
      narrative: new Narrative({
        narration: [
          "ks. Pająk leans harder toward judgment.",
        ],
        gives: {
          clues: [clues.PriestFearsDivineJudgment],
          effects: todoEffect(
            "NPC State Change: the Grace path narrows | Ending Progress: -2 to the Faith in Redemption score",
          ),
        },
      }),
    }),
    shareHisCigarette: action({
      label: "Share his cigarette",
      requires: [
        new Requirement("He doesn't trust you enough.", {
          when: todo("ks. Pająk genuinely trusts the player (mercy supported, or a personal confidence shared in return)"),
        }),
      ],
      promptedBy: [PriestsPlea],
      cost: [],
      narrative: new Narrative({
        narration: [
          "He drops the pretence, takes out a cigarette for himself and offers one to the player. The habit he hides from the village is plain.",
        ],
        gives: { clues: [clues.PriestSmokes] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theReversedConfession: opportunity({
      label: "The reversed confession",
      target: { skills: [Empathy] },
      promptedBy: [PriestsPlea],
      narrative: new Narrative({
        narration: [
          "ks. Pająk has come to a layperson for reassurance a priest is supposed to give. He is frightened.",
        ],
      }),
    }),
    theJudgmentPattern: opportunity({
      label: "The judgment pattern",
      target: { when: (_w, me) => me.has(Culture) || me.has(History) },
      promptedBy: [PriestsPlea],
      narrative: new Narrative({
        narration: [
          "Every scripture example he reaches for is a judgment narrative. His fear points toward the valley deserving to drown.",
        ],
      }),
    }),
    theUnnamedSin: opportunity({
      label: "The unnamed sin",
      target: { skills: [Devotion] },
      promptedBy: [PriestsPlea],
      narrative: new Narrative({
        narration: [
          "He is not speaking generally. He knows a specific sin.",
        ],
      }),
    }),
    theCollarGesture: opportunity({
      label: "The collar gesture",
      target: { skills: [Devotion] },
      promptedBy: [PriestsPlea],
      narrative: new Narrative({
        narration: [
          "The confessional seal is the wall keeping his knowledge in. He is exhausted by holding it.",
        ],
      }),
    }),
    theBrandOnThePaper: opportunity({
      label: "The brand on the paper",
      target: { skills: [Chainsmoker], clues: [clues.PriestSmokes] },
      promptedBy: [clues.PriestSmokes],
      narrative: new Narrative({
        narration: [
          "With the cigarette lit, a smoker reads the brand off the paper at once: premium Carmen, the same the village would name at Janina's door.",
        ],
        gives: { clues: [clues.PriestSmokesCarmen] },
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
