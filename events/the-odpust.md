# The Odpust — Grace at the Last

**Location:** [@name](../locations/new-village/the-church/the-church.md)
**Present:** [@name](../characters/priest.md), [@name](../characters/matrona.md), [@name](../characters/wojewoda.md) (if [Alive](../characters/wojewoda.md#alive) is true), [@name](../characters/wujas.md), [@name](../characters/neighbour.md), [@name](../characters/painter.md), [@name](../characters/butcher.md) (if [Alive](../characters/butcher.md#alive) is true), [@name](../characters/babcia.md)

## Hook

- The church bell rings steadily through the rain.
- The bell is audible across [@name](../locations/new-village/new-village.md).
- Villagers come expecting another flood Mass.
- The ringing signals calm rather than panic.

## Setup

- The church is packed.
- Black water has reached under the door.
- Water spreads across the flagstones.
- Floor candles are drowned.
- [@title](../characters/priest.md) [@surname](../characters/priest.md) stands straight at the altar in clean vestments.
- He preaches on Isaiah: sins like scarlet becoming white.
- He looks at men he knows carry blood when he says scarlet.[](#his-gaze-skips-over-matrona)
- He does not name them.
- He says the water is the last chance for mercy, not the end of mercy.[](#priest-chooses-mercy-over-judgment)
- He offers general absolution to the congregation.[](#he-plans-general-absolution-rite)
- If [@name](../characters/butcher.md) lives, he attends despite skipping earlier Masses.
- If the players stirred the Lemko rite but did not finish [@name](the-ritual.md), [@name](../characters/babcia.md) stands and pleads[](#babcia-says-lemko-dead-unanswered) against washing killers clean while the dead in the well remain unnamed.

## Opportunities

### Priest chooses mercy over judgment
- **Noticed by:** [Devotion](../cards/devotion.md)
- **When:** setup:events/the-odpust.md
- **Outcome:** [@title](../characters/priest.md) [@surname](../characters/priest.md) has chosen mercy over judgment.

### He plans general absolution rite
- **Noticed by:** [Culture](../cards/culture.md)
- **When:** setup:events/the-odpust.md
- **Outcome:** He is building a rite toward general absolution for people in danger of death.

### His gaze skips over Matrona
- **Noticed by:** [Devotion](../cards/devotion.md)
- **When:** setup:events/the-odpust.md
- **Outcome:** On the word scarlet, his eyes go to [@first-name](../characters/wojewoda.md), [@nickname](../characters/wujas.md), and [@surname](../characters/butcher.md), but not [@first-name](../characters/matrona.md).

### Butcher accepts absolution without contrition
- **Noticed by:** [Empathy](../cards/empathy.md)
- **When:** [Alive](../characters/butcher.md#alive) is true
- **Outcome:** [@surname](../characters/butcher.md) is accepting absolution without visible contrition.

### Babcia says Lemko dead unanswered
- **Noticed by:** [Culture](../cards/culture.md)
- **When:** setup:events/the-odpust.md
- **Outcome:** Babcia objects: the Lemko dead have not been named or rested, so Catholic absolution does not answer their grievance.

## Actions

### Receive the odpust
- **Outcome:** [@title](../characters/priest.md) [@surname](../characters/priest.md) grants general absolution to the congregation as the water rises.
- **Changes:** [Grace](../characters/priest.md#grace) — true; [Rest](../characters/hag.md#rest) — can no longer become true

### Answer Babcia's plea by stopping
- **When:** [@name](../characters/babcia.md) is present and the players choose not to proceed past her plea.
- **Cost:** 1 time
- **Outcome:** The players refuse to let the odpust be the final answer while the well dead remain unnamed.
- **Gives:** hook:events/the-ritual.md
- **Changes:** [Interrupted](#interrupted) — Babcia's plea stops the odpust

## Mechanics

### Interrupted

- **Type:** bool
- **Per:** world
- **Start:** false
- True when the odpust is stopped before it is granted: [Grace](../characters/priest.md#grace) can no longer become true.
