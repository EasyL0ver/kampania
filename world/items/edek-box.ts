import { Item, Narrative, Requirement, action, opportunity } from "../schema.ts";
import * as clues from "../clues.ts";
import { todo } from "../todo.ts";
import Glupek from "../characters/glupek.ts";
import Soldier from "../characters/soldier.ts";

export default class EdekBox extends Item {
  readonly id = "edek-box";
  readonly name = "The \"EDEK\" Box";
  readonly hook = "A dust-caked wooden box marked \"EDEK\", packed with a grown man's belongings.";
  readonly what = "keepsake (a dead man's belongings)";
  readonly description = new Narrative({
    narration: [
      "A wooden box thick with years of dust, untouched in the attic long before Janina died. On the lid, \"EDEK\" in worn letters. Inside, a grown man's belongings. The name cuts two ways: Edek Barnaś is a boy but built like a man, and Edward Barnaś, the father, went by Edek too. Among the things: an old iron front-door key, a man's shaving kit and hygiene tins, a military medal, a folded state propaganda leaflet showing the white eagle driving a bayonet into a trident over the slogan \"DEATH TO THE BANDITS\", and a photograph of a woman, risqué for the era. The photo cuts both ways — a keepsake of someone's sweetheart, or just adult material a young man might hide away.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    tryTheKeyInTheLock: action({
      label: "Try the key in the lock",
      requires: [
        new Requirement("You don't have the box.", { items: [EdekBox] }),
        // TODO: "a door of Janina's house" could become a location check (CiotkasHouse).
        new Requirement("You need to be at a door of Janina's house.", { when: todo("a door of Janina's house") }),
      ],
      promptedBy: [clues.CiotkaIsDead],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The key will not turn the newer lock. But the old, pitted lock below it — the door's original — takes the key and turns cleanly. It was cut for this house. The box it sat in is thick with undisturbed dust, set aside long before her time.",
        ],
        gives: { clues: [clues.EdekBoxKeyFitsHouse] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    readItAsTheBoys: opportunity({
      label: "Read it as the boy's",
      target: { aware: [Glupek] },
      narrative: new Narrative({
        narration: [
          "His name is on the lid, and the risqué photo is the kind a young man keeps hidden. Read this way, the box is Edek's.",
        ],
        gives: { clues: [clues.BoxBelongsToGlupek] },
      }),
    }),
    readItAsTheSoldiers: opportunity({
      label: "Read it as the soldier's",
      target: { aware: [Soldier], clues: [clues.GlupekForbiddenFromAttic] },
      narrative: new Narrative({
        narration: [
          "Edward Barnaś went by Edek too, and the shaving kit, the war medal, the propaganda leaflet, and the house key are a grown man's, not a boy's. The boy is kept out of this attic, yet his name is on the box — so the EDEK things up here are the other Edek's, the dead soldier's.",
        ],
        gives: { clues: [clues.BoxBelongsToSoldier] },
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
