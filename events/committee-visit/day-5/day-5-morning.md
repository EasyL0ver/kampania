# Day 5 — Morning

**Part of:** [@name](day-5.md)
**Location:** [@name](../../../locations/new-village/new-village.md)

## Hook

- TBD

## Setup

The morning of [@name](day-5.md) begins.[](#funeral-mass-begins)[](#foremans-flood-fight-begins)[](#store-robbery-begins)

## Opportunities

### Funeral mass begins
- **When:** setup:events/committee-visit/day-5/day-5-morning.md
- **Outcome:** [@hook](../../funeral-mass.md)
- **Gives:** *(to: every player)* hook:events/funeral-mass.md
- **Changes:** [@name](../../funeral-mass.md) — starts

### Foremans flood fight begins
- **When:** setup:events/committee-visit/day-5/day-5-morning.md
- **Outcome:** [@hook](../../foremans-flood-fight.md)
- **Gives:** *(to: every player)* hook:events/foremans-flood-fight.md
- **Changes:** [@name](../../foremans-flood-fight.md) — starts

### Store robbery begins
- **When:** setup:events/committee-visit/day-5/day-5-morning.md and [Cabinet](../../../locations/new-village/the-store.md#cabinet) is forced
- **Outcome:** [@hook](../../store-robbery.md)
- **Gives:** *(to: every player)* hook:events/store-robbery.md
- **Changes:** [@name](../../store-robbery.md) — starts; [Cabinet](../../../locations/new-village/the-store.md#cabinet) — discovered

### Afternoon comes
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0
- **Outcome:** The morning is spent.
- **Changes:** [@name](day-5-morning.md) — ends; [@name](day-5-afternoon.md) — starts; [Phase cards](../committee-visit.md#phase-cards) — 12
