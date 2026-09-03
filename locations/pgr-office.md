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
- The shelf holds farm records, including construction and land-drainage (melioracja) files.

## Opportunities

- **Maps on the desk** `(requires: Geology)` — The topographic maps mark %OLD_VILLAGE%. → Gives: [old village was Lemko](../clues/clues.md#old-village-was-lemko)
- **Read the topographic map** `(requires: Bureaucracy)` `(prompted by: [committee-runs-geographical-survey](../clues/clues.md#committee-runs-geographical-survey))` — The map draws the ridge water-gap as an open channel, shows %NEW_VILLAGE% above the flood line, and draws a bridge spanning dry ground with the river running elsewhere. → Gives: [map-shows-gap-open](../clues/clues.md#map-shows-gap-open), [new-village-sits-above-flood-line](../clues/clues.md#new-village-sits-above-flood-line), [bridge-over-solid-land](../clues/clues.md#bridge-over-solid-land)

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
- **Outcome:** Resolve through [Tell Wojewoda about the flood risk](../events/arrival.md#tell-wojewoda-about-the-flood-risk) or [Tell with geological proof](../characters/wojewoda.md#tell-with-geological-proof).
- **Gives:** NPC State Change: Zbigniew Gajda has been formally warned about the flood risk.

### Use the phone
- **Requires:** Zbigniew Gajda grants access
- **Cost:** 1 action per call
- **Outcome:** Players can call prof. Tadeusz Bieńkowski, dr Leon Sawicki, or district authorities, subject to game state.
- **Gives:** [phone is lifeline](../clues/clues.md#phone-is-lifeline); Scene Unlock: outside calls through the office phone.

### Call the survey archive
- **Requires:** Phone access (monitored if Zbigniew Gajda is present)
- **Prompted by:** [committee-hides-the-flood](../clues/clues.md#committee-hides-the-flood)
- **Cost:** 1 action per call
- **Outcome:** The district survey archive confirms the previous crew filed a thin report, drove only a handful of stakes, and closed the job early. On the record it reads as thin work, well short of a proper survey.
- **Gives:** [original-report-is-thin](../clues/clues.md#original-report-is-thin)

### Date the map against the ground
- **Requires:** The topographic map
- **Prompted by:** [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap); [gap-is-blocked](../clues/clues.md#gap-is-blocked); [river-doesnt-match-map](../clues/clues.md#river-doesnt-match-map)
- **Cost:** 1 action
- **Outcome:** The map's survey date predates the landslide and the river's shift. It cannot be trusted on the gap or the river's course.
- **Gives:** [map-is-outdated](../clues/clues.md#map-is-outdated)

### Pull the ditch construction file
- **Requires:** Committee authority
- **Prompted by:** [ditch-is-candidate-drain](../clues/clues.md#ditch-is-candidate-drain)
- **Cost:** 1 action
- **Outcome:** The shelf's land-drainage files hold the ditch's construction spec: a concrete-lined channel the full run, signed off as built. Set against a walked ditch it is the paper proof the ditch fell short.
- **Gives:** Item: [PGR Irrigation Ditch Construction Spec](../items/ditch-construction-spec.md)

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
