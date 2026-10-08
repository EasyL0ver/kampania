# Barbara Kopacz

**Type:** Named character — villager

## Hook

Barbara Kopacz, a PGR worker and young mother, lives with her family in the red-brick house.

## Vital Statistics

- **Status:** Resident
- **Born:** 1939
- **Age in 1967:** 28
- **Heritage:** Half-Lemko; raised Polish and Catholic
- **Lives in:** [Barbara Kopacz's house](../locations/barbaras-house.md) — with [Stefania Kopacz](babcia.md), [Pawełek Kopacz](pawelek.md)
- **Settled:** After 1954 for PGR work

## Character

Poor, warm, curious, and dangerously open. She is the village sieve: what the players tell her reaches [Ryszard Dudka](neighbour.md) by evening.

## Appearance

- **Clothes:** Faded floral housedress, oversized man's cardigan, rubber boots caked in mud
- **Hair & face:** Soft brown hair in a loose practical bun; round face, high Lemko cheekbones, warm brown eyes
- **Carriage:** Leans in when she talks, touches arms, and fills space with unguarded warmth
- **Voice:** Loud, friendly, and easy to overhear across the yard

She never seems to lower her voice. Her kindness makes conversation feel safe, which is why players may not notice how much they are giving away.

## Opinions

- **[Tadek Gajda](wujas.md)** — "One night, years ago. We got drunk and had a good time; sometimes the timing and Pawełek's face surface in my mind, and I push the thought away."
- **[Marek Gajda](junior.md)** — "The father. He has to be. He visits sometimes, late and awkward, and I do not push him."
- **[Zbigniew Gajda](wojewoda.md)** — "He knows Pawełek is Marek's. I hate needing his help, but Pawełek needs stability, so I keep quiet and take what is offered."
- **[Pawełek Kopacz](pawelek.md)** — "Everything. My whole world. I would burn the village down for him."
- **[Stefania Kopacz](babcia.md)** — "My mother. I do not understand her language, prayers, or world, but she is gentle with Pawełek and that is enough."
- **[Ryszard Dudka](neighbour.md)** — "My rock. He brings firewood, fixes the fence, watches Pawełek, and asks how my day was."
- **[ks. Władysław Pająk](priest.md)** — "I go to church because you go to church. He is kind, and faith is always there, like wallpaper."

## Opportunities

- **The missing father matters** `(when: Census interview)` `(noticed by: [Empathy](../cards/empathy.md))` — Her warmth stays in place, but her jaw sets and she waits for the question to pass.
- **The census omission is formal** `(when: Census interview)` `(noticed by: [Bureaucracy](../cards/bureaucracy.md))` — A census form with no father listed is a bureaucratic flag.
- **The household economics do not fit** `(when: Census interview)` `(noticed by: [Bureaucracy](../cards/bureaucracy.md))` — Three household members and one farm-labour income cannot explain the house and supplies. → Gives: [`barbara-has-help`](../clues/clues.md#barbara-has-help)
- **Barbara fishes while she talks** `(when: Ask about the village)` `(noticed by: [Finesse](../cards/finesse.md))` — Every answer ends with a question about the committee, the survey, or what the players have found. → Gives: [`barbara-is-a-sieve`](../clues/clues.md#barbara-is-a-sieve)
- **Barbara's social map has omissions** `(when: Ask about the village)` `(noticed by: [Finesse](../cards/finesse.md))` — Her kind descriptions skip [Stanisław Rezeń](butcher.md) unless asked, soften [Tadek Gajda](wujas.md), and avoid judging [Helena Rzepka](matrona.md).

## Actions

### Census interview
- **Prompted by:** [committee-fills-census](../clues/clues.md#committee-fills-census)
- **Cost:** 1 time
- **Outcome:** Barbara gives her name, age, household members, and employment cheerfully. She will not name [Pawełek Kopacz](pawelek.md)'s father.
- **Gives:** [`barbara-refuses-father`](../clues/clues.md#barbara-refuses-father)
- **Changes:** [Census](../items/census.md#census) — Barbara Kopacz, Stefania Kopacz, and Pawełek Kopacz

### Push her about the father
- **Requires:** [Violence](../cards/violence.md) OR [Bureaucracy](../cards/bureaucracy.md)
- **Prompted by:** [barbara-refuses-father](../clues/clues.md#barbara-refuses-father)
- **Outcome:** She names [Marek Gajda](junior.md) and begs the players not to write it down. If they record it, [Zbigniew Gajda](wojewoda.md) sees the census form.
- **Gives:** [`marek-is-paweleks-father`](../clues/clues.md#marek-is-paweleks-father)

### Probe her about the help she has
- **Requires:** [Speech](../cards/speech.md)
- **Prompted by:** [barbara-has-help](../clues/clues.md#barbara-has-help), [barbara-refuses-father](../clues/clues.md#barbara-refuses-father)
- **Outcome:** She names [Marek Gajda](junior.md) and begs the players not to write it down. If they record it, [Zbigniew Gajda](wojewoda.md) sees the census form.
- **Gives:** [`marek-is-paweleks-father`](../clues/clues.md#marek-is-paweleks-father)

### Property assessment
- **Prompted by:** [committee-notes-property-for-damage](../clues/clues.md#committee-notes-property-for-damage)
- **Cost:** 1 time
- **Outcome:** She names the red-brick house and small plot as hers, with vague papers. Pressed on who built or pays for it, she goes quiet.
- **Gives:** [`barbara-has-help`](../clues/clues.md#barbara-has-help)
- **Changes:** [Property Record](../items/census.md#property-record) — Barbara Kopacz's house and plot

### Ask about the village
- **Prompted by:** aware:locations/new-village.md
- **Outcome:** Barbara gives a generous social map: [Zbigniew Gajda](wojewoda.md) has the phone, the Gajda siblings keep the church supplied, [Ryszard Dudka](neighbour.md) helps her, [Michał Pytlak](foreman.md) is busy, and the old village is not somewhere people go. Every answer comes with a friendly question back.
- **Gives:** [`wojewoda-has-only-phone`](../clues/clues.md#wojewoda-has-only-phone), [`siblings-fund-the-church`](../clues/clues.md#siblings-fund-the-church)

### Ask about the old village
- **Prompted by:** aware:locations/old-village-ruins.md
- **Outcome:** She lowers her voice. Nobody goes up to the old village, she says; it is a bad place, haunted, and folk keep well away, after dark most of all. She is passing on the village feeling, not anything she has seen herself.
- **Gives:** [`old-village-is-haunted`](../clues/clues.md#old-village-is-haunted)

### Ask Barbara about the three-barred cross
- **Prompted by:** [three-barred-cross-in-babcias-room](../clues/clues.md#three-barred-cross-in-babcias-room)
- **Outcome:** She says the cross is her mother's and that it belongs to "the old way." She cannot explain the theology or history.
- **Gives:** [`three-barred-cross-is-lemko`](../clues/clues.md#three-barred-cross-is-lemko), [`babcia-is-lemko`](../clues/clues.md#babcia-is-lemko)

### Show Barbara the dress
- **Requires:** [blue dress](../items/girls-dress.md)
- **Prompted by:** [girls-dress-in-ciotkas-house](../clues/clues.md#girls-dress-in-ciotkas-house)
- **Outcome:** She takes it, turns it over, and knows the cut at once: this was made for a teenage girl, not a grown woman and not a child.
- **Gives:** [`dress-belonged-to-teenage-girl`](../clues/clues.md#dress-belonged-to-teenage-girl)

## Bond

- [ ] Help with [Pawełek Kopacz](pawelek.md) in a practical way.
- [ ] Bring something small and kind for [Pawełek Kopacz](pawelek.md).
- [ ] Sit and talk with her about ordinary life before asking investigative questions.

