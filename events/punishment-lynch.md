# The Lynch

**Location:** [PGR office](../locations/pgr-office.md), then [the well](../locations/the-well.md)
**Present:** [Ryszard Dudka](../characters/neighbour.md), [Zbigniew Gajda](../characters/wojewoda.md) (state from [Irena's confrontation](irena-confronts-wojewoda.md)), [Barbara Kopacz](../characters/barbara.md) (if not warned), men from [Tadek's](../characters/wujas.md) drinking circle, target from [Dudka's targeting score](../characters/neighbour.md#lynch-targets)
**Available:** Night of Day 6; fires once.

## Trigger

- The flood, the well, dreams, and any fresh body taken to the water push [Ryszard Dudka](../characters/neighbour.md) into action.
- Dudka gathers angry drunk men.
- The mob goes first to the [PGR office](../locations/pgr-office.md) for [Zbigniew Gajda](../characters/wojewoda.md)'s word.
- Someone goes into the well tonight unless the players redirect the outcome.

## Hook

- During Day 6, the drinking circle turns louder and more purposeful.
- If a player [was warned by Barbara](barbara-warns-the-players.md), the warning gives the evening to prepare.
- If not warned, lamps move on the road after dark.
- Boots cross gravel.
- Dogs bark down the valley.
- [Dudka's](../characters/neighbour.md) rifle is missing from its pegs.
- The movement converges on the yard in front of the office.
- This is perceivable anywhere in %NEW_VILLAGE% after dark.
- **Composure:** 2

## Setup

- The mob starts at the [PGR office](../locations/pgr-office.md).
- The mob wants the sołtys to bless, lead, or stop the killing.
- If Zbigniew is braced, the office is dark and locked; he stays inside.
- If Zbigniew is breaking, he comes onto the steps and tries to command the crowd.
- If Zbigniew is breaking, his authority fails.
- If Dudka is [Humiliated](../characters/neighbour.md#humiliated) or has already acted at [the well](well-confrontation.md), the crowd can turn on Zbigniew.
- Otherwise, the crowd shoulders past Zbigniew and moves toward the well.
- The crowd moves down the road toward %OLD_VILLAGE%.
- Dudka is at the front with the rifle.
- The chosen target is dragged, pushed, or guarded by the mob.
- If Barbara was [warned and sent home](barbara-warns-the-players.md), she is absent.
- If no player ever bonded with Barbara, she stands at Dudka's shoulder.
- Barbara's presence makes the mob harder to turn.

## Opportunities

- **The office state** `(requires: Read)` — the dark locked office or the man on the steps shows whether [Irena](irena-confronts-wojewoda.md) reached Zbigniew.
- **The mob's structure** `(requires: Observation)` — only a handful of men are driving the lynch. Most are drunk followers. Dudka is the main driver unless [Barbara](#setup) is present.
- **The target** `(requires: Read or Enforcement)` — the target may be guilty, innocent, or one of the players. The mob treats the distinction as irrelevant.
- **Dudka's face** `(requires: Read)` — he is acting from guilt over his own inaction, not certainty.
- **The repetition** `(requires: History or Culture)` — the same drink, dark road, and well repeat the 1954 pattern.

## Actions

### Back Zbigniew on the steps
- **Requires:** Zbigniew is breaking and a player stands with him.
- **Cost:** 1 composure
- **Outcome:** The crowd hesitates longer at the office.
- **Gives:** World State Change: the mob is one step more turnable at the well; NPC State Change: if Zbigniew lives, he remembers who stood with him

### Feed Zbigniew to the mob
- **Requires:** [`wife-protects-husband`](../clues/clues.md#wife-protects-husband) or other proof Zbigniew was one of the killers.
- **Cost:** Free
- **Outcome:** The crowd's aim swings toward Zbigniew at the office.
- **Gives:** World State Change: Zbigniew enters [Dudka's targeting score](../characters/neighbour.md#lynch-targets) high; World State Change: the leash on [Rezeń](../characters/butcher.md) is cut

### Turn the aim onto a perpetrator
- **Requires:** Proof that points at Rezeń, a sibling, Helena, or a breaking Zbigniew.
- **Cost:** Free
- **Outcome:** The crowd accepts a guilty target and carries that target to the well.
- **Gives:** World State Change: the lynch completes on a perpetrator; Ending Progress: Punishment / mob-justice ending advances

### Turn the aim off an innocent
- **Requires:** The current target from [Dudka's targeting score](../characters/neighbour.md#lynch-targets) is innocent, and the players provide a different name with weight.
- **Cost:** 1 composure
- **Outcome:** The mob leaves the innocent target and takes the replacement target.
- **Gives:** World State Change: the target shifts; Ending Progress: the well still takes a body

### Put yourself between them and the target
- **Requires:** A player physically steps in front of the rifle.
- **Cost:** Grave
- **Outcome:** The target can be saved; the mob may take the player instead.
- **Gives:** World State Change: the original target is saved; World State Change: a player may die in the target's place

### Convince Dudka justice will be delivered
- **Requires:** Bond with [Ryszard Dudka](../characters/neighbour.md#bond), or Dudka is not [Humiliated](../characters/neighbour.md#humiliated), or Dudka has been [Uplifted](../characters/neighbour.md#uplift-ryszard); and proof that justice is already moving.
- **Cost:** 1 composure
- **Outcome:** Dudka lowers the rifle, gives testimony, and the denied mob turns on him.
- **Gives:** World State Change: the intended target lives; World State Change: [Dudka](../characters/neighbour.md) dies in the well; Ending Progress: the truth is on record toward [Justice](../story-facts/game-system.md#endings)

### Let it run
- **Requires:** Nothing
- **Cost:** Free
- **Outcome:** The mob goes to the well and the target from [Dudka's targeting score](../characters/neighbour.md#lynch-targets) goes in.
- **Gives:** World State Change: the lynch completes; Ending Progress: Punishment / mob-justice ending advances

## Exits

- From the [PGR office](../locations/pgr-office.md) to [the well](../locations/the-well.md).
- After the body goes in, continue to [The Ritual](the-ritual.md), [The Odpust](the-odpust.md), or [The Flood](the-flood.md), depending on the endgame path.
- If the players built a justice path, continue toward the [Justice](../story-facts/game-system.md#endings) ending.

## If Missed

- The lynch still happens.
- The target is decided by [Dudka's targeting score](../characters/neighbour.md#lynch-targets).
- If Zbigniew was braced, he arrives after the body is in the well and disperses the spent crowd.
- If Zbigniew was breaking and targeted, he dies in the well.
- If Zbigniew was breaking and not targeted, he survives without authority.
- The final day starts with a fresh body in the well.
