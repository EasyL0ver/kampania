# The Hunt with Butcher

**Location:** [@name](../locations/new-village/pgr-farm/pgr-farm.md)
**Present:** [@name](../characters/butcher.md)

## Hook

[@surname](../characters/butcher.md) at the PGR gate with three dogs, starting to track from the mud.

## Setup

- [@surname](../characters/butcher.md) handles the dogs through small hand signals[](#dogs-move-as-extensions-of-butcher) and quiet sounds.
- [@surname](../characters/butcher.md) reads wolf sign before anyone gives him instructions.
- [@surname](../characters/butcher.md) keeps a knife in his hand[](#butcher-is-calm-but-wants-a-blade) and turns it idly.
- [@surname](../characters/butcher.md) is calmer in the forest[](#butcher-relaxes-while-tracking-prey) than in the village.
- [@surname](../characters/butcher.md)'s route drifts toward the deeper forest and the old village.

## Opportunities

### Arriving on the scene
- **When:** [@name](../locations/new-village/pgr-farm/pgr-farm.md)
- **Outcome:** [@hook](hunt-with-rezen.md)
- **Gives:** *(to: players at [@name](../locations/new-village/pgr-farm/pgr-farm.md))* hook:events/hunt-with-rezen.md

### Dogs move as extensions of Butcher
- **Noticed by:** [Survival](../cards/survival.md)
- **When:** setup:events/hunt-with-rezen.md
<!-- Prompted by: [dudka-failed-wolf-hunt](../clues/clues.md#dudka-failed-wolf-hunt) -->
- **Outcome:** the dogs move as an extension of [@surname](../characters/butcher.md)'s body.
- **Gives:** [`rezen-hunts-wolves`](../clues/clues.md#rezen-hunts-wolves)

### Butcher is calm but wants a blade
- **Noticed by:** [Violence](../cards/violence.md)
- **When:** setup:events/hunt-with-rezen.md
- **Outcome:** [@surname](../characters/butcher.md) is not nervous; his hands want something sharp.
- **Gives:** [`butcher-is-dangerous`](../clues/clues.md#butcher-is-dangerous)

### Butcher relaxes while tracking prey
- **Noticed by:** [Empathy](../cards/empathy.md)
- **When:** setup:events/hunt-with-rezen.md
- **Outcome:** [@surname](../characters/butcher.md) is most relaxed while tracking prey in the forest.

## Actions

### Follow him into the forest
<!-- Prompted by: [dudka-failed-wolf-hunt](../clues/clues.md#dudka-failed-wolf-hunt) -->
- **Cost:** 1 time
- **Outcome:** [@surname](../characters/butcher.md) finds scat, scrapes, wool on brush, likely denning ground, and passable routes without hesitation.
- **Gives:** [`rezen-hunts-wolves`](../clues/clues.md#rezen-hunts-wolves)
- **Changes:** [@name](hunters-cross-paths.md) — starts

### Stay with him if he makes a kill
- **When:** Follow [@surname](../characters/butcher.md) to a killed wolf
<!-- Prompted by: [rezen-hunts-wolves](../clues/clues.md#rezen-hunts-wolves) -->
- **Cost:** 1 time
- **Outcome:** [@surname](../characters/butcher.md) carries the carcass deeper toward the [@name](../locations/old-village-ruins.md) and drops it into the well.
- **Gives:** [`butcher-dumps-carcasses-in-well`](../clues/clues.md#butcher-dumps-carcasses-in-well)
