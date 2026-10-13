# Location Name

<!-- ZERO PROSE. Pure facts. This is a technical document, not a story.
     Every line is a fact, not atmosphere. Bullets, not paragraphs.
     Dialogue only when the exact words ARE the mechanical content.
     Full rules: actions-and-opportunities.md → "Writing Discipline". -->

<!-- No header. Who is here comes from the characters' schedules (Morning / Afternoon /
     Evening / Night in their Vital Statistics); a place inside another place lives in its
     folder (locations/new-village/the-store.md is in Testowo). Travel costs 1 time. -->

## Hook

<!-- Spoiler-free. One line: what a player knows from having this place pinned on
     their map: where it sits and how to reach it. The entity as a clue (knowing
     this place exists). No secrets. -->

- [Position handle. e.g. "a dry streambed on the far ridge across the valley".]

## Setup

<!-- Prose, no bullets (validate.py warns, rule setup-no-bullets). What is true here —
     exterior, interior, what's present, what's off. Facts, not mood-writing; the GM
     performs the tone.
     Rule: if an Opportunity lets players notice something, the Setup must state it.
     Players can't notice what the file never recorded. -->

[Facts about the place, as a short paragraph.]

## Opportunities

<!-- Format: actions-and-opportunities.md -->

- *(when: [world state])* *(noticed by: [Card](../cards/file.md))* — [What is observed; must stand on its own, no title]. → Gives: [clue-id](../clues/clues.md#clue-id) <!-- Prompted by: [clue-id](../clues/clues.md#clue-id) -->

## Actions

<!-- Location-bound actions: search the room, dig in the yard, watch from cover.
     Character-bound actions (interview, leverage) belong in the character file.
     Format: actions-and-opportunities.md -->

### [Action name]
- **Requires:** [Card](../cards/file.md)
- **When:** [world state]
<!-- Prompted by: [clue-id](../clues/clues.md#clue-id) -->
- **Cost:** 1 time
- **Outcome:** [One flat result.]
- **Gives:** [clue-id](../clues/clues.md#clue-id)

## Mechanics

<!-- Optional. Only for state the place carries that actions change: a door that
     can be forced, a room that stays open once opened. Use H3 sub-sections;
     Changes lines elsewhere link to them. Omit if not applicable. -->

### [Mechanic name]
<!-- Every ### opens with a Type line (checked by validate.py, rule mechanic-type):
       bool | int | enum (a | b | c) — state; follow with
         - **Per:** world | player | npc  (one value for the game / one per player / one per NPC)
         - **Start:** <legal value>
       rule — how something resolves, no stored state
       list — a growing set of records (e.g. census entries)
     Then free bullets: what sets or moves it. Nothing may sit directly under ## Mechanics. -->
- **Type:** bool
- **Per:** world
- **Start:** false
- [What sets it.]

