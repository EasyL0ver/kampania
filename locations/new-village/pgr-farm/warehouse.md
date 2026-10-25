# The Warehouse

**Tags:** [@name](../../../tags/pgr-location.md)

## Hook

- The PGR farm's warehouse.

## Setup

A low timber storehouse with a wide double door. Inside, on the earth floor: stacked timber, kegs of nails, one small, low stack of leftover red bricks in a corner, barely enough to patch a wall, and a stack of linen fertilizer sacks, some of them split, the bottom of the stack dark with damp.[](#a-hen-about)

## Opportunities

### A hen about
- **When:** setup:locations/new-village/pgr-farm/warehouse.md AND [@present](../../../characters/secondary/chickens.md)
- **Outcome:** Something shifts among the fertilizer sacks: a hen.

### Fertilizer left in the open
- **Noticed by:** [Medicine](../../../cards/medicine.md)
- **When:** [Count the materials](#count-the-materials)
- **Outcome:** The fertilizer is calcium cyanamide, poison to anyone who swallows it, and it sits in split sacks on an open floor. It ought to be locked away.
- **Gives:** [`pgr-has-poisonous-fertilizer`](../../../clues/clues.md#pgr-has-poisonous-fertilizer)

### Four older sacks
- **When:** [Count the materials](#count-the-materials)
- **Outcome:** Four sacks at the bottom are older than the rest: the linen is rotten and what is inside has set hard as stone.
- **Gives:** [`four-fertilizer-sacks-are-older`](../../../clues/clues.md#four-fertilizer-sacks-are-older)

## Actions

### Count the materials
<!-- Prompted by: [committee-should-inventory-materials](../../../clues/clues.md#committee-should-inventory-materials) -->
- **Cost:** 2 time
- **Outcome:** Timber by the cubic metre, nails by the keg, bricks by the row, fertilizer by the sack.[](#fertilizer-left-in-the-open)[](#four-older-sacks) The bricks are red.
- **Gives:** [`pgr-has-red-bricks`](../../../clues/clues.md#pgr-has-red-bricks), [`pgr-has-14-m3-timber`](../../../clues/clues.md#pgr-has-14-m3-timber), [`pgr-has-6-kegs-of-nails`](../../../clues/clues.md#pgr-has-6-kegs-of-nails), [`pgr-has-380-bricks`](../../../clues/clues.md#pgr-has-380-bricks), [`pgr-has-22-sacks-of-fertilizer`](../../../clues/clues.md#pgr-has-22-sacks-of-fertilizer)
- **Changes:** [Inventory](../../../items/pgr-inventory.md#inventory) — timber 14 m³, nails 6 kegs, red brick 380, fertilizer 22 sacks

### Empty the fertilizer sacks
<!-- Prompted by: [pgr-has-22-sacks-of-fertilizer](../../../clues/clues.md#pgr-has-22-sacks-of-fertilizer) -->
- **Cost:** 1 time
- **Outcome:** You untie the sacks and tip the grey powder out across the floor, then shake them out and stack them: a pile of empty linen bags.
- **Gives:** [@name](../../../items/linen-bags.md)

### Look into the older sacks
- **Requires:** [Handiwork](../../../cards/handiwork.md) OR [Medicine](../../../cards/medicine.md)
<!-- Prompted by: [four-fertilizer-sacks-are-older](../../../clues/clues.md#four-fertilizer-sacks-are-older) -->
- **Cost:** 1 time
- **Outcome:** You break into one of the rotten sacks. It is not cyanamide at all but old lime, drawn damp over the years and set solid.
- **Gives:** [`four-sacks-are-old-lime`](../../../clues/clues.md#four-sacks-are-old-lime)
