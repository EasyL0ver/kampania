# Tag Name

**Applies to:** [characters, events, locations, items and/or cards, comma-separated]

<!-- A tag groups entities that share something (a theme, a substance, a thread), so they can be
     found together. It is not an in-world thing: no Hook, no Setup.
     Its Mechanics, Opportunities and Actions are ADDED to every entity it tags, as if written in
     that entity's file (for an item: open while it is held).
     A move in the entity's own file with the same heading OVERRIDES the tag's: it replaces it for
     that entity (a mechanic likewise). An override may drop the effect: an Outcome with no Gives or
     Changes is how a person stays tight-lipped about what the tag would have them tell. Sections in this order:
     Description, Mechanics, Opportunities, Actions. Same move format as everywhere else.
     Any character, event, location, item or card can carry it in an optional header line, last
     among its header fields:
       **Tags:** [@name](../tags/alcohol.md), [@name](../tags/other.md)
     Applies to is required: what kind of entity may carry the tag (validate.py: tag-type,
     tags-format). A When can test a tag only if it applies to events: it then means a running
     event carries it. Inside the tag, the tag stands for whatever it is added to: setup:tags/x.md
     is the tagged entity's Setup, and `[@name](x.md) — ends` ends the tagged event. -->

## Description

[What the tag groups, in one or two sentences.]

## Mechanics

<!-- Optional. Added to every tagged entity. -->

## Opportunities

<!-- Optional. Added to every tagged entity. -->

## Actions

<!-- Optional. Added to every tagged entity. -->
