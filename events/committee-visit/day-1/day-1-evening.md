# Day 1 — Evening

**Part of:** [@name](day-1.md)
**Location:** [@name](../../../locations/new-village/new-village.md)
**Tags:** [@name](../../../tags/time-evening.md)

## Hook

- TBD

## Setup

The evening of [@name](day-1.md) begins.[](#dinner-begins)

## Opportunities

### Dinner begins
- **When:** setup:events/committee-visit/day-1/day-1-evening.md
- **Outcome:** [@name](../../dinner.md) begins.
- **Changes:** [@name](../../dinner.md) — starts

### Dinner is laid
- **When:** [@name](../../../locations/new-village/wojewodas-house.md) AND [@name](../../dinner.md)
- **Outcome:** [@hook](../../dinner.md)
- **Gives:** *(to: players at [@name](../../../locations/new-village/wojewodas-house.md))* hook:events/dinner.md

### Night falls
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0
- **Outcome:** The evening is spent.
- **Changes:** [@name](day-1-evening.md) — ends; [@name](day-1-night.md) — starts; [Phase cards](../committee-visit.md#phase-cards) — 12
