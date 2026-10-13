# Search for the Benchmarks

**Location:** [@name](../locations/far-ridge-streambed.md)

## Hook

Choosing to comb the overgrown streambed and village edge for old survey markers.

## Setup

- The Solina dam crews set stamped geodetic benchmarks (repery) at the streambed col and beside [@name](../locations/new-village/new-village.md) years ago.
- The markers are old, weathered, and half-buried in undergrowth and slid earth; there is no map to their exact spots.
- There are two to find: one at the streambed col, one at the village edge. Both elevations are needed, so both markers must be turned up.
- Quartering the whole slope for markers means crossing ground nobody has walked in years; there is more than benchmarks half-swallowed in the gorse up here.
- The hunt is the gamble against [@name](surveying-the-streambed.md): no geologist and no kit, but the combing eats more cards than a clean survey unless the party can read the ground.
- Once found, anyone can copy the two stamped elevations off them, no skill needed.

## Actions

### Read the ground for likely spots
- **Requires:** [Survival](../cards/survival.md)
- **When:** that site's marker is not yet found
<!-- Prompted by: [dam-builders-surveyed-streambed](../clues/clues.md#dam-builders-surveyed-streambed) -->
- **Outcome:** Survey crews set benchmarks on stable rock at clear sightlines; you read the site for where they would have driven the marker.
- **Changes:** [Hidden count at the col](#hidden-count-at-the-col) — +2 if read here; [Hidden count at the village edge](#hidden-count-at-the-village-edge) — +2 if read here

### Dig out the buried marker
- **Requires:** [Physique](../cards/physique.md)
- **When:** that site's marker is not yet found
<!-- Prompted by: [dam-builders-surveyed-streambed](../clues/clues.md#dam-builders-surveyed-streambed) -->
- **Outcome:** Most of the work is heaving aside slid earth and undergrowth to uncover the stamped face; a strong back clears a site fast.
- **Changes:** [Hidden count at the col](#hidden-count-at-the-col) — dug here, marker turns up at 2; [Hidden count at the village edge](#hidden-count-at-the-village-edge) — dug here, marker turns up at 2

### Search the col for its marker
- **When:** the col marker is not yet found
<!-- Prompted by: [dam-builders-surveyed-streambed](../clues/clues.md#dam-builders-surveyed-streambed) -->
- **Cost:** 1 time
- **Outcome:** You quarter the ground around the col. Until the hidden count is reached: weathered rock, slid earth, nothing stamped. On the search that reaches it, the stamped benchmark turns up under the gorse, and higher up you stumble on an abandoned shepherd's koliba, easy to miss and long empty. It can be revisited and entered any time from the [@name](../locations/far-ridge-streambed.md).
- **Gives:** [abandoned-house-by-streambed](../clues/clues.md#abandoned-house-by-streambed)
- **Changes:** [Hidden count at the col](#hidden-count-at-the-col) — +1

### Search the village edge for its marker
- **When:** the village-edge marker is not yet found
<!-- Prompted by: [dam-builders-surveyed-streambed](../clues/clues.md#dam-builders-surveyed-streambed) -->
- **Cost:** 1 time
- **Outcome:** You comb the ground at the edge of [@name](../locations/new-village/new-village.md). Until the hidden count is reached: fence posts, field stones, nothing stamped. On the search that reaches it, the stamped benchmark turns up half-buried by a field wall.
- **Changes:** [Hidden count at the village edge](#hidden-count-at-the-village-edge) — +1

### Copy the elevations
- **When:** both markers found
- **Outcome:** You copy the two stamped elevations off the benchmarks, the col and the village.
- **Gives:** [@name](../items/streambed-parameters.md)

## Mechanics

### Hidden count at the col

- **Type:** int
- **Per:** world
- **Start:** 0
- Points toward turning up the col's marker; see [The search](#the-search).

### Hidden count at the village edge

- **Type:** int
- **Per:** world
- **Start:** 0
- Points toward turning up the village edge's marker; see [The search](#the-search).

### The search

- **Type:** rule
- **The search is a gamble, not a fixed price.** Each search costs 1 time and the players never learn how many it takes. The GM answers "nothing yet" until the site's hidden count is reached.
- **Hidden count:** each site's marker turns up at **4 points**. Each search adds 1 point; a Survival read of the site adds 2. A Physique dig on that site drops it to the **2nd** search; it does not stack with the read. [@name](../characters/foreman.md), if he came up ([Bring him to the streambed](../characters/foreman.md#bring-him-to-the-streambed)), remembers one site well enough to drop it to the **2nd** as well.
- **Searches already made count** toward the lower number.
- **Sites are independent.** Two PCs can search one site each in parallel.
- **Against the survey:** with reads the hunt costs 4 time and needs no specialist; without, 8, and the players cannot see that coming. That is the trade for skipping the geologist.
