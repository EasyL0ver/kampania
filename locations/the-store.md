# The Store

**Type:** Location (revisitable)
**Location:** [@first-name](../characters/matrona.md) [@surname](../characters/matrona.md)'s general store.
**Present:** [@name](../characters/secondary/halina-zajac.md) (inside), [@name](../characters/wujas.md) (outside), [@name](../characters/neighbour.md) (usually outside), [@name](../characters/junior.md) (some evenings, outside), drinking crew (outside)
**Available:** Daytime, any day. Repeatable.
**Cost:** 1 action per visit

## Hook

[@first-name](../characters/matrona.md) [@surname](../characters/matrona.md)'s general store.

## Setup

- The store is the village social hub.
- Men sit outside on benches and crates, passing bimber.
- [@name](../characters/wujas.md) is usually outside.
- [@name](../characters/neighbour.md) drifts in and out.
- [@name](../characters/butcher.md) does not drink here.
- [@name](../characters/secondary/halina-zajac.md) runs the counter inside.
- [@first-name](../characters/matrona.md) [@surname](../characters/matrona.md) owns the store but is rarely behind the counter.
- The shelves are sparse but functional.
- Cigarettes are sold over the counter: cheap Sport on the shelf, a pricier premium brand for those who ask.
- Bimber is kept under the counter.
- The crew enters to buy rounds, banter with [@first-name](../characters/secondary/halina-zajac.md), and get sent back outside.
- [@name](../characters/junior.md) drinks with the crew some evenings, away from his father.
- [@first-name](../characters/secondary/halina-zajac.md) resents [@first-name](../characters/matrona.md) [@surname](../characters/matrona.md) and speaks sharply about the work.
- The back room has a locked pharmaceutical cabinet.
- The cabinet contains penicillin, aspirin, bandages, and iodine.
- [@first-name](../characters/matrona.md) [@surname](../characters/matrona.md) keeps the only cabinet key.
- [@name](../characters/secondary/halina-zajac.md) cannot open the medicine cabinet.
- Government people are treated with suspicion outside unless they are [@name](../characters/wujas.md)'s drinking buddies.

## Opportunities

- **The medicine cabinet** `(noticed by: [Medicine](../cards/medicine.md))` `(prompted by: aware:locations/the-store.md)` — In the back room a locked cabinet holds penicillin, aspirin, bandages, and iodine; a trained eye reads it as a *szafka apteczna*, the state medicine point for miles. → Gives: [store-has-drug-cabinet](../clues/clues.md#store-has-drug-cabinet)
- **[@name](../characters/neighbour.md)'s nervousness** `(when: [drinking buddy](../characters/wujas.md#drinking-buddy) with [@nickname](../characters/wujas.md))` `(noticed by: [Empathy](../cards/empathy.md))` — [@surname](../characters/neighbour.md) drinks too fast and shuts down when the past comes up. → Gives: [neighbour-is-rattled](../clues/clues.md#neighbour-is-rattled)
- **Junior joins the crew** `(when: [@name](../characters/junior.md) present, or [drinking buddy](../characters/wujas.md#drinking-buddy) with [@nickname](../characters/wujas.md) if he is not)` `(prompted by: aware:locations/new-village.md)` — Present, [@first-name](../characters/junior.md) sits plainly among the crew on the benches, away from his father; absent, the crew mention the sołtys's son who drinks with them. → Gives: [junior-drinks-with-crew](../clues/clues.md#junior-drinks-with-crew)
- **Junior brags about the pistol** `(noticed by: [Physique](../cards/physique.md))` `(prompted by: [junior-drinks-with-crew](../clues/clues.md#junior-drinks-with-crew))` — Drinking with the crew, [@first-name](../characters/junior.md) puffs up and talks about the gun in his father's office desk. → Gives: [wojewoda-has-gun](../clues/clues.md#wojewoda-has-gun)
- **Old floods on the benches** `(when: [drinking buddy](../characters/wujas.md#drinking-buddy) with [@nickname](../characters/wujas.md), or Empathy)` `(prompted by: [streambed-is-candidate-drain](../clues/clues.md#streambed-is-candidate-drain))` — The old men remember the bad floods. The dry streambed on the far ridge never carried any of it off; the water just pooled against the rock and stopped. → Gives: [streambed-never-drained](../clues/clues.md#streambed-never-drained)

## Actions

### Buy cigarettes
- **Outcome:** [@first-name](../characters/secondary/halina-zajac.md) sells a pack across the counter: cheap [Sport](../clues/clues.md#tadek-smokes-cheapest) off the shelf, or premium [@name](../items/cigarette-butts-from-ciotkas.md) if you ask. A pack lasts one day; keeping one on you is [Chainsmoker](../story-facts/game-system.md#the-cards) upkeep.
- **Gives:** [@name](../items/pack-of-cigarettes.md)

### Buy rope
- **Outcome:** [@first-name](../characters/secondary/halina-zajac.md) sells a coil of field line off the shelf, mixed lengths knotted serviceable, long enough for the ridge climb.
- **Gives:** [@name](../items/rope.md)

### Ask who smokes Carmen
- **Requires:** [@name](../items/cigarette-butts-from-ciotkas.md) AND ([Speech](../cards/speech.md) OR [Finesse](../cards/finesse.md))
- **Prompted by:** [butts-at-ciotkas-are-carmen](../clues/clues.md#butts-at-ciotkas-are-carmen)
- **Cost:** 1 time
- **Outcome:** Nobody in the village wastes money on Carmen except two men: the Gajda boy [@name](../characters/junior.md), who buys what marks him as above the place, and the butcher [@name](../characters/butcher.md), who buys what he pleases. The brand narrows the door to the pair of them, and clears no one.
- **Gives:** [junior-smokes-carmen](../clues/clues.md#junior-smokes-carmen), [butcher-smokes-carmen](../clues/clues.md#butcher-smokes-carmen)

### Force the cabinet
- **Requires:** [Physique](../cards/physique.md)
- **Prompted by:** [store-has-drug-cabinet](../clues/clues.md#store-has-drug-cabinet)
- **Cost:** 1 time
- **Outcome:** You bash the little door until the lock tears out of the wood and take the child's course of penicillin. Quick and loud, and the splintered frame shows at a glance that someone forced it.
- **Gives:** [@name](../items/penicillin.md)
- **Changes:** [Robbery suspect](../characters/matrona.md#robbery-suspect) — the penicillin is missing

### Unlock the cabinet
- **Requires:** [@name](../items/store-cabinet-key.md)
- **Prompted by:** [store-has-drug-cabinet](../clues/clues.md#store-has-drug-cabinet)
- **Cost:** 1 time
- **Outcome:** [@first-name](../characters/matrona.md)'s own key opens the cabinet clean. You take the child's course and lock up after you, but the missing stock will not go unnoticed for long.
- **Gives:** [@name](../items/penicillin.md)
- **Changes:** [Robbery suspect](../characters/matrona.md#robbery-suspect) — the penicillin is missing

### Smash the register open
- **Requires:** [Physique](../cards/physique.md)
- **When:** mid break-in, the store already open to you
- **Cost:** 1 time
- **Outcome:** You pry the cash drawer until it springs. There is not much inside, a day's small takings, but it is gone now, and an emptied till reads as a plain robbery rather than a hand reaching for one thing.
- **Changes:** [Robbery suspect](../characters/matrona.md#robbery-suspect) — money is missing too, she suspects no one

<!-- If bonded with Halina, [Ask who smokes what](../characters/secondary/halina-zajac.md#ask-who-smokes-what) is her counter action — she knows every villager's brand. -->

<!-- Drinking with the crew is a crew action — see [Tadek Gajda — Drink with the crew](../characters/wujas.md#drink-with-the-crew). -->


