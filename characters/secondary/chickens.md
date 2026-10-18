# Chickens

## Hook

- The PGR farm's chickens.

## Vital Statistics

- **Status:** Animal
- **Morning:** [@name](../../locations/new-village/pgr-farm/pgr-farm.md), [@name](../../locations/new-village/pgr-farm/cow-barn.md), [@name](../../locations/new-village/pgr-farm/grain-silo.md), [@name](../../locations/new-village/pgr-farm/warehouse.md), [@name](../../locations/new-village/pgr-farm/pgr-office.md), [@name](../../locations/new-village/pgr-farm/pgr-quarters.md)
- **Afternoon:** [@name](../../locations/new-village/pgr-farm/pgr-farm.md), [@name](../../locations/new-village/pgr-farm/cow-barn.md), [@name](../../locations/new-village/pgr-farm/grain-silo.md), [@name](../../locations/new-village/pgr-farm/warehouse.md), [@name](../../locations/new-village/pgr-farm/pgr-office.md), [@name](../../locations/new-village/pgr-farm/pgr-quarters.md)
- **Evening:** [@name](../../locations/new-village/pgr-farm/henhouse.md)
- **Night:** [@name](../../locations/new-village/pgr-farm/henhouse.md)
- **Lives in:** [@name](../../locations/new-village/pgr-farm/henhouse.md)

## Character

Twenty-two hens and a rooster, looked after by [@name](../zofia.md). By day they scatter across the whole farm; at dusk they go back to the henhouse to roost.

## Setup

- **Clothes:** Feathers: brown, white, one speckled.
- **Hair & face:** Combs, beaks, beady eyes.
- **Carriage:** Never still for long.

## Actions

### Count the chickens in the yard
- **When:** [@name](../../locations/new-village/pgr-farm/pgr-farm.md) AND [Chickens counted](../../locations/new-village/pgr-farm/pgr-farm.md#chickens-counted) is false
<!-- Prompted by: [chickens-are-everywhere](../../clues/clues.md#chickens-are-everywhere) -->
- **Cost:** 1 time
- **Outcome:** Seven. Two run under a cart halfway through and you start again. Then they do it again.
- **Changes:** [Chickens counted](../../locations/new-village/pgr-farm/pgr-farm.md#chickens-counted) — true

### Count the chickens in the cow barn
- **When:** [@name](../../locations/new-village/pgr-farm/cow-barn.md) AND [Chickens counted](../../locations/new-village/pgr-farm/cow-barn.md#chickens-counted) is false
<!-- Prompted by: [chickens-are-everywhere](../../clues/clues.md#chickens-are-everywhere) -->
- **Cost:** 1 time
- **Outcome:** Four, one of them asleep on the back of a cow, which does not seem to mind.
- **Changes:** [Chickens counted](../../locations/new-village/pgr-farm/cow-barn.md#chickens-counted) — true

### Count the chickens at the silo
- **When:** [@name](../../locations/new-village/pgr-farm/grain-silo.md) AND [Chickens counted](../../locations/new-village/pgr-farm/grain-silo.md#chickens-counted) is false
<!-- Prompted by: [chickens-are-everywhere](../../clues/clues.md#chickens-are-everywhere) -->
- **Cost:** 1 time
- **Outcome:** Two. One sits on the ladder and will not move for you. The other is somehow on top.
- **Changes:** [Chickens counted](../../locations/new-village/pgr-farm/grain-silo.md#chickens-counted) — true

### Count the chickens in the warehouse
- **When:** [@name](../../locations/new-village/pgr-farm/warehouse.md) AND [Chickens counted](../../locations/new-village/pgr-farm/warehouse.md#chickens-counted) is false
<!-- Prompted by: [chickens-are-everywhere](../../clues/clues.md#chickens-are-everywhere) -->
- **Cost:** 1 time
- **Outcome:** Five, nesting in the fertilizer sacks, and every one of them pecks.
- **Changes:** [Chickens counted](../../locations/new-village/pgr-farm/warehouse.md#chickens-counted) — true

### Count the chickens in the office
- **When:** [@name](../../locations/new-village/pgr-farm/pgr-office.md) AND [Chickens counted](../../locations/new-village/pgr-farm/pgr-office.md#chickens-counted) is false
<!-- Prompted by: [chickens-are-everywhere](../../clues/clues.md#chickens-are-everywhere) -->
- **Cost:** 1 time
- **Outcome:** One, on the windowsill, watching [@first-name](clerk.md) type. It is not impressed with either of you.
- **Changes:** [Chickens counted](../../locations/new-village/pgr-farm/pgr-office.md#chickens-counted) — true

### Count the chickens in the quarters
- **When:** [@name](../../locations/new-village/pgr-farm/pgr-quarters.md) AND [Chickens counted](../../locations/new-village/pgr-farm/pgr-quarters.md#chickens-counted) is false
<!-- Prompted by: [chickens-are-everywhere](../../clues/clues.md#chickens-are-everywhere) -->
- **Cost:** 1 time
- **Outcome:** Three, under the benches. [@first-name](../zofia.md) asks whether you would like one for the pot.
- **Changes:** [Chickens counted](../../locations/new-village/pgr-farm/pgr-quarters.md#chickens-counted) — true

### Count them on the roost
- **When:** [@name](../../locations/new-village/pgr-farm/henhouse.md)
<!-- Prompted by: [chickens-are-everywhere](../../clues/clues.md#chickens-are-everywhere) -->
- **Cost:** 1 time
- **Outcome:** At dusk they are all in, lined up on the perches and too sleepy to move. Twenty-two, counted in one go.
- **Changes:** [Chickens counted](../../locations/new-village/pgr-farm/pgr-farm.md#chickens-counted) — true; [Chickens counted](../../locations/new-village/pgr-farm/cow-barn.md#chickens-counted) — true; [Chickens counted](../../locations/new-village/pgr-farm/grain-silo.md#chickens-counted) — true; [Chickens counted](../../locations/new-village/pgr-farm/warehouse.md#chickens-counted) — true; [Chickens counted](../../locations/new-village/pgr-farm/pgr-office.md#chickens-counted) — true; [Chickens counted](../../locations/new-village/pgr-farm/pgr-quarters.md#chickens-counted) — true
