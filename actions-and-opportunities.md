# Actions & Opportunities — Reference Template

**Type:** Scene-writing reference

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

Opportunities are **what the GM reveals unprompted** when the scene begins or while the players are present. They represent what a trained eye notices without trying. The player doesn't ask for them — the GM delivers them based on what skills and prerequisites the player has.

### Format

```
- **[Observable thing]** — [Base observation everyone gets]. **[Skill]:** [What this skill adds]. → Gives: [`clue-id`](../clues/clues.md#clue-id)
```

### Rules

1. **Free means free.** An Opportunity never costs a card. If it requires effort (digging, following, breaking in), it's an Action.
2. **Skill tags are bonus layers, not gates.** Everyone gets the base observation. The skill reveals more. No skill = less detail, not zero.
3. **Setup must seed it.** If an Opportunity lets players notice something, the Setup paragraph must mention or hint at it. Players can't notice what the GM never described.
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

Bond checks are noted in parentheses where relevant: *(Bond check: [specific behavior])*. This tells the GM which check is being satisfied. See each character's `## Bond` section for the full checklist.

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

- [ ] Every Opportunity has either `→ Gives: [clue-id]` or no gives line (atmosphere only)
- [ ] Every Action has a `Gives:` line with a valid outcome type
- [ ] No action produces "nothing" — if it would, cut it or find the real outcome
- [ ] Setup mentions everything that Opportunities let players notice
- [ ] No use of "Seeds", "Leads to", or "Result" as outcome labels
- [ ] Skills enrich but never gate (base outcome exists for every action)
- [ ] Bond gates reference the character's Bond section
- [ ] Actions that belong to a character (not a place) are in the character file
