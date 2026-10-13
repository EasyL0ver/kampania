# Day 6 — Morning

**Part of:** [@name](day-6.md)
**Location:** [@name](../../../locations/new-village/new-village.md)

## Hook

- TBD

## Setup

The morning of [@name](day-6.md) begins.[](#coffee-at-helenas-begins)[](#second-flood-mass-begins)[](#store-robbery-begins)

## Opportunities

### Coffee at helenas begins
- **When:** setup:events/committee-visit/day-6/day-6-morning.md
- **Outcome:** [@hook](../../coffee-at-helenas.md)
- **Gives:** *(to: every player)* hook:events/coffee-at-helenas.md
- **Changes:** [@name](../../coffee-at-helenas.md) — starts

### Second flood mass begins
- **When:** setup:events/committee-visit/day-6/day-6-morning.md
- **Outcome:** [@hook](../../second-flood-mass.md)
- **Gives:** *(to: every player)* hook:events/second-flood-mass.md
- **Changes:** [@name](../../second-flood-mass.md) — starts

### Store robbery begins
- **When:** setup:events/committee-visit/day-6/day-6-morning.md and [Cabinet](../../../locations/new-village/the-store.md#cabinet) is forced
- **Outcome:** [@hook](../../store-robbery.md)
- **Gives:** *(to: every player)* hook:events/store-robbery.md
- **Changes:** [@name](../../store-robbery.md) — starts; [Cabinet](../../../locations/new-village/the-store.md#cabinet) — discovered

### Afternoon comes
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0
- **Outcome:** The morning is spent.
- **Changes:** [@name](day-6-morning.md) — ends; [@name](day-6-afternoon.md) — starts; [Phase cards](../committee-visit.md#phase-cards) — 12
