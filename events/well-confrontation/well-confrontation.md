# The Well Confrontation

**Location:** [@name](../../locations/old-village-ruins.md)
**Present:** [@name](../../characters/hag.md), [@name](../../characters/butcher.md)

## Hook

- From the ruins: Lemko chanting carries across the well clearing.
- From the forest path: the players hear dogs and a man's footsteps ahead.

## Setup

[@setup](../../characters/hag.md) kneels at the well rim[](#tending-the-well-matters-most), chanting in a language that is not Polish[](#candles-and-chant-form-a-lemko-rite). Beeswax candles stand in a semicircle around her, an icon faces the water, and bread, a cloth, water, herbs and church incense are set by the stones. [@setup](../../characters/butcher.md) comes up the village path with three dogs and a dead wolf over his shoulder,[](#rezeń-is-out-at-the-well) and drops the wolf by the well[](#wolf-brought-here-in-a-pattern)[](#well-compulsion-and-butchers-appetite-align). He tells her to go home. When she does not move, he circles her with a knife in his hand[](#step-in)[](#hold-back)[](#he-is-calm-and-ready-to-kill); the dogs watch the players' hands.

## Opportunities

### Rezeń is out at the well
- **When:** setup:events/well-confrontation/well-confrontation.md
- **Outcome:** [@surname](../../characters/butcher.md) is out here in the night, at the well.
- **Gives:** *(to: everyone present)* [`butcher-gone-at-night`](../../clues/clues.md#butcher-gone-at-night)

### Candles and chant form a Lemko rite
- **Noticed by:** [Culture](../../cards/culture.md)
- **When:** setup:events/well-confrontation/well-confrontation.md
- **Outcome:** the candles, icon, bread, incense, and chant form a Lemko rite for the dead, not witchcraft.
- **Gives:** [`hag-tends-the-well`](../../clues/clues.md#hag-tends-the-well)

### Wolf brought here in a pattern
- **Noticed by:** [Survival](../../cards/survival.md)
- **When:** setup:events/well-confrontation/well-confrontation.md
- **Outcome:** he brought the wolf here as part of a repeated pattern.
- **Gives:** [`butcher-dumps-carcasses-in-well`](../../clues/clues.md#butcher-dumps-carcasses-in-well)

### Tending the well matters most
- **Noticed by:** [Empathy](../../cards/empathy.md)
- **When:** setup:events/well-confrontation/well-confrontation.md
- **Outcome:** tending the well matters to her more than leaving alive.

### He is calm and ready to kill
- **Noticed by:** [Violence](../../cards/violence.md)
- **When:** setup:events/well-confrontation/well-confrontation.md
- **Outcome:** he is calm, controlled, and ready to kill.

### Well compulsion and Butcher's appetite align
- **Noticed by:** [Empathy](../../cards/empathy.md)
- **When:** setup:events/well-confrontation/well-confrontation.md
- **Outcome:** the well's compulsion and [@surname](../../characters/butcher.md)'s own appetite both fit what he is doing.

## Actions

### Step in
<!-- Prompted by: setup:events/well-confrontation/well-confrontation.md -->
- **Outcome:** The committee steps between the knife and the woman at the rim.
- **Changes:** [@name](the-brawl.md) — starts

### Hold back
- **When:** NOT ([Armed](../../characters/neighbour.md#armed) is true AND [Knows hag goes to well](../../characters/neighbour.md#knows-hag-goes-to-well) is true AND [Knows butcher goes to well](../../characters/neighbour.md#knows-butcher-goes-to-well) is true AND [Humiliated](../../characters/neighbour.md#humiliated) is false)
<!-- Prompted by: setup:events/well-confrontation/well-confrontation.md -->
- **Outcome:** The committee stays where it is.
- **Changes:** [@name](the-murder.md) — starts

### Hold back
- **When:** [Armed](../../characters/neighbour.md#armed) is true AND [Knows hag goes to well](../../characters/neighbour.md#knows-hag-goes-to-well) is true AND [Knows butcher goes to well](../../characters/neighbour.md#knows-butcher-goes-to-well) is true AND [Humiliated](../../characters/neighbour.md#humiliated) is false
<!-- Prompted by: setup:events/well-confrontation/well-confrontation.md -->
- **Outcome:** Before the knife comes down, [@surname](../../characters/neighbour.md) steps out of the trees.
- **Changes:** [@name](dudka-intervention.md) — starts

### Call Dudka by name
- **When:** [Armed](../../characters/neighbour.md#armed) is true AND [Knows hag goes to well](../../characters/neighbour.md#knows-hag-goes-to-well) is true AND [Knows butcher goes to well](../../characters/neighbour.md#knows-butcher-goes-to-well) is true
- **Outcome:** You shout into the dark for [@surname](../../characters/neighbour.md).
- **Changes:** [@name](dudka-intervention.md) — starts; [Humiliated](../../characters/neighbour.md#humiliated) — false

## Mechanics

### The hag

- **Type:** enum (unhurt | badly-hurt)
- **Per:** world
- **Start:** unhurt

### Butcher

- **Type:** enum (attacking | disarmed | driven-off | dead-in-the-well)
- **Per:** world
- **Start:** attacking
