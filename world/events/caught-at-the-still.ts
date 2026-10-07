import { Event, Narrative, Requirement, SkillRequirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef, WorldCond } from "../schema.ts";
import { Empathy, Finesse, Speech, Violence } from "../skills.ts";
import * as clues from "../clues.ts";
import { todo } from "../todo.ts";
import BimberStill from "../locations/bimber-still.ts";
import Wujas from "../characters/wujas.ts";
import SzymekKepa from "../characters/secondary/szymek-kepa.ts";
import RomekGlowacz from "../characters/secondary/romek-glowacz.ts";
import FranekMucha from "../characters/secondary/franek-mucha.ts";

// Who on the crew is still a threat.
//   whole-crew   all four on their feet (crew number 4)
//   franek-only  Tadek vouched or the crew was talked down (crew number 1)
//   none         no fight happens
type CrewThreat = "whole-crew" | "franek-only" | "none";

export default class CaughtAtTheStill extends Event {
  readonly id = "caught-at-the-still";
  readonly name = "Caught at the Still";
  readonly hook = "Voices, firelight, and the smell of fermentation carry through the trees before the clearing is in sight.";
  override at(): LocationRef {
    return BimberStill;
  }

  override present(): CharacterRef[] {
    return [Wujas, SzymekKepa, RomekGlowacz, FranekMucha];
  }
  override readonly hooks: EventHook[] = [
    { text: "Voices, firelight, and the smell of fermentation carry through the trees before the clearing is in sight.", heardAt: "anywhere" },
  ];
  // TODO: committee reaches the still while crew is present
  override condition: WorldCond = (_w) => todo("committee reaches the still while crew is present")();
  readonly setup = new Narrative({
    narration: [
      "The crew is around the fire with bottles and cards.",
      "They hear the committee coming before they see them.",
      "The still, barrels, and sugar sacks are in plain view — no hiding it.",
      "Government people at the still means their winter's income is exposed.",
      "The crew is drunk, cornered, and already on its feet by the time the committee reaches the clearing.",
      "Szymek Kępa puts himself between the committee and the still.",
      "Franek Mucha moves onto the footpath, cutting the way out.",
      "Romek Głowacz stays seated and watches.",
      "Tadek Gajda goes pale and reaches for the bottle.",
      "This goes to blows unless the committee defuses it. Franek Mucha throws the first punch.",
      "If any of the committee are already Tadek's drinking buddies, Tadek stands and vouches for them — but Franek is drunk and riled and does not take his word for it.",
    ],
  });

  crewThreat: CrewThreat = "whole-crew";
  // The committee's brawl count: Scrap = 1, Beat them up = 2.
  fighters = 0;

  // TODO: mechanic "Resolving the brawl" not modelled yet (see prose/events/caught-at-the-still.md):
  // fighters >= (crewThreat whole-crew ? 4 : 1) drives the crew off, else the committee is beaten back;
  // whole-crew fight -> crew a standing enemy, still moves, Tadek shaken; Franek-only -> no grudge.

  // ------------------------------------------------------------ actions

  readonly allActions = {
    letTadekVouch: action({
      label: "Let Tadek vouch — already buddies",
      requires: [
        // TODO: source says "at least one committee member"; checked for the player taking it.
        new Requirement("You haven't drunk with Tadek yet.", { when: (w, me) => w.wujas.drinkingBuddy.of(me) }),
        new Requirement("It's past vouching now.", { when: (w) => w.caughtAtTheStill.crewThreat === "whole-crew" }),
      ],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Tadek gets between the committee and his crew and swears they are alright. Szymek and Romek stand down on his word — but Franek is too drunk to listen and still has to be turned around or put down.",
        ],
        gives: {
          effects: (w) => {
            w.caughtAtTheStill.crewThreat = "franek-only";
          },
        },
      }),
    }),
    // TODO: "Command or Streetwise" are retired cards. Command -> Speech,
    // Streetwise -> Finesse (game-system.md fold-ins). Check.
    talkTheCrewDown: action({
      label: "Talk the crew down",
      requires: [
        new SkillRequirement(Speech, Finesse),
        new Requirement("Only Franek is left to deal with.", { when: (w) => w.caughtAtTheStill.crewThreat === "whole-crew" }),
      ],
      cost: [{ composure: 1 }],
      narrative: new Narrative({
        narration: [
          "(Originally required Command or Streetwise.) An order or a read of the room backs Szymek and Romek off — but not Franek. He is too far gone to care about rank, and still has to be dealt with before he swings.",
        ],
        gives: {
          effects: (w) => {
            w.caughtAtTheStill.crewThreat = "franek-only";
          },
        },
      }),
    }),
    pullAGunOnThem: action({
      label: "Pull a gun on them",
      requires: [
        new Requirement("You aren't holding a firearm.", { when: todo("Holding a firearm") }),
        new Requirement("There's no standoff left to end.", { when: (w) => w.caughtAtTheStill.crewThreat !== "none" }),
      ],
      cost: [{ composure: 1 }],
      narrative: new Narrative({
        narration: [
          "A drawn gun freezes the whole crew, Franek included — even blackout-drunk, he knows what a barrel means. The standoff ends cold. But it turns a scuffle over moonshine into something that could have killed a man, and the crew will not forget a government official pulling a weapon on them.",
        ],
        gives: {
          // TODO: also "the still moves."
          effects: (w) => {
            w.caughtAtTheStill.crewThreat = "none";
            w.drinkingCrew.hostile = true;
          },
        },
      }),
    }),
    // TODO: "Streetwise or Sweettalk" -> Finesse or Speech (game-system.md fold-ins).
    turnHimAround: action({
      label: "Turn him around",
      requires: [
        new SkillRequirement(Finesse, Speech),
        new Requirement("The rest of the crew won't let you.", { when: (w) => w.caughtAtTheStill.crewThreat === "franek-only" }),
      ],
      cost: [{ composure: 1 }],
      narrative: new Narrative({
        narration: [
          "(Originally required Streetwise or Sweettalk.) Franek is too drunk to track anything. Point him at a threat that is not there — a noise in the trees, the milicja coming up the path — and his aggression lurches off the committee. He stumbles off swinging at shadows.",
        ],
        gives: {
          // TODO: also "NPC State Change: the crew is wary but not hostile, and the still stays put."
          effects: (w) => {
            w.caughtAtTheStill.crewThreat = "none";
          },
        },
      }),
    }),
    scrap: action({
      label: "Scrap",
      requires: [new Requirement("There's no fight to join.", { when: (w) => w.caughtAtTheStill.crewThreat !== "none" })],
      // TODO: cost also "the scrapper Bruised (TBD)"; Bruised is not defined yet.
      cost: [{ composure: 1 }],
      narrative: new Narrative({
        narration: [
          "The player throws themselves into the drunk crew, trading blows and grappling bottles away. Counts as one fighter against the crew.",
        ],
        gives: {
          effects: (w) => {
            w.caughtAtTheStill.fighters += 1;
          },
        },
      }),
    }),
    beatThemUp: action({
      label: "Beat them up",
      requires: [
        new SkillRequirement(Violence),
        new Requirement("There's no fight to join.", { when: (w) => w.caughtAtTheStill.crewThreat !== "none" }),
      ],
      cost: [{ composure: 1 }],
      narrative: new Narrative({
        narration: [
          "The player drops men fast and hard. Counts as two fighters against the crew.",
        ],
        gives: {
          effects: (w) => {
            w.caughtAtTheStill.fighters += 2;
          },
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  // TODO: "Read" is a retired card; rerouted to Empathy. "Read or Streetwise" -> Empathy or Finesse.
  readonly allOpportunities = {
    theStandoff: opportunity({
      label: "The standoff",
      target: { skills: [Empathy] },
      promptedBy: [CaughtAtTheStill],
      narrative: new Narrative({
        narration: [
          "(Originally gated on Read.) The crew is not defending a crime scene; they are frightened men protecting the one thing that gets them through the winter.",
        ],
        gives: { clues: [clues.StillIsTheirLivelihood] },
      }),
    }),
    franekIsCoiled: opportunity({
      label: "Franek is coiled",
      target: { when: (_w, me) => me.has(Empathy) || me.has(Finesse) },
      promptedBy: [CaughtAtTheStill],
      narrative: new Narrative({
        narration: [
          "(Originally gated on Read or Streetwise.) Franek Mucha is drunk past reason and cornered against the path. Rank and orders roll off him — short of a drawn gun, he gets turned around or put down, nothing else.",
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
