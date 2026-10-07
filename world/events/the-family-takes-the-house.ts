import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, Effect, EventHook, LocationRef, Tick, WorldCond } from "../schema.ts";
import { Empathy } from "../skills.ts";
import CiotkasHouse from "../locations/ciotkas-house.ts";
import Ciotka from "../characters/ciotka.ts";
import Priest from "../characters/priest.ts";
import Wojewoda from "../characters/wojewoda.ts";
import Matrona from "../characters/matrona.ts";
import Neighbour from "../characters/neighbour.ts";
import CiotkaFoundDead from "./ciotka-found-dead.ts";
import * as clues from "../clues.ts";

// TODO: mechanic "fixed outcome" (death ruled natural, body to the church, family
// takes the house, attic closed, Edek to be brought home) not modelled yet
// (see prose/events/the-family-takes-the-house.md).
export default class TheFamilyTakesTheHouse extends Event {
  readonly id = "the-family-takes-the-house";
  readonly name = "The Family Takes the House";
  readonly hook = "Voices and footsteps come up the path to the house.";
  override at(): LocationRef {
    return CiotkasHouse;
  }

  // Janina Gajda is present as the body.
  override present(): CharacterRef[] {
    return [Ciotka, Priest, Wojewoda, Matrona, Neighbour];
  }
  override readonly hooks: EventHook[] = [
    { text: "Voices and footsteps come up the path to the house.", heardAt: "anywhere" },
  ];
  // The family arriving closes the committee's time alone in the house.
  onFire: Tick = (w) => { w.ciotkaFoundDead.end(w); };
  override condition: WorldCond = (w) => w.ciotkaFoundDead.status !== "pending";
  readonly setup = new Narrative({
    narration: [
      "The priest steps back and says little from here.",
      "Zbigniew Gajda takes charge of the house as family and sołtys.",
      "Helena Rzepka composes the body and starts arranging the church and funeral.",
      "Ryszard Dudka stands at the fence, not crossing into the yard.",
      "The wrecked corner, burned-out candles, and open back door are as the committee found them.",
      "If the attic was opened, Zbigniew Gajda sees it, calls the contents his sister's stored junk, and closes it.",
      "Helena Rzepka presses Zbigniew Gajda: old, frail, her heart gave out, God's will; find the boy and bring him home.",
      "Ryszard Dudka does not believe it but holds his tongue, as he did in 1954.",
    ],
  });

  // TODO: "Dudka at the fence" was an opportunity with `(requires: nothing)` and no
  // Gives: it is a Setup fact, kept in prose only.

  // ------------------------------------------------------------ actions

  readonly allActions = {
    sayWhatDoesNotFit: action({
      label: "Say what does not fit",
      requires: [
        new Requirement("You have nothing that doesn't fit.", {
          when: (_w, me) =>
            me.knows(clues.CiotkaHouseWrecked) || me.knows(clues.CiotkaHurtBeforeDeath) || me.knows(clues.CiotkaHadAVisitor),
        }),
      ],
      promptedBy: [clues.CiotkaHouseWrecked, clues.CiotkaHurtBeforeDeath, clues.CiotkaHadAVisitor],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Naming the wreck, the bruise, or the second cup breaks Ryszard Dudka. He accuses the sołtys's son to his face: the boy came the day before she died and they fought. Zbigniew Gajda goes still; Helena Rzepka buries it as a grieving man's nonsense. The ruling does not change.",
        ],
        gives: {
          clues: [clues.JuniorPressedCiotka],
          // TODO: also "counts toward Ryszard Dudka's Bond | World State Change: foul-play rumours sharpen."
          effects: (w, me) => {
            w.wojewoda.grudgeHeld.set(me, true);
          },
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    whoDecides: opportunity({
      label: "Who decides",
      target: { skills: [Empathy] },
      promptedBy: [TheFamilyTakesTheHouse],
      narrative: new Narrative({
        narration: [
          "Helena leads, Zbigniew follows her.",
        ],
      }),
    }),
    theOverdoseTheyAreBurying: opportunity({
      label: "The overdose they are burying",
      target: { when: (_w, me) => me.knows(clues.CiotkaOverdosed) || me.knows(clues.CiotkaHurtBeforeDeath) },
      promptedBy: [TheFamilyTakesTheHouse],
      narrative: new Narrative({
        narration: [
          "`(requires: holding ciotka-overdosed or ciotka-hurt-before-death)` — Helena's weak heart and Dudka's foul play are both wrong; only the committee knows what killed her.",
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
