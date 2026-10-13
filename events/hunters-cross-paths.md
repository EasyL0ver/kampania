# The Hunters Cross Paths

**Location:** [@name](../locations/old-village-ruins.md)
**Present:** [@name](../characters/neighbour.md), [@name](../characters/butcher.md)

## Hook

A rifleman confronting a knife-wielding hunter as dogs scatter through the clearing.

## Setup

- [@surname](../characters/neighbour.md) is hidden with his rifle trained on the wolves.
- The wolves are in the open and unaware of [@surname](../characters/neighbour.md).
- [@surname](../characters/butcher.md)'s three dogs crash through the brush and drive the wolves into the trees[](#butcher-is-the-real-threat).
- [@surname](../characters/neighbour.md)'s shot is lost.
- [@surname](../characters/neighbour.md) confronts [@surname](../characters/butcher.md) with the rifle in his hands[](#neighbour-names-butcher-as-dangerous).
- [@surname](../characters/butcher.md) goes still, keeps his knife in hand[](#butcher-calm-with-knife-drawn), and lets the dogs fan out around him.
- Both men are close enough to violence that one wrong movement can start a killing[](#violence-would-favour-butchers-side).

## Opportunities

### Butcher is the real threat
- **Noticed by:** [Violence](../cards/violence.md)
- **When:** setup:events/hunters-cross-paths.md
- **Outcome:** [@surname](../characters/neighbour.md) is louder, but [@surname](../characters/butcher.md) is the one ready to kill.
- **Gives:** [`butcher-is-dangerous`](../clues/clues.md#butcher-is-dangerous)

### Neighbour names Butcher as dangerous
- **Noticed by:** [Empathy](../cards/empathy.md)
- **When:** setup:events/hunters-cross-paths.md
<!-- Prompted by: [rezen-hunts-wolves](../clues/clues.md#rezen-hunts-wolves) -->
- **Outcome:** [@surname](../characters/neighbour.md) openly names [@surname](../characters/butcher.md) as more dangerous than the wolves.
- **Gives:** [`dudka-despises-rezen`](../clues/clues.md#dudka-despises-rezen)

### Butcher calm with knife drawn
- **Noticed by:** [Violence](../cards/violence.md)
- **When:** setup:events/hunters-cross-paths.md
- **Outcome:** [@surname](../characters/butcher.md)'s breathing stays even, his eyes stay flat, and the knife is already out.
- **Gives:** [`butcher-is-dangerous`](../clues/clues.md#butcher-is-dangerous)

### Violence would favour Butcher's side
- **Noticed by:** [Survival](../cards/survival.md)
- **When:** setup:events/hunters-cross-paths.md
- **Outcome:** if the standoff turns violent, it will be [@surname](../characters/butcher.md) and three trained dogs against [@surname](../characters/neighbour.md).
- **Gives:** [`butcher-is-dangerous`](../clues/clues.md#butcher-is-dangerous)

## Actions

### Get between them
- **Cost:** 1 time
- **Outcome:** The standoff ends before blood is drawn; [@surname](../characters/butcher.md) pockets the knife and [@surname](../characters/neighbour.md) is denied the public humiliation of losing to him.
- **Gives:** [`butcher-is-dangerous`](../clues/clues.md#butcher-is-dangerous)
- **Changes:** [The clash](#the-clash) — separated

### Let it burn
<!-- Prompted by: [dudka-despises-rezen](../clues/clues.md#dudka-despises-rezen) -->
- **Outcome:** [@surname](../characters/butcher.md) ends the standoff by mocking [@surname](../characters/neighbour.md) for failing to stop him in the past; [@surname](../characters/neighbour.md) is publicly humiliated and [@surname](../characters/butcher.md) leaves with his dogs.
- **Gives:** [`butcher-is-dangerous`](../clues/clues.md#butcher-is-dangerous), [`dudka-despises-rezen`](../clues/clues.md#dudka-despises-rezen), [`rezen-mocks-an-old-failure`](../clues/clues.md#rezen-mocks-an-old-failure)

## Mechanics

### The clash

- **Type:** enum (standoff | separated)
- **Per:** world
- **Start:** standoff
- Separated once the players get between them; otherwise it burns out with [@surname](../characters/butcher.md) the winner.

## Resolve

- [The clash](#the-clash) is standoff → [Humiliated](../characters/neighbour.md#humiliated) = true
