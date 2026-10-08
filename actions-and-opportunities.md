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
| **Cost** | Always free | Free (no Cost line) OR time / composure / an item |
| **Nature** | Passive — the GM reveals it | Active — the player asks for it |
| **GM reads** | Woven into scene narration | When player states intent |

**The distinction is who initiates, not what it costs.** Actions can be free — a quick question to someone you're already talking to is player-initiated and costs nothing. The time cost represents whether the action eats a meaningful chunk of fictional time, not whether it's player-driven.

---

## The Visit

**Going to a location is itself an action.** The player says "I go to the church" — that costs the time listed in the location header's `Cost:` field. On arrival, the GM reads the Setup and delivers any Opportunities the player qualifies for. Those are included in the visit — they don't cost extra.

Actions *within* the location cost time on top of the visit. So the full flow is:

1. **Player:** "I visit Ciotka's house." → **1 time** (the visit)
2. **GM:** Reads Setup. Delivers Opportunities based on player's skills. → **Free** (bundled with visit)
3. **Player:** "I want to search the attic." → **1 time** (additional action within the location)

This means Opportunities are the **payoff for the visit** — the minimum a player gets for spending time at a location. If a location gives nothing through its Opportunities alone, the visit feels wasted. Every location should reward the visit with at least one meaningful Opportunity.

---

## Opportunities

Opportunities are **what the GM reveals to a player who clears a gate** — something a plain visitor doesn't get. The player doesn't ask; the GM delivers it based on what the player has (skills, completed actions, held clues, world state).

**Opportunities are ALWAYS gated.** Every opportunity carries a `(noticed by: …)` tag, a `(when: …)` tag, or both. There is no such thing as an ungated opportunity — a thing everyone perceives on arrival is a **Setup** fact, not an opportunity. If it isn't gated, it doesn't belong in this section.

### Format

```
- **[Observable thing]** `(when: [world state])` `(noticed by: [Card](../cards/file.md) AND [clue-id](../clues/clues.md#clue-id))` `(prompted by: …)` — [What the gated player notices]. → Gives: [`clue-id`](../clues/clues.md#clue-id)
```

The `(prompted by: …)` tag is optional — same meaning and format as an action's `Prompted by:` (Actions rule 9).

### The gate

An opportunity's gate has two halves. Both are **silent**: the GM never hints at a missing one, because the player never asked for anything.

- **`(noticed by: …)` — who perceives it.** A boolean expression over what the player holds: skill cards (`cards/`), items (`items/`) and **clues**, as links, combined with `AND`, `OR` (uppercase) and parentheses. Unlike an action's `Requires:`, a clue belongs here: knowing something changes what you notice. Checked by `python validate.py` (rule `noticed-by-format`).
- **`(when: …)` — whether it is there at all.** World state: who is present, an action already done, NPC/world state, an NPC knowing a clue (`npc:` followed by the clue link). Same meaning as an action's `When:`. Format not standardised yet.

```
- **Janina's empty pew** `(noticed by: [Devotion](../cards/devotion.md) AND [ciotka-is-devout](../clues/clues.md#ciotka-is-devout))` — …
- **He's nervous** `(when: talked to the [sołtys](../characters/wojewoda.md))` `(noticed by: [Empathy](../cards/empathy.md))` — a bead of sweat, eyes flicking to the door. → Gives: [`wojewoda-rattled`](../clues/clues.md#wojewoda-rattled)
```

Meet **every** condition → you get it. Miss one → the opportunity isn't there for you at all. Opportunities never use `(requires: …)` — that word belongs to actions.

### Rules

1. **Free means free.** An Opportunity never costs time. If it requires effort (digging, following, breaking in), it's an Action.
2. **Always gated. Ungated → Setup.** Every opportunity has a `(noticed by: …)` and/or `(when: …)`. A fact everyone gets on the visit is a Setup bullet, not an opportunity. Never write an ungated opportunity.
3. **The gate is hard, not a layer.** A player who misses any condition gets **nothing**, not a lesser version. There is no "base everyone gets" for an opportunity — the base *is* Setup. A layered reveal is the Setup fact (everyone) plus a gated opportunity (the skill), never a tiered opportunity line.
4. **Setup must state the observable.** If an opportunity's gate is a skill reading a detail, that detail must already appear in Setup. Players can't notice what the GM never described.
5. **Binary output.** An Opportunity either gives a clue or gives nothing (atmosphere). There is no third state.
   - If it gives a clue → `→ Gives:` followed by the clue link
   - If it's pure atmosphere → no `Gives` line. Write the observation, stop.

---

## Actions

Actions are **what players do when they declare intent.** Every action produces a concrete change to game state.

### Format

```
### Action Name
- **Requires:** [Cards the player holds — skill card or item links, combined with AND / OR / ( ); omit the line when nothing is required]
- **When:** [World state that must hold for the action to exist — NPC present, state reached, scene done. GM-only, never hinted. Omit when always available. Format not standardised yet.]
- **Prompted by:** [Clue links and/or aware:<kind>/<file>.md tokens, separated by ", ". Soft breadcrumb, not a gate. Omit only if nothing points the way (validator warns).]
- **Cost:** [N time + N composure + [Item](../items/file.md) — any combination; omit the line entirely when free]
- **Outcome:** [What happens — one flat result for anyone who clears Requires. No skill branches.]
- **Gives:** [Clue links, aware: tokens, item and card links — what the player now holds, separated by ", "]
- **Changes:** [World/NPC state, NPC Learns, records, progress — free text, separated by "; "]
```

A skill that would reveal more is **not** an Outcome branch — it is a separate **opportunity** gated by that action plus the skill:

```
- **[What the skilled player also notices]** `(when: [Action Name] done)` `(noticed by: [Skill])` — [the extra]. → Gives: [`clue-id`](link)
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

1. **Every action has a `Gives:` line, a `Changes:` line, or both.**
2. **Gives is what the player now holds** — a `, `-separated list of clue links, `aware:<kind>/<file>.md` tokens, item links and card links. Nothing else. A new scene or place becomes reachable by giving its `aware:` token. Checked by `python validate.py` (rule `gives-format`).
   **Changes is what the action changes in the world** — NPC state, world state, an NPC learning a clue (`NPC Learns:` then the npc and the clue link), census and property records, event progress, ending progress. Each entry is a link plus ` — short comment`, the link pointing at a heading in a `## Mechanics` section; or a bare link to a bond check's anchor in `## Bond`, with no comment, meaning that check is met; entries are `;`-separated. It is the other side of `When:` (one action's Changes is what another action's When checks).
3. **Multiple outcomes are fine.** An action can give a clue and an item AND change NPC state. List them all.
4. **"Nothing" is not a valid outcome for documented actions.** If you're writing an action into a scene file, it must give something — otherwise don't document it.
   - **Undocumented actions exist.** Players will attempt things not written in any scene file. We don't write dead-end entries into scene files — the GM charges the time at the table. See [Charging Dead Ends](#charging-dead-ends).
5. **No "Leads to:" or "Result:".** The fields are always `Gives:` and `Changes:`. The verb is always definitive.
6. **Requires is only ever cards the player holds** — a skill card (`cards/`) or an item (`items/`), as links. Combine them with `AND`, `OR` (uppercase) and parentheses; `AND` binds tighter than `OR`. Nothing else may appear: no clues, NPC states, presence, bonds or prose. A clue that points the way is `Prompted by:`. When nothing is required, omit the line. Checked by `python validate.py` (rule `requires-format`).

   ```
   - **Requires:** [Language](../cards/language.md)
   - **Requires:** [Language](../cards/language.md) AND ([Speech](../cards/speech.md) OR [Empathy](../cards/empathy.md))
   - **Requires:** [Blue dress](../items/girls-dress.md) OR [Culture](../cards/culture.md)
   ```

6a. **`When:` is world state, not the player.** NPC presence, NPC/world state, a scene or action already done. A failed `Requires:` may be told to the player ("you'd need medical training"); a failed `When:` is never hinted — the action simply isn't on the table, and an attempt anyway is an undocumented action (see Charging Dead Ends). Format is not standardised yet.

7. **A skill gates an action or opens an opportunity — never enriches it.**
   - In a `Requires:` set → **hard gate.** No skill means you can't take the action (or don't get the gated clue) at all.
   - Reveals more than the flat Outcome → that extra is a separate **opportunity**, `(when: <this action> done)` `(noticed by: <skill>)`. Not a branch inside Outcome.
   An Action's Outcome is flat — one result for everyone who clears `Requires:`. Skills never sit as enrich-branches in an Outcome.
8. **Cost is strict.** It is one or more of these parts, joined by ` + `, and nothing else:
   - `N time` — time cards spent (e.g. `1 time`, `2 time`)
   - `N composure` — composure spent (e.g. `1 composure`)
   - an item link — the item is used up or handed over; the item must have its own `items/` file
   - a card link — the player gives the card up for good (e.g. the Loaded card)
   - a card link — the player gives the card up for good (e.g. the Loaded card)

   ```
   - **Cost:** 1 time
   - **Cost:** 1 time + 1 composure
   - **Cost:** 2 composure + [Rope](../items/rope.md)
   ```

   **A free action has no Cost line at all** — never write `Free`, `None` or `0`. Conditions, skill discounts, injuries and notes do not belong in Cost: split them into separate actions or move them to Requires/Outcome. See the table above for when an action costs time. Checked by `python validate.py` (rule `action-cost`).
9. **`Prompted by:` is a soft breadcrumb, not a gate.** It lists prior clue(s) or awareness that would make a player think to try this action. A player without them can still take it. Opportunities may carry it too, as an inline `(prompted by: …)` tag. **Format is strict:** a `, `-separated list where each entry is a clue link written like the one in `Gives:` (link text = the clue id, optionally in backticks) or an awareness token `aware:<characters|events|locations|items>/<file>.md`. Nothing else: no `;`, no free text. An action without `Prompted by:` is a validator warning. Clues never go in `Requires:` (rule 6) — a clue that points the way always goes here. This field feeds the clue graph: it draws the edge from the prompting clue to the clue this action gives.

---

## Charging Dead Ends

<!-- GM-facing, not scene-authoring. This section is about actions no file documents. -->

Players don't know what's in these files. They will attempt things no scene documents — search rooms with nothing in them, follow people who go nowhere, stake out the wrong night, walk to the ruins on a hunch. **This isn't a failure of play. It is the time economy.** Dead ends are what make the 7-day clock bite. A GM who waves them off hands the party roughly a third of its budget back.

**The principle: charge for time spent, not for results obtained.** There are no failure rolls. If the character spent the hour, the card is gone — whether or not the hour paid.

### Charge it

| Attempt | Why |
|---|---|
| Searching a place with nothing in it | The search happened |
| Following someone who goes nowhere | The tail happened |
| A stakeout on a night the target doesn't move | The night was spent |
| Travelling somewhere on a hunch | Travel is the cost; arriving to nothing is the risk |
| Digging, hauling, excavating | Physical effort, regardless of what's under it |
| A full interview that yields nothing new | The conversation occupied the slot |
| Re-interviewing someone already exhausted | Same |

### Don't charge it

| Attempt | Why |
|---|---|
| An action whose `Requires` isn't met | They learn the gate exists. That's all that happened. |
| A question an NPC simply refuses | The refusal is the scene — and is sometimes the clue itself ([`barbara-refuses-father`](clues/clues.md#barbara-refuses-father)) |
| Moving within a location | Already free — see [The Visit](#the-visit) |
| Asking what they can see | That's Setup. Setup is always free. |
| Any documented action with no Cost line | It's written down as free |

**Never charge a player for learning they can't do something.** Refusing a gated attempt for free is what keeps players probing instead of paralysed. Charge them for *doing* things, not for *asking*.

### The grey cases

1. **The location has a documented action, but they don't meet its `Requires`.** Free. Name what's in the way — "not while the priest is in the building" — and let them solve it.
2. **They have the right idea but not the skill.** The action still happens. They get the flat Outcome; they miss the skill-gated Opportunity hanging off it. Gates are hard (Opportunities rule 3) — there is no partial version.
3. **They invent something the files never considered, and it's a good idea.** Charge it, and give it a real outcome improvised from the valid outcome types (Actions rule 2). A good idea that costs a card and pays is not a dead end.
4. **They invent something and it's nonsense.** Charge it, narrate the empty result in one sentence, move on. Don't editorialise — the spent card is the whole comment.

### Calibration

A party that ends most days with cards unspent is being undercharged.

| Day | Expected dead-end share |
|---|---|
| **Day 1** | Low — the census mandate is a rail. It tells blind players what to do. |
| **Day 2** | Highest — they have leads and no map. This is the flailing day and should feel like it. |
| **Day 3** | Moderate — the flood, the sick child, and the body focus play. |

**Rough target: about a third of the party's standard cards go to dead ends across the first three days.**

### Where the tax lands

Charging isn't symmetrical, and it's worth knowing which way it leans:

- **Conversational flailing is nearly free.** One card gets a player through a door; every free action (no Cost line) inside is then harvestable. About a third of all documented actions are free, and most of those are conversations.
- **Physical flailing is expensive.** Forest travel, searches, stakeouts, and excavation are all costed — and most of them are in or near %OLD_VILLAGE%.

The [1954 lynch](story-facts/the-lynch.md) is reachable almost entirely by talking. The [1947 massacre](story-facts/old-village-massacre.md) is reachable almost entirely by walking. A GM who under-charges physical exploration gives away the massacre; one who over-charges conversation strangles the social game. **When in doubt, charge the boots and not the mouth.**

---

## Bonds as Gates

NPC access is gated by the **Bond** mechanic (see `story-facts/game-system.md`). A bond is a card — `cards/bond-<character-file>.md` — that the GM hands the player who earns it. When an action requires a bond, it requires that card:

```
- **Requires:** [Bond: Wanda Mazur](../cards/bond-widow.md)
- **Requires:** [Language](../cards/language.md) AND [Bond: Paraskewia Chyłak](../cards/bond-hag.md)
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
- [ ] Every Action has `Gives:` (holdables only) and/or `Changes:` (state)
- [ ] Every Cost is `N time` / `N composure` / an item link joined by ` + `; free actions have no Cost line
- [ ] `python validate.py` reports 0 errors
- [ ] No action produces "nothing" — if it would, cut it or find the real outcome
- [ ] Every opportunity is gated with `(noticed by: …)` and/or `(when: …)` — ungated observations live in Setup, not Opportunities
- [ ] Skill-gated opportunities read off a detail Setup states
- [ ] No tiered "base + skill" lines — layered reveals are split into separate gated opportunities
- [ ] Action Outcomes are flat — no skill branches; a skill reveal is an opportunity `(when: <action> done)` `(noticed by: <skill>)`
- [ ] No use of "Leads to" or "Result" as outcome labels
- [ ] Opportunity gates: player side in `(noticed by: …)` (cards/items/clues), world side in `(when: …)`; never `(requires: …)`
- [ ] Bond gates link the NPC's Bond card (`cards/bond-<character>.md`) in `Requires:`
- [ ] Actions that belong to a character (not a place) are in the character file
