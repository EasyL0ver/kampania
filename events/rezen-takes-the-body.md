# Butcher Takes the Body

**Location:** [@name](../locations/new-village/the-church/the-church.md), then [@name](../locations/old-village-ruins.md)
**Present:** [@name](../characters/butcher.md) (if [Alive](../characters/butcher.md#alive) is true)

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
- The coffin at the front is open and empty.[](#empty-coffin-untouched-by-struggle)
- A candle is knocked over.
- A wet drag trail crosses the flagstones and leaves the church.
- Heel-furrows in the mud lead toward[](#fresh-trail-leads-to-hołubie) [@name](../locations/old-village-ruins.md) and the well.
- Dog prints run alongside the drag trail.[](#butchers-dogs-roam-church-and-forest)
- The village is not awake yet.
- If players kept vigil, [@surname](../characters/butcher.md) enters after midnight, soaked and calm.[](#butcher-steadier-after-taking-body)
- If players kept vigil, his dogs wait at the threshold.
- If no one stops him, he lifts [@first-name](../characters/ciotka.md)'s body and carries it out.

## Opportunities

### Fresh trail leads to Hołubie
- **Noticed by:** [Survival](../cards/survival.md)
- **When:** setup:events/rezen-takes-the-body.md
- **Outcome:** the trail is fresh, made within the last few hours, and points straight toward [@name](../locations/old-village-ruins.md).
- **Gives:** [`ciotka-body-taken`](../clues/clues.md#ciotka-body-taken)

### Empty coffin untouched by struggle
- **Noticed by:** [Finesse](../cards/finesse.md)
- **When:** setup:events/rezen-takes-the-body.md
- **Outcome:** The empty coffin shows no sign of struggle, theft, or vandalism. Whoever came wanted the body only.

### Butcher's dogs roam church and forest
- **Noticed by:** [Survival](../cards/survival.md)
- **When:** setup:events/rezen-takes-the-body.md
- **Outcome:** the dogs are [@surname](../characters/butcher.md)'s dogs and move between the church and the forest path.

### Butcher steadier after taking body
- **Noticed by:** [Empathy](../cards/empathy.md)
- **When:** setup:events/rezen-takes-the-body.md
- **Outcome:** he is steadier after taking the body than he has been in days.

## Actions

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
