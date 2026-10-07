# Michał Pytlak

**Type:** Named character — farm overseer

## Hook

Michał Pytlak, the PGR farm overseer, directing work around the farm.

## Vital Statistics

- **Status:** Resident
- **Born:** ~1910
- **Age in 1967:** ~57
- **Lives in:** [%NEW_VILLAGE%](../locations/new-village.md) — with Zofia Pytlak (wife) and Staszek Pytlak (son, age 5)
- **Settled:** After 1954; knows nothing about the lynch

## Character

PGR farm overseer, competent, pragmatic, and loyal to [Zbigniew Gajda](wojewoda.md). He covered up Tadeusz Mazur's death in the grain silo and now insists the village can still fight the flood.

## Appearance

- **Clothes:** Wool flat cap in all weather, oil-stained trousers held up by braces, collarless shirt.
- **Hair & face:** Short cropped hair under the cap; broad jaw, flat nose broken once and set crooked, small shrewd eyes under heavy brows.
- **Carriage:** Stocky, barrel-chested, low to the ground; slight limp from an old tractor injury; hands drum, grip, and point.

Voice is a commanding bark with a Podkarpacie drawl. He uses words as instructions or verdicts, not decoration.

## Opinions

- **[Zbigniew Gajda](wojewoda.md)** — "I respected him because he always had a plan. Now he talks like surrender is wisdom, and I cannot follow that."
- **[Barbara Kopacz](barbara.md)** — "She works hard, keeps quiet, and does not complain. That is worth respect."
- **[Zofia Pytlak](zofia.md)** — "She sees the valley slipping away before I admit it. I cannot listen too long, because then I may have to stop digging."

## Mechanics

### If he learns the flood line may be wrong

Michał backs [Zbigniew Gajda](wojewoda.md)'s optimistic line only while he believes the village is safe. The moment the committee tells him [the-flood-line-potentially-miscalculated](../clues/clues.md#the-flood-line-potentially-miscalculated), he comes to know it himself (tracked as `foreman: the-flood-line-potentially-miscalculated`), grasps the valley may actually drown, and stops covering for the ditch. He then speaks plainly about the flood, unlocking "Ask his opinion on the drain routes". Zbigniew ordering him to help (see wojewoda's ["Tell him about the flood risk"](wojewoda.md#tell-him-about-the-flood-risk)) tells him the same thing.

## Opportunities

- **The ditch shames him** `(noticed by: [ditch-is-candidate-drain](../clues/clues.md#ditch-is-candidate-drain) AND [Empathy](../cards/empathy.md))` — As Michał talks up his irrigation ditch, his voice tightens and he will not hold your eye on it. He does not believe his own reassurance: the concrete runs only a short way and he knows it. → Gives: [ditch-not-built-to-spec](../clues/clues.md#ditch-not-built-to-spec)

## Actions

### Census interview
- **Cost:** 1 time
- **Outcome:** He answers quickly and gives himself, Zofia, and Staszek.
- **Gives:** Census data — Michał, Zofia, Staszek.

### Property assessment
- **Cost:** 1 time
- **Outcome:** He says he owns nothing: he lives in PGR quarters and the farm is state land. He treats questions about land value as odd.
- **Gives:** Property record — none; PGR housing.

### Ask about the armed conflict
- **Prompted by:** [old-wartime-positions](../clues/clues.md#old-wartime-positions)
- **Outcome:** No secret to him. He lays out the war years plainly: the whole range was cleared in '47 under Akcja Wisła, the people loaded up and sent west, and the partisans left old dugouts scattered through the forest, more than one, up in the hills. He does not know the bunkers from the inside, but he knows they are out there.
- **Gives:** [upa-bunkers-in-the-area](../clues/clues.md#upa-bunkers-in-the-area); [old-village-resettled-during-vistula](../clues/clues.md#old-village-resettled-during-vistula)

### Talk to him about the flood
- **When:** [Michał Pytlak](foreman.md) present
- **Prompted by:** [committee-runs-geographical-survey](../clues/clues.md#committee-runs-geographical-survey)
- **Outcome:** Michał describes drainage ditches, sandbags, and water diversion as practical flood defences. He lays out the valley plainly: when the reservoir rises the water can only leave three ways, through the ridge gap, down his irrigation ditch, or over the far-ridge streambed. When the ditch comes up he is blunt: it is concrete only for a short run near the fields, an unlined dugout the rest of the way, and it will not carry a flood off.
- **Gives:** [ditch-is-candidate-drain](../clues/clues.md#ditch-is-candidate-drain); NPC State Change: Michał Pytlak becomes willing to coordinate flood defence work with the committee.

### Tell him the flood line may be wrong
- **Prompted by:** [the-flood-line-potentially-miscalculated](../clues/clues.md#the-flood-line-potentially-miscalculated)
- **Cost:** 1 time
- **Outcome:** Michał goes still, then drops the reassurances. He admits the ditch is concrete only for a short run near the fields and an unlined dugout the rest of the way, and that it will not carry a flood off.
- **Gives:** [ditch-not-built-to-spec](../clues/clues.md#ditch-not-built-to-spec); NPC Learns: foreman: [the-flood-line-potentially-miscalculated](../clues/clues.md#the-flood-line-potentially-miscalculated).

### Ask his opinion on the drain routes
- **When:** foreman: [the-flood-line-potentially-miscalculated](../clues/clues.md#the-flood-line-potentially-miscalculated)
- **Cost:** 1 time
- **Outcome:** With nothing left to protect, Michał walks the outlets from memory. He names the landslide sitting in the ridge gap, though he cannot say whether it seals the notch fully or leaks.
- **Gives:** [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap)

### Ask where the surveyors have already been
- **When:** [Michał Pytlak](foreman.md) willing to coordinate on the flood (after [Talk to him about the flood](#talk-to-him-about-the-flood))
- **Prompted by:** [streambed-is-candidate-drain](../clues/clues.md#streambed-is-candidate-drain)
- **Cost:** 1 time
- **Outcome:** Michał remembers the Solina dam survey crews working the valley years back. They set benchmark markers across it, up at the far-ridge streambed col and down by the village among them. "If it's the streambed's height you want, their marks are still out there."
- **Gives:** [dam-builders-surveyed-streambed](../clues/clues.md#dam-builders-surveyed-streambed)

### Bring him to the streambed
- **When:** [Michał Pytlak](foreman.md) willing to coordinate on the flood (after [Talk to him about the flood](#talk-to-him-about-the-flood))
- **Cost:** 1 time
- **Outcome:** Michał comes up to the far ridge and spends the fieldwork day working alongside the committee. He can join **only one** of the two streambed scenes, not both, and he sticks with whichever the party runs first.
  - In [Surveying the Streambed](../events/surveying-the-streambed.md) he holds the staff for one leg of the line at no time cost to the party.
  - In [Search for the Benchmarks](../events/search-for-the-benchmarks.md) he searches one site himself: he watched the dam crews work and remembers roughly where they drove the markers, clearing that site for **2 cards** instead of 4.
- **Gives:** World state change: Pytlak joins one streambed scene as a helper (survey assist or one search site), never both.

### Show him the streambed figures
- **Requires:** [Streambed Parameters](../items/streambed-parameters.md)
- **When:** [Michał Pytlak](foreman.md) present
- **Cost:** 1 time
- **Outcome:** Michał reads the two elevations without hesitation. He has worked this valley for years, and a col standing above house level tells him at once that the water tops the village long before it reaches the streambed. He confirms the streambed is no outlet.
- **Gives:** [streambed-dead-ends](../clues/clues.md#streambed-dead-ends)

### Borrow the anchor and hammer
- **When:** [Michał Pytlak](foreman.md) willing to coordinate on the flood (after [Talk to him about the flood](#talk-to-him-about-the-flood)), or a bond with him, or Speech
- **Cost:** 1 time
- **Outcome:** Michał hands over the steel clamp and driving hammer from the farm's gear, on the understanding it comes back. Cooperative or bonded, he lends it without a second thought; otherwise a convincing enough story pries it out of a wary man.
- **Gives:** Item: the [anchor and hammer](../items/anchor.md).

### Press him about Tadeusz Mazur
- **When:** asked alone, not in front of the workers
- **Prompted by:** [mazur-death-covered-up](../clues/clues.md#mazur-death-covered-up)
- **Cost:** 1 time
- **Outcome:** Put the books in front of him and the pragmatism drops. He has carried this since 1965 and it comes out plainly: he knew that silo could kill and always tended it himself, but he was tied up elsewhere and put Mazur, his most solid man, on it. Mazur went up alone and never came back. He suspected the silo had him but could not justify dumping a full state store on a guess, and when he asked the sołtys to empty it he was told no. Two weeks later the smell proved him right. They buried the paperwork, and the sołtys kept the wage flowing to Wanda so she would not starve. He asks one thing: that Wanda never learn her pension is a dead man's wage.
- **Gives:** [`foreman-sent-mazur-in-his-place`](../clues/clues.md#foreman-sent-mazur-in-his-place)

### Pressure him in public about Tadeusz Mazur
- **Prompted by:** [mazur-paid-but-absent](../clues/clues.md#mazur-paid-but-absent), [mazur-died-in-the-silo](../clues/clues.md#mazur-died-in-the-silo)
- **Cost:** 1 time
- **Outcome:** He stops answering and goes to warn [Zbigniew](wojewoda.md) that the committee knows about Mazur.
- **Gives:** NPC State Change: Zbigniew becomes guarded; World State Change: village doors close to the committee.

## Bond

- [ ] Help with physical labor during the flood preparations — sandbags, drainage, anything with your hands.
- [ ] Show knowledge of engineering, farming, or practical infrastructure — speak his language.
- [ ] Do not mention the silo, the accident, or Tadeusz Mazur in your first two meetings.

## Grudge

- [ ] Ask directly about the silo accident or Tadeusz Mazur's death.
- [ ] Threaten PGR workers with exposure or investigation.
- [ ] Refuse to help during the flood crisis when asked — be visibly useless.
