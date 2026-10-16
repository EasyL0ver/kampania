# The Store

## Hook

[@first-name](../../characters/matrona.md) [@surname](../../characters/matrona.md)'s general store.

## Setup

- The store is the village social hub.
- Men sit outside on benches and crates, passing bimber.
- [@name](../../characters/wujas.md) is usually outside.
- [@name](../../characters/neighbour.md) drifts in and out.
- [@name](../../characters/butcher.md) does not drink here.
- [@name](../../characters/secondary/halina-zajac.md) runs the counter inside.
- [@first-name](../../characters/matrona.md) [@surname](../../characters/matrona.md) owns the store but is rarely behind the counter.
- The shelves are sparse but functional.
- Cigarettes are sold over the counter: cheap Sport on the shelf, a pricier premium brand for those who ask.
- Bimber is kept under the counter.
- The crew enters to buy rounds, banter with [@first-name](../../characters/secondary/halina-zajac.md), and get sent back outside.
- [@name](../../characters/junior.md) drinks with the crew some evenings, away from his father.[](#junior-brags-about-gun)
- [@first-name](../../characters/secondary/halina-zajac.md) resents [@first-name](../../characters/matrona.md) [@surname](../../characters/matrona.md) and speaks sharply about the work.
- The back room has a locked pharmaceutical cabinet.
- The cabinet contains penicillin, aspirin, bandages, and iodine.[](#locked-cabinet-holds-medicine)
- [@first-name](../../characters/matrona.md) [@surname](../../characters/matrona.md) keeps the only cabinet key.
- [@name](../../characters/secondary/halina-zajac.md) cannot open the medicine cabinet.
- Government people are treated with suspicion outside unless they are [@name](../../characters/wujas.md)'s drinking buddies.

## Opportunities

### Locked cabinet holds medicine
- **Noticed by:** [Medicine](../../cards/medicine.md)
- **When:** setup:locations/new-village/the-store.md
<!-- Prompted by: setup:locations/new-village/the-store.md -->
- **Outcome:** In the back room a locked cabinet holds penicillin, aspirin, bandages, and iodine; a trained eye reads it as a *szafka apteczna*, the state medicine point for miles.
- **Gives:** [store-has-drug-cabinet](../../clues/clues.md#store-has-drug-cabinet)

### Neighbour drinks fast
- **Noticed by:** [Empathy](../../cards/empathy.md)
- **When:** [Drinking Buddy](../../characters/wujas.md#drinking-buddy) is true
- **Outcome:** [@surname](../../characters/neighbour.md) drinks too fast and shuts down when the past comes up.
- **Gives:** [neighbour-is-rattled](../../clues/clues.md#neighbour-is-rattled)

### Junior sits apart
- **When:** [@present](../../characters/junior.md) OR [Drinking Buddy](../../characters/wujas.md#drinking-buddy) is true
<!-- Prompted by: setup:locations/new-village/the-store.md -->
- **Outcome:** Present, [@first-name](../../characters/junior.md) sits plainly among the crew on the benches, away from his father; absent, the crew mention the sołtys's son who drinks with them.
- **Gives:** [junior-drinks-with-crew](../../clues/clues.md#junior-drinks-with-crew)

### Junior brags about gun
- **Noticed by:** [Physique](../../cards/physique.md)
- **When:** setup:locations/new-village/the-store.md
<!-- Prompted by: [junior-drinks-with-crew](../../clues/clues.md#junior-drinks-with-crew) -->
- **Outcome:** Drinking with the crew, [@first-name](../../characters/junior.md) puffs up and talks about the gun in his father's office desk.
- **Gives:** [wojewoda-has-gun](../../clues/clues.md#wojewoda-has-gun)

## Actions

### Buy cigarettes
- **Outcome:** [@first-name](../../characters/secondary/halina-zajac.md) sells a pack across the counter: cheap [Sport](../../clues/clues.md#tadek-smokes-cheapest) off the shelf, or premium [@name](../../items/cigarette-butts-from-ciotkas.md) if you ask. A pack lasts one day; keeping one on you is [Chainsmoker](../../story-facts/game-system.md#the-cards) upkeep.
- **Gives:** [@name](../../items/pack-of-cigarettes.md)

### Buy rope
- **Outcome:** [@first-name](../../characters/secondary/halina-zajac.md) sells a coil of field line off the shelf, mixed lengths knotted serviceable, long enough for the ridge climb.
- **Gives:** [@name](../../items/rope.md)

### Ask who smokes Carmen
- **Requires:** [@name](../../items/cigarette-butts-from-ciotkas.md) AND ([Speech](../../cards/speech.md) OR [Finesse](../../cards/finesse.md))
<!-- Prompted by: [butts-at-ciotkas-are-carmen](../../clues/clues.md#butts-at-ciotkas-are-carmen) -->
- **Cost:** 1 time
- **Outcome:** Nobody in the village wastes money on Carmen except two men: the Gajda boy [@name](../../characters/junior.md), who buys what marks him as above the place, and the butcher [@name](../../characters/butcher.md), who buys what he pleases. The brand narrows the door to the pair of them, and clears no one.
- **Gives:** [junior-smokes-carmen](../../clues/clues.md#junior-smokes-carmen), [butcher-smokes-carmen](../../clues/clues.md#butcher-smokes-carmen)

### Force the cabinet
- **Requires:** [Physique](../../cards/physique.md)
<!-- Prompted by: [store-has-drug-cabinet](../../clues/clues.md#store-has-drug-cabinet) -->
- **Cost:** 1 time
- **Outcome:** You bash the little door until the lock tears out of the wood and take the child's course of penicillin. Quick and loud, and the splintered frame shows at a glance that someone forced it.
- **Gives:** [@name](../../items/penicillin.md)
- **Changes:** [Robbery suspect](../../characters/matrona.md#robbery-suspect) — the penicillin is missing; [Cabinet](#cabinet) — forced

### Unlock the cabinet
- **Requires:** [@name](../../items/store-cabinet-key.md)
<!-- Prompted by: [store-has-drug-cabinet](../../clues/clues.md#store-has-drug-cabinet) -->
- **Cost:** 1 time
- **Outcome:** [@first-name](../../characters/matrona.md)'s own key opens the cabinet clean. You take the child's course and lock up after you, but the missing stock will not go unnoticed for long.
- **Gives:** [@name](../../items/penicillin.md)
- **Changes:** [Robbery suspect](../../characters/matrona.md#robbery-suspect) — the penicillin is missing

### Smash the register open
- **Requires:** [Physique](../../cards/physique.md)
- **When:** NOT [Cabinet](#cabinet) is intact
- **Cost:** 1 time
- **Outcome:** You pry the cash drawer until it springs. There is not much inside, a day's small takings, but it is gone now, and an emptied till reads as a plain robbery rather than a hand reaching for one thing.
- **Changes:** [Robbery suspect](../../characters/matrona.md#robbery-suspect) — money is missing too, she suspects no one

<!-- If bonded with Halina, [Ask who smokes what](../../characters/secondary/halina-zajac.md#ask-who-smokes-what) is her counter action — she knows every villager's brand. -->

<!-- Drinking with the crew is a crew action — see [Tadek Gajda — Drink with the crew](../../characters/wujas.md#drink-with-the-crew). -->

## Mechanics

### Cabinet

- **Type:** enum (intact | forced | discovered)
- **Per:** world
- **Start:** intact
- Forced by [Force the cabinet](#force-the-cabinet); found out on the next morning (each morning's "with the store robbery" begin).
