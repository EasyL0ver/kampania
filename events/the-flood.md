# The Flood

**Location:** %NEW_VILLAGE%
**Present:** Everyone
**Available:** Day 3 morning; automatic.

## Hook

- Rain has continued since Day 1.
- During the night before Day 3, the rain became louder.
- In the morning, water drums on roofs across the village.
- The hook is unavoidable.

## Setup

- Players wake to heavy rain.
- The windows are grey with flood weather.
- The road the committee drove in on is gone under mud and flowing water.
- The bridge over the creek is underwater.
- The creek has become a flood channel.
- The village is cut off.
- por. Witold Skowron was supposed to return yesterday and has not.
- There is no car, word, or explanation from him.
- The phone in [Zbigniew Gajda](../characters/wojewoda.md)'s office is the only connection to the outside if the line works.
- Villagers are already working with sandbags near lower houses.
- [Michał Pytlak](../characters/foreman.md) has PGR workers reinforcing the livestock barn.
- The village recognizes this as a severe flood.
- The water table is rising.
- Cellars are filling.
- The ground is saturated.
- Surveyors' stakes marking the projected flood line run across the %NEW_VILLAGE% slope, and the water is already climbing past them.
- The committee is outside the village's normal flood-response machinery.

## Opportunities

- **The washed-out road** `(requires: Handiwork)` — the road failed because poor drainage and weak foundation met heavy rain. Repair will take days after the water drops. → Gives: [`road-washes-out`](../clues/clues.md#road-washes-out)
- **The office phone** `(requires: Finesse)` — [Zbigniew Gajda](../characters/wojewoda.md) offers access and stays close enough to hear what is reported. → Gives: [`phone-is-lifeline`](../clues/clues.md#phone-is-lifeline)
- **The village response** `(requires: Finesse)` — Zbigniew gives quiet orders, [Pytlak](../characters/foreman.md) runs the PGR response, and villagers ignore outsider attempts to lead.
- **The rising water table** `(requires: Handiwork and prior visit to [%OLD_VILLAGE%](../locations/old-village-ruins.md))` — the well at the old village is filling too. → Gives: [`old-village-flooding`](../clues/clues.md#old-village-flooding)
- **The line is already passed** `(requires: nothing)` — On the slope the water has climbed about a metre above the surveyors' marked flood line, the level the plan calls safe. → Gives: [`water-tops-the-flood-line`](../clues/clues.md#water-tops-the-flood-line)

## Actions

### Try the phone
- **Requires:** Access to Zbigniew's office.
- **Cost:** Free for the first attempt; 1 action for repeated attempts.
- **Outcome:** The line may reach the powiat office, fail, or route through the exchange. Any outside call is unreliable and monitored if Zbigniew is present.
- **Gives:** [`phone-is-lifeline`](../clues/clues.md#phone-is-lifeline); Scene Unlock: [Operator Refuses Help](operator-refuses-help.md)

### Help with flood response
- **Requires:** Nothing
- **Cost:** 1 action
- **Outcome:** Players help with sandbags, drainage, or livestock. PGR workers mention that the [old village](../locations/old-village-ruins.md) floods worse because water pools there.
- **Gives:** [`old-village-flooding`](../clues/clues.md#old-village-flooding); NPC State Change: [Michał Pytlak](../characters/foreman.md) talks more freely during shared work

### Check on villagers
- **Requires:** Nothing
- **Cost:** 1 action
- **Outcome:** Players go door-to-door under cover of flood safety checks.
- **Gives:** World State Change: players gain a natural excuse to visit any house and speak to NPCs at home

## Exits

- Continue investigations inside %NEW_VILLAGE%, using flood checks as cover.
- Use the phone through [Operator Refuses Help](operator-refuses-help.md).
- If the flood proof is established and shared, continue to [The Disclosure](the-disclosure.md).
- If the village chooses engineering action, continue to [Foreman Saves the Village](foreman-saves-village.md).
