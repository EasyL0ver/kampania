# [@name](old-village.md) — Homestead Ruins

## Hook

- The stone foundations and chimneys of [@name](old-village.md), the abandoned village up the valley.

## Setup

- Wooden buildings burned in 1947.[](#charred-and-collapsed-wooden-buildings)
- Stone foundations survived.
- Stone foundations stand 1–2 feet above ground level.
- Chimneys are partially intact.
- Interiors are flooded or filled with debris.
- Underground root cellars and storage pits remain; many are water-filled.
- Pottery shards, rusted tools, and household fragments lie on the surface.
- Overgrown orchards still bear apples and plums.
- Hidden cellar holes, unstable stones, and flooded cellars make searching dangerous.
- Burn marks remain on surviving stone.
- The well is stone-lined, its top partially collapsed or sealed with debris; moss and age on the stone, the interior dark, depth unknown, water level obscured.
- Some well debris has been cleared recently; other debris piled back; candle wax is present near the disturbed debris.
- Cigarette butts collect in the grass and stone cracks around the well rim, more than any single visit would leave.
- If dam floods reach [@name](old-village.md), the well goes underwater.
- Well hazards: unstable stone, unknown depth, water, unsafe excavation.
- Day 2+ after the wolf hunt: fresh blood can be visible on the well's stone rim.
- Set apart from the homestead ruins, a larger timber building still stands[](#old-church-standing-among-homesteads): the village cerkiew, its roof sagging and fire-marked but upright.

## Opportunities

### Charred and collapsed wooden buildings
- **When:** setup:locations/old-village-ruins.md
- **Outcome:** The wooden buildings stand charred and collapsed; the village burned.
- **Gives:** [old-village-was-burned](../clues/clues.md#old-village-was-burned)

### Old church standing among homesteads
- **When:** setup:locations/old-village-ruins.md
<!-- Prompted by: setup:locations/old-village-ruins.md -->
- **Outcome:** Apart from the homesteads, the old church stands: a larger timber building, clearly the village cerkiew.
- **Gives:** hook:locations/old-village-cerkiew.md

## Actions

### Begin the rite
- **Outcome:** The committee lays out the rite and begins to name the dead.
- **Changes:** [@name](../events/the-ritual.md) — starts


### Investigate the area around the well
- **Cost:** 1 time
- **Outcome:** A close look at the rim turns up cigarette butts in the grass and stone cracks and burnt-down candles left around the well.
- **Gives:** [cigarette-butts-by-the-well](../clues/clues.md#cigarette-butts-by-the-well), [candles-by-the-well](../clues/clues.md#candles-by-the-well)

### Investigate the area around the well
- **When:** one day passing
<!-- Prompted by: [candles-by-the-well](../clues/clues.md#candles-by-the-well) -->
- **Cost:** 1 time
- **Outcome:** The candles from the earlier visit have been replaced with fresh ones. Someone tends the well on a regular basis.
- **Gives:** [someone-tends-the-well-regularly](../clues/clues.md#someone-tends-the-well-regularly)

### Investigate the area around the well
- **When:** [@name](../events/hunt-with-rezen.md) was successful
- **Cost:** 1 time
- **Outcome:** Minor blood stains mark the stone around the well rim.
- **Gives:** [blood-stains-by-the-well](../clues/clues.md#blood-stains-by-the-well)

### Look inside the well
- **Cost:** 1 time
- **Outcome:** Leaning over the shaft, you feel a compulsion to climb in. Lose 1 composure.
- **Gives:** [you-should-jump-inside](../clues/clues.md#you-should-jump-inside)

