# Operator Refuses Help

**Location:** [@name](../locations/wojewodas-house.md)
**Present:** [@name](../characters/jagna.md), [@name](../characters/wojewoda.md) (optional)
**Available:** Day 3 onward, during [@name](the-flood.md), when players call outside for rescue.

## Trigger

- The village is cut off by floodwater.
- The players use the phone in [@first-name](../characters/wojewoda.md)'s office.
- The players ask the exchange to connect them to outside help.
- The call routes through the same town exchange used by earlier long-distance calls.

## Hook

A clear voice answering from the telephone exchange while floodwater cuts the village off.

## Setup

- The operator answers clearly despite the storm.
- The line is working.
- The operator hears the players' request for rescue.
- The operator responds with procedure instead of help.
- The operator never says no.
- The operator never hangs up.
- The operator gives no name, no dispatch, no timeline, and no accountable official.
- The operator keeps the channel open and useless as long as the players keep talking.

## Opportunities

- `(noticed by: [Empathy](../cards/empathy.md))` — A person is on the line: the line is not failing; the operator is present, lucid, and choosing how much help to provide.
- `(noticed by: [Finesse](../cards/finesse.md))` — every answer records or routes the request without sending help.
- `(noticed by: [Finesse](../cards/finesse.md))` — the operator avoids a clear no because a clear refusal could be challenged.

## Actions

### Name her
- **When:** On the line with her
<!-- Prompted by: [operator-is-jagna](../clues/clues.md#operator-is-jagna) -->
- **Cost:** 1 time
- **Outcome:** The committee puts her name to the voice: [@first-name](../characters/jagna.md). If they are only guessing, saying her name, her father's, or the well buys one caught breath before she resumes procedure, deniable and not repeatable. Once they know the operator is [@name](../characters/jagna.md) and name her as such, she stops pretending: she does not deny it, does not hang up, and the flat clerk's indifference turns quiet, personal, and vengeful. The rescue does not change; every word after is between the committee and [@first-name](../characters/jagna.md).
- **Changes:** [Mechanics](#mechanics) — the operator drops the clerk and answers as [@first-name](../characters/jagna.md)

### Tell her Glupek, her brother, is alive and trapped
- **When:** [@name](../characters/glupek.md) has fled to the [@name](../locations/upa-bunker.md) after [@name](ciotka-found-dead/ciotka-found-dead.md)
<!-- Prompted by: [operator-is-jagna](../clues/clues.md#operator-is-jagna), [edeks-father-left](../clues/clues.md#edeks-father-left), [barnas-had-a-daughter-hania](../clues/clues.md#barnas-had-a-daughter-hania) -->
- **Cost:** 1 time
- **Outcome:** She buried the whole family in her mind in 1954, the baby included. Hearing, and believing, that her brother lived breaks the procedure for good. She stops withholding and relays the call without confirming her identity.
- **Changes:** [Mechanics](#mechanics) — real calls go through, but no rescue beats the flood

### Name her family's killers: Matrona, Wujas, Wojewoda and Butcher
<!-- Prompted by: [operator-is-jagna](../clues/clues.md#operator-is-jagna), [matrona-orchestrated-lynch](../clues/clues.md#matrona-orchestrated-lynch), [wujas-participated-in-lynch](../clues/clues.md#wujas-participated-in-lynch), [wojewoda-participated-in-lynch](../clues/clues.md#wojewoda-participated-in-lynch), [butcher-participated-in-lynch](../clues/clues.md#butcher-participated-in-lynch) -->
- **Cost:** 1 time
- **Outcome:** Given the full, correct roster of the 1954 lynch, she believes the committee knows what was done to her family. She turns the line into a weapon, relaying the calls that expose the village's crimes because they serve retribution, not rescue.
- **Changes:** [Mechanics](#mechanics) — the truth can leave the valley through The Report

## Mechanics

### Anonymity

- **Type:** enum (anonymous | known)
- **Per:** world
- **Start:** anonymous
- Anonymous until the committee knows the voice is [@name](../characters/jagna.md) (**Name her**), which turns her indifference vengeful.

### Willingness

- **Type:** enum (withholding | rescue | exposure)
- **Per:** world
- **Start:** withholding
- Opens only after she is known as [@first-name](../characters/jagna.md), then **Tell her [@first-name](../characters/glupek.md), her brother, is alive and trapped** opens rescue calls or **Name her family's killers** opens exposure calls ([@name](the-report.md)).

## Exits

- Return to [@name](the-flood.md) with the ordinary rescue route closed.
- Continue to [@name](the-report.md), if the players use the line to put the truth outside the valley.
- Follow the [@first-name](../characters/glupek.md) route toward the [@name](../locations/upa-bunker.md), if the call turns on his survival.

## If Missed

- If the players never call out, the operator never has to refuse them directly.
- If the players beg without reaching her through [@first-name](../characters/glupek.md) or retribution, the line remains formally open and practically useless.
- The flood eventually brings down a pole and ends the connection.
