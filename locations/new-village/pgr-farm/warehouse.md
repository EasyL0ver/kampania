# The Warehouse

**Tags:** [@name](../../../tags/pgr-location.md)

## Hook

- The PGR farm's warehouse.

## Setup

A low timber storehouse with a wide double door. Inside, on the earth floor: stacked timber, kegs of nails, a few rows of leftover red bricks, and a stack of paper fertilizer sacks, some of them split.[](#a-hen-about)

## Opportunities

### A hen about
- **When:** setup:locations/new-village/pgr-farm/warehouse.md AND [@present](../../../characters/secondary/chickens.md)
- **Outcome:** Something shifts among the fertilizer sacks: a hen.

### Fertilizer left in the open
- **Noticed by:** [Medicine](../../../cards/medicine.md)
- **When:** [Count the materials](#count-the-materials)
- **Outcome:** The fertilizer is calcium cyanamide, poison to anyone who swallows it, and it sits in split sacks on an open floor. It ought to be locked away.
- **Gives:** [`pgr-has-poisonous-fertilizer`](../../../clues/clues.md#pgr-has-poisonous-fertilizer)

## Actions

### Count the materials
<!-- Prompted by: [committee-should-inventory-materials](../../../clues/clues.md#committee-should-inventory-materials) -->
- **Cost:** 2 time
- **Outcome:** Timber by the cubic metre, nails by the keg, bricks by the row, fertilizer by the sack.[](#fertilizer-left-in-the-open) The bricks are red.
- **Gives:** [`pgr-has-red-bricks`](../../../clues/clues.md#pgr-has-red-bricks)
- **Changes:** [Inventory](../../../items/pgr-inventory.md#inventory) — timber 14 m³, nails 6 kegs, red brick 380, fertilizer 22 sacks
