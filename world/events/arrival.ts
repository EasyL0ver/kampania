import { Event, Narrative, action, anyone, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef, Tick, WorldCond } from "../schema.ts";
import { Finesse, Handiwork } from "../skills.ts";
import * as clues from "../clues.ts";
import NewVillage from "../locations/new-village.ts";
import PgrOffice from "../locations/pgr-office.ts";
import BarbarasHouse from "../locations/barbaras-house.ts";
import TheStore from "../locations/the-store.ts";
import Wojewoda from "../characters/wojewoda.ts";
import Wife from "../characters/wife.ts";
import Wujas from "../characters/wujas.ts";
import Barbara from "../characters/barbara.ts";
import Pawelek from "../characters/pawelek.ts";
import DrinkingCrew from "../characters/secondary/drinking-crew.ts";
import Dinner from "./dinner.ts";
import TheCarIn from "./the-car-in.ts";

export default class Arrival extends Event {
  readonly id = "arrival";
  readonly name = "Arrival";
  readonly hook = "A car stopping on the muddy road as Zbigniew Gajda comes forward to meet the committee.";
  override at(): LocationRef {
    return this.location;
  }

  override present(): CharacterRef[] {
    return this.presentCharacters;
  }
  override readonly hooks: EventHook[] = [
    { text: "The car stops on the muddy road in %NEW_VILLAGE%.", heardAt: "anywhere" },
  ];
  // The drive is over once the car stops in the village.
  onFire: Tick = (w) => { w.theCarIn.end(w); };
  override condition: WorldCond = (w) => w.theCarIn.status !== "pending";
  readonly setup = new Narrative({
    narration: [
      "The car stops on the muddy road in %NEW_VILLAGE%.",
      "Zbigniew Gajda is waiting for the committee.",
      "Zbigniew Gajda gives a firm handshake.",
      "Down the road, men drink in broad daylight on the steps of the village store.",
      "Further along, by a red-brick house at the edge of the village, a young woman stands with a small boy.",
      "The church on the hill is unusually well maintained — fresh repairs, a sound roof, firewood stacked high.",
      "Dogs bark toward the forest.",
    ],
  });

  // Set when the committee warns Zbigniew about the flood: no dinner invitation.
  floodRiskRaised = false;
  // The committee is heading off to settle in (the scene is wrapping up).
  leaving = false;

  // Starts where the car stops; the committee may follow Zbigniew to his office.
  location: LocationRef = NewVillage;
  // Only Zbigniew; the others on the road are background.
  presentCharacters: CharacterRef[] = [Wojewoda];

  // ------------------------------------------------------------ actions

  readonly allActions = {
    headOffToSettleIn: action({
      label: "Head off to settle in",
      cost: [],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { effects: (w) => { w.arrival.leaving = true; w.arrival.end(w); } },
      }),
    }),
    followWojewodaToHisOffice: action({
      label: "Follow Wojewoda to his office",
      promptedBy: [Wojewoda, PgrOffice],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Zbigniew Gajda welcomes the committee into his office: whatever it needs, he is at its disposal.",
          "He takes a bottle of cognac from the cabinet and pours a glass for each of them before anyone has sat down.",
        ],
        gives: {
          effects: (w, me) => {
            w.arrival.location = PgrOffice;
            w.arrival.presentCharacters = [Wojewoda, Wife];
            me.location = PgrOffice;
          },
        },
      }),
    }),
    getOutAndLookAround: action({
      label: "Get out and look around",
      promptedBy: [NewVillage],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Standing on the muddy road, the committee takes in the village: Barbara Kopacz's house at the edge beside Dudka's, and the store where the crew loiters.",
        ],
        gives: { aware: [BarbarasHouse, TheStore, Barbara, Pawelek] },
      }),
    }),
    tellWojewodaAboutTheFloodRisk: action({
      label: "Tell Wojewoda about the flood risk",
      cost: [],
      narrative: new Narrative({
        narration: [
          "He listens, treats the warning as serious but unproven, and urges the committee to get to work at once and bring back geological confirmation.",
        ],
        gives: {
          effects: (w) => {
            w.arrival.floodRiskRaised = true;
            w.wojewoda.raiseMiscalculation("suspicious");
          },
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    phoneInHisOffice: opportunity({
      label: "The phone in his office",
      trigger: (w): boolean => w.arrival.location === PgrOffice,
      target: anyone,
      promptedBy: [PgrOffice],
      narrative: new Narrative({
        narration: [
          "He plays the gracious host: he is the committee's point of contact, and the heavy phone on his desk is the only line for miles, so anything the village or the committee needs runs through him.",
        ],
        gives: { clues: [clues.WojewodaHasOnlyPhone] },
      }),
    }),
    invitedToDinner: opportunity({
      label: "Invited to dinner",
      trigger: (w): boolean => w.arrival.allActions.headOffToSettleIn.done && !w.arrival.floodRiskRaised,
      target: anyone,
      promptedBy: [Wojewoda],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { aware: [Dinner] },
      }),
    }),
    theListeningAtTheDoor: opportunity({
      label: "The listening at the door",
      target: { skills: [Finesse] },
      promptedBy: [Arrival],
      narrative: new Narrative({
        narration: [
          "A shadow and a floorboard creak show someone is listening during the conversation with Zbigniew Gajda.",
        ],
        gives: { clues: [clues.IrenaIsWatchful] },
      }),
    }),
    theChurchIsTooNice: opportunity({
      label: "The church is too nice",
      target: { skills: [Handiwork] },
      promptedBy: [Arrival],
      narrative: new Narrative({
        narration: [
          "From the road: fresh repairs, sound roof, ample firewood stacked — beyond what a village this size funds.",
        ],
        gives: { clues: [clues.ChurchTooNice] },
      }),
    }),
  };

  // On the road the others stay in the background: they can be asked about
  // (made known), not gone over to; Zbigniew is pressing on to his office.
  readonly roadActions = {
    introduceYourself: action({
      label: "Introduce yourself",
      cost: [],
      narrative: new Narrative({
        narration: [
          "Zbigniew Gajda hears the committee out, nods, and invites them to his office to talk business: the papers are there, and so is the tea.",
        ],
        gives: { aware: [PgrOffice] },
      }),
    }),
    // Asking only makes them known; they stay where they are.
    askAboutTheWomanAndTheBoy: action({
      label: "Ask about the woman and the boy",
      cost: [],
      narrative: new Narrative({
        narration: [
          "Zbigniew Gajda follows your glance down the road: Barbara Kopacz, he says, a PGR worker, and her boy Pawełek; that is their red-brick house at the edge of the village.",
        ],
        gives: { aware: [Barbara, Pawelek, BarbarasHouse] },
      }),
    }),
    askAboutTheMenAtTheStore: action({
      label: "Ask about the men drinking at the store",
      cost: [],
      narrative: new Narrative({
        narration: [
          "Zbigniew Gajda barely turns his head: his brother Tadek's crew, he says, village men who drink together. Harmless.",
        ],
        gives: { aware: [DrinkingCrew, Wujas] },
      }),
    }),
  };

  override get actions() {
    return this.location === NewVillage ? { ...this.allActions, ...this.roadActions } : this.allActions;
  }

  override get opportunities() {
    return this.allOpportunities;
  }
}
