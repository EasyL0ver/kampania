# The Geologist's Kit

**Type:** Item — field surveying kit and briefing dossier (with the previous crew's survey report)
**Source:** Issued to the committee at the start, packed with the party's gear; [prof. Bieńkowski](../characters/professor.md) flagged the report inside it as thin at the briefing
**Carried:** Lets the party check terrain, read the state's paper, and rerun the flood projection once the outlets are known.

## Description

A worn canvas roll of survey tools: a level and clinometer, a folded copy of the resettlement master plan with its flood-line figures, and drainage tables. Tucked in the dossier is the previous crew's signed survey report, the document whose projection sent the committee here. The report reads clean to a layman. prof. Bieńkowski warned at the briefing that it smells thin, too few stations and too much taken on faith, though he could not prove it from Kraków. It praises the wojewoda's irrigation ditch, notes in passing that the river changed course and dismisses it, and says nothing at all about the ridge gap or the far-ridge streambed.

## Content

> **TERRAIN RE-SURVEY — %NEW_VILLAGE% RESETTLEMENT ZONE**
>
> The site sits comfortably above the projected flood line, on firm ground.
>
> Drainage is assured by a fine concrete irrigation ditch of ample capacity, carrying runoff clear of the fields.
>
> The watercourse to the east has shifted its bed since the previous map was drawn; this is of no consequence to drainage.
>
> No further outlets require inspection. The zone is fit for settlement.
>
> *(signed)* survey crew · Filed 1958

## Opportunities

- **Calculate the flood line** `(requires: [gap-is-blocked](../clues/clues.md#gap-is-blocked) and [ditch-drains-nothing](../clues/clues.md#ditch-drains-nothing) and [streambed-dead-ends](../clues/clues.md#streambed-dead-ends))` — With all three outlets ruled out under the same test, no fresh fieldwork is needed. Laying the findings against the master plan's numbers, the conclusion is arithmetic: when the lake rises, the water has nowhere below house level to go. %NEW_VILLAGE% floods. → Gives: [new-village-will-flood](../clues/clues.md#new-village-will-flood)

## Actions

### Read the report
- **Requires:** Holding the kit
- **Prompted by:** [committee-runs-geographical-survey](../clues/clues.md#committee-runs-geographical-survey)
- **Cost:** Free
- **Outcome:** Buried in the text, the crew note the river shifted its bed since the map was drawn, then wave it off as unimportant. The shift is real even if they dismissed it.
- **Gives:** [river-doesnt-match-map](../clues/clues.md#river-doesnt-match-map)

### Read it as a surveyor
- **Requires:** Holding the kit and **Geology**
- **Prompted by:** [committee-hides-something](../clues/clues.md#committee-hides-something)
- **Cost:** 1 action
- **Outcome:** The report shows impossibly few field stations, cursory coverage, and the ditch taken on faith from its concrete head. The crew never properly surveyed the terrain.
- **Gives:** [survey-was-faked](../clues/clues.md#survey-was-faked)

### Read the figures as a surveyor
- **Requires:** Holding the kit and [streambed-parameters](../clues/clues.md#streambed-parameters), and **Geology**
- **Cost:** 1 action
- **Outcome:** Against the kit's drainage tables you read the two elevations and conclude the col sits above house level, so the rising water tops the village before it reaches the streambed.
- **Gives:** [streambed-dead-ends](../clues/clues.md#streambed-dead-ends)

### Check the ditch praise against the ditch
- **Requires:** Holding the kit and having inspected the ditch ([ditch-drains-nothing](../clues/clues.md#ditch-drains-nothing))
- **Cost:** 1 action
- **Outcome:** The report calls the ditch a fine concrete channel of ample capacity. The real ditch is concrete only at its head and an unlined dugout the rest of the way. The document and the ground do not match.
- **Gives:** [ditch-not-built-to-spec](../clues/clues.md#ditch-not-built-to-spec)
