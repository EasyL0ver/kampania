# Edek Barnaś

## Hook

[@first-name](glupek.md) [@surname](glupek.md), [@name](ciotka.md)'s large, simple-minded son and dependent.

## Vital Statistics

- **First name:** Edek
- **Surname:** Barnaś
- **Status:** Resident
- **Morning:** [@name](../locations/new-village/ciotkas-house/ciotkas-house.md)
- **Afternoon:** [@name](../locations/new-village/ciotkas-house/ciotkas-house.md)
- **Evening:** [@name](../locations/new-village/ciotkas-house/ciotkas-house.md)
- **Night:** [@name](../locations/new-village/ciotkas-house/ciotkas-house.md)
- **Born:** 1950
- **Age in 1967:** 17
- **Parents:** [@name](soldier.md) and [@name](marta-konieczna.md), both killed in the 1954 lynch
- **Lives in:** [@name](../locations/new-village/ciotkas-house/ciotkas-house.md) — with [@name](ciotka.md)
- **Settled:** Born in [@name](../locations/new-village/new-village.md)

## Character

Physically massive and brain-damaged from being smothered during the 1954 lynch. He talks in short sentences, understands more than villagers assume, and is living evidence of the crime.

## Setup

- **Clothes:** Always too small — trousers ending above the ankle, sleeves too short; whatever his aunt can find.
- **Hair & face:** Blond hair cropped unevenly by his aunt's kitchen scissors; soft round boy's face, pale blue eyes.
- **Carriage:** Huge for seventeen, with man's shoulders and boy's movements; moves slowly and goes still when frightened[](#ask-glupek-about-the-butcher).

His voice is surprisingly soft for his size. Kindness reaches him after a pause, then comes back as a careful smile.

## Opinions

- **[@name](ciotka.md)** — "Auntie feeds me and keeps me safe. I love her, and she has always been there."
- **[@name](priest.md)** — "The church is quiet and safe. He gives me little jobs and waits for me to finish."
- **[@name](butcher.md)** — "Something bad. When his dogs bark I hide, and when he passes I cannot move."

## Mechanics

### Shelter

- **Type:** enum (none | rectory | matronas)
- **Per:** world
- **Start:** none
- After [@name](../events/edek-in-the-bunker.md), [@first-name](glupek.md) is sheltered in one of two places.
- **At the priest's:** hidden by [@name](priest.md) in the [@name](../locations/new-village/the-church/the-rectory.md) cellar.
- **At [@first-name](matrona.md)'s:** in [@name](matrona.md)'s keeping at [@name](../locations/new-village/matronas-house.md).
- The two are mutually exclusive; he is at one or the other.

## Actions

### Talk to Glupek
- **Outcome:** He answers in short, simple sentences. He can give his routines, likes, dislikes, and basic memories of living with [@first-name](ciotka.md).
- **Gives:** hook:characters/glupek.md

### Ask Glupek about his mother
<!-- Prompted by: hook:characters/ciotka.md -->
- **Outcome:** He calls [@first-name](ciotka.md) "auntie," not mother. When asked about his real parents, he says he has only ever had his aunt.
- **Gives:** [`ciotka-adopted-glupek`](../clues/clues.md#ciotka-adopted-glupek)

### Ask Glupek about the cigarette
<!-- Prompted by: hook:items/glupeks-cigarette.md -->
- **Outcome:** He brightens and says the butcher gave it to him. [@surname](butcher.md) ruffles his hair and slips him food and little presents. [@first-name](glupek.md) keeps the cigarette but never lights it. He does not understand why the same man makes him freeze when the dogs bark.
- **Gives:** [`rezen-gave-edek-cigarette`](../clues/clues.md#rezen-gave-edek-cigarette)

### Ask Glupek about the butcher
<!-- Prompted by: setup:characters/glupek.md -->
- **Outcome:** He goes quiet and small. He says the butcher's dogs make him hide, and when [@surname](butcher.md) passes he cannot move. He does not know why.
- **Gives:** [`glupek-fears-butcher`](../clues/clues.md#glupek-fears-butcher)

### Census interview
<!-- Prompted by: [committee-fills-census](../clues/clues.md#committee-fills-census) -->
- **Cost:** 1 time
- **Outcome:** He gives short, willing answers: his name and that he lives with his aunt. If asked his age, he looks to [@first-name](ciotka.md).
- **Changes:** [Census](../items/census.md#census) — [@first-name](glupek.md) [@surname](glupek.md), in [@name](ciotka.md)'s household

### Property assessment
<!-- Prompted by: [committee-notes-property-for-damage](../clues/clues.md#committee-notes-property-for-damage) -->
- **Cost:** 1 time
- **Outcome:** He does not understand the question. He says it is his aunt's house.
- **Changes:** [Property Record](../items/census.md#property-record) — no property held, dependent in [@first-name](ciotka.md)'s house

## Bond

- [ ] Talk to him directly — not through Ciotka, not about him in third person while he is there.
- [ ] Show interest in something he cares about — his routines, his drawings, or the animals.
- [ ] Defend him when someone else is dismissive or cruel.
