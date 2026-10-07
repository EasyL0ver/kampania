import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, Effect, EventHook, LocationRef, Tick, WorldCond } from "../schema.ts";
import { Culture, Empathy, Finesse } from "../skills.ts";
import * as clues from "../clues.ts";
import { todoEffect } from "../todo.ts";
import MatronasHouse from "../locations/matronas-house.ts";
import Matrona from "../characters/matrona.ts";
import Painter from "../characters/painter.ts";

export default class CoffeeAtHelenas extends Event {
  readonly id = "coffee-at-helenas";
  readonly name = "Coffee at Helena's";
  readonly hook = "Helena Rzepka sends word to the committee.";
  override at(): LocationRef {
    return MatronasHouse;
  }

  override present(): CharacterRef[] {
    return [Matrona, Painter];
  }
  override readonly hooks: EventHook[] = [
    { text: "Helena Rzepka sends word to the committee.", heardAt: "anywhere" },
    { text: "Helena Rzepka may appear at the committee's door.", heardAt: "anywhere" },
  ];
  override condition: WorldCond = (_w) => true; // TODO: Day 6 morning gate in calendar
  // TODO: distil setup facts from prose (Helena's argument per clue held is GM-facing prose).
  readonly setup = new Narrative({
    narration: [
      "The kitchen has a clean pressed cloth.",
      "The kitchen has real coffee.",
      "Fresh baked food is on the table.",
      "A small crucifix hangs on the wall.",
      "A clock ticks in the room.",
      "Helena Rzepka seats the committee herself.",
      "Helena Rzepka pours the coffee herself.",
      "Helena Rzepka waits until the committee has eaten before speaking.",
      "The hospitality is more generous than ordinary village conditions support.",
      "Emil Rzepka refills cups at the edges of the room.",
      "Emil Rzepka avoids eye contact.",
      "Emil Rzepka flinches when Helena Rzepka says his name.",
      "Helena Rzepka argues that exposing old crimes harms the living and raises none of the dead.",
      "If players hold `something-happened-in-54`, `lynch-body-in-well`, `wujas-participated-in-lynch`, `wojewoda-participated-in-lynch`, or `butcher-participated-in-lynch`, she says naming the 1954 death buys nothing now.",
      "If players hold `wojewoda-was-hurt-that-night`, she says Zbigniew Gajda is the only person holding the village together during the flood.",
      "If players hold `siblings-are-lemko`, she says writing the Gajdas' Lemko identity into a state report makes them a target.",
      "If players hold `departure-declaration-forged`, she says pursuing the forged paper will destroy Emil Rzepka.",
      "If players hold `army-massacred-civilians-in-1947`, `massacre-was-covered-up`, or `massacre-bodies-in-well`, she says no Polish court will try 1947.",
      "If players hold `glupek-strangled`, she says exposing how Edek Barnaś was hurt strips away Janina Gajda's care for him.",
      "If players hold `mazur-death-covered-up`, she says filing the truth about the PGR death would end Wanda Mazur's payments.",
      "If players hold `wujas-is-guilty`, she says Tadek Gajda's punishment is already visible in his drinking.",
      "If players hold `jagna-painter-affair` or `matrona-controls-painter`, she says exposing the affair only breaks Emil Rzepka further.",
      "If players hold `matrona-orchestrated-lynch` or `painter-heard-matrona`, she admits she aimed the mob and argues that naming her hands the state a Lemko woman to punish.",
      "If the committee needs one name for the report, Helena Rzepka offers Stanisław Rezeń.",
    ],
  });
  composure = 1;

  // TODO: also "Helena Rzepka leans on Zbigniew Gajda, tightens her grip on Emil Rzepka, and lets the lynch proceed."
  // Unless the players took her scapegoat, she stops offering the quiet solution.
  resolve: Tick = (w) => {
    w.matrona.stoppedQuietSolution = w.matrona.stoppedQuietSolution || !w.coffeeAtHelenas.allActions.takeTheScapegoat.done;
  };

  // ------------------------------------------------------------ actions

  readonly allActions = {
    takeTheScapegoat: action({
      label: "Take the scapegoat — give them Rezeń",
      cost: [],
      narrative: new Narrative({
        narration: [
          "The committee names Stanisław Rezeń in the report as the valley's guilt; the Lemko secret, the 1954 lynch, the forgery, and the massacre stay buried behind his name.",
        ],
        gives: {
          effects: todoEffect(
            "NPC State Change: Helena Rzepka becomes relieved and warm toward the players | World State Change: Stanisław Rezeń becomes Ryszard Dudka's locked lynch target unless players later intervene at the lynch.",
          ),
        },
      }),
    }),
    confrontHerWithHerOwnHand: action({
      label: "Confront her with her own hand",
      requires: [
        new Requirement("You can't show she aimed the mob.", {
          when: (_w, me) => me.knows(clues.MatronaOrchestratedLynch) || me.knows(clues.PainterHeardMatrona),
        }),
      ],
      promptedBy: [clues.MatronaOrchestratedLynch, clues.PainterHeardMatrona],
      cost: [{ composure: 1 }],
      narrative: new Narrative({
        narration: [
          "Helena Rzepka drops the performance, admits she aimed the mob, falsely claims Hania Barnaś was blackmailing the family, and truthfully identifies Edward Barnaś as a 1947 participant who took Lemko land.",
        ],
        gives: {
          clues: [clues.SoldierParticipatedInMassacre, clues.SoldierTookBestLand],
          effects: todoEffect("NPC State Change: Helena Rzepka stops performing warmth with these players."),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theExcessiveWarmth: opportunity({
      label: "The excessive warmth",
      target: { skills: [Culture] },
      promptedBy: [CoffeeAtHelenas],
      narrative: new Narrative({
        narration: [
          "The coffee and generosity manage a threat rather than host guests.",
        ],
      }),
    }),
    whatSheNeverAsks: opportunity({
      label: "What she never asks",
      target: { skills: [Finesse] },
      promptedBy: [CoffeeAtHelenas],
      narrative: new Narrative({
        narration: [
          "Helena Rzepka never asks what the players have found.",
        ],
      }),
    }),
    theShapeOfHerCase: opportunity({
      label: "The shape of her case",
      target: { skills: [Finesse] },
      promptedBy: [CoffeeAtHelenas],
      narrative: new Narrative({
        narration: [
          "Every practical argument ends at leaving the truth buried.",
        ],
        gives: { clues: [clues.CommitteeHidesTheFlood] },
      }),
    }),
    emilAtTheEdges: opportunity({
      label: "Emil at the edges",
      target: { skills: [Empathy] },
      promptedBy: [CoffeeAtHelenas],
      narrative: new Narrative({
        narration: [
          "Emil Rzepka flinches at his own name and will not be alone with Helena Rzepka and outsiders.",
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
