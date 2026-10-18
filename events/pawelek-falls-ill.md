# Pawelek Falls Ill

**Location:** [@name](../locations/new-village/barbaras-house.md)
**Present:** [@name](../characters/barbara.md), [@name](../characters/babcia.md), [@name](../characters/pawelek.md)

## Hook

- Word spreads through the village that [@first-name](../characters/barbara.md)'s boy is sick.
- Players can hear the news at the [@name](../locations/new-village/pgr-farm/pgr-farm.md), [@name](../locations/new-village/the-store.md), or from any nearby NPC.
- [@name](../characters/neighbour.md) may come to find the committee and ask whether anyone is a doctor.

## Setup

- [@first-name](../characters/barbara.md)'s house is being used as a sickroom.
- [@first-name](../characters/pawelek.md) lies on [@first-name](../characters/barbara.md)'s bed, sweating, feverish, and breathing fast.[](#examine-him)
- In his fever he raves, half-words about a lady who told him not to drink[](#muttering-about-bread-and-water) and about round stones.[](#raving-of-a-lady-and-stones)
- [@first-name](../characters/barbara.md) stays beside him with cloths, water, and unfinished prayers.[](#tend-to-him)
- [@name](../characters/babcia.md) is lucid, upright, and giving orders.
- [@first-name](../characters/babcia.md) has rearranged icons, candles, bread, and water around the bed in a non-Roman Catholic pattern.
- The mirrors are covered.
- [@name](../characters/neighbour.md) arrives within the hour with firewood, clean water, and a blanket.

## Opportunities

### Bloodshot crimson eyes
- **When:** [Health Points](../characters/pawelek.md#health-points) <= 4
<!-- Prompted by: setup:events/pawelek-falls-ill.md -->
- **Outcome:** the whites of his eyes have gone bloodshot and crimson.
- **Gives:** [`pawelek-eyes-are-red`](../clues/clues.md#pawelek-eyes-are-red)

### Red whites not from crying
- **Noticed by:** [Medicine](../cards/medicine.md)
- **When:** [Health Points](../characters/pawelek.md#health-points) <= 4
- **Outcome:** His eyes are red in the whites themselves, not from crying.
- **Gives:** [`pawelek-eyes-not-crying`](../clues/clues.md#pawelek-eyes-not-crying)

### Yellowing skin and eyes
- **When:** [Health Points](../characters/pawelek.md#health-points) <= 3
<!-- Prompted by: setup:events/pawelek-falls-ill.md -->
- **Outcome:** his skin and the whites of his eyes have turned yellow.
- **Gives:** [`pawelek-turns-yellow`](../clues/clues.md#pawelek-turns-yellow)

### Yellow signs mean failing organs
- **Noticed by:** [Medicine](../cards/medicine.md)
- **When:** [Health Points](../characters/pawelek.md#health-points) <= 3
- **Outcome:** To a doctor, yellow skin and eyes mean his organs are failing.
- **Gives:** [`pawelek-organs-failing`](../clues/clues.md#pawelek-organs-failing)

### Woodsman unsure of cause
- **Noticed by:** [Survival](../cards/survival.md)
- **When:** [Health Points](../characters/pawelek.md#health-points) <= 3
<!-- Prompted by: setup:events/pawelek-falls-ill.md -->
- **Outcome:** a woodsman reads the yellowing two ways and cannot settle it: a sickness that comes from foul water, or a child who ate a death cap in the woods.
- **Gives:** [`pawelek-got-it-from-water`](../clues/clues.md#pawelek-got-it-from-water), [`pawelek-ate-death-cap`](../clues/clues.md#pawelek-ate-death-cap)

### Possible phosphorus poisoning
- **Noticed by:** [Violence](../cards/violence.md)
- **When:** [Health Points](../characters/pawelek.md#health-points) <= 3
<!-- Prompted by: setup:events/pawelek-falls-ill.md -->
- **Outcome:** you have seen what the yellow rat poison does to a body; the boy's signs could be phosphorus, and that would mean a hand behind it.
- **Gives:** [`pawelek-phosphorus-poison`](../clues/clues.md#pawelek-phosphorus-poison)

### Raving of a lady and stones
- **Noticed by:** [Superstitious](../cards/superstitious.md)
- **When:** setup:events/pawelek-falls-ill.md
<!-- Prompted by: setup:events/pawelek-falls-ill.md -->
- **Outcome:** The child raves of a lady and round stones, and he alone sickens while everyone else is spared. To you the meaning is plain: this is the well's work, not a fever.
- **Gives:** [`pawelek-was-possessed`](../clues/clues.md#pawelek-was-possessed)

### Muttering about bread and water
- **When:** setup:events/pawelek-falls-ill.md
<!-- Prompted by: setup:events/pawelek-falls-ill.md -->
- **Outcome:** Sit close and listen through the fever. His muttering cries for a lady from the woods who gave him bread and told him not to drink, then trails off into sounds that make no sense.
- **Gives:** hook:characters/hag.md

### Screams when limbs are moved
- **When:** [Examine him](#examine-him) AND [Health Points](../characters/pawelek.md#health-points) <= 5
- **Outcome:** once the muscle pain has set in he screams when his legs and back are moved.
- **Gives:** [pawelek-in-muscle-pain](../clues/clues.md#pawelek-in-muscle-pain)

### Looks like common fever
- **Noticed by:** [Medicine](../cards/medicine.md)
- **When:** [Examine him](#examine-him) AND [Health Points](../characters/pawelek.md#health-points) >= 5
- **Outcome:** it reads like the common fever going round.
- **Gives:** [pawelek-looks-like-common-fever](../clues/clues.md#pawelek-looks-like-common-fever)

### Fever should have broken
- **Noticed by:** [Medicine](../cards/medicine.md)
- **When:** [Examine him](#examine-him) AND [Health Points](../characters/pawelek.md#health-points) is 4
- **Outcome:** a common fever would have broken by now.
- **Gives:** [pawelek-fever-not-passing](../clues/clues.md#pawelek-fever-not-passing)

### Yellowing rules out common sickness
- **Noticed by:** [Medicine](../cards/medicine.md)
- **When:** [Examine him](#examine-him) AND [Health Points](../characters/pawelek.md#health-points) <= 3
- **Outcome:** with him yellowing, this is no common sickness.
- **Gives:** [pawelek-not-common-sickness](../clues/clues.md#pawelek-not-common-sickness)

### Dark urine, little of it
- **When:** [Condition](../characters/pawelek.md#condition) is tended AND [Health Points](../characters/pawelek.md#health-points) <= 2
- **Outcome:** he passes little urine, dark as strong tea.
- **Gives:** [pawelek-passes-dark-urine](../clues/clues.md#pawelek-passes-dark-urine)

## Actions

### Examine him
<!-- Prompted by: setup:events/pawelek-falls-ill.md -->
- **Cost:** 1 time
- **Outcome:** His skin is burning hot, and once the muscle pain has set in he screams when you move his legs and back[](#screams-when-limbs-are-moved). What you learn depends on how far gone he is[](#looks-like-common-fever)[](#fever-should-have-broken). A medic examining him once he is yellowing reads that this is no common sickness[](#yellowing-rules-out-common-sickness).
- **Gives:** [pawelek-burns-with-fever](../clues/clues.md#pawelek-burns-with-fever)

### Tend to him
<!-- Prompted by: setup:events/pawelek-falls-ill.md -->
- **Cost:** 1 time
- **Outcome:** Cool cloths, water, keeping him still. Nothing you do slows the fever; he keeps sinking on the clock all the same. At 2 HP or lower you see he passes little urine, dark as strong tea.
- **Changes:** [Condition](../characters/pawelek.md#condition) — tended, no HP lost this phase

### Perform a cleansing ritual
- **Requires:** [Superstitious](../cards/superstitious.md)
<!-- Prompted by: [`pawelek-needs-a-cleansing-ritual`](../clues/clues.md#pawelek-needs-a-cleansing-ritual) -->
- **Cost:** 1 time
- **Outcome:** You work the old warding rite over the boy. It does nothing for his fever. But [@first-name](../characters/babcia.md), silent in her chair, watches, then corrects your hands and your words and takes up the prayer herself. She knows this rite far better than you do.
- **Gives:** [`babcia-is-lemko`](../clues/clues.md#babcia-is-lemko), [`babcia-has-the-words`](../clues/clues.md#babcia-has-the-words)

### Drive out the devil
- **When:** [Priest brought](#priest-brought) is true
<!-- Prompted by: [`pawelek-was-possessed`](../clues/clues.md#pawelek-was-possessed) -->
- **Cost:** 1 time
- **Outcome:** He prays loudly over the boy, commanding the devil out, a Roman Catholic blessing that rises to shouting. It does nothing for the fever, and the noise frightens the delirious child. [@name](../characters/babcia.md) comes out of her chair, sharply lucid, and drives him off: the boy is not a demon, and he is not to shout and terrify a sick child. This is not his faith and not his rite.
- **Gives:** [`babcia-opposed-to-church`](../clues/clues.md#babcia-opposed-to-church), [`babcia-mind-returns`](../clues/clues.md#babcia-mind-returns)

### Give Pawelek the penicillin
- **Requires:** [@name](../items/penicillin.md)
<!-- Prompted by: [pawelek-needs-penicillin](../clues/clues.md#pawelek-needs-penicillin) -->
- **Cost:** 1 time
- **Outcome:** You give the boy the penicillin at a child's dose. The fever breaks. His HP loss stops for good and he begins to recover.
- **Changes:** [Health Points](../characters/pawelek.md#health-points) — drain stops, +1 HP per phase

## Mechanics

### Priest brought

- **Type:** bool
- **Per:** world
- **Start:** false
- True once the committee brings the priest to the sickroom ([Bring him to the sick boy](../characters/priest.md#bring-him-to-the-sick-boy)).

### The illness

- **Type:** rule
- [@first-name](../characters/pawelek.md) starts at 6 HP when symptoms appear on Day 3 evening.
- [@first-name](../characters/pawelek.md) loses 1 HP per phase without effective treatment.
- At 0 HP, [@first-name](../characters/pawelek.md) dies.
- Symptoms surface as he declines: fever at onset (6 HP), muscle pain (5 HP), bloodshot eyes (4 HP), yellowing skin (3 HP), dark urine (2 HP).
- Stabilizing care with Medicine stops HP loss for the rest of the day and must be repeated each morning.
- [@name](../items/penicillin.md), given at a child's dose, stops HP loss permanently and restores 1 HP per phase (see the **Give [@first-name](../characters/pawelek.md) the penicillin** action).
- [@first-name](../characters/hag.md)'s herbs stop HP loss permanently but leave [@first-name](../characters/pawelek.md) asleep and unreachable for the rest of the game.
- At 4 HP or lower, [@first-name](../characters/barbara.md) names the father.
