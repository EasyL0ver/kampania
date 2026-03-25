# Scenes — Meta Instructions

## What Is a Scene

A scene is a **playable moment** — a place, a situation, and a set of possible actions. It's the atomic unit of the scenario. Players spend their actions entering scenes and doing things within them.

A scene can be a location, an event, or both. Some scenes are places you walk into. Some scenes happen to you. Some are both — a place that transforms when something triggers within it.

## Scene File Structure

Every scene file follows this format:

```
# Scene Name

**Location:** Where this takes place
**Present:** NPCs who are here (and conditions for their presence)
**Available:** When this scene can be entered / triggered (prerequisites, time, game state)

## Setup

What the players see/hear/feel when they enter this scene. The GM reads or paraphrases this.

## Opportunities

Low-impact things players can pick up naturally during the scene — rapport built, impressions gained, seeds planted. These don't cost actions and don't change the graph. They're colour and context.

- **Opportunity name** — what happens, what the players get out of it

## Actions

What the players can do here that actually matters. Each action is an edge in the graph — it unlocks something, changes something, or leads somewhere.

### Action Name
- **Requires:** prerequisite (item, knowledge, ability, NPC state, or nothing)
- **Cost:** Free if it's just talking/observing. 1 action only if it takes significant time (an expedition, a thorough investigation, a phone call, physical work)
- **Outcome:** what happens — information gained, NPC state change, item obtained, new scene unlocked
- **Leads to:** which scene(s) this opens up

## Exits

Where players can go from here (other scenes reachable from this one).
```

## Scene Outcomes

Every action within a scene produces one or more of these outcome types:

| Outcome Type | Description | Example |
|-------------|-------------|---------|
| **Information** | Players learn a fact | "The well contains bodies" |
| **NPC State Change** | An NPC's attitude or willingness shifts | "Priest warms up" |
| **Item / Evidence** | Players obtain something tangible | "Flour tin of evidence from Wife" |
| **Scene Unlock** | A new scene becomes available | "Hag's Cabin is now accessible" |
| **Ability Check** | A specific player ability opens this option | "Faith ability required" |
| **World State Change** | The village itself changes | "Containment breaks" |
| **Ending Progress** | Advances one of the four ending chains | "Ritual: form obtained" |

## Naming Convention

Scene files are named: `XX-scene-name.md` where XX is a number for file sorting only. The number does NOT imply play order — scenes are accessed through the graph, not sequentially.

## Graph Connection

The scenario graph is built FROM the scenes. Each scene is a node. Each action's "Leads to" is an edge. The graph is the compiled output of all scene files.
