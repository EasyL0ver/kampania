# Search for the Benchmarks

**Location:** [Far-Ridge Streambed](../locations/far-ridge-streambed.md)
**Present:** Survey party
**Available:** Holding [dam-builders-surveyed-streambed](../clues/clues.md#dam-builders-surveyed-streambed)

## Trigger

- The party goes looking for the dam crews' benchmark markers rather than running a survey of their own.

## Hook

Choosing to comb the overgrown streambed and village edge for old survey markers.

## Setup

- The Solina dam crews set stamped geodetic benchmarks (repery) at the streambed col and beside %NEW_VILLAGE% years ago.
- The markers are old, weathered, and half-buried in undergrowth and slid earth; there is no map to their exact spots.
- There are two to find: one at the streambed col, one at the village edge. Both elevations are needed, so both markers must be turned up.
- Quartering the whole slope for markers means crossing ground nobody has walked in years; there is more than benchmarks half-swallowed in the gorse up here.
- The hunt is the gamble against [surveying the col](surveying-the-streambed.md): no geologist and no kit, but the combing eats more cards than a clean survey unless the party can read the ground.
- A cooperative [Michał Pytlak](../characters/foreman.md) will come up and search a site (see [Bring him to the streambed](../characters/foreman.md#bring-him-to-the-streambed)), clearing that marker for 2 cards from memory of the dam crews, but only if the party brings him here rather than to the survey.
- Once found, anyone can copy the two stamped elevations off them, no skill needed.

## Opportunities

- **Read the ground for likely spots** `(noticed by: [Survival](../cards/survival.md))` — Survey crews set benchmarks on stable rock at clear sightlines; a woodsman reads a site for where they would have driven the marker. → Gives: World State Change: 2 points toward finding that site's marker (see Mechanics).
- **Dig out the buried marker** `(noticed by: [Physique](../cards/physique.md))` — Most of the work is heaving aside slid earth and undergrowth to uncover the stamped face; a strong back clears a site fast. → Gives: World State Change: that site's count drops to 2 (see Mechanics).

## Actions

### Search the col for its marker
- **When:** the col marker is not yet found
- **Prompted by:** [dam-builders-surveyed-streambed](../clues/clues.md#dam-builders-surveyed-streambed)
- **Cost:** 1 time
- **Outcome:** You quarter the ground around the col. Until the hidden count is reached: weathered rock, slid earth, nothing stamped. On the search that reaches it, the stamped benchmark turns up under the gorse, and higher up you stumble on an abandoned shepherd's koliba, easy to miss and long empty. It can be revisited and entered any time from the [Far-Ridge Streambed](../locations/far-ridge-streambed.md).
- **Gives:** World State Change: one search counted at the col; on the count, the col marker is found and [abandoned-house-by-streambed](../clues/clues.md#abandoned-house-by-streambed)

### Search the village edge for its marker
- **When:** the village-edge marker is not yet found
- **Prompted by:** [dam-builders-surveyed-streambed](../clues/clues.md#dam-builders-surveyed-streambed)
- **Cost:** 1 time
- **Outcome:** You comb the ground at the edge of %NEW_VILLAGE%. Until the hidden count is reached: fence posts, field stones, nothing stamped. On the search that reaches it, the stamped benchmark turns up half-buried by a field wall.
- **Gives:** World State Change: one search counted at the village edge; on the count, the village-edge marker is found

### Copy the elevations
- **When:** both markers found
- **Outcome:** You copy the two stamped elevations off the benchmarks, the col and the village.
- **Gives:** Item: [Streambed Parameters](../items/streambed-parameters.md)

## Mechanics

- **The search is a gamble, not a fixed price.** Each search costs 1 time and the players never learn how many it takes. The GM answers "nothing yet" until the site's hidden count is reached.
- **Hidden count:** each site's marker turns up at **4 points**. Each search adds 1 point; a Survival read of the site adds 2. A Physique dig on that site drops it to the **2nd** search; it does not stack with the read. [Michał Pytlak](../characters/foreman.md), if he came up ([Bring him to the streambed](../characters/foreman.md#bring-him-to-the-streambed)), remembers one site well enough to drop it to the **2nd** as well.
- **Searches already made count** toward the lower number.
- **Sites are independent.** Two PCs can search one site each in parallel.
- **Against the survey:** with reads the hunt costs 4 time and needs no specialist; without, 8, and the players cannot see that coming. That is the trade for skipping the geologist.

## Exits

- Holding the [Streambed Parameters](../items/streambed-parameters.md), interpret them into [streambed-dead-ends](../clues/clues.md#streambed-dead-ends): read them as a surveyor with the [kit](../items/geologists-kit.md), phone [prof. Bieńkowski](../characters/professor.md), or show [Michał Pytlak](../characters/foreman.md).
