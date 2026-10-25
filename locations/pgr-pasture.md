# The Pasture

## Hook

- The state farm's pasture on the slopes outside the farm.

## Setup

Open grazing on the slope beyond the farm buildings. Beside the shepherd's hut stands the night fold, a ring of wooden hurdles; several are broken and lashed with wire, and some gaps are wide enough for a dog, tufts of grey wool caught on their splinters.[](#the-fold-will-not-hold) The grass runs up to the forest. Near the trees it is flattened in a dark, wide patch, and something was dragged from it into the undergrowth.[](#wolves-have-been-taking-the-flock) The flock grazes bunched tight in the middle of the pasture, every head turning at once when a bird lifts from the trees.

## Opportunities

### Wolves have been taking the flock
- **When:** setup:locations/pgr-pasture.md
- **Outcome:** The wool on the broken hurdles, the flattened patch and the drag into the trees: wolves have been taking sheep from this pasture.
- **Gives:** [`wolves-attacking-livestock`](../clues/clues.md#wolves-attacking-livestock)

### The fold will not hold
- **Noticed by:** [Handiwork](../cards/handiwork.md)
- **When:** setup:locations/pgr-pasture.md
- **Outcome:** Those hurdles are past mending with wire. Shut the flock in at night and a wolf still gets through.
- **Gives:** [`sheepfold-is-broken`](../clues/clues.md#sheepfold-is-broken)

## Actions

### Count the sheep
<!-- Prompted by: [committee-should-inventory-livestock](../clues/clues.md#committee-should-inventory-livestock) -->
- **Cost:** 2 time
- **Outcome:** The flock is bunched tight and keeps shifting, but they stay in one mass, and walking slowly round it twice you get a firm figure: seventy-one.
- **Gives:** [`pgr-has-71-sheep`](../clues/clues.md#pgr-has-71-sheep)
- **Changes:** [Inventory](../items/pgr-inventory.md#inventory) — sheep: seventy-one
