# Arrival — On the Road

**Location:** [@name](../../locations/new-village/new-village.md)
**Present:** [@name](../../characters/officer.md), [@name](../../characters/driver.md), [@name](../../characters/wojewoda.md)

## Hook

The Milicja van stopping on the muddy road as [@name](../../characters/wojewoda.md) comes forward to meet the committee.

## Setup

- The van stops on the muddy road in [@name](../../locations/new-village/new-village.md). Morning, still raining.
- [@name](../../characters/wojewoda.md) waits at the roadside, cap in hand.
- [@name](../../characters/officer.md) gets out, shakes his hand, and presents the committee: "Observers, from the public. Look after them."
- [@name](../../characters/driver.md) drags the crate out of the back and sets it down in the mud.[](#pick-up-the-crate)[](#say-goodbye-to-the-driver)
- [@name](../../characters/officer.md) is not staying. He will be back in Lesko tonight.[](#ask-him-when-he-will-be-back)
- [@first-name](../../characters/wojewoda.md) opens an umbrella: "Come, my house is up the road. There's tea."[](#go-with-the-sołtys)

## Actions

### Ask him when he will be back
<!-- Prompted by: setup:events/arrival/arrival.md -->
- **Outcome:** "The morning of the fourth day. I'll take your report then. Anything before that goes through the sołtys's telephone."
- **Gives:** [`officer-returns-on-day-4`](../../clues/clues.md#officer-returns-on-day-4)

### Say goodbye to the driver
- **When:** [Standing](../../characters/driver.md#standing) is owes-you
<!-- Prompted by: setup:events/arrival/arrival.md -->
- **Outcome:** [@first-name](../../characters/driver.md) leans out of the window. "If you need a lift out, ring the post in Lesko. Ask for me."
- **Gives:** [`wrona-will-drive-you`](../../clues/clues.md#wrona-will-drive-you)

### Pick up the crate
<!-- Prompted by: setup:events/arrival/arrival.md -->
- **Outcome:** The survey instruments, in their straw, wet now on the outside. Yours to carry.
- **Gives:** [@name](../../items/geologists-kit.md), hook:items/geologists-kit.md

### Go with the sołtys
<!-- Prompted by: setup:events/arrival/arrival.md -->
- **Outcome:** You follow [@first-name](../../characters/wojewoda.md) up the road. Behind you the van turns in the mud and climbs away. By the time you look back, it is gone.
- **Gives:** hook:events/arrival/the-walk.md
- **Changes:** [@name](the-walk.md) — starts
