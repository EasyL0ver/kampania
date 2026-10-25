# The Ridge Gap

## Hook

- The notch in the ridge at the end of the valley, reached by the survey routes from the village outskirts.

## Setup

- The gap is the low notch where the ridge dips between the [@name](new-village/new-village.md) valley and [@name](big-basin.md).
- The state map draws it as an open channel, the valley's main drain.
- An old landslide has choked the notch with fallen rock and earth.
- From the base the fill looks like loose rubble floodwater would seep straight through.[](#loose-rubble-at-plug-foot)
- The plug is a steep bank about two storeys high. Climbing it is its own scene: [@name](../events/climb-the-plug.md) on the survey, and [@name](../events/climb-the-plug-in-the-rain.md) for the finale charge.
- The fill can be sampled at the toe, but that only settles whether it seeps. What decides the outlet is read only at the crest: the height of the plug's lowest saddle[](#saddle-height-versus-flood-line) (the sill the rising water must top to spill into [@name](big-basin.md)) and whether the slid mass beds against the intact ridge or leaves a channel. Both are invisible from below.[](#dead-outlet-from-combined-readings)
- The top of the plug overlooks the empty [@name](big-basin.md), the ground the map says the valley's water should drain into.
- Nothing but this fill stands between the valley and [@name](big-basin.md).

## Opportunities

### Loose rubble at plug foot
- **Noticed by:** [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap)
- **When:** setup:locations/the-ridge-gap.md
- **Outcome:** At the foot of the plug the fill looks like loose, open rubble the water would run straight through, so the gap might yet drain by seeping through it.
- **Gives:** [gap-may-seep](../clues/clues.md#gap-may-seep)

### Saddle height versus flood line
- **Noticed by:** [gap-is-candidate-drain](../clues/clues.md#gap-is-candidate-drain)
- **When:** setup:locations/the-ridge-gap.md
- **Outcome:** For the gap to drain, rising water must clear the plug's lowest saddle and spill into [@name](big-basin.md); whether that saddle sits below the flood line is the open question.
- **Gives:** [water-may-flow-over](../clues/clues.md#water-may-flow-over)

### Dead outlet from combined readings
- **Noticed by:** [@name](../items/gap-fill-reading.md) AND [@name](../items/gap-sill-reading.md) AND [Geology](../cards/geology.md)
- **When:** setup:locations/the-ridge-gap.md
- **Outcome:** The ridge gap won't drain: put the two readings together, and the fill will not seep and the sill will not overtop, so water can leave neither through the plug nor over it. The outlet is dead.
- **Gives:** [gap-is-blocked](../clues/clues.md#gap-is-blocked)

## Actions

### Examine the fill at the toe
<!-- Prompted by: [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap), [gap-may-seep](../clues/clues.md#gap-may-seep) -->
- **Cost:** 1 time
- **Outcome:** Scramble to the base of the plug and dig into it. From a distance the fill looks like loose rubble the water would run straight through; up close it is dense clay and shattered rock packed tight, impermeable. This settles only whether the plug leaks, not whether the water level can rise over it (that is the crest sill, which needs the climb).
  - **Geology:** reads the fill directly and confirms it will not pass water at flood pressure.
- **Gives:** [@name](../items/gap-fill-reading.md), hook:items/gap-fill-reading.md

### Climb the plug
- **Requires:** [@name](../items/rope.md)
<!-- Prompted by: [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap), [water-may-flow-over](../clues/clues.md#water-may-flow-over) -->
- **Outcome:** The party sets up at the foot of the plug and goes for the crest. Play [@name](../events/climb-the-plug.md).
- **Gives:** hook:events/climb-the-plug.md
- **Changes:** [@name](../events/climb-the-plug.md) — starts

### Climb the plug in the rain
- **Requires:** [@name](../items/makeshift-charge.md)
- **Outcome:** With the charges in hand and the flood cresting, the party goes back up to set the charge. Play [@name](../events/climb-the-plug-in-the-rain.md).
- **Gives:** hook:events/climb-the-plug-in-the-rain.md
- **Changes:** [@name](../events/climb-the-plug-in-the-rain.md) — starts
