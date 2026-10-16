# Day 4 — Night

**Part of:** [@name](day-4.md)
**Location:** [@name](../../../locations/new-village/new-village.md)
**Tags:** [@name](../../../tags/time-night.md)

## Hook

- TBD

## Setup

The night of [@name](day-4.md) begins.[](#well-confrontation-begins)[](#wujas-digs-up-the-cache-begins)

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

### Morning comes
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0
- **Outcome:** The night is spent.
- **Changes:** [@name](day-4-night.md) — ends; [@name](day-4.md) — ends; [@name](../day-5/day-5.md) — starts; [@name](../day-5/day-5-morning.md) — starts; [@name](../../hags-prayer.md) — ends; [@name](../../wujas-digs-up-the-cache.md) — ends; [Phase cards](../committee-visit.md#phase-cards) — 12
