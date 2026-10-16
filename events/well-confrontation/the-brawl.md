# The Brawl at the Well

**Part of:** [@name](well-confrontation.md)
**Location:** [@name](../../locations/old-village-ruins.md)
**Present:** [@name](../../characters/hag.md), [@name](../../characters/butcher.md)

## Hook

- A fight breaks out at the well.

## Setup

The committee is between [@surname](../../characters/butcher.md), the knife still in his hand,[](#he-can-be-disarmed-but-not-with-the-dogs-loose) and the woman at the rim,[](#fixated-on-the-woman) and the three dogs turn on them.[](#the-dogs-can-be-handled) For a moment, beyond the candlelight, something seems to move among the trees.[](#a-man-with-a-rifle-in-the-trees)[](#something-watching-from-the-forest)

## Opportunities

### He can be disarmed, but not with the dogs loose
- **Noticed by:** [Violence](../../cards/violence.md)
- **When:** setup:events/well-confrontation/the-brawl.md
- **Outcome:** A fighter could get the knife off [@surname](../../characters/butcher.md), but with the dogs loose they would tear into whoever tried.

### The dogs can be handled
- **Noticed by:** [Survival](../../cards/survival.md)
- **When:** setup:events/well-confrontation/the-brawl.md
- **Outcome:** These are working hunting dogs, trained to a voice. Someone who knows dogs can take one out of the fight without getting bitten.

### Fixated on the woman
- **Noticed by:** [Empathy](../../cards/empathy.md)
- **When:** setup:events/well-confrontation/the-brawl.md
- **Outcome:** [@surname](../../characters/butcher.md) is fixated on the woman at the rim. He barely looks at the committee.
- **Gives:** [`butcher-is-after-hag`](../../clues/clues.md#butcher-is-after-hag)

### A man with a rifle in the trees
- **Noticed by:** [Survival](../../cards/survival.md)
- **When:** setup:events/well-confrontation/the-brawl.md AND [Armed](../../characters/neighbour.md#armed) is true AND [Knows hag goes to well](../../characters/neighbour.md#knows-hag-goes-to-well) is true AND [Knows butcher goes to well](../../characters/neighbour.md#knows-butcher-goes-to-well) is true
- **Outcome:** A split-second glimpse between the trunks: a figure, maybe a man, maybe the line of a barrel. Then it is gone.

### Something watching from the forest
- **Noticed by:** [Superstitious](../../cards/superstitious.md)
- **When:** setup:events/well-confrontation/the-brawl.md AND [Armed](../../characters/neighbour.md#armed) is true AND [Knows hag goes to well](../../characters/neighbour.md#knows-hag-goes-to-well) is true AND [Knows butcher goes to well](../../characters/neighbour.md#knows-butcher-goes-to-well) is true
- **Outcome:** For a heartbeat there is something in the trees, too tall and too still, and then there is nothing. You know what you saw, and it was not a man.

## Actions

### Grapple him
- **Cost:** 2 composure
- **Outcome:** You go at [@surname](../../characters/butcher.md), but a dog jumps at you and you scramble with it in the dirt.
- **Gives:** [Bitten](../../cards/bitten.md)
- **Changes:** [Dogs occupied](#dogs-occupied) — +1

### Go after a dog
- **Cost:** 1 composure
- **Outcome:** You go for one of the dogs instead and wrestle it down in the dirt.
- **Gives:** [Bitten](../../cards/bitten.md)
- **Changes:** [Dogs occupied](#dogs-occupied) — +1

### Handle a dog
- **Requires:** [Survival](../../cards/survival.md)
- **Cost:** 1 composure
- **Outcome:** You face one of the dogs down the way a hunter would, low and steady, and it backs off you and stays off.
- **Changes:** [Dogs occupied](#dogs-occupied) — +1

### Kill a dog
- **Requires:** [Violence](../../cards/violence.md)
- **Cost:** 1 composure
- **Outcome:** You meet one of the dogs as it comes and kill it before it can close its jaws on you.
- **Changes:** [Dogs occupied](#dogs-occupied) — +1

### Disarm him
- **Requires:** [Violence](../../cards/violence.md)
- **When:** [Dogs occupied](#dogs-occupied) >= 3
- **Cost:** 2 composure
- **Outcome:** You get hold of his wrist and wrench the knife out of [@surname](../../characters/butcher.md)'s hand.
- **Changes:** [Rezeń](well-confrontation.md#butcher) — disarmed

### Disarm him
- **Requires:** [Violence](../../cards/violence.md)
- **When:** [Dogs occupied](#dogs-occupied) < 3
- **Cost:** 2 composure
- **Outcome:** You struggle with him for the knife, but two of the dogs are on you, and while they drag at you he gets the blade into you.
- **Gives:** [Wounded](../../cards/wounded.md)
- **Changes:** [Dogs occupied](#dogs-occupied) — +2

### Grab the hag and run
- **Requires:** [Physique](../../cards/physique.md)
- **Cost:** 1 composure
- **Outcome:** You carry [@name](../../characters/hag.md) clear, and all three dogs go after you through the trees.
- **Gives:** [Wounded](../../cards/wounded.md)
- **Changes:** [The hag](well-confrontation.md#the-hag) — badly hurt; [Dogs occupied](#dogs-occupied) — 3

### Throw the sausage to the dogs
- **Requires:** [@name](../../items/sausage.md)
- **Cost:** [@name](../../items/sausage.md)
- **Outcome:** Two of the dogs break off and fight over the sausage.
- **Changes:** [Dogs occupied](#dogs-occupied) — +2

### Fight him
- **Requires:** [Violence](../../cards/violence.md)
- **When:** [Dogs occupied](#dogs-occupied) >= 3
- **Cost:** 2 composure
- **Outcome:** The fighter drives [@surname](../../characters/butcher.md) off while the dogs are occupied.
- **Gives:** [Wounded](../../cards/wounded.md)
- **Changes:** [Rezeń](well-confrontation.md#butcher) — driven-off

### Shoot him
- **Requires:** [@name](../../tags/firearm.md)
- **Cost:** 1 composure
- **Outcome:** [@surname](../../characters/butcher.md) reads the resolve, lowers the knife, and retreats with the dogs.
- **Changes:** [Rezeń](well-confrontation.md#butcher) — driven-off

### Shoot him in the back
- **When:** [Shoot him](#shoot-him)
- **Cost:** 2 composure
- **Outcome:** The player shoots [@surname](../../characters/butcher.md) in the back; he crawls to the well and goes into the water.
- **Changes:** [Rezeń](well-confrontation.md#butcher) — dead in the well; [Alive](../../characters/butcher.md#alive) — false

### Back off
- **Outcome:** The committee pulls back from the well.
- **Changes:** [@name](the-brawl.md) — ends; [@name](well-confrontation.md) — ends

### Back off
- **When:** [Butcher](well-confrontation.md#butcher) is attacking AND [The hag](well-confrontation.md#the-hag) is unhurt AND NOT ([Armed](../../characters/neighbour.md#armed) is true AND [Knows hag goes to well](../../characters/neighbour.md#knows-hag-goes-to-well) is true AND [Knows butcher goes to well](../../characters/neighbour.md#knows-butcher-goes-to-well) is true AND [Humiliated](../../characters/neighbour.md#humiliated) is false)
- **Outcome:** [@surname](../../characters/butcher.md) turns back to the woman at the rim.
- **Changes:** [@name](the-murder.md) — starts

### Back off
- **When:** [Butcher](well-confrontation.md#butcher) is attacking AND [The hag](well-confrontation.md#the-hag) is unhurt AND [Armed](../../characters/neighbour.md#armed) is true AND [Knows hag goes to well](../../characters/neighbour.md#knows-hag-goes-to-well) is true AND [Knows butcher goes to well](../../characters/neighbour.md#knows-butcher-goes-to-well) is true AND [Humiliated](../../characters/neighbour.md#humiliated) is false
- **Outcome:** Before the knife comes down, [@surname](../../characters/neighbour.md) steps out of the trees.
- **Changes:** [@name](dudka-intervention.md) — starts

## Mechanics

### Dogs occupied

- **Type:** int
- **Per:** world
- **Start:** 0
- How many of [@surname](../../characters/butcher.md)'s three dogs are held off, 0 to 3.
