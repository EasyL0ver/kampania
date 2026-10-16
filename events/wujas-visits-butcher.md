# Wujas Visits the Butcher

**Location:** [@name](../locations/new-village/butchers-house.md)
**Present:** [@name](../characters/wujas.md), [@name](../characters/butcher.md)

## Hook

- Players may see [@nickname](../characters/wujas.md) walking toward the village edge.
- Villagers may mention that he goes that way sometimes.

## Setup

- [@nickname](../characters/wujas.md) walks to the edge house.
- He brings cigarettes or a butchering job.
- He stays at the threshold for less than half an hour.[](#wujass-regular-edge-house-visits)
- He does not go inside.
- [@surname](../characters/butcher.md) takes what [@nickname](../characters/wujas.md) brings.
- The exchange is functional, not friendly.
- Villagers treat the visits as drinking-buddy business.
- [@surname](../characters/butcher.md) does not drink.
- [@first-name](../characters/wojewoda.md) does not visit [@surname](../characters/butcher.md) himself.

## Opportunities

### Arriving on the scene
- **When:** [@name](../locations/new-village/new-village.md)
- **Outcome:** [@hook](wujas-visits-butcher.md)
- **Gives:** *(to: players at [@name](../locations/new-village/new-village.md))* hook:events/wujas-visits-butcher.md

### Wujas's regular edge house visits
- **Noticed by:** [Finesse](../cards/finesse.md)
- **When:** setup:events/wujas-visits-butcher.md
- **Outcome:** [@nickname](../characters/wujas.md) visits the edge house regularly.

## Actions

### Observe the final visit
<!-- Prompted by: [dudka-failed-wolf-hunt](../clues/clues.md#dudka-failed-wolf-hunt) -->
- **Cost:** 1 time
- **Outcome:** [@nickname](../characters/wujas.md) carries [@first-name](../characters/wojewoda.md)'s real request to [@surname](../characters/butcher.md): deal with the wolves. [@surname](../characters/butcher.md) treats the request as a call back into the village.
- **Gives:** [`rezen-hunts-wolves`](../clues/clues.md#rezen-hunts-wolves)
