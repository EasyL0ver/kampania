# PGR Office

**Type:** Location (revisitable)
**Location:** Zbigniew Gajda's office in the PGR main building.
**Present:** [Zbigniew Gajda](../characters/wojewoda.md) (usually during day)
**Available:** After arrival event
**Cost:** 1 action per visit

## Hook

Zbigniew Gajda's office in the PGR main building.

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

- **Maps on the desk** `(noticed by: [Geology](../cards/geology.md))` — The topographic maps mark %OLD_VILLAGE%. → Gives: [old-village-was-lemko](../clues/clues.md#old-village-was-lemko)
- **Read the topographic map** `(noticed by: [Bureaucracy](../cards/bureaucracy.md))` `(prompted by: [committee-runs-geographical-survey](../clues/clues.md#committee-runs-geographical-survey))` — The map draws the ridge water-gap as an open channel and draws a bridge spanning dry ground with the river running elsewhere. → Gives: [map-shows-gap-open](../clues/clues.md#map-shows-gap-open), [bridge-over-solid-land](../clues/clues.md#bridge-over-solid-land)

## Actions

### Steal the maps
- **When:** Zbigniew Gajda absent or distracted
- **Cost:** 1 time
- **Outcome:** Players take the maps; Zbigniew Gajda will notice eventually.
- **Gives:** [Topographic Maps](../items/topographic-maps.md)

### Call the survey archive
- **When:** Phone access (monitored if Zbigniew Gajda is present)
- **Prompted by:** [the-flood-line-potentially-miscalculated](../clues/clues.md#the-flood-line-potentially-miscalculated)
- **Cost:** 1 time
- **Outcome:** The district survey archive confirms the previous crew filed a thin report, drove only a handful of stakes, and closed the job early. On the record it reads as thin work, well short of a proper survey.
- **Gives:** [original-report-is-thin](../clues/clues.md#original-report-is-thin)

### Date the map against the ground
- **When:** The topographic map
- **Prompted by:** [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap), [gap-is-blocked](../clues/clues.md#gap-is-blocked), [river-doesnt-match-map](../clues/clues.md#river-doesnt-match-map)
- **Cost:** 1 time
- **Outcome:** The map's survey date predates the landslide and the river's shift. It cannot be trusted on the gap or the river's course.
- **Gives:** [map-is-outdated](../clues/clues.md#map-is-outdated)

### Pull the ditch construction file
- **Prompted by:** [ditch-is-candidate-drain](../clues/clues.md#ditch-is-candidate-drain)
- **Cost:** 1 time
- **Outcome:** The shelf's land-drainage files hold the ditch's construction spec: a concrete-lined channel the full run, signed off as built. Set against a walked ditch it is the paper proof the ditch fell short.
- **Gives:** [PGR Irrigation Ditch Construction Spec](../items/ditch-construction-spec.md)

### Inspect the PGR ledger
- **When:** Committee census work
- **Cost:** 1 time
- **Outcome:** The ledger lists PGR workers and wages; some names do not match anyone in the village.
- **Gives:** [mazur-paid-but-absent](../clues/clues.md#mazur-paid-but-absent)

### Crack the safe
- **When:** Zbigniew Gajda absent or distracted, and a way to open the safe
- **Cost:** 1 time
- **Outcome:** The safe contains the sołtys's loaded pistol and [Edward Barnaś's Departure Declaration](../items/barnas-departure-declaration.md).
- **Gives:** [Edward Barnaś's Departure Declaration](../items/barnas-departure-declaration.md), [departure-declaration-forged](../clues/clues.md#departure-declaration-forged), [Sołtys's Pistol](../items/soltys-pistol.md)
