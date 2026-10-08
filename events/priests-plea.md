# The Priest's Plea

**Location:** [The Rectory](../locations/the-rectory.md)
**Present:** [ks. Władysław Pająk](../characters/priest.md), one player with progressed [bond](../characters/priest.md#bond)
**Available:** Day 4 onward, after [Holy Mass](holy-mass.md); fires once.

## Trigger

- A player has shown ks. Pająk genuine faith.
- The player has progressed his [bond](../characters/priest.md#bond) by asking counsel, confiding in him, or honouring the church.
- ks. Pająk asks for that player alone.

## Hook

- ks. Pająk asks the player for a private talk after Mass.
- [Krystian](../characters/secondary/krystian-rzepka.md) may bring a folded note from him.
- ks. Pająk may come to the committee billet.
- He does not ask twice.
- He does not invite the whole committee.

## Setup

- The meeting happens in the rectory beside the church.
- The rectory is small, book-lined, and cold.
- One lamp is lit.
- Rain hits the window.
- ks. Pająk pours tea and does not drink it.
- He says the flood may be divine judgment, not engineering failure.
- He cites Noah, Sodom, and other judgment stories.
- He says a place can carry a wrong so long that heaven answers with water.
- He does not name the sin.
- He asks whether a man who has done something unforgivable can still be forgiven.
- He is asking about someone specific.
- He will not say who.
- He may be asking about himself.

## Opportunities

- **The reversed confession** `(noticed by: [Empathy](../cards/empathy.md))` — ks. Pająk has come to a layperson for reassurance a priest is supposed to give. He is frightened.
- **The judgment pattern** `(noticed by: [Culture](../cards/culture.md) OR [History](../cards/history.md))` — every scripture example he reaches for is a judgment narrative. His fear points toward the valley deserving to drown.
- **The unnamed sin** `(noticed by: [Devotion](../cards/devotion.md))` — he is not speaking generally. He knows a specific sin.
- **The collar gesture** `(noticed by: [Devotion](../cards/devotion.md))` — the confessional seal is the wall keeping his knowledge in. He is exhausted by holding it.
- **The brand on the paper** `(noticed by: [Chainsmoker](../cards/chainsmoker.md) AND [priest-smokes](../clues/clues.md#priest-smokes))` — with the cigarette lit, a smoker reads the brand off the paper at once: premium Carmen, the same the village would name at Janina's door. → Gives: [`priest-smokes-carmen`](../clues/clues.md#priest-smokes-carmen)

## Actions

### Tell him people can be forgiven
- **When:** The player answers his question toward mercy.
- **Outcome:** ks. Pająk steadies. Mercy becomes a possible answer to his crisis.
- **Gives:** [`priest-fears-divine-judgment`](../clues/clues.md#priest-fears-divine-judgment)
- **Changes:** [Crisis of Faith](../characters/priest.md#crisis-of-faith) — +2

### Ask him what he needs
- **Outcome:** ks. Pająk says the lost must be brought back to God before the water comes, especially those with the most to answer for.
- **Gives:** [`priest-fears-divine-judgment`](../clues/clues.md#priest-fears-divine-judgment)

### Push him to name the sin
- **When:** The player presses him to say what he knows.
- **Outcome:** ks. Pająk refuses to betray the confessional and ends the meeting.
- **Changes:** [Crisis of Faith](../characters/priest.md#crisis-of-faith) — −2

### Tell him the valley deserves judgment
- **When:** The player answers his question toward condemnation.
- **Outcome:** ks. Pająk leans harder toward judgment.
- **Gives:** [`priest-fears-divine-judgment`](../clues/clues.md#priest-fears-divine-judgment)
- **Changes:** [Crisis of Faith](../characters/priest.md#crisis-of-faith) — −2

### Share his cigarette
- **When:** ks. Pająk genuinely trusts the player (mercy supported, or a personal confidence shared in return)
- **Prompted by:** aware:events/priests-plea.md
- **Outcome:** He drops the pretence, takes out a cigarette for himself and offers one to the player. The habit he hides from the village is plain.
- **Gives:** [`priest-smokes`](../clues/clues.md#priest-smokes)

## Exits

- Return to [The church](../locations/the-church.md).
- If mercy was supported, continue toward [The Odpust](the-odpust.md).
- If judgment was supported or no help is given, continue toward [Second Flood Mass](second-flood-mass.md) and [The Seal-Break](the-seal-break.md).

## If Missed

- If no player earns his trust, this event never fires.
- ks. Pająk carries the fear alone.
- His crisis defaults toward judgment across [Second Flood Mass](second-flood-mass.md) and [The Seal-Break](the-seal-break.md).
- The Grace path can still open if the guilty are brought to confess.
