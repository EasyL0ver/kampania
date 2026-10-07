import { Character, CharacterDescription, Narrative, Requirement, SkillRequirement, action, anyone, opportunity } from "../schema.ts";
import { todo, todoEffect } from "../todo.ts";
import type { Checks, LocationRef } from "../schema.ts";
import { Culture, Empathy, Geology } from "../skills.ts";
import MatronasHouse from "../locations/matronas-house.ts";
import FarRidgeStreambed from "../locations/far-ridge-streambed.ts";
import GirlsDress from "../items/girls-dress.ts";
import * as clues from "../clues.ts";

export default class Painter extends Character {
  readonly id = "painter";
  readonly name = "Emil Rzepka";
  readonly description = new CharacterDescription({
    narration: ["Emil Rzepka, Helena's withdrawn husband and a local painter, works in the garden shed."],
    clothes: "Paint-spattered work clothes in the garden shed; downstairs, dressed neatly in whatever Helena lays out for him",
    hairAndFace: "Thinning grey hair, paint-flecked at the temples; gaunt cheeks, watery blue eyes that won't hold a gaze",
    carriage: "Thin, stooped, and wall-hugging; moves tentatively, flinches at sudden movement, makes himself small",
    gives: { aware: [Painter] },
  });

  readonly role = "broken artist, lynch survivor";
  livesAt: LocationRef = MatronasHouse;

  // ------------------------------------------------------------ state

  // ------------------------------------------------------------ actions

  readonly allActions = {
    showEmilTheDress: action({
      label: "Show Emil the dress",
      requires: [new Requirement("You don't have the dress.", { items: [GirlsDress] })],
      promptedBy: [Painter],
      cost: [],
      narrative: new Narrative({
        narration: [
          "He goes still, then his stained hands start to shake. He cannot look at it and cannot look away.",
        ],
        gives: { clues: [clues.DressDistressedPainter] },
      }),
    }),
    censusInterview: action({
      label: "Census interview",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He answers in a near-whisper, eyes down, and glances at Helena before every reply. If she is in the room, she answers for him and he lets her.",
        ],
        gives: { effects: (w) => { w.painter.censusTaken = true; } },
      }),
    }),
    confrontEmilWithTheStyleShift: action({
      label: "Confront Emil with the style shift",
      promptedBy: [clues.PaintersStyleShiftedToDark],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Told plainly that his work broke in two, the bright years and then the black, Emil stops fighting it. He admits that something happened to him in 1954 that he never came back from.",
        ],
        gives: { clues: [clues.EmilTraumatisedIn54] },
      }),
    }),
    pressEmilOnTheStreambedsDetail: action({
      label: "Press Emil on the streambed's detail",
      requires: [
        new SkillRequirement(Geology, Culture),
      ],
      promptedBy: [Painter],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Only a party that has picked out the real detail under the paint can draw him out. Asked about it, Emil warms for a moment. It is a streambed on the far ridge across the valley, a place from before, where the water ran down toward the next basin. He describes the col and the crossing plainly enough that the party could find it. Then he sighs: it was a long time ago, and the water probably does not run like that any more.",
        ],
        gives: { clues: [clues.StreambedPaintingIsOld], aware: [FarRidgeStreambed] },
      }),
    }),
    propertyAssessment: action({
      label: "Property assessment",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "He says the house is Helena's, not his. He states it plainly, like a man used to owning nothing.",
        ],
        gives: { effects: (w) => { w.painter.propertyRecorded = true; } },
      }),
    }),
    getEmilRzepkaAlone: action({
      label: "Get Emil Rzepka alone",
      requires: [
        new Requirement("Helena is never far from him here.", {
          when: todo("Find Emil without Helena at work, in the field, at the church, or away from her inside the house"),
        }),
      ],
      promptedBy: [Painter],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { clues: [clues.PainterHeardMatrona, clues.PainterWasSpared] },
      }),
    }),
    workTheWedge: action({
      label: "Work the wedge",
      requires: [
        // TODO: "prior conversation with Emil" could be getEmilRzepkaAlone.done; the bluff can't be modelled.
        new Requirement("You need Emil's word, or a good bluff.", {
          when: todo("Prior conversation with Emil or a convincing bluff that Emil has already talked"),
        }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: {
          effects: todoEffect(
            "NPC State Change: Helena turns active damage control toward Emil | Scene Unlock: another private attempt to reach Emil Rzepka",
          ),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    ewaAsksForAPortrait: opportunity({
      label: "Ewa asks for a portrait",
      // Ewa is always at home with Emil, so it fires with his census interview.
      trigger: (w): boolean => w.painter.allActions.censusInterview.done,
      target: anyone,
      promptedBy: [Painter],
      narrative: new Narrative({
        narration: [
          "While the committee takes the household down, Ewa settles on the stool beside her father and asks him, lightly, to paint her portrait for once. Emil turns it away gently: he offers to paint the house, the valley, the cerkiew on the hill, anything but her. Every finished canvas in the room is a place, never a person. He paints the world he lives in and leaves the people out of it.",
        ],
        gives: { clues: [clues.EmilDoesntPaintPeople] },
      }),
    }),
    emilAlone: opportunity({
      label: "Emil alone",
      trigger: todo("Emil is away from Helena"),
      target: { skills: [Empathy] },
      promptedBy: [Painter],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { clues: [clues.PainterWantsToConfess] },
      }),
    }),
    theControlMechanism: opportunity({
      label: "The control mechanism",
      target: { skills: [Empathy] },
      promptedBy: [Painter],
      narrative: new Narrative({
        narration: [],  // TODO: narration
        gives: { clues: [clues.MatronaControlsPainter] },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }

  override get opportunities() {
    return this.allOpportunities;
  }

  // ------------------------------------------------------------ bond

  bond: Checks = [
    "Notice and comment on one of his paintings",
    "Speak softly and give him physical space",
    "Visit him a second time without asking about the past",
  ];
}
