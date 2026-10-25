# Cows

## Hook

- The PGR farm's dairy herd.

## Vital Statistics

- **Status:** Animal
- **Morning:** [@name](../../locations/new-village/pgr-farm/cow-meadow.md)
- **Afternoon:** [@name](../../locations/new-village/pgr-farm/cow-meadow.md)
- **Evening:** [@name](../../locations/new-village/pgr-farm/cow-barn.md)
- **Night:** [@name](../../locations/new-village/pgr-farm/cow-barn.md)
- **Lives in:** [@name](../../locations/new-village/pgr-farm/cow-barn.md)

## Character

A hundred and forty dairy cows, the farm's real business. They graze the meadow by day and come into the barn to be milked and to spend the night.

## Setup

- **Clothes:** Black-and-white and red hides, mud to the knees.
- **Hair & face:** Wet noses, slow eyes, flies.
- **Carriage:** Heavy, unhurried, always chewing.

## Actions

### Count the cows in the meadow
- **When:** [@name](../../locations/new-village/pgr-farm/cow-meadow.md)
<!-- Prompted by: [committee-should-inventory-livestock](../../clues/clues.md#committee-should-inventory-livestock) -->
- **Cost:** 4 time
- **Outcome:** They drift behind one another all over the meadow; you walk the fence line twice to get it: a hundred and forty. From the far end you see a concrete channel start off the fields and run toward the low ground.
- **Gives:** [`pgr-specializes-in-cows`](../../clues/clues.md#pgr-specializes-in-cows), [`pgr-has-140-cows`](../../clues/clues.md#pgr-has-140-cows), hook:locations/the-irrigation-ditch.md, located:locations/the-irrigation-ditch.md
- **Changes:** [Inventory](../../items/pgr-inventory.md#inventory) — cows: a hundred and forty

### Count the cows in the barn
- **When:** [@name](../../locations/new-village/pgr-farm/cow-barn.md)
<!-- Prompted by: [committee-should-inventory-livestock](../../clues/clues.md#committee-should-inventory-livestock) -->
- **Cost:** 2 time
- **Outcome:** Each one stands in her own stall under a board with her name on it. You walk the passage from end to end, board by board: a hundred and forty.
- **Gives:** [`pgr-specializes-in-cows`](../../clues/clues.md#pgr-specializes-in-cows), [`pgr-has-140-cows`](../../clues/clues.md#pgr-has-140-cows)
- **Changes:** [Inventory](../../items/pgr-inventory.md#inventory) — cows: a hundred and forty
