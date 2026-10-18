# The Hunters Cross Paths

**Part of:** [@name](wolf-attack.md)
**Location:** [@name](../../locations/hunting-stand.md)
**Present:** [@name](../../characters/neighbour.md), [@name](../../characters/butcher.md)

## Hook

- A rifle-shot and dogs giving tongue in a clearing below the hunting stand.

## Setup

The wolves stand in the open below the hunting stand, heads low, unaware of the rifle in the slot above them. Then three dogs burst out of the trees, giving tongue, the rifle cracks, and the pack is gone into the forest.[](#one-wolf-down) [@surname](../../characters/butcher.md) strolls out after his dogs into the middle of the clearing and looks up at the stand.

The rifle in the slot comes round and settles on him. "Weeks," [@surname](../../characters/neighbour.md) says from above. "Weeks I have sat up here for them."

[@surname](../../characters/butcher.md) does not move out of the line. He spreads his hands, smiling up at the barrel. "And I thought I was doing you a favour."

"I know what you are."

"Then shoot." He waits, the dogs settling around his legs. "No? Then come down."[](#he-is-sure-of-him)[](#get-between-them)[](#do-not-intervene)

## Opportunities

### He is sure of him
- **Noticed by:** [Empathy](../../cards/empathy.md)
- **When:** setup:events/wolf-attack/hunters-cross-paths.md
- **Outcome:** [@surname](../../characters/butcher.md) is standing in a rifle's sights and enjoying it. He is certain [@surname](../../characters/neighbour.md) will not fire, as if he has seen him not fire before.

### One wolf down
- **When:** setup:events/wolf-attack/hunters-cross-paths.md AND [Pipe out](hunt-with-dudka/the-stand.md#pipe-out) is true
- **Outcome:** One wolf did not make the trees. It lies in the grass of the clearing, the hunter's shot clean through it.

## Actions

### Get between them
- **Requires:** [Violence](../../cards/violence.md) OR [Speech](../../cards/speech.md)
<!-- Prompted by: setup:events/wolf-attack/hunters-cross-paths.md -->
- **Cost:** 1 composure
- **Outcome:** You step into the line between the barrel and the man and talk it down. [@surname](../../characters/butcher.md) whistles the dogs and goes, and [@surname](../../characters/neighbour.md) is spared losing to him in front of you.
- **Changes:** [The clash](#the-clash) — separated

### Do not intervene
<!-- Prompted by: setup:events/wolf-attack/hunters-cross-paths.md -->
- **Outcome:** [@surname](../../characters/butcher.md) ends the standoff by mocking [@surname](../../characters/neighbour.md) for failing to stop him in the past; then he leaves with his dogs.
- **Gives:** [`dudka-despises-rezen`](../../clues/clues.md#dudka-despises-rezen), [`rezen-mocks-an-old-failure`](../../clues/clues.md#rezen-mocks-an-old-failure)

## Mechanics

### The clash

- **Type:** enum (standoff | separated)
- **Per:** world
- **Start:** standoff
- Separated once the players get between them; otherwise it burns out with [@surname](../../characters/butcher.md) the winner.

## Resolve

- [The clash](#the-clash) is standoff AND [Pipe out](hunt-with-dudka/the-stand.md#pipe-out) is false → [Humiliated](../../characters/neighbour.md#humiliated) = true
