# The Stand

**Part of:** [@name](hunt-with-dudka.md)
**Location:** [@name](../../../locations/hunting-stand.md)
**Present:** [@name](../../../characters/neighbour.md)

## Hook

- Someone up in the hunting stand at the edge of the clearing.

## Setup

They wait at the shooting slot, a long, cold wait. [@surname](../../../characters/neighbour.md) fills his pipe and lights it, and the smoke drifts out of the slot and down across the clearing on the breeze.[](#he-smokes-a-pipe)[](#the-wolves-will-smell-it)[](#a-very-smelly-tobacco)[](#tell-him-to-put-the-pipe-out) The name [@surname](../../../characters/butcher.md) brings the anger up in him, older and more personal than any failed hunt.[](#older-than-the-wolves) After a long time someone moves along the game path below: an old woman with a bundle, walking slowly, not looking up. [@surname](../../../characters/neighbour.md) watches her pass without moving.[](#ask-him-about-the-woman) She is gone into the trees, and the clearing is empty again.[](#keep-waiting-for-the-wolves)

## Opportunities

### He smokes a pipe
- **When:** setup:events/wolf-attack/hunt-with-dudka/the-stand.md
- **Outcome:** [@surname](../../../characters/neighbour.md) smokes a pipe, even here.
- **Gives:** *(to: everyone present)* [`neighbour-smokes-pipe`](../../../clues/clues.md#neighbour-smokes-pipe)

### A very smelly tobacco
- **Noticed by:** [Chainsmoker](../../../cards/chainsmoker.md)
- **When:** setup:events/wolf-attack/hunt-with-dudka/the-stand.md
- **Outcome:** A very smelly tobacco.

### The wolves will smell it
- **Noticed by:** [Survival](../../../cards/survival.md)
- **When:** setup:events/wolf-attack/hunt-with-dudka/the-stand.md
- **Outcome:** The breeze carries his smoke straight across the clearing. No wolf will come near a place that smells of a man's tobacco; they will hang back at the far edge, out of any clean shot, as they must have every time.

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

### Tell him to put the pipe out
<!-- Prompted by: setup:events/wolf-attack/hunt-with-dudka/the-stand.md -->
- **Outcome:** He scowls at being told by a clerk, then knocks the pipe out against the boards. The smoke thins off the clearing.
- **Changes:** [Pipe out](#pipe-out) — true

### Keep waiting for the wolves
<!-- Prompted by: setup:events/wolf-attack/hunt-with-dudka/the-stand.md -->
- **Cost:** 1 time
- **Outcome:** More time passes. At last the wolves step out into the clearing, and he settles the rifle into the slot.
- **Changes:** [@name](the-stand.md) — ends; [@name](../hunters-cross-paths.md) — starts

## Mechanics

### Pipe out

- **Type:** bool
- **Per:** world
- **Start:** false
- True once someone gets him to put his pipe out, so the wolves no longer smell the stand.
