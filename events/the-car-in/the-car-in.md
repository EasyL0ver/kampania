# The Car In

**Location:** [@name](../../locations/officers-car.md)
**Present:** [@name](../../characters/officer.md), [@name](../../characters/driver.md)
**Available:** Game start. Stays open for the whole ride, until the van reaches [@name](../../locations/new-village.md).

## Hook

A Milicja van winding down the mountain road through the rain.

## Setup

- Rain drums on the roof of a Milicja Nysa winding down a mountain road.
- [@name](../../characters/driver.md) drives in silence. [@name](../../characters/officer.md) sits beside him with a stack of folders on his knee.
- You volunteered to sit on a state committee as representatives of the public, independent observers in an important government matter. The letter said nothing more.
- Below, the road drops into a valley none of you has a name for.
- One folder on his knee carries a different stamp: AGH, Faculty of Geological Prospecting.
- [@name](../../characters/officer.md) turns in his seat. He chooses his words carefully, and he will talk if you ask.

## Opportunities

- *(noticed by: [Bureaucracy](../../cards/bureaucracy.md) OR [Empathy](../../cards/empathy.md))* — Under the courtesy, a threat: [@first-name](../../characters/officer.md) remembers who wrote what, and so does the state. Observers who see too much are not asked back; some are not let go. → Gives: [`officer-warning`](../../clues/clues.md#officer-warning) <!-- Prompted by: [government-committee](../../clues/clues.md#government-committee) -->

## Actions

### Ask what this is all about
- **Outcome:** The dam is nearly done; every other village in its way is emptied. Not [@name](../../locations/new-village.md): the engineers say it stays dry, [@title](../../characters/professor.md) [@surname](../../characters/professor.md) of AGH says it may drown. Warsaw wants it settled, quietly. "You observe."
- **Gives:** [`government-committee`](../../clues/clues.md#government-committee), [`solina-dam-construction-almost-finished`](../../clues/clues.md#solina-dam-construction-almost-finished), [`other-villages-ready-for-evacuation`](../../clues/clues.md#other-villages-ready-for-evacuation), [`the-flood-line-potentially-miscalculated`](../../clues/clues.md#the-flood-line-potentially-miscalculated), aware:characters/professor.md

### Ask where you are going
<!-- Prompted by: [government-committee](../../clues/clues.md#government-committee) -->
- **Outcome:** [@name](../../characters/officer.md) names where they are headed: [@name](../../locations/new-village.md), the resettled village that will sit on the shore of the new lake, and points out where the road drops toward it.
- **Gives:** aware:locations/new-village.md, [`new-village-will-be-next-to-solina-lake`](../../clues/clues.md#new-village-will-be-next-to-solina-lake)

### Ask about the AGH folder
<!-- Prompted by: [government-committee](../../clues/clues.md#government-committee) -->
- **Outcome:** [@name](../../characters/officer.md) hands it over without looking at it: a brief from [@name](../../characters/professor.md) for the committee, to be read on the way.
- **Gives:** [@name](../../items/professors-folder.md)

### Ask about the crate in the back
<!-- Prompted by: [loose-crate-in-back](../../clues/clues.md#loose-crate-in-back) -->
- **Outcome:** [@first-name](../../characters/officer.md) does not turn round: the survey instruments, issued to the committee. The geologist's level, the rod, the old report. "Try not to break it before you've used it."
- **Gives:** aware:items/geologists-kit.md

### Ask what the work is
<!-- Prompted by: [government-committee](../../clues/clues.md#government-committee) -->
- **Outcome:** Count the people, value what they own, watch the survey. The [@name](../../locations/pgr-farm.md)'s stock gets counted and moved out regardless. The villagers think they are safe: leave it. He opens your files: "Now, you."
- **Gives:** [`committee-runs-geographical-survey`](../../clues/clues.md#committee-runs-geographical-survey), [`committee-notes-property-for-damage`](../../clues/clues.md#committee-notes-property-for-damage), [`committee-fills-census`](../../clues/clues.md#committee-fills-census), [`committee-accounts-movable-state-property`](../../clues/clues.md#committee-accounts-movable-state-property), [`village-unaware-of-miscalculation`](../../clues/clues.md#village-unaware-of-miscalculation), aware:locations/pgr-farm.md, aware:events/the-car-in/the-draft.md

### Ask about the dead in the census
- **Requires:** [@name](../../items/census.md)
- **Outcome:** [@first-name](../../characters/officer.md) shrugs. "If I were you, I would stick to the villagers."
- **Gives:** [`officer-warning`](../../clues/clues.md#officer-warning)

## Exits

- [Ask what the work is](#ask-what-the-work-is) starts [@name](the-draft.md); the draft starts [@name](the-drive.md).
- The ride ends once every player's [Ride time](the-drive.md#ride-time) is 0: on to [@name](../arrival/arrival.md).
