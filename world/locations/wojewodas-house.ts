import { Location, Narrative, action, opportunity } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";
import { Culture, Devotion, Empathy, Medicine } from "../skills.ts";
import Wife from "../characters/wife.ts";
import Junior from "../characters/junior.ts";
import Wujas from "../characters/wujas.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";

export default class WojewodasHouse extends Location {
  readonly id = "wojewodas-house";
  readonly name = "Wojewoda's House";
  readonly hook = "Zbigniew Gajda's family home, the largest house in %NEW_VILLAGE%.";
  readonly position = "Gajda family home, largest house in the village";
  readonly visitCost = 1;
  // Irena usually; Marek variable; Tadek sometimes (not modelled).
  override present(): CharacterRef[] {
    return [Wife, Junior, Wujas];
  }

  readonly setup = new Narrative({
    narration: [
      "The house is the largest in %NEW_VILLAGE%.",
      "The construction is solid by village standards.",
      "The house has a proper kitchen and a main room used for dining.",
      "Family photos hang on the wall.",
      "A crucifix hangs in the house.",
      "A small dark wooden icon sits among the Catholic imagery.",
      "Irena Gajda keeps the house spotless.",
      "Tea is offered to visitors.",
      "Zbigniew Gajda's office, phone, maps, and paperwork are at the PGR.",
      "If Zbigniew is home in the evening, he moves stiffly through one shoulder and twists slowly.",
    ],
    gives: { aware: [WojewodasHouse] },
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    visitTheFamily: action({
      label: "Visit the family",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Irena serves tea, Marek shows off if present, and Tadek is tolerated if present.",
        ],
        gives: { effects: todoEffect("NPC State Change: Irena Gajda can become available for a separate conversation path if trust is built.") },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    // TODO: "Zbigniew Gajda home" is world state with nothing to read yet; todo trigger.
    oldWound: opportunity({
      label: "Old wound",
      trigger: todo("Zbigniew Gajda home"),
      target: { skills: [Medicine] },
      narrative: new Narrative({
        narration: [
          "Zbigniew's ribs show an old badly healed injury from a single heavy blow.",
        ],
        gives: { clues: [clues.WojewodaWasHurtThatNight] },
      }),
    }),
    // TODO: "Culture or faith knowledge" — faith knowledge read as Devotion.
    iconOnTheShelf: opportunity({
      label: "Icon on the shelf",
      target: { when: (_w, me) => me.has(Culture) || me.has(Devotion) },
      narrative: new Narrative({
        narration: [
          "The small wooden icon is Greek Catholic or Orthodox Lemko devotional art.",
        ],
        gives: { clues: [clues.SiblingsAreLemko] },
      }),
    }),
    irenasHospitality: opportunity({
      label: "Irena's hospitality",
      target: { skills: [Empathy] },
      narrative: new Narrative({
        narration: [
          "Irena hosts politely while staying tense.",
        ],
        gives: { clues: [clues.IrenaIsWatchful] },
      }),
    }),
    marekBragging: opportunity({
      label: "Marek bragging",
      trigger: todo("Marek Gajda present"),
      target: { skills: [Empathy] },
      narrative: new Narrative({
        narration: [
          "Marek boasts about the gun in his father's office.",
        ],
        gives: { clues: [clues.WojewodaHasGun] },
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
