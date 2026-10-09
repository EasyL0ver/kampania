# The Car In

**Location:** Police car on the mountain road to [@name](../locations/new-village.md)
**Present:** [@name](../characters/officer.md), players
**Available:** Game start; first scene.

## Hook

A police car winding down the mountain road through the rain.

## Setup

- A police car drives on a winding mountain road.
- Rain hits the windshield.
- [@name](../characters/officer.md) drives.
- The players ride in the back.
- The players are government committee members.
- The committee is heading to assess flood risk in a remote Bieszczady village.
- [@name](../characters/officer.md) is professional and friendly.
- He talks while he drives.

## Opportunities

- *(noticed by: [Bureaucracy](../cards/bureaucracy.md) OR [Empathy](../cards/empathy.md))* — [@name](../characters/officer.md) frames the work narrowly and signals that old grievances and local legends stay out of the official report. → Gives: [`officer-warning`](../clues/clues.md#officer-warning) <!-- Prompted by: [government-committee](../clues/clues.md#government-committee) -->

## Actions

### Take the assignment
- **Outcome:** [@name](../characters/officer.md) lays out who the players are: a state committee sent ahead of the reservoir to take the [@name](../items/census.md), assess property for flood damage, and survey the valley.
- **Gives:** [`government-committee`](../clues/clues.md#government-committee), [@name](../items/professors-folder.md)

### Learn the destination
<!-- Prompted by: [government-committee](../clues/clues.md#government-committee) -->
- **Outcome:** [@name](../characters/officer.md) names where they are headed: [@name](../locations/new-village.md), the resettled village in the valley below the planned reservoir, and points out where the road drops toward it.
- **Gives:** aware:locations/new-village.md

### Listen to the briefing
<!-- Prompted by: [government-committee](../clues/clues.md#government-committee) -->
- **Outcome:** [@name](../characters/officer.md) explains the survey, the [@name](../items/census.md) and the property assessment. The main property is the [@name](../locations/pgr-farm.md): its movable socialist property must be inventoried and moved out before the flood.
- **Gives:** [`committee-runs-geographical-survey`](../clues/clues.md#committee-runs-geographical-survey), [`committee-notes-property-for-damage`](../clues/clues.md#committee-notes-property-for-damage), [`committee-fills-census`](../clues/clues.md#committee-fills-census), [`committee-accounts-movable-state-property`](../clues/clues.md#committee-accounts-movable-state-property), [`committee-hides-the-flood`](../clues/clues.md#committee-hides-the-flood), aware:locations/pgr-farm.md

### Read the professor's folder
- **Requires:** [@name](../items/professors-folder.md)
<!-- Prompted by: [committee-runs-geographical-survey](../clues/clues.md#committee-runs-geographical-survey) -->
- **Outcome:** [@name](../characters/professor.md)'s typed brief: the safe verdict assumes the map's heights are right and the valley drains. He names two outlets, the ridge water-gap and the far-ridge streambed, and writes that the paperwork does not hold up.
- **Gives:** [`gap-is-candidate-drain`](../clues/clues.md#gap-is-candidate-drain), [`streambed-is-candidate-drain`](../clues/clues.md#streambed-is-candidate-drain), [`the-flood-line-potentially-miscalculated`](../clues/clues.md#the-flood-line-potentially-miscalculated)

### Introduce yourselves
- **Outcome:** [@name](../characters/officer.md) asks each of them who they are and checks the answer against his dossier. The players draft the [card pool](../story-facts/game-system.md#the-draft) in snake order until all 28 cards are taken, each card a line of their background.
- **Changes:** [The draft](#the-draft) — true

## Mechanics

### The draft

- **Type:** bool
- **Per:** world
- **Start:** false
- True once the players have introduced themselves. Done once, on the drive in. Afterwards every player holds the cards they drafted; a card nobody drafted is out of the game.

## Exits

- Continue to [@name](arrival/arrival.md) in [@name](../locations/new-village.md).

