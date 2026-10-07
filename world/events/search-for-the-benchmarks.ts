import { Event, Narrative, action, opportunity } from "../schema.ts";
import type { CharacterRef, EventHook, LocationRef, WorldCond } from "../schema.ts";
import { Physique, Survival } from "../skills.ts";
import * as clues from "../clues.ts";
import FarRidgeStreambed from "../locations/far-ridge-streambed.ts";

export default class SearchForTheBenchmarks extends Event {
  readonly id = "search-for-the-benchmarks";
  readonly name = "Search for the Benchmarks";
  readonly hook = "Choosing to comb the overgrown streambed and village edge for old survey markers.";
  override at(): LocationRef {
    return FarRidgeStreambed;
  }

  // Present: the survey party (players). A cooperative Michał Pytlak may come along (see prose).
  override present(): CharacterRef[] {
    return [];
  }
  override readonly hooks: EventHook[] = [
    { text: "Choosing to comb the overgrown streambed and village edge for old survey markers.", heardAt: "anywhere" },
  ];
  // TODO: condition should check if player knows DamBuildersSurveyedStreambed; gated in actions for now
  readonly setup = new Narrative({
    narration: [
      "The Solina dam crews set stamped geodetic benchmarks (repery) at the streambed col and beside %NEW_VILLAGE% years ago.",
      "The markers are old, weathered, and half-buried in undergrowth and slid earth; there is no map to their exact spots.",
      "There are two to find: one at the streambed col, one at the village edge. Both elevations are needed, so both markers must be turned up.",
      "Quartering the whole slope for markers means crossing ground nobody has walked in years; there is more than benchmarks half-swallowed in the gorse up here.",
      "The hunt is the gamble against surveying the col: no geologist and no kit, but the combing eats more cards than a clean survey unless the party can read the ground.",
      "A cooperative Michał Pytlak will come up and search a site (see Bring him to the streambed), clearing that marker for 2 cards from memory of the dam crews, but only if the party brings him here rather than to the survey.",
      "Once found, anyone can copy the two stamped elevations off them, no skill needed.",
    ],
  });

  // Mechanic (see prose): each of the two marker sites costs 4 cards; a Survival read or a
  // Physique dig cuts one site to 2 (no stacking on one site). Counted here, 0..2.
  sitesEased = 0;

  // ------------------------------------------------------------ actions

  readonly allActions = {
    combTheGroundForTheMarkers: action({
      label: "Comb the ground for the markers",
      promptedBy: [clues.DamBuildersSurveyedStreambed],
      // TODO: cost is 8 cards, minus 2 per eased site (sitesEased), splittable across PCs;
      // a fixed cost can't follow the state, so the full 8 is listed.
      cost: [{ time: 4 }, { time: 4 }],
      narrative: new Narrative({
        narration: [
          "You turn up the two stamped benchmarks, at the col and by the village, and copy the elevations off them. Quartering the slope, you also stumble on an abandoned shepherd's koliba hidden in the gorse higher up, easy to miss and long empty. It can be revisited and entered any time from the Far-Ridge Streambed.",
        ],
        gives: {
          clues: [clues.StreambedParameters, clues.AbandonedHouseByStreambed],
          effects: (w) => { w.searchForTheBenchmarks.end(w); },
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    readTheGroundForLikelySpots: opportunity({
      label: "Read the ground for likely spots",
      target: { skills: [Survival] },
      promptedBy: [SearchForTheBenchmarks],
      narrative: new Narrative({
        narration: [
          "Survey crews set benchmarks on stable rock at clear sightlines; a woodsman reads a site for where they would have driven the marker, cutting that marker's combing from 4 cards to 2. Read both sites and the whole hunt drops from 8 cards to 4. → No clue; shortens the search.",
        ],
        gives: {
          effects: (w) => {
            w.searchForTheBenchmarks.sitesEased = Math.min(2, w.searchForTheBenchmarks.sitesEased + 1);
          },
        },
      }),
    }),
    // TODO: source says Survival alone can read both sites (8 → 4); as an opportunity it fires
    // once, so one Survival player eases only one site here.
    digOutTheBuriedMarker: opportunity({
      label: "Dig out the buried marker",
      target: { skills: [Physique] },
      promptedBy: [SearchForTheBenchmarks],
      narrative: new Narrative({
        narration: [
          "Once a marker's rough spot is known, most of the work is heaving aside slid earth and undergrowth to uncover the stamped face; a strong back clears a site fast, cutting that marker from 4 cards to 2. → No clue; shortens the search (alternative to the Survival read; they do not stack on the same site).",
        ],
        gives: {
          effects: (w) => {
            w.searchForTheBenchmarks.sitesEased = Math.min(2, w.searchForTheBenchmarks.sitesEased + 1);
          },
        },
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
