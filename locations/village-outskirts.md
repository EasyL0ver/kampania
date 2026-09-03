# Village Outskirts

**Type:** Location (revisitable, multi-trip)
**Location:** Terrain around the village — river, hillsides, forest edges.
**Present:** Survey party; [Michał Pytlak](../characters/foreman.md) (if invited)
**Available:** Any day; geological survey requires geological knowledge.
**Cost:** 1 action per site surveyed; full survey is four sites; office maps or Michał Pytlak waive the three easy sites

## Setup

- The terrain includes the river, hillsides, forest edges, ridges, and valley floors around %NEW_VILLAGE%.
- The survey uses an old military topographic map and instruments.
- The map is outdated.
- The river has shifted.
- The river is higher than expected.
- Soil near the valley floor is saturated.
- The local geology is Carpathian flysch: hard sandstone ridges over soft, slip-prone shale.
- Long parallel ridges separate valleys.
- Streams cross ridges through narrow water-gaps.
- %NEW_VILLAGE% sits in one valley.
- [%OLD_VILLAGE%](old-village-ruins.md) lies in the lower valley beyond a sandstone ridge.
- The map marks a water-gap through the ridge between the new-village valley and old-village basin.
- The marked water-gap is blocked by loose earth and broken rock from an old landslide.
- A far ridge across the valley carries an old dry streambed that appears to spill toward the next valley.
- Survey crews left stamped benchmark markers (repery) at the streambed col and beside %NEW_VILLAGE%.
- The wojewoda's new bridge spans the river's present bed; on the map that ground is drawn dry, with the river on its old course.
- The southern approach slopes down into a long mild depression.
- The survey route can pass the old village ruins.
- One route passes the last house before the treeline, [Stanisław Rezeń](../characters/butcher.md)'s house.
- One route crosses the track used by Tadek Gajda's drinking crew.

## Opportunities

- **Spot the old village** `(requires: Survival on a survey route)` — Stone ruins are visible through the trees. → Gives: [old village was Lemko](../clues/clues.md#old-village-was-lemko), [old village was burned](../clues/clues.md#old-village-was-burned)
- **Spot Butcher at his house** `(requires: Finesse on the route past [Stanisław Rezeń](../characters/butcher.md)'s house)` — Rezeń is alone near the treeline and using the same direction repeatedly. → Gives: [butcher-heads-toward-forest](../clues/clues.md#butcher-heads-toward-forest)
- **Spot the drinking crew heading into the forest** `(requires: Survival near the treeline track)` — Tadek Gajda and the crew carry bottles toward the forest. → Gives: [drinking-crew-heads-to-forest](../clues/clues.md#drinking-crew-heads-to-forest)
- **See the landslide plug** `(requires: Survival on a survey route)` `(prompted by: [committee-runs-geographical-survey](../clues/clues.md#committee-runs-geographical-survey))` — The notch in the ridge is choked with fallen rock and earth. → Gives: [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap)
- **The fill won't pass water** `(requires: holding [`gap-fill-examined`](../clues/clues.md#gap-fill-examined) and Geology)` — the packed clay and shattered rock will not pass water; the gap is sealed. → Gives: [gap-is-blocked](../clues/clues.md#gap-is-blocked)
- **The river isn't where the map draws it** `(requires: observation comparing map to ground)` `(prompted by: [committee-runs-geographical-survey](../clues/clues.md#committee-runs-geographical-survey))` — The wojewoda's bridge spans running water, but the map shows that ground dry and the river on its old course. → Gives: [river-doesnt-match-map](../clues/clues.md#river-doesnt-match-map)

## Actions

### Bring Michał Pytlak on the survey
- **Requires:** [Michał Pytlak](../characters/foreman.md) agrees to come
- **Cost:** Free
- **Outcome:** Michał points out terrain features, old drainage paths, rain pooling, and the blocked notch in the ridge.
- **Gives:** World State Change: the southern approach, old-village bowl, and new-village bowl survey costs are waived.

### Survey the southern approach
- **Requires:** Geological knowledge
- **Prompted by:** [committee-runs-geographical-survey](../clues/clues.md#committee-runs-geographical-survey)
- **Cost:** 1 action; waived if the party has the maps from [Wojewoda's office](pgr-office.md) or Michał Pytlak along
- **Outcome:** The southern depression matches the map; water stays shallow and drains off without reaching the houses.
- **Gives:** [southern-approach-safe](../clues/clues.md#southern-approach-safe)

### Survey the old-village bowl
- **Requires:** Geological knowledge
- **Prompted by:** [committee-runs-geographical-survey](../clues/clues.md#committee-runs-geographical-survey)
- **Cost:** 1 action; waived with the office maps or Michał Pytlak
- **Outcome:** The old-village basin is the lowest local ground and matches the map.
- **Gives:** [old-village-basin-is-the-low-sink](../clues/clues.md#old-village-basin-is-the-low-sink)

### Survey the new-village bowl
- **Requires:** Geological knowledge
- **Prompted by:** [committee-runs-geographical-survey](../clues/clues.md#committee-runs-geographical-survey)
- **Cost:** 1 action; waived with the office maps or Michał Pytlak
- **Outcome:** %NEW_VILLAGE% sits above the flood line on firm ground if water can drain through the mapped ridge gap.
- **Gives:** [new-village-sits-above-flood-line](../clues/clues.md#new-village-sits-above-flood-line)

### Walk to the ridge gap
- **Requires:** Reaching the ridge water-gap (visible from the survey routes)
- **Prompted by:** [gap-is-candidate-drain](../clues/clues.md#gap-is-candidate-drain); [river-doesnt-match-map](../clues/clues.md#river-doesnt-match-map); [bridge-over-solid-land](../clues/clues.md#bridge-over-solid-land)
- **Cost:** 1 action
- **Outcome:** You reach the notch. A landslide has choked the gap with fallen rock and earth. Whether that fill actually stops the water is a further question, settled by climbing the plug for a geological read on-site or by describing it to [prof. Bieńkowski](../characters/professor.md).
- **Gives:** [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap); Scene Unlock: [Foreman Saves the Village](../events/foreman-saves-village.md)

### Climb the plug
- **Requires:** [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap), and physically climbing the fallen fill in the notch
- **Prompted by:** [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap)
- **Cost:** 1 action
- **Outcome:** You scramble up the plug and get your hands on the fill. It is dense clay and shattered rock packed tight, not the loose rubble it looks like from below. Whether that seals the gap is a read for a geologist or for [prof. Bieńkowski](../characters/professor.md).
- **Gives:** [gap-fill-examined](../clues/clues.md#gap-fill-examined)

### Survey the streambed col
- **Requires:** Reaching the far-ridge streambed col with the [geologist's kit](../items/geologists-kit.md), and **Geology**. Other PCs can assist to speed the work.
- **Prompted by:** [streambed-is-candidate-drain](../clues/clues.md#streambed-is-candidate-drain)
- **Cost:** A full day of fieldwork. Running a level line from the col down to the village over rough ground, setting the instrument up again every short stretch, takes the geologist most of a day: about **6 cards** working alone. Each PC who assists (hauling the level, holding the staff, recording) cuts it by 1 card, to a floor of **3**.
- **Outcome:** With the level and clinometer you shoot the col and the village yourself and record both heights: the raw figures for the outlet.
- **Gives:** [streambed-parameters](../clues/clues.md#streambed-parameters)

### Read the reper benchmarks
- **Requires:** Searching the far ridge and the village edge for the dam-survey markers. No skill needed to copy them once found.
- **Prompted by:** [streambed-is-candidate-drain](../clues/clues.md#streambed-is-candidate-drain); [dam-builders-surveyed-streambed](../clues/clues.md#dam-builders-surveyed-streambed)
- **Cost:** Time-consuming and open-ended: the markers are old and half-buried, so the search runs an unknown number of actions (GM's call) before anyone can read them.
- **Outcome:** The dam-survey crews left stamped geodetic benchmarks at the col and by the village. Once the markers are found, anyone can copy the two elevations off them, no skill needed.
- **Gives:** [streambed-parameters](../clues/clues.md#streambed-parameters)

### Report the figures to the professor
- **Requires:** Holding [streambed-parameters](../clues/clues.md#streambed-parameters), and a phone
- **Cost:** 1 action
- **Outcome:** You read the figures to [prof. Bieńkowski](../characters/professor.md) by phone, who compares the two elevations and certifies the streambed is no outlet.
- **Gives:** [streambed-dead-ends](../clues/clues.md#streambed-dead-ends)

### Wander the forest
- **Requires:** Nothing
- **Cost:** 1 action
- **Outcome:** The GM gives one missing forest lead from bottle glass and cold ash, deep boot-prints, woodsmoke and burnt herbs, collapsed dugouts and rusted metal, [Edek Barnaś](../characters/glupek.md) moving toward the old village, or [Stanisław Rezeń](../characters/butcher.md) watching from the treeline.
- **Gives:** [drinking-crew-heads-to-forest](../clues/clues.md#drinking-crew-heads-to-forest); [butcher-heads-toward-forest](../clues/clues.md#butcher-heads-toward-forest); [hag-exists](../clues/clues.md#hag-exists); [old-wartime-positions](../clues/clues.md#old-wartime-positions); [glupek-drawn-to-well](../clues/clues.md#glupek-drawn-to-well); World State Change: Rezeń notices the party if he is the lead shown.

### Follow the drinking crew
- **Requires:** [drinking-crew-heads-to-forest](../clues/clues.md#drinking-crew-heads-to-forest)
- **Cost:** 1 action
- **Outcome:** The trail leads to the [bimber still](bimber-still.md).
- **Gives:** [bimber-still](../clues/clues.md#bimber-still); Scene Unlock: [bimber still](bimber-still.md)

### Follow the Butcher's path
- **Requires:** [butcher-heads-toward-forest](../clues/clues.md#butcher-heads-toward-forest)
- **Cost:** 1 action
- **Outcome:** Rezeń's trail leads past the old village toward the ridge.
- **Gives:** [butcher-visits-the-well](../clues/clues.md#butcher-visits-the-well)

### Follow the smoke
- **Requires:** [hag-exists](../clues/clues.md#hag-exists)
- **Cost:** 1 action
- **Outcome:** Woodsmoke and burning herbs lead to the [hag's cabin](hags-cabin.md).
- **Gives:** Scene Unlock: [hag's cabin](hags-cabin.md)

### Search the old wartime positions
- **Requires:** The military map from [Wojewoda's office](pgr-office.md), or Michał Pytlak's terrain hints
- **Cost:** 1 action
- **Outcome:** The search finds collapsed dugouts and rusted metal.
- **Gives:** [old-wartime-positions](../clues/clues.md#old-wartime-positions)

### Look for the UPA bunker
- **Requires:** [old-wartime-positions](../clues/clues.md#old-wartime-positions), or word that a partisan bunker is out here ([upa-bunker](../clues/clues.md#upa-bunker))
- **Cost:** 1 action
- **Outcome:** Ventilation shafts and a hidden entrance reveal the [UPA bunker](upa-bunker.md); [Edek Barnaś](../characters/glupek.md) may be near the mouth.
- **Gives:** [upa-bunker](../clues/clues.md#upa-bunker); Scene Unlock: [UPA bunker](upa-bunker.md)
