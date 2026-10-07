import { Location, Narrative, Requirement, action, anyone, opportunity } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";
import { Finesse, Violence } from "../skills.ts";
import Neighbour from "../characters/neighbour.ts";
import Ciotka from "../characters/ciotka.ts";
import BimberBottle from "../items/bimber-bottle.ts";
import VodkaBottle from "../items/vodka-bottle.ts";
import * as clues from "../clues.ts";
import { todo } from "../todo.ts";

export default class NeighboursHouse extends Location {
  readonly id = "neighbours-house";
  readonly name = "Neighbour's House";
  readonly hook = "The house beside Barbara's, across from Ciotka's.";
  readonly position = "beside Barbara's house, across from Ciotka's";
  readonly visitCost = 1;
  // Ryszard is often out during the day; evenings most reliable (not modelled).
  override present(): CharacterRef[] {
    return [Neighbour];
  }

  readonly setup = new Narrative({
    narration: [
      "House: Bachelor's house, neat but bare.",
      "House: No visible family possessions.",
      "Interior: Hunting rifle on a rack by the door.",
      "Interior: Table with one bottle and one chair.",
      "Interior: Bed visible behind a partition.",
      "Window to Barbara: A window faces Barbara's house and has no curtain.",
      "Window to Ciotka: A window faces Ciotka's house, the former Edward Barnaś plot.",
      "Window to Ciotka: The window has heavy yellowed curtains that stay drawn.",
      "Ryszard: If home, Ryszard Dudka is tense with visitors.",
      "Ryszard: He resents state officials because of the coming flood.",
      "Night: His light may be on at 3am.",
      "Night: Pacing can be heard from nearby.",
      "Fence: He sometimes knows things players told Barbara earlier.",
    ],
    gives: { aware: [NeighboursHouse] },
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    censusVisitInterviewRyszard: action({
      label: "Census visit — interview Ryszard",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Ryszard gives household facts, complains about the dam and the state, and watches whether the committee asks only census questions or probes the past.",
        ],
        gives: { effects: (w) => { w.neighbour.knowsOfficialInterest = true; } },
      }),
    }),
    pushHimAboutThePast: action({
      label: "Push him about the past",
      requires: [new Requirement("He won't open up to you like this.", { when: todo("Alcohol, trust, or direct pressure") })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Ryszard gives fragments about sounds, movement toward %OLD_VILLAGE%, the next morning's silence, and a warning about the well.",
        ],
        gives: { clues: [clues.NeighbourHeardTheLynch] },
      }),
    }),
    drinkWithHim: action({
      label: "Drink with him",
      requires: [new Requirement("You haven't brought a bottle.", { when: (_w, me) => me.holds(VodkaBottle) || me.holds(BimberBottle) })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Alcohol loosens Ryszard's guarded fragments; he talks about Barbara, Pawełek, and failing to stop harm from happening again.",
        ],
        gives: { clues: [clues.NeighbourHeardTheLynch] },
      }),
    }),
    // TODO: "Know Janina lives there" modelled as aware of Ciotka.
    askAboutCiotkaNextDoor: action({
      label: "Ask about Ciotka next door",
      promptedBy: [Ciotka],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Ryszard says Janina cares for the boy, says Edek is not hers, and shuts down further detail.",
        ],
        gives: { clues: [clues.NeighbourKnowsAboutEdek] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    drawnCurtain: opportunity({
      label: "Drawn curtain",
      target: { skills: [Finesse] },
      narrative: new Narrative({
        narration: [
          "The window toward Ciotka's house is always covered, while the window toward Barbara's house is open.",
        ],
        gives: { clues: [clues.NeighbourAvoidsCiotkasWindow] },
      }),
    }),
    huntingRifle: opportunity({
      label: "Hunting rifle",
      target: { skills: [Violence] },
      narrative: new Narrative({
        narration: [
          "Ryszard has a licensed hunting rifle and knows how to shoot.",
        ],
        gives: { clues: [clues.NeighbourHasRifle] },
      }),
    }),
    nightPacing: opportunity({
      label: "Night pacing",
      target: { when: todo("visiting late, staying nearby, or watching at night") },
      narrative: new Narrative({
        narration: [
          "Ryszard keeps his light on and paces at 3am.",
        ],
        gives: { clues: [clues.NeighbourHasInsomnia] },
      }),
    }),
    informationFromBarbara: opportunity({
      label: "Information from Barbara",
      // TODO: "told Barbara information" read as having talked to her about the village.
      trigger: (w) => w.barbara.allActions.askAboutTheVillage.done,
      target: anyone,
      narrative: new Narrative({
        narration: [
          "Ryszard knows things the players only told Barbara.",
        ],
        gives: { clues: [clues.BarbaraIsASieve] },
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
