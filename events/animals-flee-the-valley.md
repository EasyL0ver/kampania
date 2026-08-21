# The Animals Flee the Valley

**Location:** [%OLD_VILLAGE%](../locations/old-village-ruins.md)
**Present:** [Ryszard Dudka](../characters/neighbour.md), [Edek Barnaś](../characters/glupek.md) (if near [Ciotka's house](../locations/ciotkas-house.md))
**Available:** Night, Day 4 onward. Fires once.

## Trigger

- Floodwater has filled the low %OLD_VILLAGE% basin.
- The forest floor floods from below.
- Wildlife moves uphill through %NEW_VILLAGE%, the only dry corridor.

## Hook

- Every village dog barks at once.
- Hooves, bodies in grass, wings, and animals crashing through brush are audible under the barking.
- The noise is audible from any bed in %NEW_VILLAGE%.

## Setup

- Rain has eased to cold mist.
- Deer move through yards.
- Foxes and hares cross open ground.
- Mice and voles move in a visible tide.
- Roosting birds flush from trees.
- All visible wildlife moves uphill out of the low ground.
- Animals refuse the short dry road past the ruins.
- Animal movement bends around [%OLD_VILLAGE%](../locations/old-village-ruins.md) and takes the long climb.
- One of [Stanisław Rezeń](../characters/butcher.md)'s penned dogs has torn its paws bloody on wire.
- [Edek Barnaś](../characters/glupek.md) stands at [Ciotka's house](../locations/ciotkas-house.md) window, still and facing [%OLD_VILLAGE%](../locations/old-village-ruins.md).
- [Ryszard Dudka](../characters/neighbour.md) sits awake at his window with a rifle across his knees.

## Opportunities

- **The one-way flight** `(requires: Agronomy)` — The animals are showing textbook flood displacement; game leaves low ground every wet year.
- **The ground they will not cross** `(requires: Observation)` — Not one animal strays toward [%OLD_VILLAGE%](../locations/old-village-ruins.md) all night.
- **Edek at the window** `(requires: Read)` — [Edek Barnaś](../characters/glupek.md) is still, not agitated, while facing [%OLD_VILLAGE%](../locations/old-village-ruins.md).
- **Dudka at his window** `(requires: Read or Sweettalk)` — [Ryszard Dudka](../characters/neighbour.md) has never seen the woods empty like this in twenty years.

## Actions

### Read the flight
- **Requires:** Go out and study the movement, or press [Ryszard Dudka](../characters/neighbour.md)
- **Cost:** 1 action
- **Outcome:** Animals are coming up out of the low %OLD_VILLAGE% basin because it is filling fast. Water pools into the lowest place instead of spreading thin.
- **Gives:** [`old-village-basin-is-the-low-sink`](../clues/clues.md#old-village-basin-is-the-low-sink)

### Calm the dogs / secure the livestock
- **Requires:** Nothing
- **Cost:** 1 action
- **Outcome:** Players help [Michał Pytlak](../characters/foreman.md) keep panicked stock from breaking pens.
- **Gives:** NPC State Change: [Michał Pytlak](../characters/foreman.md) warms to the committee.

## Exits

- Back to bed; actions here spend night time.
- Toward [%OLD_VILLAGE%](../locations/old-village-ruins.md), where water is visibly climbing the ruins.

## If Missed

- The event passes on its own.
- By morning, yards are churned to mud.
- By morning, some pens are down.
- By morning, [Michał Pytlak](../characters/foreman.md) has lost stock to panic.
- Players hear the event secondhand at breakfast.

