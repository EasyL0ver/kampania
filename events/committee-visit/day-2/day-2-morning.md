# Day 2 — Morning

**Part of:** [@name](day-2.md)
**Location:** [@name](../../../locations/new-village/new-village.md)
**Tags:** [@name](../../../tags/time-morning.md)

## Hook

- TBD

## Setup

The morning of [@name](day-2.md) begins.[](#store-robbery-begins)

## Opportunities

### Store robbery begins
- **When:** setup:events/committee-visit/day-2/day-2-morning.md AND [Cabinet](../../../locations/new-village/the-store.md#cabinet) is forced
- **Outcome:** [@name](../../store-robbery.md) begins.
- **Changes:** [@name](../../store-robbery.md) — starts; [Cabinet](../../../locations/new-village/the-store.md#cabinet) — discovered

### A ruckus at the store
- **When:** [@name](../../../locations/new-village/new-village.md) AND [@name](../../store-robbery.md)
- **Outcome:** [@hook](../../store-robbery.md)
- **Gives:** *(to: players at [@name](../../../locations/new-village/new-village.md))* hook:events/store-robbery.md

### Afternoon comes
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0
- **Outcome:** The morning is spent.
- **Changes:** [@name](day-2-morning.md) — ends; [@name](day-2-afternoon.md) — starts; [Phase cards](../committee-visit.md#phase-cards) — 12
