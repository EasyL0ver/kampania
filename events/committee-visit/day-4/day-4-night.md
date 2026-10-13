# Day 4 — Night

**Part of:** [@name](day-4.md)
**Location:** [@name](../../../locations/new-village/new-village.md)

## Hook

- TBD

## Setup

The night of [@name](day-4.md) begins.[](#well-confrontation-begins)[](#hags-prayer-begins)

## Opportunities

### Well confrontation begins
- **When:** setup:events/committee-visit/day-4/day-4-night.md and [Village Hostility](../../../characters/hag.md#village-hostility) is false
- **Outcome:** [@name](../../well-confrontation.md) begins.
- **Changes:** [@name](../../well-confrontation.md) — starts

### Hags prayer begins
- **When:** setup:events/committee-visit/day-4/day-4-night.md
- **Outcome:** [@name](../../hags-prayer.md) begins.
- **Changes:** [@name](../../hags-prayer.md) — starts

### Morning comes
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0
- **Outcome:** The night is spent.
- **Changes:** [@name](day-4-night.md) — ends; [@name](day-4.md) — ends; [@name](../day-5/day-5.md) — starts; [@name](../day-5/day-5-morning.md) — starts; [@name](../../hags-prayer.md) — ends; [Phase cards](../committee-visit.md#phase-cards) — 12
