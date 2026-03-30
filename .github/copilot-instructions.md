# Campaign Project Instructions

This is a tabletop RPG campaign set in 1960s Bieszczady, Poland. The repository IS the project context.

## On First Message of Every Session

Read all files in these folders to understand current state:
- `characters/` — NPC files
- `clues/` — player-discoverable knowledge
- `scenes/` — playable scenes and locations (`scenes/locations/`, `scenes/events/`)
- `story/` — events, endings, scenario graph
- `story-facts/` — plot elements, mechanics

## Rules

1. **Never assume what exists — grep/check first.** The repo is the source of truth, not conversation memory.

2. **Historical facts → `historical context/`** — When a new historical fact is learned or researched, add it to the appropriate file (or create a new one).

3. **Search in Polish** — When searching for sources and historical information, always search in Polish for better accuracy and depth of local sources.

4. **Fact-check player input** — When the user provides historical details, verify them. Flag inaccuracies — small liberties are fine, but always make the user aware of what's real and what's bent.

5. **Structured storage:**
   - `characters/` — one `.md` per character
   - `scenes/locations/` — one `.md` per location
   - `scenes/events/` — playable event scenes
   - `clues/` — player-discoverable facts (single file, anchored)
   - `story-facts/` — plot elements, mechanics
   - `story/` — events, scenes, story graph
   - `scenes/` — playable scene files
   - `historical context/` — research and reference
   - `inspirations/` — films, books, music, references

6. **Placeholder naming** — Use `%PLACEHOLDER%` syntax until a character or place has a final name. **Never swap placeholders for real names unless explicitly told to.**

7. **Inspirations → `inspirations/`** — When a new inspiration is discussed, store it there.

8. **Links** — Character files link to locations, clues, and other characters using relative markdown paths. Clues file is the single source of truth for player-discoverable knowledge. Scenes link to clues they can reveal.
