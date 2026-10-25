# Villager

**Applies to:** characters

## Description

The people who live in the valley.

## Mechanics

### Alive

- **Type:** bool
- **Per:** world
- **Start:** true

### Armed

- **Type:** bool
- **Per:** world
- **Start:** false

### Restrained

- **Type:** bool
- **Per:** world
- **Start:** false

### Drunk points

- **Type:** int
- **Per:** npc
- **Start:** 0
- The [Drunk](../cards/drunk.md) cards this villager has taken from the bottles they drank.

### Tolerance

- **Type:** int
- **Per:** npc
- **Start:** 1
- How many drunk points this villager can hold; one more and they pass out ([Sharing a bottle](alcohol.md#sharing-a-bottle)).

## Actions

### Restrain them with rope
- **Requires:** [Violence](../cards/violence.md) AND [@name](../items/rope.md)
- **When:** [Restrained](#restrained) is false
- **Cost:** 1 composure + [@name](../items/rope.md)
- **Outcome:** You get them down and tie their hands and feet with the rope.
- **Changes:** [Restrained](#restrained) — true
