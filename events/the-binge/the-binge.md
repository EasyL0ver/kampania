# The Binge — At the Store

**Location:** [@name](../../locations/new-village/the-store.md)
**Present:** [@name](../../characters/wujas.md), [@name](../../characters/secondary/romek-glowacz.md), [@name](../../characters/secondary/franek-mucha.md), [@name](../../characters/junior.md), [@name](../../characters/neighbour.md), [@name](../../characters/radioman.md)

## Hook

- Men on the benches outside the store, passing a bottle in the evening.

## Setup

The men sit outside the store on benches and crates, passing [@name](../../items/bimber.md), and go in to buy rounds from [@first-name](../../characters/secondary/halina-zajac.md) and get sent back out. [@name](../../characters/junior.md) drinks with the crew, away from his father.[](#junior-sits-apart)[](#junior-brags-about-gun)

## Opportunities

### Neighbour drinks fast
- **Noticed by:** [Empathy](../../cards/empathy.md)
- **When:** [Drinking Buddy](../../characters/wujas.md#drinking-buddy) is true
- **Outcome:** [@surname](../../characters/neighbour.md) drinks too fast and shuts down when the past comes up.
- **Gives:** [neighbour-is-rattled](../../clues/clues.md#neighbour-is-rattled)

### Junior sits apart
- **When:** setup:events/the-binge/the-binge.md
- **Outcome:** [@first-name](../../characters/junior.md) sits plainly among the crew on the benches, away from his father.
- **Gives:** [junior-drinks-with-crew](../../clues/clues.md#junior-drinks-with-crew)

### Junior brags about gun
- **Noticed by:** [Physique](../../cards/physique.md)
- **When:** setup:events/the-binge/the-binge.md
- **Outcome:** Drinking with the crew, [@first-name](../../characters/junior.md) puffs up and talks about the gun in his father's office desk.
- **Gives:** [wojewoda-has-gun](../../clues/clues.md#wojewoda-has-gun)

## Actions

### Drink with the crew
- **Requires:** [Physique](../../cards/physique.md) OR [Alcoholic](../../cards/alcoholic.md)
- **When:** [Crew Hostile](../../characters/wujas.md#crew-hostile) is false
- **Cost:** 1 time
- **Outcome:** The committee buys a round and shares a full session in the drinking circle. [@nickname](../../characters/wujas.md) warms to whoever kept pace without judging him.
- **Changes:** [Drinking Buddy](../../characters/wujas.md#drinking-buddy) — the drinking PCs become [@nickname](../../characters/wujas.md)'s drinking buddies
