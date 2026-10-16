# The Priest's Plea

**Location:** [@name](../locations/new-village/the-church/the-rectory.md)
**Present:** [@name](../characters/priest.md)

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
- His hand keeps going to his collar.[](#collar-touch-reveals-confessional-burden)
- He says the flood may be divine judgment, not engineering failure.
- He cites Noah, Sodom, and other judgment stories.[](#frightened-priest-reaching-for-judgment)
- He says a place can carry a wrong so long that heaven answers with water.
- He does not name the sin.[](#unnamed-specific-sin-withheld)
- He asks whether a man who has done something unforgivable can still be forgiven.[](#priest-seeks-laypersons-reassurance)
- He is asking about someone specific.
- He will not say who.
- He may be asking about himself.

## Opportunities

### Priest seeks layperson's reassurance
- **Noticed by:** [Empathy](../cards/empathy.md)
- **When:** setup:events/priests-plea.md
- **Outcome:** [@title](../characters/priest.md) [@surname](../characters/priest.md) has come to a layperson for reassurance a priest is supposed to give. He is frightened.

### Frightened priest reaching for judgment
- **Noticed by:** [Culture](../cards/culture.md) OR [History](../cards/history.md)
- **When:** setup:events/priests-plea.md
- **Outcome:** every scripture example he reaches for is a judgment narrative. His fear points toward the valley deserving to drown.

### Unnamed specific sin withheld
- **Noticed by:** [Devotion](../cards/devotion.md)
- **When:** setup:events/priests-plea.md
- **Outcome:** He is not speaking generally: he knows a specific sin, and he does not name it.

### Collar touch reveals confessional burden
- **Noticed by:** [Devotion](../cards/devotion.md)
- **When:** setup:events/priests-plea.md
- **Outcome:** He touches his collar: the confessional seal is the wall keeping his knowledge in, and he is exhausted by holding it.

### Cigarette brand recognised as Carmen
- **Noticed by:** [Chainsmoker](../cards/chainsmoker.md) AND [priest-smokes](../clues/clues.md#priest-smokes)
- **When:** [Share his cigarette](#share-his-cigarette)
- **Outcome:** with the cigarette lit, a smoker reads the brand off the paper at once: premium Carmen, the same the village would name at [@first-name](../characters/ciotka.md)'s door.
- **Gives:** [`priest-smokes-carmen`](../clues/clues.md#priest-smokes-carmen)

## Actions

### Tell him people can be forgiven
- **Outcome:** [@title](../characters/priest.md) [@surname](../characters/priest.md) steadies. Mercy becomes a possible answer to his crisis.
- **Gives:** [`priest-fears-divine-judgment`](../clues/clues.md#priest-fears-divine-judgment)
- **Changes:** [Crisis of Faith](../characters/priest.md#crisis-of-faith) — +2

### Ask him what he needs
- **Outcome:** [@title](../characters/priest.md) [@surname](../characters/priest.md) says the lost must be brought back to God before the water comes, especially those with the most to answer for.
- **Gives:** [`priest-fears-divine-judgment`](../clues/clues.md#priest-fears-divine-judgment)

### Push him to name the sin
- **Outcome:** [@title](../characters/priest.md) [@surname](../characters/priest.md) refuses to betray the confessional and ends the meeting.
- **Changes:** [Crisis of Faith](../characters/priest.md#crisis-of-faith) — −2

### Tell him the valley deserves judgment
- **Outcome:** [@title](../characters/priest.md) [@surname](../characters/priest.md) leans harder toward judgment.
- **Gives:** [`priest-fears-divine-judgment`](../clues/clues.md#priest-fears-divine-judgment)
- **Changes:** [Crisis of Faith](../characters/priest.md#crisis-of-faith) — −2

### Share his cigarette
- **Requires:** [Bond: priest](../cards/bond-priest.md)
<!-- Prompted by: hook:characters/priest.md -->
- **Outcome:** He drops the pretence, takes out a cigarette for himself[](#cigarette-brand-recognised-as-carmen) and offers one to the player. The habit he hides from the village is plain.
- **Gives:** [`priest-smokes`](../clues/clues.md#priest-smokes)
