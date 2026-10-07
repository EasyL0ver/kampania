import { Item, Narrative, Requirement, action, opportunity } from "../schema.ts";
import { Violence } from "../skills.ts";
import * as clues from "../clues.ts";

export default class Bayonet extends Item {
  readonly id = "bayonet";
  readonly name = "Bayonet";
  readonly hook = "An old sheathed bayonet, the blade worn and lightly oiled, kept like a treasure.";
  readonly what = "weapon (keepsake, hidden)";
  readonly description = new Narrative({
    narration: [
      "An old military bayonet, the blade kept clean and faintly oiled, the grip worn smooth from handling. It was tucked away among Edek's few things like a prize and kept hidden from Janina. To an untrained eye it is just an old army knife of no particular origin.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    inspectTheBlade: action({
      label: "Inspect the blade",
      requires: [new Requirement("You don't have the bayonet.", { items: [Bayonet] })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "Turned to the light, the flat of the blade shows a small mark scratched in by hand: a trident, three prongs rising from a base.",
        ],
        gives: { clues: [clues.TridentOnTheBayonet] },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    knowThePattern: opportunity({
      label: "Know the pattern",
      target: { skills: [Violence] },
      narrative: new Narrative({
        narration: [
          "The fuller, the muzzle ring, the maker's stamp read at a glance: this is a German wartime bayonet, army issue, nothing like the Polish KBW kit his father carried. It is partisan-era war booty, not something out of his father's house.",
        ],
        gives: { clues: [clues.EdeksBayonetIsGerman] },
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
