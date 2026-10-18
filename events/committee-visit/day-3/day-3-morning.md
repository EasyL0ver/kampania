# Day 3 — Morning

**Part of:** [@name](day-3.md)
**Location:** [@name](../../../locations/new-village/new-village.md)
**Tags:** [@name](../../../tags/time-morning.md)

## Hook

- TBD

## Setup

The morning of [@name](day-3.md) begins.[](#the-flood-begins)[](#ciotka-found-dead-begins)[](#glupek-in-the-bunker-begins)[](#store-robbery-begins)

## Opportunities

### The flood begins
- **When:** setup:events/committee-visit/day-3/day-3-morning.md
- **Outcome:** [@name](../../the-flood.md) begins.
- **Changes:** [@name](../../the-flood.md) — starts

### Ciotka found dead begins
- **When:** setup:events/committee-visit/day-3/day-3-morning.md
- **Outcome:** [@name](../../ciotka-found-dead/ciotka-found-dead.md) begins.
- **Changes:** [@name](../../ciotka-found-dead/ciotka-found-dead.md) — starts; [Alive](../../../characters/ciotka.md#alive) — false

### Glupek in the bunker begins
- **When:** setup:events/committee-visit/day-3/day-3-morning.md
- **Outcome:** [@name](../../edek-in-the-bunker.md) begins.
- **Changes:** [@name](../../edek-in-the-bunker.md) — starts

### Store robbery begins
- **When:** setup:events/committee-visit/day-3/day-3-morning.md AND [Cabinet](../../../locations/new-village/the-store.md#cabinet) is forced
- **Outcome:** [@name](../../store-robbery.md) begins.
- **Changes:** [@name](../../store-robbery.md) — starts; [Cabinet](../../../locations/new-village/the-store.md#cabinet) — discovered

### A ruckus at the store
- **When:** [@name](../../../locations/new-village/new-village.md) AND [@name](../../store-robbery.md)
- **Outcome:** [@hook](../../store-robbery.md)
- **Gives:** *(to: players at [@name](../../../locations/new-village/new-village.md))* hook:events/store-robbery.md

### Something wrong at Ciotka's house
- **When:** [@name](../../../locations/new-village/ciotkas-house/ciotkas-house.md) AND [@name](../../ciotka-found-dead/ciotka-found-dead.md)
- **Outcome:** [@hook](../../ciotka-found-dead/ciotka-found-dead.md)
- **Gives:** *(to: players at [@name](../../../locations/new-village/ciotkas-house/ciotkas-house.md))* hook:events/ciotka-found-dead/ciotka-found-dead.md

### Someone in the bunker
- **When:** [@name](../../../locations/upa-bunker.md) AND [@name](../../edek-in-the-bunker.md)
- **Outcome:** [@hook](../../edek-in-the-bunker.md)
- **Gives:** *(to: players at [@name](../../../locations/upa-bunker.md))* hook:events/edek-in-the-bunker.md

### The water is rising
- **When:** [@name](../../../locations/new-village/new-village.md) AND [@name](../../the-flood.md)
- **Outcome:** [@hook](../../the-flood.md)
- **Gives:** *(to: players at [@name](../../../locations/new-village/new-village.md))* hook:events/the-flood.md

### Afternoon comes
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0
- **Outcome:** The morning is spent.
- **Changes:** [@name](day-3-morning.md) — ends; [@name](day-3-afternoon.md) — starts; [Phase cards](../committee-visit.md#phase-cards) — 12
