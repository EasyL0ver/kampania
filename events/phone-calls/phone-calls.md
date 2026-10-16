# The Office Phone

**Location:** [@name](../../locations/new-village/pgr-farm/pgr-office.md)
**Present:** [@name](../../characters/jagna.md)
**Tags:** [@name](../../tags/phone-call.md)

## Hook

- The heavy bakelite phone on the office desk, the only line out of the village.

## Setup

Lifting the receiver gets the exchange in town. A woman's voice, clear and unhurried, asks for the number and puts the call through. Every call out of the valley goes through her switchboard.

## Actions

### Call dr Sawicki
<!-- Prompted by: hook:characters/sawicki.md -->
- **Outcome:** The operator puts the call through: [@hook](call-sawicki.md)
- **Changes:** [@name](call-sawicki.md) — starts

### Call the Professor
<!-- Prompted by: hook:characters/professor.md -->
- **Outcome:** The operator puts the call through: [@hook](call-professor.md)
- **Changes:** [@name](call-professor.md) — starts

### Ask about the telegram
<!-- Prompted by: hook:events/phone-calls/the-telegram/the-telegram-phone-call.md -->
- **Outcome:** The operator has a wire waiting for this number, and reads it out.
- **Changes:** [@name](the-telegram/the-telegram-phone-call.md) — starts

### Call the survey archive
<!-- Prompted by: [the-flood-line-potentially-miscalculated](../../clues/clues.md#the-flood-line-potentially-miscalculated) -->
- **Cost:** 1 time
- **Outcome:** The district survey archive confirms the previous crew filed a thin report, drove only a handful of stakes, and closed the job early. On the record it reads as thin work, well short of a proper survey.
- **Gives:** [original-report-is-thin](../../clues/clues.md#original-report-is-thin)
