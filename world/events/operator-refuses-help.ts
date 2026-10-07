import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, Effect, EventHook, LocationRef, Tick, WorldCond } from "../schema.ts";
import { Empathy, Finesse } from "../skills.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";
import WojewodasHouse from "../locations/wojewodas-house.ts";
import UpaBunker from "../locations/upa-bunker.ts";
import Operator from "../characters/secondary/operator.ts";
import Wojewoda from "../characters/wojewoda.ts";
import Jagna from "../characters/jagna.ts";
import Glupek from "../characters/glupek.ts";
import Soldier from "../characters/soldier.ts";
import Matrona from "../characters/matrona.ts";
import Wujas from "../characters/wujas.ts";
import Butcher from "../characters/butcher.ts";
import TheFlood from "./the-flood.ts";
import TheReport from "./the-report.ts";
import CiotkaFoundDead from "./ciotka-found-dead.ts";

export default class OperatorRefusesHelp extends Event {
  readonly id = "operator-refuses-help";
  readonly name = "Operator Refuses Help";
  readonly hook = "A clear voice answering from the telephone exchange while floodwater cuts the village off.";

  // TODO: header says "Zbigniew Gajda's office" but links wojewodas-house.md (there is also pgr-office).
  override at(): LocationRef {
    return WojewodasHouse;
  }

  // Zbigniew optional.
  override present(): CharacterRef[] {
    return [Operator, Wojewoda];
  }
  override readonly hooks: EventHook[] = [
    { text: "A clear voice answering from the telephone exchange while floodwater cuts the village off.", heardAt: "anywhere" },
  ];
  override condition: WorldCond = (w) => w.theFlood.status !== "pending"; // TODO: player call gate
  readonly setup = new Narrative({
    narration: [
      "The operator answers clearly despite the storm.",
      "The line is working.",
      "The operator hears the players' request for rescue.",
      "The operator responds with procedure instead of help.",
      "The operator never says no.",
      "The operator never hangs up.",
      "The operator gives no name, no dispatch, no timeline, and no accountable official.",
      "The operator keeps the channel open and useless as long as the players keep talking.",
    ],
  });

  // Mechanics (see prose): Anonymity and Willingness.
  answersAsHania = false;        // Anonymity: she drops the clerk once named as Hania
  relaysRescueCalls = false;     // Willingness: opened by "Her brother is in the water"
  relaysExposureCalls = false;   // Willingness: opened by "Turn her on the village"

  // The Telegram comes over the same line, while the committee is on it.
  onFire: Tick = (w) => { w.theTelegram.activate(w); };
  // TODO: also "The flood eventually brings down a pole and ends the connection."
  // The Telegram came over this line, so it ends with the call.
  resolve: Tick = (w) => { w.theTelegram.end(w); };

  // "On the line with her" gates are implicit: the players are at this event.

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // A guess buys only a caught breath; only knowing operator-is-jagna flips her.
    // TODO: source keeps operator-is-jagna as a prompt, not a gate; the effect checks it instead.
    nameHer: action({
      label: "Name her",
      promptedBy: [clues.OperatorIsJagna],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The committee puts her name to the voice: Hania. If they are only guessing, saying her name, her father's, or the well buys one caught breath before she resumes procedure, deniable and not repeatable. Once they know the operator is Hania Barnaś and name her as such, she stops pretending: she does not deny it, does not hang up, and the flat clerk's indifference turns quiet, personal, and vengeful. The rescue does not change; every word after is between the committee and Hania.",
        ],
        gives: {
          effects: (w, me) => {
            w.operatorRefusesHelp.answersAsHania = w.operatorRefusesHelp.answersAsHania || me.knows(clues.OperatorIsJagna);
          },
        },
      }),
    }),
    herBrotherIsInTheWater: action({
      label: "Her brother is in the water",
      requires: [
        new Requirement("She still answers as the clerk.", { when: (w) => w.operatorRefusesHelp.answersAsHania }),
        // TODO: "he is alive and trapped now, fled to the UPA bunker after Ciotka Found Dead".
        new Requirement("You can't tell her where Edek is now.", {
          when: todo("Edek is alive and trapped now, fled to the UPA bunker after Ciotka Found Dead"),
        }),
      ],
      promptedBy: [Glupek, Soldier, UpaBunker, CiotkaFoundDead, clues.OperatorIsJagna, clues.EdeksFatherLeft, clues.BarnasHadADaughterHania],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She buried the whole family in her mind in 1954, the baby included. Hearing, and believing, that her brother lived breaks the procedure for good. She stops withholding and relays the call without confirming her identity.",
        ],
        gives: {
          effects: (w) => {
            w.operatorRefusesHelp.relaysRescueCalls = true;
          },
        },
      }),
    }),
    turnHerOnTheVillage: action({
      label: "Turn her on the village",
      requires: [
        new Requirement("She still answers as the clerk.", { when: (w) => w.operatorRefusesHelp.answersAsHania }),
        new Requirement("You can't name who aimed the men.", { clues: [clues.MatronaOrchestratedLynch] }),
        new Requirement("Your list of killers is incomplete.", { clues: [clues.WujasParticipatedInLynch] }),
        new Requirement("Your list of killers is incomplete.", { clues: [clues.WojewodaParticipatedInLynch] }),
        new Requirement("Your list of killers is incomplete.", { clues: [clues.ButcherParticipatedInLynch] }),
      ],
      promptedBy: [Jagna, Matrona, Wujas, Wojewoda, Butcher, clues.OperatorIsJagna],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Given the full, correct roster of the 1954 lynch, she believes the committee knows what was done to her family. She turns the line into a weapon, relaying the calls that expose the village's crimes because they serve retribution, not rescue.",
        ],
        gives: { aware: [TheReport],
          clues: [clues.PhoneIsLifeline],
          // TODO: "the truth can leave the valley through The Report" — modelled as unlocking it.
          effects: (w) => {
            w.operatorRefusesHelp.relaysExposureCalls = true;
          },
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    aPersonOnTheLine: opportunity({
      label: "A person on the line",
      target: { skills: [Empathy] },
      promptedBy: [OperatorRefusesHelp],
      narrative: new Narrative({
        narration: [
          "The line is not failing; the operator is present, lucid, and choosing how much help to provide.",
        ],
      }),
    }),
    procedureWithoutAction: opportunity({
      label: "Procedure without action",
      target: { skills: [Finesse] },
      promptedBy: [OperatorRefusesHelp],
      narrative: new Narrative({
        narration: [
          "Every answer records or routes the request without sending help.",
        ],
      }),
    }),
    theMissingRefusal: opportunity({
      label: "The missing refusal",
      target: { skills: [Finesse] },
      promptedBy: [OperatorRefusesHelp],
      narrative: new Narrative({
        narration: [
          "The operator avoids a clear no because a clear refusal could be challenged.",
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
