# The Church

## Hook

The church on the hill in [@name](../new-village.md), beside the cemetery.

## Setup

- The wooden church stands on the hill above the village.
- The priest's house, [@name](the-rectory.md), stands beside it.[](#a-house-beside-the-church)
- The church is unusually well-maintained for the village's poverty.[](#church-better-supplied-than-village)
- Fresh paint, a solid roof, stacked firewood, supplies, icons, candles, and incense are present.
- The cemetery is adjacent to the church.
- The cemetery has a few dozen graves, most weathered.
- All visible graves are post-1947.
- [@name](../../../characters/widow.md) often kneels beside a freshly tended grave.
- A well-tended double grave has fresh flowers, a Polonised surname, and a small three-barred cross partly hidden under lichen.
- The plebania stands adjacent to the church.
- The plebania has a stone foundation older than [@name](../new-village.md), a kitchen, a study, a spare room with a cot, and a cellar.
- The plebania cellar has stone walls, old liturgical supplies, jars, dust, and a door with a newer padlock.

## Opportunities

### A house beside the church
- **When:** setup:locations/new-village/the-church/the-church.md
- **Outcome:** A house beside the church.
- **Gives:** located:locations/new-village/the-church/the-rectory.md

### Church better supplied than village
- **Noticed by:** [Handiwork](../../../cards/handiwork.md)
- **When:** setup:locations/new-village/the-church/the-church.md
<!-- Prompted by: setup:locations/new-village/the-church/the-church.md -->
- **Outcome:** The church has better repairs, supplies, and firewood than the village should afford.
- **Gives:** [church-too-nice](../../../clues/clues.md#church-too-nice)

## Actions

### Talk to Widow at the grave
- **When:** [@present](../../../characters/widow.md)
<!-- Prompted by: hook:characters/widow.md -->
- **Outcome:** [@first-name](../../../characters/widow.md) talks about her husband, his PGR work, his accident, and her wish that the committee include him in the census.
- **Gives:** [wanda-receives-pension](../../../clues/clues.md#wanda-receives-pension)

### Ask Widow about her husband's work
- **When:** [Talk to Widow at the grave](#talk-to-widow-at-the-grave)
- **Outcome:** [@first-name](../../../characters/widow.md) gives her husband's name, PGR role, and death date; the name matches a current worker if players have the ledger worker list.
- **Gives:** [mazur-died-in-the-silo](../../../clues/clues.md#mazur-died-in-the-silo)

### Look for Mazur's grave
<!-- Prompted by: hook:characters/tadeusz-mazur.md -->
- **Outcome:** The freshly tended grave [@first-name](../../../characters/widow.md) kneels beside carries [@name](../../../characters/tadeusz-mazur.md)'s name and a recent death date.
- **Gives:** [mazur-buried-in-cemetery](../../../clues/clues.md#mazur-buried-in-cemetery)

### Look for Gajda graves
- **Outcome:** The well-tended double grave with the Polonised surname belongs to [@name](../../../characters/wojewoda.md)'s parents; a small three-barred cross sits half-hidden under the lichen on it.
- **Gives:** [three-barred-cross-on-gajda-grave](../../../clues/clues.md#three-barred-cross-on-gajda-grave)
