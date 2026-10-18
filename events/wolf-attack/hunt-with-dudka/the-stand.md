# The Stand

**Part of:** [@name](hunt-with-dudka.md)
**Location:** [@name](../../../locations/hunting-stand.md)
**Present:** [@name](../../../characters/neighbour.md)

## Hook

- Someone up in the hunting stand at the edge of the clearing.

## Setup

They wait at the shooting slot, a long, cold wait.[](#his-stand) The name [@surname](../../../characters/butcher.md) brings the anger up in him, older and more personal than any failed hunt.[](#older-than-the-wolves) After a long time someone moves along the game path below: an old woman with a bundle, walking slowly, not looking up. [@surname](../../../characters/neighbour.md) watches her pass without moving.[](#ask-him-about-the-woman) She is gone into the trees, and the clearing is empty again.[](#keep-waiting-for-the-wolves)

## Opportunities

### His stand
- **When:** setup:events/wolf-attack/hunt-with-dudka/the-stand.md
- **Outcome:** This is where he waits for them: his own stand, and now you know the way to it.
- **Gives:** *(to: everyone present)* hook:locations/hunting-stand.md, located:locations/hunting-stand.md

### Older than the wolves
- **Noticed by:** [Empathy](../../../cards/empathy.md)
- **When:** setup:events/wolf-attack/hunt-with-dudka/the-stand.md
- **Outcome:** His anger at [@surname](../../../characters/butcher.md) is older and more personal than any failed hunt.
- **Gives:** [`dudka-despises-rezen`](../../../clues/clues.md#dudka-despises-rezen)

## Actions

### Ask him about the woman
<!-- Prompted by: setup:events/wolf-attack/hunt-with-dudka/the-stand.md -->
- **Outcome:** He keeps his eyes on the path. An old Lemko woman who lives out here, he says quietly. Harmless. Leave her be.
- **Gives:** hook:characters/hag.md, [`dudka-thinks-hag-is-harmless`](../../../clues/clues.md#dudka-thinks-hag-is-harmless)

### Keep waiting for the wolves
<!-- Prompted by: setup:events/wolf-attack/hunt-with-dudka/the-stand.md -->
- **Cost:** 1 time
- **Outcome:** More time passes. At last the wolves step out into the clearing, and he settles the rifle into the slot.
- **Changes:** [@name](the-stand.md) — ends; [@name](../hunters-cross-paths.md) — starts
