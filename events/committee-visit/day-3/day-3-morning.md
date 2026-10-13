# Day 3 — Morning

**Part of:** [@name](day-3.md)
**Location:** [@name](../../../locations/new-village/new-village.md)

## Hook

- TBD

## Setup

The morning of [@name](day-3.md) begins.[](#the-flood-begins)[](#hunt-with-rezen-begins)[](#hunt-with-dudka-begins)[](#ciotka-found-dead-begins)[](#glupek-in-the-bunker-begins)[](#store-robbery-begins)

## Opportunities

### The flood begins
- **When:** setup:events/committee-visit/day-3/day-3-morning.md
- **Outcome:** [@hook](../../the-flood.md)
- **Gives:** *(to: every player)* hook:events/the-flood.md
- **Changes:** [@name](../../the-flood.md) — starts

### Hunt with rezen begins
- **When:** setup:events/committee-visit/day-3/day-3-morning.md
- **Outcome:** [@name](../../hunt-with-rezen.md) begins.
- **Changes:** [@name](../../hunt-with-rezen.md) — starts

### Hunt with dudka begins
- **When:** setup:events/committee-visit/day-3/day-3-morning.md
- **Outcome:** [@name](../../hunt-with-dudka.md) begins.
- **Changes:** [@name](../../hunt-with-dudka.md) — starts

### Ciotka found dead begins
- **When:** setup:events/committee-visit/day-3/day-3-morning.md
- **Outcome:** [@name](../../ciotka-found-dead/ciotka-found-dead.md) begins.
- **Changes:** [@name](../../ciotka-found-dead/ciotka-found-dead.md) — starts

### Glupek in the bunker begins
- **When:** setup:events/committee-visit/day-3/day-3-morning.md
- **Outcome:** [@name](../../edek-in-the-bunker.md) begins.
- **Changes:** [@name](../../edek-in-the-bunker.md) — starts

### Store robbery begins
- **When:** setup:events/committee-visit/day-3/day-3-morning.md and [Cabinet](../../../locations/new-village/the-store.md#cabinet) is forced
- **Outcome:** [@hook](../../store-robbery.md)
- **Gives:** *(to: every player)* hook:events/store-robbery.md
- **Changes:** [@name](../../store-robbery.md) — starts; [Cabinet](../../../locations/new-village/the-store.md#cabinet) — discovered

### Afternoon comes
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0
- **Outcome:** The morning is spent.
- **Changes:** [@name](day-3-morning.md) — ends; [@name](day-3-afternoon.md) — starts; [Phase cards](../committee-visit.md#phase-cards) — 12
