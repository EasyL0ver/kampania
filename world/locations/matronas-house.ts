import { Location, Narrative, Requirement, SkillRequirement, action, opportunity } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";
import { Culture, Empathy, Finesse, Geology, Handiwork, Superstitious } from "../skills.ts";
import Matrona from "../characters/matrona.ts";
import Painter from "../characters/painter.ts";
import EwaRzepka from "../characters/secondary/ewa-rzepka.ts";
import KrystianRzepka from "../characters/secondary/krystian-rzepka.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";

export default class MatronasHouse extends Location {
  readonly id = "matronas-house";
  readonly name = "Matrona's House";
  readonly hook = "The centre of %NEW_VILLAGE%, close to the store.";
  readonly position = "central village, close to the store";
  readonly visitCost = 1;
  // Helena usually here; Krystian irregular (not modelled).
  override present(): CharacterRef[] {
    return [Matrona, Painter, EwaRzepka, KrystianRzepka];
  }

  readonly setup = new Narrative({
    narration: [
      "Exterior: Whitewashed walls, swept path, and flower box. A small garden shed stands in the yard behind the house, its one window often lit.",
      "Interior: Religious icons in every room.",
      "Interior: Crucifix above the dining table.",
      "Interior: Embroidered tablecloth.",
      "Interior: Beeswax and clean linen smell.",
      "Helena: Helena Rzepka receives guests at the kitchen table with bread and tea.",
      "Helena: She asks about the census, flood assessment, and each committee member's origin.",
      "Helena: She remembers answers given by visitors.",
      "Helena: She keeps a ring of household keys on her apron, the store cabinet key among them.",
      "Emil: Emil Rzepka sits near the stove or works in the garden shed he paints in.",
      "Emil: He says little and looks at Helena before speaking.",
      "Emil: His hands are stained with paint.",
      "Ewa: Ewa Rzepka helps in the kitchen and watches Emil.",
      "Ewa: She brings tea to Emil's shed when Helena is not watching.",
      "Krystian: Krystian Rzepka comes and goes for altar-boy duties.",
      "Krystian: He repeats village observations to Helena.",
      "Shed: Emil's shed contains landscapes and village scenes of old wooden houses and a stone church.",
      "Shed: The old village recurs across many of the canvases, its well, its cerkiew, and its ruined houses, painted with more care than the rest.",
      "Shed: Among the older Fauvist canvases, one shows a streambed on the far ridge across the valley, bright water running down toward the next basin.",
      "Shed: One of the Informel canvases works over the old cerkiew: its shape still readable under fields of black, encrusted paint.",
      "Shed: On the easel sits an unfinished canvas he is working on right now: very dark, wholly abstract, the paint still wet and being worked. It is the only piece in the shed that is not finished.",
      "Shed: Newer paintings show dark circles, black water, and stone rings.",
      "Progression: As the well strengthens, Helena increases public piety, generosity, and church visits.",
      "Night: Overnight guests see the shed window burning and hear Emil working out there after midnight.",
      "Night: Overnight guests hear Helena check doors and Emil.",
      "Night: Overnight guests may hear a whispered argument through the wall.",
    ],
    gives: { aware: [MatronasHouse] },
  });

  // TODO: "possible lodging after 03-dinner" (Lodging at Matrona's card) not modelled here.
  // TODO: "access to Emil's shed" has no action that grants it; every shed
  // opportunity gates on todo("access to Emil's shed").

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // TODO: the store cabinet key has no item file; left as todoEffect.
    liftHelenasKeys: action({
      label: "Lift Helena's keys",
      requires: [
        new SkillRequirement(Finesse),
        new Requirement("You need to be close to Helena.", { when: todo("close to Helena, over her tea and bread or while her attention is elsewhere") }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The cabinet key rides on the ring at her apron. In the fuss of hospitality, or with her turned away, a light hand works it off the ring. She notices nothing until she next reaches for it.",
        ],
        gives: { effects: todoEffect("Item: the store cabinet key.") },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    householdDynamic: opportunity({
      label: "Household dynamic",
      target: { skills: [Empathy] },
      narrative: new Narrative({
        narration: [
          "Emil waits for Helena's cues before speaking, and her touch makes him flinch.",
        ],
        gives: { clues: [clues.MatronaControlsPainter] },
      }),
    }),
    notOneFace: opportunity({
      label: "Not one face",
      target: { when: todo("access to Emil's shed") },
      narrative: new Narrative({
        narration: [
          "Every canvas on the walls is a landscape or a village scene. In a whole shed of paintings, there is not a single person.",
        ],
        gives: { clues: [clues.EmilDoesntPaintPeople] },
      }),
    }),
    aVillageThatIsGone: opportunity({
      label: "A village that is gone",
      target: { skills: [Culture], when: todo("access to Emil's shed") },
      narrative: new Narrative({
        narration: [
          "The wooden houses and stone church in the older canvases are not the new village. This is the settlement from before the resettlement, a place that no longer stands. He paints it from memory.",
        ],
      }),
    }),
    theOldVillageOverAndOver: opportunity({
      label: "The old village, over and over",
      target: { skills: [Empathy], when: todo("access to Emil's shed") },
      promptedBy: [Painter],
      narrative: new Narrative({
        narration: [
          "One place keeps returning across the canvases: the old village, its well, its cerkiew, its ruined houses, painted again and again with a fascination the other scenes never get.",
        ],
        gives: { clues: [clues.PainterFascinatedByOldVillage] },
      }),
    }),
    theWellWantsSomething: opportunity({
      label: "The well wants something",
      target: { skills: [Superstitious], when: todo("access to Emil's shed") },
      narrative: new Narrative({
        narration: [
          "The newest paintings are not landscapes. The black water and the ring of stones are rendered like something awake, and the eye is always pulled down into them.",
        ],
        gives: { clues: [clues.YouShouldJumpInside] },
      }),
    }),
    aStreambedDrawnTooExactly: opportunity({
      label: "A streambed drawn too exactly",
      target: { skills: [Culture], when: todo("access to Emil's shed") },
      narrative: new Narrative({
        narration: [
          "Under the wild Fauvist colour, the streambed canvas hides an odd, almost cartographic precision: the exact course of the water, the col, the crossing, all set down like a record of a real place rather than a mood. A striking thing to find buried in so loose a style. Worth asking Emil about it.",
        ],
      }),
    }),
    readTheLandUnderTheColour: opportunity({
      label: "Read the land under the colour",
      target: { skills: [Geology], when: todo("access to Emil's shed") },
      narrative: new Narrative({
        narration: [
          "Stripping the Fauvist colour away in your head, the landform is real and specific: a streambed running off a ridge col toward a lower basin, a place that exists somewhere in this country. Worth asking Emil where it is.",
        ],
      }),
    }),
    aStreambedInWildColour: opportunity({
      label: "A streambed in wild colour",
      target: { skills: [Culture], when: todo("access to Emil's shed") },
      promptedBy: [Painter],
      narrative: new Narrative({
        narration: [
          "The streambed canvas is unmistakably Fauvist: the water and the land carried in bold, unnatural, expressive colour, nothing painted as it really looked. Startlingly modern work for a self-taught village man.",
        ],
        gives: { clues: [clues.StreambedPaintingIsFauvist] },
      }),
    }),
    theCerkiewIsComingDown: opportunity({
      label: "The cerkiew is coming down",
      target: { skills: [Handiwork], when: todo("access to Emil's shed") },
      promptedBy: [Painter],
      narrative: new Narrative({
        narration: [
          "A builder's eye cuts through the black Informel paint to the structure underneath: the cerkiew in the canvas is failing, timbers sagging, the roofline broken, well into collapse. He painted it as a ruin.",
        ],
        gives: { clues: [clues.PaintedBuildingIsDecaying] },
      }),
    }),
    theCerkiewDissolved: opportunity({
      label: "The cerkiew dissolved",
      target: { skills: [Culture], when: todo("access to Emil's shed") },
      promptedBy: [Painter],
      narrative: new Narrative({
        narration: [
          "The cerkiew canvas is Art Informel: the building broken down into abstract fields of black, encrusted, scraped matter, nothing drawn as it looked. Startlingly modern work for a self-taught village man.",
        ],
        gives: { clues: [clues.PaintedBuildingIsInformel] },
      }),
    }),
    stillWetOnTheEasel: opportunity({
      label: "Still wet on the easel",
      target: { skills: [Culture], when: todo("access to Emil's shed") },
      promptedBy: [Painter],
      narrative: new Narrative({
        narration: [
          "The unfinished canvas he is working on now is Art Informel too: the same abstract black, encrusted, scraped matter, no subject set down plainly. Whatever it is, he is still deep in it.",
        ],
        gives: { clues: [clues.UnfinishedPaintingIsInformel] },
      }),
    }),
    // TODO: "Day 2+ or well influence active" is world state but no day/well state exists yet.
    helenasOverCorrection: opportunity({
      label: "Helena's over-correction",
      trigger: todo("Day 2+ or well influence active"),
      target: { skills: [Empathy] },
      narrative: new Narrative({
        narration: [
          "Helena becomes more publicly perfect as pressure rises.",
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
