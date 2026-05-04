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

4. **Playable for non-Polish speakers** — All player-facing content (dialogue, scene descriptions, NPC reactions, clue text) is written in English. **No Polish dialogue, not even glossed.** The only Polish allowed is proper nouns: character names, place names, titles (sołtys, ks., por.), and the occasional atmospheric noun where no English equivalent exists (bimber, cerkiew, panakhyda). Everything a GM reads aloud must be English.

5. **Fact-check player input** — When the user provides historical details, verify them. Flag inaccuracies — small liberties are fine, but always make the user aware of what's real and what's bent.

6. **Structured storage:**
   - `characters/` — one `.md` per character
   - `locations/` — one `.md` per location
   - `events/` — playable event scenes
   - `clues/` — player-discoverable facts (single file, anchored)
   - `story-facts/` — plot elements, mechanics
   - `historical context/` — research and reference
   - `inspirations/` — films, books, music, references

7. **File templates** — New characters, events, and locations follow the templates. No other sections allowed.
    - Characters → [`characters/_template.md`](characters/_template.md)
    - Events → [`events/_template.md`](events/_template.md)
    - Locations → [`locations/_template.md`](locations/_template.md)

8. **Placeholder naming** — Use `%PLACEHOLDER%` syntax until a character or place has a final name. **Never swap placeholders for real names unless explicitly told to.**

9. **Inspirations → `inspirations/`** — When a new inspiration is discussed, store it there.

10. **Links** — Character files link to locations, clues, and other characters using relative markdown paths. Clues file is the single source of truth for player-discoverable knowledge. Scenes link to clues they can reveal.

11. **Clues are pure facts** — The `clues/clues.md` file contains only atomic facts the players can discover. **Do not add sources, GM notes, or discovery instructions to clue entries.** Sources and discovery paths belong in scene files (`locations/`, `events/`).

12. **Actions belong where they're performed:**
    - **Location-bound actions** (search a room, dig in a yard) → `locations/` files
    - **Character-bound actions** (leverage someone, earn trust, confront) → `## Actions` section in the character's `.md` file, using the same format as location actions (cost, requires, what happens, result)
    - If an action is triggered at a location but is really about a character interaction, it belongs in the character file. The location file can cross-reference it.

13. **Clues are binary** — An action either **gives** a clue or it doesn't. Actions do not "lead to" or "seed" clues. If a player performs an action and learns a fact, that fact must exist as a clue in `clues/clues.md` and the action's outcome gives it directly. No partial reveals, no "seeds for later."

14. **Actions must have a concrete effect** — Every documented action must produce one of the outcomes listed in the next rule: give a clue, change NPC state, give an item, unlock a scene, change world state, or advance an ending. **"Nothing happens" is not a valid outcome.** If a player would learn nothing and the world wouldn't shift, it doesn't belong as a listed action — that's atmosphere or free-form roleplay, not investigation. Every action must be runnable: GM reads `Outcome` → game state changes.

15. **Scene file structure:**
    - **Events** (`events/`) — One-shot moments. Triggered by game state, time, or player action. Events happen **at** a location — all of the location's persistent actions and opportunities are implicitly available. Event files only contain what's unique to that moment. Numbered (`01-`, `02-`) for play sequence (when the event *can* trigger, not a forced order).
    - **Locations** (`locations/`) — Revisitable places. Persistent actions and NPCs. Named descriptively, no numbers.
    - **Both types follow this format:**
      - Header: Type, Location, Present (NPCs + conditions), Available (when), Cost
      - `## Setup` — What players see/hear/feel. **Rule: If an opportunity lets players notice something, the Setup must mention or hint at it.** Players can't notice what the GM never described.
      - `## Opportunities` — Free, no action cost. Impressions, seeds, atmosphere. Skill tags show what each skill reveals.
      - `## Actions` — What costs time. Each action has: Requires, Cost, Outcome (with skill-specific branches), clues given.
      - `## Exits` (events only) — Where players go after. Locations don't have exits.

15. **Scene outcomes:**
    - **Clue** — Players learn an atomic fact (must exist in `clues/clues.md`)
    - **NPC State Change** — An NPC's attitude or willingness shifts
    - **Item / Evidence** — Players obtain something tangible
    - **Scene Unlock** — A new scene becomes available
    - **World State Change** — The village itself changes
    - **Ending Progress** — Advances an ending chain
