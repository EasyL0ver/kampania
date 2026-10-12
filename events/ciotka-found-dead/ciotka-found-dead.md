# Ciotka Found Dead — Outside

**Location:** [@name](../../locations/new-village.md)
**Present:** [@name](../../characters/priest.md)
**Available:** Day 3 or later, when players visit [@name](../../locations/ciotkas-house/ciotkas-house.md).

## Trigger

- Players visit [@name](../../locations/ciotkas-house/ciotkas-house.md) on Day 3 or later.
- Fallback trigger: [@name](../../characters/priest.md) notices [@name](../../characters/ciotka.md)'s absence at the anti-flood mass on Day 4 morning and sends someone to check.

## Hook

- [@name](../../characters/ciotka.md)'s front door is locked; the back door stands open.
- [@name](../../characters/ciotka.md) is absent from mass if the fallback trigger fires.

## Setup

- [@name](../../characters/priest.md) stands at [@name](../../characters/ciotka.md)'s front door, knocking. No one answers.
- The front door is locked, both locks turned, as she always kept it.
- The back door stands open.
- Cigarette butts lie scattered just outside the door.

## Opportunities

- Some cigarette butts lie just outside the door, hand-pinched and rain-weathered, dropped a day or more before she died. You cannot tell the brand at a glance, but bagged they could be compared. <!-- Prompted by: [something-happened-to-ciotka](../../clues/clues.md#something-happened-to-ciotka) -->

## Actions

### Ask the priest what brings him here
- **Outcome:** "She wasn't at Mass. She has never once missed Mass." He knocked; nobody answered.
- **Gives:** [ciotka-missed-mass](../../clues/clues.md#ciotka-missed-mass), [something-happened-to-ciotka](../../clues/clues.md#something-happened-to-ciotka)

### Search outside the house
- **When:** Go outside and search the mud.
<!-- Prompted by: [something-happened-to-ciotka](../../clues/clues.md#something-happened-to-ciotka) -->
- **Cost:** 1 time
- **Outcome:** Cigarette butts lie scattered by the door. Large bare footprints run from the house toward the tree line and fade where the canopy starts.
- **Gives:** [@name](../../items/cigarette-butts-from-ciotkas.md), [`glupek-fled-into-forest`](../../clues/clues.md#glupek-fled-into-forest)

### Go in through the back door
<!-- Prompted by: [something-happened-to-ciotka](../../clues/clues.md#something-happened-to-ciotka) -->
- **Outcome:** The back door gives onto a cold, silent house; the priest follows you in.
- **Gives:** aware:events/ciotka-found-dead/the-house.md

## Exits

- [Go in through the back door](#go-in-through-the-back-door): [@name](the-house.md), and from there [@name](the-kitchen.md).
- Search toward the [@name](../../locations/upa-bunker.md) if the players know where to look for [@name](../../characters/glupek.md).

## If Missed

- If players do not visit, [@name](../../characters/priest.md) finds the body after mass on Day 4.
- If [@name](../../characters/priest.md) finds the body first, [@name](../../characters/matrona.md) can control the scene before the committee arrives.
- Evidence may be disturbed before the committee arrives.
- The [@name](../../locations/upa-bunker.md) remains difficult to find without prior knowledge.
