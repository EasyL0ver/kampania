import { Event, Narrative, PerPlayer, Requirement, SkillRequirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef, WorldCond } from "../schema.ts";
import { todo } from "../todo.ts";
import { Finesse, Geology, Handiwork, Medicine, Physique, Survival, Violence } from "../skills.ts";
import * as clues from "../clues.ts";
import TheRidgeGap from "../locations/the-ridge-gap.ts";
import Foreman from "../characters/foreman.ts";
import Rope from "../items/rope.ts";
import Anchor from "../items/anchor.ts";
import GeologistsKit from "../items/geologists-kit.ts";
import WaterHoseContraption from "../items/water-hose-contraption.ts";

export default class ClimbThePlug extends Event {
  readonly id = "climb-the-plug";
  readonly name = "Climb the Plug";
  readonly hook = "Facing the steep plug at the ridge gap.";
  override at(): LocationRef {
    return TheRidgeGap;
  }

  // TODO: Pytlak is present only "if brought on the survey"; not modelled.
  override present(): CharacterRef[] {
    return [Foreman];
  }
  override readonly hooks: EventHook[] = [
    { text: "Facing the steep plug at the ridge gap.", heardAt: [TheRidgeGap] },
  ];
  // TODO: at ridge gap holding landslide-in-the-gap clue
  override condition: WorldCond = (_w) => todo("at ridge gap holding landslide-in-the-gap clue")();
  readonly setup = new Narrative({
    narration: [
      "The plug is a steep bank about two storeys high, and it climbs in three distinct pitches.",
      "Lower bank (get on): a greasy clay start; strength gets up it fastest, but a sure-footed or determined climber can scramble on too.",
      "The killzone (the crossing): a loose, exposed traverse of shifting rock. Every hold looks ready to come away under a boot; the party will want it roped and belayed.",
      "The top pitch (top out): the crest is capped by a slab of intact sandstone torn loose by the slide; from the ground it just looks like the top edge, and what it takes to get over it cannot be read from below, not even by a good eye. You only see the problem once you are under it.",
      "The climb is a one-person job; the rest of the party work the ground: belaying the rope, reading the line, calling up.",
      "The party should bring or scrounge a rope (the PGR farm or office has line): they will want it for the traverse, and need it to haul anyone who cannot climb up to the crest.",
      "The top pitch has one lasting solution: a clamp driven into the soft shale seam under the slab. The tools, a clamp and a hammer (both at the PGR farm), have to be carried up, which no one brings on a first blind climb.",
      "Why climb at all: the sill that decides overtopping into %BIG-BASIN% can be read only from the crest (the reasoning lives at The Ridge Gap).",
    ],
  });

  // Where each climber is on the plug:
  //   0 at the foot, 1 past the lower bank, 2 past the killzone, 3 topped out.
  level = new PerPlayer<number>(0);
  // Counterweight points on the line (Take the line: +1, a Physique body +2).
  counterweight = 0;
  // The clamp is driven into the shale seam under the crux slab. Lasting:
  // Climb the Plug in the Rain reads (and can set) this too.
  cruxAnchored = false;

  // TODO: mechanic "The fall" / "Wounded" not modelled yet (see prose/events/climb-the-plug.md):
  // Forcing the top-out without the composure reserve -> Wounded, back at the foot.

  // ------------------------------------------------------------ actions

  readonly allActions = {
    scaleTheLowerBank: action({
      label: "Scale the lower bank",
      requires: [
        new SkillRequirement(Physique, Survival, Finesse),
        new Requirement("You're already up on the plug.", { when: (w, me) => w.climbThePlug.level.of(me) === 0 }),
      ],
      promptedBy: [clues.LandslideInTheGap],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The greasy clay gives underfoot; a strong, sure-footed, or deft climber gets up onto the plug.",
        ],
        gives: {
          effects: (w, me) => {
            w.climbThePlug.level.set(me, 1);
          },
        },
      }),
    }),
    forceTheLowerBank: action({
      label: "Force the lower bank",
      requires: [
        new Requirement("You're already up on the plug.", { when: (w, me) => w.climbThePlug.level.of(me) === 0 }),
      ],
      cost: [{ time: 1 }, { composure: 1 }],
      narrative: new Narrative({
        narration: [
          "No strength or footwork for the clay, so the climber grinds up it on nerve alone.",
        ],
        gives: {
          effects: (w, me) => {
            w.climbThePlug.level.set(me, 1);
          },
        },
      }),
    }),
    takeTheLine: action({
      label: "Take the line",
      requires: [new Requirement("You have no rope.", { items: [Rope] })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "A partner throws their weight on the line, from the foot of the plug or from the crest off the clamp, ready to hold a fall or power a haul.",
        ],
        gives: {
          effects: (w, me) => {
            w.climbThePlug.counterweight += me.has(Physique) ? 2 : 1;
          },
        },
      }),
    }),
    // The killzone is a fake danger here: the crossing never falls.
    traverseTheKillzone: action({
      label: "Traverse the killzone",
      requires: [
        new SkillRequirement(Physique, Finesse),
        new Requirement("You're not up past the lower bank.", { when: (w, me) => w.climbThePlug.level.of(me) === 1 }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The traverse looks ready to come apart, every hold shifting loose under the hand, but the rock is seated and holds. The climber crosses it, roped or not.",
        ],
        gives: {
          effects: (w, me) => {
            w.climbThePlug.level.set(me, 2);
          },
        },
      }),
    }),
    // TODO: the "without the reserve -> Wounded, back at the foot" branch is not
    // modelled; the composure cost stands in for the reserve.
    forceTheTopOut: action({
      label: "Force the top-out",
      requires: [
        new Requirement("You're not up past the killzone.", { when: (w, me) => w.climbThePlug.level.of(me) === 2 }),
      ],
      cost: [{ time: 1 }, { composure: 2 }],
      narrative: new Narrative({
        narration: [
          "The slab overhangs a body-length, smooth and undercut, no holds and nothing above to anchor to. The climber free-solos it anchorless. With the reserve they pull over and top out, leaving the crux bare for anyone who follows. Forcing it without the reserve, they come off the slab: a two-storey fall, nothing to catch them, and they land Wounded (attempt spent, back at the foot).",
        ],
        gives: {
          effects: (w, me) => {
            w.climbThePlug.level.set(me, 3);
          },
        },
      }),
    }),
    driveTheClamp: action({
      label: "Drive the clamp",
      requires: [
        new Requirement("You have no clamp and hammer.", { items: [Anchor] }),
        new Requirement("You're not up past the killzone.", { when: (w, me) => w.climbThePlug.level.of(me) === 2 }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The climber drives the steel clamp into the soft shale seam under the slab and pulls over on it, topping out clean with no composure tax. The clamp stays in the rock.",
        ],
        gives: {
          effects: (w, me) => {
            w.climbThePlug.level.set(me, 3);
            w.climbThePlug.cruxAnchored = true;
          },
        },
      }),
    }),
    // TODO: modelled as taken by the hauled climber (the one who moves up);
    // the hauling crew is not tracked individually.
    haulAClimberOneLevel: action({
      label: "Haul a climber one level",
      requires: [
        new Requirement("Nothing up top to haul against.", { when: (w) => w.climbThePlug.cruxAnchored }),
        new Requirement("You have no rope.", { items: [Rope] }),
        new Requirement("Not enough weight on the line.", { when: (w) => w.climbThePlug.counterweight >= 2 }),
        new Requirement("You're not up past the lower bank.", { when: (w, me) => w.climbThePlug.level.of(me) >= 1 }),
        new Requirement("You're already on the crest.", { when: (w, me) => w.climbThePlug.level.of(me) < 3 }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The crew hang their weight on the parallel strand off the clamp and drag a body up one pitch, no one climbing it under load. This is how the reader who must take the reading, a geologist or a handiworker with an improvised level, but cannot climb the killzone reaches the crest.",
        ],
        gives: {
          effects: (w, me) => {
            w.climbThePlug.level.set(me, w.climbThePlug.level.of(me) + 1);
            w.climbThePlug.counterweight -= 2;
          },
        },
      }),
    }),
    // Split by card: Geology costs 1 card, Handiwork (hose level) costs 2.
    levelTheFootOfThePlugGeology: action({
      label: "Level the foot of the plug (Geology)",
      requires: [
        new Requirement("You don't have the geologist's kit.", { items: [GeologistsKit] }),
        new SkillRequirement(Geology),
      ],
      promptedBy: [clues.FloodMarkLeftByDamBuilders, clues.WaterMayFlowOver],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Carry the flood line to a fixed mark on the ground just below the plug: bring a level from the marked flood datum down the valley up to the mark, fixing that ground's height against the flood line. *Geology* shoots it with the kit's level and rod in a few long sights; *Handiwork* runs the water hose contraption, leapfrogged one rod-length of rise per step up to the mark, slow but the same answer. This sets the reference the crest reading is dropped against; it does not by itself settle overtopping.",
        ],
        gives: { clues: [clues.GapFootLevel] },
      }),
    }),
    levelTheFootOfThePlugHandiwork: action({
      label: "Level the foot of the plug (Handiwork, hose level)",
      requires: [
        new Requirement("You don't have the geologist's kit.", { items: [GeologistsKit] }),
        new SkillRequirement(Handiwork),
        new Requirement("You have no water hose level.", { items: [WaterHoseContraption] }),
      ],
      promptedBy: [clues.FloodMarkLeftByDamBuilders, clues.WaterMayFlowOver],
      cost: [{ time: 2 }],
      narrative: new Narrative({
        narration: [
          "Same outcome as levelTheFootOfThePlugGeology (the Handiwork route, 2 cards).",
        ],
        gives: { clues: [clues.GapFootLevel] },
      }),
    }),
    takeTheReadingGeology: action({
      label: "Take the reading (Geology)",
      requires: [
        new Requirement("You don't have the geologist's kit.", { items: [GeologistsKit] }),
        new SkillRequirement(Geology),
        new Requirement("You're not on the crest.", { when: (w, me) => w.climbThePlug.level.of(me) === 3 }),
        new Requirement("The foot mark isn't levelled yet.", { clues: [clues.GapFootLevel] }),
      ],
      promptedBy: [clues.FloodMarkLeftByDamBuilders, clues.WaterMayFlowOver],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "With the foot mark already fixed against the flood line, the crest reading is two more transfers, and the crest is the only place they can be made: 1. Drop the top stone to the foot mark. Hang the kit's plumb line from the capstone slab at the crest straight down the sheer face to the mark below the climb. The line reads the vertical face directly, fixing the top stone's height above the flood line. 2. Level the notch against the top stone. Level the plug's lowest saddle against the top stone right there at the crest, a short local step. That last figure is the sill's height above the flood line. If the sill stands above the line, rising water cannot top the plug.",
        ],
        gives: { clues: [clues.GapSillAboveFlood] },
      }),
    }),
    takeTheReadingHandiwork: action({
      label: "Take the reading (Handiwork, hose level)",
      requires: [
        new Requirement("You don't have the geologist's kit.", { items: [GeologistsKit] }),
        new SkillRequirement(Handiwork),
        new Requirement("You have no water hose level.", { items: [WaterHoseContraption] }),
        new Requirement("You're not on the crest.", { when: (w, me) => w.climbThePlug.level.of(me) === 3 }),
        new Requirement("The foot mark isn't levelled yet.", { clues: [clues.GapFootLevel] }),
      ],
      promptedBy: [clues.FloodMarkLeftByDamBuilders, clues.WaterMayFlowOver],
      cost: [{ time: 2 }],
      narrative: new Narrative({
        narration: [
          "Same outcome as takeTheReadingGeology (the Handiwork route, 2 cards).",
        ],
        gives: { clues: [clues.GapSillAboveFlood] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theFootOfThePlug: opportunity({
      label: "The Foot of the Plug",
      target: { skills: [Survival] },
      promptedBy: [ClimbThePlug],
      narrative: new Narrative({
        narration: [
          "The lower bank seems easy; the traverse will need a rope. The top pitch can't be read from here.",
        ],
      }),
    }),
    mudUnderfoot: opportunity({
      label: "Mud Underfoot",
      target: { skills: [Physique] },
      promptedBy: [ClimbThePlug],
      narrative: new Narrative({
        narration: [
          "Seems easy.",
        ],
      }),
    }),
    twoOnTheRope: opportunity({
      label: "Two on the Rope",
      target: { skills: [Handiwork], items: [Rope] },
      promptedBy: [ClimbThePlug],
      narrative: new Narrative({
        narration: [
          "`(requires: Handiwork and a rope)` — Securing a fall on this needs two people on the line, not one.",
        ],
      }),
    }),
    theAnatomyOfAFall: opportunity({
      label: "The Anatomy of a Fall",
      target: { skills: [Medicine] },
      promptedBy: [ClimbThePlug],
      narrative: new Narrative({
        narration: [
          "A slip off the lower bank is bruises and mud. Off the traverse onto the rock, broken bones. From the top pitch you break badly. None of it kills you by itself; a fall here hurts, it doesn't kill.",
        ],
      }),
    }),
    aSoldiersEye: opportunity({
      label: "A Soldier's Eye",
      target: { skills: [Violence] },
      promptedBy: [ClimbThePlug],
      narrative: new Narrative({
        narration: [
          "You've seen men fall. Roughly: the bank bruises, the traverse breaks bones, the top breaks you badly, but none of it puts a man in the ground. Less exact than a medic's read, close enough.",
        ],
      }),
    }),
    theCrossing: opportunity({
      label: "The Crossing",
      target: { skills: [Physique], when: (w, me) => w.climbThePlug.level.of(me) === 1 },
      promptedBy: [ClimbThePlug],
      narrative: new Narrative({
        narration: [
          "`(requires: Physique and climbed past lower bank)` — Looks very steep, but I think I can take it.",
        ],
      }),
    }),
    aDelicateLine: opportunity({
      label: "A Delicate Line",
      target: { skills: [Finesse], when: (w, me) => w.climbThePlug.level.of(me) === 1 },
      promptedBy: [ClimbThePlug],
      narrative: new Narrative({
        narration: [
          "`(requires: Finesse and climbed past lower bank)` — Steep, but there's a delicate line through it if I'm careful.",
        ],
      }),
    }),
    worseThanItLooked: opportunity({
      label: "Worse Than It Looked",
      target: { skills: [Physique], when: (w, me) => w.climbThePlug.level.of(me) === 2 },
      promptedBy: [ClimbThePlug],
      narrative: new Narrative({
        narration: [
          "`(requires: Physique and climbed past the killzone)` — It's much worse than I realized. I can try it, but I'm scared of falling.",
        ],
      }),
    }),
    balanceOverForce: opportunity({
      label: "Balance Over Force",
      target: { skills: [Finesse], when: (w, me) => w.climbThePlug.level.of(me) === 2 },
      promptedBy: [ClimbThePlug],
      narrative: new Narrative({
        narration: [
          "`(requires: Finesse and climbed past the killzone)` — No holds worth the name, but I can balance it, barely.",
        ],
      }),
    }),
    somethingToHaulAgainst: opportunity({
      label: "Something to Haul Against",
      trigger: (w) => w.climbThePlug.cruxAnchored,
      target: { skills: [Handiwork] },
      promptedBy: [ClimbThePlug],
      narrative: new Narrative({
        narration: [
          "`(requires: Handiwork and the crux is anchored)` — The clamp up top is a fixed point. You can rig a line to it and haul a body up on its own, so someone who can't climb still reaches the crest.",
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
