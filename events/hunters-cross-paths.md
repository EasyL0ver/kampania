# The Hunters Cross Paths

**Location:** [Old Village Ruins](../locations/old-village-ruins.md)
**Present:** [Ryszard Dudka](../characters/neighbour.md), [Stanisław Rezeń](../characters/butcher.md), players (with whichever hunter they followed)
**Available:** During either [The Hunt with Rezeń](hunt-with-rezen.md) or [The Hunt with Dudka](hunt-with-dudka.md).

## Trigger

- Dudka and Rezeń are hunting the same wolf pack on the same day.
- Dudka finally gets a clear shot at the pack.
- Rezeń's dogs enter the clearing and scatter the wolves.

## Setup

- Dudka is hidden with his rifle trained on the wolves.
- The wolves are in the open and unaware of Dudka.
- Rezeń's three dogs crash through the brush and drive the wolves into the trees.
- Dudka's shot is lost.
- Dudka confronts Rezeń with the rifle in his hands.
- Rezeń goes still, keeps his knife in hand, and lets the dogs fan out around him.
- Both men are close enough to violence that one wrong movement can start a killing.

## Opportunities

- **The standoff** `(requires: Read)` — Dudka is louder, but Rezeń is the one ready to kill. → Gives: [`butcher-is-dangerous`](../clues/clues.md#butcher-is-dangerous)
- **Dudka's fury** `(requires: Observation)` — Dudka openly names Rezeń as more dangerous than the wolves. → Gives: [`dudka-despises-rezen`](../clues/clues.md#dudka-despises-rezen)
- **Rezeń's cold** `(requires: Observation or Enforcement)` — Rezeń's breathing stays even, his eyes stay flat, and the knife is already out. → Gives: [`butcher-is-dangerous`](../clues/clues.md#butcher-is-dangerous)
- **The dogs** `(requires: Read)` — if the standoff turns violent, it will be Rezeń and three trained dogs against Dudka. → Gives: [`butcher-is-dangerous`](../clues/clues.md#butcher-is-dangerous)

## Actions

### Get between them
- **Requires:** A player steps into the gap or clearly orders both men down
- **Cost:** 1 action
- **Outcome:** The standoff ends before blood is drawn; Rezeń pockets the knife and Dudka is denied the public humiliation of losing to him.
- **Gives:** World State Change: Dudka and Rezeń are separated with no one hurt; [`butcher-is-dangerous`](../clues/clues.md#butcher-is-dangerous)

### Let it burn
- **Requires:** The players choose not to intervene
- **Cost:** Free
- **Outcome:** Rezeń ends the standoff by mocking Dudka for failing to stop him in the past; Dudka is publicly humiliated and Rezeń leaves with his dogs.
- **Gives:** [`butcher-is-dangerous`](../clues/clues.md#butcher-is-dangerous), [`dudka-despises-rezen`](../clues/clues.md#dudka-despises-rezen), [`rezen-mocks-an-old-failure`](../clues/clues.md#rezen-mocks-an-old-failure); NPC State Change: [Dudka](../characters/neighbour.md) is Humiliated; Ending Progress: Dudka moves closer to the [lynch ending](punishment-lynch.md)

## Exits

- Return to [The Hunt with Rezeń](hunt-with-rezen.md), if the players followed Rezeń.
- Return to [The Hunt with Dudka](hunt-with-dudka.md), if the players followed Dudka.
- Continue toward the [old village ruins](../locations/old-village-ruins.md), if the players follow the deeper forest route.

## If Missed

- Rezeń's dogs still ruin Dudka's shot.
- Rezeń humiliates Dudka without a player witness.
- Dudka gains the Humiliated status and moves closer to the [lynch](punishment-lynch.md).
