# The Car In — The Drive

**Part of:** [@name](the-car-in.md)
**Location:** [@name](../../locations/officers-car.md)
**Present:** [@name](../../characters/officer.md), [@name](../../characters/driver.md)

## Hook

- The Milicja van dropping off the pass into the valley, wipers working against the rain.

## Setup

- The ride is long: rain, switchbacks, silence. [@name](../../characters/driver.md) says it will take a while yet.
- A bundle of forms lies on the bench beside you. [@name](../../characters/officer.md) tells you to get familiar with them before you arrive.
- [@name](../../characters/driver.md) keeps patting his coat and glancing at[](#driver-searching-while-concealing-it) [@name](../../characters/officer.md), as if he has lost something he should not have.
- Every few bends, glass clinks somewhere in the back.[](#clinking-sound-is-a-bottle)
- [@name](../../characters/driver.md) smokes one cigarette off the last[](#driver-smokes-cheap-sport-cigarettes); a crumpled packet sits on the dashboard.
- Behind the last bench, something heavy slides and bangs against the rear doors on every bend.
- A folded road map lies on the dashboard in front of [@name](../../characters/officer.md).
- Ahead, the road forks; the signpost lies face down in the ditch. [@name](../../characters/driver.md) swings left without slowing.

## Opportunities

### Driver searching while concealing it
- **Noticed by:** [Empathy](../../cards/empathy.md)
- **When:** setup:events/the-car-in/the-drive.md
- **Outcome:** [@first-name](../../characters/driver.md) is hunting for something and hiding the search from [@first-name](../../characters/officer.md).
- **Gives:** [`wrona-hides-search-from-skowron`](../../clues/clues.md#wrona-hides-search-from-skowron)

### Clinking sound is a bottle
- **Noticed by:** [Alcoholic](../../cards/alcoholic.md)
- **When:** setup:events/the-car-in/the-drive.md
- **Outcome:** The clink in the back is a full bottle.
- **Gives:** [`full-bottle-clinking-in-back`](../../clues/clues.md#full-bottle-clinking-in-back)

### Driver smokes cheap Sport cigarettes
- **Noticed by:** [Chainsmoker](../../cards/chainsmoker.md)
- **When:** setup:events/the-car-in/the-drive.md
- **Outcome:** [@first-name](../../characters/driver.md) smokes Sport, the cheapest there is. The smoke sets your own hands itching, and your pockets are empty: without a cigarette, the shakes are coming.
- **Gives:** [`wrona-smokes-sport`](../../clues/clues.md#wrona-smokes-sport)

## Actions

### Look through the forms
- **Outcome:** Two of them matter: the census register, ruled for households and their dead, and the farm's stock-take form, the farm's own figures on one side and a blank column for yours.
- **Gives:** [@name](../../items/census.md), [@name](../../items/pgr-inventory.md)

### Ask him for a cigarette
- **When:** NOT [Standing](../../characters/driver.md#standing) is grudge
<!-- Prompted by: [wrona-smokes-sport](../../clues/clues.md#wrona-smokes-sport) -->
- **Outcome:** [@first-name](../../characters/driver.md) tosses the packet over his shoulder without looking. "Keep it. I've got more."
- **Gives:** [@name](../../items/pack-of-cigarettes.md)

### Ask to look in the back
- **Requires:** [Speech](../../cards/speech.md)
- **Outcome:** You give [@first-name](../../characters/officer.md) a reason good enough that he waves a hand without turning round.
- **Changes:** [Permission](#permission) — permission

### Tell him something is loose in the back
- **Outcome:** [@first-name](../../characters/officer.md) listens to the next bang against the doors. "Then see to it."
- **Changes:** [Permission](#permission) — permission

### Keep him talking
- **Cost:** 1 time
- **Outcome:** You lean forward and draw [@first-name](../../characters/officer.md) into something he likes to talk about. For a while he does not look back.
- **Changes:** [Permission](#permission) — distracted

### Fish around in the back
- **When:** [Permission](#permission) is distracted OR [Permission](#permission) is permission
<!-- Prompted by: [wrona-hides-search-from-skowron](../../clues/clues.md#wrona-hides-search-from-skowron), [full-bottle-clinking-in-back](../../clues/clues.md#full-bottle-clinking-in-back) -->
- **Cost:** 1 time
- **Outcome:** Wedged behind the spare tyre: half a litre of Wyborowa, unopened. Beside it, a heavy wooden crate slides on every bend: its strap has snapped.
- **Gives:** [@name](../../items/vodka.md), [`loose-crate-in-back`](../../clues/clues.md#loose-crate-in-back)

### Slip it back to him
- **Requires:** [Finesse](../../cards/finesse.md)
- **Cost:** [@name](../../items/vodka.md)
- **Outcome:** The bottle goes into [@first-name](../../characters/driver.md)'s coat without [@first-name](../../characters/officer.md) seeing. [@first-name](../../characters/driver.md) says nothing, but he catches your eye in the mirror.
- **Changes:** [Standing](../../characters/driver.md#standing) — owes-you, for this player

### Hand it to the officer
- **Cost:** [@name](../../items/vodka.md)
- **Outcome:** [@first-name](../../characters/officer.md) takes the bottle, looks at it, and puts it in his briefcase without a word. The back of [@first-name](../../characters/driver.md)'s neck goes red.
- **Changes:** [Standing](../../characters/driver.md#standing) — grudge, for this player

### Lash down the cargo
- **Requires:** [Physique](../../cards/physique.md) OR [Handiwork](../../cards/handiwork.md)
- **When:** [Permission](#permission) is distracted OR [Permission](#permission) is permission
<!-- Prompted by: [loose-crate-in-back](../../clues/clues.md#loose-crate-in-back) -->
- **Cost:** 1 time
- **Outcome:** You climb over the seatback and lash the crate to the frame.
- **Changes:** [Cargo](#cargo) — secured

### Ask him for the map
- **Outcome:** [@first-name](../../characters/officer.md) passes it back over his shoulder.
- **Gives:** [@name](../../items/road-map.md)

### Check the road map
- **Requires:** [@name](../../items/road-map.md) AND ([Survival](../../cards/survival.md) OR [Geology](../../cards/geology.md))
- **Outcome:** Read against the ground, the left fork climbs away from the valley toward nothing. The right one followed the river down.
- **Gives:** [`wrona-took-wrong-turn`](../../clues/clues.md#wrona-took-wrong-turn)

### Argue for the right road
- **Requires:** [@name](../../items/road-map.md)
<!-- Prompted by: [wrona-took-wrong-turn](../../clues/clues.md#wrona-took-wrong-turn) -->
- **Cost:** 1 time
- **Outcome:** You lean into the cab with the map open and talk [@first-name](../../characters/driver.md) round. He grumbles, turns the van round and takes the right fork.
- **Changes:** [Turn](#turn) — right

### Ride on
- **Outcome:** You settle back and watch the rain for the rest of the ride.
- **Changes:** [Ride time](#ride-time) — 0 for this player

### Roll into the village
- **When:** [Ride time](#ride-time) is 0
- **Outcome:** The van rolls into [@name](../../locations/new-village/new-village.md).
- **Changes:** [@name](the-drive.md) — ends; [@name](../arrival/arrival.md) — starts

## Mechanics

### Permission

- **Type:** enum (vigilant | distracted | permission)
- **Per:** world
- **Start:** vigilant
- vigilant: nobody gets into the back. distracted or permission: the back is open for the rest of the drive.

### Cargo

- **Type:** enum (loose | secured)
- **Per:** world
- **Start:** loose

### Turn

- **Type:** enum (wrong | right)
- **Per:** world
- **Start:** wrong
- [@first-name](../../characters/driver.md) has taken the left fork, the long way.

### Ride time

- **Type:** int
- **Per:** player
- **Start:** 1
- Played with real cards: as the drive starts, the GM hands every player 1 time card for the ride.
- Costed actions on the drive are paid with that card. [Ride on](#ride-on) is a pass, for a player with nothing left to do: it discards their card. It never goes below 0.
- When every player is at 0, first the detour: if [Turn](#turn) is still wrong, every player spends 1 more time card on the long way round. It buys nothing; the van just wanders. Once.
- Then the ride ends: the van rolls into [@name](../../locations/new-village/new-village.md). If [Cargo](#cargo) is still loose, the crate has burst on the way and the kit is [Damaged](../../items/geologists-kit.md#damaged). Every player is now aware of [@name](../arrival/arrival.md).
