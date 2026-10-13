# Wojewoda's Ask

**Location:** [@name](../locations/new-village/pgr-farm/pgr-office.md)
**Present:** [@name](../characters/wojewoda.md)

## Hook

[@name](../characters/wojewoda.md) closing the PGR office door to speak with the committee privately.

## Setup

- [@first-name](../characters/wojewoda.md) closes the office door.
- State compensation follows deeds and recorded ownership.
- PGR labourers live in PGR housing.
- Money for PGR housing goes to the state, not the people living there.
- [@first-name](../characters/wojewoda.md) asks the committee to record those houses as the villagers' own[](#wojewoda-seeks-villagers-interests-not-his-own).
- He does not name [@name](../characters/barbara.md)'s brick house.
- He does not name [@name](../characters/ciotka.md)'s cottage.
- The false record would defraud the state[](#request-is-paper-fraud-against-the-state) and pay villagers who are about to lose everything.

## Opportunities

### Wojewoda seeks villagers' interests, not his own
- **Noticed by:** [Empathy](../cards/empathy.md)
- **When:** setup:events/wojewodas-ask.md
- **Outcome:** [@first-name](../characters/wojewoda.md) is asking for the villagers, not for his own compensation.

### Request is paper fraud against the state
- **Noticed by:** [Bureaucracy](../cards/bureaucracy.md)
- **When:** setup:events/wojewodas-ask.md
- **Outcome:** The request is fraud on paper: deliberate false property recording against the state.

## Actions

### Ask about Barbara's house
- **When:** setup:events/wojewodas-ask.md
- **Cost:** 1 time
- **Outcome:** [@first-name](../characters/wojewoda.md) says the house was built with PGR brick and labour for a young mother with no support.
- **Gives:** [barbara-has-help](../clues/clues.md#barbara-has-help)

### Ask about Ciotka's house
- **When:** setup:events/wojewodas-ask.md
<!-- Prompted by: [ciotka-house-is-wojewodas](../clues/clues.md#ciotka-house-is-wojewodas) -->
- **Cost:** 1 time
- **Outcome:** [@first-name](../characters/wojewoda.md) says the house was abandoned, left to the state, administered by the PGR, and allocated to [@first-name](../characters/ciotka.md).
- **Gives:** [ciotka-house-is-pgrs](../clues/clues.md#ciotka-house-is-pgrs)

### Show the paperwork for Ciotka's house
- **When:** setup:events/wojewodas-ask.md
<!-- Prompted by: [ciotka-house-is-pgrs](../clues/clues.md#ciotka-house-is-pgrs) -->
- **Cost:** 1 time
- **Outcome:** [@first-name](../characters/wojewoda.md) shows the 1954 file with [@name](../items/barnas-departure-declaration.md), but does not hand it over.
- **Gives:** hook:items/barnas-departure-declaration.md
