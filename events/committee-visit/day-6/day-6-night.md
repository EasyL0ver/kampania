# Day 6 — Night

**Part of:** [@name](day-6.md)
**Location:** [@name](../../../locations/new-village/new-village.md)
**Tags:** [@name](../../../tags/time-night.md)

## Hook

- TBD

## Setup

The night of [@name](day-6.md) begins.[](#punishment-lynch-begins)

## Opportunities

### Punishment lynch begins
- **When:** setup:events/committee-visit/day-6/day-6-night.md
- **Outcome:** [@name](../../punishment-lynch.md) begins.
- **Changes:** [@name](../../punishment-lynch.md) — starts

### Lamps on the road after dark
- **When:** [@name](../../../locations/new-village/new-village.md) AND [@name](../../punishment-lynch.md)
- **Outcome:** [@hook](../../punishment-lynch.md)
- **Gives:** *(to: players at [@name](../../../locations/new-village/new-village.md))* hook:events/punishment-lynch.md

### Morning comes
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0
- **Outcome:** The night is spent.
- **Changes:** [@name](day-6-night.md) — ends; [@name](day-6.md) — ends; [@name](../day-7/day-7.md) — starts; [@name](../day-7/day-7-morning.md) — starts; [@name](../../hags-prayer.md) — ends; [Phase cards](../committee-visit.md#phase-cards) — 12
