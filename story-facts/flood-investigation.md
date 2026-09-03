# The Flood Investigation

Working design for how players learn that %NEW_VILLAGE% will flood. Lore and cause live in [The Miscalculation](the-miscalculation.md) and [Bieszczady Terrain](../historical%20context/18-bieszczady-terrain-and-landslides.md); this file is only about the investigation: the clue graph, the routes, and the red herrings.

## The Goal

Players reach [`new-village-will-flood`](../clues/clues.md#new-village-will-flood): the inhabited new village, not just the empty old one, is going under.

## The Suspicion (why the committee is sent)

prof. Bieńkowski suspects the Solina projection is wrong. The original calculation assumed the new-village valley drains, but no one ever field-checked the outlets it relies on. He knows of two: the ridge water-gap and the old far-ridge streambed. If both are blocked, the village is in the flood zone. He cannot prove it from Krakow. He needs someone on the ground to check them, which is why the committee is sent. He briefs the committee before departure ([The Car In](../events/the-car-in.md)), so the party starts holding `gap-is-candidate-drain` and `streambed-is-candidate-drain`.

He does not know about the PGR irrigation ditch. That third outlet is a local, man-made feature off his maps, learned only from the villagers. [Zbigniew Gajda](../characters/wojewoda.md) is sure the ditch will do its job and carry the water off; [Michał Pytlak](../characters/foreman.md) has doubts. That split is the hook: players hear the ditch exists, hear it contested, and have to go settle it. Michał naming it yields `ditch-is-candidate-drain`; checking it yields `ditch-drains-nothing` and proves the wojewoda's confidence hollow. A party that trusts the professor's two-outlet list alone never even hears of the ditch. The three candidate clues (`gap-is-candidate-drain`, `ditch-is-candidate-drain`, `streambed-is-candidate-drain`) are the leads that point players at each field test.

## The Clue Graph

Conclusion (three candidate outlets, same test, all fail):

- `new-village-will-flood` = `gap-is-blocked` AND `ditch-drains-nothing` AND `streambed-dead-ends`

The trap conclusion (one false positive is enough to stop looking):

- `new-village-will-not-flood` = `ditch-drains-fine`

The test for each is identical: when the lake rises, does the water get out here below house level? Gap: plugged. Ditch: too small. Streambed: col too high. None saves the village. No outlet is privileged, all three must be ruled out. The nastiness is asymmetric: proving the village floods needs all three outlets ruled out, but the reassuring answer needs only one to look open, and the ditch is the single outlet that hands out a false positive (`ditch-drains-fine`, the head-only calc). A party that runs the head calc and stops concludes `new-village-will-not-flood` and goes home. The gap's map-open reading and the streambed never even enter it. Only walking the ditch overturns it.

Leaf clues:

- `river-doesnt-match-map` — the real river doesn't run where the map draws it; the flow has shifted. The giveaway: the wojewoda built a bridge over the river's new course, but on the map that spot is dry ground and the river is drawn running elsewhere. The plug diverted the old course, and the bridge marks where the water actually went. A lead pointing downstream to the gap, not proof.
- `bridge-over-solid-land` — from reading the map alone: a bridge is drawn spanning dry ground, with the river drawn running elsewhere. The map contradicts itself. An armchair lead pointing at the gap, no fieldwork needed.
- `landslide-in-the-gap` — glance: a slide sits in the ridge water-gap. A lead, not proof.
- (testimony route) **Paraskewia Chyłak** (bond-gated) has watched this land for twenty years and saw the ground change. She frames it in folk terms, "the river wants its old bed back", giving `river-doesnt-match-map`, and she knows a slide came down in the gap, giving `landslide-in-the-gap`. She does not concern herself with the far-ridge streambed. The reward for treating her with respect; invisible to players who don't.
- `gap-fill-examined` — you climbed the plug and handled the fill: packed clay and shattered rock, not loose rubble. The observation, not yet the conclusion. The access cost for `gap-is-blocked`.
- `gap-is-blocked` — precise: the fill is impermeable, water will not pass through. Earned from `gap-fill-examined` (climbing to the plug and examining the fill), then either:
  - With Geology: you read the fill and conclude it on-site, giving `gap-is-blocked`.
  - Without Geology: you describe what you saw and report it to prof. Bieńkowski (phone), who certifies `gap-is-blocked`. The judgment that the fill won't pass water needs a geologist, in person or down the line.
- `ditch-drains-nothing` — the PGR irrigation ditch cannot carry the flood off.
- `ditch-drains-fine` — the trap. Run the drainage tables on the concrete head alone and the ditch reads fine, a channel of ample capacity that clears the flood. It is the report's all-clear and it is false: the sum covers only the concrete stretch, not the earth dugout that is most of the ditch. A geologist can reach it early, standing at the head with the kit and no need to walk. It baits a party into crossing the ditch off. Overturned only by walking the full length (`ditch-concrete-stops-short`) and rerunning the numbers over the real channel, which gives `ditch-drains-nothing`.
- `ditch-concrete-stops-short` — the raw field tell: walk the ditch and the concrete gives out a short way down, the rest a plain earth dugout. It does not by itself say whether that is a fault, a shortfall against spec, or the intended build, nor whether the ditch can carry the flood. It is what unlocks both the spec check (`ditch-not-built-to-spec`) and, via the dugout measurements, the real drainage recalculation (`ditch-drains-nothing`).
- `concrete-ditch-measurements` / `dugout-measurements` — the raw cross-sections of the two ditch stretches, taken with a tape, no skill. The head figures can be had at the concrete head straight away and feed the trap calc; the dugout figures need walking down to where the concrete gives out (`ditch-concrete-stops-short`). Both together are what the real recalculation consumes.
- `ditch-not-built-to-spec` — the PGR construction spec (an office file, not the survey report) specifies a concrete-lined channel the full run with real capacity. The ditch is built to that spec for only its first tenth (a proper concrete head near the fields), then degrades to an unlined dugout the rest of the way. Proven by pulling the spec file from the PGR office and setting it against a walked ditch. Anyone who inspects only the head sees a fine channel and believes it; the truth needs walking the full length. A side-lead pointing at the ditch, not proof it fails.
- `dam-builders-surveyed-streambed` — the Solina dam crews already set benchmarks at the streambed col and by the village, so the markers are out there to read. Learned two ways: a geologist reading the kit's dam-survey index (where it is only implied, a layman sees a dull station list), or a cooperative Michał Pytlak, who remembers the dam crews and tells you plainly. This is what makes the reper hunt possible.
- `streambed-parameters` — the two raw elevations that settle the streambed: the far-ridge col height and the village height. Two competing scenes, both expensive. A geologist surveys it fresh once they know it is a candidate outlet ([Surveying the Streambed](../events/surveying-the-streambed.md)): a level line with the kit, a full day of fieldwork, about 6 cards solo, cut to a floor of 3 if other PCs assist. Or anyone hunts down the dam-survey **reper** benchmarks in the field ([Search for the Benchmarks](../events/search-for-the-benchmarks.md), no skill, two markers at 4 cards each = 8, halved to 4 with a Survival read of the ground), which first requires knowing the markers exist (`dam-builders-surveyed-streambed`). Raw data, not yet the conclusion.
- `streambed-dead-ends` — the old far-ridge streambed's col sits above house level, so the rising water tops the village before it ever reaches that outlet. The map draws the streambed honestly; it just never shows the elevation, so only a survey on the ground catches this.
- `streambed-never-drained` — a local remembers the streambed never carried water, even in the worst floods it just pools and stops against the rock. Testimony, an optional lead pointing at the streambed, not proof.
- (confirm route) Holding `streambed-parameters`, someone turns the two figures into the conclusion. With Geology you read them yourself; without Geology you read them to prof. Bieńkowski by phone, or show them to Michał Pytlak, who knows the valley well enough to call it. Any of the three gives `streambed-dead-ends`.
- `map-shows-gap-open` — the state map draws the gap as an open drain.
- `new-village-sits-above-flood-line` — on paper the village is safe.
- `water-tops-the-flood-line` — during the Day 3 storm, water on the new-village slope climbs about a metre above the surveyors' marked flood line. No skill needed, unmissable. The blunt empirical lead: the "safe" projection is already being exceeded. Contradicts `new-village-sits-above-flood-line`. Given by [The Flood](../events/the-flood.md); points at the threat, not proof it is permanent.
- `map-is-outdated` — the map predates the slide, so it cannot be trusted on the gap.
- `survey-was-botched` — the conclusion that the official survey is worthless: a drunk crew drove a few stakes and filed thin paper without ever really surveying the outlets. Negligence, not cynical forgery: they took the wojewoda's ditch on faith (they only saw its good concrete head) and dismissed the river as irrelevant. Partially responsible through laziness, not conspiracy. A root lead: it discredits all the official paper (map, projection, ditch spec) at once, feeding every drain rather than one. It is built from two smaller facts, one from each side, and needs both: `geologists-were-drinking` (testimony that the crew drank through the visit, from the radioman or a drinking-buddy at Tadek's still) and `original-report-is-thin` (the filed report reads as too few stations, cursory coverage, ditch on faith, reached by phone to the survey archive or a geologist reading the dossier report). Either alone is only suggestive: drinking is hearsay, thin paper could be mere incompetence. Together they make the botched-job case. A geologist drinking with the crew also gets ribbed as one of the same breed, giving the separate lead `surveyors-are-known-drunks`, which points straight at the last crew's drinking.
- `survey-was-faked` — the darker reading of the same facts: that the thin survey was not lazy but deliberately falsified, a manufactured all-clear so the village would be built where it drowns. This is the radioman's leap, and his alone. He drank with the crew and, teacher that he was, read how little work backed their report (so he is a source for both `geologists-were-drinking` and `original-report-is-thin`), but his paranoia stacks intent on top of what is really negligence. A player weighing him has to decide whether the pattern is real or the bimber talking. The truth of the campaign is `survey-was-botched`; `faked` is the conspiracy version, sourced only from an unreliable narrator.

Item:

- **The previous crew's survey report** — a signed, official-looking document in the committee's briefing dossier, so the geologist PC holds it from the start. prof. Bieńkowski flags it as sketchy at the briefing: he cannot prove it from Kraków, but it smells thin, and his unease points every party at the document (even one with no geologist) and gives non-specialists standing to distrust the official paper. A layman sees nothing wrong in the text itself. A geologist reading it spots the negligence (impossibly few field stations, cursory coverage, the ditch taken on faith), giving `original-report-is-thin`. The paper counterpart to the drunk-crew gossip (`geologists-were-drinking`); the two together give `survey-was-botched`. The report also praises the wojewoda's "fine concrete irrigation ditch with ample drainage", true only of its first tenth: the crew saw the concrete head, believed it, and never walked the rest. That praise is the source of the wojewoda's own genuine confidence in the ditch (the failure against spec is proven separately, from the PGR office's construction spec set against a walked ditch, `ditch-not-built-to-spec`). The crew were not blind: the report notes the river changed course but dismisses it as irrelevant to drainage, which gives `river-doesnt-match-map` and is exactly backwards (the diversion is the symptom of the plugged gap, so the dismissal is the tell pointing there). It never mentions the gap or the streambed at all, so the report gives players nothing on those two, which stay fieldwork.

(Open: exact edges into `gap-is-blocked` and how `map-is-outdated` gates the rest. Fill in below.)

## Routes

(Draft. Each row is an independent way to make progress. We refine here.)

| Route | Gate | Gives |
|---|---|---|
| Ridge survey (on-site) | Geology | any drain conclusion from field data |
| Walk the terrain | Survival | `landslide-in-the-gap` |
| Climb the plug | physical climb | `gap-fill-examined` |
| Read the fill | Geology on-site, or report to prof | `gap-is-blocked` |
| Read the map | Bureaucracy / study | `map-shows-gap-open`, `bridge-over-solid-land`, `new-village-sits-above-flood-line` |
| Compare map to ground | observation | `river-doesnt-match-map` |
| Inspect the ditch | on-site; walk its full length (the head is concrete and misleads) | `ditch-concrete-stops-short`; head-only drainage calc gives the trap `ditch-drains-fine`; walking + recalc gives `ditch-drains-nothing`; walked ditch vs the PGR office spec file gives `ditch-not-built-to-spec` |
| Surveying the Streambed (event) | Geology + kit; helpers speed it; at [Far-Ridge Streambed] | `streambed-parameters` (a full day, ~6 cards solo, floor 3 with help) |
| Search for the Benchmarks (event) | search for old markers; no skill; at [Far-Ridge Streambed] | `streambed-parameters` (8 cards, 4 with Survival) |
| Interpret the streambed figures | hold `streambed-parameters`; Geology, prof by phone, or show Pytlak | `streambed-dead-ends` |
| Watch the storm | none | `water-tops-the-flood-line` |
| The phone | office phone, monitored by Zbigniew | `original-report-is-thin` (archive); certify field data with prof. Bieńkowski |
| prof. Bieńkowski (phone) | hand him field readings | certifies any drain conclusion; `new-village-will-flood` |
| Radioman | ask him about the survey; in-village, paranoid and dismissed | `geologists-were-drinking` + `original-report-is-thin`; pressed, his paranoid leap gives `survey-was-faked` |
| Recompute the flood line | engineering/math + real drain data + the master plan | `new-village-will-flood` |
| Paraskewia Chyłak | bond | `river-doesnt-match-map`, `landslide-in-the-gap` |
| Pawełek | just ask the boy | `landslide-in-the-gap` |
| Springs & cellars | Handiwork / observation in the new village | soft lead: the site sits too low |
| Local / bar gossip | talk to villagers | `streambed-never-drained`, `geologists-were-drinking` |
| Geologist in the party | recognized, ribbed about drinking | `surveyors-are-known-drunks` |
| Read the previous crew's report | held from the start in the dossier | `river-doesnt-match-map`; with Geology: `original-report-is-thin` |
| Pull the ditch construction spec | PGR office file, then set against a walked ditch | `ditch-not-built-to-spec` |
| Michał Pytlak | bond / engineering-talk | local certainty on the ditch |

Notes on the newer routes:

- **Radioman** is the crank who happens to be right. He drank with the last survey crew when they passed through and watched them do nothing but empty bottles, and read how thin their filed work was, so asking him about the survey gives `geologists-were-drinking` and `original-report-is-thin`. Pressed, his paranoia leaps to a deliberate state plot to drown the village (`survey-was-faked`): the observations are gold, the conspiracy on top is froth. He warns of everything (Western radio, poisoned wells), so players are primed to dismiss the one time he is telling the truth. A local mouth on the botched survey, wrapped in doubt.
- **Recompute the flood line** is the do-the-math confirm: given the real outlet data and the master plan's assumptions, an engineering-minded PC reruns the projection and gets `new-village-will-flood` with no NPC at all.
- **Pawełek** delivers the gap lead as a child's offhand fact ("you can't get through there anymore, it all caved in"), free and ungated.
- **Springs & cellars**: new-village ground is already wetter than the plan, cellars seep and springs run muddy. A soft lead that the site sits too low, pointing players to question the site before anyone climbs the gap. Not a hard clue.

## The Three Candidate Drains

Hydrology check: a sealed valley is not automatically doomed. The impounded water rises and escapes at the lowest available outlet. The village floods only if no outlet sits below house level. So players weigh three candidate outlets under the same test: when the lake rises, does the water get out here below the houses? All three fail, each for its own reason. Ruling out all three gives `new-village-will-flood`. (Mechanism: [Bieszczady Terrain, "The Lake Finds the Lowest Way Out"](../historical%20context/18-bieszczady-terrain-and-landslides.md).)

- **The ridge water-gap** (`gap-is-blocked`) — the przełom, the river's own outlet on the state map. False: a landslide has plugged it with impermeable fill; water will not pass.
- **The PGR irrigation ditch** (`ditch-drains-nothing`) — an engineered channel leading off the fields, the obvious built outflow. It begins as proper concrete for its first tenth, all anyone lazy ever inspected, then becomes a shallow unlined dugout the rest of the way. False: the dugout stretch carries nothing at flood volume. Worse than a blind spot, it is a trap: run the drainage tables on the concrete head alone and it comes up fine (`ditch-drains-fine`), so a hasty party crosses it off. Only walking its full length reveals the dugout and lets the numbers be rerun on the real channel.
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
