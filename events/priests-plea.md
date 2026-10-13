# The Priest's Plea

**Location:** [@name](../locations/new-village/the-church/the-rectory.md)
**Present:** [@name](../characters/priest.md)
**Available:** Day 4 onward, after [@name](holy-mass.md); fires once.

## Trigger

- A player has shown [@title](../characters/priest.md) [@surname](../characters/priest.md) genuine faith.
- The player has progressed his [bond](../characters/priest.md#bond) by asking counsel, confiding in him, or honouring the church.
- [@title](../characters/priest.md) [@surname](../characters/priest.md) asks for that player alone.

## Hook

- [@title](../characters/priest.md) [@surname](../characters/priest.md) asks the player for a private talk after Mass.
- [@name](../characters/secondary/krystian-rzepka.md) may bring a folded note from him.
- [@title](../characters/priest.md) [@surname](../characters/priest.md) may come to the committee billet.
- He does not ask twice.
- He does not invite the whole committee.

## Setup

- The meeting happens in the rectory beside the church.
- The rectory is small, book-lined, and cold.
- One lamp is lit.
- Rain hits the window.
- [@title](../characters/priest.md) [@surname](../characters/priest.md) pours tea and does not drink it.
- He says the flood may be divine judgment, not engineering failure.
- He cites Noah, Sodom, and other judgment stories.
- He says a place can carry a wrong so long that heaven answers with water.
- He does not name the sin.
- He asks whether a man who has done something unforgivable can still be forgiven.
- He is asking about someone specific.
- He will not say who.
- He may be asking about himself.

## Opportunities

- *(noticed by: [Empathy](../cards/empathy.md))* — [@title](../characters/priest.md) [@surname](../characters/priest.md) has come to a layperson for reassurance a priest is supposed to give. He is frightened.
- *(noticed by: [Culture](../cards/culture.md) OR [History](../cards/history.md))* — every scripture example he reaches for is a judgment narrative. His fear points toward the valley deserving to drown.
- *(noticed by: [Devotion](../cards/devotion.md))* — He is not speaking generally: he knows a specific sin, and he does not name it.
- *(noticed by: [Devotion](../cards/devotion.md))* — He touches his collar: the confessional seal is the wall keeping his knowledge in, and he is exhausted by holding it.
- *(noticed by: [Chainsmoker](../cards/chainsmoker.md) AND [priest-smokes](../clues/clues.md#priest-smokes))* — with the cigarette lit, a smoker reads the brand off the paper at once: premium Carmen, the same the village would name at [@first-name](../characters/ciotka.md)'s door. → Gives: [`priest-smokes-carmen`](../clues/clues.md#priest-smokes-carmen)

## Actions

### Tell him people can be forgiven
- **When:** The player answers his question toward mercy.
- **Outcome:** [@title](../characters/priest.md) [@surname](../characters/priest.md) steadies. Mercy becomes a possible answer to his crisis.
- **Gives:** [`priest-fears-divine-judgment`](../clues/clues.md#priest-fears-divine-judgment)
- **Changes:** [Crisis of Faith](../characters/priest.md#crisis-of-faith) — +2

### Ask him what he needs
- **Outcome:** [@title](../characters/priest.md) [@surname](../characters/priest.md) says the lost must be brought back to God before the water comes, especially those with the most to answer for.
- **Gives:** [`priest-fears-divine-judgment`](../clues/clues.md#priest-fears-divine-judgment)

### Push him to name the sin
- **When:** The player presses him to say what he knows.
- **Outcome:** [@title](../characters/priest.md) [@surname](../characters/priest.md) refuses to betray the confessional and ends the meeting.
- **Changes:** [Crisis of Faith](../characters/priest.md#crisis-of-faith) — −2

### Tell him the valley deserves judgment
- **When:** The player answers his question toward condemnation.
- **Outcome:** [@title](../characters/priest.md) [@surname](../characters/priest.md) leans harder toward judgment.
- **Gives:** [`priest-fears-divine-judgment`](../clues/clues.md#priest-fears-divine-judgment)
- **Changes:** [Crisis of Faith](../characters/priest.md#crisis-of-faith) — −2

### Share his cigarette
- **When:** [@title](../characters/priest.md) [@surname](../characters/priest.md) genuinely trusts the player (mercy supported, or a personal confidence shared in return)
<!-- Prompted by: setup:events/priests-plea.md -->
- **Outcome:** He drops the pretence, takes out a cigarette for himself and offers one to the player. The habit he hides from the village is plain.
- **Gives:** [`priest-smokes`](../clues/clues.md#priest-smokes)
