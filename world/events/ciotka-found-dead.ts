import { Event, Narrative, Requirement, SkillRequirement, action, anyone, opportunity } from "../schema.ts";
import type { CharacterRef, Effect, EventHook, LocationRef, Tick, World, WorldCond } from "../schema.ts";
import { Devotion, Handiwork, Medicine, Physique, Violence } from "../skills.ts";
import * as clues from "../clues.ts";
import { todoEffect } from "../todo.ts";
import CiotkasHouse from "../locations/ciotkas-house.ts";
import Ciotka from "../characters/ciotka.ts";
import Priest from "../characters/priest.ts";
import EdekBox from "../items/edek-box.ts";
import GirlsDress from "../items/girls-dress.ts";
import LemkoBell from "../items/lemko-bell.ts";
import CigaretteButtsFromCiotkas from "../items/cigarette-butts-from-ciotkas.ts";
import EdekInTheBunker from "./edek-in-the-bunker.ts";

export default class CiotkaFoundDead extends Event {
  readonly id = "ciotka-found-dead";
  readonly name = "Ciotka Found Dead";
  readonly hook = "Janina Gajda's front door is locked; the back door stands open.";
  override at(): LocationRef {
    return CiotkasHouse;
  }

  // Janina is present as a body. The priest leaves to fetch Zbigniew.
  override present(w: World): CharacterRef[] {
    return w.ciotkaFoundDead.priestLeft ? [Ciotka] : [Ciotka, Priest];
  }
  override readonly hooks: EventHook[] = [
    { text: "Janina Gajda's front door is locked; the back door stands open.", heardAt: [CiotkasHouse] },
    { text: "Janina Gajda is absent from the Day 4 mass if the priest does not find her at home first.", heardAt: "anywhere" },
  ];
  // TODO: players visit Ciotka's house on Day 3 or later
  // "Day 3 or later": The Flood starts Day 3 morning, so it stands in for the day.
  override condition: WorldCond = (w) => w.theFlood.status !== "pending";
  readonly setup = new Narrative({
    narration: [
      "The front door is locked, both locks turned, as she always kept it.",
      "The back door stands open.",
      "Cigarette butts lie scattered just outside the door.",
      "The house is quiet.",
      "ks. Władysław Pająk is here, come to look in on Janina; he helps the committee where he can and flinches only at her body being disturbed.",
      "The icons remain on the walls.",
      "A hatch to the attic is set in the ceiling, a short ladder folded beside it.",
      "The candles have burned out and have been out for hours.",
      "The house remains obsessively ordered.",
      "One corner tells another story: furniture is smashed, a shelf torn down, crockery broken across the floor.",
      "A kitchen chair lies on its side among the wreckage.",
      "The wrecked corner reads like a violent struggle.",
      "A mirror in the corridor is shattered.",
      "Nothing has been ransacked.",
      "Nothing has been stolen.",
      "There is no sign of forced entry.",
      "There is no weapon.",
      "Through the kitchen doorway, Janina Gajda lies on the floor, on her back, half-turned.",
    ],
  });
  composure = 2;

  // Edek flees to the UPA bunker once Janina is dead.
  onFire: Tick = (w) => {
    w.glupek.inBunker = true;
  };

  resolve: Tick = todoEffect(
    "ks. Władysław Pająk finds the body after mass on Day 4. | Helena Rzepka can control the scene before the committee arrives. | Evidence may be disturbed before the committee arrives.",
  );

  kitchenEntered = false;
  // ks. Pająk has gone to fetch Zbigniew Gajda.
  priestLeft = false;
  atticKeyFound = false;
  atticOpen = false;

  // TODO: mechanic "The priest" not modelled yet (see prose/events/ciotka-found-dead.md):
  // no counted clock before Zbigniew returns and closes the attic (The Family Takes the House).

  // ------------------------------------------------------------ actions

  readonly allActions = {
    enterTheKitchen: action({
      label: "Enter the kitchen",
      cost: [{ composure: 1 }],
      narrative: new Narrative({
        narration: [
          "The players step into the kitchen. Janina Gajda lies dead on the floor. Only now can they get close enough to examine the body and the table.",
          "Her eyes are open.",
          "A fresh, dark bruise rings one of her wrists. Apart from the bruise, there is no wound and no blood.",
          "Her hands are at her sides. A fallen rosary is near one half-curled hand.",
          "A glass with a finger of water sits on the table.",
          "Two used coffee cups sit on the table.",
          "A small brown pill bottle lies on its side on the table with the cap off.",
        ],
        gives: {
          effects: (w) => {
            w.ciotkaFoundDead.kitchenEntered = true;
          },
        },
      }),
    }),
    examineTheBody: action({
      label: "Examine the body",
      requires: [
        new Requirement("You haven't gone into the kitchen.", { when: (w) => w.ciotkaFoundDead.kitchenEntered }),
        new SkillRequirement(Medicine),
      ],
      promptedBy: [clues.CiotkaIsDead],
      cost: [{ composure: 1 }],
      narrative: new Narrative({
        narration: [
          "Undressing her draws a flinch from ks. Władysław Pająk, he is praying over her, but he is no fool. Told a proper examination is how they find who laid hands on her, he understands and turns away to let a Medicine player read her. Her throat is unmarked, no strangulation; nowhere on her body are there defensive wounds. But a fresh bruise rings her wrist, a large hand closed hard while she still lived. It did not kill her, and it did not come from a fall. What did kill her reads in her colour and her slack, stopped breath: a heavy barbiturate dose, and the open Luminal bottle on the table is her own.",
        ],
        gives: { clues: [clues.CiotkaHurtBeforeDeath, clues.CiotkaOverdosed] },
      }),
    }),
    // TODO: split out of "Examine the body": "If they strip her crudely, brushing
    // past his objection without a word: committee-disturbed-the-dead." Made a
    // separate player choice. Counts toward the priest's Grudge (GM marks it).
    examineTheBodyCrudely: action({
      label: "Examine the body, brushing past the priest",
      requires: [
        new Requirement("You haven't gone into the kitchen.", { when: (w) => w.ciotkaFoundDead.kitchenEntered }),
        new SkillRequirement(Medicine),
        new Requirement("The priest isn't here to object.", { when: (w) => !w.ciotkaFoundDead.priestLeft }),
      ],
      promptedBy: [clues.CiotkaIsDead],
      cost: [{ composure: 1 }],
      narrative: new Narrative({
        narration: [
        ],
        gives: {
          clues: [clues.CiotkaHurtBeforeDeath, clues.CiotkaOverdosed, clues.CommitteeDisturbedTheDead],
        },
      }),
    }),
    // Was an ungated opportunity (only "entering the house").
    theWreckedCorner: action({
      label: "The wrecked corner",
      promptedBy: [clues.CiotkaIsDead],
      cost: [],
      narrative: new Narrative({
        narration: [
          "`(requires: entering the house)` — One corner of the obsessively ordered house is smashed: toppled furniture, a torn-down shelf, crockery across the floor, a shattered mirror in the corridor. It reads like a violent struggle.",
        ],
        gives: { clues: [clues.CiotkaHouseWrecked] },
      }),
    }),
    searchTheHouse: action({
      label: "Search the house",
      promptedBy: [clues.CiotkaIsDead],
      cost: [{ time: 1 }],
      // "Scene Unlock: Ciotka's house actions remain available in the context of the death."
      narrative: new Narrative({
        narration: [
          "With Janina dead, the house is theirs to go through. The backyard, icons, and Edek Barnaś's room remain as described in Ciotka's house; the shut attic can now be opened without her in the way.",
          "Edek Barnaś's room is empty. His mattress is cold.",
        ],
        gives: { aware: [CiotkasHouse] },
      }),
    }),
    thePriestLeavesThemTheKey: action({
      label: "The priest leaves them the key",
      requires: [
        new Requirement("The priest has already gone.", { when: (w) => !w.ciotkaFoundDead.priestLeft }),
      ],
      promptedBy: [clues.CiotkaIsDead],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "ks. Władysław Pająk has been in no hurry to leave, praying over her, looking in on the house. Only once the committee's own attention turns to the locked hatch does he speak to it, and even then only to the point: he mentions, the way a man passes on a practical thing about a dead neighbour's house, where Janina kept the key, under a loose floorboard beneath her bed. He does not raise the attic himself, and if they never look to it he never mentions the key at all. He does not say what the attic holds or why he is telling them; nothing in it could be quoted back to him. Over the money he does not keep quite so clean a face, he knows what else is under that board, and he holds their eyes a moment longer than he needs to, the way a man does when he is hoping for something he will not ask for. He says it is not a priest's place to go through her things, that is for them and for the family, and that he must walk down and tell her brother Zbigniew, the sołtys. It is a fair way, and the man is as likely to be out at the fields as at home, so he may be a while. He pauses at the door a breath longer than he needs to. Then he blesses her body and leaves them alone in the house. They lift the board. The iron key is there, and beside it a small roll of banknotes, a frugal woman's savings put by over years.",
        ],
        gives: {
          // TODO: the attic key is not an item file; modelled as atticKeyFound.
          // The priest leaving to fetch Zbigniew leads to The Family Takes the House (not unlocked here).
          effects: (w) => {
            w.ciotkaFoundDead.atticKeyFound = true;
            w.ciotkaFoundDead.priestLeft = true;
          },
        },
      }),
    }),
    theMoneyUnderTheBoard: action({
      label: "The money under the board",
      requires: [
        new Requirement("You haven't lifted the floorboard.", {
          when: (w): boolean => w.ciotkaFoundDead.allActions.thePriestLeavesThemTheKey.done,
        }),
      ],
      promptedBy: [clues.CiotkaIsDead],
      cost: [],
      narrative: new Narrative({
        narration: [
          "No one is watching. The priest is gone, Janina is dead, and nobody living knows the roll is there. The committee can pocket it clean: no one to catch them, no one to tell, no grudge and no reckoning anyone will bring. It is not much, the honest savings of a frugal woman, and that is the point. What the priest left behind was a hope, that they would leave it where it lay, or put it to some good. Taking it for themselves carries almost no earthly cost. The weight is theirs alone.",
        ],
        gives: { effects: todoEffect("Item / Evidence: a small roll of banknotes, if they take it.") },
      }),
    }),
    openTheAtticWithTheKey: action({
      label: "Open the attic with the key",
      requires: [new Requirement("You don't have the attic key.", { when: (w) => w.ciotkaFoundDead.atticKeyFound })],
      promptedBy: [clues.CiotkaIsDead],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The key turns and the hatch lifts quietly. It is the one part of the house Janina guarded.",
        ],
        gives: {
          effects: (w) => {
            w.ciotkaFoundDead.atticOpen = true;
          },
        },
      }),
    }),
    forceTheAttic: action({
      label: "Force the attic",
      requires: [new SkillRequirement(Handiwork, Violence, Physique)],
      promptedBy: [clues.CiotkaIsDead],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The players break the locked hatch open. It is loud, splintered wood and a scene the neighbours can hear.",
        ],
        gives: {
          effects: (w) => {
            w.ciotkaFoundDead.atticOpen = true;
          },
        },
      }),
    }),
    searchThePileOfRubbish: action({
      label: "Search the pile of rubbish",
      requires: [new Requirement("The attic is shut.", { when: (w) => w.ciotkaFoundDead.atticOpen })],
      promptedBy: [clues.CiotkaIsDead],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "A box in the rubbish is marked \"EDEK\" and reads at a glance like the boy's things. It is not: the belongings are a grown man's, wrong size and wrong age for Edek Barnaś. Edward Barnaś went by Edek too. The box is thick with dust and has sat untouched for years. Among the belongings is an old iron front-door key.",
        ],
        gives: { items: [EdekBox] },
      }),
    }),
    openTheWardrobe: action({
      label: "Open the wardrobe",
      requires: [new Requirement("The attic is shut.", { when: (w) => w.ciotkaFoundDead.atticOpen })],
      promptedBy: [clues.CiotkaIsDead],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Inside the big wardrobe, a blue dress, folded and kept.",
        ],
        gives: { items: [GirlsDress] },
      }),
    }),
    examineTheChildsRattle: action({
      label: "Examine the child's rattle",
      requires: [new Requirement("The attic is shut.", { when: (w) => w.ciotkaFoundDead.atticOpen })],
      promptedBy: [clues.CiotkaIsDead],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "A small child's rattle, kept with the rest. A baby lived in this house once.",
        ],
        gives: { clues: [clues.ChildsRattleInCiotkasHouse] },
      }),
    }),
    takeDownTheBell: action({
      label: "Take down the bell",
      requires: [new Requirement("The attic is shut.", { when: (w) => w.ciotkaFoundDead.atticOpen })],
      promptedBy: [clues.CiotkaIsDead],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "A small brass Greek Catholic liturgical bell with Cyrillic lettering sits high up, out of place in a Roman Catholic home. Reaching it knocks it loose and it falls, ringing and clattering.",
        ],
        gives: { items: [LemkoBell], clues: [clues.LemkoBellInCiotkasHouse] },
      }),
    }),
    // "Requires: Go outside and search the mud." is the action itself: no gate.
    searchOutsideTheHouse: action({
      label: "Search outside the house",
      promptedBy: [clues.CiotkaIsDead],
      cost: [{ time: 1 }],
      // The trail into the forest is the Edek route to the bunker.
      narrative: new Narrative({
        narration: [
          "Cigarette butts lie scattered by the door. Large bare footprints run from the house toward the tree line and fade where the canopy starts.",
        ],
        gives: { items: [CigaretteButtsFromCiotkas], clues: [clues.GlupekFledIntoForest], aware: [EdekInTheBunker] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  // "The cigarette butts" was an ungated opportunity with no gives: prose only.
  readonly allOpportunities = {
    sheIsDead: opportunity({
      label: "She is dead",
      trigger: (w) => w.ciotkaFoundDead.kitchenEntered,
      target: anyone,
      narrative: new Narrative({
        narration: [
          "`(requires: Enter the kitchen)` — Janina Gajda lies on the floor, eyes open, candles long out. She is dead.",
        ],
        gives: { clues: [clues.CiotkaIsDead] },
      }),
    }),
    theTwoCups: opportunity({
      label: "The two cups",
      trigger: (w) => w.ciotkaFoundDead.kitchenEntered,
      target: anyone,
      promptedBy: [clues.CiotkaIsDead],
      narrative: new Narrative({
        narration: [
          "`(requires: Enter the kitchen)` — Two used coffee cups sit on the table. She was not alone the day before; someone sat and drank with her.",
        ],
        gives: { clues: [clues.TwoCoffeeCups] },
      }),
    }),
    examineHerProperly: opportunity({
      label: "Examine her properly",
      target: { skills: [Medicine] },
      promptedBy: [CiotkaFoundDead],
      narrative: new Narrative({
        narration: [
          "The bruise on her wrist begs a closer look, but a real reading of how she died means undressing her, and ks. Władysław Pająk is praying over her body.",
        ],
      }),
    }),
    // Gated on the priest still being in the house.
    thePriestsEyes: opportunity({
      label: "The priest's eyes",
      trigger: (w) => !w.ciotkaFoundDead.priestLeft,
      target: anyone,
      promptedBy: [clues.CiotkaIsDead],
      narrative: new Narrative({
        narration: [
          "More than once ks. Władysław Pająk glances at the attic hatch and looks away. Asked, he says only that it was the one part of the house Janina kept locked, not even to him, and lets it go. Nothing in it reads as more than a priest uneasy in a dead parishioner's house.",
        ],
      }),
    }),
    thePriestSpeaksForTheBoy: opportunity({
      label: "The priest speaks for the boy",
      trigger: (w) => !w.ciotkaFoundDead.priestLeft,
      target: anyone,
      promptedBy: [clues.CiotkaIsDead],
      narrative: new Narrative({
        narration: [
          "Unprompted, ks. Władysław Pająk says he is certain Edek Barnaś did not do this. The boy helps around his church; he knows him, and the Edek he knows could never.",
        ],
        gives: { clues: [clues.PriestSureEdekInnocent] },
      }),
    }),
    theRoofIsWrong: opportunity({
      label: "The roof is wrong",
      trigger: (w) => w.ciotkaFoundDead.atticOpen,
      target: { skills: [Handiwork] },
      promptedBy: [clues.CiotkaIsDead],
      narrative: new Narrative({
        narration: [
          "`(requires: Handiwork, and the attic open)` — Up under the rafters the shingles and boards don't match the roof: pieces cut and curved to skin a dome, reused flat. A builder sees it at once, this timber was made for something round, not this house.",
        ],
        gives: { clues: [clues.RoofBuiltForADome] },
      }),
    }),
    theWrongIcons: opportunity({
      label: "The wrong icons",
      trigger: (w) => w.ciotkaFoundDead.atticOpen,
      target: { skills: [Devotion] },
      narrative: new Narrative({
        narration: [
          "`(requires: Devotion, and the attic open)` — Icons are stacked up in the attic, out of sight of the rooms below. A believer sees it at once: these are Eastern-rite, not the Roman Catholic images hung downstairs. They do not belong in this house.",
        ],
        gives: { clues: [clues.IconsInAtticNotCatholic] },
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
