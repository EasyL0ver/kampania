# The Priest's Plea

**Location:** [The church](../locations/the-church.md)
**Present:** [ks. Władysław Pająk](../characters/priest.md), one player with progressed [bond](../characters/priest.md#bond)
**Available:** Day 4 onward, after [Holy Mass](holy-mass.md); fires once.

## Trigger

- A player has shown ks. Pająk genuine faith.
- The player has progressed his [bond](../characters/priest.md#bond) by asking counsel, confiding in him, or honouring the church.
- ks. Pająk asks for that player alone.

## Hook

- ks. Pająk asks the player for a private talk after Mass.
- [Krystian](../characters/secondary-characters.md) may bring a folded note from him.
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
- **Composure:** 0; restores 1 for a player of faith.

## Opportunities

- **The reversed confession** `(requires: Read)` — ks. Pająk has come to a layperson for reassurance a priest is supposed to give. He is frightened.
- **The judgment pattern** `(requires: Culture or History)` — every scripture example he reaches for is a judgment narrative. His fear points toward the valley deserving to drown.
- **The unnamed sin** `(requires: Read)` — he is not speaking generally. He knows a specific sin.
- **The shape under his words** `(requires: Read and [`priest-knows-everything`](../clues/clues.md#priest-knows-everything))` — his fear points to the lynch, the well, and thirteen years of confessions he cannot report.
- **The collar gesture** `(requires: Read)` — the confessional seal is the wall keeping his knowledge in. He is exhausted by holding it.
- **The breakable wall** `(requires: Read and [`priest-knows-everything`](../clues/clues.md#priest-knows-everything))` — everything he knows is behind the seal. He will not break tonight, but he could break later.

## Actions

### Tell him people can be forgiven
- **Requires:** The player answers his question toward mercy.
- **Cost:** Free
- **Outcome:** ks. Pająk steadies. Mercy becomes a possible answer to his crisis.
- **Gives:** NPC State Change: the Grace arc opens; Ending Progress: +2 to the [Faith in Redemption](../story-facts/spiritual-endings.md) score; [`priest-fears-divine-judgment`](../clues/clues.md#priest-fears-divine-judgment)

### Ask him what he needs
- **Requires:** Nothing
- **Cost:** Free
- **Outcome:** ks. Pająk says the lost must be brought back to God before the water comes, especially those with the most to answer for.
- **Gives:** NPC State Change: players know the Grace path requires getting the guilty to confess; [`priest-fears-divine-judgment`](../clues/clues.md#priest-fears-divine-judgment)

### Push him to name the sin
- **Requires:** The player presses him to say what he knows.
- **Cost:** Free
- **Outcome:** ks. Pająk refuses to betray the confessional and ends the meeting.
- **Gives:** NPC State Change: his bond with that player cools; Ending Progress: -2 to the [Faith in Redemption](../story-facts/spiritual-endings.md) score

### Tell him the valley deserves judgment
- **Requires:** The player answers his question toward condemnation.
- **Cost:** Free
- **Outcome:** ks. Pająk leans harder toward judgment.
- **Gives:** NPC State Change: the Grace path narrows; Ending Progress: -2 to the [Faith in Redemption](../story-facts/spiritual-endings.md) score; [`priest-fears-divine-judgment`](../clues/clues.md#priest-fears-divine-judgment)

## Exits

- Return to [The church](../locations/the-church.md).
- If mercy was supported, continue toward [The Odpust](the-odpust.md).
- If judgment was supported or no help is given, continue toward [Second Flood Mass](second-flood-mass.md) and [The Seal-Break](the-seal-break.md).

## If Missed

- If no player earns his trust, this event never fires.
- ks. Pająk carries the fear alone.
- His crisis defaults toward judgment across [Second Flood Mass](second-flood-mass.md) and [The Seal-Break](the-seal-break.md).
- The Grace path can still open if the guilty are brought to confess.
