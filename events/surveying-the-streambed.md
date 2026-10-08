# Surveying the Streambed

**Location:** [Far-Ridge Streambed](../locations/far-ridge-streambed.md)
**Present:** Survey party
**Available:** Holding [streambed-is-candidate-drain](../clues/clues.md#streambed-is-candidate-drain); a PC with **Geology** and the [geologist's kit](../items/geologists-kit.md); the far ridge reached

## Trigger

- The party decides to shoot the col's elevation themselves rather than hunt the old dam-survey markers.

## Hook

Setting up a level line at the far-ridge streambed to measure toward the village.

## Setup

- The col of the dry streambed stands at the top of the far ridge, the village far below on the valley floor.
- Settling whether the col drains means one number: is it above or below house level.
- Getting it means running a level line from the col all the way down to the village, resetting the instrument every short stretch over rough ground. It is a full day's work.
- The geologist cannot run the instrument and hold the staff at once; every extra pair of hands shortens the day.
- A cooperative [Michał Pytlak](../characters/foreman.md) will come up and assist here (see [Bring him to the streambed](../characters/foreman.md#bring-him-to-the-streambed)), counting as one helping hand, but only if the party brings him to this scene rather than the benchmark hunt.

## Opportunities

- **Read the col by eye** `(noticed by: [Geology](../cards/geology.md))` — A surveyor standing on the col can see it rides high, but "high" is not a number and will not settle the drain question; only the level line does. → No clue; sets expectations.

## Actions

### Shoot a leg
- **Requires:** [Geology](../cards/geology.md) AND [geologist's kit](../items/geologists-kit.md)
- **When:** at the col, the line not yet finished
- **Prompted by:** [streambed-is-candidate-drain](../clues/clues.md#streambed-is-candidate-drain)
- **Cost:** 1 time
- **Outcome:** You set the level, sight the staff, and book the reading for one stretch of the line down the slope.
- **Changes:** [The line](#the-line) — +1 leg

### Hold the staff
- **When:** at the col, a geologist working the line
- **Prompted by:** [streambed-is-candidate-drain](../clues/clues.md#streambed-is-candidate-drain)
- **Cost:** 1 time
- **Outcome:** You carry and hold the staff and call the readings back, so the geologist keeps moving instead of walking every stretch twice.
- **Changes:** [The line](#the-line) — +1 leg

### Haul the level
- **Requires:** [Physique](../cards/physique.md)
- **When:** at the col, a geologist working the line
- **Prompted by:** [streambed-is-candidate-drain](../clues/clues.md#streambed-is-candidate-drain)
- **Cost:** 1 time
- **Outcome:** You haul the level and staff over the broken ground and reset them stretch after stretch; the slow part goes fast.
- **Changes:** [The line](#the-line) — +2 legs

### Read the finished line
- **Requires:** [Geology](../cards/geology.md) AND [geologist's kit](../items/geologists-kit.md)
- **When:** 6 legs done
- **Outcome:** You close the line between the col and the village and read the two heights. They settle it: the col sits above house level, so the rising water tops the village before it ever reaches the streambed.
- **Gives:** [Streambed Parameters](../items/streambed-parameters.md), [streambed-dead-ends](../clues/clues.md#streambed-dead-ends)

## Mechanics

### The line

- **The line is 6 legs.** Each "Shoot a leg" or "Hold the staff" adds 1, "Haul the level" adds 2. The geologist must shoot at least 3 of them; helpers can do the rest. Several PCs can work the same day.

## Exits

- The streambed is settled as a dead outlet; back to the [Far-Ridge Streambed](../locations/far-ridge-streambed.md) or down to %NEW_VILLAGE%.
