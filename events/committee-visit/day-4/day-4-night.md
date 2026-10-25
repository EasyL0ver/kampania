# Day 4 — Night

**Part of:** [@name](day-4.md)
**Location:** [@name](../../../locations/new-village/new-village.md)
**Tags:** [@name](../../../tags/time-night.md)

## Hook

- TBD

## Setup

The night of [@name](day-4.md) begins.[](#well-confrontation-begins)[](#wujas-digs-up-the-cache-begins)[](#the-crew-moves-to-the-still)

## Opportunities

### Well confrontation begins
- **When:** setup:events/committee-visit/day-4/day-4-night.md AND [Village Hostility](../../../characters/hag.md#village-hostility) is false AND [Restrained](../../../characters/hag.md#restrained) is false
- **Outcome:** [@name](../../well-confrontation/well-confrontation.md) begins.
- **Changes:** [@name](../../well-confrontation/well-confrontation.md) — starts

### Wujas digs up the cache begins
- **When:** setup:events/committee-visit/day-4/day-4-night.md AND [Aware of cache](../../../characters/wojewoda.md#aware-of-cache) is true
- **Outcome:** [@name](../../wujas-digs-up-the-cache.md) begins.
- **Changes:** [@name](../../wujas-digs-up-the-cache.md) — starts

### Digging behind Ciotka's house
- **When:** [@name](../../../locations/new-village/ciotkas-house/ciotkas-house.md) AND [@name](../../../events/wujas-digs-up-the-cache.md)
- **Outcome:** [@hook](../../wujas-digs-up-the-cache.md)
- **Gives:** *(to: players at [@name](../../../locations/new-village/ciotkas-house/ciotkas-house.md))* hook:events/wujas-digs-up-the-cache.md

### Chanting at the well
- **When:** [@name](../../../locations/old-village-ruins.md) AND [@name](../../well-confrontation/well-confrontation.md)
- **Outcome:** [@hook](../../well-confrontation/well-confrontation.md)
- **Gives:** *(to: players at [@name](../../../locations/old-village-ruins.md))* hook:events/well-confrontation/well-confrontation.md

### The crew moves to the still
- **When:** setup:events/committee-visit/day-4/day-4-night.md
- **Outcome:** [@name](../../the-binge/at-the-still.md) begins.
- **Changes:** [@name](../../the-binge/the-binge.md) — ends; [@name](../../the-binge/at-the-still.md) — starts

### Firelight at the still
- **When:** [@name](../../../locations/bimber-still.md) AND [@name](../../the-binge/at-the-still.md)
- **Outcome:** [@hook](../../the-binge/at-the-still.md)
- **Gives:** *(to: players at [@name](../../../locations/bimber-still.md))* hook:events/the-binge/at-the-still.md

### Morning comes
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0
- **Outcome:** The night is spent.
- **Changes:** [@name](../../the-binge/at-the-still.md) — ends; [@name](day-4-night.md) — ends; [@name](day-4.md) — ends; [@name](../day-5/day-5.md) — starts; [@name](../day-5/day-5-morning.md) — starts; [@name](../../hags-prayer.md) — ends; [@name](../../wujas-digs-up-the-cache.md) — ends; [Phase cards](../committee-visit.md#phase-cards) — 12
