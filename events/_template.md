# Event Title

<!-- ZERO PROSE. Pure facts. This is a technical document, not a story.
     Every line is a fact, not atmosphere. Bullets, not paragraphs.
     Dialogue only when the exact words ARE the mechanical content.
     Full rules: actions-and-opportunities.md → "Writing Discipline". -->

<!-- Header lines are strict: technical only. No prose, no exposition, no flavor.
     Location: one [Place](../locations/file.md) link. Nothing else.
     Present: optional (omit when no NPC is involved). Comma-separated [Name](../characters/file.md) links: who is in view, their
              moves open. Each may carry ONE condition on a mechanic, nothing else:
              (if [Mechanic](#mechanic) is value). While it fails they are not present.
              NOT allowed (validate.py errors): free-text conditions "(if survived
              Day 6)", states "(panicking)", narration, crowds, absent people.
              NPC state, arrivals, and who is missing belong in Setup.
     How players SEE someone is their [@setup](../characters/file.md) ref, in Setup (on
     arrival) or in an Outcome (coming into view later). -->

**Location:** [Place](../locations/file.md)
**Present:** [Name](../characters/file.md), [Other](../characters/file.md) (if [Mechanic](#mechanic) is value)
<!-- No Available, no Trigger: an event begins because an action's Changes starts it,
     `[Event](file.md) — starts`, and stops when one ends it, `[Event](file.md) — ends`
     (validate.py: event-started). Time works the same way: each day phase
     (events/day-N/day-N-<phase>.md) has a "Begin …" action, and an event tied to a time is
     started from that action's Changes.
     Actions that belong to a person or a place live in their file, and are open in every
     event at that place or with that person. -->

## Hook

<!-- Spoiler-free. How players become aware this moment is happening: the outward
     signal that reaches them (a bell, shouting, smoke, someone stopping them in
     the road) and where it is perceivable from. No meaning attached. Required. -->

- [What reaches players. e.g. a bell, shouting, smoke, someone stopping them, and where it is perceivable from.]

## Setup

<!-- Prose, no bullets (validate.py warns, rule setup-no-bullets). What is true when
     the event begins — who is where, what is happening, what has changed. Facts, not
     mood-writing; the GM performs the tone.
     People in view are shown by their own Setup, [@setup](../characters/file.md),
     never by name until they are introduced.
     Rule: if an Opportunity lets players notice something, a Setup fact must
     state it. Players can't notice what the file never recorded. -->

[What is happening, as a short paragraph.]

## Opportunities

<!-- Format: actions-and-opportunities.md -->

### [Short title: what is noticed]
- **Noticed by:** [Card](../cards/file.md)
- **When:** setup:<own file>
- **Outcome:** [What is observed; must stand on its own.]
- **Gives:** [clue-id](../clues/clues.md#clue-id)

## Actions

<!-- Format: actions-and-opportunities.md -->

### [Action name]
- **Requires:** [Card](../cards/file.md)
- **When:** [world state]
<!-- Prompted by: [clue-id](../clues/clues.md#clue-id) -->
- **Cost:** 1 time
- **Outcome:** [One flat result.]
- **Gives:** [clue-id](../clues/clues.md#clue-id)

## Mechanics

<!-- Optional. Only include if the event has a self-contained rule that governs
     how its actions resolve — a fight resolved by counting fighters, a timed
     escape, a vote. Keep it to the rule itself; the actions above reference it.
     Omit the section entirely if the event has no special resolution rule. -->

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

## Resolve

<!-- Optional. Runs when the event ends (the next event starts), whether the players
     stayed, walked out, or never came. It never asks who was there: player actions
     moved the mechanics during the event, Resolve only reads them. Start values are
     the "nobody intervened" outcome.
     Pure state, NOTHING ELSE: no description, no Gives, no comment. One line each:
       - [conditions] → [Mechanic](file.md#anchor) = value
     conditions: zero or more `[Mechanic](file.md#anchor) is value`, joined by " and ";
       none means the line always applies.
     Only bool / int / enum mechanics (never rule or list); values legal for the type;
       an int may be set to N, +N or -N.
     Checked by validate.py (rule resolve-format). -->

- [Mechanic](#mechanic) is value → [Other](../characters/file.md#other) = value
- → [Mechanic](#mechanic) = value
