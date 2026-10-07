# The Odpust — Grace at the Last — prose

<!-- Parked prose for world/events/the-odpust.ts. Sections keyed by move id.
     Moved verbatim from events/the-odpust.md; not yet reviewed. -->

## Header

**Location:** [The church](../locations/the-church.md)
**Present:** [ks. Władysław Pająk](../characters/priest.md), [Helena Rzepka](../characters/matrona.md), [Zbigniew Gajda](../characters/wojewoda.md) (if survived Day 6), [Tadek](../characters/wujas.md), [Ryszard Dudka](../characters/neighbour.md), [Emil](../characters/painter.md), [Stanisław Rezeń](../characters/butcher.md) (if not killed), [Stefania Kopacz](../characters/babcia.md) (conditional), villagers
**Available:** Day 7; fires only if [Faith in Redemption](../story-facts/spiritual-endings.md) cleared its threshold by end of Day 6 and [Rest](the-ritual.md) has not fired.

## Trigger

- Enough guilty villagers knelt in ks. Pająk's confessional.
- ks. Pająk's crisis resolves toward mercy.
- He chooses to offer grace before the water reaches the church.
- If [Rest](the-ritual.md) has fired, this event does not fire.
- If the threshold is not met, the day goes to [The Seal-Break](the-seal-break.md).

## Hook

- The church bell rings steadily through the rain.
- The bell is audible across %NEW_VILLAGE%.
- Villagers come expecting another flood Mass.
- The ringing signals calm rather than panic.

## Setup

- The church is packed.
- Black water has reached under the door.
- Water spreads across the flagstones.
- Floor candles are drowned.
- ks. Pająk stands straight at the altar in clean vestments.
- He preaches on Isaiah: sins like scarlet becoming white.
- He looks at men he knows carry blood when he says scarlet.
- He does not name them.
- He says the water is the last chance for mercy, not the end of mercy.
- He offers general absolution to the congregation.
- If [Rezeń](../characters/butcher.md) lives, he attends despite skipping earlier Masses.
- If the players stirred the Lemko rite but did not finish [Rest](the-ritual.md), [Stefania Kopacz](../characters/babcia.md) stands and pleads against washing killers clean while the dead in the well remain unnamed.
- **Composure:** 2

## Exits

- Into the flood and the final water choices in [The Flood](the-flood.md).
- [Rest](the-ritual.md) is foreclosed if the odpust completes.
- If Babcia's plea stops the odpust, go to [The Ritual](the-ritual.md).

## theRestoredPriest

ks. Pająk has chosen mercy over judgment.

## theRiteForming

He is building toward general absolution for people in danger of death.

## theWordScarlet

His eyes go to Zbigniew, Tadek, and Rezeń, but not Helena.

## theButcherInThePew

`(requires: Empathy and [Rezeń](../characters/butcher.md) present)` — Rezeń is accepting absolution without visible contrition.

## babciasObjection

`(requires: [Stefania Kopacz](../characters/babcia.md) present and Culture)` — the Lemko dead have not been named or rested, so Catholic absolution does not answer their grievance.

## receiveTheOdpust

ks. Pająk grants general absolution to the congregation as the water rises.

**Gives:** Ending Progress: the Grace ending fires; World State Change: [Rest](the-ritual.md) is foreclosed

## bringASpecificGuiltySoulToTheRail

**Requires:** A guilty NPC is present and reachable.

The named soul is walked forward, made to kneel, and receives absolution with guilt spoken and answered.

## answerBabciasPleaByStopping

**Requires:** [Stefania Kopacz](../characters/babcia.md) is present and the players choose not to proceed past her plea.

The players refuse to let the odpust be the final answer while the well dead remain unnamed.

## proceedPastBabciasPlea

**Requires:** [Stefania Kopacz](../characters/babcia.md) is present and the players continue the odpust.

The odpust proceeds over Babcia's objection.

**Gives:** World State Change: the Lemko dead turn vengeful; Ending Progress: see [spiritual-endings.md](../story-facts/spiritual-endings.md)

## refuseItAndWalkOut

**Requires:** A player wants the guilty exposed, not forgiven.

That player refuses absolution and leaves the church; ks. Pająk continues the rite for the congregation.
