# Day 4 — Morning

**Part of:** [@name](day-4.md)
**Location:** [@name](../../../locations/new-village/new-village.md)
**Tags:** [@name](../../../tags/time-morning.md)

## Hook

- TBD

## Setup

The morning of [@name](day-4.md) begins.[](#holy-mass-begins)[](#wojewoda-confronts-butcher-begins)[](#store-robbery-begins)

## Opportunities

### Holy mass begins
- **When:** setup:events/committee-visit/day-4/day-4-morning.md
- **Outcome:** [@name](../../holy-mass.md) begins.
- **Changes:** [@name](../../holy-mass.md) — starts

### Wojewoda confronts butcher begins
- **When:** setup:events/committee-visit/day-4/day-4-morning.md
- **Outcome:** [@name](../../wojewoda-confronts-butcher.md) begins.
- **Changes:** [@name](../../wojewoda-confronts-butcher.md) — starts

### Store robbery begins
- **When:** setup:events/committee-visit/day-4/day-4-morning.md AND [Cabinet](../../../locations/new-village/the-store.md#cabinet) is forced
- **Outcome:** [@name](../../store-robbery.md) begins.
- **Changes:** [@name](../../store-robbery.md) — starts; [Cabinet](../../../locations/new-village/the-store.md#cabinet) — discovered

### A ruckus at the store
- **When:** [@name](../../../locations/new-village/new-village.md) AND [@name](../../store-robbery.md)
- **Outcome:** [@hook](../../store-robbery.md)
- **Gives:** *(to: players at [@name](../../../locations/new-village/new-village.md))* hook:events/store-robbery.md

### Bells for Mass
- **When:** [@name](../../../locations/new-village/new-village.md) AND [@name](../../holy-mass.md)
- **Outcome:** [@hook](../../holy-mass.md)
- **Gives:** *(to: players at [@name](../../../locations/new-village/new-village.md))* hook:events/holy-mass.md

### Raised voices at the store
- **When:** [@name](../../../locations/new-village/the-store.md) AND [@name](../../wojewoda-confronts-butcher.md)
- **Outcome:** [@hook](../../wojewoda-confronts-butcher.md)
- **Gives:** *(to: players at [@name](../../../locations/new-village/the-store.md))* hook:events/wojewoda-confronts-butcher.md

### Afternoon comes
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0
- **Outcome:** The morning is spent.
- **Changes:** [@name](day-4-morning.md) — ends; [@name](day-4-afternoon.md) — starts; [Phase cards](../committee-visit.md#phase-cards) — 12
