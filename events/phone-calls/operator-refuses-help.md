# Operator Refuses Help

**Part of:** [@name](phone-calls.md)
**Location:** [@name](../../locations/new-village/pgr-farm/pgr-office.md)
**Present:** [@name](../../characters/jagna.md), [@name](../../characters/wojewoda.md)
**Tags:** [@name](../../tags/phone-call.md)

## Hook

A clear voice answering from the telephone exchange while floodwater cuts the village off.

## Setup

- The operator answers clearly despite the storm.[](#operator-is-present-and-lucid)
- The line is working.
- The operator hears the players' request for rescue.
- The operator responds with procedure instead of help.[](#answers-route-without-sending-help)
- The operator never says no.[](#operator-avoids-a-clear-refusal)
- The operator never hangs up.
- The operator gives no name, no dispatch, no timeline, and no accountable official.
- The operator keeps the channel open and useless as long as the players keep talking.

## Opportunities

### Operator is present and lucid
- **Noticed by:** [Empathy](../../cards/empathy.md)
- **When:** setup:events/phone-calls/operator-refuses-help.md
- **Outcome:** A person is on the line: the line is not failing; the operator is present, lucid, and choosing how much help to provide.

### Answers route without sending help
- **Noticed by:** [Finesse](../../cards/finesse.md)
- **When:** setup:events/phone-calls/operator-refuses-help.md
- **Outcome:** every answer records or routes the request without sending help.

### Operator avoids a clear refusal
- **Noticed by:** [Finesse](../../cards/finesse.md)
- **When:** setup:events/phone-calls/operator-refuses-help.md
- **Outcome:** the operator avoids a clear no because a clear refusal could be challenged.

## Actions

### Name her
<!-- Prompted by: [operator-is-jagna](../../clues/clues.md#operator-is-jagna) -->
- **Cost:** 1 time
- **Outcome:** The committee puts her name to the voice: [@first-name](../../characters/jagna.md). If they are only guessing, saying her name, her father's, or the well buys one caught breath before she resumes procedure, deniable and not repeatable. Once they know the operator is [@name](../../characters/jagna.md) and name her as such, she stops pretending: she does not deny it, does not hang up, and the flat clerk's indifference turns quiet, personal, and vengeful. The rescue does not change; every word after is between the committee and [@first-name](../../characters/jagna.md).
- **Changes:** [Anonymity](../../characters/jagna.md#anonymity) — known

### Tell her Glupek, her brother, is alive and trapped
- **When:** [Alive](../../characters/ciotka.md#alive) is false
<!-- Prompted by: [glupek-fled-into-forest](../../clues/clues.md#glupek-fled-into-forest), [operator-is-jagna](../../clues/clues.md#operator-is-jagna), [edeks-father-left](../../clues/clues.md#edeks-father-left), [barnas-had-a-daughter-hania](../../clues/clues.md#barnas-had-a-daughter-hania) -->
- **Cost:** 1 time
- **Outcome:** She buried the whole family in her mind in 1954, the baby included. Hearing, and believing, that her brother lived breaks the procedure for good. She stops withholding and relays the call without confirming her identity.
- **Changes:** [Willingness](../../characters/jagna.md#willingness) — rescue

### Name her family's killers: Matrona, Wujas, Wojewoda and Butcher
<!-- Prompted by: [operator-is-jagna](../../clues/clues.md#operator-is-jagna), [matrona-orchestrated-lynch](../../clues/clues.md#matrona-orchestrated-lynch), [wujas-participated-in-lynch](../../clues/clues.md#wujas-participated-in-lynch), [wojewoda-participated-in-lynch](../../clues/clues.md#wojewoda-participated-in-lynch), [butcher-participated-in-lynch](../../clues/clues.md#butcher-participated-in-lynch) -->
- **Cost:** 1 time
- **Outcome:** Given the full, correct roster of the 1954 lynch, she believes the committee knows what was done to her family. She turns the line into a weapon, relaying the calls that expose the village's crimes because they serve retribution, not rescue.
- **Changes:** [Willingness](../../characters/jagna.md#willingness) — exposure
