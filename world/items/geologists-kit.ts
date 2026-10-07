import { Item, Narrative, Requirement, SkillRequirement, action, opportunity } from "../schema.ts";
import { Geology } from "../skills.ts";
import * as clues from "../clues.ts";

export default class GeologistsKit extends Item {
  readonly id = "geologists-kit";
  readonly name = "The Geologist's Kit";
  readonly hook = "A worn canvas roll of surveying tools, maps, tables, and a folded report.";
  readonly what = "field surveying kit and briefing dossier (with the previous crew's survey report)";
  readonly description = new Narrative({
    narration: [
      "A worn canvas roll of survey tools: a level and clinometer with its graduated rod, a plumb line and tape, a folded copy of the resettlement master plan with its flood-line figures, and drainage tables. Tucked in the dossier is the previous crew's signed survey report, the document whose projection sent the committee here. The report reads clean to a layman. prof. Bieńkowski warned at the briefing that it smells thin, too few stations and too much taken on faith, though he could not prove it from Kraków. It praises the wojewoda's irrigation ditch, notes in passing that the river changed course and dismisses it, and says nothing at all about the ridge gap or the far-ridge streambed. Also folded in is a Solina dam-survey station index: a bare list of benchmarks the reservoir survey set across the valley, the far-ridge streambed col among them, but the elevation sheet the index points to is not in the dossier.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    readTheReport: action({
      label: "Read the report",
      requires: [new Requirement("You don't have the kit.", { items: [GeologistsKit] })],
      promptedBy: [clues.CommitteeRunsGeographicalSurvey],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Buried in the text, the crew note the river shifted its bed since the map was drawn, then wave it off as unimportant. The shift is real even if they dismissed it.",
        ],
        gives: { clues: [clues.RiverDoesntMatchMap] },
      }),
    }),
    readTheMaps: action({
      label: "Read the maps",
      requires: [new Requirement("You don't have the kit.", { items: [GeologistsKit] })],
      cost: [],
      narrative: new Narrative({
        narration: [
          "The master plan carries the flood-line figure, and the Solina station index lists a %NEW_VILLAGE% datum benchmark (St. 41). The flood line staked across the valley is the dam builders' work, tied to their reservoir survey, not the resettlement crew's.",
        ],
        gives: { clues: [clues.FloodMarkLeftByDamBuilders] },
      }),
    }),
    readItAsASurveyor: action({
      label: "Read it as a surveyor",
      requires: [
        new Requirement("You don't have the kit.", { items: [GeologistsKit] }),
        new SkillRequirement(Geology),
      ],
      promptedBy: [clues.TheFloodLinePotentiallyMiscalculated],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The report shows impossibly few field stations, cursory coverage, and the ditch taken on faith from its concrete head. On the paper alone the survey looks thin, well short of real fieldwork.",
        ],
        gives: { clues: [clues.OriginalReportIsThin] },
      }),
    }),
    readTheDamSurveyIndex: action({
      label: "Read the dam-survey index",
      requires: [
        new Requirement("You don't have the kit.", { items: [GeologistsKit] }),
        new SkillRequirement(Geology),
      ],
      promptedBy: [clues.StreambedIsCandidateDrain],
      cost: [],
      narrative: new Narrative({
        narration: [
          "A layman sees a dull list of station numbers. A surveyor reads it: the Solina survey set benchmarks across the valley, the far-ridge streambed col among them (St. 40) with the village datum (St. 41), so the dam builders already shot this outlet. The index points to an elevation sheet for the figures, but that sheet is not in the dossier: the survey happened, the results are missing.",
        ],
        gives: { clues: [clues.DamBuildersSurveyedStreambed] },
      }),
    }),
    readTheFiguresAsASurveyor: action({
      label: "Read the figures as a surveyor",
      requires: [
        new Requirement("You don't have the kit.", { items: [GeologistsKit] }),
        new Requirement("You don't have the streambed figures.", { clues: [clues.StreambedParameters] }),
        new SkillRequirement(Geology),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Against the kit's drainage tables you read the two elevations and conclude the col sits above house level, so the rising water tops the village before it reaches the streambed.",
        ],
        gives: { clues: [clues.StreambedDeadEnds] },
      }),
    }),
    runTheDrainageTablesOnTheDitchHead: action({
      label: "Run the drainage tables on the ditch head",
      requires: [
        new Requirement("You don't have the kit.", { items: [GeologistsKit] }),
        new Requirement("You haven't measured the concrete ditch.", { clues: [clues.ConcreteDitchMeasurements] }),
        new SkillRequirement(Geology),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "You run the concrete head's cross-section against the drainage tables. The channel of ample capacity carries the flood clear: on these figures the ditch drains fine. It is the same all-clear the report gives, and it is a trap. The sum covers only the concrete stretch at the head, not the earth dugout below. A party that has not walked the full length and measured the dugout has no cause to doubt it and will cross the ditch off.",
        ],
        gives: { clues: [clues.DitchDrainsFine] },
      }),
    }),
    recalculateTheWholeDitch: action({
      label: "Recalculate the whole ditch",
      requires: [
        new Requirement("You don't have the kit.", { items: [GeologistsKit] }),
        new Requirement("You haven't measured the concrete ditch.", { clues: [clues.ConcreteDitchMeasurements] }),
        new Requirement("You haven't measured the dugout.", { clues: [clues.DugoutMeasurements] }),
        new SkillRequirement(Geology),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "With both cross-sections in hand, the concrete head and the shallow earth dugout, you run the tables over the real channel, not just the head. The undersized dugout backs up and overflows at flood volume. The ditch cannot carry the water off, and the head-only figure was a false all-clear.",
        ],
        gives: { clues: [clues.DitchDrainsNothing] },
      }),
    }),

    // "Level a relative point": 1 card per point, the player picks the point.
    // TODO: split into one action per point (my choice; same in water-hose-contraption). Confirm.
    levelTheLowerVillage: action({
      label: "Level a relative point: the lower village",
      requires: [
        new Requirement("You don't have the kit.", { items: [GeologistsKit] }),
        new SkillRequirement(Geology),
      ],
      promptedBy: [clues.FloodMarkLeftByDamBuilders],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { clues: [clues.LowerVillageLevel] },
      }),
    }),
    levelTheUpperVillage: action({
      label: "Level a relative point: the upper village",
      requires: [
        new Requirement("You don't have the kit.", { items: [GeologistsKit] }),
        new SkillRequirement(Geology),
      ],
      promptedBy: [clues.FloodMarkLeftByDamBuilders],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { clues: [clues.UpperVillageLevel] },
      }),
    }),
    levelTheSouthernRise: action({
      label: "Level a relative point: the southern rise",
      requires: [
        new Requirement("You don't have the kit.", { items: [GeologistsKit] }),
        new SkillRequirement(Geology),
      ],
      promptedBy: [clues.FloodMarkLeftByDamBuilders],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { clues: [clues.SouthernRiseLevel] },
      }),
    }),
    levelTheOldVillageBowl: action({
      label: "Level a relative point: the old-village bowl",
      requires: [
        new Requirement("You don't have the kit.", { items: [GeologistsKit] }),
        new SkillRequirement(Geology),
      ],
      promptedBy: [clues.FloodMarkLeftByDamBuilders],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { clues: [clues.OldVillageBowlLevel] },
      }),
    }),
    levelTheBigBasinFloor: action({
      label: "Level a relative point: the %BIG-BASIN% floor",
      requires: [
        new Requirement("You don't have the kit.", { items: [GeologistsKit] }),
        new SkillRequirement(Geology),
      ],
      promptedBy: [clues.FloodMarkLeftByDamBuilders],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { clues: [clues.BigBasinFloorLevel] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  // TODO: these four are gated only on clues (no skill); they behave like clue synthesis
  // routes in clues.ts. Kept as opportunities on handling the kit, as in the Markdown.
  readonly allOpportunities = {
    calculateTheFloodLine: opportunity({
      label: "Calculate the flood line",
      target: { clues: [clues.GapIsBlocked, clues.DitchDrainsNothing, clues.StreambedDeadEnds] },
      narrative: new Narrative({
        narration: [
          "With all three outlets ruled out under the same test, no fresh fieldwork is needed. Laying the findings against the master plan's numbers, the conclusion is arithmetic: when the lake rises, the water has nowhere below house level to go. %NEW_VILLAGE% floods.",
        ],
        gives: { clues: [clues.NewVillageWillFlood] },
      }),
    }),
    callTheDitchAWorkingDrain: opportunity({
      label: "Call the ditch a working drain",
      target: { clues: [clues.DitchDrainsFine] },
      narrative: new Narrative({
        narration: [
          "If the ditch carries the flood off, the valley has its outlet and the village stays dry; one good drain is all it needs. The reassuring answer the head calc invites, and the trap that ends the investigation early: it takes the concrete head for the whole ditch and never tests the gap or the streambed at all.",
        ],
        gives: { clues: [clues.NewVillageWillNotFlood] },
      }),
    }),
    theSurveyWasBotched: opportunity({
      label: "The survey was botched",
      target: { clues: [clues.GeologistsWereDrinking, clues.OriginalReportIsThin] },
      narrative: new Narrative({
        narration: [
          "The drinking and the thin paper are the same story from two sides: a drunk crew drove a few stakes, took the ditch on faith, and filed work that never touched the ground. Not forgery, just negligence, and enough to throw out the official survey.",
        ],
        gives: { clues: [clues.SurveyWasBotched] },
      }),
    }),
    theMapReadsTrue: opportunity({
      label: "The map reads true",
      target: {
        clues: [
          clues.LowerVillageLevel,
          clues.UpperVillageLevel,
          clues.SouthernRiseLevel,
          clues.OldVillageBowlLevel,
          clues.BigBasinFloorLevel,
          clues.GapFootLevel,
        ],
      },
      narrative: new Narrative({
        narration: [
          "Every leveled point around the valley agrees with the state map's contours. The paper heights hold true against the ground, so the map is a sound record of the terrain and the only places it lies are the plugged gap and the shifted river.",
        ],
        gives: { clues: [clues.VillageTerrainMatchesMap] },
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
