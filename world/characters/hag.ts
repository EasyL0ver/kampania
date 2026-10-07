import { Character, CharacterDescription, Narrative, Requirement, SkillRequirement, action } from "../schema.ts";
import type { Checks, LocationRef } from "../schema.ts";
import { Empathy, Language, Speech } from "../skills.ts";
import * as clues from "../clues.ts";
import HagsCabin from "../locations/hags-cabin.ts";
import UpaBunker from "../locations/upa-bunker.ts";
import PawelekFallsIll from "../events/pawelek-falls-ill.ts";

export default class Hag extends Character {
  readonly id = "hag";
  readonly name = "Paraskewia Chyłak";
  // TODO: the Markdown has no ## Hook section; kept the skeleton's bare name.
  readonly description = new CharacterDescription({
    narration: ["Paraskewia Chyłak"],
    clothes: "Layers of patched wool and linen in forest colours — browns, greys, faded greens.",
    hairAndFace: "Iron-grey hair hidden under a dark headscarf; deeply lined face, dark watchful eyes.",
    carriage: "Silent footfall, sudden arrivals, and the stillness of someone who has hidden for twenty years.",
    gives: { aware: [Hag] },
  });

  readonly role = "Lemko survivor, forest hermit (hidden)";
  livesAt: LocationRef = HagsCabin;

  // ------------------------------------------------------------ state

  // Mechanic "Hostility": she believes the village means her harm. While true only
  // "Convince her the villagers are friendly" is available.
  // TODO: what sets it (chasing her at the well, cornering her, open aggression) is not
  // modelled; Hag's Prayer not firing while hostile belongs in hags-prayer.ts.
  // TODO: should `alive = false` empty her move tables? Not stated in the Markdown.
  hostile = false;

  // Mechanic "Talking to her": every move needs Language.

  // ------------------------------------------------------------ actions

  override get actions() {
    return this.hostile ? this.hostileActions : this.allActions;
  }

  readonly allActions = {
    censusInterview: action({
      label: "Census interview",
      requires: [new SkillRequirement(Language)],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She gives her name — Paraskewia Chyłak — and says she is Lemko.",
        ],
        gives: {
          clues: [clues.HagIsLemko],
          effects: (w) => { w.hag.censusTaken = true; },
        },
      }),
    }),
    propertyAssessment: action({
      label: "Property assessment",
      requires: [new SkillRequirement(Language)],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She shows the cabin without fuss: a tiny hut she built and has lived in for twenty years.",
        ],
        gives: { effects: (w) => { w.hag.propertyRecorded = true; } },
      }),
    }),
    theLandRemembersTheWater: action({
      label: "The land remembers the water",
      requires: [new SkillRequirement(Language)],
      promptedBy: [clues.CommitteeRunsGeographicalSurvey],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She has watched this ground for twenty years. In her own terms she says the river wants its old bed back, that its course shifted, and that a slide came down and closed the notch in the ridge. She has nothing to say about the far-ridge streambed.",
        ],
        gives: { clues: [clues.RiverDoesntMatchMap, clues.LandslideInTheGap] },
      }),
    }),
    askHerAboutPawelek: action({
      label: "Ask her about Pawełek",
      requires: [new SkillRequirement(Language)],
      promptedBy: [PawelekFallsIll],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She found the boy at the well and told him the water was foul and not to drink it. He was thirsty and drank anyway. She knows what bad water does, but her remedy is the old one: the boy needs a cleansing rite, not a doctor.",
        ],
        gives: { clues: [clues.PawelekGotItFromWater, clues.HagWarnedPawelek, clues.PawelekNeedsACleansingRitual] },
      }),
    }),
    askHerAboutTheRites: action({
      label: "Ask her about the rites",
      requires: [new SkillRequirement(Language)],
      promptedBy: [clues.HagTendsTheWell],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She tells them the dead here were never laid to rest and will not settle. She tends them so the unquiet does not spread.",
        ],
        gives: { clues: [clues.SpiritsAreRestless] },
      }),
    }),
    askHerAboutTheSpirits: action({
      label: "Ask her about the spirits",
      requires: [
        new SkillRequirement(Language),
        new Requirement("Paraskewia doesn't trust you enough.", { when: (w, me) => w.hag.bonded.of(me) }),
      ],
      promptedBy: [clues.SpiritsAreRestless],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "With trust earned, she tells the truth of what happened here: in 1947 the whole village was killed in a single act of violence. They did not leave. They were massacred.",
        ],
        gives: { clues: [clues.ArmyMassacredCiviliansIn1947] },
      }),
    }),
    askHerHowItHappened: action({
      label: "Ask her how it happened",
      requires: [
        new SkillRequirement(Language),
        new Requirement("Paraskewia doesn't trust you enough.", { when: (w, me) => w.hag.bonded.of(me) }),
      ],
      promptedBy: [clues.ArmyMassacredCiviliansIn1947],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "She tells it as she saw it. The soldiers came to drive the village out; the people would not go; their officer was shot dead in the struggle; and the soldiers turned in their fury and killed everyone. No one ever came after. No reckoning, no record, the dead left unnamed. The army buried its own crime and called the village empty.",
        ],
        gives: { clues: [clues.MassacreWasRetribution, clues.MassacreWasCoveredUp] },
      }),
    }),
    whereThePartisansHid: action({
      label: "Where the partisans hid",
      requires: [
        new SkillRequirement(Language),
        new Requirement("Paraskewia doesn't trust you enough.", { when: (w, me) => w.hag.bonded.of(me) }),
      ],
      promptedBy: [clues.UpaBunkersInTheArea],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "With trust earned, she tells them of the dugout deep in the forest northwest, the one she knew in the war years, where she used to meet a man called Dmytro. She still knows the way to its hidden mouth exactly.",
        ],
        gives: { aware: [UpaBunker] },
      }),
    }),
  };

  readonly hostileActions = {
    convinceHerTheVillagersAreFriendly: action({
      label: "Convince her the villagers are friendly",
      requires: [new SkillRequirement(Language), new SkillRequirement(Speech, Empathy)],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "You persuade her the committee and the village mean her no harm. She lowers her guard and will speak with you again.",
        ],
        gives: { effects: (w) => { w.hag.hostile = false; } },
      }),
    }),
  };

  // ------------------------------------------------------------ bond / grudge

  bond: Checks = [
    "Approach her cabin openly; wait at the treeline",
    "Show respect for the dead",
    "Leave her ritual objects untouched",
  ];

  grudge: Checks = [
    "Enter her cabin uninvited or touch her things",
    "Be loud, aggressive, or dismissive in the forest",
    "Desecrate or ignore the old Lemko graves",
  ];
}
