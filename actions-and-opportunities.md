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
| **Cost** | Always free | Free OR 1+ cards |
| **Nature** | Passive — the GM reveals it | Active — the player asks for it |
| **GM reads** | Woven into scene narration | When player states intent |

**The distinction is who initiates, not what it costs.** Actions can be free — a quick question to someone you're already talking to is player-initiated and costs nothing. The card cost represents whether the action eats a meaningful chunk of fictional time, not whether it's player-driven.

---

## The Visit

**Going to a location is itself an action.** The player says "I go to the church" — that costs the card listed in the location header's `Cost:` field. On arrival, the GM reads the Setup and delivers any Opportunities the player qualifies for. Those are included in the visit — they don't cost extra.

Actions *within* the location are additional costs on top of the visit card. So the full flow is:

1. **Player:** "I visit Ciotka's house." → **1 card** (the visit)
2. **GM:** Reads Setup. Delivers Opportunities based on player's skills. → **Free** (bundled with visit)
3. **Player:** "I want to search the attic." → **1 card** (additional action within the location)

This means Opportunities are the **payoff for the visit card** — the minimum a player gets for spending time at a location. If a location gives nothing through its Opportunities alone, the visit feels wasted. Every location should reward the visit card with at least one meaningful Opportunity.

---

## Opportunities

Opportunities are **what the GM reveals unprompted** when the players qualify for them. The player doesn't ask — the GM delivers, based on what the player has (skills, and sometimes a completed action or held clue).

### Format

```
- **[Observable thing]** `(requires: [gate])` — [What the player notices]. → Gives: [`clue-id`](../clues/clues.md#clue-id)
```

The `(requires: …)` tag is **optional**:
- **No tag** → available to everyone on the visit. This is the default.
- **With a tag** → the opportunity only exists once the gate is met.

### The gate

The gate is a **requirement set** — one or more conditions, all ANDed. Conditions can be skills, completed actions, held clues, or NPC/world states, mixed freely:

```
- **He's nervous** `(requires: talked to the [sołtys](../characters/wojewoda.md) and Observation)` — a bead of sweat, eyes flicking to the door. → Gives: [`wojewoda-rattled`](../clues/clues.md#wojewoda-rattled)
```

Meet **every** condition → you get it. Miss one → the opportunity isn't there for you at all.

### Opportunities besides actions

When a gate names a **completed action**, the opportunity is what the player picks up **besides** that action's own outcome. The action delivers its `Gives:`; the opportunity rides along free, for a player who also clears the rest of the gate. The sołtys interview is an **Action** with its own outcome — "he's nervous" is an **Opportunity** you get on top of it, if you have the eye for it.

### Rules

1. **Free means free.** An Opportunity never costs a card. If it requires effort (digging, following, breaking in), it's an Action.
2. **The gate is hard, not a layer.** If a condition is in the `(requires: …)` set — including a skill — a player who lacks it gets **nothing**, not a lesser version. There is no "base everyone gets" for a gated opportunity. A layered reveal is written as **separate opportunities at different gates** (one ungated, one gated), not one tiered line.
3. **Seed it where it's earned.**
   - Ungated opportunity → the **Setup** must mention or hint at it. Players can't notice what the GM never described.
   - Action-gated opportunity → the **completed action** is the seed. It doesn't need to be in Setup, because the player only reaches it by doing the thing.
4. **Binary output.** An Opportunity either gives a clue or gives nothing (atmosphere). There is no third state.
   - If it gives a clue → `→ Gives: [clue-id](link)`
   - If it's pure atmosphere → no `Gives` line. Write the observation, stop.
5. **No "Seeds."** The word "seeds" is retired. A clue is either given or it isn't. If the player won't understand the clue's significance yet — that's fine. They still *have* it. The moment of understanding happens later, when they find the connecting piece.

---

## Actions

Actions are **what players do when they declare intent.** Every action produces a concrete change to game state.

### Format

```
### Action Name
- **Requires:** [Prerequisite — prior clue, NPC state, skill, item, or "Nothing"]
- **Cost:** [Free / 1 card / 2 cards]
- **Outcome:** [What happens. Concrete narration the GM reads or paraphrases. May branch:]
  - **[Skill / condition]:** [Branch outcome — additional detail or unlock]
- **Gives:** [`clue-id`](../clues/clues.md#clue-id) | NPC State Change: [description] | Item: [description] | Scene Unlock: [scene file] | World State Change: [description] | Ending Progress: [which ending]
```

### When does an action cost a card?

A card represents a meaningful chunk of fictional time — roughly one scene, one conversation, one focused effort. The question is: **does this eat a slot in the character's day?**

| Costs a card | Free |
|---|---|
| A full interview with an NPC | A quick follow-up question mid-conversation |
| Searching a room thoroughly | Opening a drawer you're already standing next to |
| Following someone through the forest | Glancing out the window |
| A drinking session | Accepting an offered glass |
| Traveling to a distant location | Moving within the same area |

**Rule of thumb:** If the player is already *in* a scene and the action doesn't end/extend it meaningfully, it's free. If it constitutes its own scene or consumes a phase-chunk of time, it costs a card.

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
   - *Exception:* An action that **confirms a negative** (e.g. "no grave exists for Barnaś") is a valid clue — document it as one.
   - **Undocumented actions exist.** Players will attempt things not written in any scene file. The GM charges a card (if it eats time), narrates the empty result, and moves on. Dead ends are part of the time economy — the card itself is the cost. We don't write dead-end entries into scene files.
5. **No "Leads to:" or "Result:" or "Seeds".** The field is always `Gives:`. The verb is always definitive.
6. **Skill branches enrich, not gate.** Because the system has no failure, skills don't determine *if* you succeed — they determine *how much* you get. A player without the listed skill still gets the base outcome. A player with it gets more.
7. **Cost must be explicit.** Every action states its cost: `Free`, `1 card`, or more. See the table above for guidance on which is which.

---

## Bonds as Gates

NPC access is gated by the **Bond** mechanic (see `story-facts/game-system.md`). When an action requires a bond:

```
- **Requires:** Bond with [NPC Name]
```

Bond checks live in the character file. The GM tracks them silently. **Scene files do not annotate bond-building behavior.** If a player talks to an NPC in a way that satisfies a bond check, the GM notices from the character file — scenes don't need to flag it.

Bond-building is a permanent freeform opportunity available whenever a player is in the NPC's presence. It is NOT listed as a scene opportunity. Scene opportunities are only for things specific to that scene — observations, clue seeds, things you can only notice here and now.

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
- [ ] Ungated opportunities are seeded in Setup; action-gated ones are seeded by the action
- [ ] No tiered "base + skill" lines — layered reveals are split into separate gated opportunities
- [ ] No use of "Seeds", "Leads to", or "Result" as outcome labels
- [ ] Gated opportunities use `(requires: …)` with an ANDed condition set
- [ ] Bond gates reference the character's Bond section
- [ ] Actions that belong to a character (not a place) are in the character file
