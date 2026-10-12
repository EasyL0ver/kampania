# Arrival — On the Road

**Location:** [@name](../../locations/new-village.md)
**Present:** [@name](../../characters/officer.md), [@name](../../characters/driver.md), [@name](../../characters/wojewoda.md)
**Available:** After [@name](../the-car-in/the-drive.md).

## Hook

The Milicja van stopping on the muddy road as [@name](../../characters/wojewoda.md) comes forward to meet the committee.

## Setup

- The van stops on the muddy road in [@name](../../locations/new-village.md). Morning, still raining.
- [@name](../../characters/wojewoda.md) waits at the roadside, cap in hand.
- [@name](../../characters/officer.md) gets out, shakes his hand, and presents the committee: "Observers, from the public. Look after them."
- [@name](../../characters/driver.md) drags the crate out of the back and sets it down in the mud.
- [@name](../../characters/officer.md) is not staying. He will be back in Lesko tonight.
- [@first-name](../../characters/wojewoda.md) opens an umbrella: "Come, my house is up the road. There's tea."

## Actions

### Ask him when he will be back
- **When:** [@name](../../characters/officer.md) has not yet left
- **Outcome:** "The morning of the fourth day. I'll take your report then. Anything before that goes through the sołtys's telephone."
- **Gives:** [`officer-returns-on-day-4`](../../clues/clues.md#officer-returns-on-day-4)

### Say goodbye to the driver
- **When:** [@name](../../characters/officer.md) has not yet left, and [Standing](../../characters/driver.md#standing) is owes-you for this player
- **Outcome:** [@first-name](../../characters/driver.md) leans out of the window. "If you need a lift out, ring the post in Lesko. Ask for me."
- **Gives:** [`wrona-will-drive-you`](../../clues/clues.md#wrona-will-drive-you)

### Pick up the crate
- **Outcome:** The survey instruments, in their straw, wet now on the outside. Yours to carry.
- **Gives:** [@name](../../items/geologists-kit.md)

### Go with the sołtys
- **Outcome:** You follow [@first-name](../../characters/wojewoda.md) up the road. Behind you the van turns in the mud and climbs away. By the time you look back, it is gone.
- **Gives:** aware:events/arrival/the-walk.md

## Exits

- [Go with the sołtys](#go-with-the-sołtys) ends the handover: [@name](the-walk.md), then [@name](in-the-office.md).
