# Irena Gajda

## Hook

[@first-name](wife.md) [@surname](wife.md), the sołtys's wife.

## Vital Statistics

- **First name:** Irena
- **Surname:** Gajda
- **Status:** Resident
- **Morning:** [@name](../locations/new-village/wojewodas-house.md)
- **Afternoon:** [@name](../locations/new-village/wojewodas-house.md)
- **Evening:** [@name](../locations/new-village/wojewodas-house.md)
- **Night:** [@name](../locations/new-village/wojewodas-house.md)
- **Born:** 1924
- **Age in 1967:** 43
- **Lives in:** [@name](../locations/new-village/wojewodas-house.md) — with [@name](wojewoda.md), [@name](junior.md)
- **Settled:** ~1948 — first wave, with [@first-name](wojewoda.md)

## Character

Intelligent, observant, and dismissed. She has quietly investigated the 1954 disappearance for years, using [@first-name](junior.md) as her field agent, but she has avoided the thread that points at her husband.

## Setup

- **Clothes:** Pressed blouses, wool skirts without patches; dresses better than most village women.
- **Hair & face:** Dark hair pulled back in a severe bun going grey at the temples; angular face, high cheekbones.
- **Carriage:** Tall, straight posture; hands always busy while her eyes watch the room.

Speaks precisely, each word chosen. Tilts her head when listening, then files the detail away.

## Opinions

- **[@name](wojewoda.md)** — "I love him, and I have been solving the thing he hides because I wanted him to see me as an equal. Once I see his part in it, I still choose him, and I will hold him silent if he cannot hold himself."
- **[@name](junior.md)** — "My son is my hands in places I will not go. I know the danger reaches him before it reaches me, and I send him anyway."
- **[@name](matrona.md)** — "She is my sister-in-law, and something in her is closed and hard. I cannot read her, and that bothers me."
- **[@name](priest.md)** — "He told me to be quiet and stop noticing things. I went to him carefully, more than once, and I will not go back."
- **[@name](wujas.md)** — "He is a wreck, but a wreck who talks when drunk. [@first-name](junior.md) can get closer to him than I can."
- **[wujas-is-guilty](../clues/clues.md#wujas-is-guilty)** — "I knew it. Now I need the detail, the proof, and the piece that makes [@first-name](wojewoda.md) finally look."

## Mechanics

### Two Phases

- **Type:** enum (investigating | protector)
- **Per:** world
- **Start:** investigating

[@first-name](wife.md) starts as a rival investigator, then becomes [@first-name](wojewoda.md)'s protector if she connects him to the 1954 killing. The pivot is GM-timed from player behaviour and can fail to happen; if she stays blind, [@first-name](wojewoda.md) may confess at the [@name](../events/punishment-lynch.md) and die.

### Phase 1 — Investigating

- **Type:** rule
She trades cautiously with players who treat her as a peer. She shares nothing with players who patronize her.

### Phase 2 — Protector

- **Type:** rule
After [@name](../events/irena-confronts-wojewoda.md), she closes the household, pulls [@first-name](junior.md) home, and keeps [@first-name](wojewoda.md) from confessing.

## Opportunities

## Actions

### Trade clues (Phase 1)
- **When:** [Two Phases](#two-phases) is investigating
- **Cost:** 1 time
- **Outcome:** She waits for a real fact before she gives one back. Once the players put a useful clue on the table, she trades one for one.
- **Gives:** [jagna-painter-affair](../clues/clues.md#jagna-painter-affair), [ciotka-lives-in-soldiers-house](../clues/clues.md#ciotka-lives-in-soldiers-house)
- **Changes:** [Two Phases](#two-phases) — TBD

### Census interview
<!-- Prompted by: [committee-fills-census](../clues/clues.md#committee-fills-census) -->
- **Cost:** 1 time
- **Outcome:** She gives precise household details: names, ages, employment, no wasted words.
- **Changes:** [Census](../items/census.md#census) — [@first-name](wojewoda.md), [@first-name](wife.md), [@name](junior.md)

### Property assessment
<!-- Prompted by: [committee-notes-property-for-damage](../clues/clues.md#committee-notes-property-for-damage) -->
- **Cost:** 1 time
- **Outcome:** She says the house is her husband's and the papers are in order.
- **Changes:** [Property Record](../items/census.md#property-record) — [@first-name](wojewoda.md)'s house; [Two Phases](#two-phases) — TBD

## Bond

- [ ] Share a piece of information with her that her husband withheld — prove the players trust her.
- [ ] Ask her opinion on something investigative — treat her as a thinking partner, not a housewife.
- [ ] Be honest with her when caught in a contradiction — do not deflect.

## Grudge

- [ ] Speak to her in a patronizing or dismissive tone when she offers information.
- [ ] Side with [@first-name](wojewoda.md) in a disagreement in her presence.
- [ ] Ignore or brush off one of her pointed hints.
