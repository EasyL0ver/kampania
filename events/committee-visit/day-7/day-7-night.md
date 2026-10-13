# Day 7 — Night

**Part of:** [@name](day-7.md)
**Location:** [@name](../../../locations/new-village/new-village.md)

## Hook

- TBD

## Setup

The night of [@name](day-7.md) begins.[](#hags-prayer-begins)

## Opportunities

### Hags prayer begins
- **When:** setup:events/committee-visit/day-7/day-7-night.md
- **Outcome:** [@name](../../hags-prayer.md) begins.
- **Changes:** [@name](../../hags-prayer.md) — starts

### The game ends
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0
- **Outcome:** The seventh night is spent. The committee's time in the valley is over.
- **Changes:** [@name](day-7-night.md) — ends; [@name](day-7.md) — ends; [@name](../committee-visit.md) — ends; [@name](../../the-report.md) — starts; [@name](../../hags-prayer.md) — ends

### The village drowns
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0 and [Evacuate](../../../characters/jagna.md#evacuate) is false and [Fight](../../../characters/foreman.md#fight) is false
- **Outcome:** Nobody got the village out and nobody opened the gap.
- **Changes:** [@name](../../the-village-drowns.md) — starts

### The village forgets
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0 and [Rest](../../../characters/hag.md#rest) is false and [Grace](../../../characters/priest.md#grace) is false
- **Outcome:** The dead were never rested and nobody was forgiven.
- **Changes:** [@name](../../the-village-forgets.md) — starts
