# Scenes — Meta Instructions

## Scene Types

Scenes are split into two folders:

### `events/` — One-shot moments
Things that happen once. Triggered by game state, time, or player action. They play out and are done.

Events happen **at** a location. During an event, all of the location's persistent actions and opportunities are implicitly available — don't repeat them in the event file. The event file only contains what's unique to that moment.

Examples: the car ride in, arrival at the village, dinner at Wojewoda's.

Event files are numbered (`01-`, `02-`, `03-`) for play sequence. The number reflects when the event can trigger, not a forced order.

### `locations/` — Revisitable places
Places the players can return to. Persistent actions and NPCs. The location exists for the whole game — what changes is the game state and NPC attitudes.

Examples: Wojewoda's office, the store, the village outskirts.

Location files are named descriptively (no numbers) — they don't have a play order.

## Scene File Structure

Every scene file (event or location) follows this format:

```
# Scene Name

**Type:** Event (one-shot) | Location (revisitable)
**Location:** Where this takes place
**Present:** NPCs who are here (and conditions for their presence)
**Available:** When this scene can be entered / triggered
**Cost:** Action cost (if any)

## Setup

What the players see/hear/feel when they enter this scene.

**Rule: If an opportunity lets players notice something, the Setup must mention or hint at it.** The GM reads the Setup aloud — if the icon is on the shelf, the shelf needs to be in the description. Players can't notice what the GM never described.

## Opportunities

Low-impact things players can pick up naturally — rapport, impressions, seeds. Free, no action cost.

- **Opportunity name** — what happens, what the players get out of it

## Actions

What the players can do that actually matters.

### Action Name
- **Requires:** prerequisite
- **Cost:** Free or 1 action
- **Outcome:** what happens
- **Leads to:** what this opens up

## Exits (events only)

Where players go after this event concludes. **Locations don't have exits — players move freely between locations.**
```

## Scene Outcomes

| Outcome Type | Description | Example |
|-------------|-------------|---------|
| **Information** | Players learn a fact | "The well contains bodies" |
| **NPC State Change** | An NPC's attitude shifts | "Priest warms up" |
| **Item / Evidence** | Players obtain something tangible | "Flour tin of evidence" |
| **Scene Unlock** | A new scene becomes available | "Hag's Cabin accessible" |
| **Ability Check** | A specific player ability opens this option | "Faith ability required" |
| **World State Change** | The village itself changes | "Containment breaks" |
| **Ending Progress** | Advances an ending chain | "Ritual: form obtained" |

## Graph Connection

The scenario graph is built FROM the scene files. Each scene is a node. Each "Leads to" / "Exits" is an edge. Only scene files that exist appear in the graph.
