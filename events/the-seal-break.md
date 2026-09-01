# The Seal-Break — The Priest Names the Dead

**Location:** [The church](../locations/the-church.md)
**Present:** [ks. Władysław Pająk](../characters/priest.md), [Helena Rzepka](../characters/matrona.md) (if alive), [Zbigniew Gajda](../characters/wojewoda.md) (if survived Day 6), [Tadek](../characters/wujas.md) (if alive), [Ryszard Dudka](../characters/neighbour.md) (if alive), [Emil](../characters/painter.md) (if alive), [Stanisław Rezeń](../characters/butcher.md) (if not taken by the mob)
**Available:** Day 7, if [Faith in Redemption](../story-facts/spiritual-endings.md) is below threshold at the end of Day 6; mutually exclusive with [The Odpust](the-odpust.md)

## Trigger

- [ks. Władysław Pająk](../characters/priest.md)'s Faith in Redemption score fails.
- No merciful reading prevails before Day 7.
- The guilty do not kneel, or the players push him to weaponise the confessional, or the Day-6 night lynch happens.
- He decides the valley is damned and breaks the seal of confession.

## Hook

- The church bell rings wrong and too long.
- The bell stops mid-strike.
- The sound is audible across %NEW_VILLAGE%.

## Setup

- The church is packed.
- Black water is under the door and spreading over the flagstones.
- Floor candles are drowning.
- [ks. Władysław Pająk](../characters/priest.md) sits on the altar table with bimber.
- His collar is off.
- His vestments are half-undone.
- He is drunk.
- A Carmen cigarette burns in his hand; he smokes openly in the church he once forbade it in.
- He says he has decided to stop lying.
- He calls the water judgment over a valley built on a grave.
- He names the acts from the 1954 lynch.
- He names [Zbigniew Gajda](../characters/wojewoda.md), [Tadek](../characters/wujas.md), and [Stanisław Rezeń](../characters/butcher.md).
- He grieves [Janina Gajda](../characters/ciotka.md) as the source of years of confession.
- He does not name [Helena Rzepka](../characters/matrona.md).
- His account reaches from the 1954 lynch back to the old village and the state cover-up.
- **Composure:** 2.

## Opportunities

- **The priest on the altar** `(requires: Devotion)` — he knows what breaking the seal costs and does it deliberately.
- **The broken seal** `(requires: Culture)` — a priest violating the seal of confession is committing one of the gravest violations in his faith.
- **The names as they land** `(requires: Empathy)` — [Zbigniew Gajda](../characters/wojewoda.md) looks for an exit; [Tadek](../characters/wujas.md) weeps; [Helena Rzepka](../characters/matrona.md) waits for her name and does not hear it.
- **The valley built on a grave** `(requires: History or Culture)` — his account connects the lynch to the old village, the people officially called resettled, and the buried cover-up.
- **The open vice** `(requires: nothing)`: the man who hid his habit now smokes on the altar, plain to everyone present. → Gives: [priest-smokes](../clues/clues.md#priest-smokes); a **Chainsmoker** reads the brand off the paper → also [priest-smokes-carmen](../clues/clues.md#priest-smokes-carmen)

## Actions

### Let him finish
- **Requires:** Nothing
- **Cost:** Free
- **Outcome:** He names the full lynch account and the shape of 1947 beneath it in front of the surviving village.
- **Gives:** [`priest-knows-everything`](../clues/clues.md#priest-knows-everything); World State Change: the guilty drown unabsolved and [The Odpust](the-odpust.md) is foreclosed

### Carry the testimony out
- **Requires:** A player present survives the flood and has the [ledgers](../story-facts/the-committee.md) or another way to file
- **Cost:** Free
- **Outcome:** The player carries the public testimony into [the report](../story-facts/the-committee.md).
- **Gives:** World State Change: the report is armed with the full account and the property ledger's field 3 is corroborated

### Stop him
- **Requires:** A player physically silences him
- **Cost:** 1 composure
- **Outcome:** The priest stops before the full account is spoken, but whatever names he already said remain public.
- **Gives:** NPC State Change: remaining guilty villagers owe the player and honest villagers turn cold; World State Change: partial public testimony exists

## Exits

- Into [the flood](the-flood.md) with the truth spoken and no absolution.
- [The Odpust](the-odpust.md) is foreclosed.
- [Rest](the-ritual.md) remains open because the seal-break does not name the dead to the dead.
