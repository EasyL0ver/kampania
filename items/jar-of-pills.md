# Jar of Pills

**Type:** Item — evidence
**Source:** The kitchen table in [Ciotka Found Dead](../events/ciotka-found-dead.md)
**Carried:** Evidence.

## Description

A jar of pills on the table, cap off. Some are missing.

## Opportunities

- **The dose** `(requires: Medicine)` — A strong sedative. Enough of it can kill.
- **The label** `(requires: Bureaucracy)` — Strong medication like this comes only from an official pharmacy.

## Actions

### Read the bottle
- **Requires:** Holding the bottle; **Medicine** or **Bureaucracy**
- **Cost:** 1 action
- **Outcome:** The label names a sedative. Pills are missing. It points to an overdose, but cannot confirm it killed her or whether the dose was deliberate.
- **Gives:** [`ciotka-overdose`](../clues/clues.md#ciotka-overdose)
