# Characters batch 2 — cut/moved content

## foreman.md
- **Cut:** "The fight *is* his atonement... if the water wins, then the burying was for nothing." — **Why:** Character must be a 1–3 sentence tagline, not a psychology/backstory dump. — **Suggested home:** `story-facts/foreman-embezzlement.md` or `story-facts/flood-attitudes.md`.
- **Moved:** Zofia Pytlak opinion prose about her saying goodbye to the farm and to him. — **Why:** Opinions must be first-person and concise. — **Suggested home:** future `characters/zofia.md` or `events/foremans-flood-fight.md`.
- **Cut:** Property assessment consequence "If Zbigniew doesn't yet know about the flood → he turns [alert](wojewoda.md#property-assessment), suspicious the committee is hiding something." — **Why:** Action outcome included conditional cross-scene consequence and nonstandard wording. — **Suggested home:** `characters/wojewoda.md#property-assessment` or an event state note.
- **Moved:** Press Mazur staged branches: deflection, read/mention Wanda, quiet push, public push. — **Why:** Actions require one flat Outcome with no branches. — **Suggested home:** split into character actions in `characters/foreman.md`; public-pressure consequence retained as its own action.
- **Stripped GM conclusion:** "He's a bad liar under direct fire" and "not to confess, to *warn*". — **Why:** Outcomes must show only what players see/hear, not GM psychology conclusions. — **Suggested home:** GM notes in `story-facts/foreman-embezzlement.md`.

## glupek.md
- **Cut:** GM-only paragraph about Janina's overdose, Edek finding her, fleeing to the [UPA bunker](../locations/upa-bunker.md), innocence, red-herring function, and [Ciotka Found Dead](../events/ciotka-found-dead.md). — **Why:** Character tagline cannot carry a backstory/scene dump. — **Suggested home:** `events/ciotka-found-dead.md` or `story-facts/wife-junior-investigation.md` if needed.
- **Cut:** HTML comment/TODO: "GM — how the truth of his injury surfaces (WIP)... (`glupek-strangled`)... ks. Pająk... Ryszard Dudka... TODO: design the concrete discovery path... Until then the clue has no giver." — **Why:** Remove authoring TODO/placeholder HTML comments. — **Suggested home:** `template-fix-report/characters-2.md` until a valid discovery path is designed.
- **Moved:** "A bit slow, not severely disabled. Talks in short sentences." — **Why:** Character tagline trimmed; usable portrayal moved into Appearance/Actions. — **Suggested home:** `characters/glupek.md` Appearance/Actions.
- **Moved:** Polish family word "ciocia" was rendered as "auntie"/"aunt" in player-facing text. — **Why:** Player-facing text must be English except allowed Polish names, places, titles, and select atmospheric nouns. — **Suggested home:** Keep Polish only in internal clue IDs such as `ciotka-not-mother`.
- **Action-without-Gives gap:** Original "Talk to Edek" had "If the well is active" without a valid clue link or outcome type. — **Why:** Every action must have a mandatory valid Gives line. — **Suggested home:** normalized to an NPC State Change plus separate `glupek-drawn-to-well` action.
- **Action-without-Gives gap:** Original "Ask Edek about his mother" gave "Confirms `ciotka-not-mother` indirectly" without a markdown clue link. — **Why:** Clue gives must link the clue anchor. — **Suggested home:** normalized to [`ciotka-not-mother`](../clues/clues.md#ciotka-not-mother).
- **Stripped GM conclusions:** "Not evasion, not pain" and "He doesn't know he's giving anything away." — **Why:** Outcomes must show only what players hear/see. — **Suggested home:** GM interpretation notes if needed.

## hag.md
- **Cut:** "Her forbidden love triggered the soldiers' arrival." — **Why:** Character tagline trimmed and this is backstory/plot causality. — **Suggested home:** `story-facts/old-village-massacre.md` or `clues/clues.md#hag-caused-the-massacre` if player-discoverable.
- **Cut:** "Slips between Polish and Lemko Rusyn without noticing." — **Why:** Player-facing presentation should remain English and avoid unneeded language performance. — **Suggested home:** GM portrayal note in `historical context/` if needed.
- **Moved:** Rezeń opinion's long hatred/balance language. — **Why:** Opinions must be first-person and concise. — **Suggested home:** `story-facts/the-well.md` or `story-facts/old-village-haunting.md`.
- **Structural gap:** Bond had only two checks. — **Why:** Bond must have exactly three checkbox checks. — **Suggested home:** third check added in `characters/hag.md`.

## jagna.md
- **Cut:** Character backstory dump: finer cloth than Edward, first-rate mind, no future, risk, forbidden affair, edge, danger, and the valley touching her. — **Why:** Character must be a 1–3 sentence tagline. — **Suggested home:** `story-facts/the-lynch.md` or `characters/jagna.md` if later expanded outside template limits.
- **Cut:** GM-only fuse paragraph: Emil leaked the Lemko secret; Hania never used it; Helena presumed blackmail; the "blackmail" is Helena's fabrication; Edward died and Edek was damaged; Hania survived as [telephone-exchange operator](secondary-characters.md#operator-the-telephone-exchange-operator); see [the sealed answer](../story-facts/the-lynch.md#open-questions). — **Why:** Character section cannot carry GM backstory dump. — **Suggested home:** `story-facts/the-lynch.md#open-questions`.
- **Moved:** Missing/survived ambiguity into terse Character tagline while preserving "Missing since 1954" and "presumed dead". — **Why:** Vital/Character sections must stay terse. — **Suggested home:** `story-facts/the-lynch.md` for full explanation.
- **Moved:** Opinions into first-person voice. — **Why:** Opinions must be first-person bullets. — **Suggested home:** `characters/jagna.md#opinions`.
- **Structural gap:** Missing Appearance and Bond sections. — **Why:** Template conformance requires Appearance and Bond. — **Suggested home:** added in `characters/jagna.md`.

## junior.md
- **Cut:** "Will flip to family loyalty when Irena flips." — **Why:** Character tagline trimmed and this is GM-facing future state. — **Suggested home:** `story-facts/wife-junior-investigation.md`.
- **Moved:** Opinions into first-person voice. — **Why:** Opinions must be first-person bullets. — **Suggested home:** `characters/junior.md#opinions`.
- **Stripped GM conclusion:** "Actually running a parallel investigation for his mother" was shortened in Character. — **Why:** Keep tagline short while preserving core fact. — **Suggested home:** `story-facts/wife-junior-investigation.md`.

## kbw-officer.md
- **Moved:** Death detail "killed during the [%OLD_VILLAGE% massacre](../story-facts/old-village-massacre.md)" from Born/Died bullet to separate terse vital statistic. — **Why:** Vital Statistics must be terse bullet facts. — **Suggested home:** retained in `characters/kbw-officer.md`.
- **Cut:** "Shot dead by a UPA fighter during the operation" from Character. — **Why:** Character tagline trimmed; clue-level detail belongs outside the tagline. — **Suggested home:** `clues/clues.md#officer-killed` or `story-facts/old-village-massacre.md`.
- **Moved:** Opinions into first-person voice. — **Why:** Opinions must be first-person bullets. — **Suggested home:** `characters/kbw-officer.md#opinions`.
- **Structural gap:** Missing Appearance and Bond sections. — **Why:** Template conformance requires Appearance and Bond. — **Suggested home:** added in `characters/kbw-officer.md`.

## matrona.md
- **Moved:** GM-only motive paragraph about jealousy, hatred, false blackmail, Hania's innocence, Emil as leak, and the lynch's moral frame. — **Why:** Character must be a 1–3 sentence tagline; this is backstory/GM explanation. — **Suggested home:** `story-facts/the-lynch.md`.
- **Moved:** GM-only guilt/Grace paragraph, including **[Grace ending](../story-facts/spiritual-endings.md)**. — **Why:** Character section cannot carry a backstory dump; unique ending role belongs in Mechanics. — **Suggested home:** retained concisely in `characters/matrona.md#mechanics` and source detail can live in `story-facts/spiritual-endings.md`.
- **Moved:** GM-only forged paper paragraph, including [the lynch](../story-facts/the-lynch.md), [departure-declaration-forged](../clues/clues.md#departure-declaration-forged), [Emil's file](painter.md), and [PGR office](../locations/pgr-office.md). — **Why:** Character section cannot carry backstory dump; unique investigation thread belongs in Mechanics. — **Suggested home:** retained concisely in `characters/matrona.md#mechanics` and source detail can live in `story-facts/the-lynch.md`.
- **Moved:** Opinions into first-person voice. — **Why:** Opinions must be first-person bullets. — **Suggested home:** `characters/matrona.md#opinions`.
- **Stripped GM conclusions:** "Her insurance," "not forgiveness, but ownership," "He'll never leave," "The understanding is older than words," "Confessions are masterpieces of misdirection," "instinctively defend her," "calculating how much he said and to whom." — **Why:** Opinions should be subjective first-person, not authorial analysis. — **Suggested home:** `story-facts/the-lynch.md` or `story-facts/spiritual-endings.md`.
