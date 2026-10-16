# Day 4 — Afternoon

**Part of:** [@name](day-4.md)
**Location:** [@name](../../../locations/new-village/new-village.md)
**Tags:** [@name](../../../tags/time-afternoon.md)

## Hook

- TBD

## Setup

The afternoon of [@name](day-4.md) begins.[](#priests-plea-begins)[](#urgent-message-begins)

## Opportunities

### Priests plea begins
- **When:** setup:events/committee-visit/day-4/day-4-afternoon.md AND [Bond: Priest](../../../cards/bond-priest.md)
- **Outcome:** [@hook](../../priests-plea.md)
- **Gives:** *(to: holder of [Bond](../../../cards/bond-priest.md))* hook:events/priests-plea.md
- **Changes:** [@name](../../priests-plea.md) — starts

### Urgent message begins
- **When:** setup:events/committee-visit/day-4/day-4-afternoon.md
- **Outcome:** [@name](../../phone-calls/the-telegram/the-telegram.md) begins.
- **Changes:** [@name](../../phone-calls/the-telegram/the-telegram.md) — starts

### Evening comes
- **When:** [Phase cards](../committee-visit.md#phase-cards) is 0
- **Outcome:** The afternoon is spent.
- **Changes:** [@name](day-4-afternoon.md) — ends; [@name](day-4-evening.md) — starts; [Phase cards](../committee-visit.md#phase-cards) — 12
