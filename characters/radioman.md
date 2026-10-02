# %RADIOMAN%

**Type:** Named character — the village drunk / anti-establishment loudmouth

## Hook

The village drunk who was once its schoolteacher, loud against the authorities to anyone who'll share a bottle.

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
- **`new-village-will-flood`:** They knew. Of course they knew. When has the state ever not known and told us anyway?

## Mechanics

### Signal in the noise

He broadcasts constantly and mixes truth with rubbish. The GM should keep the ratio deliberate: most of what he says is froth, a little is gold, and he cannot tell the difference himself.

**True and safely contained:**
- Tadek's crew runs a still out in the forest → [`drinking-crew-heads-to-forest`](../clues/clues.md#drinking-crew-heads-to-forest)
- He drank with the last survey crew when they passed through and watched them do nothing but empty bottles → [`geologists-were-drinking`](../clues/clues.md#geologists-were-drinking), and the teacher in him read how little work backed their filed report → [`original-report-is-thin`](../clues/clues.md#original-report-is-thin) once players are working the survey

**True observation, paranoid conclusion:**
- He saw the crew drink and the work come to nothing, then leaps from there to a deliberate state plot to drown the village → [`survey-was-faked`](../clues/clues.md#survey-was-faked). The observations under it are sound; the conspiracy he stacks on top is his own, and the truth is negligence, not design (`survey-was-botched`).

**Garbage and pure noise:**
- Radio Wolna Europa said Gomułka is finished, the Americans are coming, or the border is about to open.
- The priest is a Soviet plant, the census men are foreign spies, or whatever the drink invents tonight.

He knows the official history, that the old village was Lemko and was cleared in the 1947 Akcja Wisła, but nothing of the massacre or the well. His quarrel is with the living state, not its buried crimes.

## Opportunities

- **The suit jacket and phrasing** `(requires: Bureaucracy or History)` — The jacket and cadence mark what he was before the bottle: an educated man, a teacher, and someone the state broke on purpose.

## Actions

### Ask where the good bimber comes from
- **Requires:** Nothing
- **Cost:** Free
- **Outcome:** He points the player toward Tadek's crew and the treeline without coaxing.
- **Gives:** [`drinking-crew-heads-to-forest`](../clues/clues.md#drinking-crew-heads-to-forest)

### What the last survey crew really did
- **Requires:** Nothing
- **Prompted by:** [committee-runs-geographical-survey](../clues/clues.md#committee-runs-geographical-survey)
- **Cost:** 1 action
- **Outcome:** Ask him about the survey and he lights up: the last crew who came to re-check the ground drank at Tadek's still for the best part of a week, drove a few stakes by the road, and left. "They surveyed the bottom of a bottle, and the state signed it." Drunk testimony, but he watched it happen, and the teacher in him read exactly how little work went into what they filed.
- **Gives:** [`geologists-were-drinking`](../clues/clues.md#geologists-were-drinking); [`original-report-is-thin`](../clues/clues.md#original-report-is-thin)

### Why he says they did it on purpose
- **Requires:** Nothing
- **Prompted by:** [original-report-is-thin](../clues/clues.md#original-report-is-thin)
- **Cost:** 1 action
- **Outcome:** Press him on it and the teacher's logic curdles into paranoia: a crew does not drink a survey away by accident, he insists, the state wanted it thin, a false all-clear so the village would be built where it would drown. He is certain it was deliberate. It may be the bimber and the bitterness talking, or the one time the pattern is real.
- **Gives:** [`survey-was-faked`](../clues/clues.md#survey-was-faked)

### Do the arithmetic on the ditch
- **Requires:** The two ditch cross-sections: [concrete-ditch-measurements](../clues/clues.md#concrete-ditch-measurements) and [dugout-measurements](../clues/clues.md#dugout-measurements)
- **Prompted by:** [ditch-concrete-stops-short](../clues/clues.md#ditch-concrete-stops-short)
- **Cost:** 1 action
- **Outcome:** Show the drunk teacher the figures and he sobers enough to work them like a class problem: the fine concrete head carries plenty, but it runs a fraction of the length; the shallow dugout that carries the rest chokes at flood volume and spills. To him it is proof the state built a sham drain and knew it.
- **Gives:** [ditch-drains-nothing](../clues/clues.md#ditch-drains-nothing)

### Ask about the old village
- **Requires:** Nothing
- **Prompted by:** aware:locations/old-village-ruins.md
- **Cost:** 1 action
- **Outcome:** The teacher gives the official history without hesitation: it was a Lemko village, Greek Catholic, up the valley, and in 1947 the state cleared the whole range under Akcja Wisła and scattered the people west. "On paper they were resettled. On paper." He knows the record; he has no idea what the record buried.
- **Gives:** [`old-village-was-lemko`](../clues/clues.md#old-village-was-lemko); [`old-village-resettled-during-vistula`](../clues/clues.md#old-village-resettled-during-vistula)

### Ask about the trident
- **Requires:** Nothing
- **Prompted by:** [trident-on-the-bayonet](../clues/clues.md#trident-on-the-bayonet)
- **Cost:** 1 action
- **Outcome:** He knows the mark the moment they describe it. The state called them bands, he says, but that three-pronged sign is the partisans' own emblem, the UPA, the Ukrainians the army was sent to clear out of these hills.
- **Gives:** [`trident-stands-for-upa`](../clues/clues.md#trident-stands-for-upa)

### Ask about German equipment
- **Requires:** Nothing
- **Prompted by:** [edeks-bayonet-is-german](../clues/clues.md#edeks-bayonet-is-german)
- **Cost:** 1 action
- **Outcome:** A German weapon in these hills is no mystery to him. The partisans fought with whatever they stripped off the war, he says, German rifles and blades, Soviet kit too, anything they could carry out of the fighting. The teacher recites it like a lesson.
- **Gives:** [`upa-used-german-equipment`](../clues/clues.md#upa-used-german-equipment)

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
