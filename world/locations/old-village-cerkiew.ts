import { Location, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";
import { Culture, Devotion, Language, Superstitious } from "../skills.ts";
import Hag from "../characters/hag.ts";
import Portrait from "../items/portrait.ts";
import LemkoBell from "../items/lemko-bell.ts";
import * as clues from "../clues.ts";
import { todo, todoEffect } from "../todo.ts";

export default class OldVillageCerkiew extends Location {
  readonly id = "old-village-cerkiew";
  readonly name = "%OLD_VILLAGE% — Cerkiew";
  // TODO: source has no ## Hook; written from the **Location:** header.
  readonly hook = "The hilltop cerkiew standing over the ruins of %OLD_VILLAGE%.";
  readonly position = "hilltop in %OLD_VILLAGE%";
  readonly visitCost = 1;
  // Paraskewia only during night rituals (not modelled).
  override present(): CharacterRef[] {
    return [Hag];
  }

  readonly setup = new Narrative({
    narration: [
      "Structure: Wooden Greek Catholic cerkiew with onion dome and partial stone construction.",
      "Structure: The 1947 fire did not destroy it completely.",
      "Position: The cerkiew dominates the ruins from the hilltop.",
      "State: Roof partially collapsed on the west side.",
      "State: Interior exposed to rain.",
      "State: Wood is rotting.",
      "State: Some faded icons remain on the interior walls.",
      "State: Three-barred crosses mark the altar screen and recur across the surviving icons and carvings.",
      "State: Door hangs loose.",
      "State: Interior is wet from rain and groundwater seepage.",
      "State: Abandoned altar, broken candle stands, and debris remain on the floor.",
      "Hidden bundle: In a dry corner behind the altar screen, out of the rain, a flat cloth-wrapped bundle has been left with care and kept dry, plainly placed there long after the fire.",
      "Ritual traces: Fresh candles appear periodically.",
      "Ritual traces: Candle wax and faint incense smell are present on some nights.",
      "Atmosphere: In the half-light the empty nave feels occupied — footprints in the dust, a draft that stirs the candle flames, the steady sense of being watched.",
      "Missing item: A liturgical bell is absent from where one should be.",
      "Hazard: Some ceiling sections are unstable.",
    ],
    gives: { aware: [OldVillageCerkiew] },
  });

  // TODO: **Available:** "After reaching %OLD_VILLAGE%" not modelled.

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // Was an ungated opportunity. Ungated is Setup, but Setup can't give a clue.
    theThreeBarredCrosses: action({
      label: "The three-barred crosses",
      promptedBy: [OldVillageCerkiew],
      cost: [],
      narrative: new Narrative({
        narration: [
          "The altar screen, icons, and carvings are marked all over with a recurring three-barred cross.",
        ],
        gives: { clues: [clues.ThreeBarredCrossInCerkiew] },
      }),
    }),
    // "Requires: Access to the cerkiew" = being here; omitted on the next three.
    exploreTheInterior: action({
      label: "Explore the interior",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The players document the altar, faded icons, Cyrillic inscriptions, broken candle stands, rain damage, and unstable roof sections.",
        ],
        gives: { clues: [clues.OldVillageWasLemko] },
      }),
    }),
    openTheWrappedBundle: action({
      label: "Open the wrapped bundle",
      promptedBy: [OldVillageCerkiew],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The players lift the cloth-wrapped bundle from its dry corner and open it. Inside is an oil portrait of a young dark-haired woman in a blue dress, painted with a care nothing in the ruins shares. Someone carried it here and kept it dry on purpose.",
        ],
        gives: { items: [Portrait], clues: [clues.PortraitHiddenInCerkiew, clues.PortraitWomanInBlueDress] },
      }),
    }),
    searchForRitualTraces: action({
      label: "Search for ritual traces",
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The players find fresh candles, wax, and faint incense traces left by repeated rites.",
        ],
        gives: { clues: [clues.HagTendsTheWell] },
      }),
    }),
    // TODO: source says the brass bell comes from "Ciotka's attic" search, but the
    // bell (items/lemko-bell) is now found in events/ciotka-found-dead. Gated on holding it.
    compareTheBrassBell: action({
      label: "Compare the brass bell",
      requires: [new Requirement("You don't have the brass bell.", { items: [LemkoBell] })],
      cost: [],
      narrative: new Narrative({
        narration: [
          "The players identify the brass bell from Ciotka's attic as matching the missing cerkiew fitting.",
        ],
        gives: { effects: todoEffect("Item / Evidence: Provenance for the brass bell from Ciotka's attic.") },
      }),
    }),
    // TODO: "Scene Unlock: Direct encounter with Paraskewia at night" has no event file;
    // gives aware of her plus a todoEffect.
    stakeOutAtNight: action({
      label: "Stake out at night",
      requires: [new Requirement("Only at night, and you'd have to wait.", { when: todo("Night and willingness to wait inside or near the cerkiew") })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The players can catch Paraskewia Chyłak performing rites at the cerkiew.",
        ],
        gives: {
          aware: [Hag],
          effects: todoEffect("Scene Unlock: Direct encounter with Paraskewia Chyłak at night."),
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    freshCandlesAndIncense: opportunity({
      label: "Fresh candles and incense",
      target: { skills: [Culture] },
      narrative: new Narrative({
        narration: [
          "Someone still comes here to perform rites.",
        ],
        gives: { clues: [clues.HagTendsTheWell] },
      }),
    }),
    theDeadAreClose: opportunity({
      label: "The dead are close",
      target: { skills: [Superstitious] },
      narrative: new Narrative({
        narration: [
          "The cold, the drifting candle smoke, and the watching quiet press in; a superstitious soul is certain the old villagers never truly left this hill.",
        ],
      }),
    }),
    fadedIcons: opportunity({
      label: "Faded icons",
      target: { when: (_w, me) => me.has(Culture) || me.has(Devotion) || me.has(Language) },
      narrative: new Narrative({
        narration: [
          "The icons and Cyrillic inscriptions identify the cerkiew as Greek Catholic and Lemko.",
        ],
        gives: { clues: [clues.OldVillageWasLemko] },
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
