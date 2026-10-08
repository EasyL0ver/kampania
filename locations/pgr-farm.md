# The PGR Farm

**Type:** Location (revisitable)
**Location:** State Agricultural Farm (Państwowe Gospodarstwo Rolne) — fields, barns, livestock pens, tool shed.
**Present:** [Michał Pytlak](../characters/foreman.md) (day), [Barbara Kopacz](../characters/barbara.md) (working hours), [Józef Nowak](../characters/secondary/jozef-nowak.md) (variable), [Piotr Wiśniewski](../characters/secondary/piotr-wisniewski.md) (variable)
**Available:** Daytime, any day. Repeatable.
**Cost:** 1 action per visit

## Hook

The State Agricultural Farm: fields, barns, livestock pens, tool shed.

## Setup

- The farm has two long barns, a concrete grain silo, a tool shed, livestock pens, and ploughed fields running toward the tree line.
- One side of the concrete grain silo carries a patch of newer, cruder concrete.
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

- **Worker count mismatch** `(noticed by: [Bureaucracy](../cards/bureaucracy.md))` — One ledger name does not match any worker present or recognized on the farm. → Gives: [mazur-paid-but-absent](../clues/clues.md#mazur-paid-but-absent)
- **Wolf damage** `(noticed by: [Handiwork](../cards/handiwork.md))` `(prompted by: aware:locations/pgr-farm.md)` — The livestock pens show repeated wolf attacks over several weeks. → Gives: [wolves-attacking-livestock](../clues/clues.md#wolves-attacking-livestock)

## Actions

### Inspect the farm books
- **Cost:** 1 time
- **Outcome:** The farm books show mostly ordinary farm spending, plus Tadeusz Mazur listed as a current worker drawing wages with no work logs for the past two years.
- **Gives:** [mazur-paid-but-absent](../clues/clues.md#mazur-paid-but-absent), [worker registry](../items/pgr-ledger.md), [expense journal](../items/pgr-expenses.md)

### Report wolf damage
- **When:** Day 1+ and wolf damage visible
- **Prompted by:** aware:locations/pgr-farm.md
- **Outcome:** Michał shows dead sheep, patched fences, and tracks.
- **Gives:** [wolves-attacking-livestock](../clues/clues.md#wolves-attacking-livestock), aware:events/wolf-attack.md

### Join the hunt
- **When:** Day 1+ and wolf damage visible
- **Prompted by:** [wolves-attacking-livestock](../clues/clues.md#wolves-attacking-livestock)
- **Cost:** 1 time
- **Outcome:** The committee joins the men going after the wolves.
- **Gives:** aware:events/hunt-with-rezen.md, aware:events/hunt-with-dudka.md
