# Carmen Cigarette Butts

## Hook

A small scatter of rain-softened, hand-pinched cigarette butts.

## Setup

A small scatter of hand-pinched butts, oval, all one brand: Carmen.[](#hand-pinched-butts-all-the-same-brand) An aromatic premium smoke, dearer than the Sport and Extra Mocne the village runs on and rarely seen this far out.[](#carmen-brand-butts-rare-this-far-out) Rain has swollen them grey and soft. They were dropped at least a day before [@first-name](../characters/ciotka.md) died, not the night of.

## Opportunities

### Hand-pinched butts all the same brand
- **When:** setup:items/cigarette-butts-from-ciotkas.md
- **Outcome:** Hand-pinched butts by the door, all the same brand, but you cannot tell which. Bagged, they could be compared against butts found elsewhere.

### Carmen brand butts, rare this far out
- **Noticed by:** [Chainsmoker](../cards/chainsmoker.md)
- **When:** setup:items/cigarette-butts-from-ciotkas.md
<!-- Prompted by: [ciotka-is-dead](../clues/clues.md#ciotka-is-dead) -->
- **Outcome:** The butts' oval shape and aroma give away the brand: Carmen, a premium smoke rarely seen this far out.
- **Gives:** [`butts-at-ciotkas-are-carmen`](../clues/clues.md#butts-at-ciotkas-are-carmen)

## Actions

### Compare the door and well butts
- **Requires:** [@name](cigarette-butts-from-ciotkas.md)
- **When:** the [handful gathered at the well](../locations/old-village-ruins.md#investigate-the-area-around-the-well)
<!-- Prompted by: [ciotka-is-dead](../clues/clues.md#ciotka-is-dead) -->
- **Cost:** 1 time
- **Outcome:** Laid side by side, both scatters are the same oval Carmen. The man who haunts the well left the same brand at her threshold.
- **Gives:** [door-and-well-butts-match](../clues/clues.md#door-and-well-butts-match)

### Compare with the cigarette in Glupek's room
- **Requires:** [@name](cigarette-butts-from-ciotkas.md) AND ([Finesse](../cards/finesse.md) OR [Survival](../cards/survival.md) OR [Chainsmoker](../cards/chainsmoker.md))
- **When:** the [single cigarette found in Glupek's room](../locations/new-village/ciotkas-house/ciotkas-house.md#search-glupeks-room)
<!-- Prompted by: [butts-at-ciotkas-are-carmen](../clues/clues.md#butts-at-ciotkas-are-carmen) -->
- **Cost:** 1 time
- **Outcome:** Laid side by side, the unsmoked cigarette from the boy's corner is the same oval Carmen as the butts at the door. [@first-name](../characters/glupek.md) does not smoke, so someone gave it to him. Who can be learned by [asking Edek](../characters/glupek.md#ask-glupek-about-the-cigarette).
- **Gives:** [edek-has-carmen-cigarette](../clues/clues.md#edek-has-carmen-cigarette)
