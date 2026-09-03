# The Irrigation Ditch

**Type:** Location (revisitable)
**Location:** Runs from the PGR fields down to the low ground east of %NEW_VILLAGE%.
**Present:** none
**Available:** Daytime, any day; reached from the [PGR farm](pgr-farm.md) by following the channel off the fields.
**Cost:** 1 action to reach; walking its length costs by action.

## Setup

- The ditch begins at a concrete head by the PGR fields, which [Zbigniew Gajda](../characters/wojewoda.md) calls the village's flood drain.
- The concrete lining is sound but runs only a short stretch; past it the channel bends away toward the low ground and out of sight.
- From the head alone it reads as a fine concrete channel of ample capacity.
- Past the concrete it degrades to a shallow, unlined dugout for most of its length. Nothing at the head announces this; only walking the full length reveals it.
- The channel runs a long way, fields to low ground, over rough and boggy going.

## Opportunities

<!-- Skill helpers and any side-content for the ditch will live here (later pass). -->

## Actions

### Walk the irrigation ditch
- **Requires:** Following the ditch its full length, from the concrete head to the low ground
- **Prompted by:** [ditch-is-candidate-drain](../clues/clues.md#ditch-is-candidate-drain)
- **Cost:** 1 action
- **Outcome:** The concrete lining ends after a short run and the channel becomes a plain earth dugout the rest of the way. Walking it tells you the concrete does not go all the way. It does not tell you whether that is a fault, a shortfall against spec, or the intended build, and it does not tell you whether the ditch can carry the flood.
- **Gives:** [ditch-concrete-stops-short](../clues/clues.md#ditch-concrete-stops-short)

### Measure the concrete head
- **Requires:** A tape at the concrete head
- **Prompted by:** [ditch-is-candidate-drain](../clues/clues.md#ditch-is-candidate-drain)
- **Cost:** 1 action
- **Outcome:** You tape off the lined channel at the head: width, depth, and fall. No skill needed. The figures alone say nothing; a surveyor turns them into a drainage answer.
- **Gives:** [concrete-ditch-measurements](../clues/clues.md#concrete-ditch-measurements)

### Measure the dugout
- **Requires:** A tape and having walked to the dugout ([ditch-concrete-stops-short](../clues/clues.md#ditch-concrete-stops-short))
- **Cost:** 1 action
- **Outcome:** Where the concrete gives out, you tape off the earth channel: width and depth of the shallow dugout that runs the rest of the way. No skill needed. Paired with the head figures, a surveyor can size the real ditch.
- **Gives:** [dugout-measurements](../clues/clues.md#dugout-measurements)
