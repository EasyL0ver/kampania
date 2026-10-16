# Committee Census Register

## Hook

An official blank census book, ruled for households, names, ages, residence dates.

## Setup

An official blank census book issued for the resettlement survey: ruled columns for household, names, ages, and years resident[](#register-records-damages-as-well-as-people). It starts empty and fills as the committee works the village. In a settlement this small, a name on the farm's payroll that appears in no household stands out at once.

## Content

```
POPULATION CENSUS — RESETTLEMENT SURVEY
[@name](../locations/new-village/new-village.md)

Household        Name                 Age   Resident since   Notes
──────────────   ──────────────────   ───   ──────────────   ──────────────
                                                             (filled on site)
```

## Mechanics

### Census

- **Type:** list
- One entry per person, made by the **Census interview** action with that person or their household.
- An entry records household, name, age and years resident, or a refusal or a gap where the person would not answer.

### Keeper

- **Type:** rule
- The committee keeps the register unless it hands it over. Whoever holds it fills it, and decides what it shows.

### Property Record

- **Type:** list
- One entry per property, made by the **Property assessment** action.
- An entry records what the household owns and claims, or that the property stayed unassessed.

## Opportunities

### Register records damages as well as people
- **Noticed by:** [Bureaucracy](../cards/bureaucracy.md)
- **When:** setup:items/census.md
- **Outcome:** The register is there to gauge damages, not only to count heads, so it has room for the dead as much as the living. A name can sit on a roll long after its owner is gone.

## Actions

### Read the family's surnames
- **Requires:** [@name](census.md)
<!-- Prompted by: [edeks-father-left](../clues/clues.md#edeks-father-left) -->
- **Outcome:** The boy and the father he never knew are set down as Barnaś; the woman raising him is Gajda. She never took his name. Read straight, she and [@name](../characters/soldier.md) were together but never married.
- **Gives:** [ciotka-never-married](../clues/clues.md#ciotka-never-married)
