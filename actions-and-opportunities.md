# Actions & Opportunities — Reference Template

**Type:** Scene-writing reference

## Writing Discipline — read first

Scene files are **technical documents**, not stories. They record who / when / what / what-changes. The GM supplies mood and language at the table; the file supplies facts.

1. **Zero prose. Pure facts.** Every line is a statement that is true, not a statement that sets a tone. No atmosphere paragraphs, no lyrical build, no "puts the hair up". Write the fact; the GM performs it.
2. **Bullets over paragraphs.** Setup, Trigger, Hook are fact lists — one thing per line.
3. **Headers are technical.** Location = one link (events) or terse position (locations). Present = character links + terse conditions only, e.g. `(if survived Day 6)` — no states, no narration, no absent people. Available = shortest trigger, e.g. "Night, Day 4 onward. Fires once."
4. **Dialogue only when technically critical.** Write exact words **only** when the words themselves are the mechanical content — a scripture excerpt that *is* the sermon, a password, an exact phrase a clue turns on. Flavor quotes are cut; keep the fact behind them.
5. **State and behavior go in Setup, not headers.** Who's missing, who's rattled, who arrives later — Setup lines, not Present.

## The Two Types

Every scene file (locations, events, characters) uses two mechanisms for player interaction:

| | **Opportunity** | **Action** |
|---|---|---|
| **Initiated by** | GM | Player |
| **Trigger** | Player has the right skill/prereq and is present | Player declares "I want to..." |
| **Cost** | Always free | Free OR 1+ actions of time |
| **Nature** | Passive — the GM reveals it | Active — the player asks for it |
| **GM reads** | Woven into scene narration | When player states intent |

**The distinction is who initiates, not what it costs.** Actions can be free — a quick question to someone you're already talking to is player-initiated and costs nothing. The time cost represents whether the action eats a meaningful chunk of fictional time, not whether it's player-driven.

---

## The Visit

**Going to a location is itself an action.** The player says "I go to the church" — that costs the time listed in the location header's `Cost:` field. On arrival, the GM reads the Setup and delivers any Opportunities the player qualifies for. Those are included in the visit — they don't cost extra.

Actions *within* the location cost time on top of the visit. So the full flow is:

1. **Player:** "I visit Ciotka's house." → **1 action** (the visit)
2. **GM:** Reads Setup. Delivers Opportunities based on player's skills. → **Free** (bundled with visit)
3. **Player:** "I want to search the attic." → **1 action** (additional action within the location)

This means Opportunities are the **payoff for the visit** — the minimum a player gets for spending time at a location. If a location gives nothing through its Opportunities alone, the visit feels wasted. Every location should reward the visit with at least one meaningful Opportunity.

---

## Opportunities

Opportunities are **what the GM reveals to a player who clears a gate** — something a plain visitor doesn't get. The player doesn't ask; the GM delivers it based on what the player has (skills, completed actions, held clues, world state).

**Opportunities are ALWAYS gated.** Every opportunity carries a `(requires: …)` tag. There is no such thing as an ungated opportunity — a thing everyone perceives on arrival is a **Setup** fact, not an opportunity. If it isn't gated, it doesn't belong in this section.

### Format

```
- **[Observable thing]** `(requires: [gate])` — [What the gated player notices]. → Gives: [`clue-id`](../clues/clues.md#clue-id)
```

### The gate

The gate is a **requirement set** — one or more conditions, all ANDed. Conditions can be skills, completed actions, held clues, or NPC/world states, mixed freely:

```
- **He's nervous** `(requires: talked to the [sołtys](../characters/wojewoda.md) and Observation)` — a bead of sweat, eyes flicking to the door. → Gives: [`wojewoda-rattled`](../clues/clues.md#wojewoda-rattled)
```

Meet **every** condition → you get it. Miss one → the opportunity isn't there for you at all.

### Rules

1. **Free means free.** An Opportunity never costs time. If it requires effort (digging, following, breaking in), it's an Action.
2. **Always gated. Ungated → Setup.** Every opportunity has a `(requires: …)`. A fact everyone gets on the visit is a Setup bullet, not an opportunity. Never write an ungated opportunity.
3. **The gate is hard, not a layer.** A player who misses any condition gets **nothing**, not a lesser version. There is no "base everyone gets" for an opportunity — the base *is* Setup. A layered reveal is the Setup fact (everyone) plus a gated opportunity (the skill), never a tiered opportunity line.
4. **Setup must state the observable.** If an opportunity's gate is a skill reading a detail, that detail must already appear in Setup. Players can't notice what the GM never described.
5. **Binary output.** An Opportunity either gives a clue or gives nothing (atmosphere). There is no third state.
   - If it gives a clue → `→ Gives: [clue-id](link)`
   - If it's pure atmosphere → no `Gives` line. Write the observation, stop.

---

## Actions

Actions are **what players do when they declare intent.** Every action produces a concrete change to game state.

### Format

```
### Action Name
- **Requires:** [Prerequisite — prior clue, NPC state, skill, item, or "Nothing"]
- **Cost:** [Free / 1 action / 2 actions]
- **Outcome:** [What happens — one flat result for anyone who clears Requires. No skill branches.]
- **Gives:** [`clue-id`](../clues/clues.md#clue-id) | NPC State Change: [description] | Item: [description] | Scene Unlock: [scene file] | World State Change: [description] | Ending Progress: [which ending]
```

A skill that would reveal more is **not** an Outcome branch — it is a separate **opportunity** gated by that action plus the skill:

```
- **[What the skilled player also notices]** `(requires: [Action Name] and [Skill])` — [the extra]. → Gives: [`clue-id`](link)
```

### When does an action cost time?

An action costs time when it eats a meaningful chunk of the character's day — roughly one scene, one conversation, one focused effort. The question is: **does this eat a slot in the character's day?**

| Costs time | Free |
|---|---|
| A full interview with an NPC | A quick follow-up question mid-conversation |
| Searching a room thoroughly | Opening a drawer you're already standing next to |
| Following someone through the forest | Glancing out the window |
| A drinking session | Accepting an offered glass |
| Traveling to a distant location | Moving within the same area |

**Rule of thumb:** If the player is already *in* a scene and the action doesn't end/extend it meaningfully, it's free. If it constitutes its own scene or consumes a phase-chunk of time, it costs time.

### Rules

1. **Every action must have a `Gives:` line.** This is mandatory. No exceptions.
2. **Valid outcomes** (from game-system.md):
   - **Clue** — an atomic fact from `clues/clues.md`. Link it.
   - **NPC State Change** — an NPC's attitude, willingness, or availability shifts. Name the NPC and the change.
   - **Item** — players obtain something tangible (maps, gun, bottle, documents).
   - **Scene Unlock** — a new scene becomes available. Link it.
   - **World State Change** — the village itself changes (Rezeń is loose, the crew knows you're snooping, etc.)
   - **Ending Progress** — advances one of the ending chains.
3. **Multiple outcomes are fine.** An action can give a clue AND change NPC state AND unlock a scene. List them all.
4. **"Nothing" is not a valid outcome for documented actions.** If you're writing an action into a scene file, it must give something — otherwise don't document it.
   - **Undocumented actions exist.** Players will attempt things not written in any scene file. The GM charges the time (if it eats time), narrates the empty result, and moves on. Dead ends are part of the time economy — the spent time is the cost. We don't write dead-end entries into scene files.
5. **No "Leads to:" or "Result:".** The field is always `Gives:`. The verb is always definitive.
6. **A skill gates an action or opens an opportunity — never enriches it.**
   - In a `Requires:` set → **hard gate.** No skill means you can't take the action (or don't get the gated clue) at all.
   - Reveals more than the flat Outcome → that extra is a separate **opportunity**, `(requires: <this action> and <skill>)`. Not a branch inside Outcome.
   An Action's Outcome is flat — one result for everyone who clears `Requires:`. Skills never sit as enrich-branches in an Outcome.
7. **Cost must be explicit.** Every action states its cost: `Free`, `1 action`, or more. See the table above for guidance on which is which.

---

## Bonds as Gates

NPC access is gated by the **Bond** mechanic (see `story-facts/game-system.md`). When an action requires a bond:

```
- **Requires:** Bond with [NPC Name]
```

Bond checks live in the character file. The GM tracks them silently. **Scene files do not annotate bond-building behavior.** If a player talks to an NPC in a way that satisfies a bond check, the GM notices from the character file — scenes don't need to flag it.

Bond-building is a permanent freeform opportunity available whenever a player is in the NPC's presence. It is NOT listed as a scene opportunity. Scene opportunities are only for things specific to that scene — observations and clues you can only notice here and now.

---

## Where Actions Live

| Action type | Written in | Example |
|---|---|---|
| **Location-bound** (search, dig, steal, observe) | `locations/` file | "Search the attic" |
| **Character-bound** (interview, leverage, confront) | `characters/` file, `## Actions` section | "Push him about 1954" |
| **Event-specific** (react, intervene, flee) | `events/` file | "Intervene physically" |

If an action is triggered at a location but is really about an NPC interaction, it belongs in the **character** file. The location can cross-reference:
```
### Talk to Priest
- See [ks. Władysław Pająk — Actions](../characters/priest.md#actions)
```

---

## Quick Checklist (for scene authors)

Before committing a scene file, verify:

- [ ] Zero prose — every line is a fact, not atmosphere; Setup/Trigger/Hook are bullet lists
- [ ] Headers technical — Location a link, Present names+terse conditions only, Available a terse trigger
- [ ] Dialogue only where the exact words are the mechanical content (else cut, keep the fact)
- [ ] Every Opportunity has either `→ Gives: [clue-id]` or no gives line (atmosphere only)
- [ ] Every Action has a `Gives:` line with a valid outcome type
- [ ] No action produces "nothing" — if it would, cut it or find the real outcome
- [ ] Every opportunity is gated with `(requires: …)` — ungated observations live in Setup, not Opportunities
- [ ] Skill-gated opportunities read off a detail Setup states
- [ ] No tiered "base + skill" lines — layered reveals are split into separate gated opportunities
- [ ] Action Outcomes are flat — no skill branches; a skill reveal is an opportunity `(requires: <action> and <skill>)`
- [ ] No use of "Leads to" or "Result" as outcome labels
- [ ] Gated opportunities use `(requires: …)` with an ANDed condition set
- [ ] Bond gates reference the character's Bond section
- [ ] Actions that belong to a character (not a place) are in the character file
