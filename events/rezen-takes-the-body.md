# Rezeń Takes the Body

**Location:** [The church](../locations/the-church.md), then [the well](../locations/the-well.md)
**Present:** [Stanisław Rezeń](../characters/butcher.md) (if alive and loose), his dogs
**Available:** Night of Day 5 into Day 6 morning; requires the [flood](the-flood.md) to have postponed Janina's [burial](funeral-mass.md#the-flood-postpones-burial).

## Trigger

- The Day 5 [funeral](funeral-mass.md) cannot finish because burial is impossible.
- [Janina Gajda](../characters/ciotka.md)'s coffin remains in the church.
- Rezeń is alive, loose, not jailed, not killed, and not yet dead at the well.
- The well's pull takes Rezeń to the church.
- If players keep vigil over the coffin, this becomes a live confrontation.

## Hook

- Rezeń's dogs move in the dark between the church and the forest.
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
- Heel-furrows in the mud lead toward [%OLD_VILLAGE%](../locations/old-village-ruins.md) and the well.
- Dog prints run alongside the drag trail.
- The village is not awake yet.
- If players kept vigil, Rezeń enters after midnight, soaked and calm.
- If players kept vigil, his dogs wait at the threshold.
- If no one stops him, he lifts Janina's body and carries it out.
- **Composure:** 1

## Opportunities

- **The drag trail** `(requires: Observation or Endurance)` — the trail is fresh, made within the last few hours, and points straight toward [%OLD_VILLAGE%](../locations/old-village-ruins.md). → Gives: [`ciotka-body-taken`](../clues/clues.md#ciotka-body-taken)
- **The empty coffin** `(requires: Read)` — there is no sign of struggle, theft, or vandalism. Whoever came wanted the body only.
- **The dogs** `(requires: Observation)` — the dogs are Rezeń's dogs and move between the church and the forest path.
- **Rezeń's calm** `(requires: Read)` — he is steadier after taking the body than he has been in days.

## Actions

### Keep vigil over the body
- **Requires:** Players chose to stay with the coffin overnight after the [postponed burial](funeral-mass.md#the-flood-postpones-burial).
- **Cost:** A night; no rest; exhaustion the next day
- **Outcome:** Rezeń comes for the body after midnight, stops when caught, explains himself, and leaves without the body.
- **Gives:** World State Change: [`rezen-fed-ciotka-to-well`](../clues/clues.md#rezen-fed-ciotka-to-well) does not happen; [`butcher-compelled-to-feed`](../clues/clues.md#butcher-compelled-to-feed)

### Follow the drag trail
- **Requires:** Found the empty coffin and the trail.
- **Cost:** 1 action
- **Outcome:** The trail reaches the well in [%OLD_VILLAGE%](../locations/old-village-ruins.md); a shawl or shoe is caught on the stone; Rezeń's tracks lead back to [his house](../locations/butchers-house.md).
- **Gives:** [`ciotka-body-taken`](../clues/clues.md#ciotka-body-taken)

### Confront Rezeń
- **Requires:** Caught him at the church, or tracked the body to him.
- **Cost:** 1 action
- **Outcome:** Rezeń does not deny taking the body. He says the flood left Janina unburied, the body was turning, and the well is where he put her.
- **Gives:** [`rezen-fed-ciotka-to-well`](../clues/clues.md#rezen-fed-ciotka-to-well); NPC State Change: village suspicion of Rezeń hardens if this becomes public; Ending Progress: Punishment / mob-justice ending against Rezeń advances

## Exits

- Follow the trail to [the well](../locations/the-well.md).
- Follow Rezeń's tracks to [Rezeń's house](../locations/butchers-house.md).
- If the village learns of the theft, continue toward [The Lynch](punishment-lynch.md).

## If Missed

- If players do not guard the body and do not find the trail before the village wakes, others discover the empty coffin.
- The village blames Rezeń.
- Janina remains in the well.
- If found later, her body is fresh among the older dead.
