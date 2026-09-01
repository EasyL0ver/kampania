# Character Name

**Type:** Named character — [role/archetype]
<!-- Optional secondary tag, e.g. Freudian role: -->
<!-- **Freudian role:** [Id / Ego / Superego](../story-facts/freudian-triangle.md) — [one-line gloss] -->

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

<!-- The NPC's TOPIC REACTIONS — what they say when a player raises a subject.
     These are free talking-points, part of a conversation (raising a topic
     mid-conversation is a free follow-up, not a time action). A line may reveal
     nothing (a deflection) or hand over a clue.

     Keyed three ways:
     - **[Name](file.md)** for people
     - **[Location](file.md)** for places
     - **`clue-id`** for player-discoverable facts (reaction when confronted with it)

     Format per entry:
     - **[key]** — "default spoken line." Optional `→ Gives: [clue-id](link)`.
       This is what they say to anyone who raises the topic. It may deflect
       (no Gives) or reveal a clue (with Gives).
     - Indented `*(condition):*` branches REPLACE the default when a condition
       holds — a bond, a held `clue-id`, a world state, or "if pressed". Same
       gate syntax as opportunities. The most specific matching branch wins.
       Each branch can carry its own `→ Gives:`.

     RULES:
     1. FREE only. Opinions are spoken reactions inside a conversation. If the
        reveal costs real time (a full interview, a search, leverage), it is an
        ACTION, not an Opinion.
     2. A clue given here must exist in clues/clues.md — link it.
     3. No internal monologue. Write what they SAY, not what they think.
     4. Omit a `Says` line entirely for a topic the NPC would wordlessly
        stonewall — a silent stonewall is not a spoken line. -->

- **[Name](file.md)** — "[default spoken line]." [→ Gives: [`clue-id`](../clues/clues.md#clue-id)]
  - *([condition]):* "[spoken line that replaces the default]." [→ Gives: [`clue-id`](../clues/clues.md#clue-id)]
- **[Location](file.md)** — "[default spoken line]."
- **`clue-id`** — "[what they say when confronted with this clue]."

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
