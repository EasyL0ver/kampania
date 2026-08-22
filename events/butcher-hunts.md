# Stanisław Rezeń Hunts

**Location:** [Village outskirts](../locations/village-outskirts.md)
**Present:** [Stanisław Rezeń](../characters/butcher.md)
**Available:** Day 3 onward, after players investigate too deeply.

## Trigger

- [Stanisław Rezeń](../characters/butcher.md) believes the players know too much.
- Trigger examples include direct questions about [Edward Barnaś](../characters/soldier.md)'s family.
- Trigger examples include player interest in [%OLD_VILLAGE%](../locations/old-village-ruins.md) or the well.
- Trigger examples include players talking to [Tadek Gajda](../characters/wujas.md) when he is drunk and loose.
- Trigger examples include [Janina Gajda](../characters/ciotka.md)'s death after the players were present.
- Trigger examples include direct confrontation with [Zbigniew Gajda](../characters/wojewoda.md) or [Stanisław Rezeń](../characters/butcher.md) about the 1954 lynch.

## Hook

- [Stanisław Rezeń](../characters/butcher.md)'s dogs appear near places the players visit.
- [Stanisław Rezeń](../characters/butcher.md) is seen watching from a distance.
- A door is left open.
- Something goes missing.
- A dead animal is left on a doorstep.

## Setup

- [Stanisław Rezeń](../characters/butcher.md) tracks what the players do.
- [Stanisław Rezeń](../characters/butcher.md) tracks who the players talk to.
- [Stanisław Rezeń](../characters/butcher.md) tracks where the players go.
- The road is flooded.
- The forest edge and village edge are isolated.
- [Stanisław Rezeń](../characters/butcher.md)'s dogs move with him.
- Lone players at night, near [%OLD_VILLAGE%](../locations/old-village-ruins.md), or on the village edge are vulnerable.
- [Stanisław Rezeń](../characters/butcher.md) gives no direct warning before escalation.

## Opportunities

- **Dogs near the committee** `(requires: Observation)` — The same dogs appear near multiple places the players visit.
- **Watcher at distance** `(requires: Observation)` — [Stanisław Rezeń](../characters/butcher.md) is present often enough that coincidence is unlikely.
- **Wordless intimidation** `(requires: Enforcement or Streetwise)` — Missing items, open doors, or dead animals are threats without written messages.

## Actions

### Confront him
- **Requires:** [Stanisław Rezeń](../characters/butcher.md) has escalated beyond watching.
- **Cost:** 1 action
- **Outcome:** [Stanisław Rezeń](../characters/butcher.md) goes cold under pressure; his knife and dogs are ready before he raises his voice.
- **Gives:** [`butcher-is-dangerous`](../clues/clues.md#butcher-is-dangerous)

### Use Zbigniew Gajda
- **Requires:** Access to [Zbigniew Gajda](../characters/wojewoda.md) before a direct attack.
- **Cost:** 1 action
- **Outcome:** [Zbigniew Gajda](../characters/wojewoda.md) intervenes and [Stanisław Rezeń](../characters/butcher.md) pauses the escalation.
- **Gives:** NPC State Change: [Zbigniew Gajda](../characters/wojewoda.md) is now actively restraining [Stanisław Rezeń](../characters/butcher.md).

### Turn the village against him
- **Requires:** Evidence the village will accept against [Stanisław Rezeń](../characters/butcher.md).
- **Cost:** 1 action
- **Outcome:** [Stanisław Rezeń](../characters/butcher.md) loses the village's passive tolerance.
- **Gives:** World State Change: [Stanisław Rezeń](../characters/butcher.md) is exposed as a direct threat rather than a tolerated outcast.

## Exits

- Return to %NEW_VILLAGE% under guard or in a group.
- Go to [Zbigniew Gajda's house](../locations/wojewodas-house.md) to involve the sołtys.
- Go to [Stanisław Rezeń's house](../locations/butchers-house.md) if the players choose direct confrontation.

## If Missed

- If the players never cross [Stanisław Rezeń](../characters/butcher.md)'s threshold, he remains in observation mode.
- If the players stay surface-level, the direct threat does not escalate.
