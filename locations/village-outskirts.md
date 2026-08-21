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
- The southern approach slopes down into a long mild depression.
- The survey route can pass the old village ruins.
- One route passes the last house before the treeline, [Stanisław Rezeń](../characters/butcher.md)'s house.
- One route crosses the track used by Tadek Gajda's drinking crew.

## Opportunities

- **Spot the old village** `(requires: Observation on a survey route)` — Stone ruins are visible through the trees. → Gives: [old village was Lemko](../clues/clues.md#old-village-was-lemko), [old village was burned](../clues/clues.md#old-village-was-burned)
- **Spot Butcher at his house** `(requires: Observation on the route past [Stanisław Rezeń](../characters/butcher.md)'s house)` — Rezeń is alone near the treeline and using the same direction repeatedly. → Gives: [butcher-heads-toward-forest](../clues/clues.md#butcher-heads-toward-forest)
- **Spot the drinking crew heading into the forest** `(requires: Observation near the treeline track)` — Tadek Gajda and the crew carry bottles toward the forest. → Gives: [drinking-crew-heads-to-forest](../clues/clues.md#drinking-crew-heads-to-forest)

## Actions

### Bring Michał Pytlak on the survey
- **Requires:** [Michał Pytlak](../characters/foreman.md) agrees to come
- **Cost:** Free
- **Outcome:** Michał points out terrain features, old drainage paths, rain pooling, and the blocked notch in the ridge.
- **Gives:** World State Change: the southern approach, old-village bowl, and new-village bowl survey costs are waived.

### Survey the southern approach
- **Requires:** Geological knowledge
- **Cost:** 1 action; waived if the party has the maps from [Wojewoda's office](pgr-office.md) or Michał Pytlak along
- **Outcome:** The southern depression matches the map; water stays shallow and drains off without reaching the houses.
- **Gives:** [southern-approach-safe](../clues/clues.md#southern-approach-safe)

### Survey the old-village bowl
- **Requires:** Geological knowledge
- **Cost:** 1 action; waived with the office maps or Michał Pytlak
- **Outcome:** The old-village basin is the lowest local ground and matches the map.
- **Gives:** [old-village-basin-is-the-low-sink](../clues/clues.md#old-village-basin-is-the-low-sink)

### Survey the new-village bowl
- **Requires:** Geological knowledge
- **Cost:** 1 action; waived with the office maps or Michał Pytlak
- **Outcome:** %NEW_VILLAGE% sits above the flood line on firm ground if water can drain through the mapped ridge gap.
- **Gives:** [new-village-sits-above-flood-line](../clues/clues.md#new-village-sits-above-flood-line)

### Survey the ridge and the gap
- **Requires:** Geological knowledge and a reason to inspect the gap: the marked water-gap, Michał Pytlak's hint, [prof. Bieńkowski](../characters/professor.md#call-him-for-help--where-to-look), or the visible landslide plug
- **Cost:** 1 action
- **Outcome:** The mapped water-gap is plugged by an old landslide; floodwater cannot drain into the lower basin and backs up onto %NEW_VILLAGE%.
- **Gives:** [New Village will flood](../clues/clues.md#new-village-will-flood); [flood-cause-plugged-gap](../clues/clues.md#flood-cause-plugged-gap); Scene Unlock: "Tell Wojewoda with geological proof" at the [PGR office](pgr-office.md); Scene Unlock: [Foreman Saves the Village](../events/foreman-saves-village.md)

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
