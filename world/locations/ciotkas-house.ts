import { Location, Narrative, Requirement, SkillRequirement, action, opportunity } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";
import { Finesse, Handiwork } from "../skills.ts";
import Ciotka from "../characters/ciotka.ts";
import CiotkaFoundDead from "../events/ciotka-found-dead.ts";
import Glupek from "../characters/glupek.ts";
import Bayonet from "../items/bayonet.ts";
import BarnasLetter from "../items/barnas-letter.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";

export default class CiotkasHouse extends Location {
  readonly id = "ciotkas-house";
  readonly name = "Ciotka's House";
  readonly hook = "The best plot in %NEW_VILLAGE%, across from the Neighbour's house.";
  readonly position = "best plot in the village, across from Dudka's house";
  readonly visitCost = 1;
  // Edek is usually here (not modelled).
  override present(): CharacterRef[] {
    return [Ciotka, Glupek];
  }

  readonly setup = new Narrative({
    narration: [
      "House: Best house and best plot in the village.",
      "House: Former home of Edward Barnaś.",
      "House: Solid construction and good land.",
      "Interior: Clean and obsessively ordered.",
      "Interior: Catholic icons hang on every wall.",
      "Interior: Candles are lit.",
      "Interior: The house smells of soap and cooked grain.",
      "Door: Two locks on the front door — one old and pitted low on the frame, one newer above it. It reads as a fearful woman's caution.",
      "Attic: A hatch in the ceiling with a short ladder folded beside it. It stays shut, and Janina is the only one who goes up.",
      "Edek: He plays with a few worn wooden toys and keeps asking Janina for more of them.",
      "Edek's care: Sharp edges, clutter, and surprises are removed.",
      "Edek's room: His own room. Straw mattress, age-inappropriate wooden toy, scratch marks on the wall.",
      "Edek's room: A grown man's room kept like a small child's. The toys are worn from handling but the room is too quiet, too still.",
      "Edek's room: Deep gouges rake the wall by the bed, high up, where a large hand dragged down again and again.",
      "Janina: Janina Gajda watches the door and distrusts government questions.",
      "Edek: Edek Barnaś is tall, broad, silent, and often stands behind Janina or sits in his corner.",
      "Edek: When dogs are audible outside, he can go rigid or hide behind Janina.",
      "Backyard: The backyard is overgrown and mostly unused.",
      "Backyard: A patch near the fence grows badly and has settled unevenly.",
      "Backyard: The patch can look like a failed old garden bed.",
    ],
    gives: { aware: [CiotkasHouse] },
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // The players come calling at Janina's; from Day 3 she is found dead.
    knockAtJaninasDoor: action({
      label: "Knock at Janina's door",
      promptedBy: [Ciotka],
      cost: [],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { aware: [CiotkaFoundDead] },
      }),
    }),
    // TODO: the unsmoked cigarette has no item file; left in todoEffect. Noise is
    // a mechanic of events/ciotka-found-dead, not modelled here.
    searchEdeksRoom: action({
      label: "Search Edek's room",
      requires: [
        new Requirement("Janina is watching you.", { when: todo("Janina absent or distracted") }),
        new SkillRequirement(Finesse),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Only a real search of the room turns them up, tucked away like treasures among the boy's few things: a single unsmoked cigarette, and an old bayonet kept hidden from Janina. Edek does not smoke, so the cigarette was a gift; its brand and meaning become clear when compared with the butts from the door. What the bayonet is, and that it cannot be his father's, takes a soldier's eye. Ryszard Dudka is right across the road; a search risks him seeing them at it.",
        ],
        gives: {
          items: [Bayonet],
          effects: todoEffect("Item / Evidence: a single unsmoked cigarette from Edek's room | If Dudka notices the search: +1 Noise"),
        },
      }),
    }),
    searchTheAttic: action({
      label: "Search the attic",
      requires: [
        new Requirement("Janina is watching you.", { when: todo("Janina absent or distracted") }),
        // TODO: "climbing the attic hatch" kept as a todo gate; may just be flavour.
        new Requirement("You'd have to get up through the hatch.", { when: todo("climbing the attic hatch") }),
      ],
      promptedBy: [clues.GlupekForbiddenFromAttic],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Up past Edek's toys and Janina's stores, among the dead man's things left where no one looks, is an unopened letter addressed to Edward Barnaś, postmarked 1955 and never opened. Janina keeps the hatch shut and Edek barred from it, so going up risks being caught, and Ryszard Dudka is across the road.",
        ],
        gives: {
          items: [BarnasLetter],
          aware: [BarnasLetter],
          effects: todoEffect("If Dudka notices the search: +1 Noise"),
        },
      }),
    }),
    digInTheBackyard: action({
      label: "Dig in the backyard",
      promptedBy: [clues.TelegramPointsToBarnasYard],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "About a foot down, the players find oilcloth containing a KBW uniform, service insignia, Edward Barnaś's identity documents, deployment dates for the Bieszczady region in 1947, commanding officer kpt. Henryk Ćwiek, and love letters addressed to \"M.K.\"; these can be cross-checked with por. Skowron's classified files, the UPA bunker, and the PGR expense journal.",
        ],
        gives: { effects: todoEffect("Item / Evidence: Edward Barnaś's buried KBW uniform, service documents, and love letters to \"M.K.\".") },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    twoLocksTwoAges: opportunity({
      label: "Two locks, two ages",
      target: { skills: [Handiwork] },
      promptedBy: [clues.CiotkaIsDead],
      narrative: new Narrative({
        narration: [
          "The two locks were not fitted together. The old one below is original to the door; the newer one above was added years later. She did not double up out of fear — at some point she changed the lock on this house.",
        ],
        gives: { clues: [clues.CiotkaChangedTheLock] },
      }),
    }),
    theBoysErrand: opportunity({
      label: "The boy's errand",
      target: { aware: [Glupek] },
      narrative: new Narrative({
        narration: [
          "Partway through the visit Edek tugs Janina's sleeve and asks, low, for more of his toys — the ones kept up in the attic. She soothes him: not now, and not himself; once the gentlemen have gone she will go up and bring a couple down. He is not to climb up there.",
        ],
        gives: { clues: [clues.GlupekForbiddenFromAttic] },
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
