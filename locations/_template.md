# Location Name

<!-- ZERO PROSE. Pure facts. This is a technical document, not a story.
     Every line is a fact, not atmosphere. Bullets, not paragraphs.
     Dialogue only when the exact words ARE the mechanical content.
     Full rules: actions-and-opportunities.md → "Writing Discipline". -->

<!-- Header lines are strict: technical only. No prose, no exposition, no flavor.
     Type: Location + tag(s).
     Location: terse position — "village edge", "deep forest", "between X and Y".
     Present: comma-separated [Name](../characters/file.md) links (+ non-named
              occupants like "3 dogs"). A terse technical condition in parentheses
              is allowed — "(usually gone)", "(daylight only)". NOT allowed:
              emotional states or narration. Behavior belongs in Setup.
     Available: shortest technical access rule — "Any time", "Daylight only",
                "Requires guidance".
     Cost: terse — "1 action per visit", "Free", "1 to find, 1 to interact". -->

**Type:** Location ([revisitable / hidden / discoverable])
**Location:** [Position — village edge, deep forest, between X and Y]
**Present:** [Name](../characters/file.md) (if condition), [non-named occupants]
**Available:** [Any time / Daylight only / Requires guidance]
**Cost:** [1 action per visit / Free / 1 to find, 1 to interact]

## Hook

<!-- Spoiler-free. One line: what a player knows from having this place pinned on
     their map: where it sits and how to reach it. The entity as a clue (knowing
     this place exists). No secrets. -->

- [Position handle. e.g. "a dry streambed on the far ridge across the valley".]

## Setup

<!-- Bullet facts only. What is true here — exterior, interior, what's present,
     what's off. No mood-writing; the GM performs the tone.
     Rule: if an Opportunity lets players notice something, a Setup fact must
     state it. Players can't notice what the file never recorded. -->

- [Fact.]
- [Fact.]

## Opportunities

<!-- Format: actions-and-opportunities.md -->

- `(when: [world state])` `(noticed by: [Card](../cards/file.md))` — [What is observed; must stand on its own, no title]. → Gives: [clue-id](../clues/clues.md#clue-id) <!-- Prompted by: [clue-id](../clues/clues.md#clue-id) -->

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

