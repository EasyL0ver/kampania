# ks. Władysław Pająk

## Hook

[@title](priest.md) [@first-name](priest.md) [@surname](priest.md), the village's Roman Catholic priest, found at the church and rectory.

## Vital Statistics

- **First name:** Władysław
- **Surname:** Pająk
- **Title:** ks.
- **Status:** Resident
- **Morning:** [@name](../locations/new-village/the-church/the-church.md)
- **Afternoon:** [@name](../locations/new-village/the-church/the-church.md)
- **Evening:** [@name](../locations/new-village/the-church/the-rectory.md)
- **Night:** [@name](../locations/new-village/the-church/the-rectory.md)
- **Born:** 1925
- **Age in 1967:** 42
- **Lives in:** [@name](../locations/new-village/the-church/the-rectory.md) — attached to the church
- **Settled:** After 1954 — assigned to the parish after the lynch

## Character

Roman Catholic priest who knows the village's blood-guilt through thirteen years of confessions and has chosen silence. As the flood rises, his crisis of faith drives the [Grace ending](../story-facts/spiritual-endings.md): whether he grants the Day-7 odpust or breaks the seal.

## Setup

- **Clothes:** Black cassock daily, brushed, collar a stark white line; in cold weather a heavy wool overcoat and black beret
- **Hair & face:** Receding hairline, dark hair combed back, clean-shaven; long narrow face, deep-set brown eyes that hold yours too long
- **Carriage:** Tall and slightly stooped; bends to listen, moves slowly, and makes people orient around his stillness

His baritone stays intimate in conversation. When uncomfortable, his hand goes to his collar, adjusts it, and comes away.

## Opinions

- **[@name](matrona.md)** — "She is my closest parishioner. I see conviction in her and would defend her first if anyone came asking. If her piety is a performance, I have spent thirteen years failing to see it."
- **[@name](wojewoda.md)** — "He controls the village politically, and I control it spiritually. We share meals, negotiate disputes, and pretend the church funding that passes through him buys nothing."
- **[@name](officer.md)** — "I fear what he represents: the machinery that could strip me of my parish. We both want quiet, but he sees me as an enemy of the state and I see him as an enemy of God."
- **[@name](ciotka.md)** — "She is my heaviest burden. She comes for comfort, and what passes between us is a full account of a murder that I cannot speak aloud."
- **[wujas-is-guilty](../clues/clues.md#wujas-is-guilty)** — "Every man carries his own cross. I will not break the seal of confession, but the weight is on my face."

## Mechanics

### Grace

- **Type:** bool
- **Per:** world
- **Start:** false
- True when he grants the odpust at the Day 7 Mass, which needs [Crisis of Faith](#crisis-of-faith) at +8. The **Grace** ending.

### Contempt for the dead

- **Type:** bool
- **Per:** world
- **Start:** false
- Set when the committee handles [@first-name](ciotka.md)'s body crudely, brushing past his objection. He takes it as contempt for the dead and does not forget it.

### Crisis of Faith

- **Type:** int
- **Per:** world
- **Start:** 0
- Moves up and down. If it reaches **+8** by the Day 7 Mass, he believes in redemption and grants the odpust.

## Actions

### Ask about the three-barred cross
<!-- Prompted by: [three-barred-cross-on-gajda-grave](../clues/clues.md#three-barred-cross-on-gajda-grave) -->
- **Outcome:** He explains what [@first-name](barbara.md) could not: the three-barred cross is Eastern-rite, Greek Catholic, the old faith of this valley before the Roman parish. He states it plainly as church history, nothing he guards.
- **Gives:** [`three-barred-cross-is-lemko`](../clues/clues.md#three-barred-cross-is-lemko)

### Census interview
- **Cost:** 1 time
- **Outcome:** He cooperates and gives his details: himself, alone at the rectory.
- **Changes:** [Census](../items/census.md#census) — [@title](priest.md) [@first-name](priest.md) [@surname](priest.md)

### Property assessment
- **Cost:** 1 time
- **Outcome:** He says the rectory and church are parish property, not his. He refers the committee to the diocese for anything on paper.
- **Changes:** [Property Record](../items/census.md#property-record) — parish/church property, not personally held

### Donate to the church
- **Requires:** [Loaded](../cards/loaded.md)
- **Cost:** [Loaded](../cards/loaded.md)
- **Outcome:** A committee member puts real money into the parish, no bribe, nothing asked for, just given. [@title](priest.md) [@first-name](priest.md) [@surname](priest.md) did not expect it and cannot quite believe it: one of the state's own clerks choosing a plain good thing. In a man whose faith in people is in crisis, it lands, and he watches the committee differently after.
- **Changes:** [Crisis of Faith](#crisis-of-faith) — +2

## Bond

- [ ] Ask for his blessing or spiritual counsel — even perfunctorily, even if the player isn't religious
- [ ] Confide something personal to him — show vulnerability
- [ ] Show respect for the church building itself — remove hat, lower voice, acknowledge the space

## Grudge

- [ ] Demand he reveal what he heard in confession
- [ ] Disturb the dead: strip or handle [@name](ciotka.md)'s body crudely, brushing past his objection
- [ ] Disrespect the church (smoke inside, shout, handle sacred objects carelessly)
- [ ] Threaten or pressure one of his parishioners in his presence
