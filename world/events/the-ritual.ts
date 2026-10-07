import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef, World, Effect, WorldCond } from "../schema.ts";
import { Culture, Empathy, Language } from "../skills.ts";
import OldVillageRuins from "../locations/old-village-ruins.ts";
import OldVillageCerkiew from "../locations/old-village-cerkiew.ts";
import Hag from "../characters/hag.ts";
import Babcia from "../characters/babcia.ts";
import ParaskewiasList from "../items/paraskewias-list.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";

// TODO: mechanic "the well's nightmare pressure" / ritual ending path
// (story-facts/the-ritual.md, well-influence.md) not modelled yet.
export default class TheRitual extends Event {
  readonly id = "the-ritual";
  readonly name = "Performing the Ritual";
  readonly hook = "Gathering ritual materials and arranging them at the well or cerkiew.";

  // TODO: at the well before the flood claims it, at the cerkiew after that.
  // No "well flooded" state exists yet; chose the ruins (well).
  override at(): LocationRef {
    return OldVillageRuins;
  }

  // Paraskewia only if she survived the confrontation. TODO: Stefania only if
  // Barbara brought her; not modelled, always listed.
  override present(w: World): CharacterRef[] {
    return w.hag.alive ? [Hag, Babcia] : [Babcia];
  }
  override readonly hooks: EventHook[] = [
    { text: "Gathering ritual materials and arranging them at the well or cerkiew.", heardAt: "anywhere" },
  ];
  // TODO: condition should check if player knows all required clues; gated in actions for now
  readonly setup = new Narrative({
    narration: [
      "The Form is Paraskewia Chyłak's arrangement of icons, candles, herbs, incense, bread, water, and prayer materials (`hag-has-the-form`).",
      "The Words are the Lemko panakhyda held by Stefania Kopacz (`babcia-has-the-words`).",
      "The Truth is the players naming the dead and saying what happened to them (`players-supply-truth`).",
      "The 1947 Lemko dead are in the well: Wasyl, Anna, Semen and Kateryna Koval; Petro and Pelagia Hnat; Mychajło Szafran; Fedir Mac; Olena Krywda; Hryhorij Pyś; Stepan Kiczura; Anastasija Sowa. See Paraskewia's List of the Dead and the roster.",
      "Dmytro Kosach is named with the 1947 dead.",
      "Edward Barnaś is the 1954 lynch victim in the well.",
      "Janina Gajda is named only if Rezeń took her body to the well (`rezen-fed-ciotka-to-well`).",
      "Paraskewia Chyłak is named only if she died at the confrontation and her body was dropped in the well.",
      "Stanisław Rezeń is named only if he died at the confrontation and entered the well.",
      "Hania Barnaś is not named as dead unless the players choose wrongly (`jagna-fled-the-lynch`).",
      "kpt. Henryk Ćwiek is not named as one of the well dead.",
      "Barbara Kopacz must bring Stefania Kopacz if Babcia is physically present.",
      "If Paraskewia Chyłak is present, she kneels at the rim and supplies the form.",
      "If Paraskewia Chyłak is dead, the players use her materials and memory.",
      "If Stefania Kopacz is present, she speaks the panakhyda.",
      "At least one living voice must speak the names and the truth.",
      "ks. Pająk does not gatekeep the rite; see spiritual-endings.md.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    performTheRitual: action({
      label: "Perform the ritual",
      requires: [
        new Requirement("You don't have the Form of the rite.", { clues: [clues.HagHasTheForm] }),
        new Requirement("You don't have the Words of the rite.", { clues: [clues.BabciaHasTheWords] }),
        new Requirement("You don't have the Truth to speak.", { clues: [clues.PlayersSupplyTruth] }),
      ],
      promptedBy: [ParaskewiasList, OldVillageCerkiew],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The players name the dead, say what was done to them, and perform the rite at the well or the cerkiew.",
        ],
        gives: {
          effects: todoEffect("World State Change: the well's nightmare pressure lifts | Ending Progress: the ritual path advances and remains compatible with wife-junior-investigation"),
        },
      }),
    }),
    speakOnlyTheTruth: action({
      label: "Speak only the truth",
      requires: [
        new Requirement("You don't have the Truth to speak.", { clues: [clues.PlayersSupplyTruth] }),
        new Requirement("You have the full rite; perform it.", {
          when: (_w, me) => !me.knows(clues.HagHasTheForm) || !me.knows(clues.BabciaHasTheWords),
        }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The players name the dead and say what happened without the full rite.",
        ],
        gives: {
          effects: todoEffect("World State Change: the atmosphere loosens slightly and the dream pressure is reduced but not lifted"),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    // TODO: "ritual materials visible" not modelled.
    lemkoRite: opportunity({
      label: "Lemko rite",
      trigger: todo("ritual materials visible"),
      target: { skills: [Culture] },
      promptedBy: [TheRitual],
      narrative: new Narrative({
        narration: [
          "`(requires: Culture and ritual materials visible)` — the rite uses fire, incense, offerings, and prayer for unquiet dead.",
        ],
        gives: { clues: [clues.HagTendsTheWell, clues.DeadNeverMourned] },
      }),
    }),
    paraskewiaSharesTheBurden: opportunity({
      label: "Paraskewia shares the burden",
      trigger: (w) => w.hag.alive,
      target: { skills: [Empathy] },
      promptedBy: [TheRitual],
      narrative: new Narrative({
        narration: [
          "`(requires: Paraskewia Chyłak present and Empathy)` — she lets the players speak the truth she did not know.",
        ],
      }),
    }),
    // TODO: also requires Stefania Kopacz present; not modelled.
    stefaniaIsLucid: opportunity({
      label: "Stefania is lucid",
      target: { when: (_w, me) => me.has(Empathy) || me.has(Language) },
      promptedBy: [TheRitual],
      narrative: new Narrative({
        narration: [
          "`(requires: Stefania Kopacz present and Empathy or Language)` — she speaks the panakhyda completely.",
        ],
      }),
    }),
    noCourtRequired: opportunity({
      label: "No court required",
      target: { skills: [Culture] },
      promptedBy: [TheRitual],
      narrative: new Narrative({
        narration: [
          "The rite requires naming and acknowledgement, not proof accepted by an authority.",
        ],
        gives: { clues: [clues.PlayersSupplyTruth] },
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
