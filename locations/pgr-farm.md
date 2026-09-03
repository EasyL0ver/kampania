# The PGR Farm

**Type:** Location (revisitable)
**Location:** State Agricultural Farm (Państwowe Gospodarstwo Rolne) — fields, barns, livestock pens, tool shed.
**Present:** [Michał Pytlak](../characters/foreman.md) (day), [Barbara Kopacz](../characters/barbara.md) (working hours), [Józef Nowak](../characters/secondary-characters.md#józef-nowak--józef-nowak) (variable), [Piotr Wiśniewski](../characters/secondary-characters.md#piotr-wiśniewski--piotr-wiśniewski) (variable)
**Available:** Daytime, any day. Repeatable.
**Cost:** 1 action per visit

## Setup

- The farm has two long barns, a concrete grain silo, a tool shed, livestock pens, and ploughed fields running toward the tree line.
- A concrete-headed irrigation ditch runs off the fields toward the low ground; [Zbigniew Gajda](../characters/wojewoda.md) calls it the village's flood drain. Following it its full length is its own scene: [The Irrigation Ditch](the-irrigation-ditch.md).
- Chickens move between the buildings.
- The [office](pgr-office.md) is in the main building.
- The [workers' quarters](pgr-quarters.md) sit behind the main buildings.
- Michał Pytlak works in the fields, barns, or feed areas during the day.
- Józef Nowak and Piotr Wiśniewski keep working unless addressed.
- Barbara Kopacz works apart from the men.
- A battered wooden desk in the tool shed holds supply orders, receipts, delivery slips, the [worker registry](../items/pgr-ledger.md), and the [expense journal](../items/pgr-expenses.md).
- The farm has 7 real workers present or accounted for.
- The ledger lists 8 workers.
- Bloodstains, patched fences, and nervous animals are visible from Day 1.
- Day 1–2: fresh wolf damage may bring [Zbigniew Gajda](../characters/wojewoda.md) to the farm.

## Opportunities

- **Worker count mismatch** `(requires: Bureaucracy)` — One ledger name does not match any worker present or recognized on the farm. → Gives: [foreman-coverup](../clues/clues.md#foreman-coverup)
- **Wolf damage** `(requires: Handiwork)` — The livestock pens show repeated wolf attacks over several weeks. → Gives: [wolves-attacking-livestock](../clues/clues.md#wolves-attacking-livestock)

## Actions

### Inspect the farm books
- **Requires:** Committee authority
- **Cost:** 1 action
- **Outcome:** The farm books show mostly ordinary farm spending, plus Tadeusz Mazur listed as a current worker drawing wages with no work logs for the past two years.
- **Gives:** [foreman-coverup](../clues/clues.md#foreman-coverup); Item: [worker registry](../items/pgr-ledger.md); Item: [expense journal](../items/pgr-expenses.md)

### Ask the labourers about accidents
- **Requires:** Józef Nowak or Piotr Wiśniewski present
- **Cost:** Free
- **Outcome:** The labourers exchange glances and mention that the barn has been fixed.
- **Gives:** [pgr-workers-hide-something](../clues/clues.md#pgr-workers-hide-something)

### Talk to Michał Pytlak
- **Requires:** [Michał Pytlak](../characters/foreman.md) present
- **Cost:** Free
- **Outcome:** Talking to Michał is a character interaction. See his [character actions and opportunities](../characters/foreman.md#opportunities): "Talk to him about the flood" (gives [ditch-is-candidate-drain](../clues/clues.md#ditch-is-candidate-drain)), the Empathy opportunity "The ditch shames him" (gives [ditch-not-built-to-spec](../clues/clues.md#ditch-not-built-to-spec)), and "Press him about Tadeusz Mazur" (gives [foreman-coverup](../clues/clues.md#foreman-coverup)).

### Walk the irrigation ditch
- **Requires:** Following the ditch off the fields
- **Cost:** See [The Irrigation Ditch](the-irrigation-ditch.md)
- **Outcome:** Walking the ditch its full length is its own scene. See [The Irrigation Ditch](the-irrigation-ditch.md), which gives [ditch-concrete-stops-short](../clues/clues.md#ditch-concrete-stops-short).
- **Gives:** Scene Unlock: [The Irrigation Ditch](the-irrigation-ditch.md)

### Talk to Barbara Kopacz
- **Requires:** [Barbara Kopacz](../characters/barbara.md) present during working hours
- **Cost:** Free
- **Outcome:** Barbara answers questions about work, refuses to discuss Pawełek Kopacz's father, and becomes slightly more willing to speak if treated kindly.
- **Gives:** NPC State Change: Barbara Kopacz becomes more open to future contact, including access to [Stefania Kopacz](../characters/babcia.md).

### Offer to help with farm work
- **Requires:** Nothing
- **Cost:** 1 action
- **Outcome:** The committee works alongside the farm workers.
- **Gives:** NPC State Change: Michał Pytlak and the workers treat the committee as useful labour; World State Change: village outskirts survey trips are reduced by 1.

### Report wolf damage
- **Requires:** Day 1+ and wolf damage visible
- **Cost:** Free for inspection; 1 action to join the hunt
- **Outcome:** Michał shows dead sheep, patched fences, and tracks.
- **Gives:** [wolves-attacking-livestock](../clues/clues.md#wolves-attacking-livestock); Scene Unlock: [The Wolf Attack](../events/wolf-attack.md); Scene Unlock: [The Hunt with Rezeń](../events/hunt-with-rezen.md); Scene Unlock: [The Hunt with Dudka](../events/hunt-with-dudka.md)
