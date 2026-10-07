# PGR Office — prose

<!-- Parked prose for world/locations/pgr-office.ts. Sections keyed by move id.
     Moved verbatim from locations/pgr-office.md; not yet reviewed. -->

## Header

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
- The shelf holds farm records, including construction and land-drainage (melioracja) files.

## mapsOnTheDesk

The topographic maps mark %OLD_VILLAGE%.

## readTheTopographicMap

The map draws the ridge water-gap as an open channel and draws a bridge spanning dry ground with the river running elsewhere.

## Ask for the maps (cross-reference, not a move)

- **Requires:** [Zbigniew Gajda](../characters/wojewoda.md) present
- **Cost:** Free
- **Outcome:** Resolve through [Zbigniew Gajda — Ask for the maps](../characters/wojewoda.md#ask-for-the-maps).
- **Gives:** Item: topographic maps if Zbigniew grants them.

## stealTheMaps

Players take the maps; Zbigniew Gajda will notice eventually.

## Tell Wojewoda about the flood (cross-reference, not a move)

- **Requires:** [New Village will flood](../clues/clues.md#new-village-will-flood)
- **Cost:** 1 action
- **Outcome:** Resolve through [Tell Wojewoda about the flood risk](../events/arrival.md#tell-wojewoda-about-the-flood-risk) or [Tell with geological proof](../characters/wojewoda.md#tell-with-geological-proof).
- **Gives:** NPC State Change: Zbigniew Gajda has been formally warned about the flood risk.

## useThePhone

Cost: 1 action per call

Players can call prof. Tadeusz Bieńkowski, dr Leon Sawicki, or district authorities, subject to game state.

Gives (original): Scene Unlock: outside calls through the office phone.

## callTheSurveyArchive

Cost: 1 action per call

Requires (original): Phone access (monitored if Zbigniew Gajda is present)

The district survey archive confirms the previous crew filed a thin report, drove only a handful of stakes, and closed the job early. On the record it reads as thin work, well short of a proper survey.

## dateTheMapAgainstTheGround

The map's survey date predates the landslide and the river's shift. It cannot be trusted on the gap or the river's course.

## pullTheDitchConstructionFile

The shelf's land-drainage files hold the ditch's construction spec: a concrete-lined channel the full run, signed off as built. Set against a walked ditch it is the paper proof the ditch fell short.

## inspectThePgrLedger

Requires: Committee census work

The ledger lists PGR workers and wages; some names do not match anyone in the village.

## Report the bimber still (cross-reference, not a move)

- **Requires:** [bimber-still](../clues/clues.md#bimber-still)
- **Cost:** Free
- **Outcome:** Resolve through [Zbigniew Gajda — Report the bimber still](../characters/wojewoda.md#report-the-bimber-still).
- **Gives:** NPC State Change: Zbigniew Gajda has been told the committee knows about the bimber still.

## crackTheSafe

The safe contains the sołtys's loaded pistol and [Edward Barnaś's Departure Declaration](../items/barnas-departure-declaration.md).
