# Game Rules

**System:** Cthulhu Confidential hack — investigation-focused, narrative-heavy

## Core Loop

- **5 days.** The game lasts five in-game days.
- **3 actions per day.** Each player gets 3 actions. An action is: visiting a location, talking to an NPC, investigating something, performing a task (sandbags, bunker expedition, phone call, etc.).
- **Automatic success.** There are no dice rolls. If a player attempts something, it succeeds — *if the prerequisites are met.* The resource isn't luck. It's **time.**
- **Abilities** can be used during actions. Abilities are character skills (TBD — designed after scenario is complete) that unlock specific options: dialogue branches, NPC reactions, hidden information. E.g. using an intimidation ability on Barbara Kopacz, or a faith ability with ks. Władysław Pająk.

## The Scenario Graph

The scenario is structured as a **directed graph.** Nodes are information, events, NPC states, and endings. Edges are actions, prerequisites, and ability uses.

### Node Types

| Type | Description | Example |
|------|-------------|---------|
| **Information** | A fact the players learn | "The well contains bodies" |
| **NPC State** | An NPC's attitude or willingness shifts | "Tadek Gajda is cracked — will talk" |
| **Event** | Something happens in the village | "Pawełek Kopacz falls ill" |
| **Gate** | A prerequisite check — do the players have X? | "Has ks. Władysław Pająk given permission?" |
| **Ending** | A terminal node — one of the story's resolutions | "The ritual is performed" |

### How Nodes Unlock

Nodes are **locked by default.** They unlock through:

1. **Prerequisites** — the player has already unlocked a specific prior node. You can't perform the ritual without first finding Paraskewia Chyłak, breaking ks. Władysław Pająk, and reaching Stefania Kopacz. The graph enforces this order.

2. **Ability use** — the player spends an action and explicitly activates a skill during an NPC interaction. This opens a branch that wouldn't exist otherwise. E.g.:
   - *Intimidate Barbara Kopacz* → she reveals where Pawełek Kopacz was playing
   - *Show faith to ks. Władysław Pająk* → he warms up, new dialogue unlocks
   - *Read ledger with accounting skill* → Michał Pytlak's embezzlement exposed

3. **Time triggers** — some nodes unlock automatically on a specific day, regardless of player action. The well gets stronger. The flood rises. Stanisław Rezeń starts showing up in the village. These are the world moving whether the players act or not.

4. **NPC triggers** — some nodes unlock because an NPC reached a breaking point. Ryszard Dudka snaps. Tadek Gajda gets drunk enough to talk. These happen when conditions accumulate, not on a fixed schedule.

### Graph Principles

- **Multiple paths to the same information.** The lynch can be uncovered through Tadek Gajda (weak link), Ryszard Dudka (bystander), Janina Gajda (if Edek Barnaś is secured), Emil Rzepka (if freed from Helena Gajda), or physical evidence at the well. No single NPC is a hard gate to the core mystery.

- **Single paths to specific endings.** The ritual requires a specific chain (players → ks. Władysław Pająk → Barbara Kopacz → Stefania Kopacz). The engineering ending requires the bunker expedition. These are hard gates — miss a link, lose the ending.

- **Actions are the currency.** Every action spent on one path is an action not spent on another. The graph is designed so that **all four endings are achievable but not comfortably.** The perfect run requires near-zero waste.

- **Dead ends are real.** Some paths lead to red herrings (embezzlement, bimber still) that burn actions and yield nothing for the main mystery. They may yield leverage, allies, or atmosphere — but they cost time.

- **The graph branches, not rails.** Players can pursue threads in any order. The graph tracks what they've unlocked and presents consequences accordingly. The GM doesn't steer — the prerequisites do.

## Abilities (TBD)

Abilities will be designed after the scenario graph is complete. They should:
- Be few (3-5 per player character)
- Each unlock at least one unique graph edge that nothing else can
- Create moments of "I'm the only person who can do this"
- Be assigned during the opening car ride (character creation = por. Witold Skowron's briefing)

## Endings as Graph Terminals

The four endings are terminal nodes in the graph. Each has its own prerequisite chain:

| Ending | Key Prerequisites |
|--------|------------------|
| **Ritual** | Find Paraskewia Chyłak → break ks. Władysław Pająk → free Barbara Kopacz → bring Stefania Kopacz → the words at the well |
| **Engineering** | Believe Michał Pytlak → retrieve explosives from bunker → support detonation |
| **Justice** (prevent lynch) | Crack witnesses → document truth → use phone → keep Ryszard Dudka stable |
| **Punishment** (lynch happens) | Truth exposed + no structure = Ryszard Dudka snaps |
| **The Report** | Massacre discovered → included in report → prof. Tadeusz Bieńkowski called (or not) |

The **perfect run** completes Ritual + Engineering + Justice + Report (with phone call). Possible. Extraordinary.
