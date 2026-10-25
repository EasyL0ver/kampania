# Marek Gajda

## Hook

[@first-name](junior.md) [@surname](junior.md), the sołtys's hot-tempered young son.

## Vital Statistics

- **First name:** Marek
- **Surname:** Gajda
- **Status:** Resident
- **Morning:** [@name](../locations/new-village/wojewodas-house.md)
- **Afternoon:** [@name](../locations/new-village/wojewodas-house.md)
- **Evening:** [@name](../locations/new-village/the-store.md)
- **Night:** [@name](../locations/new-village/wojewodas-house.md)
- **Born:** 1946
- **Age in 1967:** 21
- **Lives in:** [@name](../locations/new-village/wojewodas-house.md) — with [@name](wojewoda.md), [@name](wife.md)
- **Settled:** Born in [@name](../locations/new-village/new-village.md)

## Character

Leather jacket, temper, and a useful bad reputation. He looks like the problem, but he is running a parallel investigation for [@name](wife.md) and will turn back toward family loyalty if she does.

## Setup

- **Clothes:** Newer leather jacket over a dark turtleneck, scuffed boots, jeans when he can get them.
- **Hair & face:** Dark hair grown longer than the village approves of, swept back with Brylcreem; sharp jaw, father's hard eyes.
- **Carriage:** Lean, wiry, unable to sit still; shifts weight, drums fingers, cracks knuckles.

A cigarette is usually between his lips or behind his ear. His studied cool drops when he gets angry, and then he speaks fast.

## Opinions

- **[@name](wojewoda.md)** — "I respect his strength and hate his silence. He is hiding something enormous, and every stare tells me to drop it."
- **[@name](wife.md)** — "I trust her completely. She asked me to dig, so I dig."
- **[@name](wujas.md)** — "He drinks, talks, and forgets what he said. I do not like using him, but Mother needs answers."
- **[@name](matrona.md)** — "I avoid being alone with her. She watches too closely."
- **[@name](ciotka.md)** — "She was kind to me when I was small. I do not understand why she lives apart from everyone."
- **[@name](barbara.md)** — "She is the only good thing here. With her, I stop being a Gajda for a while."
- **[wujas-is-guilty](../clues/clues.md#wujas-is-guilty)** — "Do not make him into a monster before I know what happened. But if he is guilty, I need the rest."

## Mechanics

### Investigating

- **Type:** bool
- **Per:** world
- **Start:** true
- True while he runs [@first-name](wife.md)'s errands as her field agent. False once she pulls him home.

## Opportunities

### Junior smoking away from his father
- **Noticed by:** [Chainsmoker](../cards/chainsmoker.md)
- **When:** [@name](../locations/new-village/the-store.md)
- **Outcome:** Away from his father, drinking with the crew, Junior lights up. A smoker reads the brand: Carmen.
- **Gives:** [junior-smokes-carmen](../clues/clues.md#junior-smokes-carmen)

## Actions

### Offer him a Carmen
- **Requires:** [@name](../items/pack-of-cigarettes.md)
<!-- Prompted by: [butts-at-ciotkas-are-carmen](../clues/clues.md#butts-at-ciotkas-are-carmen) -->
- **Outcome:** He takes it as his own, the one thing he spends on to feel above the place. Offer him a cheap Sport and he waves it off: that is not what he smokes, and you learn nothing.
- **Gives:** [junior-smokes-carmen](../clues/clues.md#junior-smokes-carmen)

### Census interview
<!-- Prompted by: [committee-fills-census](../clues/clues.md#committee-fills-census) -->
- **Cost:** 1 time
- **Outcome:** He gives his name and age, and treats the interview like a joke. He answers for himself only.
- **Changes:** [Census](../items/census.md#census) — [@first-name](junior.md) [@surname](junior.md), in his father's household

### Property assessment
<!-- Prompted by: [committee-notes-property-for-damage](../clues/clues.md#committee-notes-property-for-damage) -->
- **Cost:** 1 time
- **Outcome:** He says he owns nothing and lives under his father's roof. He waves the question off.
- **Changes:** [Property Record](../items/census.md#property-record) — no property of his own, lives in his father's house

### Drink them under the table
- **Requires:** [@name](../tags/alcohol.md)
<!-- Prompted by: hook:characters/junior.md -->
- **Cost:** 1 time
- **Outcome:** Past his limit the cool goes and he talks too fast: he is not snooping for himself, his mother sends him, she has been digging into the old days for years. Then he slides off the bench.
- **Gives:** [`wife-has-been-investigating`](../clues/clues.md#wife-has-been-investigating)

### Drink with them
- **Requires:** [@name](../tags/alcohol.md)
<!-- Prompted by: hook:characters/junior.md -->
- **Cost:** 1 time
- **Outcome:** He drinks with you like a man glad of the company, and lights a Carmen to show he can.
- **Gives:** [`junior-smokes-carmen`](../clues/clues.md#junior-smokes-carmen)

## Bond

- [ ] Talk to him about life in the city — Warsaw, Kraków, anywhere that is not here.
- [ ] Ask his opinion and wait for the full answer instead of cutting him off.
- [ ] Offer him something from outside — a newspaper, a cigarette brand he cannot get, or a story from the road.
