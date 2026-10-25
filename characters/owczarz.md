# Jan Kłos

**Tags:** [@name](../tags/pgr-worker.md)

## Hook

- [@first-name](owczarz.md) [@surname](owczarz.md), the PGR's shepherd, who keeps the farm's sheep on the pasture.

## Vital Statistics

- **First name:** Jan
- **Surname:** Kłos
- **Status:** Resident
- **Morning:** [@name](../locations/pgr-pasture.md)
- **Afternoon:** [@name](../locations/pgr-pasture.md)
- **Evening:** [@name](../locations/pgr-pasture.md)
- **Night:** [@name](../locations/pgr-pasture.md)
- **Born:** ~1910
- **Age in 1967:** ~57
- **Lives in:** [@name](../locations/pgr-pasture.md)
- **Settled:** ~1950
- **Works at:** [@name](../locations/new-village/pgr-farm/pgr-farm.md), as its shepherd

## Character

The farm's shepherd. He lives up on the pasture with the flock through the summer and comes down to the village as little as he can. The wolves have him on edge: he sleeps badly, starts at every sound from the trees, and is sure no ordinary pack hunts like this. Something drives them.

## Setup

- **Clothes:** The same wool coat and sheepskin waistcoat for weeks, dew-soaked at the hem.
- **Hair & face:** Grey stubble; eyes red-rimmed and too wide, the skin under them dark as a bruise.[](#he-hasnt-slept-in-days)
- **Carriage:** Stays on his feet and leans on his crook rather than sit. Every so often he stops mid-word, eyes open, and picks up again a little further on. His hands will not keep still.[](#he-needs-a-drink)[](#introduce-yourself)

## Mechanics

### Agitated

- **Type:** bool
- **Per:** world
- **Start:** true
- On edge from weeks without sleep. While agitated he talks in fragments and keeps watching the trees.

## Opportunities

### He hasn't slept in days
- **Noticed by:** [Empathy](../cards/empathy.md) OR [Medicine](../cards/medicine.md)
- **When:** setup:characters/owczarz.md
- **Outcome:** The red eyes, the swaying, the gaps in the middle of a sentence: this man has not slept for days.
- **Gives:** [`owczarz-hasnt-slept-for-days`](../clues/clues.md#owczarz-hasnt-slept-for-days)

### He needs a drink
- **Noticed by:** [Alcoholic](../cards/alcoholic.md)
- **When:** setup:characters/owczarz.md
- **Outcome:** You know that shake, and the way his eyes go to anything that might be a bottle. This man needs a drink, badly, and one would bring him down faster than any talk.

### No curse, just hunger
- **Noticed by:** [Survival](../cards/survival.md)
- **When:** [Ask what happened here](#ask-what-happened-here)
- **Outcome:** Everything he describes is a hungry pack, not a curse. The rain has flooded the high ground and driven the game off it, and the wolves have come down after the flock.
- **Gives:** [`wolves-are-driven-by-the-rain`](../clues/clues.md#wolves-are-driven-by-the-rain)

## Actions

### Introduce yourself
<!-- Prompted by: setup:characters/owczarz.md -->
- **Outcome:** TBD.
- **Gives:** hook:characters/owczarz.md

### Ask what happened here
- **When:** [Agitated](#agitated) is true
<!-- Prompted by: [wolves-attacking-livestock](../clues/clues.md#wolves-attacking-livestock) -->
- **Outcome:** It comes out in fragments, his eyes on the trees the whole time: one every night, never two, they don't come like wolves come, they wait for him to close his eyes. The woman in the forest sends them.[](#no-curse-just-hunger)
- **Gives:** [`hag-cursed-wolves`](../clues/clues.md#hag-cursed-wolves)

### Ask what happened here
- **When:** [Agitated](#agitated) is false
<!-- Prompted by: [wolves-attacking-livestock](../clues/clues.md#wolves-attacking-livestock) -->
- **Outcome:** Calmer, he tells it straight: six sheep dead this week, and him alone up here; [@surname](neighbour.md) has come up with his rifle for weeks and never got one. He asks you to go to the sołtys for him, to send men and a rifle up to watch the flock, so he can sleep.
- **Gives:** [`six-sheep-died-this-week`](../clues/clues.md#six-sheep-died-this-week), [`owczarz-asks-for-help`](../clues/clues.md#owczarz-asks-for-help), [`dudka-failed-wolf-hunt`](../clues/clues.md#dudka-failed-wolf-hunt), hook:characters/wojewoda.md, hook:characters/neighbour.md

### Share a drink with him
- **Requires:** [@name](../tags/alcohol.md)
- **When:** [Agitated](#agitated) is true
- **Cost:** 1 time
- **Outcome:** He takes the bottle with both hands, drinks, and for the first time stops watching the trees.
- **Changes:** [Agitated](#agitated) — false

### Calm him down
- **Requires:** [Empathy](../cards/empathy.md)
- **When:** [Agitated](#agitated) is true
- **Cost:** 1 time
- **Outcome:** You keep him talking about the flock, slowly, until his shoulders come down and he sits for the first time.
- **Changes:** [Agitated](#agitated) — false

### Tell him it is the rain, not a curse
- **When:** [Agitated](#agitated) is true
<!-- Prompted by: [wolves-are-driven-by-the-rain](../clues/clues.md#wolves-are-driven-by-the-rain) -->
- **Cost:** 1 time
- **Outcome:** You walk him through it plainly: the flooded high ground, the game gone, a hungry pack following the flock down. He does not believe it all, but the plain sense of it lets his shoulders come down.
- **Changes:** [Agitated](#agitated) — false

### Census interview
- **When:** [Agitated](#agitated) is false
<!-- Prompted by: [committee-fills-census](../clues/clues.md#committee-fills-census) -->
- **Cost:** 1 time
- **Outcome:** He gives it plainly: his name, his age as near as he knows it, shepherd to the farm since about 1950, no wife, no children, living with the flock.
- **Changes:** [Census](../items/census.md#census) — [@first-name](owczarz.md) [@surname](owczarz.md), shepherd, lives on the pasture

### Property assessment
- **When:** [Agitated](#agitated) is false
<!-- Prompted by: [committee-notes-property-for-damage](../clues/clues.md#committee-notes-property-for-damage) -->
- **Cost:** 1 time
- **Outcome:** He owns nothing. The hut on the pasture is the farm's, and so is every animal in the fold.
- **Changes:** [Property Record](../items/census.md#property-record) — no property held, PGR hut on the pasture

### Drink with them
- **Requires:** [@name](../tags/alcohol.md)
<!-- Prompted by: hook:characters/owczarz.md -->
- **Cost:** 1 time
- **Outcome:** He drinks with both hands round the glass and tells it: six sheep this week, and him alone up there.
- **Gives:** [`six-sheep-died-this-week`](../clues/clues.md#six-sheep-died-this-week)
