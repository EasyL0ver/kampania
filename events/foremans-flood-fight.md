# Zofia Comes to the Committee

**Location:** [PGR farm](../locations/pgr-farm.md)
**Present:** [Zofia Pytlak](../characters/zofia.md), [Michał Pytlak](../characters/foreman.md)
**Available:** Day 5, any phase.

## Trigger

- [Zofia Pytlak](../characters/zofia.md) has watched [Michał Pytlak](../characters/foreman.md) for two days.
- [Zofia Pytlak](../characters/zofia.md) cannot reach [Michał Pytlak](../characters/foreman.md).
- [Zofia Pytlak](../characters/zofia.md) comes to the outsiders.

## Hook

- [Zofia Pytlak](../characters/zofia.md) crosses the village looking for the committee.
- [Zofia Pytlak](../characters/zofia.md)'s eyes are red.
- [Zofia Pytlak](../characters/zofia.md)'s hands shake.

## Setup

- [Zofia Pytlak](../characters/zofia.md) finds the committee.
- [Zofia Pytlak](../characters/zofia.md) says something is wrong with her husband.
- [Michał Pytlak](../characters/foreman.md) has not come home since the flood started.
- [Michał Pytlak](../characters/foreman.md) does not eat what [Zofia Pytlak](../characters/zofia.md) brings him.
- [Michał Pytlak](../characters/foreman.md) does not sleep.
- [Michał Pytlak](../characters/foreman.md) is 57 years old with a bad knee.
- [Michał Pytlak](../characters/foreman.md) is outlifting younger men.
- [Michał Pytlak](../characters/foreman.md)'s hands bled on the first day and no longer do.
- [Michał Pytlak](../characters/foreman.md) does not shiver in floodwater.
- [Michał Pytlak](../characters/foreman.md) does not slow down.
- [Michał Pytlak](../characters/foreman.md) has been asking about a bunker in the forest.
- [Michał Pytlak](../characters/foreman.md) wants dynamite.
- [Zofia Pytlak](../characters/zofia.md) does not know [Michał Pytlak](../characters/foreman.md)'s plan.
- [Zofia Pytlak](../characters/zofia.md) wants the committee to save her husband rather than the farm.
- The workers keep following [Michał Pytlak](../characters/foreman.md) because he is the only person still fighting the flood.
- **Composure:** 0.

## Opportunities

- **Zofia's fear** `(requires: Empathy)` — [Zofia Pytlak](../characters/zofia.md) is describing observed physical changes, not exaggerating.
- **The impossible endurance** `(requires: Medicine)` — The described lack of fatigue, pain response, and cold response has no medical explanation.
- **The bunker question** `(requires: Finesse)` — UPA partisan bunkers in Bieszczady forests can hold old ordnance. → Gives: [`upa-bunker`](../clues/clues.md#upa-bunker)
- **The dilemma** `(requires: Empathy)` — [Zofia Pytlak](../characters/zofia.md) knows she is asking the committee to choose [Michał Pytlak](../characters/foreman.md) over the village's flood defense.

## Actions

### Go see Pytlak at the flood line
- **Requires:** Nothing
- **Prompted by:** [committee-runs-geographical-survey](../clues/clues.md#committee-runs-geographical-survey)
- **Cost:** 1 action
- **Outcome:** The committee finds [Michał Pytlak](../characters/foreman.md) knee-deep in floodwater, directing workers, hauling sandbags, and explaining that explosives can reopen the plugged water-gap above the village.
- **Gives:** [`gap-is-blocked`](../clues/clues.md#gap-is-blocked); Scene Unlock: [Michał Pytlak Saves the Village](foreman-saves-village.md)

### Talk to Zofia Pytlak
- **Requires:** Listening.
- **Cost:** 1 action
- **Outcome:** [Zofia Pytlak](../characters/zofia.md) says the flood fight is not new for [Michał Pytlak](../characters/foreman.md), but this is different, and he was already carrying a weight before the flood.
- **Gives:** NPC State Change: [Zofia Pytlak](../characters/zofia.md) trusts the committee and remains reachable later.

## Exits

- Go to the flood line at [PGR farm](../locations/pgr-farm.md).
- Proceed to [Michał Pytlak Saves the Village](foreman-saves-village.md) if the committee backs the plan.
- Return to %NEW_VILLAGE% if the committee refuses the flood-line visit.

## If Missed

- [Zofia Pytlak](../characters/zofia.md) returns to watching [Michał Pytlak](../characters/foreman.md) alone.
- The engineering ending path becomes harder to access.
- [Zofia Pytlak](../characters/zofia.md)'s trust window closes.
