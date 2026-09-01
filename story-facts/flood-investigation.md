# The Flood Investigation

Working design for how players learn that %NEW_VILLAGE% will flood. Lore and cause live in [The Miscalculation](the-miscalculation.md) and [Bieszczady Terrain](../historical%20context/18-bieszczady-terrain-and-landslides.md); this file is only about the investigation: the clue graph, the routes, and the red herrings.

## The Goal

Players reach [`new-village-will-flood`](../clues/clues.md#new-village-will-flood): the inhabited new village, not just the empty old one, is going under.

## The Suspicion (why the committee is sent)

prof. Bieńkowski suspects the Solina projection is wrong. The original calculation assumed the new-village valley drains, but no one ever field-checked the outlets it relies on. He knows of two: the ridge water-gap and the old far-ridge streambed. If both are blocked, the village is in the flood zone. He cannot prove it from Krakow. He needs someone on the ground to check them, which is why the committee is sent.

He does not know about the PGR irrigation ditch. That third outlet is a local, man-made feature off his maps, learned only from the villagers. [Zbigniew Gajda](../characters/wojewoda.md) is sure the ditch will do its job and carry the water off; [Michał Pytlak](../characters/foreman.md) has doubts. That split is the hook: players hear the ditch exists, hear it contested, and have to go settle it. Checking it yields `ditch-drains-nothing` and proves the wojewoda's confidence hollow. A party that trusts the professor's two-outlet list alone never even hears of the ditch. Completing the picture is `three-candidate-drains`: the professor's two plus the local ditch.

## The Clue Graph

Conclusion (three candidate outlets, same test, all fail):

- `new-village-will-flood` = `gap-is-blocked` AND `ditch-drains-nothing` AND `streambed-dead-ends`

The test for each is identical: when the lake rises, does the water get out here below house level? Gap: plugged. Ditch: too small. Streambed: col too high. None saves the village. No outlet is privileged, all three must be ruled out.

Leaf clues:

- `river-doesnt-match-map` — the real river doesn't run where the map draws it; the flow has shifted. The giveaway: the wojewoda built a bridge over the river's new course, but on the map that spot is dry ground and the river is drawn running elsewhere. The plug diverted the old course, and the bridge marks where the water actually went. A lead pointing downstream to the gap, not proof.
- `bridge-over-solid-land` — from reading the map alone: a bridge is drawn spanning dry ground, with the river drawn running elsewhere. The map contradicts itself. An armchair lead pointing at the gap, no fieldwork needed.
- `landslide-in-the-gap` — glance: a slide sits in the ridge water-gap. A lead, not proof.
- (testimony route) **Paraskewia Chyłak** (bond-gated) has watched this land for twenty years and saw the ground change. She frames it in folk terms, "the river wants its old bed back", giving `river-doesnt-match-map`, and she knows a slide came down in the gap, giving `landslide-in-the-gap`. She does not concern herself with the far-ridge streambed. The reward for treating her with respect; invisible to players who don't.
- `gap-is-blocked` — precise: the fill is impermeable, water will not pass through. Earned by physically climbing to the plug in the ridge water-gap and examining the fill (the climb is the access cost), then either:
  - With Geology: you read the fill and conclude it on-site, giving `gap-is-blocked`.
  - Without Geology: you describe what you saw and report it to prof. Bieńkowski (phone), who certifies `gap-is-blocked`. The judgment that the fill won't pass water needs a geologist, in person or down the line.
- `ditch-drains-nothing` — the PGR irrigation ditch cannot carry the flood off.
- `ditch-not-built-to-spec` — the report specifies a concrete-lined channel with real capacity. The ditch is built to that spec for only its first tenth (a proper concrete head near the fields), then degrades to an unlined dugout the rest of the way. Anyone who inspects only the head sees a fine channel and believes it; the truth needs walking the full length. A side-lead pointing at the ditch, not proof it fails.
- `streambed-dead-ends` — the old far-ridge streambed's col sits above house level, so the rising water tops the village before it ever reaches that outlet. The map draws the streambed honestly; it just never shows the elevation, so only a survey on the ground catches this.
- `streambed-never-drained` — a local remembers the streambed never carried water, even in the worst floods it just pools and stops against the rock. Testimony, an optional lead pointing at the streambed, not proof.
- (confirm route) The dam-survey crews left a **reper** (geodetic benchmark, stamped elevation) at the streambed col. Reading it against the village benchmark shows the col is higher. Requires finding the markers in the field.
  - With Geology: you read the two figures and conclude it yourself, giving `streambed-dead-ends`.
  - Without Geology: you can copy the numbers but can't interpret them. Hand them to prof. Bieńkowski (phone), who certifies `streambed-dead-ends` from the readings.
- `map-shows-gap-open` — the state map draws the gap as an open drain.
- `new-village-sits-above-flood-line` — on paper the village is safe.
- `water-tops-the-flood-line` — during the Day 3 storm, water on the new-village slope climbs about a metre above the surveyors' marked flood line. No skill needed, unmissable. The blunt empirical lead: the "safe" projection is already being exceeded. Contradicts `new-village-sits-above-flood-line`. Given by [The Flood](../events/the-flood.md); points at the threat, not proof it is permanent.
- `map-is-outdated` — the map predates the slide, so it cannot be trusted on the gap.
- `survey-was-faked` — the crew sent to re-check the terrain got drunk, drove a few stakes, and filed a thin report without ever really surveying the outlets. Negligence, not cynical forgery: they took the wojewoda's ditch on faith (they only saw its good concrete head) and dismissed the river as irrelevant. Partially responsible through laziness, not conspiracy. A root lead: it discredits all the official paper (map, projection, ditch spec) at once, feeding every drain rather than one. Reached by phone (survey archive), by local/bar testimony, by field evidence (too few, careless survey marks), or by reading the previous crew's report (item, below). A geologist in the party gets recognized and ribbed ("ah, so you like a drink too, eh?") because the last crew drank instead of working, which surfaces this outright.

Item:

- **The previous crew's survey report** — a signed, official-looking document in the committee's briefing dossier, so the geologist PC holds it from the start. prof. Bieńkowski flags it as sketchy at the briefing: he cannot prove it from Kraków, but it smells thin, and his unease points every party at the document (even one with no geologist) and gives non-specialists standing to distrust the official paper. A layman sees nothing wrong in the text itself. A geologist reading it spots the negligence (impossibly few field stations, cursory coverage, the ditch taken on faith), giving `survey-was-faked`. The paper counterpart to the drunk-crew gossip. The report also praises the wojewoda's "fine concrete irrigation ditch with ample drainage", true only of its first tenth: the crew saw the concrete head, believed it, and never walked the rest. That is the documented spec the real dugout contradicts (`ditch-not-built-to-spec`), and it is the source of the wojewoda's own genuine confidence in the ditch. The crew were not blind: the report notes the river changed course but dismisses it as irrelevant to drainage, which gives `river-doesnt-match-map` and is exactly backwards (the diversion is the symptom of the plugged gap, so the dismissal is the tell pointing there). It never mentions the gap or the streambed at all, so the report gives players nothing on those two, which stay fieldwork.

(Open: exact edges into `gap-is-blocked` and how `map-is-outdated` gates the rest. Fill in below.)

## Routes

(Draft. Each row is an independent way to make progress. We refine here.)

| Route | Gate | Gives |
|---|---|---|
| Ridge survey (on-site) | Geology | any drain conclusion from field data |
| Walk the terrain | Survival | `landslide-in-the-gap` |
| Climb to the plug | physical climb; then Geology on-site or report to prof | `gap-is-blocked` |
| Read the map | Bureaucracy / study | `map-shows-gap-open`, `bridge-over-solid-land`, `new-village-sits-above-flood-line` |
| Compare map to ground | observation | `river-doesnt-match-map` |
| Inspect the ditch | on-site; walk its full length (the head is concrete and misleads) | `ditch-drains-nothing`; `ditch-not-built-to-spec` vs the spec doc |
| Read the reper benchmarks | find markers; Geology or prof to interpret | `streambed-dead-ends` |
| Watch the storm | none | `water-tops-the-flood-line` |
| The phone | office phone, monitored by Zbigniew | `survey-was-faked` (archive); certify field data with prof. Bieńkowski |
| prof. Bieńkowski (phone) | hand him field readings | certifies any drain conclusion; `new-village-will-flood` |
| Radioman | in-village, but paranoid and dismissed | certifies drain data → `new-village-will-flood` |
| Recompute the flood line | engineering/math + real drain data + the master plan | `new-village-will-flood` |
| Paraskewia Chyłak | bond | `river-doesnt-match-map`, `landslide-in-the-gap` |
| Pawełek | just ask the boy | `landslide-in-the-gap` |
| Springs & cellars | Handiwork / observation in the new village | soft lead: the site sits too low |
| Local / bar gossip | talk to villagers | `streambed-never-drained`, `survey-was-faked` |
| Geologist in the party | recognized, ribbed about drinking | `survey-was-faked` |
| Read the previous crew's report | held from the start in the dossier | `river-doesnt-match-map`; with Geology: `survey-was-faked`, `ditch-not-built-to-spec` |
| Michał Pytlak | bond / engineering-talk | local certainty on the ditch |

Notes on the newer routes:

- **Radioman** is the crank who happens to be right. He can read the drain data and state flatly that the village will flood, but he warns of everything (Western radio, poisoned wells), so players are primed to dismiss the one time he is correct. An in-village certifier for parties who cannot reach the professor, wrapped in doubt.
- **Recompute the flood line** is the do-the-math confirm: given the real outlet data and the master plan's assumptions, an engineering-minded PC reruns the projection and gets `new-village-will-flood` with no NPC at all.
- **Pawełek** delivers the gap lead as a child's offhand fact ("you can't get through there anymore, it all caved in"), free and ungated.
- **Springs & cellars**: new-village ground is already wetter than the plan, cellars seep and springs run muddy. A soft lead that the site sits too low, pointing players to question the site before anyone climbs the gap. Not a hard clue.

## The Three Candidate Drains

Hydrology check: a sealed valley is not automatically doomed. The impounded water rises and escapes at the lowest available outlet. The village floods only if no outlet sits below house level. So players weigh three candidate outlets under the same test: when the lake rises, does the water get out here below the houses? All three fail, each for its own reason. Ruling out all three gives `new-village-will-flood`. (Mechanism: [Bieszczady Terrain, "The Lake Finds the Lowest Way Out"](../historical%20context/18-bieszczady-terrain-and-landslides.md).)

- **The ridge water-gap** (`gap-is-blocked`) — the przełom, the river's own outlet on the state map. False: a landslide has plugged it with impermeable fill; water will not pass.
- **The PGR irrigation ditch** (`ditch-drains-nothing`) — an engineered channel leading off the fields, the obvious built outflow. It begins as proper concrete for its first tenth, all anyone lazy ever inspected, then becomes a shallow unlined dugout the rest of the way. False: the dugout stretch carries nothing at flood volume. Only walking its full length reveals it; checking the head gives a false all-clear.
- **The old streambed on the far ridge** (`streambed-dead-ends`) — a dry watercourse that seems to spill over the ridge into the next valley. False: its col sits above house level, so the water tops the village before it ever reaches that outlet.

Each costs an action to check and returns a dead end. Holding all three gives `new-village-will-flood`.

## Red Herrings

- Southern depression: the eye-catching low path, actually drains safely (`southern-approach-safe`).
- Old-village basin filling: it is the empty old village going under (`old-village-flooding`, `old-village-basin-is-the-low-sink`). Wrong village.
- Solina reservoir: the dam floods the valley as everyone expects. The catch is simply that the flood line was miscalculated, so the new village, believed to sit above it, does not. Not a separate mystery, just a wrong number.
- The war plug: villagers claim the gap was blown shut by the 1940s fighting (UPA bunkers, army explosions). It is actually a natural flysch slide. Harmless either way, the cause never changes that the gap is blocked, but it can send players chasing a 1947 explanation that leads nowhere.

## Soft Corroboration (not proof)

- `wojewoda-already-suspects-flooding`
- Radioman's ranting

## Open Questions

1. ~~Exact edges into `gap-is-blocked`.~~ Resolved: climb to the plug, then Geology on-site or report to prof. Bieńkowski. The gap leads (`landslide-in-the-gap`, `river-doesnt-match-map`, `bridge-over-solid-land`) point you to climb but are not prerequisites.
2. ~~How `map-is-outdated` gates the map reads.~~ Resolved: players read the map freely and get the map clues (`map-shows-gap-open`, `new-village-sits-above-flood-line`), which they can carry to prof. Bieńkowski. The map stays reassuring until `map-is-outdated` (the date, the bridge, the river) flips it from safe-on-paper to damning.
3. Which routes give partial vs full knowledge.
4. ~~Solina herring: in or out.~~ Resolved: the flood line is simply miscalculated. The village sits above the projected line but below the real one. Not a separate Solina mystery.
