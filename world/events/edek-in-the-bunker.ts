import { Event, Narrative, Requirement, SkillRequirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef, WorldCond } from "../schema.ts";
import { Empathy, Medicine, Physique, Survival, Violence } from "../skills.ts";
import * as clues from "../clues.ts";
import { todoEffect } from "../todo.ts";
import UpaBunker from "../locations/upa-bunker.ts";
import Glupek from "../characters/glupek.ts";
import CiotkaFoundDead from "./ciotka-found-dead.ts";

export default class EdekInTheBunker extends Event {
  readonly id = "edek-in-the-bunker";
  readonly name = "Edek in the Bunker";
  readonly hook = "From the bunker mouth: movement in the dark, heavy breathing, a large shape pressed back into the earth.";
  override at(): LocationRef {
    return UpaBunker;
  }

  override present(): CharacterRef[] {
    return [Glupek];
  }
  override readonly hooks: EventHook[] = [
    { text: "From the bunker mouth: movement in the dark, heavy breathing, a large shape pressed back into the earth.", heardAt: [UpaBunker] },
  ];
  override condition: WorldCond = (w) => w.ciotkaFoundDead.status !== "pending"; // TODO: Edek route trigger
  readonly setup = new Narrative({
    narration: [
      "Edek Barnaś is inside the bunker, near the entrance, pressed back against the earth wall.",
      "He has been here since the night Janina Gajda died.",
      "He is cold and has not eaten.",
      "He watches the players' hands and does not bolt.",
      "He goes still when frightened and will not say his aunt's name.",
      "The ceiling is low and the cut is tight; the lower sections are flooded.",
      "Crowded, grabbed, or faced with the butcher, dogs, or raised voices, he panics.",
      "Approached slowly, alone, without raised voices, he calms and can be reached.",
      "He trusts ks. Władysław Pająk and the church.",
    ],
  });

  // Reached and calmed: he will talk and can be led.
  edekCalmed = false;

  // TODO: mechanic (see prose/events/edek-in-the-bunker.md) only partly modelled:
  // offered no trusted destination he stays; his death needs a field on Glupek (not there yet).

  // ------------------------------------------------------------ actions

  readonly allActions = {
    reachHim: action({
      label: "Reach him",
      requires: [
        new Requirement("You don't know where the bunker is.", { aware: [UpaBunker] }),
      ],
      promptedBy: [clues.EdekRanToUpaBunker],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He goes still and lets the players near. He knows his aunt is dead and will not say her name. He calms enough to be spoken to and led.",
        ],
        gives: {
          effects: (w) => {
            w.edekInTheBunker.edekCalmed = true;
          },
        },
      }),
    }),
    coaxWhatJaninaToldHim: action({
      label: "Coax what Janina told him",
      requires: [
        new Requirement("He isn't calm enough to talk.", { when: (w) => w.edekInTheBunker.edekCalmed }),
        new SkillRequirement(Empathy),
      ],
      promptedBy: [clues.EdekRanToUpaBunker],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "In broken fragments he gives up what his aunt told him before she died: the village killed his father, and he is what is left of it. Saying it breaks him again.",
        ],
        gives: { clues: [clues.CiotkaToldEdekTheTruth] },
      }),
    }),
    takeHimToThePriest: action({
      label: "Take him to the priest",
      requires: [new Requirement("He isn't calm enough to be led.", { when: (w) => w.edekInTheBunker.edekCalmed })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Named the priest, or led toward the church, he follows. ks. Władysław Pająk takes him in and hides him in the rectory cellar.",
        ],
        gives: {
          effects: (w) => {
            w.glupek.shelter = "at-the-priests";
            w.glupek.inBunker = false;
          },
        },
      }),
    }),
    takeHimToHelena: action({
      label: "Take him to Helena",
      requires: [new Requirement("He isn't calm enough to be led.", { when: (w) => w.edekInTheBunker.edekCalmed })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Led under committee authority, he follows to Helena Rzepka's. She takes the living evidence into her own keeping.",
        ],
        gives: {
          effects: (w) => {
            w.glupek.shelter = "at-helenas";
            w.glupek.inBunker = false;
          },
        },
      }),
    }),
    forceHimOut: action({
      label: "Force him out",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Grabbed, cornered, or driven, he panics in the tight flooded cut, breaks past into the dark lower tunnels, and does not come back up.",
        ],
        gives: { effects: todoEffect("World State Change: Edek Barnaś dies in the bunker.") },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    heHasNotRunFromYou: opportunity({
      label: "He has not run from you",
      target: { skills: [Empathy] },
      promptedBy: [EdekInTheBunker],
      narrative: new Narrative({
        narration: [
          "He is pressed to the wall watching hands, not fleeing; he is hiding from the village and from what he was told, not from the players.",
        ],
      }),
    }),
    tooBigForTheTunnel: opportunity({
      label: "Too big for the tunnel",
      target: { when: (_w, me) => me.has(Violence) || me.has(Physique) },
      promptedBy: [EdekInTheBunker],
      narrative: new Narrative({
        narration: [
          "In the low flooded cut his panic would be lethal, to him and to anyone between him and the dark.",
        ],
      }),
    }),
    daysWithoutFood: opportunity({
      label: "Days without food",
      target: { when: (_w, me) => me.has(Survival) || me.has(Medicine) },
      promptedBy: [EdekInTheBunker],
      narrative: new Narrative({
        narration: [
          "Cold and unfed since the night she died, he cannot last much longer in the bunker.",
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
}
