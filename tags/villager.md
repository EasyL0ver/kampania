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

## Actions

### Restrain them with rope
- **Requires:** [Violence](../cards/violence.md) AND [@name](../items/rope.md)
- **When:** [Restrained](#restrained) is false
- **Cost:** 1 composure + [@name](../items/rope.md)
- **Outcome:** You get them down and tie their hands and feet with the rope.
- **Changes:** [Restrained](#restrained) — true
