# Janina Gajda

## Hook

[@first-name](ciotka.md) [@surname](ciotka.md), a downtrodden, devout woman who keeps house with her son [@first-name](glupek.md), sister to the sołtys.

## Vital Statistics

- **First name:** Janina
- **Surname:** Gajda
- **Status:** Resident
- **Morning:** [@name](../locations/new-village/ciotkas-house/ciotkas-house.md)
- **Afternoon:** [@name](../locations/new-village/ciotkas-house/ciotkas-house.md)
- **Evening:** [@name](../locations/new-village/ciotkas-house/ciotkas-house.md)
- **Night:** [@name](../locations/new-village/ciotkas-house/ciotkas-house.md)
- **Born:** 1912
- **Age in 1967:** 55
- **Heritage:** Lemko descent, hidden
- **Lives in:** [@name](../locations/new-village/ciotkas-house/ciotkas-house.md) — with [@name](glupek.md)
- **Settled:** ~1948, first wave with siblings

## Character

Devout, fearful, and honest when her guard drops. She is the moral heart of the 1954 tragedy: the person who saved [@name](glupek.md) and has lived with the cost ever since.

## Setup

- **Clothes:** Shapeless dark dresses buttoned to the throat; headscarf outdoors; a rosary in her apron pocket, worn to the string[](#real-faith-worn-into-daily-habit)
- **Hair & face:** Thin grey hair hidden under the scarf; gaunt cheeks, permanent dark circles
- **Carriage:** Shoulders hunched, eyes down, flinches at raised voices; steadier at home with [@name](glupek.md)
- **Voice:** Thin and breathy in public; silence when frightened

At home she moves around[](#property-assessment) [@first-name](glupek.md) with practiced care[](#tender-care-for-glupek). In public she makes herself smaller[](#census-interview) and lets other people fill the space.

## Opinions

- **[@name](glupek.md)** — "He's my son. He needs looking after, and I look after him. That's all there is to it."
- **[@name](butcher.md)** — "The butcher keeps to himself. I don't have dealings with him."
  - *(Bond):* "I lock my door because of that man. Don't ask me why. Please."
- **[@name](priest.md)** — "The priest is a good man. I go to him for confession, like anyone."
- **[@name](wojewoda.md)** — "My brother is the sołtys. He has been good to me — the house, the boy. I do as he asks."
- **[@name](matrona.md)** — "[@first-name](matrona.md) runs the store. We're sisters. We manage."
- **[@name](wujas.md)** — "[@nickname](wujas.md) drinks too much. He's still family."
- **[wujas-is-guilty](../clues/clues.md#wujas-is-guilty)** — "He's my brother. He's not a bad man, and I'll not give strangers more than that."
- **[ciotka-avoids-family](../clues/clues.md#ciotka-avoids-family)** — "I keep busy with [@first-name](glupek.md) and the house. It's hard to get away for gatherings."
  - *(Bond):* "I can't sit at that table. It isn't for the boy's sake. It's mine."

## Mechanics

### Alive

- **Type:** bool
- **Per:** world
- **Start:** true
- False from the morning she is found dead.

## Opportunities

### Flinching at mentions of siblings
- **When:** [Census interview](#census-interview)
- **Outcome:** At any mention of her siblings she flinches: she pulls tight, changes the subject, hands busy. The distance is hers and it costs her.
- **Gives:** [`ciotka-avoids-family`](../clues/clues.md#ciotka-avoids-family)

### Real faith worn into daily habit
- **Noticed by:** [Devotion](../cards/devotion.md)
- **When:** setup:characters/ciotka.md
<!-- Prompted by: setup:characters/ciotka.md -->
- **Outcome:** Her faith is real: the rosary in her apron pocket is worn to the string, and she murmurs prayers before eating or leaving a room, performing them for no one. She carries it like penance.
- **Gives:** [`ciotka-is-devout`](../clues/clues.md#ciotka-is-devout)

### Tender care for Glupek
- **Noticed by:** [Empathy](../cards/empathy.md)
- **When:** setup:characters/ciotka.md
- **Outcome:** watch her with [@first-name](glupek.md) and the fear leaves her face. She reads his moods before he shows them, warms his food to the temperature he likes, steadies him without being asked. Whatever else she is, this is a woman who loves this boy and has built her whole small life around caring for him.

### Coffee as Ciotka's private ritual
- **When:** [Accept her coffee](#accept-her-coffee)
- **Outcome:** [@first-name](ciotka.md) sets out coffee for the committee, hospitality she will not skip. [@name](glupek.md) is given a cup too and flinches at the first taste, baffled that anyone drinks something so bitter, and leaves it untouched. Coffee in that house is hers alone.
- **Gives:** [`glupek-wont-drink-coffee`](../clues/clues.md#glupek-wont-drink-coffee)

## Actions

### Accept her coffee
- **Outcome:** She sets out coffee for the committee and pours a cup for [@first-name](glupek.md) too[](#coffee-as-ciotkas-private-ritual).

### Census interview
<!-- Prompted by: setup:characters/ciotka.md -->
- **Cost:** 1 time
- **Outcome:** She presents her son [@name](glupek.md) to the committee, then lists herself as mother and [@name](soldier.md) as the father who left the village — a Barnaś, though her own name is Gajda. The house and boy are both presented as hers.[](#flinching-at-mentions-of-siblings)
- **Gives:** [`edeks-father-left`](../clues/clues.md#edeks-father-left), hook:characters/soldier.md, hook:characters/glupek.md
- **Changes:** [Census](../items/census.md#census) — [@first-name](ciotka.md) [@surname](ciotka.md) and [@name](glupek.md)

### Property assessment
<!-- Prompted by: setup:characters/ciotka.md -->
- **Cost:** 1 time
- **Outcome:** She says the house belongs to her brother, the sołtys, who gave it to her. She claims no deed and no title of her own.
- **Gives:** [`ciotka-house-is-wojewodas`](../clues/clues.md#ciotka-house-is-wojewodas)
- **Changes:** [Property Record](../items/census.md#property-record) — no title in [@first-name](ciotka.md)'s name

## Bond

- [ ] Ask [@first-name](ciotka.md) about old ways, herbs, or customs.
- [ ] Arrive without official bearing, clipboard, demands, or government tone.
- [ ] Treat [@name](glupek.md) gently in her presence.

## Grudge

- [ ] Startle or upset [@name](glupek.md) in her presence.
- [ ] Flash credentials or use an authoritative or bureaucratic tone with her.
- [ ] Mention Operation Vistula, resettlement, or "the old village" directly.

