# The Church

**Type:** Location (revisitable)
**Location:** %NEW_VILLAGE% — church on the hill, cemetery adjacent.
**Present:** [ks. Władysław Pająk](../characters/priest.md) (inside, usually), [Wanda Mazur](../characters/widow.md) (cemetery, most days)
**Available:** Any day
**Cost:** 1 action per visit

## Hook

The church on the hill in %NEW_VILLAGE%, beside the cemetery.

## Setup

- The wooden church stands on the hill above the village.
- The church is unusually well-maintained for the village's poverty.
- Fresh paint, a solid roof, stacked firewood, supplies, icons, candles, and incense are present.
- The cemetery is adjacent to the church.
- The cemetery has a few dozen graves, most weathered.
- All visible graves are post-1947.
- Wanda Mazur often kneels beside a freshly tended grave.
- A well-tended double grave has fresh flowers, a Polonised surname, and a small three-barred cross partly hidden under lichen.
- The plebania stands adjacent to the church.
- The plebania has a stone foundation older than %NEW_VILLAGE%, a kitchen, a study, a spare room with a cot, and a cellar.
- The plebania cellar has stone walls, old liturgical supplies, jars, dust, and a door with a newer padlock.

## Opportunities

- **Church condition** `(noticed by: [Handiwork](../cards/handiwork.md))` `(prompted by: aware:locations/new-village.md)` — The church has better repairs, supplies, and firewood than the village should afford. → Gives: [church-too-nice](../clues/clues.md#church-too-nice)

## Actions

### Talk to Widow at the grave
- **When:** [Wanda Mazur](../characters/widow.md) present
- **Outcome:** Wanda talks about her husband, his PGR work, his accident, and her wish that the committee include him in the census.
- **Gives:** [wanda-receives-pension](../clues/clues.md#wanda-receives-pension); NPC State Change: Wanda Mazur is willing to answer follow-up questions about her husband's work.

### Ask Widow about her husband's work
- **When:** Talked to Wanda Mazur at the grave
- **Outcome:** Wanda gives her husband's name, PGR role, and death date; the name matches a current worker if players have the ledger worker list.
- **Gives:** [mazur-died-in-the-silo](../clues/clues.md#mazur-died-in-the-silo)

### Look for Mazur's grave
- **Outcome:** The freshly tended grave Wanda kneels beside carries Tadeusz Mazur's name and a recent death date.
- **Gives:** [mazur-buried-in-cemetery](../clues/clues.md#mazur-buried-in-cemetery)

### Look for Gajda graves
- **Outcome:** The well-tended double grave with the Polonised surname belongs to Zbigniew Gajda's parents; a small three-barred cross sits half-hidden under the lichen on it.
- **Gives:** [three-barred-cross-on-gajda-grave](../clues/clues.md#three-barred-cross-on-gajda-grave)

### Search the plebania
- **When:** Priest absent or distracted
- **Cost:** 1 time
- **Outcome:** Resolve at [The Rectory](the-rectory.md).
- **Gives:** See [The Rectory](the-rectory.md).

