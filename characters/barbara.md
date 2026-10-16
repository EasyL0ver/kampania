# Barbara Kopacz

## Hook

[@first-name](barbara.md) [@surname](barbara.md), a PGR worker and young mother, lives with her family in the red-brick house.

## Vital Statistics

- **First name:** Barbara
- **Surname:** Kopacz
- **Status:** Resident
- **Morning:** [@name](../locations/new-village/pgr-farm/pgr-farm.md)
- **Afternoon:** [@name](../locations/new-village/pgr-farm/pgr-farm.md)
- **Evening:** [@name](../locations/new-village/barbaras-house.md)
- **Night:** [@name](../locations/new-village/barbaras-house.md)
- **Born:** 1939
- **Age in 1967:** 28
- **Heritage:** Half-Lemko; raised Polish and Catholic
- **Lives in:** [@name](../locations/new-village/barbaras-house.md) — with [@name](babcia.md), [@name](pawelek.md)
- **Settled:** After 1954 for PGR work

## Character

Poor, warm, curious, and dangerously open. She is the village sieve: what the players tell her reaches [@name](neighbour.md) by evening.

## Setup

- **Clothes:** Faded floral housedress, oversized man's cardigan, rubber boots caked in mud
- **Hair & face:** Soft brown hair in a loose practical bun; round face, high Lemko cheekbones, warm brown eyes
- **Carriage:** Leans in when she talks, touches arms, and fills space with unguarded warmth
- **Voice:** Loud, friendly, and easy to overhear across the yard

She never seems to lower her voice. Her kindness makes conversation feel safe, which is why players may not notice how much they are giving away.

## Opinions

- **[@name](wujas.md)** — "One night, years ago. We got drunk and had a good time; sometimes the timing and [@first-name](pawelek.md)'s face surface in my mind, and I push the thought away."
- **[@name](junior.md)** — "The father. He has to be. He visits sometimes, late and awkward, and I do not push him."
- **[@name](wojewoda.md)** — "He knows [@first-name](pawelek.md) is [@first-name](junior.md)'s. I hate needing his help, but [@first-name](pawelek.md) needs stability, so I keep quiet and take what is offered."
- **[@name](pawelek.md)** — "Everything. My whole world. I would burn the village down for him."
- **[@name](babcia.md)** — "My mother. I do not understand her language, prayers, or world, but she is gentle with [@first-name](pawelek.md) and that is enough."
- **[@name](neighbour.md)** — "My rock. He brings firewood, fixes the fence, watches [@first-name](pawelek.md), and asks how my day was."
- **[@name](priest.md)** — "I go to church because you go to church. He is kind, and faith is always there, like wallpaper."

## Mechanics

### Side

- **Type:** enum (players | dudka)
- **Per:** world
- **Start:** dudka
- Whose side she takes when the mob forms. TBD: no action sets it yet.

## Opportunities

### Warmth hides a guarded jaw
- **Noticed by:** [Empathy](../cards/empathy.md)
- **When:** [Census interview](#census-interview)
- **Outcome:** When the missing father comes up, her warmth stays in place, but her jaw sets and she waits for the question to pass.

### Census form omits the father
- **Noticed by:** [Bureaucracy](../cards/bureaucracy.md)
- **When:** [Census interview](#census-interview)
- **Outcome:** A census form with no father listed is a bureaucratic flag.

### Household income cannot cover supplies
- **Noticed by:** [Bureaucracy](../cards/bureaucracy.md)
- **When:** [Census interview](#census-interview)
- **Outcome:** Three household members and one farm-labour income cannot explain the house and supplies.
- **Gives:** [`barbara-has-help`](../clues/clues.md#barbara-has-help)

### Barbara answers with questions
- **Noticed by:** [Finesse](../cards/finesse.md)
- **When:** [Ask about the village](#ask-about-the-village)
- **Outcome:** [@first-name](barbara.md) fishes: every answer ends with a question about the committee, the survey, or what the players have found.
- **Gives:** [`barbara-is-a-sieve`](../clues/clues.md#barbara-is-a-sieve)

### Kind words skip key names
- **Noticed by:** [Finesse](../cards/finesse.md)
- **When:** [Ask about the village](#ask-about-the-village)
- **Outcome:** [@first-name](barbara.md)'s kind descriptions skip [@name](butcher.md) unless asked, soften [@name](wujas.md), and avoid judging [@name](matrona.md).

## Actions

### Census interview
<!-- Prompted by: [committee-fills-census](../clues/clues.md#committee-fills-census) -->
- **Cost:** 1 time
- **Outcome:** [@first-name](barbara.md) gives her name, age, household members[](#census-form-omits-the-father), and employment[](#household-income-cannot-cover-supplies) cheerfully. She will not name[](#warmth-hides-a-guarded-jaw) [@name](pawelek.md)'s father.
- **Gives:** [`barbara-refuses-father`](../clues/clues.md#barbara-refuses-father)
- **Changes:** [Census](../items/census.md#census) — [@first-name](barbara.md) [@surname](barbara.md), [@name](babcia.md), and [@name](pawelek.md)

### Push her about the father
- **Requires:** [Violence](../cards/violence.md) OR [Bureaucracy](../cards/bureaucracy.md)
<!-- Prompted by: [barbara-refuses-father](../clues/clues.md#barbara-refuses-father) -->
- **Outcome:** She names [@name](junior.md) and begs the players not to write it down. If they record it, [@name](wojewoda.md) sees the census form.
- **Gives:** [`marek-is-paweleks-father`](../clues/clues.md#marek-is-paweleks-father)

### Probe her about the help she has
- **Requires:** [Speech](../cards/speech.md)
<!-- Prompted by: [barbara-has-help](../clues/clues.md#barbara-has-help), [barbara-refuses-father](../clues/clues.md#barbara-refuses-father) -->
- **Outcome:** She names [@name](junior.md) and begs the players not to write it down. If they record it, [@name](wojewoda.md) sees the census form.
- **Gives:** [`marek-is-paweleks-father`](../clues/clues.md#marek-is-paweleks-father)

### Property assessment
<!-- Prompted by: [committee-notes-property-for-damage](../clues/clues.md#committee-notes-property-for-damage) -->
- **Cost:** 1 time
- **Outcome:** She names the red-brick house and small plot as hers, with vague papers. Pressed on who built or pays for it, she goes quiet.
- **Gives:** [`barbara-has-help`](../clues/clues.md#barbara-has-help)
- **Changes:** [Property Record](../items/census.md#property-record) — [@first-name](barbara.md) [@surname](barbara.md)'s house and plot

### Ask about the village
<!-- Prompted by: hook:locations/new-village/new-village.md -->
- **Outcome:** [@first-name](barbara.md) gives a generous social map[](#kind-words-skip-key-names): [@name](wojewoda.md) has the phone, the Gajda siblings keep the church supplied, [@name](neighbour.md) helps her, [@name](foreman.md) is busy, and the old village is not somewhere people go. Every answer comes with a friendly question back.[](#barbara-answers-with-questions)
- **Gives:** [`wojewoda-has-only-phone`](../clues/clues.md#wojewoda-has-only-phone), [`siblings-fund-the-church`](../clues/clues.md#siblings-fund-the-church)

### Talk to her
- **When:** [@name](../events/committee-visit/day-5/day-5.md) OR [@name](../events/committee-visit/day-6/day-6.md) OR [@name](../events/committee-visit/day-7/day-7.md)
- **Outcome:** She is worried about [@first-name](neighbour.md): he went out in the night and came back late, and will not say where he had been.
- **Gives:** [`neighbour-gone-at-night`](../clues/clues.md#neighbour-gone-at-night)

### Ask about the old village
<!-- Prompted by: hook:locations/old-village-ruins.md -->
- **Outcome:** She lowers her voice. Nobody goes up to the old village, she says; it is a bad place, haunted, and folk keep well away, after dark most of all. She is passing on the village feeling, not anything she has seen herself.
- **Gives:** [`old-village-is-haunted`](../clues/clues.md#old-village-is-haunted)

### Ask Barbara about the three-barred cross
<!-- Prompted by: [three-barred-cross-in-babcias-room](../clues/clues.md#three-barred-cross-in-babcias-room) -->
- **Outcome:** She says the cross is her mother's and that it belongs to "the old way." She cannot explain the theology or history.
- **Gives:** [`three-barred-cross-is-lemko`](../clues/clues.md#three-barred-cross-is-lemko), [`babcia-is-lemko`](../clues/clues.md#babcia-is-lemko)

### Show Barbara the dress
- **Requires:** [@name](../items/girls-dress.md)
<!-- Prompted by: [girls-dress-in-ciotkas-house](../clues/clues.md#girls-dress-in-ciotkas-house) -->
- **Outcome:** She takes it, turns it over, and knows the cut at once: this was made for a teenage girl, not a grown woman and not a child.
- **Gives:** [`dress-belonged-to-teenage-girl`](../clues/clues.md#dress-belonged-to-teenage-girl)

## Bond

- [ ] Help with [@name](pawelek.md) in a practical way.
- [ ] Bring something small and kind for [@name](pawelek.md).
- [ ] Sit and talk with her about ordinary life before asking investigative questions.

