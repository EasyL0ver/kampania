# The Geologist's Kit

**Type:** Item — field surveying kit and briefing dossier (with the previous crew's survey report)
**Source:** Issued to the committee at the start, packed with the party's gear; [prof. Bieńkowski](../characters/professor.md) flagged the report inside it as thin at the briefing
**Carried:** Lets the party check terrain, read the state's paper, and rerun the flood projection once the outlets are known.

## Description

A worn canvas roll of survey tools: a level and clinometer, a folded copy of the resettlement master plan with its flood-line figures, and drainage tables. Tucked in the dossier is the previous crew's signed survey report, the document whose projection sent the committee here. The report reads clean to a layman. prof. Bieńkowski warned at the briefing that it smells thin, too few stations and too much taken on faith, though he could not prove it from Kraków. It praises the wojewoda's irrigation ditch, notes in passing that the river changed course and dismisses it, and says nothing at all about the ridge gap or the far-ridge streambed. Also folded in is a Solina dam-survey station index: a bare list of benchmarks the reservoir survey set across the valley, the far-ridge streambed col among them, but the elevation sheet the index points to is not in the dossier.

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

> **SOLINA RESERVOIR SURVEY — BENCHMARK STATION INDEX (extract)**
>
> ... St. 40 far-ridge streambed col — reper set ... St. 41 %NEW_VILLAGE% datum — reper set ...
>
> *Elevation register: see attached sheet.* [no sheet attached]

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

### Read the dam-survey index
- **Requires:** Holding the kit and **Geology**
- **Prompted by:** [streambed-is-candidate-drain](../clues/clues.md#streambed-is-candidate-drain)
- **Cost:** Free
- **Outcome:** A layman sees a dull list of station numbers. A surveyor reads it: the Solina survey set benchmarks across the valley, the far-ridge streambed col among them (St. 40) with the village datum (St. 41), so the dam builders already shot this outlet. The index points to an elevation sheet for the figures, but that sheet is not in the dossier: the survey happened, the results are missing.
- **Gives:** [dam-builders-surveyed-streambed](../clues/clues.md#dam-builders-surveyed-streambed)

### Read the figures as a surveyor
- **Requires:** Holding the kit and [streambed-parameters](../clues/clues.md#streambed-parameters), and **Geology**
- **Cost:** 1 action
- **Outcome:** Against the kit's drainage tables you read the two elevations and conclude the col sits above house level, so the rising water tops the village before it reaches the streambed.
- **Gives:** [streambed-dead-ends](../clues/clues.md#streambed-dead-ends)

### Run the drainage tables on the ditch head
- **Requires:** Holding the kit and [concrete-ditch-measurements](../clues/clues.md#concrete-ditch-measurements), and **Geology**
- **Cost:** 1 action
- **Outcome:** You run the concrete head's cross-section against the drainage tables. The channel of ample capacity carries the flood clear: on these figures the ditch drains fine. It is the same all-clear the report gives, and it is a trap. The sum covers only the concrete stretch at the head, not the earth dugout below. A party that has not walked the full length and measured the dugout has no cause to doubt it and will cross the ditch off.
- **Gives:** [ditch-drains-fine](../clues/clues.md#ditch-drains-fine)

### Recalculate the whole ditch
- **Requires:** Holding the kit and [concrete-ditch-measurements](../clues/clues.md#concrete-ditch-measurements) and [dugout-measurements](../clues/clues.md#dugout-measurements), and **Geology**
- **Cost:** 1 action
- **Outcome:** With both cross-sections in hand, the concrete head and the shallow earth dugout, you run the tables over the real channel, not just the head. The undersized dugout backs up and overflows at flood volume. The ditch cannot carry the water off, and the head-only figure was a false all-clear.
- **Gives:** [ditch-drains-nothing](../clues/clues.md#ditch-drains-nothing)
