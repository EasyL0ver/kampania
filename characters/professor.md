# prof. Tadeusz Bieńkowski

**Type:** Named character — outsider / catalyst

## Vital Statistics

- **Born:** 1930
- **Age in 1967:** 37
- **Heritage:** Polish
- **Lives in:** Kraków — university housing
- **Settled:** Not settled — contacted from outside the valley

## Character

Hydrologist connected to the Solina Dam project. He discovered the flood projections may be wrong and %NEW_VILLAGE% could be in the flood zone. If the players reach him by phone with evidence, the truth survives outside the valley.

## Appearance

- **Clothes:** Corduroy jacket with leather elbow patches, shirt pocket full of pens, city shoes wrong for fieldwork
- **Hair & face:** Thinning hair combed to one side, wire-rimmed glasses sliding down a narrow nose, ink-stained fingers
- **Carriage:** Lean, restless academic energy; forgets to eat, talks with both hands when excited

He speaks rapidly and precisely, in the clipped cadence of a lecturer who assumes the listener is following. When data catches him, his voice rises and he draws diagrams in the air.

## Opinions

- **[%NEW_VILLAGE%](../locations/village-outskirts.md)** — The projection holds only if the valley can drain. I know of two outlets, the ridge gap and the old far-ridge streambed. If both are closed, the village is in the flood zone. I cannot prove it from Kraków; someone has to check them on the ground.
- **The previous survey:** That report is thin. Too few stations, too much taken on faith. I would not trust the number behind it.
- **`new-village-will-flood`:** Then the suspicion was right, and the official map is wrong where it matters most.
- **`gap-is-blocked`:** One outlet gone. A landslide plug where the map shows a drain. Describe the fill and the sill height and I can document the error.

## Actions

### Call him for help — where to look
- **Requires:** A phone (his number routes through the [exchange](secondary-characters.md#operator-the-telephone-exchange-operator), like every outside call), and enough to make him listen — a reason to think the state's map is wrong
- **Cost:** 1 action
- **Outcome:** The party describes the two valleys and the ridge between them. He names the two outlets he knows, the ridge gap and the old far-ridge streambed, and asks the party to check whether water can still get out through either. He warns that the [previous crew's survey report](../items/geologists-kit.md) in their dossier is thin and should not be trusted. He has never heard of the PGR irrigation ditch.
- **Gives:** Scene Unlock: **"Walk to the ridge gap"** and **"Read the streambed benchmarks"** at the [village outskirts](../locations/village-outskirts.md); NPC State Change: he is engaged and waiting for the field readings.

### Certify the plug
- **Requires:** A phone, and the party has examined the fill at the toe and climbed to read the crest sill: holds [gap-fill-examined](../clues/clues.md#gap-fill-examined) and [gap-sill-above-flood](../clues/clues.md#gap-sill-above-flood)
- **Prompted by:** [gap-fill-examined](../clues/clues.md#gap-fill-examined), [gap-sill-above-flood](../clues/clues.md#gap-sill-above-flood)
- **Cost:** 1 action
- **Outcome:** The party describes the sill height at the crest and the packed clay and shattered rock behind it. He judges the water can neither top the plug nor seep through it into %BIG-BASIN%, and documents the ridge gap as a dead outlet.
- **Gives:** [gap-is-blocked](../clues/clues.md#gap-is-blocked)

### Certify the streambed
- **Requires:** A phone, and the party holds the two streambed elevations: [streambed-parameters](../clues/clues.md#streambed-parameters)
- **Prompted by:** [streambed-parameters](../clues/clues.md#streambed-parameters)
- **Cost:** 1 action
- **Outcome:** The party reads him the col height and the village height. He compares the two and certifies the col sits above house level, so the rising water tops the village long before it reaches the streambed: a dead outlet.
- **Gives:** [streambed-dead-ends](../clues/clues.md#streambed-dead-ends)

## Bond

- [ ] Reference his published work or show familiarity with hydrology
- [ ] Provide hard data — measurements, dates, observations from the field
- [ ] Call him back with follow-up information — show this isn't a one-time panic call
