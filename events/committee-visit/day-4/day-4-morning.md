# Day 4 — Morning

**Part of:** [@name](day-4.md)
**Location:** [@name](../../../locations/new-village/new-village.md)

## Hook

- TBD

## Setup

The morning of [@name](day-4.md) begins.[](#holy-mass-begins)[](#wojewoda-confronts-butcher-begins)[](#store-robbery-begins)

## Opportunities

### Holy mass begins
- **When:** setup:events/committee-visit/day-4/day-4-morning.md
- **Outcome:** [@hook](../../holy-mass.md)
- **Gives:** *(to: every player)* hook:events/holy-mass.md
- **Changes:** [@name](../../holy-mass.md) — starts

### Wojewoda confronts butcher begins
- **When:** setup:events/committee-visit/day-4/day-4-morning.md
- **Outcome:** [@name](../../wojewoda-confronts-butcher.md) begins.
- **Changes:** [@name](../../wojewoda-confronts-butcher.md) — starts

### Store robbery begins
- **When:** setup:events/committee-visit/day-4/day-4-morning.md and [Cabinet](../../../locations/new-village/the-store.md#cabinet) is forced
- **Outcome:** [@hook](../../store-robbery.md)
- **Gives:** *(to: every player)* hook:events/store-robbery.md
- **Changes:** [@name](../../store-robbery.md) — starts; [Cabinet](../../../locations/new-village/the-store.md#cabinet) — discovered

### Afternoon comes
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0
- **Outcome:** The morning is spent.
- **Changes:** [@name](day-4-morning.md) — ends; [@name](day-4-afternoon.md) — starts; [Phase cards](../committee-visit.md#phase-cards) — 12
