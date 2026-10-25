# Helena Rzepka (née Gajda)

**Tags:** [@name](../tags/villager.md), [@name](../tags/churchgoer.md)

## Hook

[@first-name](matrona.md) [@surname](matrona.md), the devout woman who runs the village store.

## Vital Statistics

- **First name:** Helena
- **Surname:** Rzepka
- **Maiden name:** Gajda
- **Status:** Resident
- **Morning:** [@name](../locations/new-village/matronas-house.md)
- **Afternoon:** [@name](../locations/new-village/matronas-house.md)
- **Evening:** [@name](../locations/new-village/matronas-house.md)
- **Night:** [@name](../locations/new-village/matronas-house.md)
- **Born:** 1922
- **Age in 1967:** 45
- **Heritage:** Lemko (hidden) — see [@name](wojewoda.md) for shared sibling background
- **Lives in:** [@name](../locations/new-village/matronas-house.md) — with [@name](painter.md), [@name](secondary/ewa-rzepka.md), [@name](secondary/krystian-rzepka.md)
- **Settled:** ~1948 — first wave, with siblings

## Character

Devout in public and impenetrable in private. She is the sober architect of the 1954 lynch, the hardest sibling to crack, and the one most able to turn guilt into order.

## Setup

- **Clothes:** Immaculate dark clothes — cardigan buttoned to the throat, always an apron, small crucifix at her collar.
- **Hair & face:** Dark hair pinned tight beneath a headscarf; thin lips, pale grey unblinking eyes.
- **Carriage:** Tall, straight-backed, and economical; hands busy with rosary, knitting, or wiping something already clean.[](#introduce-yourself)

People lower their voices around her. Her own voice stays low and measured, so others lean in instead of asking her to speak up.

## Opinions

- **[@name](painter.md)** — "He is my husband and my responsibility. Broken men do not wander far if the house gives them shape."
- **[@name](wojewoda.md)** — "He manages the village; I manage what may be said inside it. I trust his competence more than his nerve."
- **[@name](wujas.md)** — "My brother is weak, drunk, and dangerous to the family by accident. I watch him because he may speak before he thinks."
- **[@name](ciotka.md)** — "[@first-name](ciotka.md)'s silence comes from love. Mine comes from will."
- **[@name](priest.md)** — "He sees a struggling soul and wants to protect it. That is useful."
- **[@name](wife.md)** — "She suspects too much and can prove too little. I keep her close enough to measure and far enough to starve."
- **[wujas-is-guilty](../clues/clues.md#wujas-is-guilty)** — "My brother is a troubled soul. I pray for him every day."
- **[ciotka-overdosed](../clues/clues.md#ciotka-overdosed)** — "My sister's nerves were bad for years, and the doctor gave her something for them. She took too much of it the one time it mattered. God rest her; it was her own hand and her own frailty, and nothing more."
- **[ciotka-hurt-before-death](../clues/clues.md#ciotka-hurt-before-death)** — "She was an old woman with thin skin. She bruised if you so much as took her arm to help her up. A mark on the wrist is grief looking for a guilty man where there is none."
- **[ciotka-house-wrecked](../clues/clues.md#ciotka-house-wrecked)** — "The boy she kept has the temper of a child twice his size. He broke things when he was crossed, and she forgave him every time. One corner knocked about is the last of his tantrums, not a murder."
- **[ciotka-had-a-visitor](../clues/clues.md#ciotka-had-a-visitor)** — "A widow at the edge of the village had family who looked in on her. Two cups on a table mean someone was kind enough to sit with her. I will not have a coffee cup turned into an accusation."

## Mechanics

### Robbery suspect

- **Type:** enum (none | junior | committee)
- **Per:** world
- **Start:** none
- Who [@first-name](matrona.md) will blame if the penicillin goes missing.
- Set once, by whoever first asks her for penicillin. Her brother [@nickname](wujas.md) never counts: she simply gives it to him.
- It only counts if the penicillin goes missing. If the till is robbed too, the money masks the motive and she suspects no one.
- TBD: if she suspects the committee, every committee member lodging at her house loses the [Lodging at Matrona's](../cards/lodging-at-matronas.md) card.

## Actions

### Introduce yourself
<!-- Prompted by: setup:characters/matrona.md -->
- **Outcome:** TBD.
- **Gives:** hook:characters/matrona.md

### Census interview
<!-- Prompted by: [committee-fills-census](../clues/clues.md#committee-fills-census) -->
- **Cost:** 1 time
- **Outcome:** She gives herself, [@name](painter.md), and the two children before the question is finished.
- **Changes:** [Census](../items/census.md#census) — [@first-name](matrona.md), [@first-name](painter.md), [@first-name](secondary/ewa-rzepka.md), [@name](secondary/krystian-rzepka.md)

### Property assessment
<!-- Prompted by: [committee-notes-property-for-damage](../clues/clues.md#committee-notes-property-for-damage) -->
- **Cost:** 1 time
- **Outcome:** She names the house and [@name](../locations/new-village/the-store.md) she runs, with papers in order.
- **Changes:** [Property Record](../items/census.md#property-record) — Rzepka house and store

### Ask for the penicillin
<!-- Prompted by: [pawelek-needs-penicillin](../clues/clues.md#pawelek-needs-penicillin) -->
- **Cost:** 1 time
- **Outcome:** She holds the only cabinet key and will not turn it for nothing. The penicillin is theirs, she says, on one condition: the committee lets her fill the village census in their stead, a kindness to spare busy officials the walking. She will not open the cabinet until they agree. Word of the sick child and what he needs reaches her sister [@name](ciotka.md).
- **Gives:** [helena-demands-the-census](../clues/clues.md#helena-demands-the-census)
- **Changes:** [Robbery suspect](#robbery-suspect) — committee, if no one asked before

### Agree to her terms
<!-- Prompted by: [helena-demands-the-census](../clues/clues.md#helena-demands-the-census) -->
- **Cost:** 1 time + [@name](../items/census.md)
- **Outcome:** They agree, and she turns the key. She counts out a child's course of penicillin and takes the census book from their hands: from now the count is hers to fill, hers to decide what it shows.
- **Gives:** [@name](../items/penicillin.md), hook:items/penicillin.md
- **Changes:** [Keeper](../items/census.md#keeper) — [@first-name](matrona.md) [@surname](matrona.md) fills it herself

## Bond

- [ ] Accept her tea and her framing of events without visible contradiction.
- [ ] Compliment her household, her faith, or her role in the community.
- [ ] Ask her to introduce you to someone — let her be the gatekeeper.

## Grudge

- [ ] Contradict her version of events in front of another villager.
- [ ] Show disrespect in her home — refuse food, interrupt her, or sit without being offered.
- [ ] Ask direct questions about the Rzepka family's role in the old violence.
