# The Odpust — Grace at the Last

**Location:** [@name](../locations/the-church.md)
**Present:** [@name](../characters/priest.md), [@name](../characters/matrona.md), [@name](../characters/wojewoda.md) (if survived Day 6), [@name](../characters/wujas.md), [@name](../characters/neighbour.md), [@name](../characters/painter.md), [@name](../characters/butcher.md) (if not killed), [@name](../characters/babcia.md) (conditional), villagers
**Available:** Day 7; fires only if [Faith in Redemption](../story-facts/spiritual-endings.md) cleared its threshold by end of Day 6 and [@name](the-ritual.md) has not fired.

## Trigger

- Enough guilty villagers knelt in [@title](../characters/priest.md) [@surname](../characters/priest.md)'s confessional.
- [@title](../characters/priest.md) [@surname](../characters/priest.md)'s crisis resolves toward mercy.
- He chooses to offer grace before the water reaches the church.
- If [@name](the-ritual.md) has fired, this event does not fire.
- If the threshold is not met, the day goes to [@name](the-seal-break.md).

## Hook

- The church bell rings steadily through the rain.
- The bell is audible across [@name](../locations/new-village.md).
- Villagers come expecting another flood Mass.
- The ringing signals calm rather than panic.

## Setup

- The church is packed.
- Black water has reached under the door.
- Water spreads across the flagstones.
- Floor candles are drowned.
- [@title](../characters/priest.md) [@surname](../characters/priest.md) stands straight at the altar in clean vestments.
- He preaches on Isaiah: sins like scarlet becoming white.
- He looks at men he knows carry blood when he says scarlet.
- He does not name them.
- He says the water is the last chance for mercy, not the end of mercy.
- He offers general absolution to the congregation.
- If [@name](../characters/butcher.md) lives, he attends despite skipping earlier Masses.
- If the players stirred the Lemko rite but did not finish [@name](the-ritual.md), [@name](../characters/babcia.md) stands and pleads against washing killers clean while the dead in the well remain unnamed.

## Opportunities

- **The restored priest** `(noticed by: [Devotion](../cards/devotion.md))` — [@title](../characters/priest.md) [@surname](../characters/priest.md) has chosen mercy over judgment.
- **The rite forming** `(noticed by: [Culture](../cards/culture.md))` — he is building toward general absolution for people in danger of death.
- **The word scarlet** `(noticed by: [Devotion](../cards/devotion.md))` — his eyes go to [@first-name](../characters/wojewoda.md), [@nickname](../characters/wujas.md), and [@surname](../characters/butcher.md), but not [@first-name](../characters/matrona.md).
- **The butcher in the pew** `(when: [@name](../characters/butcher.md) present)` `(noticed by: [Empathy](../cards/empathy.md))` — [@surname](../characters/butcher.md) is accepting absolution without visible contrition.
- **Babcia's objection** `(when: [@name](../characters/babcia.md) present)` `(noticed by: [Culture](../cards/culture.md))` — the Lemko dead have not been named or rested, so Catholic absolution does not answer their grievance.

## Actions

### Receive the odpust
- **Outcome:** [@title](../characters/priest.md) [@surname](../characters/priest.md) grants general absolution to the congregation as the water rises.
- **Changes:** [Grace](../characters/priest.md#grace) — true; [Rest](../characters/hag.md#rest) — can no longer become true

### Answer Babcia's plea by stopping
- **When:** [@name](../characters/babcia.md) is present and the players choose not to proceed past her plea.
- **Cost:** 1 time
- **Outcome:** The players refuse to let the odpust be the final answer while the well dead remain unnamed.
- **Gives:** aware:events/the-ritual.md
- **Changes:** [Interrupted](#interrupted) — Babcia's plea stops the odpust

## Mechanics

### Interrupted

- **Type:** bool
- **Per:** world
- **Start:** false
- True when the odpust is stopped before it is granted: [Grace](../characters/priest.md#grace) can no longer become true.

## Exits

- Into the flood and the final water choices in [@name](the-flood.md).
- [@name](the-ritual.md) is foreclosed if the odpust completes.
- If Babcia's plea stops the odpust, go to [@name](the-ritual.md).
