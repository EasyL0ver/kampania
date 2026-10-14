# Item Name

<!-- Optional header, right under the title: **Tags:** [@name](../tags/file.md), … (validate.py: tags-format) -->

## Hook

<!-- Knowing: what a player knows once they are aware of this item, without holding it:
     what it is, in a line. Spoiler-free; not where it is, not what it means. -->

- [What it is. e.g. "the key to Janina's attic", "a tin of cigarette butts from her door".]

## Setup

<!-- Encountering: what players see and feel when they hold it or come upon it. Keep it
     concrete: an item is a thing, not a story. -->

[What the object is, physically.]

## Content

<!-- Optional. Only for items that carry readable text — letters, documents,
     journals, notes, inscriptions. This is the actual in-world text players read,
     verbatim, as a handout. Omit the section entirely for objects with nothing
     to read (weapons, remains, keepsakes).
     Set the text off as a block quote or code block so the GM can read/hand it
     over directly. Note any parts gated behind a skill (e.g. Language for
     Ukrainian, Culture for ritual meaning) beneath the text. -->

## Mechanics

<!-- Optional. Only for items that carry state other entries change: a register that
     fills up, a device with charges, a record that can be falsified. Use H3
     sub-sections; Changes lines elsewhere link to them. Omit if not applicable. -->

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

## Opportunities

<!-- Optional. Free, no action cost. Skill-gated impressions, seeds, or atmosphere
     the item gives off when examined. An opportunity may point at a clue, but it
     does not have to — pure atmosphere with no clue is fine (unlike Actions).
     Format: actions-and-opportunities.md. Omit the section if the
     item offers nothing to notice beyond its Actions. -->

### [Short title: what is noticed]
- **Noticed by:** [Card](../cards/file.md)
- **When:** setup:<own file>
- **Outcome:** [What is observed; must stand on its own.]
- **Gives:** [clue-id](../clues/clues.md#clue-id)

## Actions

<!-- Item-bound actions: examine, present to an NPC, use, destroy.
     An item can hold actions the same way locations and characters do.
     Actions that are really about an NPC's *reaction* belong in that character's
     file, gated on holding this item — cross-reference them here.
     Format: actions-and-opportunities.md -->

### [Action name]
- **Requires:** [Card](../cards/file.md)
- **When:** [world state]
<!-- Prompted by: [clue-id](../clues/clues.md#clue-id) -->
- **Cost:** 1 time
- **Outcome:** [One flat result.]
- **Gives:** [clue-id](../clues/clues.md#clue-id)

