# Butcher Takes the Body

**Location:** [@name](../locations/new-village/the-church/the-church.md), then [@name](../locations/old-village-ruins.md)
**Present:** [@name](../characters/butcher.md) (if [Alive](../characters/butcher.md#alive) is true)
**Available:** Night of Day 5 into Day 6 morning; requires the [@name](the-flood.md) to have postponed [@first-name](../characters/ciotka.md)'s [@name](funeral-mass.md).

## Trigger

- The Day 5 [@name](funeral-mass.md) cannot finish because burial is impossible.
- [@name](../characters/ciotka.md)'s coffin remains in the church.
- [@surname](../characters/butcher.md) is alive, loose, not jailed, not killed, and not yet dead at the well.
- The well's pull takes [@surname](../characters/butcher.md) to the church.
- If players keep vigil over the coffin, this becomes a live confrontation.

## Hook

- [@surname](../characters/butcher.md)'s dogs move in the dark between the church and the forest.
- The dogs do not bark.
- A slow dragging sound comes from the church area.
- The church door stands open.
- Rain blows across the flagstones.
- The hook is perceivable near the village centre or by anyone awake at night.

## Setup

- If discovered on Day 6 morning, the church door is ajar.
- Rain pools inside the church.
- The coffin at the front is open and empty.
- A candle is knocked over.
- A wet drag trail crosses the flagstones and leaves the church.
- Heel-furrows in the mud lead toward [@name](../locations/old-village-ruins.md) and the well.
- Dog prints run alongside the drag trail.
- The village is not awake yet.
- If players kept vigil, [@surname](../characters/butcher.md) enters after midnight, soaked and calm.
- If players kept vigil, his dogs wait at the threshold.
- If no one stops him, he lifts [@first-name](../characters/ciotka.md)'s body and carries it out.

## Opportunities

- *(noticed by: [Survival](../cards/survival.md))* — the trail is fresh, made within the last few hours, and points straight toward [@name](../locations/old-village-ruins.md). → Gives: [`ciotka-body-taken`](../clues/clues.md#ciotka-body-taken)
- *(noticed by: [Finesse](../cards/finesse.md))* — The empty coffin shows no sign of struggle, theft, or vandalism. Whoever came wanted the body only.
- *(noticed by: [Survival](../cards/survival.md))* — the dogs are [@surname](../characters/butcher.md)'s dogs and move between the church and the forest path.
- *(noticed by: [Empathy](../cards/empathy.md))* — he is steadier after taking the body than he has been in days.

## Actions

### Keep vigil over the body
- **When:** Players chose to stay with the coffin overnight after the [@name](funeral-mass.md).
- **Cost:** 4 time
- **Outcome:** [@surname](../characters/butcher.md) comes for the body after midnight, stops when caught, explains himself, and leaves without the body.
- **Gives:** [`butcher-dumps-carcasses-in-well`](../clues/clues.md#butcher-dumps-carcasses-in-well)
- **Changes:** [Vigil](#vigil) — true

### Follow the drag trail
- **When:** Found the empty coffin and the trail.
- **Cost:** 1 time
- **Outcome:** The trail reaches the well in [@name](../locations/old-village-ruins.md); a shawl or shoe is caught on the stone; [@surname](../characters/butcher.md)'s tracks lead back to [@name](../locations/new-village/butchers-house.md).
- **Gives:** [`ciotka-body-taken`](../clues/clues.md#ciotka-body-taken)

### Confront Butcher
- **When:** Caught him at the church, or tracked the body to him.
- **Cost:** 1 time
- **Outcome:** [@surname](../characters/butcher.md) does not deny taking the body. He says the flood left [@first-name](../characters/ciotka.md) unburied, the body was turning, and the well is where he put her.
- **Gives:** [`rezen-fed-ciotka-to-well`](../clues/clues.md#rezen-fed-ciotka-to-well)

## Mechanics

### Vigil

- **Type:** bool
- **Per:** world
- **Start:** false
- True once players keep vigil over the coffin.

### Ciotka's body

- **Type:** enum (coffin | well)
- **Per:** world
- **Start:** coffin

## Resolve

- [Vigil](#vigil) is false → [Ciotka's body](#ciotkas-body) = well
<!-- TBD: the village blames Rezeń if players did not find the trail before it woke. Needs a per-NPC assignment to raise his Lynch Targets score (see game-system Open Questions). -->
