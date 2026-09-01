# %RADIOMAN%

**Type:** Named character — the village drunk / anti-establishment loudmouth

## Vital Statistics

- **Born:** 1919
- **Age in 1967:** 48
- **Heritage:** Polish
- **Lives in:** A run-down cottage on the edge of %NEW_VILLAGE% — alone
- **Settled:** ~1951 — sent here as the new village's schoolteacher during resettlement

## Character

The village drunk was once its schoolteacher, until the state took the post and gave him a few years inside for "agitation." Now he drinks Tadek's bimber, listens to Radio Wolna Europa through the jamming, and tells anyone who will listen that the authorities are lying. He is right often enough to be useful and drunk enough that nobody trusts him.

## Appearance

- **Clothes:** Grey suit jacket gone shiny at the elbows, the last relic of the teacher he was, over peasant trousers and a collarless shirt; nothing fits, nothing is clean
- **Hair & face:** Grey stubble he shaves twice a week; wire spectacles mended with copper wire; broken veins across the nose; eyes still sharp when drink has not dulled them
- **Carriage:** Stands too straight when making a point, then folds again; hands tremble until the first glass steadies them

He talks in a teacher's cadence, reaches for clever phrases, half-remembers Latin tags, and quotes broadcasts he heard through static. He reeks of bimber and cold ash.

## Opinions

- **[Zbigniew Gajda](wojewoda.md)** — He is our little tsar. He runs to the man in the black car, comes back with orders, and everyone pretends not to see it.
- **[the man in the black car](officer.md)** — Bezpieka. I have never spoken to him and never will, but I know what he is.
- **[ks. Władysław Pająk](priest.md)** — He sold his silence like everyone else. The Church was supposed to be the one thing they could not buy.
- **[Tadek Gajda](wujas.md)** — He is my one honest friend, God help us both. I drink with his crew at the still for the bottle and the talk.
- **[%NEW_VILLAGE%](../locations/village-outskirts.md)** — They built it on nothing and called it progress. Now they will drown it and call that progress too.
- **Smoking** — I heard it on the western wave: the smoke rots your lungs and kills you, they have the studies now. I say it at the still and the whole crew laughs and lights another. One more thing I am right about that they will call me a fool for.
- **`wojewoda-talks-to-sb`:** You heard it from a drunk, so you will doubt it, but you heard it. Watch the black car and watch where Gajda walks.
- **`officer-is-sb`:** I told you. Bezpieka is in our village, and the sołtys carries his water.
- **`new-village-will-flood`:** They knew. Of course they knew. When has the state ever not known and told us anyway?

## Mechanics

### Signal in the noise

He broadcasts constantly and mixes truth with rubbish. The GM should keep the ratio deliberate: most of what he says is froth, a little is gold, and he cannot tell the difference himself.

**True and safely contained:**
- The sołtys reports privately to the man in the black car → [`wojewoda-talks-to-sb`](../clues/clues.md#wojewoda-talks-to-sb)
- Tadek's crew runs a still out in the forest → [`drinking-crew-heads-to-forest`](../clues/clues.md#drinking-crew-heads-to-forest)
- The man in the black car is secret police; from his mouth it becomes [`officer-is-sb`](../clues/clues.md#officer-is-sb) only when corroborated elsewhere
- Handed the three ruled-out outlets, the teacher in him works it through and states the village will flood → [`new-village-will-flood`](../clues/clues.md#new-village-will-flood)

**Garbage and pure noise:**
- Radio Wolna Europa said Gomułka is finished, the Americans are coming, or the border is about to open.
- The priest is a Soviet plant, the census men are foreign spies, or whatever the drink invents tonight.

He knows nothing of the old village, the massacre, or the well. His quarrel is with the living state, not its buried crimes.

## Opportunities

- **The fixed accusation** `(requires: Finesse)` — Most of the tirade shifts with the drink, but one claim stays fixed: the sołtys meets the man in the black car alone and comes back changed. → Gives: [`wojewoda-talks-to-sb`](../clues/clues.md#wojewoda-talks-to-sb)
- **The suit jacket and phrasing** `(requires: Bureaucracy or History)` — The jacket and cadence mark what he was before the bottle: an educated man, a teacher, and someone the state broke on purpose.

## Actions

### Hear him out over a bottle
- **Requires:** Nothing
- **Cost:** 1 action
- **Outcome:** The player sits through the broadcasts, prophecies, and paranoia until one claim repeats cleanly: the sołtys meets the man in the black car alone every time he comes.
- **Gives:** [`wojewoda-talks-to-sb`](../clues/clues.md#wojewoda-talks-to-sb)

### Ask where the good bimber comes from
- **Requires:** Nothing
- **Cost:** Free
- **Outcome:** He points the player toward Tadek's crew and the treeline without coaxing.
- **Gives:** [`drinking-crew-heads-to-forest`](../clues/clues.md#drinking-crew-heads-to-forest)

### Lay the drain findings in front of him
- **Requires:** The party has ruled out all three outlets: holds [gap-is-blocked](../clues/clues.md#gap-is-blocked), [ditch-drains-nothing](../clues/clues.md#ditch-drains-nothing), and [streambed-dead-ends](../clues/clues.md#streambed-dead-ends)
- **Cost:** 1 action
- **Outcome:** The teacher surfaces under the drunk. He lines up the three dead outlets, works it through aloud, and says flatly that the valley cannot drain and the village will flood. He is right, and he knows no one will believe it because it came from him. An in-village certifier for a party that cannot reach [prof. Bieńkowski](professor.md) by phone.
- **Gives:** [new-village-will-flood](../clues/clues.md#new-village-will-flood)

### Census interview
- **Requires:** Committee authority
- **Cost:** 1 action
- **Outcome:** The census sets him off, but he gives name and age inside a tirade about the teaching post they took and the years they gave him for "agitation."
- **Gives:** Census data — %RADIOMAN%, former schoolteacher.

### Property assessment
- **Requires:** Committee authority
- **Cost:** 1 action
- **Outcome:** He gestures at the falling-down cottage the state parked him in.
- **Gives:** Property record — run-down state-assigned cottage.

## Bond

- [ ] Hear out a full tirade without mocking him or walking off
- [ ] Share the bottle — drink with him as an equal, not as a handler humoring a drunk
- [ ] Treat him as the mind he was — engage with the radio, the wider world, or his teaching past

## Grudge

- [ ] Mock him or dismiss him as "just the village drunk" to his face
- [ ] Take the sołtys's or the authorities' side in front of him
- [ ] Repeat what he told you to someone who could report it — expose him as a Wolna Europa listener
