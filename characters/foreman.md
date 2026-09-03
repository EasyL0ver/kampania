# Michał Pytlak

**Type:** Named character — farm overseer

## Vital Statistics

- **Born:** ~1910
- **Age in 1967:** ~57
- **Lives in:** %NEW_VILLAGE% — with Zofia Pytlak (wife) and Staszek Pytlak (son, age 5)
- **Settled:** After 1954; knows nothing about the lynch

## Character

PGR farm overseer, competent, pragmatic, and loyal to [Zbigniew Gajda](wojewoda.md). He covered up Tadeusz Mazur's death in the grain silo and now insists the village can still fight the flood.

## Appearance

- **Clothes:** Wool flat cap in all weather, oil-stained trousers held up by braces, collarless shirt.
- **Hair & face:** Short cropped hair under the cap; broad jaw, flat nose broken once and set crooked, small shrewd eyes under heavy brows.
- **Carriage:** Stocky, barrel-chested, low to the ground; slight limp from an old tractor injury; hands drum, grip, and point.

Voice is a commanding bark with a Podkarpacie drawl. He uses words as instructions or verdicts, not decoration.

## Opinions

- **[Zbigniew Gajda](wojewoda.md)** — I respected him because he always had a plan. Now he talks like surrender is wisdom, and I cannot follow that.
- **[Barbara Kopacz](barbara.md)** — She works hard, keeps quiet, and does not complain. That is worth respect.
- **[Zofia Pytlak](zofia.md)** — She sees the valley slipping away before I admit it. I cannot listen too long, because then I may have to stop digging.
- **`foreman-coverup`:** If this reaches Wanda, it ruins the only mercy left in that mess. Ask me alone, or I shut every door I can reach.

## Mechanics

### If he learns the flood line may be wrong

Michał backs [Zbigniew Gajda](wojewoda.md)'s optimistic line only while he believes the village is safe. The moment the committee tells him [the-flood-line-potentially-miscalculated](../clues/clues.md#the-flood-line-potentially-miscalculated), he comes to know it himself (tracked as `foreman: the-flood-line-potentially-miscalculated`), grasps the valley may actually drown, and stops covering for the ditch. He then speaks plainly about the flood, unlocking "Ask his opinion on the drain routes". Zbigniew ordering him to help (see wojewoda's ["Tell him about the flood risk"](wojewoda.md#tell-him-about-the-flood-risk)) tells him the same thing.

## Opportunities

- **The ditch shames him** `(requires: holding [ditch-is-candidate-drain](../clues/clues.md#ditch-is-candidate-drain) and Empathy)` — As Michał talks up his irrigation ditch, his voice tightens and he will not hold your eye on it. He does not believe his own reassurance: the concrete runs only a short way and he knows it. → Gives: [ditch-not-built-to-spec](../clues/clues.md#ditch-not-built-to-spec)

## Actions

### Census interview
- **Requires:** Committee authority
- **Cost:** 1 action
- **Outcome:** He answers quickly and gives himself, Zofia, and Staszek.
- **Gives:** Census data — Michał, Zofia, Staszek.

### Property assessment
- **Requires:** Committee authority
- **Cost:** 1 action
- **Outcome:** He says he owns nothing: he lives in PGR quarters and the farm is state land. He treats questions about land value as odd.
- **Gives:** Property record — none; PGR housing.

### Talk to him about the flood
- **Requires:** [Michał Pytlak](foreman.md) present
- **Prompted by:** [committee-runs-geographical-survey](../clues/clues.md#committee-runs-geographical-survey)
- **Cost:** Free
- **Outcome:** Michał describes drainage ditches, sandbags, and water diversion as practical flood defences. He lays out the valley plainly: when the reservoir rises the water can only leave three ways, through the ridge gap, down his irrigation ditch, or over the far-ridge streambed. When the ditch comes up he is blunt: it is concrete only for a short run near the fields, an unlined dugout the rest of the way, and it will not carry a flood off.
- **Gives:** [ditch-is-candidate-drain](../clues/clues.md#ditch-is-candidate-drain); NPC State Change: Michał Pytlak becomes willing to coordinate flood defence work with the committee.

### Tell him the flood line may be wrong
- **Requires:** Holding [the-flood-line-potentially-miscalculated](../clues/clues.md#the-flood-line-potentially-miscalculated)
- **Cost:** 1 action
- **Outcome:** Michał goes still, then drops the reassurances. He admits the ditch is concrete only for a short run near the fields and an unlined dugout the rest of the way, and that it will not carry a flood off.
- **Gives:** [ditch-not-built-to-spec](../clues/clues.md#ditch-not-built-to-spec); NPC Learns: foreman: [the-flood-line-potentially-miscalculated](../clues/clues.md#the-flood-line-potentially-miscalculated).

### Ask his opinion on the drain routes
- **Requires:** foreman: [the-flood-line-potentially-miscalculated](../clues/clues.md#the-flood-line-potentially-miscalculated)
- **Cost:** 1 action
- **Outcome:** With nothing left to protect, Michał walks the outlets from memory. He names the landslide sitting in the ridge gap, though he cannot say whether it seals the notch fully or leaks.
- **Gives:** [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap)

### Show him the streambed figures
- **Requires:** [Michał Pytlak](foreman.md) present and holding [streambed-parameters](../clues/clues.md#streambed-parameters)
- **Cost:** 1 action
- **Outcome:** Michał reads the two elevations without hesitation. He has worked this valley for years, and a col standing above house level tells him at once that the water tops the village long before it reaches the streambed. He confirms the streambed is no outlet.
- **Gives:** [streambed-dead-ends](../clues/clues.md#streambed-dead-ends)

### Press him about Tadeusz Mazur
- **Requires:** A reason to name Mazur — the [PGR ledger](../items/pgr-ledger.md) showing a worker nobody answers to, or [Wanda Mazur](widow.md)'s account of her "pension"
- **Cost:** 1 action
- **Outcome:** Away from the workers, he admits Mazur died in the silo and that the paperwork was buried. He asks that Wanda not be told what her pension really is.
- **Gives:** [`foreman-coverup`](../clues/clues.md#foreman-coverup)

### Pressure him in public about Tadeusz Mazur
- **Requires:** A reason to name Mazur — the [PGR ledger](../items/pgr-ledger.md) showing a worker nobody answers to, or [Wanda Mazur](widow.md)'s account of her "pension"
- **Cost:** 1 action
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
