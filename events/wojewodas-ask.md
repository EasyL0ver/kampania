# Wojewoda's Ask

**Location:** [@name](../locations/pgr-office.md)
**Present:** [@name](../characters/wojewoda.md), players
**Available:** After [@name](../characters/wojewoda.md) knows the flood is possible and knows the committee is assessing property for compensation

## Trigger

- The players complete [Tell Wojewoda about the flood risk](../events/arrival/in-the-office.md#tell-wojewoda-about-the-flood-risk) or otherwise make [@first-name](../characters/wojewoda.md) believe the flood is possible.
- [@first-name](../characters/wojewoda.md) learns the committee is recording property values for compensation.
- He asks to speak with the players alone.

## Hook

[@name](../characters/wojewoda.md) closing the PGR office door to speak with the committee privately.

## Setup

- [@first-name](../characters/wojewoda.md) closes the office door.
- State compensation follows deeds and recorded ownership.
- PGR labourers live in PGR housing.
- Money for PGR housing goes to the state, not the people living there.
- [@first-name](../characters/wojewoda.md) asks the committee to record those houses as the villagers' own.
- He does not name [@name](../characters/barbara.md)'s brick house.
- He does not name [@name](../characters/ciotka.md)'s cottage.
- The false record would defraud the state and pay villagers who are about to lose everything.

## Opportunities

- *(noticed by: [Empathy](../cards/empathy.md))* — [@first-name](../characters/wojewoda.md) is asking for the villagers, not for his own compensation.
- *(noticed by: [Bureaucracy](../cards/bureaucracy.md))* — The request is fraud on paper: deliberate false property recording against the state.

## Actions

### Ask about Barbara's house
- **When:** [Wojewoda's Ask](../events/wojewodas-ask.md) is underway; see [Zbigniew Gajda](../characters/wojewoda.md#ask-about-barbaras-house)
- **Cost:** 1 time
- **Outcome:** [@first-name](../characters/wojewoda.md) says the house was built with PGR brick and labour for a young mother with no support.
- **Gives:** [barbara-has-help](../clues/clues.md#barbara-has-help)

### Ask about Ciotka's house
- **When:** [Wojewoda's Ask](../events/wojewodas-ask.md) is underway; see [Zbigniew Gajda](../characters/wojewoda.md#ask-about-ciotkas-house)
<!-- Prompted by: [ciotka-house-is-wojewodas](../clues/clues.md#ciotka-house-is-wojewodas) -->
- **Cost:** 1 time
- **Outcome:** [@first-name](../characters/wojewoda.md) says the house was abandoned, left to the state, administered by the PGR, and allocated to [@first-name](../characters/ciotka.md).
- **Gives:** [ciotka-house-is-pgrs](../clues/clues.md#ciotka-house-is-pgrs)

### Show the paperwork for Ciotka's house
- **When:** [Wojewoda's Ask](../events/wojewodas-ask.md) is underway; see [Zbigniew Gajda](../characters/wojewoda.md#show-the-paperwork-for-ciotkas-house)
<!-- Prompted by: [ciotka-house-is-pgrs](../clues/clues.md#ciotka-house-is-pgrs) -->
- **Cost:** 1 time
- **Outcome:** [@first-name](../characters/wojewoda.md) shows the 1954 file with [@name](../items/barnas-departure-declaration.md), but does not hand it over.
- **Gives:** aware:items/barnas-departure-declaration.md

## Exits

- Back to the [@name](../locations/pgr-office.md) and the committee's ongoing work.
- To [@name](the-report.md) if the players record or refuse the false property ask.
