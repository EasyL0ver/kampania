# Far-Ridge Streambed

**Type:** Location (discoverable, revisitable)
**Location:** The far ridge across the valley from [@name](new-village.md); a dry col that appears to spill toward the next valley.
**Present:** none
**Available:** Any day; reached by crossing the valley and climbing to the far ridge from the [@name](village-outskirts.md) survey routes.
**Cost:** 1 action to reach; fieldwork costs vary by action.

## Hook

- A dry streambed on the far ridge, across the valley from [@name](new-village.md).

## Setup

- A dry streambed runs over the far ridge and appears to spill toward the next valley.
- The streambed's col (its high point) sits above [@name](new-village.md) house level, so water tops the village before it ever reaches here. Nothing on the ground announces this; only elevation figures show it.
- The map draws the streambed honestly but never marks the col's elevation.
- The dam-survey crews left stamped geodetic benchmarks (repery) at the col and beside [@name](new-village.md).
- The markers are old and half-buried; finding them takes searching.
- The col commands the whole valley: from here you look straight down on [@name](new-village.md), across to the [@name](old-village.md) ruins, and over the ground the reservoir will drown. It is the natural place to watch the valley from, and men have.
- Just below the col, under gorse and slid earth, a collapsed dugout with a firing slot faces the valley floor; rusted metal and a rotted timber lip still show. Partisans held this line in the war years.
- Only if the party turned up the hut on the benchmark search: an abandoned shepherd's koliba stands hidden in the gorse higher on the slope, its low doorway still up, a weathered ram's skull fixed over the lintel and marks cut into the frame, facing out. Parties who have not found it do not see it and get no koliba description.
- Getting the streambed's elevations plays out as one of two competing scenes: [@name](../events/surveying-the-streambed.md) or [@name](../events/search-for-the-benchmarks.md). Either yields the [@name](../items/streambed-parameters.md).

## Opportunities

- `(noticed by: [History](../cards/history.md) OR [Violence](../cards/violence.md))` — The collapsed dugout below the col is a wartime firing position, sited to watch and command the valley: rusted metal, a rotted timber lip, the shape of a partisan line. → Gives: [old-wartime-positions](../clues/clues.md#old-wartime-positions) <!-- Prompted by: [streambed-is-candidate-drain](../clues/clues.md#streambed-is-candidate-drain) -->
- `(noticed by: [abandoned-house-by-streambed](../clues/clues.md#abandoned-house-by-streambed) AND [Culture](../cards/culture.md))` — The tumbled stones and rotten roof-poles are a koliba, a Lemko shepherd's summer hut; the build and the worn pasture ground read as Greek Catholic hill herders' work, from before the valley was cleared. → Gives: [old-village-was-lemko](../clues/clues.md#old-village-was-lemko)
- `(noticed by: [abandoned-house-by-streambed](../clues/clues.md#abandoned-house-by-streambed))` — Ducking inside the hut, you find a single smoke-blackened room under the ram's skull, empty for decades yet armoured against the dark: ash crosses smeared across a long-cold hearth where the shepherd's watra once burned, iron driven into the threshold, the black remains of herb bundles hanging from the rafters, three-barred crosses cut so deep and so often into the timber that whole boards are furred with them. The wards all face outward, to keep something out. → Gives: [three-barred-cross-in-abandoned-house](../clues/clues.md#three-barred-cross-in-abandoned-house)
- `(when: inside the hut)` `(noticed by: [Culture](../cards/culture.md))` — Greek Catholic hill-herders' warding against wolves and the restless dead, the same tradition that mourns the unburied. Whatever they feared up here, they lined every surface against it, then one season walked down the mountain and never came back. → No clue; understanding.
- `(when: inside the hut)` `(noticed by: [Language](../cards/language.md))` — The scratched Cyrillic among the crosses holds names and a plea for the dead to lie still. → No clue.
- `(when: inside the hut)` `(noticed by: [Superstitious](../cards/superstitious.md))` — You do not read this room, you feel it, and you know exactly what it is warding against. → No clue; GM's call, **1 composure**.

## Actions

### Search the far ridge
- **When:** Time on the far ridge to cast around off the streambed itself
- **Cost:** 1 time
- **Outcome:** Quartering the slopes and gullies beyond the dry streambed, pushing through the gorse, you turn up an abandoned shepherd's koliba half-swallowed on the slope, easy to miss and long empty.
- **Gives:** [abandoned-house-by-streambed](../clues/clues.md#abandoned-house-by-streambed)

### Track the UPA bunker
- **Requires:** [Survival](../cards/survival.md)
<!-- Prompted by: [upa-bunkers-in-the-area](../clues/clues.md#upa-bunkers-in-the-area), [old-wartime-positions](../clues/clues.md#old-wartime-positions) -->
- **Cost:** 1 time
- **Outcome:** Working out from the firing position, a tracker picks up the old partisan paths worn between the hillside strongpoints and follows them to a camouflaged dugout deep in the forest northwest, its ventilation shafts breaking the slope. You now know exactly where the [@name](upa-bunker.md) lies.
- **Gives:** aware:locations/upa-bunker.md

### Start a survey
- **Requires:** [Geology](../cards/geology.md) AND [@name](../items/geologists-kit.md)
<!-- Prompted by: [streambed-is-candidate-drain](../clues/clues.md#streambed-is-candidate-drain) -->
- **Outcome:** The party commits to shooting the col's elevation themselves. Opens [@name](../events/surveying-the-streambed.md).
- **Gives:** aware:events/surveying-the-streambed.md

### Start a search
<!-- Prompted by: [dam-builders-surveyed-streambed](../clues/clues.md#dam-builders-surveyed-streambed) -->
- **Outcome:** The party commits to hunting the dam crews' benchmark markers. Opens [@name](../events/search-for-the-benchmarks.md).
- **Gives:** aware:events/search-for-the-benchmarks.md

<!-- Interpreting the streambed figures into streambed-dead-ends is done off-site: phone prof. Bieńkowski ("Certify the streambed"), read them as a surveyor with the geologist's kit, or show Michał Pytlak. -->
