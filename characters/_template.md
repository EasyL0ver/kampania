# Character Name

**Type:** Named character — [role/archetype]
<!-- Optional secondary tag, e.g. Freudian role: -->
<!-- **Freudian role:** [Id / Ego / Superego](../story-facts/freudian-triangle.md) — [one-line gloss] -->

## Hook

<!-- Spoiler-free. One line: what a player knows the instant they are introduced
     to this person: their name and public role or relation, nothing hidden.
     This is the entity as a clue (knowing this person exists). No GM secrets. -->

- [Name, then the public role. e.g. "the village butcher", "the sołtys's wife".]

## Vital Statistics

- **Born:** [year]
- **Age in 1967:** [age]
- **Heritage:** [Polish / Lemko / Half-Lemko / etc. — omit if irrelevant]
- **Lives in:** [Location Name](../locations/file.md) — with [housemates, or "alone"]
- **Settled:** [when and how they arrived, or "Never left"]
<!-- Optional, e.g.: -->
<!-- - **Armed:** [weapon, status] -->

## Character

[1–3 sentence tagline. Who they are, what drives them, what makes them dangerous or useful. No backstory dump — facts go in `story-facts/`, history goes in `historical context/`.]

## Appearance

<!-- 3–4 bullet points. Each character must cover:
     - **Clothes:** What they wear day-to-day (fabric, condition, style)
     - **Hair & face:** Hairstyle, facial hair, distinguishing facial features
     - **Carriage:** Posture, gestures, presence — how they move and take up space
     Optional: voice, smell, one extra hook trait

     Follow with one freeform paragraph for anything else the GM needs to
     portray this person — speech patterns, sensory details, contradictions,
     the vibe they give off in a room. -->

## Opinions

<!-- ATMOSPHERE ONLY. The NPC's spoken topic reactions — what they say when a
     player raises a subject in conversation. Free talking-points, no time cost.

     Opinions NEVER give clues. They cannot be gated or seeded: the graph
     collapses the whole section into one gate-less, source-less node, so any
     clue "given" here is isolated/unreachable in the visualisation. If raising
     a topic hands players a discoverable fact, that belongs in an ACTION
     ("Ask <NPC> about X") or an Opportunity — put the `→ Gives:` there and
     seed it with `(prompted by: aware:characters/<npc>.md)` so it connects.
     Opinions only set stance and colour.

     Keyed three ways:
     - **[Name](file.md)** for people
     - **[Location](file.md)** for places
     - **`clue-id`** for the NPC's reaction when confronted with a known fact

     Indented `*(condition):*` branches REPLACE the default spoken line when a
     condition holds (a bond, a held clue, a world state, "if pressed"). The
     most specific matching branch wins. Branches are still atmosphere — no
     `→ Gives:`.

     RULES:
     1. No `→ Gives:` here, ever. Clue reveals live in Actions/Opportunities.
     2. No internal monologue. Write what they SAY, not what they think.
     3. Omit a line entirely for a topic the NPC would wordlessly stonewall. -->

- **[Name](file.md)** — "[spoken stance, no clue]."
  - *([condition]):* "[spoken line that replaces the default under this condition]."
- **[Location](file.md)** — "[spoken stance, no clue]."
- **`clue-id`** — "[what they say when confronted with this clue, no reveal]."

## Mechanics

<!-- Optional. Only include if the character has a unique game mechanic
     (e.g. parallel investigation, vigilante targeting, HP system).
     Free-form. Use H3 sub-sections to organize parts of the mechanic.
     Omit the section entirely if not applicable. -->

## Opportunities

<!-- What the GM reveals about this character when players are in their presence.
     Omit the section if the character has no skill-gated observations.
     Format: actions-and-opportunities.md -->

## Actions

<!-- Character-bound actions: leverage, earn trust, confront, interview.
     Omit the section if the character has no player-facing actions.
     Format: actions-and-opportunities.md

     LENGTH: Outcome is 1-2 sentences. Storytelling is fine, but short.

     STAY IN SCOPE. Write ONLY what the player learns/sees in THIS action, from
     THIS NPC, right now. Do NOT add:
       - What "the record"/deed/another file says, unless the player is holding
         it in this action. (e.g. Ciotka names the sołtys as owner — do NOT
         narrate the forged PGR deed; that contradiction lives in the clue.)
       - Cross-references to other clues, items, or NPCs "behind the door"
         (e.g. do NOT write "the soldier's pistol stays inside").
       - GM conclusions about the NPC's psychology, EVER. No "practised",
         "controlling", "not nervous", "he just doesn't answer to anyone".
         Describe only what the NPC does or says. The GM reads motive themselves.
       - Consequences that belong to a different scene/action.
     If a fact isn't delivered by this exact action, it does not go here.

     Nearly every villager has these two standard committee actions. Change only
     the Outcome/Gives to this NPC's real answer. If the answer IS a clue, name
     it in Gives. If they refuse, log the gap. -->

### Census interview
- **Requires:** Committee authority
- **Cost:** 1 action
- **Outcome:** [1-2 sentences — their answer / tell / refusal, nothing else]
- **Gives:** Census data — [who]. [+ clue-id if any]

### Property assessment
- **Requires:** Committee authority
- **Cost:** 1 action
- **Outcome:** [1-2 sentences — their answer / tell / refusal, nothing else]
- **Gives:** Property record — [what]. [+ clue-id if any]

## Bond

<!-- GM-only. Players never see this or know it exists.
     3 checks — specific behaviors or choices a player can make.
     First single player to hit 2 of 3 earns the bond.
     See story-facts/game-system.md for full rules. -->

- [ ] [Check 1]
- [ ] [Check 2]
- [ ] [Check 3]

## Grudge

<!-- Optional. GM-only. Only for NPCs who hold grudges and have something to withhold.
     Same system as Bond — 3 checks, first single player to hit 2 of 3 earns the grudge.
     Invisible to players. Omit entirely for NPCs who wouldn't hold grudges.
     See story-facts/game-system.md for full rules. -->

- [ ] [Check 1]
- [ ] [Check 2]
- [ ] [Check 3]
