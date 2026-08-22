# The Wolf Attack

**Location:** [PGR Farm](../locations/pgr-farm.md)
**Present:** [Michał Pytlak](../characters/foreman.md), [Zbigniew Gajda](../characters/wojewoda.md), [Ryszard Dudka](../characters/neighbour.md), farm workers
**Available:** Day 1–2 morning; fresh livestock kills are visible at the [PGR](../locations/pgr-farm.md) from Day 1

## Trigger

- Wolves have been attacking the [PGR](../locations/pgr-farm.md) for weeks ([`wolves-attacking-livestock`](../clues/clues.md#wolves-attacking-livestock)).
- [Ryszard Dudka](../characters/neighbour.md) has hunted them alone and failed ([`dudka-failed-wolf-hunt`](../clues/clues.md#dudka-failed-wolf-hunt)).
- Another sheep is killed overnight.
- The kill forces Zbigniew to authorize Rezeń.

## Hook

- Workers gather at the pen at dawn.
- Crows work the carcass.
- The dead animal is visible from the farm approach.

## Setup

- A sheep lies dead in the pen.
- Its throat is torn.
- Blood is in the mud.
- Drag marks lead toward the treeline.
- The other animals crowd in the far corner.
- [Zbigniew Gajda](../characters/wojewoda.md) counts the damage.
- [Ryszard Dudka](../characters/neighbour.md) stands nearby with his rifle.
- Zbigniew blames Dudka in front of the workers.
- Zbigniew tells [Michał Pytlak](../characters/foreman.md) he will handle it.
- Zbigniew later sends [Tadek](../characters/wujas.md) to the edge house with the request that Rezeń deal with the wolves; see [Tadek Visits the Butcher](wujas-visits-butcher.md).

## Opportunities

- **The kill** `(requires: Survival)` — one animal worked confidently inside a known pen.
- **Gajda at the fence** `(requires: Empathy)` — he is bracing to authorize the thing he avoided for thirteen years.
- **Dudka taking blame** `(requires: Empathy)` — the humiliation is less important than who will replace him.
- **Dudka alone after** `(requires: Speech)` — his failure is real and his fear of Rezeń is older than the wolves.
- **Workers muttering** `(requires: Finesse)` — workers say Dudka has failed for weeks and that the other hunter is good with a knife. → Gives: [`dudka-failed-wolf-hunt`](../clues/clues.md#dudka-failed-wolf-hunt)
- **Workers blame the hag** `(requires: Finesse or Culture)` — workers connect the wolf attacks to fires and chanting in the ruins. → Gives: [`hag-blamed-for-wolves`](../clues/clues.md#hag-blamed-for-wolves)
- **Fence condition after repairs** `(requires: Reinforce the farm and Handiwork)` — the fence was rotten before the rains and the wolves used an existing weakness. → Gives: [`pgr-underfunded-fences`](../clues/clues.md#pgr-underfunded-fences)

## Actions

### Reinforce the farm
- **Requires:** Nothing
- **Cost:** 1 action
- **Outcome:** The players help [Michał Pytlak](../characters/foreman.md) and the workers repair fence, move livestock, and haul feed.
- **Gives:** World State Change: the farm is temporarily reinforced; NPC State Change: Pytlak talks more freely while working

## Exits

- Rezeń arrives at the farm gate the next morning to hunt: [The Hunt with Rezeń](hunt-with-rezen.md).
- Dudka goes out again with his rifle: [The Hunt with Dudka](hunt-with-dudka.md).
- Tadek carries the authorization: [Tadek Visits the Butcher](wujas-visits-butcher.md).

## If Missed

- Zbigniew authorizes Rezeń anyway.
- Rezeń comes into the village and does not return to isolation; see [Butcher — Well Influence](../characters/butcher.md).
- Dudka's failure curdles into rage.
- Tadek's go-between role dies.
