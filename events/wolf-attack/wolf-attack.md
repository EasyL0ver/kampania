# The Wolf Attack

**Location:** [@name](../../locations/new-village/pgr-farm/pgr-farm.md)
**Present:** [@name](../../characters/wojewoda.md), [@name](../../characters/neighbour.md), [@name](../../characters/wujas.md)

## Hook

- [@name](../../characters/wojewoda.md) shouting across the PGR farm for the hunter and for his brother, heard anywhere on the farm.

## Setup

[@first-name](../../characters/wojewoda.md) comes down to the farm in a fury and calls for [@setup](../../characters/neighbour.md) and for his brother. In front of the farmhands he tears into the hunter: weeks with a rifle, and not one wolf. His brother does not answer. They find [@setup](../../characters/wujas.md) asleep, dead drunk, among the sacks in the [@name](../../locations/new-village/pgr-farm/warehouse.md). [@first-name](../../characters/wojewoda.md) hauls him up by the collar and, white with anger, sends him to the edge house: [@surname](../../characters/butcher.md) is to deal with the wolves.[](#the-man-at-the-edge-house)[](#dudka-frowns-at-the-name) Stung, the hunter takes up his rifle and says he is going after the pack himself, and anyone with the stomach for it can come.[](#go-with-dudka) [@first-name](../../characters/wujas.md) is sent stumbling off toward the edge house with his brother's message.[](#wujas-does-not-want-to-go)[](#follow-wujas-to-the-butchers)

## Opportunities

### The man at the edge house
- **When:** setup:events/wolf-attack/wolf-attack.md
- **Outcome:** The sołtys names the man he is sending for: [@name](../../characters/butcher.md), who lives in the last house before the treeline.
- **Gives:** *(to: everyone present)* hook:characters/butcher.md

### Dudka frowns at the name
- **Noticed by:** [Empathy](../../cards/empathy.md)
- **When:** setup:events/wolf-attack/wolf-attack.md
- **Outcome:** At that name the hunter's face closes like a fist. Whatever he feels about [@surname](../../characters/butcher.md), it is older than the wolves.
- **Gives:** [`dudka-despises-rezen`](../../clues/clues.md#dudka-despises-rezen)

### Wujas does not want to go
- **Noticed by:** [Empathy](../../cards/empathy.md)
- **When:** setup:events/wolf-attack/wolf-attack.md
- **Outcome:** He stalls at the warehouse door, looks for his cap he is already wearing, and his hands shake in a way that is not the drink. He is afraid of the man at the edge house.

## Actions

### Follow Wujas to the butcher's
<!-- Prompted by: setup:events/wolf-attack/wolf-attack.md -->
- **Outcome:** You keep [@nickname](../../characters/wujas.md) in sight as he stumbles off toward the edge house.
- **Changes:** [@name](wolf-attack.md) — ends

### Go with Dudka
<!-- Prompted by: setup:events/wolf-attack/wolf-attack.md -->
- **Outcome:** You fall in beside the hunter as he checks his rifle and heads for the trees.
- **Changes:** [@name](wolf-attack.md) — ends

## Resolve

- → [@name](hunt-with-rezen/hunt-with-rezen.md) — starts
- → [@name](hunt-with-dudka/hunt-with-dudka.md) — starts
