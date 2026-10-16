# Michał Pytlak

**Tags:** [@name](../tags/villager.md)

## Hook

[@first-name](foreman.md) [@surname](foreman.md), the PGR farm overseer, directing work around the farm.

## Vital Statistics

- **First name:** Michał
- **Surname:** Pytlak
- **Status:** Resident
- **Morning:** [@name](../locations/new-village/pgr-farm/pgr-farm.md)
- **Afternoon:** [@name](../locations/new-village/pgr-farm/pgr-farm.md)
- **Evening:** [@name](../locations/new-village/new-village.md)
- **Night:** [@name](../locations/new-village/new-village.md)
- **Born:** ~1910
- **Age in 1967:** ~57
- **Lives in:** [@name](../locations/new-village/new-village.md) — with [@name](zofia.md) (wife) and [@name](secondary/staszek-pytlak.md) (son, age 5)
- **Settled:** After 1954; knows nothing about the lynch

## Character

PGR farm overseer, competent, pragmatic, and loyal to [@name](wojewoda.md). He covered up [@name](tadeusz-mazur.md)'s death in the grain silo and now insists the village can still fight the flood.

## Setup

- **Clothes:** Wool flat cap in all weather, oil-stained trousers held up by braces, collarless shirt.
- **Hair & face:** Short cropped hair under the cap; broad jaw, flat nose broken once and set crooked, small shrewd eyes under heavy brows.
- **Carriage:** Stocky, barrel-chested, low to the ground; slight limp from an old tractor injury; hands drum, grip, and point.

Voice is a commanding bark with a Podkarpacie drawl. He uses words as instructions or verdicts, not decoration.

## Opinions

- **[@name](wojewoda.md)** — "I respected him because he always had a plan. Now he talks like surrender is wisdom, and I cannot follow that."
- **[@name](barbara.md)** — "She works hard, keeps quiet, and does not complain. That is worth respect."
- **[@name](zofia.md)** — "She sees the valley slipping away before I admit it. I cannot listen too long, because then I may have to stop digging."

## Mechanics

### On the survey

- **Type:** bool
- **Per:** world
- **Start:** false
- True once the committee brings him to the streambed.

### Cooperative

- **Type:** bool
- **Per:** world
- **Start:** false
- True when the committee tells [@first-name](wojewoda.md) the flood line may be miscalculated ([Reveal the risk of the village drowning](wojewoda.md#reveal-the-risk-of-the-village-drowning)); [@first-name](wojewoda.md) orders [@first-name](foreman.md) to help the committee.

### Fight

- **Type:** bool
- **Per:** world
- **Start:** false
- True when the gap is blown ([Gap blown](../events/climb-the-plug-in-the-rain.md#gap-blown)). The **Fight** ending.

## Opportunities

### Voice tightens while praising the ditch
- **Noticed by:** [Empathy](../cards/empathy.md)
- **When:** [Ask his opinion on the drain routes](#ask-his-opinion-on-the-drain-routes)
<!-- Prompted by: [ditch-is-candidate-drain](../clues/clues.md#ditch-is-candidate-drain) -->
- **Outcome:** His voice tightens and he won't meet your eye while praising the ditch.
- **Gives:** [foreman-uneasy-about-ditch](../clues/clues.md#foreman-uneasy-about-ditch)

## Actions

### Census interview
- **Cost:** 1 time
- **Outcome:** He answers quickly and gives himself, [@first-name](zofia.md), and [@first-name](secondary/staszek-pytlak.md).
- **Changes:** [Census](../items/census.md#census) — [@first-name](foreman.md), [@first-name](zofia.md), [@first-name](secondary/staszek-pytlak.md)

### Property assessment
- **Cost:** 1 time
- **Outcome:** He says he owns nothing: he lives in PGR quarters and the farm is state land. He treats questions about land value as odd.
- **Changes:** [Property Record](../items/census.md#property-record) — none, PGR housing; [Flood Awareness](wojewoda.md#flood-awareness) — [@first-name](foreman.md) mentions it, rises to suspicious

### Ask about the armed conflict
<!-- Prompted by: [old-wartime-positions](../clues/clues.md#old-wartime-positions) -->
- **Outcome:** No secret to him. He lays out the war years plainly: the whole range was cleared in '47 under Akcja Wisła, the people loaded up and sent west, and the partisans left old dugouts scattered through the forest, more than one, up in the hills. He does not know the bunkers from the inside, but he knows they are out there.
- **Gives:** [upa-bunkers-in-the-area](../clues/clues.md#upa-bunkers-in-the-area), [old-village-resettled-during-vistula](../clues/clues.md#old-village-resettled-during-vistula)

### Talk to him about the flood
<!-- Prompted by: [committee-runs-geographical-survey](../clues/clues.md#committee-runs-geographical-survey) -->
- **Outcome:** [@first-name](foreman.md) describes drainage ditches, sandbags, and water diversion as practical flood defences. He lays out the valley plainly: when the reservoir rises the water can only leave three ways, through the ridge gap, down his irrigation ditch, or over the far-ridge streambed. When the ditch comes up he is blunt: it is concrete only for a short run near the fields, an unlined dugout the rest of the way, and it will not carry a flood off.
- **Gives:** [ditch-is-candidate-drain](../clues/clues.md#ditch-is-candidate-drain)

### Tell him the flood line may be wrong
<!-- Prompted by: [the-flood-line-potentially-miscalculated](../clues/clues.md#the-flood-line-potentially-miscalculated) -->
- **Cost:** 1 time
- **Outcome:** [@first-name](foreman.md) goes still, then drops the reassurances. He admits the ditch is concrete only for a short run near the fields and an unlined dugout the rest of the way, and that it will not carry a flood off.
- **Gives:** [ditch-not-built-to-spec](../clues/clues.md#ditch-not-built-to-spec)
- **Changes:** [Flood Awareness](wojewoda.md#flood-awareness) — [@first-name](foreman.md) reports up, rises to suspicious

### Ask his opinion on the drain routes
<!-- Prompted by: [the-flood-line-potentially-miscalculated](../clues/clues.md#the-flood-line-potentially-miscalculated) -->
- **Cost:** 1 time
- **Outcome:** With nothing left to protect, [@first-name](foreman.md) walks the outlets from memory. He names the landslide sitting in the ridge gap, though he cannot say whether it seals the notch fully or leaks.[](#voice-tightens-while-praising-the-ditch)
- **Gives:** [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap)

### Ask where the surveyors have already been
- **When:** [Talk to him about the flood](#talk-to-him-about-the-flood)
<!-- Prompted by: [streambed-is-candidate-drain](../clues/clues.md#streambed-is-candidate-drain) -->
- **Cost:** 1 time
- **Outcome:** [@first-name](foreman.md) remembers the Solina dam survey crews working the valley years back. They set benchmark markers across it, up at the far-ridge streambed col and down by the village among them. "If it's the streambed's height you want, their marks are still out there."
- **Gives:** [dam-builders-surveyed-streambed](../clues/clues.md#dam-builders-surveyed-streambed)

### Bring him to the streambed
- **When:** [Talk to him about the flood](#talk-to-him-about-the-flood)
- **Cost:** 1 time
- **Outcome:** [@first-name](foreman.md) comes up to the far ridge and spends the fieldwork day working alongside the committee. He can join **only one** of the two streambed scenes, not both, and he sticks with whichever the party runs first.
  - In [@name](../events/surveying-the-streambed.md) he holds the staff for one leg of the line at no time cost to the party.
  - In [@name](../events/search-for-the-benchmarks.md) he searches one site himself: he watched the dam crews work and remembers roughly where they drove the markers, clearing that site for **2 cards** instead of 4.
- **Changes:** [Mechanics](../events/surveying-the-streambed.md#mechanics) — holds the staff for one leg, or; [Mechanics](../events/search-for-the-benchmarks.md#mechanics) — drops one site to 2, never both; [On the survey](#on-the-survey) — true

### Show him the streambed figures
- **Requires:** [@name](../items/streambed-parameters.md)
- **Cost:** 1 time
- **Outcome:** [@first-name](foreman.md) reads the two elevations without hesitation. He has worked this valley for years, and a col standing above house level tells him at once that the water tops the village long before it reaches the streambed. He confirms the streambed is no outlet.
- **Gives:** [streambed-dead-ends](../clues/clues.md#streambed-dead-ends)

### Borrow the anchor and hammer
- **When:** [Cooperative](#cooperative) is true
- **Cost:** 1 time
- **Outcome:** Under orders from [@first-name](wojewoda.md), [@first-name](foreman.md) hands over the steel clamp and driving hammer from the farm's gear without a second thought, on the understanding it comes back.
- **Gives:** [@name](../items/anchor.md)

### Talk him out of the anchor and hammer
- **Requires:** [Bond: Michał Pytlak](../cards/bond-foreman.md) OR [Speech](../cards/speech.md)
- **Cost:** 1 time
- **Outcome:** Bonded, he lends it as a favour; otherwise a convincing enough story pries the steel clamp and driving hammer out of a wary man, on the understanding they come back.
- **Gives:** [@name](../items/anchor.md)

### Press him about Tadeusz-Mazur
- **When:** NOT [@name](../locations/new-village/pgr-farm/pgr-farm.md)
<!-- Prompted by: [mazur-death-covered-up](../clues/clues.md#mazur-death-covered-up) -->
- **Cost:** 1 time
- **Outcome:** Put the books in front of him and the pragmatism drops. He has carried this since 1965 and it comes out plainly: he knew that silo could kill and always tended it himself, but he was tied up elsewhere and put [@surname](tadeusz-mazur.md), his most solid man, on it. [@surname](tadeusz-mazur.md) went up alone and never came back. He suspected the silo had him but could not justify dumping a full state store on a guess, and when he asked the sołtys to empty it he was told no. Two weeks later the smell proved him right. They buried the paperwork, and the sołtys kept the wage flowing to [@first-name](widow.md) so she would not starve. He asks one thing: that [@first-name](widow.md) never learn her pension is a dead man's wage.
- **Gives:** [`foreman-sent-mazur-in-his-place`](../clues/clues.md#foreman-sent-mazur-in-his-place)

## Bond

- [ ] Help with physical labor during the flood preparations — sandbags, drainage, anything with your hands.
- [ ] Show knowledge of engineering, farming, or practical infrastructure — speak his language.
- [ ] Do not mention the silo, the accident, or [@name](tadeusz-mazur.md) in your first two meetings.

## Grudge

- [ ] Ask directly about the silo accident or [@name](tadeusz-mazur.md)'s death.
- [ ] Threaten PGR workers with exposure or investigation.
- [ ] Refuse to help during the flood crisis when asked — be visibly useless.
