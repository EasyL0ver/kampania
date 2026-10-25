# Libation

**Applies to:** events

## Description

A drinking session played round by round: a bottle goes on the table, everyone drinks or bows out, and only then does the next bottle open.

## Mechanics

### Round

- **Type:** int
- **Per:** world
- **Start:** 0
- The round under way; 0 until the first bottle opens. Moves at the session can be tied to a round reached.

### Drinking rounds

- **Type:** rule
- Every round, the first included, needs a bottle: someone spends an [@name](alcohol.md) item on it ([Open a bottle of bimber](#open-a-bottle-of-bimber), [Open a bottle of vodka](#open-a-bottle-of-vodka)). It is shared as [any bottle](alcohol.md#sharing-a-bottle).
- In each round every player present either drinks ([Drink](#drink)), steps out of the scene, or has passed out. The next round opens only once every player present has done one of those.
- What is said in a round reaches only the players who drank in it.

## Actions

### Open a bottle of bimber
- **Cost:** [@name](../items/bimber.md)
- **Outcome:** A bottle goes on the table and the next round is poured.
- **Changes:** [Round](#round) — +1

### Open a bottle of vodka
- **Cost:** [@name](../items/vodka.md)
- **Outcome:** A bottle goes on the table and the next round is poured.
- **Changes:** [Round](#round) — +1

### Drink
- **Outcome:** You knock back your share with the rest of them.
- **Gives:** [Drunk](../cards/drunk.md)
