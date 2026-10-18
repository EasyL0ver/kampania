# Day 7 — Morning

**Part of:** [@name](day-7.md)
**Location:** [@name](../../../locations/new-village/new-village.md)
**Tags:** [@name](../../../tags/time-morning.md)

## Hook

- TBD

## Setup

The morning of [@name](day-7.md) begins.[](#the-seal-break-begins)[](#the-odpust-begins)[](#store-robbery-begins)

## Opportunities

### The seal break begins
- **When:** setup:events/committee-visit/day-7/day-7-morning.md AND [Crisis of Faith](../../../characters/priest.md#crisis-of-faith) < 8
- **Outcome:** [@name](../../the-seal-break.md) begins.
- **Changes:** [@name](../../the-seal-break.md) — starts

### The odpust begins
- **When:** setup:events/committee-visit/day-7/day-7-morning.md AND [Crisis of Faith](../../../characters/priest.md#crisis-of-faith) >= 8
- **Outcome:** [@name](../../the-odpust.md) begins.
- **Changes:** [@name](../../the-odpust.md) — starts

### Store robbery begins
- **When:** setup:events/committee-visit/day-7/day-7-morning.md AND [Cabinet](../../../locations/new-village/the-store.md#cabinet) is forced
- **Outcome:** [@name](../../store-robbery.md) begins.
- **Changes:** [@name](../../store-robbery.md) — starts; [Cabinet](../../../locations/new-village/the-store.md#cabinet) — discovered

### A ruckus at the store
- **When:** [@name](../../../locations/new-village/new-village.md) AND [@name](../../store-robbery.md)
- **Outcome:** [@hook](../../store-robbery.md)
- **Gives:** *(to: players at [@name](../../../locations/new-village/new-village.md))* hook:events/store-robbery.md

### Bells for the odpust
- **When:** [@name](../../../locations/new-village/new-village.md) AND [@name](../../the-odpust.md)
- **Outcome:** [@hook](../../the-odpust.md)
- **Gives:** *(to: players at [@name](../../../locations/new-village/new-village.md))* hook:events/the-odpust.md

### The bell rings wrong
- **When:** [@name](../../../locations/new-village/new-village.md) AND [@name](../../the-seal-break.md)
- **Outcome:** [@hook](../../the-seal-break.md)
- **Gives:** *(to: players at [@name](../../../locations/new-village/new-village.md))* hook:events/the-seal-break.md

### Afternoon comes
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0
- **Outcome:** The morning is spent.
- **Changes:** [@name](day-7-morning.md) — ends; [@name](day-7-afternoon.md) — starts; [Phase cards](../committee-visit.md#phase-cards) — 12
