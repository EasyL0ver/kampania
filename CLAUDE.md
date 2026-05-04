# Campaign Project Instructions

This is a tabletop RPG campaign set in 1960s Bieszczady, Poland. The repository IS the project context.

## On First Message of Every Session

Read all files in these folders to understand current state:
- `characters/` — NPC files
- `clues/` — player-discoverable knowledge
- `events/` — playable event scenes
- `locations/` — revisitable location scenes
- `story-facts/` — plot elements, mechanics

## Rules

1. **Never assume what exists — grep/check first.** The repo is the source of truth, not conversation memory.

2. **Historical facts → `historical context/`** — When a new historical fact is learned or researched, add it to the appropriate file (or create a new one).

3. **Search in Polish** — When searching for sources and historical information, always search in Polish for better accuracy and depth of local sources.

4. **Fact-check player input** — When the user provides historical details, verify them. Flag inaccuracies — small liberties are fine, but always make the user aware of what's real and what's bent.

5. **Structured storage:**
   - `characters/` — one `.md` per character
   - `locations/` — one `.md` per location
   - `events/` — playable event scenes
   - `clues/` — player-discoverable facts (single file, anchored)
   - `story-facts/` — plot elements, mechanics
   - `historical context/` — research and reference
   - `inspirations/` — films, books, music, references

6. **Character file template** — All character files follow this strict structure. No other sections allowed.

    ```markdown
    # Character Name

    **Type:** Named character — [role/archetype]

    ## Vital Statistics

    - **Born:** [year]
    - **Age in 1967:** [age]
    - **Heritage:** [if relevant]
    - **Lives in:** [link to location] — with [housemates]
    - **Settled:** [when and how they arrived]

    ## Character

    [1-3 sentence tagline. Who they are, what drives them, what makes them dangerous or useful. No backstory dump.]

    ## Relationships

    - **[Name](link.md)** — [relationship description]

    ## Mechanics

    [Only if the character has a unique game mechanic, e.g. Pawełek's HP system. Omit entirely if not applicable.]

    ## Actions

    ### Action Name
    - **Requires:** [prerequisite]
    - **Cost:** [action cost]
    - **Outcome:** [what happens, with skill branches]
    - **Gives:** [clue link or "Nothing"]

    ## Opinions

    - **`clue-id`:** [1-2 sentence NPC reaction, often with Polish dialogue]
    ```

7. **Placeholder naming** — Use `%PLACEHOLDER%` syntax until a character or place has a final name. **Never swap placeholders for real names unless explicitly told to.**

8. **Inspirations → `inspirations/`** — When a new inspiration is discussed, store it there.

9. **Links** — Character files link to locations, clues, and other characters using relative markdown paths. Clues file is the single source of truth for player-discoverable knowledge. Scenes link to clues they can reveal.

10. **Clues are pure facts** — The `clues/clues.md` file contains only atomic facts the players can discover. **Do not add sources, GM notes, or discovery instructions to clue entries.** Sources and discovery paths belong in scene files (`locations/`, `events/`).

11. **Actions belong where they're performed:**
    - **Location-bound actions** (search a room, dig in a yard) → `locations/` files
    - **Character-bound actions** (leverage someone, earn trust, confront) → `## Actions` section in the character's `.md` file, using the same format as location actions (cost, requires, what happens, result)
    - If an action is triggered at a location but is really about a character interaction, it belongs in the character file. The location file can cross-reference it.

12. **Clues are binary** — An action either **gives** a clue or it doesn't. Actions do not "lead to" or "seed" clues. If a player performs an action and learns a fact, that fact must exist as a clue in `clues/clues.md` and the action's outcome gives it directly. No partial reveals, no "seeds for later."

13. **Scene file structure:**
    - **Events** (`events/`) — One-shot moments. Triggered by game state, time, or player action. Events happen **at** a location — all of the location's persistent actions and opportunities are implicitly available. Event files only contain what's unique to that moment. Numbered (`01-`, `02-`) for play sequence (when the event *can* trigger, not a forced order).
    - **Locations** (`locations/`) — Revisitable places. Persistent actions and NPCs. Named descriptively, no numbers.
    - **Both types follow this format:**
      - Header: Type, Location, Present (NPCs + conditions), Available (when), Cost
      - `## Setup` — What players see/hear/feel. **Rule: If an opportunity lets players notice something, the Setup must mention or hint at it.** Players can't notice what the GM never described.
      - `## Opportunities` — Free, no action cost. Impressions, seeds, atmosphere. Skill tags show what each skill reveals.
      - `## Actions` — What costs time. Each action has: Requires, Cost, Outcome (with skill-specific branches), clues given.
      - `## Exits` (events only) — Where players go after. Locations don't have exits.

14. **Scene outcomes:**
    - **Clue** — Players learn an atomic fact (must exist in `clues/clues.md`)
    - **NPC State Change** — An NPC's attitude or willingness shifts
    - **Item / Evidence** — Players obtain something tangible
    - **Scene Unlock** — A new scene becomes available
    - **World State Change** — The village itself changes
    - **Ending Progress** — Advances an ending chain
