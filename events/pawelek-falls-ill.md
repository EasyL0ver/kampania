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
- Barbara stays beside him with cloths, water, and unfinished prayers.
- Stefania Kopacz is lucid, upright, and giving orders.
- Stefania has rearranged icons, candles, bread, and water around the bed in a non-Roman Catholic pattern.
- The mirrors are covered.
- Ryszard Dudka arrives within the hour with firewood, clean water, and a blanket.
- Composure cost is 1 for witnessing a sick child with no immediate outside help.
- Pawełek starts at 6 HP when symptoms appear on Day 3 evening.
- Pawełek loses 1 HP per phase without effective treatment.
- At 0 HP, Pawełek dies.
- Stabilizing care with Medicine stops HP loss for the rest of the day and must be repeated each morning.
- Norsulfazol stops HP loss permanently and restores 1 HP per phase.
- Paraskewia's herbs stop HP loss permanently but leave Pawełek asleep and unreachable for the rest of the game.
- At 4 HP or lower, Barbara names the father.

## Opportunities

- **The fever** `(requires: Medicine)` — the symptoms match bacterial dysentery, most likely Shigella; the child needs antibacterial medication and medical dosage guidance. → Gives: [`paweleks-diagnosis`](../clues/clues.md#paweleks-diagnosis)
- **The contamination pattern** `(requires: Medicine and examining Pawełek's symptoms closely)` — the illness points to a concentrated source, not diffuse floodwater runoff. → Gives: [`paweleks-contamination`](../clues/clues.md#paweleks-contamination)
- **The fever fragments** `(requires: Read)` — Pawełek's delirium names round stones, bad water from the ground, a lady who warned him not to drink, and Babcia's song. → Gives: [`paweleks-illness`](../clues/clues.md#paweleks-illness), [`pawelek-wanders`](../clues/clues.md#pawelek-wanders)
- **The Lemko words** `(requires: Language)` — Pawełek repeats conversational Lemko words someone spoke to him in the forest, not words from the sickroom prayers. → Gives: [`paweleks-illness`](../clues/clues.md#paweleks-illness)
- **Babcia's rite** `(requires: Culture)` — Stefania is performing a Lemko healing rite with Greek Catholic sickroom elements. → Gives: [`babcia-mind-returns`](../clues/clues.md#babcia-mind-returns), [`babcia-has-the-words`](../clues/clues.md#babcia-has-the-words)
- **Babcia's lucidity** `(requires: Observation)` — Stefania's dementia has lifted during the crisis in a way ordinary illness does not explain. → Gives: [`babcia-mind-returns`](../clues/clues.md#babcia-mind-returns)
- **Barbara's state** `(requires: Read)` — Barbara is afraid of losing her child and being left with no family, money, or protection.
- **Dudka's clean water** `(requires: Read)` — Dudka brought clean water before anyone asked, and he avoids the floodwater routes that run down from the old village.

## Actions

### Call dr. Sawicki
- **Requires:** Access to the phone at [Wojewoda's office](../locations/pgr-office.md) or permission from [Zbigniew Gajda](../characters/wojewoda.md)
- **Cost:** 1 action
- **Outcome:** [dr. Leon Sawicki](../characters/secondary-characters.md) diagnoses likely dysentery by phone and gives the needed medication and dosage in English terms: Norsulfazol, 0.5 g every four hours.
- **Gives:** Item / Evidence: medication instructions; [`store-has-drug-cabinet`](../clues/clues.md#store-has-drug-cabinet)

### Stabilize Pawełek
- **Requires:** Medicine
- **Cost:** 2 actions per day
- **Outcome:** The committee manages hydration and fever enough to stop HP loss for the rest of the day.
- **Gives:** World State Change: Pawełek's HP drain pauses until the next morning

### Comfort Barbara
- **Requires:** Nothing
- **Cost:** Free
- **Outcome:** Barbara accepts immediate support and can function long enough to answer direct questions.
- **Gives:** NPC State Change: Barbara is steadier for the scene and more willing to cooperate with the committee

### Barbara names the father
- **Requires:** Pawełek at 4 HP or lower
- **Cost:** Free
- **Outcome:** Barbara names Marek Gajda as Pawełek's father because Helena has the medicine and family pressure may open the cabinet.
- **Gives:** [`marek-is-paweleks-father`](../clues/clues.md#marek-is-paweleks-father); Scene Unlock: Marek robs the store path

### Watch Babcia work
- **Requires:** Present during the crisis and Language or Culture
- **Cost:** Free
- **Outcome:** Babcia's sickroom practice preserves Lemko prayer and healing knowledge that has not been publicly practiced here since 1947.
- **Gives:** [`babcia-mind-returns`](../clues/clues.md#babcia-mind-returns), [`babcia-has-the-words`](../clues/clues.md#babcia-has-the-words)

### Ask Helena for Norsulfazol
- **Requires:** Knowing what medication is needed through Medicine or Call dr. Sawicki; [Ciotka found dead](ciotka-found-dead.md) has triggered
- **Cost:** 1 action
- **Outcome:** Helena confirms she has the medicine and offers it in exchange for a death certificate naming heart failure for Janina and a committal recommendation for Edek.
- **Gives:** NPC State Change: Helena turns the medicine into leverage over the committee

### Accept Helena's deal
- **Requires:** Helena has offered the medicine deal
- **Cost:** Free
- **Outcome:** Helena gives the Norsulfazol and the committee signs false documents about Janina and Edek.
- **Gives:** Item: Norsulfazol tablets; World State Change: the committee becomes complicit in burying the pills and making Edek disappear on paper

### Refuse Helena's deal
- **Requires:** Helena has offered the medicine deal
- **Cost:** Free
- **Outcome:** Helena withholds the medicine under the cover of prescription rules and informs Zbigniew that the committee will not cooperate.
- **Gives:** NPC State Change: Helena and Zbigniew shift into damage control; Scene Unlock: find another medicine route before Pawełek worsens

### Marek robs the store
- **Requires:** Marek has been told he is the father and Pawełek is dying
- **Cost:** Free
- **Outcome:** Marek first leaves Helena without medicine, then returns at night, breaks the pharmaceutical cabinet, steals Norsulfazol, and brings it to Barbara's house.
- **Gives:** Item: Norsulfazol tablets; NPC State Change: Marek chooses Barbara and Pawełek over the Gajda family; World State Change: Helena closes the store and gains leverage over Marek

### Alternative: Paraskewia's herbs
- **Requires:** [Paraskewia](../characters/hag.md) is alive and reachable, and a player knows or suspects she has healing knowledge
- **Cost:** 1 action
- **Outcome:** Paraskewia prepares herbs that stop the illness from worsening but leave Pawełek asleep and unreachable for the rest of the game.
- **Gives:** World State Change: Pawełek survives without Gajda leverage; NPC State Change: Paraskewia has openly helped Barbara's child

### Send Tadek to the store
- **Requires:** [`wujas-slept-with-barbara`](../clues/clues.md#wujas-slept-with-barbara) and successful Sweettalk or Intimidate check on Tadek
- **Cost:** 1 action
- **Outcome:** Tadek asks Helena for children's medicine, and Helena gives it immediately to avoid pushing him toward confession.
- **Gives:** Item: Norsulfazol tablets; NPC State Change: Helena increases surveillance on Tadek; NPC State Change: Tadek has acted to help Barbara and Pawełek

### Alternative: Raid the store
- **Requires:** Discretion or Violence, and knowledge of what medication is needed
- **Cost:** 1 action
- **Outcome:** The committee takes Norsulfazol from the store without Helena's consent and damages its relationship with the village supply chain.
- **Gives:** Item: Norsulfazol tablets; NPC State Change: Helena becomes hostile to the committee

### Investigate the water source
- **Requires:** Geology or Engineering
- **Cost:** 1 action
- **Outcome:** The contamination tracks uphill to %OLD_VILLAGE%; the old well is overflowing and sending dark water downhill through the forest.
- **Gives:** [`well-water-contaminated`](../clues/clues.md#well-water-contaminated), [`paweleks-contamination`](../clues/clues.md#paweleks-contamination), [`old-village-exists`](../clues/clues.md#old-village-exists), [`butcher-visits-the-well`](../clues/clues.md#butcher-visits-the-well)

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

