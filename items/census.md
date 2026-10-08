# Committee Census Register

**Type:** Item — census register (document)
**Source:** Issued to the committee for the assignment on the drive in ([The Car In](../events/the-car-in.md)); filled household by household through the **Census interview** action across the village.
**Carried:** The running record of who lives in %NEW_VILLAGE%. Set against the [PGR worker registry](pgr-ledger.md), it exposes a paid "worker" that no household contains.

## Hook

An official blank census book, ruled for households, names, ages, residence dates.

## Description

An official blank census book issued for the resettlement survey: ruled columns for household, names, ages, and years resident. It starts empty and fills as the committee works the village. In a settlement this small, a name on the farm's payroll that appears in no household stands out at once.

## Content

```
POPULATION CENSUS — RESETTLEMENT SURVEY
%NEW_VILLAGE%

Household        Name                 Age   Resident since   Notes
──────────────   ──────────────────   ───   ──────────────   ──────────────
                                                             (filled on site)
```

## Mechanics

### Census

- One entry per person, made by the **Census interview** action with that person or their household.
- An entry records household, name, age and years resident, or a refusal or a gap where the person would not answer.

### Keeper

- The committee keeps the register unless it hands it over. Whoever holds it fills it, and decides what it shows.

### Property Record

- One entry per property, made by the **Property assessment** action.
- An entry records what the household owns and claims, or that the property stayed unassessed.

## Opportunities

- **Not just the living** `(noticed by: [Bureaucracy](../cards/bureaucracy.md))` — The register is there to gauge damages, not only to count heads, so it has room for the dead as much as the living. A name can sit on a roll long after its owner is gone.

## Actions

### Cross-check against the worker registry
- **When:** Holding the census with household entries recorded, and the [PGR worker registry](pgr-ledger.md)
- **Cost:** 1 time
- **Outcome:** The census records every living head in the village. One name on the farm's payroll, Tadeusz Mazur, belongs to no household: his widow is listed alone. A worker drawing wages that no household accounts for.
- **Gives:** [mazur-paid-but-absent](../clues/clues.md#mazur-paid-but-absent)

### Read the family's surnames
- **When:** Holding the census with the Gajda/Barnaś household recorded
- **Prompted by:** [edeks-father-left](../clues/clues.md#edeks-father-left)
- **Outcome:** The boy and the father he never knew are set down as Barnaś; the woman raising him is Gajda. She never took his name. Read straight, she and Edward Barnaś were together but never married.
- **Gives:** [ciotka-never-married](../clues/clues.md#ciotka-never-married)
