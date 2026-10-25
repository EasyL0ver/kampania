# PGR Inventory

## Hook

A blank state stock-take form for the farm's livestock, grain, and materials.

## Setup

An empty remanent form the committee must complete before the farm can be evacuated. Fixed works are out of scope: the barns, the silo shell, the ditch, all written off to the water. Everything movable has to be found, counted, and signed for.[](#what-the-form-asks-for) Every line is blank: the figures can be taken from the farm's own books, counted on the ground, or both. The work is walking the farm and filling every line.

## Content

```
PGR INVENTORY — MOVABLE PROPERTY (REMANENT) 1967
State Agricultural Farm — for evacuation
Counted by: ____________

                                     COUNT
LIVESTOCK
  Dairy cattle                       ________
  Sheep                              ________
  Poultry                            ________

GRAIN
  Grain silo (concrete), stored      ________

MATERIALS
  Timber                             ________
  Brick                              ________
  Nails                              ________
  Fertilizer                         ________
```

## Mechanics

### Inventory

- **Type:** list
- One entry per line of the form, made by the action that counts or totals it.
- An entry records the stock and the figure written in, or that the line was left blank.

## Opportunities

### What the form asks for
- **When:** setup:items/pgr-inventory.md
- **Outcome:** The form wants every movable thing on the farm accounted for, section by section: livestock, grain, and materials.
- **Gives:** [`committee-should-inventory-livestock`](../clues/clues.md#committee-should-inventory-livestock), [`committee-should-inventory-grain`](../clues/clues.md#committee-should-inventory-grain), [`committee-should-inventory-materials`](../clues/clues.md#committee-should-inventory-materials)

## Actions

### Sum up the chickens
- **Requires:** [@name](pgr-inventory.md)
- **When:** [Chickens counted](../locations/new-village/pgr-farm/pgr-farm.md#chickens-counted) is true AND [Chickens counted](../locations/new-village/pgr-farm/cow-barn.md#chickens-counted) is true AND [Chickens counted](../locations/new-village/pgr-farm/grain-silo.md#chickens-counted) is true AND [Chickens counted](../locations/new-village/pgr-farm/warehouse.md#chickens-counted) is true AND [Chickens counted](../locations/new-village/pgr-farm/pgr-office.md#chickens-counted) is true AND [Chickens counted](../locations/new-village/pgr-farm/pgr-quarters.md#chickens-counted) is true
<!-- Prompted by: [chickens-are-everywhere](../clues/clues.md#chickens-are-everywhere) -->
- **Outcome:** You add up the tallies from every corner of the farm and write the total in its line: twenty-two.
- **Gives:** [`chicken-population-is-tiny`](../clues/clues.md#chicken-population-is-tiny), [`pgr-has-22-chickens`](../clues/clues.md#pgr-has-22-chickens)
- **Changes:** [Inventory](#inventory) — chickens: twenty-two
