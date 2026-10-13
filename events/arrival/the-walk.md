# Arrival — The Walk

**Part of:** [@name](arrival.md)
**Location:** [@name](../../locations/new-village/new-village.md)
**Present:** [@name](../../characters/wojewoda.md)

## Hook

- [@name](../../characters/wojewoda.md) walking ahead of the committee up the village road under his umbrella.

## Setup

- The road climbs between low wooden houses. [@first-name](../../characters/wojewoda.md) walks ahead under his umbrella; people in doorways nod to him and look at you.
- Outside a shop, three men drink beer in the rain. A fourth, unshaven, raises his bottle at you and grins.[](#man-with-the-bottle-smokes-cheap-tobacco) [@first-name](../../characters/wojewoda.md) does not look at him.
- At the edge of the village stands the only red-brick house. A young woman hangs washing under its eaves, a small boy at her skirt. She watches you pass and does not wave.
- Over the fence next door, a big man splitting wood rests his axe and stares until you are past.
- On the hill above the roofs stands the church: fresh boards, a sound roof, firewood stacked high.[](#church-better-kept-than-the-village-can-afford)
- The road ends at a two-storey house with a fenced yard. [@first-name](../../characters/wojewoda.md) holds the door open.

## Opportunities

### Man with the bottle smokes cheap tobacco
- **Noticed by:** [Chainsmoker](../../cards/chainsmoker.md)
- **When:** setup:events/arrival/the-walk.md
- **Outcome:** The man with the bottle smokes Sport, the cheapest there is.
- **Gives:** [`tadek-smokes-cheapest`](../../clues/clues.md#tadek-smokes-cheapest)

### Church better kept than the village can afford
- **Noticed by:** [Handiwork](../../cards/handiwork.md)
- **When:** setup:events/arrival/the-walk.md
- **Outcome:** The church is better kept than a village this size can pay for: new boards, a sound roof, a winter's firewood.
- **Gives:** [`church-too-nice`](../../clues/clues.md#church-too-nice)

## Actions

### Ask about the men outside the shop
- **Outcome:** "My brother, [@nickname](../../characters/wujas.md), and his friends." [@first-name](../../characters/wojewoda.md) keeps walking. "The shop is for everyone."
- **Gives:** hook:characters/wujas.md, hook:locations/new-village/the-store.md

### Ask about the woman with the washing
- **Outcome:** "[@name](../../characters/barbara.md). She works at the farm. That's her boy, [@first-name](../../characters/pawelek.md)."
- **Gives:** hook:characters/barbara.md, hook:characters/pawelek.md, hook:locations/new-village/barbaras-house.md

### Ask about the man at the woodpile
- **Outcome:** "[@surname](../../characters/neighbour.md). A hunter. He keeps to himself."
- **Gives:** hook:characters/neighbour.md, hook:locations/new-village/neighbours-house.md

### Ask about the church
- **Outcome:** "[@title](../../characters/priest.md) [@surname](../../characters/priest.md)'s. He looks after it well."
- **Gives:** hook:locations/new-village/the-church/the-church.md, hook:characters/priest.md

### Go inside
- **Outcome:** Out of the rain, into a hallway that smells of floor wax and tea.
- **Gives:** hook:events/arrival/in-the-office.md
- **Changes:** [@name](in-the-office.md) — starts
