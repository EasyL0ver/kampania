# The Well Confrontation

**Location:** [@name](../locations/old-village-ruins.md)
**Present:** [@name](../characters/hag.md), [@name](../characters/butcher.md), [@name](../characters/neighbour.md) (if the players got him here and left him his rifle)
**Available:** Night of Day 4, after [@name](wolf-attack.md), unless [@name](../characters/hag.md) is hostile (see her [Hostility](../characters/hag.md#village-hostility) mechanic)

## Trigger

- [@name](../characters/butcher.md) is loose after the wolf authorization.
- The well's compulsion sends him to the ruins at night.
- [@name](../characters/hag.md) is at the well for her nightly rites.
- Does not happen if [@first-name](../characters/hag.md) is hostile; she has stopped coming to the well (see her [Hostility](../characters/hag.md#village-hostility) mechanic).
- Villagers blame her for wolf attacks ([hag-blamed-for-wolves](../clues/clues.md#hag-blamed-for-wolves)).
- Players are present only if they stake out the well, follow [@surname](../characters/butcher.md), are already at the ruins at night, or arrive with [@name](../characters/neighbour.md).

## Hook

- From the ruins: Lemko chanting carries across the well clearing.
- From the forest path: the players hear dogs and a man's footsteps ahead.

## Setup

- [@name](../characters/hag.md) kneels at the well rim.
- Beeswax candles form a semicircle.
- An icon of the Theotokos faces the water.
- Bread, a cloth, water, herbs, and church incense are set near the rim.
- She chants in Lemko.
- [@name](../characters/butcher.md) arrives from the village path with three dogs.
- He carries a dead wolf.
- He drops the wolf near the well.
- He tells [@first-name](../characters/hag.md) to go home.
- She recognizes him as the auxiliary from 1947.
- He does not recognize her.
- He circles her with a knife in his hand.
- The dogs watch the players' hands.
- If no one intervenes, he kills her, drops her and the wolf into the well, whistles the dogs, and leaves.

## Opportunities

- *(noticed by: [Culture](../cards/culture.md))* — the candles, icon, bread, incense, and chant form a Lemko rite for the dead, not witchcraft. → Gives: [`hag-tends-the-well`](../clues/clues.md#hag-tends-the-well)
- *(noticed by: [Survival](../cards/survival.md))* — he brought the wolf here as part of a repeated pattern. → Gives: [`butcher-dumps-carcasses-in-well`](../clues/clues.md#butcher-dumps-carcasses-in-well)
- *(noticed by: [Empathy](../cards/empathy.md))* — tending the well matters to her more than leaving alive.
- *(noticed by: [Violence](../cards/violence.md))* — he is calm, controlled, and ready to kill. → Gives: [`butcher-is-dangerous`](../clues/clues.md#butcher-is-dangerous)
- *(noticed by: [Violence](../cards/violence.md))* — one person cannot handle [@surname](../characters/butcher.md) and the three dogs at the same time.
- *(noticed by: [Empathy](../cards/empathy.md))* — the well's compulsion and [@surname](../characters/butcher.md)'s own appetite both fit what he is doing.

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
- **Changes:** [Rezeń](#butcher) — loose

### Shoot him
- **When:** Present and holding a gun — [@name](../characters/neighbour.md) or [@name](../characters/wojewoda.md)
- **Cost:** 1 composure
- **Outcome:** [@surname](../characters/butcher.md) reads the resolve, lowers the knife, and retreats with the dogs.
- **Changes:** [Rezeń](#butcher) — loose

### Shoot him in the back
- **When:** [Shoot him](#shoot-him) resolved and [@surname](../characters/butcher.md) is retreating
- **Cost:** 2 composure
- **Outcome:** The player shoots [@surname](../characters/butcher.md) in the back; he crawls to the well and goes into the water.
- **Changes:** [Rezeń](#butcher) — dead in the well

### Neighbour's rifle
- **When:** The players got [@name](../characters/neighbour.md) here and left him his rifle; if he is [Humiliated](../characters/neighbour.md#humiliated), a player must use [Uplift Ryszard](../characters/neighbour.md#uplift-neighbour)
- **Outcome:** [@surname](../characters/neighbour.md) aims at [@surname](../characters/butcher.md) from the trees; [@surname](../characters/butcher.md) backs off and leaves with the dogs.
- **Changes:** [Rezeń](#butcher) — loose, backs off
## Mechanics

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

- **Type:** enum (loose | dead-in-the-well)
- **Per:** world
- **Start:** loose

## Exits

- Back down the forest path to the village or [@name](../locations/pgr-quarters.md).
- To [@name](../locations/old-village-ruins.md) to investigate blood, water, and tracks.
- To [@name](../locations/hags-cabin.md) for her icons, herbs, and the form of the rite.
- To [Stanisław Rezeń](../characters/butcher.md#actions) if the players confront him.

## If Missed

- Without player intervention or armed [@surname](../characters/neighbour.md), the hag dies.
- [@surname](../characters/butcher.md) kills her and drops her body in the well.
- The aftermath belongs to [The Well](../locations/old-village-ruins.md#actions), [Hag's Cabin](../locations/hags-cabin.md#actions), and [well-influence.md](../story-facts/well-influence.md).
