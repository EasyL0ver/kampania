# The Ridge Gap

**Type:** Location (revisitable, discoverable)
**Location:** The notch in the ridge between the %NEW_VILLAGE% valley and the empty %BIG-BASIN% beyond it.
**Present:** [Michał Pytlak](../characters/foreman.md) (if brought on the survey)
**Available:** After reaching the gap from the survey routes ([Village Outskirts](village-outskirts.md))
**Cost:** 1 action per interaction; climbing the plug is its own scene (see [Climb the Plug](../events/climb-the-plug.md))

## Hook

- The notch in the ridge at the end of the valley, reached by the survey routes from the village outskirts.

## Setup

- The gap is the low notch where the ridge dips between the %NEW_VILLAGE% valley and %BIG-BASIN%.
- The state map draws it as an open channel, the valley's main drain.
- An old landslide has choked the notch with fallen rock and earth.
- From the base the fill looks like loose rubble floodwater would seep straight through.
- The plug is a steep bank about two storeys high. Climbing it is its own scene: [Climb the Plug](../events/climb-the-plug.md) on the survey, and [Climb the Plug in the Rain](../events/climb-the-plug-in-the-rain.md) for the finale charge.
- The fill can be sampled at the toe, but that only settles whether it seeps. What decides the outlet is read only at the crest: the height of the plug's lowest saddle (the sill the rising water must top to spill into %BIG-BASIN%) and whether the slid mass beds against the intact ridge or leaves a channel. Both are invisible from below.
- The top of the plug overlooks the empty %BIG-BASIN%, the ground the map says the valley's water should drain into.
- Nothing but this fill stands between the valley and %BIG-BASIN%.

## Opportunities

- **The fill looks loose** `(noticed by: [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap))` — At the foot of the plug the fill looks like loose, open rubble the water would run straight through, so the gap might yet drain by seeping through it. → Gives: [gap-may-seep](../clues/clues.md#gap-may-seep)
- **Water would have to top the saddle** `(noticed by: [gap-is-candidate-drain](../clues/clues.md#gap-is-candidate-drain))` — For the gap to drain, rising water must clear the plug's lowest saddle and spill into %BIG-BASIN%; whether that saddle sits below the flood line is the open question. → Gives: [water-may-flow-over](../clues/clues.md#water-may-flow-over)
- **The gap won't drain** `(noticed by: [Gap Fill Reading](../items/gap-fill-reading.md) AND [Gap Sill Reading](../items/gap-sill-reading.md) AND [Geology](../cards/geology.md))` — Put the two readings together: the fill will not seep and the sill will not overtop, so water can leave the valley neither through the plug nor over it. The outlet is dead. → Gives: [gap-is-blocked](../clues/clues.md#gap-is-blocked)

## Actions

### Examine the fill at the toe
- **When:** reaching the foot of the plug (no climb)
- **Prompted by:** [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap), [gap-may-seep](../clues/clues.md#gap-may-seep)
- **Cost:** 1 time
- **Outcome:** Scramble to the base of the plug and dig into it. From a distance the fill looks like loose rubble the water would run straight through; up close it is dense clay and shattered rock packed tight, impermeable. This settles only whether the plug leaks, not whether the water level can rise over it (that is the crest sill, which needs the climb).
  - **Geology:** reads the fill directly and confirms it will not pass water at flood pressure.
- **Gives:** Item: [Gap Fill Reading](../items/gap-fill-reading.md)

### Climb the plug
- **When:** a climber, the rest of the party on the ground, and a rope for the killzone
- **Prompted by:** [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap), [water-may-flow-over](../clues/clues.md#water-may-flow-over)
- **Outcome:** The party sets up at the foot of the plug and goes for the crest. Play [Climb the Plug](../events/climb-the-plug.md).
- **Gives:** Scene Unlock: [Climb the Plug](../events/climb-the-plug.md)

### Climb the plug in the rain
- **When:** The demolition charges and a committed engineering plan (from [Michał Pytlak Saves the Village](../events/foreman-saves-village.md)); a climber willing to go up at flood peak
- **Outcome:** With the charges in hand and the flood cresting, the party goes back up to set the charge. Play [Climb the Plug in the Rain](../events/climb-the-plug-in-the-rain.md).
- **Gives:** Scene Unlock: [Climb the Plug in the Rain](../events/climb-the-plug-in-the-rain.md)
