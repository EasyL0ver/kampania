# PGR Office

**Type:** Location (revisitable)
**Location:** Zbigniew Gajda's office in the PGR main building.
**Present:** [Zbigniew Gajda](../characters/wojewoda.md) (usually during day)
**Available:** After arrival event
**Cost:** 1 action per visit

## Setup

- The room contains a clean desk, heavy bakelite phone, ledgers, topographic maps, a shelf, and a heavy iron wall safe.
- The safe is old, official, and locked.
- Tea is usually on the table.
- Zbigniew Gajda works here and receives visitors here.
- The phone is the only phone in the village.
- The maps show topography, rivers, old boundaries, and %OLD_VILLAGE%.
- The ledger is on the desk during census work.

## Opportunities

- **Maps on the desk** `(requires: Geology)` — The topographic maps mark %OLD_VILLAGE%. → Gives: [old village was Lemko](../clues/clues.md#old-village-was-lemko)

## Actions

### Ask for the maps
- **Requires:** [Zbigniew Gajda](../characters/wojewoda.md) present
- **Cost:** Free
- **Outcome:** Resolve through [Zbigniew Gajda — Ask for the maps](../characters/wojewoda.md#ask-for-the-maps).
- **Gives:** Item: topographic maps if Zbigniew grants them.

### Steal the maps
- **Requires:** Zbigniew Gajda absent or distracted
- **Cost:** 1 action
- **Outcome:** Players take the maps; Zbigniew Gajda will notice eventually.
- **Gives:** Item: topographic maps; World State Change: village outskirts survey cost is reduced; NPC State Change: Zbigniew Gajda becomes suspicious if he discovers the theft.

### Tell Wojewoda about the flood
- **Requires:** [New Village will flood](../clues/clues.md#new-village-will-flood)
- **Cost:** 1 action
- **Outcome:** Resolve through [Zbigniew Gajda — Tell about the flood risk](../characters/wojewoda.md#tell-about-the-flood-risk) or [Tell with geological proof](../characters/wojewoda.md#tell-with-geological-proof).
- **Gives:** NPC State Change: Zbigniew Gajda has been formally warned about the flood risk.

### Use the phone
- **Requires:** Zbigniew Gajda grants access
- **Cost:** 1 action per call
- **Outcome:** Players can call prof. Tadeusz Bieńkowski, dr Leon Sawicki, or district authorities, subject to game state.
- **Gives:** [phone is lifeline](../clues/clues.md#phone-is-lifeline); Scene Unlock: outside calls through the office phone.

### Inspect the PGR ledger
- **Requires:** Committee census work
- **Cost:** 1 action
- **Outcome:** The ledger lists PGR workers and wages; some names do not match anyone in the village.
- **Gives:** [Foreman cover-up](../clues/clues.md#foreman-coverup)

### Report the bimber still
- **Requires:** [bimber-still](../clues/clues.md#bimber-still)
- **Cost:** Free
- **Outcome:** Resolve through [Zbigniew Gajda — Report the bimber still](../characters/wojewoda.md#report-the-bimber-still).
- **Gives:** NPC State Change: Zbigniew Gajda has been told the committee knows about the bimber still.

### Crack the safe
- **Requires:** Zbigniew Gajda absent or distracted, and a way to open the safe
- **Cost:** 1 action
- **Outcome:** The safe contains the sołtys's loaded pistol and [Edward Barnaś's Departure Declaration](../items/barnas-departure-declaration.md).
- **Gives:** Item: sołtys's pistol; Item: [Edward Barnaś's Departure Declaration](../items/barnas-departure-declaration.md); [departure-declaration-forged](../clues/clues.md#departure-declaration-forged); NPC State Change: Zbigniew Gajda notices either item missing eventually.
