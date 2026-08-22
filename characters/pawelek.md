# Pawełek Kopacz

**Type:** Named character — child

## Vital Statistics

- **Born:** 1963
- **Age in 1967:** 4
- **Lives in:** [Barbara Kopacz's house](../locations/barbaras-house.md) — with [Barbara Kopacz](barbara.md) (mother), [Stefania Kopacz](babcia.md) (grandmother)
- **Settled:** Born 1963 in village

## Character

Bright, fearless four-year-old who wanders too far and repeats things without understanding them. His official father is unknown; his real father is Tadek. He becomes a ticking clock when the contaminated water makes him sick.

## Appearance

- **Clothes:** Oversized hand-me-down shirt with rolled sleeves, shorts held up with twine, bare feet black with mud, pockets full of stones and dead beetles
- **Hair & face:** Sandy-brown hair cut unevenly with kitchen scissors and always in his eyes; round face, gap-toothed grin, skinned knees
- **Carriage:** Runs everywhere, climbs everything, grabs your hand and drags you; no concept of personal space or boundaries

He mimics sounds perfectly: Babcia's prayers, bird calls, and adult conversations replayed without understanding.

## Opinions

- **[Barbara Kopacz](barbara.md)** — Mama is my whole world. When she smiles, I am happy. When she is tired, I climb into her lap.
- **[Stefania Kopacz](babcia.md)** — Babcia makes sounds and I copy them. It is a game, but sometimes she holds my face and her eyes get wet.
- **[Ryszard Dudka](neighbour.md)** — The nice man next door brings wood and fixes things. He lets me hold nails.
- **[Marek Gajda](junior.md)** — He visits Mama sometimes. He does not talk to me.
- **[Tadek Gajda](wujas.md)** — He is just a man in the village. I do not know him, and he does not know me.
- **[Paraskewia](hag.md)** — The lady in the trees gave me berries and talked like Babcia does. She is nice, and nobody knows I saw her.

## Mechanics

### Health Points

**Ticking clock mechanic.** Tracks Pawełek's condition after he falls ill ([event](../events/pawelek-falls-ill.md)).

**Starts at 6 HP.** Triggers Day 3 evening. **Loses 1 HP per phase.**

| HP | State |
|---|---|
| 6 | Fever, restless. Babbling, lucid intervals — all delirium clues available |
| 5 | Worse, sweating. Lucid intervals shorter |
| 4 | Cycling hard. Babbling stops — only moans. **Barbara names the father** |
| 3 | Dehydrated, limp. Barbara non-functional |
| 2 | Unresponsive. Last chance for medicine |
| 1 | Convulsions. Medicine still works but recovery slow and uncertain |
| 0 | **Dead** |

### Modifiers

- **Stabilize (Medicine skill):** **Drain stops for the rest of the day.** Resets next morning — needs to be re-applied daily. 2 actions per day.
- **Norsulfazol (from Helena/robbery/raid/Tadek):** Drain stops permanently. **+1 HP per phase.** Full recovery.
- **Paraskewia's herbs:** Drain stops permanently. No HP recovery — stays at current HP. Pawełek sleeps, unreachable rest of game.
- **No treatment:** 6 phases (1.5 days) → dead.
- **Stabilize only:** Buys one day at a time. HP doesn't drop but doesn't recover. Miss a day → drain resumes.

## Opportunities

- **Babcia's sounds** `(requires: evening with Pawełek and Babcia and Language)` — Pawełek reproduces Babcia's prayer fragments with eerie accuracy. A child is acting as an unconscious vessel for a dying language.
- **Barbara watching Babcia and Pawełek** `(requires: evening with Pawełek and Babcia and Read)` — [Barbara](barbara.md) watches from the kitchen. She does not understand what Babcia says either, and she is watching her son become part of something she was never part of.
- **Medicine diagnosis** `(requires: Stabilize Pawełek and Medicine)` — The illness will not resolve on its own in a child this size. He needs antibacterial medication; stabilization only buys time. → Gives: [paweleks-diagnosis](../clues/clues.md#paweleks-diagnosis)
- **Contamination pattern** `(requires: Stabilize Pawełek and Medicine)` — The bacterial load points to decomposing organic matter in a confined water source over years: a cistern, cellar, or well filled with something large and organic. → Gives: [paweleks-contamination](../clues/clues.md#paweleks-contamination)
- **Water table mapping** `(requires: Ask about drinking water and Geology)` — Contamination follows the water table downhill from the old village. Mapping the flow points toward [%OLD_VILLAGE%](../locations/old-village-ruins.md) and [the well](../locations/the-well.md). → Gives: [old-village-exists](../clues/clues.md#old-village-exists)
- **Mud on his shoes** `(requires: Ask about drinking water and Observation)` — His shoes by the door carry dark, silty mud with stone dust fragments: forest-path mud with worked stone. → Gives: [old-village-exists](../clues/clues.md#old-village-exists)

## Actions

### Build with Pawełek
- **Requires:** Morning or afternoon, Pawełek playing with stones, and **Engineering**
- **Cost:** Free
- **Outcome:** The player helps him build the circular pattern he has been copying from memory. An engineer recognizes the pattern as a well rim.
- **Gives:** [pawelek-wanders](../clues/clues.md#pawelek-wanders), [old-village-exists](../clues/clues.md#old-village-exists)

### Play cops with Pawełek
- **Requires:** **Enforcement**
- **Cost:** Free
- **Outcome:** Through play, he acts out men around a fire, shouting, bottles, and bad guys hiding in the forest.
- **Gives:** [drinking-crew-heads-to-forest](../clues/clues.md#drinking-crew-heads-to-forest)

### Speak Lemko with Pawełek
- **Requires:** **Language**
- **Cost:** Free
- **Outcome:** He recognizes the speech as like Babcia's and like the lady's. He repeats softer words from an old woman in the forest who has been kind to him.
- **Gives:** [hag-exists](../clues/clues.md#hag-exists)

### Play with Pawełek
- **Requires:** Nothing
- **Cost:** 1 action
- **Outcome:** The player spends time with him in chase, hide-and-seek, or throwing stones at a tree. He is delighted that an adult plays with him.
- **Gives:** NPC State Change: Pawełek treats the player as a trusted playmate for actions that require trust.

### Stabilize Pawełek
- **Requires:** **Medicine**, Pawełek is sick
- **Cost:** 2 actions
- **Outcome:** Clean water, salt, boiled cloths, cool compresses, controlled hydration, and monitoring stop the HP drain for the rest of the day. The effect resets next morning.
- **Gives:** NPC State Change: [Barbara](barbara.md) trusts the committee and cooperates fully.

### Ask about drinking water
- **Requires:** Pawełek is sick, HP 5-6 (lucid), and Pawełek trusts the player or the player uses Sweettalk
- **Cost:** Free
- **Outcome:** He says he drank by the round stones where the water comes up, and that the lady told him not to drink it but he was thirsty.
- **Gives:** [well-water-contaminated](../clues/clues.md#well-water-contaminated), [old-village-exists](../clues/clues.md#old-village-exists)

## Bond

- [ ] Get on the ground and play with him — blocks, sticks, mud, whatever he's doing
- [ ] Make him laugh — funny faces, silly voices, exaggerated reactions
- [ ] Give him something small — a shiny stone, a wrapped sweet, a button
