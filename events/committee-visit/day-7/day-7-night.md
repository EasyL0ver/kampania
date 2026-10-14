# Day 7 — Night

**Part of:** [@name](day-7.md)
**Location:** [@name](../../../locations/new-village/new-village.md)
**Tags:** [@name](../../../tags/time-night.md)

## Hook

- TBD

## Setup

The night of [@name](day-7.md) begins.

## Opportunities

### The game ends
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0
- **Outcome:** [@hook](../../the-report.md)
- **Gives:** *(to: every player)* hook:events/the-report.md
- **Changes:** [@name](day-7-night.md) — ends; [@name](day-7.md) — ends; [@name](../committee-visit.md) — ends; [@name](../../the-report.md) — starts; [@name](../../hags-prayer.md) — ends

### The village drowns
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0 AND [Evacuate](../../../characters/jagna.md#evacuate) is false AND [Fight](../../../characters/foreman.md#fight) is false
- **Outcome:** [@hook](../../the-village-drowns.md)
- **Gives:** *(to: every player)* hook:events/the-village-drowns.md
- **Changes:** [@name](../../the-village-drowns.md) — starts

### The village forgets
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0 AND [Rest](../../../characters/hag.md#rest) is false AND [Grace](../../../characters/priest.md#grace) is false
- **Outcome:** [@hook](../../the-village-forgets.md)
- **Gives:** *(to: every player)* hook:events/the-village-forgets.md
- **Changes:** [@name](../../the-village-forgets.md) — starts
