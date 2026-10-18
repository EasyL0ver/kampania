# Hag's Prayer

**Location:** [@name](../locations/new-village/barbaras-house.md)
**Present:** [@name](../characters/hag.md) (if [Alive](../characters/hag.md#alive) is true)

## Hook

- Faint singing carried on the wind from the forest, heard at night from [@name](../locations/new-village/barbaras-house.md) or anywhere outside in the village.

## Setup

- Following the singing leads to the[](#woman-singing-prayers-in-forest) [@name](../locations/old-village-cerkiew.md).
- The ruined nave is dark but for her candles and a low fire; incense, bread, and honey are set on the stones.
- [@name](../characters/hag.md) stands over the well, singing the names of the dead[](#woman-singing-at-well); the sound carries off the bare stone.
- The instant she sees or hears the players, the singing stops and she is gone into the forest.

## Opportunities

### Woman singing prayers in forest
- **When:** setup:events/hags-prayer.md
- **Outcome:** being here at night, the players hear it themselves: a woman singing prayers out in the forest.
- **Gives:** [singing-in-the-night](../clues/clues.md#singing-in-the-night)

### Woman singing at well
- **When:** setup:events/hags-prayer.md
- **Outcome:** a woman is there at the well, singing, before she bolts into the dark.
- **Gives:** hook:characters/hag.md

## Actions

### Follow the singing
- **Cost:** 1 time
- **Outcome:** The singing leads through the forest to the [@name](../locations/old-village-cerkiew.md).
- **Gives:** hook:locations/old-village-ruins.md

### Sneak closer and watch
- **Requires:** [Finesse](../cards/finesse.md)
- **Cost:** 1 time
- **Outcome:** You creep closer through the dark, near enough to the well to watch [@first-name](../characters/hag.md) perform the full rite unseen: fire, incense, bread, honey, and the names of the dead sung one by one.
- **Gives:** [hag-performs-rite](../clues/clues.md#hag-performs-rite)

### Chase after her
- **Cost:** 1 time
- **Outcome:** You break cover and run after her. She is gone into the dark before you reach the well and the chase fails. She has now seen the players come at her, and she knows the village means her harm.
- **Changes:** [Village Hostility](../characters/hag.md#village-hostility) — true

## Mechanics

### She flees

- **Type:** rule
- [@first-name](../characters/hag.md) cannot be caught, cornered, or spoken to here. The moment she is noticed, she flees, and pursuit fails in the dark. Contact must be made later, at her [@name](../locations/hags-cabin.md).

## Resolve

- [Candles](../locations/old-village-ruins.md#candles) is seen → [Candles](../locations/old-village-ruins.md#candles) = replaced
