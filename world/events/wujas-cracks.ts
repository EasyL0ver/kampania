import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef, Effect } from "../schema.ts";
import { Empathy, Physique } from "../skills.ts";
import BimberStill from "../locations/bimber-still.ts";
import Wujas from "../characters/wujas.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";

export default class WujasCracks extends Event {
  readonly id = "wujas-cracks";
  readonly name = "Tadek Gajda Cracks";
  readonly hook = "Tadek gets louder at the drinking spot.";
  override at(): LocationRef {
    return BimberStill;
  }

  override present(): CharacterRef[] {
    return [Wujas];
  }
  override readonly hooks: EventHook[] = [
    { text: "Tadek gets louder at the drinking spot.", heardAt: [BimberStill] },
  ];
  readonly setup = new Narrative({
    narration: [
      "Tadek is drunker than usual.",
      "His jokes turn into half-confessions.",
      "He repeats Hania's name.",
      "He cannot keep a single story straight.",
      "He reaches for the bottle whenever the 1954 night is near.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    letHimConfess: action({
      label: "Let him confess",
      requires: [
        new Requirement("Tadek doesn't trust you enough.", { when: (w, me) => w.wujas.bonded.of(me) }),
        new Requirement("He won't talk while threatened.", { when: todo("Tadek is not being threatened") }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Tadek gives the lynch in fragments: Hania knew the family secret and never used it, Helena's threat story was false, Edward came with the rifle, Edward was killed, his body went to the well, and Hania broke free and ran into the night.",
        ],
        gives: {
          clues: [
            clues.JagnaKnewTheSecret,
            clues.WujasParticipatedInLynch,
            clues.WojewodaParticipatedInLynch,
            clues.ButcherParticipatedInLynch,
            clues.SoldierKilledDefendingDaughter,
            clues.LynchBodyInWell,
            clues.ButcherDumpedTheBody,
            clues.JagnaFledTheLynch,
          ],
        },
      }),
    }),
    // TODO: "Violence, committee authority, or explicit threat": committee authority
    // means every player qualifies, so the gate is dropped.
    pressureHimWhileHeCracks: action({
      label: "Pressure him while he cracks",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Tadek shuts down and becomes a danger to himself and the cover-up.",
        ],
        gives: {
          effects: todoEffect("NPC State Change: Tadek enters the suicide or dangerous spiral path"),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    closeToBreaking: opportunity({
      label: "Close to breaking",
      target: { skills: [Empathy] },
      promptedBy: [WujasCracks],
      narrative: new Narrative({
        narration: [
          "He is not performing drunkenness; he is losing control of the secret.",
        ],
        gives: { clues: [clues.WujasIsGuilty] },
      }),
    }),
    missingAWoman: opportunity({
      label: "Missing a woman",
      target: { when: (_w, me) => me.has(Empathy) || me.has(Physique) },
      promptedBy: [WujasCracks],
      narrative: new Narrative({
        narration: [
          "`(requires: Empathy or Physique)` — his fragments circle one woman and one night.",
        ],
        gives: { clues: [clues.WujasMissesSomeone] },
      }),
    }),
    // TODO: source gates on jagna-knew-the-secret and gives the same clue; circular.
    // Kept as written; owner should pick a different gate or a smaller clue.
    blackmailStoryCracks: opportunity({
      label: "Blackmail story cracks",
      target: { skills: [Empathy], clues: [clues.JagnaKnewTheSecret] },
      promptedBy: [WujasCracks],
      narrative: new Narrative({
        narration: [
          "`(requires: jagna-knew-the-secret and Empathy)` — his guilt focuses on the fact that Hania never used what she knew.",
        ],
        gives: { clues: [clues.JagnaKnewTheSecret] },
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
