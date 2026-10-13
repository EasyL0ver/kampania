# Day 7 — Morning

**Part of:** [@name](day-7.md)
**Location:** [@name](../../../locations/new-village/new-village.md)

## Hook

- TBD

## Setup

The morning of [@name](day-7.md) begins.[](#the-seal-break-begins)[](#the-odpust-begins)[](#store-robbery-begins)

## Opportunities

### The seal break begins
- **When:** setup:events/committee-visit/day-7/day-7-morning.md and [Crisis of Faith](../../../characters/priest.md#crisis-of-faith) < 8
- **Outcome:** [@hook](../../the-seal-break.md)
- **Gives:** *(to: every player)* hook:events/the-seal-break.md
- **Changes:** [@name](../../the-seal-break.md) — starts

### The odpust begins
- **When:** setup:events/committee-visit/day-7/day-7-morning.md and [Crisis of Faith](../../../characters/priest.md#crisis-of-faith) >= 8
- **Outcome:** [@hook](../../the-odpust.md)
- **Gives:** *(to: every player)* hook:events/the-odpust.md
- **Changes:** [@name](../../the-odpust.md) — starts

### Store robbery begins
- **When:** setup:events/committee-visit/day-7/day-7-morning.md and [Cabinet](../../../locations/new-village/the-store.md#cabinet) is forced
- **Outcome:** [@hook](../../store-robbery.md)
- **Gives:** *(to: every player)* hook:events/store-robbery.md
- **Changes:** [@name](../../store-robbery.md) — starts; [Cabinet](../../../locations/new-village/the-store.md#cabinet) — discovered

### Afternoon comes
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0
- **Outcome:** The morning is spent.
- **Changes:** [@name](day-7-morning.md) — ends; [@name](day-7-afternoon.md) — starts; [Phase cards](../committee-visit.md#phase-cards) — 12
