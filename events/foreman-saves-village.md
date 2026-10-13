# Foreman Saves the Village — The Engineering Ending

**Location:** [@name](../locations/upa-bunker.md)
**Present:** [@name](../characters/foreman.md), [@name](../characters/zofia.md)

## Hook

- [@name](../characters/foreman.md) has stopped hauling sand.
- [@name](../characters/foreman.md) is asking where the old bunker is and what remains inside it.

## Setup

- [@name](../characters/foreman.md) says the village is drowning because the water cannot run through the plugged gap.
- He asks the committee for help.
- He has not slept or eaten in days, and his torn hands do not seem to hurt him.[](#foremans-abnormal-endurance-signs)
- The ground beyond the gap is the empty [@name](../locations/big-basin.md), big enough to take the water without drowning anyone.
- The plug is loose debris and soft shale, not hard sandstone.[](#plan-is-sound-overall)
- A charge placed in the right seam can start a notch.
- Floodwater can widen the breach after the blast.
- A charge placed wrong can bring more hillside down or open the gap too slowly.
- The [@name](../locations/upa-bunker.md) is partially collapsed.
- The [@name](../locations/upa-bunker.md) has flooded sections.
- The [@name](../locations/upa-bunker.md) has rotten timbers.
- The old ordnance may have corroded casings, degraded filler, and sensitive fuses.[](#buried-munitions-pose-detonation-risk)
- [@name](../characters/zofia.md) is trying to pull[](#zofia-torn-between-village-and-husband) [@name](../characters/foreman.md) out of the plan.

## Opportunities

### Plan is sound overall
- **Noticed by:** [Handiwork](../cards/handiwork.md) OR [Geology](../cards/geology.md) OR [gap-is-blocked](../clues/clues.md#gap-is-blocked)
- **When:** setup:events/foreman-saves-village.md
- **Outcome:** The plan is sound: the plug dooms the village, the debris is breachable, and floodwater will widen a breach.
- **Gives:** [`gap-is-blocked`](../clues/clues.md#gap-is-blocked)

### Buried munitions pose detonation risk
- **Noticed by:** [Handiwork](../cards/handiwork.md) OR [History](../cards/history.md)
- **When:** setup:events/foreman-saves-village.md
- **Outcome:** Twenty-year-old buried munitions are a risk: they may detonate from a knock, drop, spark, or heat.

### Foreman's abnormal endurance signs
- **Noticed by:** [Medicine](../cards/medicine.md)
- **When:** setup:events/foreman-saves-village.md
- **Outcome:** [@name](../characters/foreman.md)'s lack of sleep, food, cold response, and pain response is not normal endurance.

### Zofia torn between village and husband
- **Noticed by:** [Empathy](../cards/empathy.md)
- **When:** setup:events/foreman-saves-village.md
- **Outcome:** [@name](../characters/zofia.md) is weighing the village against her husband.

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
