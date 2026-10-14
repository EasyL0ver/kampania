# The Well Confrontation

**Location:** [@name](../locations/old-village-ruins.md)
**Present:** [@name](../characters/hag.md), [@name](../characters/butcher.md), [@name](../characters/neighbour.md) (if [Warned about the well](#warned-about-the-well) is true)

## Hook

- From the ruins: Lemko chanting carries across the well clearing.
- From the forest path: the players hear dogs and a man's footsteps ahead.

## Setup

- [@name](../characters/hag.md) kneels at the well rim.[](#tending-the-well-matters-most)
- Beeswax candles form a semicircle.
- An icon of the Theotokos faces the water.
- Bread, a cloth, water, herbs, and church incense are set near the rim.
- She chants in Lemko.[](#candles-and-chant-form-a-lemko-rite)
- [@name](../characters/butcher.md) arrives from the village path with three dogs.
- He carries a dead wolf.
- He drops the wolf near the well.[](#wolf-brought-here-in-a-pattern)
- He tells [@first-name](../characters/hag.md) to go home.
- She recognizes him as the auxiliary from 1947.
- He does not recognize her.
- He circles her with a knife in his hand.[](#he-is-calm-and-ready-to-kill)
- The dogs watch the players' hands.[](#one-person-cannot-handle-all)
- If no one intervenes, he kills her, drops her and the wolf into the well[](#well-compulsion-and-butchers-appetite-align), whistles the dogs, and leaves.

## Opportunities

### Arriving on the scene
- **When:** [@name](../locations/old-village-ruins.md)
- **Outcome:** [@hook](well-confrontation.md)
- **Gives:** *(to: players at [@name](../locations/old-village-ruins.md))* hook:events/well-confrontation.md

### Candles and chant form a Lemko rite
- **Noticed by:** [Culture](../cards/culture.md)
- **When:** setup:events/well-confrontation.md
- **Outcome:** the candles, icon, bread, incense, and chant form a Lemko rite for the dead, not witchcraft.
- **Gives:** [`hag-tends-the-well`](../clues/clues.md#hag-tends-the-well)

### Wolf brought here in a pattern
- **Noticed by:** [Survival](../cards/survival.md)
- **When:** setup:events/well-confrontation.md
- **Outcome:** he brought the wolf here as part of a repeated pattern.
- **Gives:** [`butcher-dumps-carcasses-in-well`](../clues/clues.md#butcher-dumps-carcasses-in-well)

### Tending the well matters most
- **Noticed by:** [Empathy](../cards/empathy.md)
- **When:** setup:events/well-confrontation.md
- **Outcome:** tending the well matters to her more than leaving alive.

### He is calm and ready to kill
- **Noticed by:** [Violence](../cards/violence.md)
- **When:** setup:events/well-confrontation.md
- **Outcome:** he is calm, controlled, and ready to kill.
- **Gives:** [`butcher-is-dangerous`](../clues/clues.md#butcher-is-dangerous)

### One person cannot handle all
- **Noticed by:** [Violence](../cards/violence.md)
- **When:** setup:events/well-confrontation.md
- **Outcome:** one person cannot handle [@surname](../characters/butcher.md) and the three dogs at the same time.

### Well compulsion and Butcher's appetite align
- **Noticed by:** [Empathy](../cards/empathy.md)
- **When:** setup:events/well-confrontation.md
- **Outcome:** the well's compulsion and [@surname](../characters/butcher.md)'s own appetite both fit what he is doing.

## Actions

### Grapple him
- **When:** Present, no firearm
- **Cost:** 2 composure
- **Outcome:** The player occupies [@surname](../characters/butcher.md) and the dogs long enough to protect another action. Taking the dogs head-on is optional; whoever does is Wounded.
- **Gives:** [`butcher-is-dangerous`](../clues/clues.md#butcher-is-dangerous)
- **Changes:** [Dogs occupied](#dogs-occupied) — true

### Pin him down
- **Requires:** [Physique](../cards/physique.md) OR [Violence](../cards/violence.md)
- **When:** Present, no firearm
- **Cost:** 1 composure
- **Outcome:** Strong or practised in a fight, the player locks [@surname](../characters/butcher.md) up and holds off the dogs long enough to protect another action. Taking the dogs head-on is optional; whoever does is Wounded.
- **Gives:** [`butcher-is-dangerous`](../clues/clues.md#butcher-is-dangerous)
- **Changes:** [Dogs occupied](#dogs-occupied) — true

### Grab the hag and run
- **Requires:** [Physique](../cards/physique.md)
- **When:** Present, no firearm
- **Cost:** 1 composure
- **Outcome:** The player carries [@name](../characters/hag.md) clear; [@surname](../characters/butcher.md) does not pursue.
- **Gives:** [Wounded](../cards/wounded.md)
- **Changes:** [The hag](#the-hag) — badly hurt

### Fight him
- **Requires:** [Violence](../cards/violence.md)
- **When:** Present, no firearm, and at least one other player has completed [Grapple him](#grapple-him) or [Pin him down](#pin-him-down)
- **Cost:** 2 composure
- **Outcome:** The fighter drives [@surname](../characters/butcher.md) off while the dogs are occupied.
- **Gives:** [Wounded](../cards/wounded.md)
- **Changes:** [Rezeń](#butcher) — driven-off

### Shoot him
- **When:** Present and holding a gun — [@name](../characters/neighbour.md) or [@name](../characters/wojewoda.md)
- **Cost:** 1 composure
- **Outcome:** [@surname](../characters/butcher.md) reads the resolve, lowers the knife, and retreats with the dogs.
- **Changes:** [Rezeń](#butcher) — driven-off

### Shoot him in the back
- **When:** [Shoot him](#shoot-him)
- **Cost:** 2 composure
- **Outcome:** The player shoots [@surname](../characters/butcher.md) in the back; he crawls to the well and goes into the water.
- **Changes:** [Rezeń](#butcher) — dead in the well; [Alive](../characters/butcher.md#alive) — false

### Neighbour's rifle
- **When:** The players got [@name](../characters/neighbour.md) here and left him his rifle; if he is [Humiliated](../characters/neighbour.md#humiliated), a player must use [Uplift Ryszard](../characters/neighbour.md#uplift-neighbour)
- **Outcome:** [@surname](../characters/neighbour.md) aims at [@surname](../characters/butcher.md) from the trees; [@surname](../characters/butcher.md) backs off and leaves with the dogs.
- **Changes:** [Rezeń](#butcher) — driven-off
## Mechanics

### Warned about the well

- **Type:** bool
- **Per:** world
- **Start:** false
- True once the players have warned [@surname](../characters/neighbour.md) about what is coming at the well. TBD: no action sets it yet.

### Dogs occupied

- **Type:** bool
- **Per:** world
- **Start:** false
- True while someone keeps [@surname](../characters/butcher.md)'s dogs busy.

### The hag

- **Type:** enum (unhurt | badly-hurt)
- **Per:** world
- **Start:** unhurt

### Butcher

- **Type:** enum (attacking | driven-off | dead-in-the-well)
- **Per:** world
- **Start:** attacking

## Resolve

- [Butcher](#butcher) is attacking AND [The hag](#the-hag) is unhurt → [Alive](../characters/hag.md#alive) = false
