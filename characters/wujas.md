# Tadek Gajda

**Tags:** [@name](../tags/villager.md)

## Hook

[@nickname](wujas.md) [@surname](wujas.md), the sołtys's brother and the village drunk, rarely without a bottle.

## Vital Statistics

- **First name:** Tadeusz
- **Nickname:** Tadek
- **Surname:** Gajda
- **Status:** Resident
- **Morning:** [@name](../locations/new-village/wojewodas-house.md)
- **Afternoon:** [@name](../locations/new-village/the-store.md)
- **Evening:** [@name](../locations/bimber-still.md)
- **Night:** [@name](../locations/bimber-still.md)
- **Born:** 1925
- **Age in 1967:** 42
- **Lives in:** [@name](../locations/bimber-still.md) area / drifts between siblings' homes
- **Settled:** ~1948 — first wave, with siblings

## Character

Alcoholic wreck and the weakest link in the cover-up. He helped in the 1954 lynch, let [@first-name](jagna.md) run, and has drowned the guilt in bimber for thirteen years.

## Setup

- **Clothes:** Checked shirt with rolled sleeves, old marynarka with elbow patches, maciejówka cap cocked forward.
- **Hair & face:** Still handsome under the wear; unshaven, bloodshot eyes visible up close.
- **Carriage:** Lean and rangy; moves loose and easy, like he is still the life of the party.

His raspy warm voice gets louder and funnier with drink. The morning shakes and the silence after the charm runs out are private.

## Opinions

- **[@name](wojewoda.md)** — "Zbyszek holds the family together, and I am the one most likely to break it apart. I cannot look him in the eye sober."
- **[@name](matrona.md)** — "She watches me like a hawk. I hate it because I know she is waiting for me to crack."
- **[@name](ciotka.md)** — "She still leaves food out for me. I cannot stand her kindness because I do not deserve it."
- **[@name](jagna.md)** — "I loved her, and she never looked at me. I was one of the men who hurt her, and when she ran, I let the mountain take her."

## Mechanics

### Drinking Buddy

- **Type:** bool
- **Per:** player
- **Start:** false

[@nickname](wujas.md)'s guard only drops for people who drink with him. Unlike a [Bond](#bond), this is not exclusive and not hidden — **any** number of PCs can become drinking buddies, and a player can feel themselves being pulled into his circle.

**Becoming a buddy** (GM tracks silently, no announcement):
- Share a full drinking session with him — Physique or the Alcoholic card. Nursing a glass or refusing does not count. The entry point is [Drink with the crew](#drink-with-the-crew) at the store, or drinking with him at [@name](../events/dinner.md).
- Do it without judging him, pulling rank, or steering straight to interrogation.

One qualifying session makes a PC a drinking buddy for the rest of the game. It cannot be lost.

### Crew Hostile

- **Type:** bool
- **Per:** world
- **Start:** false

[@nickname](wujas.md)'s drinking crew ([@name](secondary/szymek-kepa.md), [@name](secondary/romek-glowacz.md), [@name](secondary/franek-mucha.md)) shares one state.

- Set by [@name](../events/caught-at-the-still.md), when the committee fights the whole crew or pulls a gun on them.
- While Hostile: the crew is a standing enemy of the committee — no gossip, no drinking buddies, no cooperation. They move the still to a new site.
- Not set if only [@first-name](secondary/franek-mucha.md) is fought after [@nickname](wujas.md) vouches, or if the standoff is defused peacefully.

## Opportunities

### Cheap cigarettes give him away
- **Noticed by:** [Chainsmoker](../cards/chainsmoker.md)
- **When:** [@name](../locations/bimber-still.md) OR [@name](../locations/new-village/the-store.md)
<!-- Prompted by: setup:characters/wujas.md -->
- **Outcome:** With a bottle in hand he chain-smokes. A smoker reads the brand: the cheapest Sport, never Carmen.
- **Gives:** [`tadek-smokes-cheapest`](../clues/clues.md#tadek-smokes-cheapest)

### Nervous about being questioned
- **Noticed by:** [Empathy](../cards/empathy.md)
- **When:** [Census interview](#census-interview)
- **Outcome:** he is not nervous about the census; he is nervous about being asked anything at all.
- **Gives:** [`wujas-is-guilty`](../clues/clues.md#wujas-is-guilty)

### Drunk boast about a fake estate
- **When:** [Property assessment](#property-assessment)
- **Outcome:** Drunk, he performs a property boast: he claims a fake grand estate made of the still, his brother's house, and moonlight.

## Actions

### Drink with the crew
- **Requires:** [Physique](../cards/physique.md) OR [Alcoholic](../cards/alcoholic.md)
- **When:** ([@name](../locations/bimber-still.md) OR [@name](../locations/new-village/the-store.md)) AND [Crew Hostile](#crew-hostile) is false
- **Cost:** 1 time
- **Outcome:** The committee buys a round and shares a full session in the drinking circle. [@nickname](wujas.md) warms to whoever kept pace without judging him.
- **Changes:** [Drinking Buddy](#drinking-buddy) — the drinking PCs become [@nickname](wujas.md)'s drinking buddies

### Get shitfaced with Wujas
- **When:** [Drinking Buddy](#drinking-buddy) is true
- **Cost:** 2 time + 1 composure
- **Outcome:** The committee drinks [@nickname](wujas.md) past the point of guard. He gets loud, then maudlin, and grief for a woman he won't name slips out before he can catch it.
- **Gives:** [`wujas-misses-someone`](../clues/clues.md#wujas-misses-someone)

### Ask about the butcher
- **When:** [Drinking Buddy](#drinking-buddy) is true
<!-- Prompted by: hook:characters/butcher.md -->
- **Outcome:** Loose with drink, [@nickname](wujas.md) remembers [@name](butcher.md) sitting in on the crew's sessions years back, bottle in hand like any of them. Then one day he just stopped, and never came back to the fire.
- **Gives:** [`butcher-used-to-drink-with-the-crew`](../clues/clues.md#butcher-used-to-drink-with-the-crew)

### Census interview
- **Cost:** 1 time
- **Outcome:** He gives his name and age, reaches for the bottle, and tries to end the questions quickly.[](#nervous-about-being-questioned)
- **Changes:** [Census](../items/census.md#census) — [@nickname](wujas.md) [@surname](wujas.md), no fixed household

### Property assessment
- **Cost:** 1 time
- **Outcome:** He says he owns nothing and drifts between siblings' kitchens and the still.[](#drunk-boast-about-a-fake-estate)
- **Changes:** [Property Record](../items/census.md#property-record) — [@nickname](wujas.md) holds no property, dependent on family

### Get Pawelek the penicillin
<!-- Prompted by: [pawelek-needs-penicillin](../clues/clues.md#pawelek-needs-penicillin), [wujas-is-paweleks-father](../clues/clues.md#wujas-is-paweleks-father) -->
- **Cost:** 1 time
- **Outcome:** Faced with the sick boy being his own, [@nickname](wujas.md) goes to his sister [@name](matrona.md). She opens the cabinet for her brother and counts out a child's course, and no census changes hands.
- **Gives:** [@name](../items/penicillin.md)

## Bond

- [ ] Share a drink with him and match his pace — do not nurse it, do not judge.
- [ ] Ask about his youth or his music — show genuine curiosity about who he was before the bottle.
- [ ] Encounter his still and say nothing to anyone.

## Grudge

- [ ] Pour out his bottle, cut him off, or refuse to let him drink in front of you.
- [ ] Moralise at him about the drinking — lecture, pity, or try to "fix" him.
- [ ] Pull rank on him — threaten him with the committee's authority to make him talk.
