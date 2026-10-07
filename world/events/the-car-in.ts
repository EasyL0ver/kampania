import { Event, Narrative, SkillRequirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef } from "../schema.ts";
import { Bureaucracy, Empathy } from "../skills.ts";
import NewVillage from "../locations/new-village.ts";
import PgrFarm from "../locations/pgr-farm.ts";
import Officer from "../characters/officer.ts";
import * as clues from "../clues.ts";
import { todoEffect } from "../todo.ts";

export default class TheCarIn extends Event {
  readonly id = "the-car-in";
  readonly name = "The Car In";
  readonly hook = "A police car winding down the mountain road through the rain.";

  // TODO: Location is "Police car on the mountain road to %NEW_VILLAGE%"; no
  // location entity for the road/car. Chose NewVillage.
  override at(): LocationRef {
    return NewVillage;
  }

  override present(): CharacterRef[] {
    return [Officer];
  }

  // Game start; first scene.
  override readonly hooks: EventHook[] = [
    { text: "A police car drives on a winding mountain road.", heardAt: "anywhere" },
  ];

  readonly setup = new Narrative({
    narration: [
      "A police car drives on a winding mountain road.",
      "Rain hits the windshield.",
      "por. Witold Skowron drives.",
      "The players ride in the back.",
      "The players are government committee members.",
      "The committee is heading to assess flood risk in a remote Bieszczady village.",
      "prof. Tadeusz Bieńkowski briefed the committee before departure: the safe level assumes the ground stands where the map records it and that the valley drains, so he wants both checked, and he named two outlets to verify, the ridge water-gap and the old far-ridge streambed.",
      "por. Witold Skowron is professional and friendly.",
      "He talks while he drives.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    takeTheAssignment: action({
      label: "Take the assignment",
      promptedBy: [TheCarIn],
      cost: [],
      narrative: new Narrative({
        narration: [
          "On the road in, por. Witold Skowron lays out who the players are and why they are here: a state committee sent ahead of the reservoir to run a census, assess property for flood damage, and survey the valley. It is the authority the whole visit rests on.",
        ],
        gives: { clues: [clues.GovernmentCommittee] },
      }),
    }),
    learnTheDestination: action({
      label: "Learn the destination",
      promptedBy: [clues.GovernmentCommittee],
      cost: [],
      narrative: new Narrative({
        narration: [
          "por. Witold Skowron names where they are headed: %NEW_VILLAGE%, the resettled village in the valley below the planned reservoir, and points out where the road drops toward it.",
        ],
        gives: { aware: [NewVillage] },
      }),
    }),
    listenToTheBriefing: action({
      label: "Listen to the briefing",
      promptedBy: [clues.GovernmentCommittee],
      cost: [],
      narrative: new Narrative({
        narration: [
          "por. Witold Skowron explains the committee's survey, property assessment, local contact, village phone, and road risk. He notes the valley's state farm, the PGR, as the main property the committee will assess, and that its movable socialist property must be inventoried and moved out before the flood.",
        ],
        gives: {
          clues: [
            clues.CommitteeRunsGeographicalSurvey,
            clues.CommitteeNotesPropertyForDamage,
            clues.CommitteeFillsCensus,
            clues.CommitteeAccountsMovableStateProperty,
            clues.CommitteeHidesTheFlood,
          ],
          aware: [PgrFarm],
        },
      }),
    }),
    // TODO: "bureaucratic experience or intuition": intuition is not a card;
    // chose Bureaucracy or Empathy. Duplicates the opportunity skowronsCarefulBriefing.
    pickUpOnTheHiddenWarning: action({
      label: "Pick up on the hidden warning",
      requires: [new SkillRequirement(Bureaucracy, Empathy)],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Players notice that por. Witold Skowron expects them to ignore old grievances, local legends, and anything that does not belong in a government report.",
        ],
        gives: { clues: [clues.OfficerWarning] },
      }),
    }),
    recallTheProfessorsBrief: action({
      label: "Recall the professor's brief",
      promptedBy: [clues.CommitteeRunsGeographicalSurvey],
      cost: [],
      narrative: new Narrative({
        narration: [
          "The committee recalls prof. Tadeusz Bieńkowski's pre-trip briefing: the state's safe verdict rests on two things holding true, that the ground stands where the map records it and that the valley drains through its outlets. He wants both tested on the ground: level the terrain against the map to confirm the heights, and check whether water can still get out. He flagged two outlets he knows, the ridge water-gap and the old far-ridge streambed, and knows of no others. He says only that the paperwork does not hold up and he cannot prove it from Kraków; he does not point at the previous survey by name, leaving that for the committee to find on the ground.",
        ],
        gives: {
          clues: [clues.GapIsCandidateDrain, clues.StreambedIsCandidateDrain, clues.TheFloodLinePotentiallyMiscalculated],
        },
      }),
    }),
    draftTheCommittee: action({
      label: "Draft the committee",
      cost: [],
      narrative: new Narrative({
        narration: [
          "The players draft the card pool in snake order until all 28 cards are taken. por. Witold Skowron reads each card out of his dossier as it is claimed.",
        ],
        gives: {
          effects: todoEffect("World State Change: player characters are defined; whatever the committee failed to draft, it does not have"),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    // TODO: "bureaucratic experience or intuition": chose Bureaucracy or Empathy.
    skowronsCarefulBriefing: opportunity({
      label: "Skowron's careful briefing",
      target: { when: (_w, me) => me.has(Bureaucracy) || me.has(Empathy) },
      promptedBy: [clues.GovernmentCommittee],
      narrative: new Narrative({
        narration: [
          "`(requires: bureaucratic experience or intuition)` — he frames the work narrowly and signals that some information should stay out of official writing.",
        ],
        gives: { clues: [clues.OfficerWarning] },
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

