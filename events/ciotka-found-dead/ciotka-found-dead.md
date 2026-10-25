# Ciotka Found Dead — Outside

**Location:** [@name](../../locations/new-village/new-village.md)
**Present:** [@name](../../characters/priest.md)

## Hook

- [@name](../../characters/ciotka.md)'s front door is locked; the back door stands open.

## Setup

- [@name](../../characters/priest.md) stands at [@name](../../characters/ciotka.md)'s front door, knocking. No one answers.[](#ask-the-priest-what-brings-him-here)
- The front door is locked, both locks turned, as she always kept it.
- The back door stands open.
- Cigarette butts lie scattered just outside the door.[](#cigarette-butts-outside-the-door)

## Opportunities

### Cigarette butts outside the door
- **When:** setup:events/ciotka-found-dead/ciotka-found-dead.md
<!-- Prompted by: [something-happened-to-ciotka](../../clues/clues.md#something-happened-to-ciotka) -->
- **Outcome:** Some cigarette butts lie just outside the door, hand-pinched and rain-weathered, dropped a day or more before she died. You cannot tell the brand at a glance, but bagged they could be compared.

## Actions

### Ask the priest what brings him here
<!-- Prompted by: setup:events/ciotka-found-dead/ciotka-found-dead.md -->
- **Outcome:** "She wasn't at Mass. She has never once missed Mass." He knocked; nobody answered.
- **Gives:** [ciotka-missed-mass](../../clues/clues.md#ciotka-missed-mass), [something-happened-to-ciotka](../../clues/clues.md#something-happened-to-ciotka)

### Search outside the house
<!-- Prompted by: [something-happened-to-ciotka](../../clues/clues.md#something-happened-to-ciotka) -->
- **Cost:** 1 time
- **Outcome:** Cigarette butts lie scattered by the door. Large bare footprints run from the house toward the tree line and fade where the canopy starts.
- **Gives:** [@name](../../items/cigarette-butts-from-ciotkas.md), [`glupek-fled-into-forest`](../../clues/clues.md#glupek-fled-into-forest)

### Go in through the back door
<!-- Prompted by: [something-happened-to-ciotka](../../clues/clues.md#something-happened-to-ciotka) -->
- **Outcome:** The back door gives onto a cold, silent house; the priest follows you in.
- **Gives:** hook:events/ciotka-found-dead/the-house.md
- **Changes:** [@name](the-house.md) — starts
