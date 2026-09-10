# Carmen Cigarette Butts

**Type:** Item — evidence (physical trace)
**Source:** The ground just outside [Janina Gajda](../characters/ciotka.md)'s door, collected during [Ciotka Found Dead](../events/ciotka-found-dead.md)
**Carried:** Evidence. Places a Carmen smoker at her threshold, but the butts are weathered, left a day or more before she died.

## Hook

A small scatter of rain-softened, hand-pinched cigarette butts.

## Description

A small scatter of hand-pinched butts, oval, all one brand: Carmen. An aromatic premium smoke, dearer than the Sport and Extra Mocne the village runs on and rarely seen this far out. Rain has swollen them grey and soft. They were dropped at least a day before Janina died, not the night of.

## Opportunities

- **A scatter of butts** `(requires: nothing)` — Hand-pinched butts by the door, all the same brand, but you cannot tell which. Bagged, they could be compared against butts found elsewhere.
- **Read the brand** `(requires: Chainsmoker)` `(prompted by: [ciotka-is-dead](../clues/clues.md#ciotka-is-dead))` — The oval shape and aroma give it away: Carmen, a premium smoke rarely seen this far out. → Gives: [`butts-at-ciotkas-are-carmen`](../clues/clues.md#butts-at-ciotkas-are-carmen)

## Actions

### Present the butts as evidence
- **Requires:** Holding the butts; a public accusation or the committee's report
- **Prompted by:** [butts-at-ciotkas-are-carmen](../clues/clues.md#butts-at-ciotkas-are-carmen)
- **Cost:** 1 action
- **Outcome:** Naming the Carmen brand in the open turns the village on its two Carmen men, and set beside the boy's gifted Carmen it can be bent against [Edek](../characters/glupek.md) instead. It is a false lead: the butts are a day old and clear the death night (see above). Brandished without that caveat, they push a wrong verdict and feed the hunt for a scapegoat.
- **Gives:** World State Change: suspicion hardens against the Carmen smoker named; Ending Progress: advances a wrongful-punishment ending ([The Lynch](../events/punishment-lynch.md)).

### Compare the door and well butts
- **Requires:** Holding the butts from [Janina's door](../events/ciotka-found-dead.md) and the [handful gathered at the well](../locations/the-well.md#search-the-ground-around-the-well)
- **Prompted by:** [ciotka-is-dead](../clues/clues.md#ciotka-is-dead)
- **Cost:** 1 action
- **Outcome:** Laid side by side, both scatters are the same oval Carmen. The man who haunts the well left the same brand at her threshold.
- **Gives:** [door-and-well-butts-match](../clues/clues.md#door-and-well-butts-match)

### Compare with the cigarette in Edek's room
- **Requires:** Holding the butts and the [single cigarette found in Edek's room](../locations/ciotkas-house.md#search-edeks-room); **Finesse**, **Survival**, or **Chainsmoker**
- **Prompted by:** [butts-at-ciotkas-are-carmen](../clues/clues.md#butts-at-ciotkas-are-carmen)
- **Cost:** 1 action
- **Outcome:** Laid side by side, the unsmoked cigarette from the boy's corner is the same oval Carmen as the butts at the door. Edek does not smoke, so someone gave it to him. Who can be learned by [asking Edek](../characters/glupek.md#ask-edek-about-the-cigarette).
- **Gives:** [edek-has-carmen-cigarette](../clues/clues.md#edek-has-carmen-cigarette)

