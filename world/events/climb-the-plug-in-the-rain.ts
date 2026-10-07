import { Event, Narrative, PerPlayer, Requirement, SkillRequirement, action, opportunity } from "../schema.ts";
import type { CharacterRef, Effect, EventHook, LocationRef, Tick, WorldCond } from "../schema.ts";
import { todo, todoEffect } from "../todo.ts";
import { Finesse, Geology, Handiwork, Medicine, Physique, Survival, Violence } from "../skills.ts";
import TheRidgeGap from "../locations/the-ridge-gap.ts";
import Foreman from "../characters/foreman.ts";
import Rope from "../items/rope.ts";
import Anchor from "../items/anchor.ts";
import MakeshiftCharge from "../items/makeshift-charge.ts";
import ForemanSavesVillage from "./foreman-saves-village.ts";

export default class ClimbThePlugInTheRain extends Event {
  readonly id = "climb-the-plug-in-the-rain";
  readonly name = "Climb the Plug in the Rain";
  readonly hook = "Facing the rain-soaked ridge plug, a heavy load to haul up.";
  override at(): LocationRef {
    return TheRidgeGap;
  }

  override present(): CharacterRef[] {
    return [Foreman];
  }
  override readonly hooks: EventHook[] = [
    { text: "Facing the rain-soaked ridge plug, a heavy load to haul up.", heardAt: [TheRidgeGap] },
  ];
  // TODO: party has charges and committed to plan
  override condition: WorldCond = (w) => w.foremanSavesVillage.status !== "pending" && todo("party has charges and committed to plan")();
  readonly setup = new Narrative({
    narration: [
      "The party already knows this climb: the route, the killzone, the crux. What is different is the rain and the load, not the line.",
      "The seam that takes the charge is up under the crux slab near the top of the plug, the same overhang the survey climb met, not down at the toe.",
      "Rain is sheeting off the plug: the clay banks run with mud, the killzone ledge is strewn with wet rubble, and the crux slab is black and streaming. It looks worse than the survey. How much worse, no one can say from the ground.",
      "The charges are twenty-year-old partisan ordnance, heavy and touchy: a knock, drop, spark, or heat can set them off. Getting the weight up the plug is the real problem, not finding the way.",
      "If the survey party drove a clamp at the crux, the top pitch is a fixed hold; if not, it has to be free-soloed again, in the rain.",
    ],
  });

  resolve: Tick = todoEffect(
    "Michał Pytlak goes up the plug alone, in the rain, to set the charge. | Michał Pytlak may die on the slab, or save the village at the cost of his body and never return the same.",
  );

  // Where each climber is on the plug:
  //   0 at the foot / clear of the plug, 1 past the lower bank, 2 past the killzone, 3 past the top-out.
  // Whether the crux is anchored is shared with the survey climb: w.climbThePlug.cruxAnchored.
  level = new PerPlayer<number>(0);
  // Counterweight points on the line (Take the line: +1, a Physique body +2).
  counterweight = 0;
  // The first killzone crossing knocks the loose rock off the line for good.
  looseRockRemoved = false;
  // A climber who has lost balance must regain it at once or fall.
  offBalance = new PerPlayer<boolean>(false);
  // Consecutive Frantic grasps; the second one holds.
  franticGrasps = new PerPlayer<number>(0);
  carryingCharge = new PerPlayer<boolean>(false);
  // Where the hauled charge is (same scale as `level`).
  chargeLevel = 0;
  chargePrimed = false;

  // TODO: mechanics not modelled yet (see prose/events/climb-the-plug-in-the-rain.md):
  // "Charge carrying" (carrier loses balance every level unless Physique, stacking;
  // the charge moves with its carrier; a Wounding fall detonates it),
  // "Balance" (off-balance and not regained -> fall),
  // "Killzone catch" (counterweight on the line at the fall: 0 Wounded, 1 Bruised, 2+ safe; all spent).

  // ------------------------------------------------------------ actions

  readonly allActions = {
    scaleTheLowerBank: action({
      label: "Scale the lower bank",
      requires: [
        new SkillRequirement(Geology, Finesse),
        new Requirement("You're already up on the plug.", { when: (w, me) => w.climbThePlugInTheRain.level.of(me) === 0 }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The clay has liquefied and sloughs underfoot; a skilled climber picks the bearing line or muscles up it.",
        ],
        gives: {
          effects: (w, me) => {
            w.climbThePlugInTheRain.level.set(me, 1);
          },
        },
      }),
    }),
    forceTheLowerBank: action({
      label: "Force the lower bank",
      requires: [
        new Requirement("You're already up on the plug.", { when: (w, me) => w.climbThePlugInTheRain.level.of(me) === 0 }),
      ],
      cost: [{ time: 1 }, { composure: 1 }],
      narrative: new Narrative({
        narration: [
          "No read and no strength for the slop, so the climber grinds up it on nerve alone.",
        ],
        gives: {
          effects: (w, me) => {
            w.climbThePlugInTheRain.level.set(me, 1);
          },
        },
      }),
    }),
    carryTheCharge: action({
      label: "Carry the charge",
      requires: [new Requirement("You don't have the charge.", { items: [MakeshiftCharge] })],
      cost: [],
      narrative: new Narrative({
        narration: [
          "The climber carries the charge up the wet bank and onto the line.",
        ],
        gives: {
          effects: (w, me) => {
            w.climbThePlugInTheRain.carryingCharge.set(me, true);
          },
        },
      }),
    }),
    takeTheLine: action({
      label: "Take the line",
      requires: [
        new Requirement("You have no rope.", { items: [Rope] }),
        new Requirement("You're not up past the lower bank.", { when: (w, me) => w.climbThePlugInTheRain.level.of(me) >= 1 }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The climber commits their body to the line as counterweight, to power a haul or catch a fall below.",
        ],
        gives: {
          effects: (w, me) => {
            w.climbThePlugInTheRain.counterweight += me.has(Physique) ? 2 : 1;
          },
        },
      }),
    }),
    // Split from "Traverse the killzone": first attempt (loose rock in place).
    // TODO: the fall and its catch by the counterweight are not modelled (see Mechanics).
    traverseTheKillzoneFirstAttempt: action({
      label: "Traverse the killzone (loose rock in place)",
      requires: [
        new SkillRequirement(Physique, Finesse),
        new Requirement("You're not up past the lower bank.", { when: (w, me) => w.climbThePlugInTheRain.level.of(me) === 1 }),
        new Requirement("The loose rock is already gone.", { when: (w) => !w.climbThePlugInTheRain.looseRockRemoved }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "First attempt `(loose rock in place)` — the loose rock gives and the climber falls, caught by the counterweight on the line (see Mechanics); the fall knocks the rock off the line for good.",
        ],
        gives: {
          effects: (w, me) => {
            w.climbThePlugInTheRain.looseRockRemoved = true;
            w.climbThePlugInTheRain.offBalance.set(me, true);
          },
        },
      }),
    }),
    // Split from "Traverse the killzone": later attempts (loose rock removed).
    traverseTheKillzone: action({
      label: "Traverse the killzone (loose rock removed)",
      requires: [
        new SkillRequirement(Physique, Finesse),
        new Requirement("You're not up past the lower bank.", { when: (w, me) => w.climbThePlugInTheRain.level.of(me) === 1 }),
        new Requirement("The loose rock is still on the line.", { when: (w) => w.climbThePlugInTheRain.looseRockRemoved }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Later attempts `(loose rock removed)` — with the rock already gone the climber crosses clean.",
        ],
        gives: {
          // "the line is fixed": no separate state; reads as looseRockRemoved.
          effects: (w, me) => {
            w.climbThePlugInTheRain.level.set(me, 2);
          },
        },
      }),
    }),
    regainBalance: action({
      label: "Regain balance",
      requires: [
        new SkillRequirement(Finesse),
        new Requirement("You haven't lost your balance.", { when: (w, me) => w.climbThePlugInTheRain.offBalance.of(me) }),
      ],
      cost: [{ composure: 1 }],
      narrative: new Narrative({
        narration: [
          "The climber catches a delicate hold and settles the stance before the fall takes them.",
        ],
        gives: {
          effects: (w, me) => {
            w.climbThePlugInTheRain.offBalance.set(me, false);
            w.climbThePlugInTheRain.franticGrasps.set(me, 0);
          },
        },
      }),
    }),
    // TODO: "consecutive" is not enforced; the count resets only when balance is regained.
    franticGrasp: action({
      label: "Frantic grasp",
      requires: [
        new Requirement("You haven't lost your balance.", { when: (w, me) => w.climbThePlugInTheRain.offBalance.of(me) }),
      ],
      cost: [{ composure: 1 }],
      narrative: new Narrative({
        narration: [
          "The climber claws for any hold, slipping and catching. It only holds on the second grasp; the first buys nothing but the next snatch.",
        ],
        gives: {
          effects: (w, me) => {
            w.climbThePlugInTheRain.franticGrasps.set(me, w.climbThePlugInTheRain.franticGrasps.of(me) + 1);
            w.climbThePlugInTheRain.offBalance.set(me, w.climbThePlugInTheRain.franticGrasps.of(me) < 2);
          },
        },
      }),
    }),
    driveTheAnchor: action({
      label: "Drive the anchor",
      requires: [
        new Requirement("You have no anchor and hammer.", { items: [Anchor] }),
        new Requirement("You're not up past the killzone.", { when: (w, me) => w.climbThePlugInTheRain.level.of(me) === 2 }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The climber drives the anchor home at the top of the plug, setting a fixed point for the crux.",
        ],
        gives: {
          effects: (w) => {
            w.climbThePlug.cruxAnchored = true;
          },
        },
      }),
    }),
    traverseTheTopOut: action({
      label: "Traverse the top-out",
      requires: [
        new SkillRequirement(Physique, Finesse),
        new Requirement("You're not up past the killzone.", { when: (w, me) => w.climbThePlugInTheRain.level.of(me) === 2 }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The rain-greased crux slab will not hold a stance and the climber loses balance outright.",
        ],
        gives: {
          effects: (w, me) => {
            w.climbThePlugInTheRain.level.set(me, 3);
            w.climbThePlugInTheRain.offBalance.set(me, true);
          },
        },
      }),
    }),
    traverseWithAnchor: action({
      label: "Traverse with anchor",
      requires: [
        new Requirement("The top-out isn't anchored.", { when: (w) => w.climbThePlug.cruxAnchored }),
        new Requirement("You're not up past the killzone.", { when: (w, me) => w.climbThePlugInTheRain.level.of(me) === 2 }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The climber clips the fixed anchor and moves across the crux on the line, the slab no longer able to throw them.",
        ],
        gives: {
          effects: (w, me) => {
            w.climbThePlugInTheRain.level.set(me, 3);
          },
        },
      }),
    }),
    // TODO: modelled as taken by the hauled climber (the one who moves up);
    // the hauling crew is not tracked individually.
    haulAClimberOneLevel: action({
      label: "Haul a climber one level",
      requires: [
        new Requirement("The top-out isn't anchored.", { when: (w) => w.climbThePlug.cruxAnchored }),
        new Requirement("You have no rope.", { items: [Rope] }),
        new Requirement("Not enough weight on the line.", { when: (w) => w.climbThePlugInTheRain.counterweight >= 2 }),
        new Requirement("You're already past the top-out.", { when: (w, me) => w.climbThePlugInTheRain.level.of(me) < 3 }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The crew hang their weight on the parallel strand and drag a body up one pitch, no one climbing it under load.",
        ],
        gives: {
          effects: (w, me) => {
            w.climbThePlugInTheRain.level.set(me, w.climbThePlugInTheRain.level.of(me) + 1);
            w.climbThePlugInTheRain.counterweight -= 2;
          },
        },
      }),
    }),
    haulTheChargeOneLevel: action({
      label: "Haul the charge one level",
      requires: [
        new Requirement("The top-out isn't anchored.", { when: (w) => w.climbThePlug.cruxAnchored }),
        new Requirement("You have no rope.", { items: [Rope] }),
        new Requirement("Not enough weight on the line.", { when: (w) => w.climbThePlugInTheRain.counterweight >= 1 }),
        new Requirement("The charge is already up top.", { when: (w) => w.climbThePlugInTheRain.chargeLevel < 3 }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The crew hang their weight on the parallel strand and drag the charge up one pitch, no one climbing it under load.",
        ],
        gives: {
          effects: (w) => {
            w.climbThePlugInTheRain.chargeLevel += 1;
            w.climbThePlugInTheRain.counterweight -= 1;
          },
        },
      }),
    }),
    primeTheExplosives: action({
      label: "Prime the explosives",
      requires: [
        new SkillRequirement(Violence, Handiwork),
        new Requirement("The charge isn't up past the top-out.", {
          when: (w, me) =>
            w.climbThePlugInTheRain.chargeLevel === 3 ||
            (w.climbThePlugInTheRain.carryingCharge.of(me) && w.climbThePlugInTheRain.level.of(me) === 3),
        }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The climber sets the detonator and runs the fuse, arming the old ordnance to blow.",
        ],
        gives: {
          effects: (w) => {
            w.climbThePlugInTheRain.chargePrimed = true;
          },
        },
      }),
    }),
    rappelDownOneLevel: action({
      label: "Rappel down one level",
      requires: [
        new Requirement("You have no rope.", { items: [Rope] }),
        new Requirement("The top-out isn't anchored.", { when: (w) => w.climbThePlug.cruxAnchored }),
        new Requirement("Nobody is left on the plug to work the rope.", {
          when: todo("another climber still on the plug to work the rope"),
        }),
        new Requirement("You're not on the plug.", { when: (w, me) => w.climbThePlugInTheRain.level.of(me) > 0 }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "A second climber belays them off the fixed anchor and they rope down one pitch, clear of the load.",
        ],
        gives: {
          effects: (w, me) => {
            w.climbThePlugInTheRain.level.set(me, w.climbThePlugInTheRain.level.of(me) - 1);
          },
        },
      }),
    }),
    downclimbOneLevel: action({
      label: "Downclimb one level",
      requires: [
        new SkillRequirement(Physique, Finesse),
        new Requirement("You're not on the plug.", { when: (w, me) => w.climbThePlugInTheRain.level.of(me) > 0 }),
      ],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "With no one left to work the rope, the last climber downclimbs the wet pitch unroped and loses balance on it.",
        ],
        gives: {
          effects: (w, me) => {
            w.climbThePlugInTheRain.level.set(me, w.climbThePlugInTheRain.level.of(me) - 1);
            w.climbThePlugInTheRain.offBalance.set(me, true);
          },
        },
      }),
    }),
    blowTheGap: action({
      label: "Blow the gap",
      requires: [new Requirement("The charge isn't primed.", { when: (w) => w.climbThePlugInTheRain.chargePrimed })],
      cost: [],
      narrative: new Narrative({
        narration: [
          "The charge blows: the notch opens, floodwater widens it, and the water in %NEW_VILLAGE% starts to drop. Anyone still on the plug when it goes is killed.",
        ],
        gives: {
          effects: todoEffect(
            "Any climber still on the plug dies | World State Change: %NEW_VILLAGE% is saved and the empty %BIG-BASIN% floods (no one lives there) | Ending Progress: the engineering ending resolves.",
          ),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    theWeepingClay: opportunity({
      label: "The Weeping Clay",
      target: { skills: [Geology] },
      promptedBy: [ClimbThePlugInTheRain],
      narrative: new Narrative({
        narration: [
          "The soaked clay only holds weight in the right places; get it wrong and you bog. You either know where it bears, or you move light and deft.",
        ],
      }),
    }),
    aBadFeeling: opportunity({
      label: "A Bad Feeling",
      target: { skills: [Survival] },
      promptedBy: [ClimbThePlugInTheRain],
      narrative: new Narrative({
        narration: [
          "The loose rock looks extremely dangerous; you wouldn't go up there without a rope and assistance. The fall on the traverse is almost certain; we need a rope.",
        ],
      }),
    }),
    twoOnTheRope: opportunity({
      label: "Two on the Rope",
      target: { skills: [Handiwork], items: [Rope] },
      promptedBy: [ClimbThePlugInTheRain],
      narrative: new Narrative({
        narration: [
          "`(requires: Handiwork and a rope)` — A fall here only comes up safe with enough weight on the line: two bodies at least, not one.",
        ],
      }),
    }),
    somethingToHaulAgainst: opportunity({
      label: "Something to Haul Against",
      trigger: (w) => w.climbThePlug.cruxAnchored,
      target: { skills: [Handiwork] },
      promptedBy: [ClimbThePlugInTheRain],
      narrative: new Narrative({
        narration: [
          "`(requires: Handiwork and the crux is anchored)` — The clamp still up top is a fixed point. You can rig a line to it and haul the charge up on its own, so no one climbs with it on their back.",
        ],
      }),
    }),
    theAnatomyOfAFall: opportunity({
      label: "The Anatomy of a Fall",
      target: { skills: [Medicine] },
      promptedBy: [ClimbThePlugInTheRain],
      narrative: new Narrative({
        narration: [
          "Off the lower bank, bruises. Off the wet traverse onto the rock, broken bones. From the top pitch you break badly. None of it kills you by itself; the fall hurts, it doesn't kill.",
        ],
      }),
    }),
    aSoldiersEye: opportunity({
      label: "A Soldier's Eye",
      target: { skills: [Violence] },
      promptedBy: [ClimbThePlugInTheRain],
      narrative: new Narrative({
        narration: [
          "You've seen men fall and you know ordnance. Roughly: the drops break a man, they don't kill him, but the charge on his back is what puts him in the ground. It's old and touchy, a hard knock or a fall with it and it goes off.",
        ],
      }),
    }),
    noTurningBack: opportunity({
      label: "No Turning Back",
      target: { skills: [Physique], when: (w, me) => w.climbThePlugInTheRain.level.of(me) === 1 },
      promptedBy: [ClimbThePlugInTheRain],
      narrative: new Narrative({
        narration: [
          "`(requires: Physique and climbed past lower bank)` — Looks very steep, but I think I can take it.",
        ],
      }),
    }),
    aDelicateLine: opportunity({
      label: "A Delicate Line",
      target: { skills: [Finesse], when: (w, me) => w.climbThePlugInTheRain.level.of(me) === 1 },
      promptedBy: [ClimbThePlugInTheRain],
      narrative: new Narrative({
        narration: [
          "`(requires: Finesse and climbed past lower bank)` — Steep, but I can find a delicate line, so long as I climb light. Not with the charge on my back.",
        ],
      }),
    }),
    worseThanItLooked: opportunity({
      label: "Worse Than It Looked",
      target: { skills: [Physique], when: (w, me) => w.climbThePlugInTheRain.level.of(me) === 2 },
      promptedBy: [ClimbThePlugInTheRain],
      narrative: new Narrative({
        narration: [
          "`(requires: Physique and climbed past the killzone)` — It's much worse than I realized, and there's a live charge on my back. I can try it, but I'm scared of falling.",
        ],
      }),
    }),
    balanceOverForce: opportunity({
      label: "Balance Over Force",
      target: { skills: [Finesse], when: (w, me) => w.climbThePlugInTheRain.level.of(me) === 2 },
      promptedBy: [ClimbThePlugInTheRain],
      narrative: new Narrative({
        narration: [
          "`(requires: Finesse and climbed past the killzone)` — I can balance the crux, but only empty-handed; the charge would tip me straight off.",
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
