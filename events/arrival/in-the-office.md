# Arrival — In the Office

**Part of:** [@name](arrival.md)
**Location:** [@name](../../locations/new-village/wojewodas-house.md)
**Present:** [@name](../../characters/wojewoda.md), [@name](../../characters/wife.md) (if [Listener](#listener) is joined)
**Available:** After [Go inside](the-walk.md#go-inside).

## Hook

- [@name](../../characters/wojewoda.md) holding open the door of his office for the committee.

## Setup

- [@name](../../characters/wojewoda.md)'s office is clean and organised.
- A heavy bakelite phone sits on the office desk.
- Ledgers and maps are visible in the office.
- Tea is on the table.
- [@name](../../characters/wojewoda.md) presents himself as cooperative and helpful.
- The door to the rest of the house stands ajar; a floorboard creaks behind it.

## Opportunities

- *(noticed by: [Finesse](../../cards/finesse.md))* — A shadow and a floorboard creak show someone is listening during the conversation with [@name](../../characters/wojewoda.md). → Gives: [`irena-is-watchful`](../../clues/clues.md#irena-is-watchful)

## Actions

### Listen to Wojewoda's welcome
<!-- Prompted by: aware:locations/new-village/new-village.md -->
- **Outcome:** He plays the gracious host: he is the committee's point of contact, and the heavy phone on his desk is the only line for miles, so anything the village or the committee needs runs through him.
- **Gives:** [`wojewoda-has-only-phone`](../../clues/clues.md#wojewoda-has-only-phone)

### Call the listener in
<!-- Prompted by: [irena-is-watchful](../../clues/clues.md#irena-is-watchful) -->
- **Outcome:** [@first-name](../../characters/wojewoda.md) calls toward the door, and a woman steps into the office: [@setup](../../characters/wife.md) He introduces her as [@name](../../characters/wife.md). She pours the tea and stays.
- **Gives:** aware:characters/wife.md
- **Changes:** [Listener](#listener) — joined

### Get to work
- **Outcome:** [@first-name](../../characters/wojewoda.md) sees you out. "The telephone is here when you need it. You'll bunk in the farm barracks; [@first-name](../../characters/zofia.md) at the canteen has your beds." Half-believing the flood line: "Now get to work. Bring me proof." Otherwise: "Dinner is at seven."
- **Gives:** *(to: every player)* [Lodging at the PGR Quarters](../../cards/lodging-at-pgr-quarters.md), aware:locations/new-village/pgr-farm/pgr-quarters.md, aware:events/dinner.md

## Mechanics

### Listener

- **Type:** enum (listening | joined)
- **Per:** world
- **Start:** listening
- While listening, [@name](../../characters/wife.md) is behind the door, out of view: she is not present.
- [Call the listener in](#call-the-listener-in) sets it to joined.

### Dinner invitation

- **Type:** enum (extended | withdrawn)
- **Per:** world
- **Start:** extended
- Withdrawn while [Flood Awareness](../../characters/wojewoda.md#flood-awareness) is needProof or higher: instead of dinner, he sends the committee straight to work.
