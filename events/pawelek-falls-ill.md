# Pawełek Falls Ill

**Location:** [Barbara's house](../locations/barbaras-house.md)
**Present:** [Barbara Kopacz](../characters/barbara.md), [Stefania Kopacz](../characters/babcia.md), [Pawełek Kopacz](../characters/pawelek.md)
**Available:** Day 3 onward, after [the flood](the-flood.md).

## Trigger

- Pawełek wandered unsupervised toward %OLD_VILLAGE% while Barbara was at the PGR.
- Rising groundwater pushed contaminated water up around the old well.
- Pawełek drank from pooled water near the well.
- By evening Pawełek has fever.
- By night Pawełek is delirious.

## Hook

- Word spreads through the village that Barbara's boy is sick.
- Players can hear the news at the [PGR](../locations/pgr-farm.md), [the store](../locations/the-store.md), or from any nearby NPC.
- [Ryszard Dudka](../characters/neighbour.md) may come to find the committee and ask whether anyone is a doctor.

## Setup

- Barbara's house is being used as a sickroom.
- Pawełek lies on Barbara's bed, sweating, feverish, and breathing fast.
- In his fever he raves, half-words about a lady who told him not to drink and about round stones.
- Barbara stays beside him with cloths, water, and unfinished prayers.
- Stefania Kopacz is lucid, upright, and giving orders.
- Stefania has rearranged icons, candles, bread, and water around the bed in a non-Roman Catholic pattern.
- The mirrors are covered.
- Ryszard Dudka arrives within the hour with firewood, clean water, and a blanket.
- Composure cost is 1 for witnessing a sick child with no immediate outside help.

## Mechanics

- Pawełek starts at 6 HP when symptoms appear on Day 3 evening.
- Pawełek loses 1 HP per phase without effective treatment.
- At 0 HP, Pawełek dies.
- Symptoms surface as he declines: fever at onset (6 HP), muscle pain (5 HP), bloodshot eyes (4 HP), yellowing skin (3 HP), dark urine (2 HP).
- Stabilizing care with Medicine stops HP loss for the rest of the day and must be repeated each morning.
- Penicillin, given at a child's dose, stops HP loss permanently and restores 1 HP per phase (see the **Give Pawełek the penicillin** action).
- Paraskewia's herbs stop HP loss permanently but leave Pawełek asleep and unreachable for the rest of the game.
- At 4 HP or lower, Barbara names the father.

## Opportunities

- **His eyes** `(requires: Pawełek at 4 HP or lower)` `(prompted by: aware:events/pawelek-falls-ill.md)` — the whites of his eyes have gone bloodshot and crimson. → Gives: [`pawelek-eyes-are-red`](../clues/clues.md#pawelek-eyes-are-red); `(requires: Medicine)` also gives [`pawelek-eyes-not-crying`](../clues/clues.md#pawelek-eyes-not-crying)
- **The colour of him** `(requires: Pawełek at 3 HP or lower)` `(prompted by: aware:events/pawelek-falls-ill.md)` — his skin and the whites of his eyes have turned yellow. → Gives: [`pawelek-turns-yellow`](../clues/clues.md#pawelek-turns-yellow); `(requires: Medicine)` also gives [`pawelek-organs-failing`](../clues/clues.md#pawelek-organs-failing)
- **The look of it** `(requires: Survival and Pawełek at 3 HP or lower)` `(prompted by: aware:events/pawelek-falls-ill.md)` — a woodsman reads the yellowing two ways and cannot settle it: a sickness that comes from foul water, or a child who ate a death cap in the woods. → Gives: [`pawelek-got-it-from-water`](../clues/clues.md#pawelek-got-it-from-water), [`pawelek-ate-death-cap`](../clues/clues.md#pawelek-ate-death-cap)
- **The mark of poison** `(requires: Violence and Pawełek at 3 HP or lower)` `(prompted by: aware:events/pawelek-falls-ill.md)` — you have seen what the yellow rat poison does to a body; the boy's signs could be phosphorus, and that would mean a hand behind it. → Gives: [`pawelek-phosphorus-poison`](../clues/clues.md#pawelek-phosphorus-poison)
- **The signs on the child** `(requires: Superstitious)` `(prompted by: aware:events/pawelek-falls-ill.md)` — he raves of a lady and round stones, and he alone sickens while everyone else is spared. To you the meaning is plain: this is the well's work, not a fever. → Gives: [`pawelek-was-possessed`](../clues/clues.md#pawelek-was-possessed)
- **His muttering** `(prompted by: aware:events/pawelek-falls-ill.md)` — sit close and listen through the fever. He cries for a lady from the woods who gave him bread and told him not to drink, then trails off into sounds that make no sense. → Gives: aware:characters/hag.md

## Actions

### Examine him
- **Requires:** Hands on Pawełek, touching and moving him
- **Prompted by:** aware:events/pawelek-falls-ill.md
- **Cost:** 1 action
- **Outcome:** His skin is burning hot, and once the muscle pain has set in he screams when you move his legs and back. What you learn depends on how far gone he is. A medic examining him once he is yellowing reads that this is no common sickness.
- **Gives:** [`pawelek-burns-with-fever`](../clues/clues.md#pawelek-burns-with-fever) at 6 HP or lower; [`pawelek-in-muscle-pain`](../clues/clues.md#pawelek-in-muscle-pain) at 5 HP or lower; `(requires: Medicine)` [`pawelek-looks-like-common-fever`](../clues/clues.md#pawelek-looks-like-common-fever) at 6-5 HP, [`pawelek-fever-not-passing`](../clues/clues.md#pawelek-fever-not-passing) at 4 HP, [`pawelek-not-common-sickness`](../clues/clues.md#pawelek-not-common-sickness) at 3 HP or lower

### Tend to him
- **Requires:** Medicine, or helping Barbara nurse him
- **Prompted by:** aware:events/pawelek-falls-ill.md
- **Cost:** 1 action
- **Outcome:** Cool cloths, water, keeping him still. Nothing you do slows the fever; he keeps sinking on the clock all the same. At 2 HP or lower you see he passes little urine, dark as strong tea.
- **Gives:** [`pawelek-passes-dark-urine`](../clues/clues.md#pawelek-passes-dark-urine) (only at 2 HP or lower)

### Perform a cleansing ritual
- **Requires:** Superstitious
- **Prompted by:** [`pawelek-needs-a-cleansing-ritual`](../clues/clues.md#pawelek-needs-a-cleansing-ritual)
- **Cost:** 1 action
- **Outcome:** You work the old warding rite over the boy. It does nothing for his fever. But Stefania, silent in her chair, watches, then corrects your hands and your words and takes up the prayer herself. She knows this rite far better than you do.
- **Gives:** [`babcia-is-lemko`](../clues/clues.md#babcia-is-lemko); [`babcia-has-the-words`](../clues/clues.md#babcia-has-the-words)

### Give Pawełek the penicillin
- **Requires:** Holding the [penicillin](../items/penicillin.md), and [`pawelek-needs-penicillin`](../clues/clues.md#pawelek-needs-penicillin)
- **Cost:** 1 action
- **Outcome:** You give the boy the penicillin at a child's dose. The fever breaks. His HP loss stops for good and he begins to recover.
- **Gives:** World State Change: Pawełek is cured.

## Exits

- Return to [Barbara's house](../locations/barbaras-house.md) while Pawełek's HP clock continues.
- Go to [the store](../locations/the-store.md) for medicine.
- Go to [Zbigniew Gajda's office](../locations/pgr-office.md) to call dr. Sawicki.
- Go toward [%OLD_VILLAGE%](../locations/old-village-ruins.md) to investigate the water.
- Go to [Paraskewia](../characters/hag.md) if the herbal route is available.

## If Missed

- Pawełek's HP drains by 1 per phase until treated or dead.
- Barbara eventually goes to Helena directly and accepts whatever terms Helena sets.
- The committee loses the medicine-leverage subplot if they never respond.

