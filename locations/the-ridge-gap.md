# The Ridge Gap

**Type:** Location (revisitable, discoverable)
**Location:** The notch in the ridge between the [@name](new-village.md) valley and the empty [@name](big-basin.md) beyond it.
**Present:** [@name](../characters/foreman.md) (if brought on the survey)
**Available:** After reaching the gap from the survey routes ([@name](village-outskirts.md))
**Cost:** 1 action per interaction; climbing the plug is its own scene (see [@name](../events/climb-the-plug.md))

## Hook

- The notch in the ridge at the end of the valley, reached by the survey routes from the village outskirts.

## Setup

- The gap is the low notch where the ridge dips between the [@name](new-village.md) valley and [@name](big-basin.md).
- The state map draws it as an open channel, the valley's main drain.
- An old landslide has choked the notch with fallen rock and earth.
- From the base the fill looks like loose rubble floodwater would seep straight through.
- The plug is a steep bank about two storeys high. Climbing it is its own scene: [@name](../events/climb-the-plug.md) on the survey, and [@name](../events/climb-the-plug-in-the-rain.md) for the finale charge.
- The fill can be sampled at the toe, but that only settles whether it seeps. What decides the outlet is read only at the crest: the height of the plug's lowest saddle (the sill the rising water must top to spill into [@name](big-basin.md)) and whether the slid mass beds against the intact ridge or leaves a channel. Both are invisible from below.
- The top of the plug overlooks the empty [@name](big-basin.md), the ground the map says the valley's water should drain into.
- Nothing but this fill stands between the valley and [@name](big-basin.md).

## Opportunities

- **The fill looks loose** `(noticed by: [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap))` — At the foot of the plug the fill looks like loose, open rubble the water would run straight through, so the gap might yet drain by seeping through it. → Gives: [gap-may-seep](../clues/clues.md#gap-may-seep)
- **Water would have to top the saddle** `(noticed by: [gap-is-candidate-drain](../clues/clues.md#gap-is-candidate-drain))` — For the gap to drain, rising water must clear the plug's lowest saddle and spill into [@name](big-basin.md); whether that saddle sits below the flood line is the open question. → Gives: [water-may-flow-over](../clues/clues.md#water-may-flow-over)
- **The gap won't drain** `(noticed by: [@name](../items/gap-fill-reading.md) AND [@name](../items/gap-sill-reading.md) AND [Geology](../cards/geology.md))` — Put the two readings together: the fill will not seep and the sill will not overtop, so water can leave the valley neither through the plug nor over it. The outlet is dead. → Gives: [gap-is-blocked](../clues/clues.md#gap-is-blocked)

## Actions

### Examine the fill at the toe
- **When:** reaching the foot of the plug (no climb)
- **Prompted by:** [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap), [gap-may-seep](../clues/clues.md#gap-may-seep)
- **Cost:** 1 time
- **Outcome:** Scramble to the base of the plug and dig into it. From a distance the fill looks like loose rubble the water would run straight through; up close it is dense clay and shattered rock packed tight, impermeable. This settles only whether the plug leaks, not whether the water level can rise over it (that is the crest sill, which needs the climb).
  - **Geology:** reads the fill directly and confirms it will not pass water at flood pressure.
- **Gives:** [@name](../items/gap-fill-reading.md)

### Climb the plug
- **When:** a climber, the rest of the party on the ground, and a rope for the killzone
- **Prompted by:** [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap), [water-may-flow-over](../clues/clues.md#water-may-flow-over)
- **Outcome:** The party sets up at the foot of the plug and goes for the crest. Play [@name](../events/climb-the-plug.md).
- **Gives:** aware:events/climb-the-plug.md

### Climb the plug in the rain
- **When:** The demolition charges and a committed engineering plan (from [@name](../events/foreman-saves-village.md)); a climber willing to go up at flood peak
- **Outcome:** With the charges in hand and the flood cresting, the party goes back up to set the charge. Play [@name](../events/climb-the-plug-in-the-rain.md).
- **Gives:** aware:events/climb-the-plug-in-the-rain.md
