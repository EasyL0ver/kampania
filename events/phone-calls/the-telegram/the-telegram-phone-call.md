# The Telegram — Phone Call

**Part of:** [@name](the-telegram.md)
**Location:** [@name](../../../locations/new-village/pgr-farm/pgr-office.md)
**Present:** [@name](../../../characters/jagna.md), [@name](../../../characters/wojewoda.md), [@name](../../../characters/secondary/clerk.md)
**Tags:** [@name](../../../tags/phone-call.md)

## Hook

- There is a telegram for the committee.

## Setup

The operator has a wire waiting for this number and reads it out flat, word by word, like any telegram: "TO THE COMMITTEE STOP SERVICE PAPERS AND UNIFORM BURIED UNDER THE OLD GARDEN BED BEHIND MY HOUSE STOP TAKE THEM STOP BARNAŚ"[](#telegram-points-to-the-barnaś-yard). [@first-name](../../../characters/wojewoda.md) and [@first-name](../../../characters/secondary/clerk.md) are in the room and hear the name read aloud.[](#wojewoda-disturbed-by-the-telegram) She names no sending office and does not read it twice.

## Opportunities

### Wojewoda disturbed by the telegram
- **Noticed by:** [Empathy](../../../cards/empathy.md)
- **When:** setup:events/phone-calls/the-telegram/the-telegram-phone-call.md
- **Outcome:** At the name Barnaś, [@first-name](../../../characters/wojewoda.md) goes still and pale, and does not take his eyes off the receiver until the wire is read out.
- **Gives:** [`wojewoda-disturbed-by-telegram`](../../../clues/clues.md#wojewoda-disturbed-by-telegram)
- **Changes:** [Aware of cache](../../../characters/wojewoda.md#aware-of-cache) — true

### Telegram points to the Barnaś yard
- **When:** setup:events/phone-calls/the-telegram/the-telegram-phone-call.md
- **Outcome:** Under the old garden bed behind the Barnaś house, now [@name](../../../characters/ciotka.md)'s, something is buried.
- **Gives:** [`telegram-points-to-barnas-yard`](../../../clues/clues.md#telegram-points-to-barnas-yard)
