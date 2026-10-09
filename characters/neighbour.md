# Ryszard Dudka

**Type:** Named character — bystander witness

## Hook

[@first-name](neighbour.md) [@surname](neighbour.md), a quiet farmer and licensed hunter, lives next door to [@name](ciotka.md).

## Vital Statistics

- **First name:** Ryszard
- **Surname:** Dudka
- **Status:** Resident
- **Born:** 1918
- **Age in 1967:** 49
- **Lives in:** [@name](../locations/neighbours-house.md) — alone
- **Settled:** ~1948 — early settler, next door to Barnaś family from the start
- **Armed:** Hunting rifle (licensed)

## Character

Quiet hunter who heard everything in 1954 and did nothing. He carries the guilt of inaction and turns it into fear and hatred of [@surname](butcher.md). He is the easiest NPC to crack.

## Appearance

- **Clothes:** Wool trousers held up by braces, flannel shirt with sleeves rolled in summer, heavy boots — same outfit every day
- **Hair & face:** Flat cap he rarely removes; pale blue eyes, strong jaw, three-day stubble that never becomes a beard
- **Carriage:** Lean hunter's build, quiet even indoors; shoulders slightly forward, watches hands and posture more than faces

He speaks in short flat sentences with long pauses. He goes quieter when angry, not louder, and smells of tobacco smoke and pine resin.

## Opinions

- **[@name](barbara.md)** — "She and [@first-name](pawelek.md) are the only good thing left. I bring firewood, watch the boy, fix what breaks, and listen when she talks over the fence."
- **[@name](butcher.md)** — "I hate him and fear him in equal measure. If the village finds out I talked, he will not hesitate with me."
- **[@name](ciotka.md)** — "I have watched her tend that boy for thirteen years. I know what she did that night, and I know what it cost her."
- **[@name](soldier.md)** — "He left. Walked out and abandoned that slow boy behind him. Whatever else a man is, you do not do that."
- **[@name](glupek.md)** — "He is the living reminder. I heard what happened to him and did nothing."
- **[wujas-is-guilty](../clues/clues.md#wujas-is-guilty)** — "Lots of men drink for bad reasons. I will not say more unless something breaks."

## Mechanics

### Lynch Targets

- A score he keeps for every possible lynch target. Starts at **[@surname](butcher.md) 2, the players 1, [@first-name](wojewoda.md) 1**, everyone else 0.
- Whoever scores highest when he snaps is who he goes after.

### Humiliated

- A flag, true or false. Starts false.

## Actions

### Census interview
- **Prompted by:** aware:characters/neighbour.md
- **Cost:** 1 time
- **Outcome:** He starts hostile to government people in his home, then cooperates with clipped answers. The household record notes the licensed hunting rifle on the wall.
- **Gives:** [neighbour-has-rifle](../clues/clues.md#neighbour-has-rifle)
- **Changes:** [Census](../items/census.md#census) — [@first-name](neighbour.md) [@surname](neighbour.md), farmer

### Property assessment
- **Prompted by:** aware:characters/neighbour.md
- **Cost:** 1 time
- **Outcome:** He identifies his house and plot next to [@name](../locations/ciotkas-house/ciotkas-house.md). His papers are in order and his answers stay clipped — the record shows he has held the plot since ~1948.
- **Gives:** [neighbour-is-old-settler](../clues/clues.md#neighbour-is-old-settler)
- **Changes:** [Property Record](../items/census.md#property-record) — [@surname](neighbour.md) house and farmland

### Ask about the teenage girl
- **Prompted by:** [dress-belonged-to-teenage-girl](../clues/clues.md#dress-belonged-to-teenage-girl)
- **Outcome:** Asked about the girl who lived with the Barnaś family, he confirms they had a teenage daughter, names her [@first-name](jagna.md), and claims she left with her father years back.
- **Gives:** [barnas-had-a-daughter-hania](../clues/clues.md#barnas-had-a-daughter-hania), aware:characters/jagna.md

### Ask about old Barnaś
- **Prompted by:** aware:characters/soldier.md
- **Outcome:** He knew the man from the first day, next fence over, and says it flat and without warmth: Barnaś was a soldier, KBW, came into the valley with the resettlement in '47 and never left. He has no good word for him.
- **Gives:** [soldier-was-kbw](../clues/clues.md#soldier-was-kbw), [soldier-served-in-akcja-wisla](../clues/clues.md#soldier-served-in-akcja-wisla)

### Ask about Ciotka's visitors
- **When:** He liked the players; they ask who came to [@first-name](ciotka.md)'s house before she died
- **Prompted by:** [ciotka-had-a-visitor](../clues/clues.md#ciotka-had-a-visitor)
- **Outcome:** He says the day before she died, the Wojewoda's boy came and the two of them fought. He heard the raised voices carry over the fence.
- **Gives:** [junior-pressed-ciotka](../clues/clues.md#junior-pressed-ciotka)

### Uplift Neighbour
- **When:** [Humiliated](#humiliated), and Empathy or Speech
- **Outcome:** The player puts the steel back in him and gives him his face back.
- **Changes:** [Humiliated](#humiliated) — clears Humiliated

## Bond

- [ ] **Treat [@first-name](barbara.md) and [@first-name](pawelek.md) as people, not sources** — ask after them, help the boy, notice the one clean thing in his life
- [ ] **Meet his 1954 guilt without contempt** — when the inaction surfaces, don't call him a coward; let it stand
- [ ] **Stand with him against [@surname](butcher.md)** — back him in a real moment instead of leaving him alone with it: defuse [@name](../events/hunters-cross-paths.md) in his favour, [Uplift him](#uplift-neighbour), or stand beside him at [the well](../events/well-confrontation.md#neighbours-rifle)

## Grudge

- [ ] **Side with [@surname](butcher.md) or humiliate him** — go on [@name](../events/hunt-with-rezen.md), laugh him down yourself, dismiss the threat he sees, or leave [@name](../events/hunters-cross-paths.md) to run so [@surname](butcher.md) wins it
- [ ] **Endanger or use [@first-name](barbara.md) or [@first-name](pawelek.md)** — push [@first-name](barbara.md) carelessly, let the boy come to harm, or treat his one clean thing as leverage
- [ ] **Treat him as a 1954 suspect** — pull rank, interrogate him as if he were complicit, corner the witness who already can't forgive his own inaction
