import { Event, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef, Effect } from "../schema.ts";
import { Empathy, Survival } from "../skills.ts";
import NewVillage from "../locations/new-village.ts";
import Officer from "../characters/officer.ts";
import Professor from "../characters/professor.ts";
import { todo, todoEffect } from "../todo.ts";

export default class TheReport extends Event {
  readonly id = "the-report";
  readonly name = "The Report — The State's Ending";
  readonly hook = "Skowron waiting by the police car, asking the departing party for their report.";

  // TODO: Location is "Police car on the road out of the village"; no location
  // entity for it. Chose NewVillage.
  override at(): LocationRef {
    return NewVillage;
  }

  // Markdown links por. Witold Skowron to characters/skowron.md (missing file);
  // Skowron is characters/officer.ts.
  override present(): CharacterRef[] {
    return [Officer];
  }
  override readonly hooks: EventHook[] = [
    { text: "Skowron waiting by the police car, asking for the report.", heardAt: "anywhere" },
  ];
  readonly setup = new Narrative({
    narration: [
      "por. Witold Skowron reads the report in the car.",
      "The players may have discovered the 1947 Lemko massacre.",
      "The massacre is the state's buried crime under the dam.",
      "Skowron has signaled that the state wants the massacre buried.",
      "The dam is infrastructure and a grave.",
      "The players choose what goes into the report.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    submitAReportWithoutTheMassacre: action({
      label: "Submit a report without the massacre",
      cost: [],
      narrative: new Narrative({
        narration: [
          "por. Witold Skowron accepts the report and the car drives away.",
        ],
        gives: {
          effects: todoEffect("Ending Progress: State cover-up ending | World State Change: the state's secret stays buried"),
        },
      }),
    }),
    submitAReportWithTheMassacreAndNoOutsideWitness: action({
      label: "Submit a report with the massacre and no outside witness",
      requires: [
        new Requirement("You did call the professor.", { when: (w) => !w.professor.called }),
      ],
      cost: [],
      narrative: new Narrative({
        narration: [
          "por. Witold Skowron reads the report, signals the driver, and the car changes course.",
        ],
        gives: {
          effects: todoEffect("Ending Progress: State suppression ending | World State Change: the players do not reach the road home"),
        },
      }),
    }),
    submitAReportWithTheMassacreAndAnOutsideWitness: action({
      label: "Submit a report with the massacre and an outside witness",
      requires: [
        new Requirement("Nobody outside knows; you never called him.", { when: (w) => !w.professor.called }),
      ],
      promptedBy: [Professor],
      cost: [],
      narrative: new Narrative({
        narration: [
          "por. Witold Skowron knows the truth already exists outside the car and lets the car continue home.",
        ],
        gives: {
          effects: todoEffect("Ending Progress: truth survives outside the village | World State Change: the players live"),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    skowronReading: opportunity({
      label: "Skowron reading",
      target: { skills: [Empathy] },
      promptedBy: [TheReport],
      narrative: new Narrative({
        narration: [
          "His reaction changes when the 1947 massacre appears in the report.",
        ],
      }),
    }),
    // TODO: "the massacre is in the report and the truth is not already outside the car"
    // not modelled.
    theRoute: opportunity({
      label: "The route",
      trigger: todo("the massacre is in the report and the truth is not already outside the car"),
      target: { skills: [Survival] },
      promptedBy: [TheReport],
      narrative: new Narrative({
        narration: [
          "`(requires: Survival)` — if the massacre is in the report and the truth is not already outside the car, the car changes course.",
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
