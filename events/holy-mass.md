# Holy Mass — Anti-Flood Prayer

**Location:** [@name](../locations/new-village/the-church/the-church.md)
**Present:** [@name](../characters/priest.md), [@name](../characters/matrona.md), [@name](../characters/painter.md), [@name](../characters/wojewoda.md)

## Hook

A Mass beginning in the church as the village gathers against the rising water.

## Setup

- This is the first flood Mass.
- [@name](../characters/wujas.md) is absent.
- [@name](../characters/ciotka.md)'s pew is empty.[](#ciotkas-empty-seat-in-church)
- [@name](../characters/ciotka.md) has not missed Mass in years.
- [@name](../characters/priest.md) preaches on Jonah 3:4 and the warning given to Nineveh.
- The sermon frames the rising water as a deadline before judgment.
- The priest names no specific sin.
- The priest tells the village the confessional will stay open after Mass all day.
- The priest asks the village to confess before the water comes.[](#priests-call-aimed-at-specific-people)

## Opportunities

### Ciotka's empty seat in church
- **Noticed by:** [Devotion](../cards/devotion.md) AND [ciotka-is-devout](../clues/clues.md#ciotka-is-devout)
- **When:** setup:events/holy-mass.md
<!-- Prompted by: hook:characters/ciotka.md -->
- **Outcome:** [@name](../characters/ciotka.md)'s absence is the only gap in a full church, and the priest keeps looking at it.
- **Gives:** [`ciotka-missed-mass`](../clues/clues.md#ciotka-missed-mass)

### Priest's call aimed at specific people
- **Noticed by:** [Devotion](../cards/devotion.md)
- **When:** setup:events/holy-mass.md
- **Outcome:** the priest's general call to confession is aimed at particular people in the pews, not only at the village as a whole.
- **Gives:** [`priest-fears-divine-judgment`](../clues/clues.md#priest-fears-divine-judgment)

## Actions

- No event-specific actions.
