# Foreman Saves the Village — The Engineering Ending

**Location:** [@name](../locations/upa-bunker.md)
**Present:** [@name](../characters/foreman.md), [@name](../characters/zofia.md)
**Available:** Day 5 onward, after [@name](foremans-flood-fight.md).

## Trigger

- [@name](../characters/foreman.md) believes [@name](../locations/new-village/new-village.md) can be saved by reopening the water-gap.
- The water-gap is the notch in the ridge between the [@name](../locations/new-village/new-village.md) valley and the empty [@name](../locations/big-basin.md).
- An old landslide plugged the water-gap with loose rock and earth.
- Clearing the plug sends floodwater through the gap into the empty [@name](../locations/big-basin.md) instead of backing it up onto the houses.
- The only fast way to move the plug is explosives.
- The only explosives in the valley are old partisan ordnance in the [@name](../locations/upa-bunker.md).

## Hook

- [@name](../characters/foreman.md) has stopped hauling sand.
- [@name](../characters/foreman.md) is asking where the old bunker is and what remains inside it.

## Setup

- [@name](../characters/foreman.md) says the village is drowning because the water cannot run through the plugged gap.
- He asks the committee for help.
- The ground beyond the gap is the empty [@name](../locations/big-basin.md), big enough to take the water without drowning anyone.
- The plug is loose debris and soft shale, not hard sandstone.
- A charge placed in the right seam can start a notch.
- Floodwater can widen the breach after the blast.
- A charge placed wrong can bring more hillside down or open the gap too slowly.
- The [@name](../locations/upa-bunker.md) is partially collapsed.
- The [@name](../locations/upa-bunker.md) has flooded sections.
- The [@name](../locations/upa-bunker.md) has rotten timbers.
- The old ordnance may have corroded casings, degraded filler, and sensitive fuses.
- [@name](../characters/zofia.md) is trying to pull [@name](../characters/foreman.md) out of the plan.

## Opportunities

- *(noticed by: [Handiwork](../cards/handiwork.md) OR [Geology](../cards/geology.md) OR [gap-is-blocked](../clues/clues.md#gap-is-blocked))* — The plan is sound: the plug dooms the village, the debris is breachable, and floodwater will widen a breach. → Gives: [`gap-is-blocked`](../clues/clues.md#gap-is-blocked)
- *(noticed by: [Handiwork](../cards/handiwork.md) OR [History](../cards/history.md))* — Twenty-year-old buried munitions are a risk: they may detonate from a knock, drop, spark, or heat.
- *(noticed by: [Medicine](../cards/medicine.md))* — [@name](../characters/foreman.md)'s lack of sleep, food, cold response, and pain response is not normal endurance.
- *(noticed by: [Empathy](../cards/empathy.md))* — [@name](../characters/zofia.md) is weighing the village against her husband.

## Actions

### Back the plan
- **Outcome:** You tell [@first-name](../characters/foreman.md) you are in. He starts on the route to the bunker and the climb to the gap; [@first-name](../characters/zofia.md) looks away.
- **Changes:** [Backed](#backed) — true

## Mechanics

### Backed

- **Type:** bool
- **Per:** world
- **Start:** false
- True once the committee backs the plan.

## Resolve

- [Backed](#backed) is false → [Alive](../characters/foreman.md#alive) = false
