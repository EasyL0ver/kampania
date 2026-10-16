# Wujas Digs Up the Cache

**Location:** [@name](../locations/new-village/ciotkas-house/ciotkas-house.md)
**Present:** [@name](../characters/wujas.md)

## Hook

- A spade working in the dark behind [@name](../locations/new-village/ciotkas-house/ciotkas-house.md), heard from the house and its yard.

## Setup

A dark figure is digging in the badly grown patch near the fence behind the house.[](#somebody-digging-for-the-cache)

## Opportunities

### Somebody digging for the cache
- **When:** setup:events/wujas-digs-up-the-cache.md
- **Outcome:** Someone is digging exactly where the telegram said the bundle was buried.
- **Gives:** [`somebody-dug-for-cache`](../clues/clues.md#somebody-dug-for-cache)

## Actions

### Go after him
- **Outcome:** The figure hears them coming, drops the shovel and runs off into the dark. The oilcloth lies half out of the ground.
- **Gives:** [@name](../items/buried-oilcloth-bundle.md)
- **Changes:** [Caught](#caught) — true; [Cache](../locations/new-village/ciotkas-house/ciotkas-house.md#cache) — found; [@name](wujas-digs-up-the-cache.md) — ends

### Creep closer
- **Requires:** [Finesse](../cards/finesse.md) OR [Survival](../cards/survival.md)
- **Outcome:** Close enough to make out the face: [@nickname](../characters/wujas.md). He hears them, drops the shovel and runs off into the dark. The oilcloth lies half out of the ground.
- **Gives:** [`wujas-dug-for-the-cache`](../clues/clues.md#wujas-dug-for-the-cache), [@name](../items/buried-oilcloth-bundle.md)
- **Changes:** [Caught](#caught) — true; [Cache](../locations/new-village/ciotkas-house/ciotkas-house.md#cache) — found; [@name](wujas-digs-up-the-cache.md) — ends

## Mechanics

### Caught

- **Type:** bool
- **Per:** world
- **Start:** false
- True once the committee disturbs the digger and he runs.

## Resolve

- [Caught](#caught) is false AND [Cache](../locations/new-village/ciotkas-house/ciotkas-house.md#cache) is buried → [Cache](../locations/new-village/ciotkas-house/ciotkas-house.md#cache) = taken
