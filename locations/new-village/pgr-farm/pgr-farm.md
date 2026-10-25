# The PGR Farm

**Tags:** [@name](../../../tags/pgr-location.md)

## Hook

The State Agricultural Farm: fields, barns, livestock pens, tool shed.

## Setup

- The farm has two long barns, a concrete grain silo[](#a-concrete-grain-silo), a tool shed, livestock pens, and ploughed fields running toward the tree line.
- One side of the concrete [@name](grain-silo.md) carries a patch of newer, cruder concrete.
- A concrete-headed irrigation ditch runs off the fields toward the low ground[](#a-ditch-running-off-the-fields); [@name](../../../characters/wojewoda.md) calls it the village's flood drain. Following it its full length is its own scene: [@name](../../the-irrigation-ditch.md).
- Chickens move between the buildings.[](#chickens-are-everywhere)
- The [@name](pgr-office.md) is in the main building.[](#an-office-in-the-main-building)
- One of the two long barns is the [@name](cow-barn.md)[](#a-long-cow-barn), with the [@name](cow-meadow.md) beside it.[](#a-meadow-beside-the-barn)
- The [@name](henhouse.md) stands among the buildings.[](#a-henhouse-among-the-buildings)
- The farm's materials are kept in the [@name](warehouse.md).[](#a-low-storehouse)
- The [@name](pgr-quarters.md) sit behind the main buildings.[](#barracks-behind-the-main-buildings)
- [@name](../../../characters/foreman.md) works in the fields, barns, or feed areas during the day.
- [@name](../../../characters/secondary/jozef-nowak.md) and [@name](../../../characters/secondary/piotr-wisniewski.md) keep working unless addressed.
- [@name](../../../characters/barbara.md) works apart from the men.
- A battered wooden desk in the tool shed holds supply orders, receipts, delivery slips, the [@name](../../../items/pgr-ledger.md), the [@name](../../../items/pgr-expenses.md), and the [@name](../../../items/pgr-income.md).
- The farm has 7 real workers present or accounted for.
- The ledger lists 8 workers.[](#unknown-name-in-ledger)
- Bloodstains, patched fences, and nervous animals are visible from Day 1.[](#repeated-wolf-attacks-on-pens)[](#report-wolf-damage)
- Day 1–2: fresh wolf damage may bring [@name](../../../characters/wojewoda.md) to the farm.

## Opportunities

### A concrete grain silo
- **When:** setup:locations/new-village/pgr-farm/pgr-farm.md
- **Outcome:** A tall concrete grain silo among the farm buildings.
- **Gives:** located:locations/new-village/pgr-farm/grain-silo.md

### A ditch running off the fields
- **When:** setup:locations/new-village/pgr-farm/pgr-farm.md
- **Outcome:** A concrete-headed ditch running off the fields toward the low ground.
- **Gives:** located:locations/the-irrigation-ditch.md

### An office in the main building
- **When:** setup:locations/new-village/pgr-farm/pgr-farm.md
- **Outcome:** An office in the farm's main building.
- **Gives:** located:locations/new-village/pgr-farm/pgr-office.md

### A long cow barn
- **When:** setup:locations/new-village/pgr-farm/pgr-farm.md
- **Outcome:** One of the long barns, a cow barn.
- **Gives:** located:locations/new-village/pgr-farm/cow-barn.md

### A meadow beside the barn
- **When:** setup:locations/new-village/pgr-farm/pgr-farm.md
- **Outcome:** A fenced meadow beside the cow barn.
- **Gives:** located:locations/new-village/pgr-farm/cow-meadow.md

### A henhouse among the buildings
- **When:** setup:locations/new-village/pgr-farm/pgr-farm.md
- **Outcome:** A small henhouse among the buildings.
- **Gives:** located:locations/new-village/pgr-farm/henhouse.md

### A low storehouse
- **When:** setup:locations/new-village/pgr-farm/pgr-farm.md
- **Outcome:** A low timber storehouse with a wide double door.
- **Gives:** located:locations/new-village/pgr-farm/warehouse.md

### Barracks behind the main buildings
- **When:** setup:locations/new-village/pgr-farm/pgr-farm.md
- **Outcome:** A canteen and long low barracks behind the main buildings.
- **Gives:** located:locations/new-village/pgr-farm/pgr-quarters.md

### Chickens are everywhere
- **When:** setup:locations/new-village/pgr-farm/pgr-farm.md
- **Outcome:** Chickens are everywhere: in the yard, under the carts, round every building on the farm.
- **Gives:** [`chickens-are-everywhere`](../../../clues/clues.md#chickens-are-everywhere)

### Unknown name in ledger
- **Noticed by:** [Bureaucracy](../../../cards/bureaucracy.md)
- **When:** setup:locations/new-village/pgr-farm/pgr-farm.md
- **Outcome:** One ledger name does not match any worker present or recognized on the farm.
- **Gives:** [mazur-paid-but-absent](../../../clues/clues.md#mazur-paid-but-absent)

### Repeated wolf attacks on pens
- **Noticed by:** [Handiwork](../../../cards/handiwork.md)
- **When:** setup:locations/new-village/pgr-farm/pgr-farm.md
<!-- Prompted by: setup:locations/new-village/pgr-farm/pgr-farm.md -->
- **Outcome:** The livestock pens show repeated wolf attacks over several weeks.
- **Gives:** [wolves-attacking-livestock](../../../clues/clues.md#wolves-attacking-livestock)

## Actions

### Inspect the farm books
- **Cost:** 1 time
- **Outcome:** The farm books show mostly ordinary farm spending and sales, plus [@name](../../../characters/tadeusz-mazur.md) listed as a current worker drawing wages with no work logs for the past two years.
- **Gives:** [mazur-paid-but-absent](../../../clues/clues.md#mazur-paid-but-absent), [@name](../../../items/pgr-ledger.md), [@name](../../../items/pgr-expenses.md), [@name](../../../items/pgr-income.md), hook:items/pgr-ledger.md, hook:items/pgr-expenses.md, hook:items/pgr-income.md

### Report wolf damage
- **When:** NOT [@name](../../../events/committee-visit/day-1/day-1.md)
<!-- Prompted by: setup:locations/new-village/pgr-farm/pgr-farm.md -->
- **Outcome:** [@first-name](../../../characters/foreman.md) shows dead sheep, patched fences, and tracks.
- **Gives:** [wolves-attacking-livestock](../../../clues/clues.md#wolves-attacking-livestock), hook:events/wolf-attack/wolf-attack.md

### Join the hunt
- **When:** NOT [@name](../../../events/committee-visit/day-1/day-1.md)
<!-- Prompted by: [wolves-attacking-livestock](../../../clues/clues.md#wolves-attacking-livestock) -->
- **Cost:** 1 time
- **Outcome:** The committee joins the men going after the wolves.
- **Gives:** hook:events/wolf-attack/hunt-with-rezen/at-the-pasture.md, hook:events/wolf-attack/hunt-with-dudka/hunt-with-dudka.md
