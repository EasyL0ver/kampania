# Night

**Applies to:** events

## Description

What belongs to the night (~00:00–6:00): whatever is tagged with it is tied to that phase of the day.

## Opportunities

### Singing from the forest
- **When:** [@name](../locations/new-village/new-village.md) AND [@name](../events/hags-prayer.md)
- **Outcome:** [@hook](../events/hags-prayer.md)
- **Gives:** *(to: players at [@name](../locations/new-village/new-village.md))* hook:events/hags-prayer.md

### Hags prayer begins
- **When:** setup:tags/time-night.md
- **Outcome:** [@name](../events/hags-prayer.md) begins.
- **Changes:** [@name](../events/hags-prayer.md) — starts
