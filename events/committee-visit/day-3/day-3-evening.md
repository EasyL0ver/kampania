# Day 3 — Evening

**Part of:** [@name](day-3.md)
**Location:** [@name](../../../locations/new-village/new-village.md)
**Tags:** [@name](../../../tags/time-evening.md)

## Hook

- TBD

## Setup

The evening of [@name](day-3.md) begins.[](#pawelek-falls-ill-begins)[](#the-binge-begins)

## Opportunities

### Pawelek falls ill begins
- **When:** setup:events/committee-visit/day-3/day-3-evening.md
- **Outcome:** [@name](../../pawelek-falls-ill.md) begins.
- **Changes:** [@name](../../pawelek-falls-ill.md) — starts

### Word that Pawelek is sick
- **When:** ([@name](../../../locations/new-village/pgr-farm/pgr-farm.md) OR [@name](../../../locations/new-village/the-store.md)) AND [@name](../../pawelek-falls-ill.md)
<!-- Prompted by: hook:locations/new-village/pgr-farm/pgr-farm.md, hook:locations/new-village/the-store.md -->
- **Outcome:** [@hook](../../pawelek-falls-ill.md)
- **Gives:** *(to: players at [@name](../../../locations/new-village/pgr-farm/pgr-farm.md), [@name](../../../locations/new-village/the-store.md))* hook:events/pawelek-falls-ill.md

### The binge begins
- **When:** setup:events/committee-visit/day-3/day-3-evening.md
- **Outcome:** [@name](../../the-binge/the-binge.md) begins.
- **Changes:** [@name](../../the-binge/the-binge.md) — starts

### Drinking on the store benches
- **When:** [@name](../../../locations/new-village/the-store.md) AND [@name](../../the-binge/the-binge.md)
<!-- Prompted by: hook:locations/new-village/the-store.md -->
- **Outcome:** [@hook](../../the-binge/the-binge.md)
- **Gives:** *(to: players at [@name](../../../locations/new-village/the-store.md))* hook:events/the-binge/the-binge.md

### Night falls
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0
- **Outcome:** The evening is spent.
- **Changes:** [@name](day-3-evening.md) — ends; [@name](day-3-night.md) — starts; [Phase cards](../committee-visit.md#phase-cards) — 12
