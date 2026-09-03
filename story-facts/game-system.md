# Game System — Cthulhu Confidential Hack

**Type:** Core rules / session structure

## Base System

Hacked version of **Cthulhu Confidential** (GUMSHOE One-2-One). Key change: **all skill checks automatically pass if attempted.** There is no failure — only the cost of spending time.

## Core Mechanic: Time as Resource

### The Day

Each day has **4 phases**.

| Phase | Hours | Character |
|---|---|---|
| **Morning** | ~6:00–12:00 | Village waking up, routines, NPCs at home/work |
| **Afternoon** | ~12:00–18:00 | Peak activity, all locations open |
| **Evening** | ~18:00–00:00 | Social scenes, drinking, dinners, village quiets down |
| **Night** | ~00:00–6:00 | Dark, dangerous, most NPCs asleep. **Using any night cards = skipping sleep** |

**The game is built for three or four players.** How many cards a phase holds depends on which: the work doesn't shrink when the committee does, so fewer clerks each carry more.

| Players | Cards per phase | Per day, each | Standard (M/A/E), each | Party standard/day |
|---|---|---|---|---|
| **3** | 4 | 16 | 12 | 36 |
| **4** | 3 | 12 | 9 | 36 |

Either way the committee has **36 standard cards a day** between them. The budget is **per character, not a shared party pool** — three players are not playing a thinner game, they are playing more of it each.

Cards are per-character because [composure](#composure) is per-character and **sleep is the conversion between the two.** A shared pool would let one player spend the party's time to repair their own nerves, and "who slept badly" would have no answer.

### Time Cards

**Everything costs 1 card:**
- Interview an NPC
- Explore a location
- Search a room / investigate an object
- Walk to a distant location (old village, forest, bunker)
- Use the phone
- Treat a wound
- A drinking session / meal for recovery
- Survey terrain / document for the report

**Free (0 cards):**
- Talking to someone you're already with (short conversation)
- Observing your surroundings (opportunities — what you notice for free)
- Moving within the same area (e.g. room to room, around the village square)

**The key tension:** 12 cards sounds generous until you realise that walking somewhere, talking to someone, and searching their house is 3 cards — a full phase gone. Travel eats time. Thoroughness eats time. Everything has a price.

**Dead ends cost too.** Players don't know what's in the scene files; a third of their budget goes to attempts that pay nothing, and that is what makes the 7-day clock bite. For what to charge and what to waive, see [Charging Dead Ends](../actions-and-opportunities.md#charging-dead-ends).

### Days

- The game lasts **7 days.** After Day 7, the story ends — regardless of how much the players have uncovered.
- Nominal budget per character: **84 cards** (63 standard + 21 night) in a four-player committee; **112** (84 + 28) in a three-player one.
- **The spendable number is far lower, and 84 should never be read as a working figure.** 21 of those cards are sleep, not investigation — three night cards is maintenance, not rest. Recovery and nightmares are paid out of the standard 9.

| Play pattern | Standard cards actually available, per character |
|---|---|
| Never recovers, never uses night cards | 63 |
| Nightmares from Day 3, only breaking even | **58** — 4 cards a night just to stand still |
| Nightmares, plus recovering composure 3 times | **55** — recovery costs 5 cards a night once dreams are on |

Then **dead ends take roughly a third of what remains** — see [Charging Dead Ends](../actions-and-opportunities.md#charging-dead-ends). A character who never sacrifices an evening and never wastes a card does not exist.

- The rain keeps falling. The water keeps rising. Time does not wait.

### No Failure, Only Trade-offs
- If a player attempts something, they succeed. The question is never "can I do this?" — it's "is this worth a card?"
- The tension comes from **opportunity cost**, not dice rolls. Every door you open means another door stays closed.

## The Card Pool

Every player is a government clerk — paperwork is baseline, not a card. Cards are what makes each committee member *different*, and what they can do beyond filling in forms.

There is **one pool and no categories.** Skills, dispositions and liabilities are all cards, because in a no-failure system they all resolve the same way at the table: *do you hold it or not.* Cards never determine success. They determine **what you notice, what you can attempt, and what it costs you.**

**Every card is single-copy.** Exactly one person on the committee has Medicine. When that player panics into a lost phase, nobody covers for them.

> **The pool replaced an older skill list, and the scene files have been migrated to match it.** Two cuts drove the rest: `Observation` and `Read` carried **54% of every gate in the repo** between them, because *"Opportunities are ALWAYS gated"* and an author with a detail and no obvious card to hang it on reached for the generic one. They weren't specialisms — they were the job. Their 142 gates were rerouted to the card whose own description already claimed the work, and six that merely restated a Setup fact were deleted.
>
> Also folded in: `Law` + `Accounting` → **Bureaucracy** · `Sweettalk` + `Delegate` → **Speech** · `Engineering` + most of `Agronomy` → **Handiwork** · `Streetwise` + `Discretion` → **Finesse** · `Endurance` → **Physique** · `Drink` → **Physique**/**Alcoholic** · `Intimidate` and `Animal Handling` → **Violence** · `Enforcement` split three ways · `Faith` → **Devotion** · `Medic` → **Medicine** · `Cyrillic`/`Ukrainian` → **Language** · `Butchery` and `Investigation` dropped. Every profession-shaped card is gone.
>
> **Still open:** [`spirits-are-restless`](../clues/clues.md#spirits-are-restless) is a clue nothing hands out — *"not evidence, not testimony, a feeling grounded in Lemko tradition"* — and it belongs to **Superstitious**, which currently gates only two things. **Geology** is down to five gates and is still the sole route to the flood spine; making that reachable without it remains undone.

### Keys and Modifiers

Cards work two ways, and some do both:

- **Keys** are checked at a gate and otherwise dormant. Medicine, Culture, Geology. They open things.
- **Modifiers** are always on and never asked for. Alcoholic, Wszywka, and anything granting composure. The GM has to hold these in mind every scene, so they sit face-up on the table.

### The Draft

Character creation is a draft, and it is played as the **opening scene** — por. Skowron briefing the committee on the drive in ([The Car In](../events/the-car-in.md)). Every card taken is a line from his dossier: *"Sobczak, you're the geologist. Wierzbicki — property law, and I'm told you go to Mass."*

1. Lay the whole pool **face-up**.
2. **Snake order** — 1-2-3-4, then 4-3-2-1, and back. Whoever takes the best card first is the one still picking when the good ones are gone.
3. **The whole pool is drafted.** Every card ends up in somebody's hand; you only choose the order, and what you give up to take a thing early.
4. Nothing is assigned and nothing is held back. If the committee ends up without a geologist, that is the committee the state sent.

**No resizing for player count.** Nineteen cards deal 7/6/6 to three players, and 5/5/5/4 to four — snake order evens out the short round on its own, since whoever ends up a card light took the best card first. Nothing leaves the game at either size, so the campaign stays fully reachable with three people.

> **Pool is currently 19.** One more would take it to 20 and give four players an exact five each — worth doing only if the card genuinely earns a place.
>
> **`Superstitious` has an orphan clue waiting for it.** [`spirits-are-restless`](../clues/clues.md#spirits-are-restless) is one of the clues nothing in the repo currently gives, and it reads *"not evidence, not testimony — a feeling grounded in Lemko tradition."* Wire it to this card in the redistribution pass.

### The Cards

<!-- One flat list, no categories. Nothing here constrains a pick. -->

| Card | |
|---|---|
| **Alcoholic** | Can't refuse a glass. Drinking scenes open easily, and information flows both ways. |
| **Bureaucracy** | Property title, compensation regulations, state authority, what's legal. Reading ledgers adversarially — discrepancies, money trails, ghost employees, a signature that was traced rather than written. Everyone on the committee can *fill in* a form; this is knowing when one is lying. |
| **Chainsmoker** | You cannot think straight without one going. As long as you have cigarettes, a smoke break steadies you: your first composure [recovery](#recovery) each day costs no card. Run out and the shakes set in — when a scene turns tense and your hands are empty, GM's call, **1 composure**. You also read a person by their tobacco the moment you meet them: the cheap Sport most of the valley smokes, the rough strong stuff, or the rare premium brand a vain man buys. You make [Carmen](../items/carmen-cigarette-butts.md) on sight or scent, instantly, without comparing a thing. |
| **City manners** | You move, speak and dress like somewhere with pavements. Part of this valley has been waiting its whole life to meet you; most of it has not. Bonds come easier with the few who want out or want the world, and harder with everyone else — GM's call, per NPC. |
| **Culture** | The Lemko and Greek Catholic worlds — icons, rites, prayers, what a symbol cut into a headstone means, what a funeral is supposed to look like. **And the forms that come with them:** when the hat comes off, when to wait at the treeline instead of walking up, when the glass set in front of you is a test, which questions cannot be asked standing up. What a community does, and why. **Charms, omens and the warding-off of bad luck belong to Superstitious, not here.** |
| **Devotion** | Not a box on a form — you believe, and you practise. In 1967 that is rarer than it looks, and it is never free. ks. Pająk can tell the difference between a man who crosses himself and a man who means it, and so can Janina, Babcia and Wanda Mazur. It opens the confessional as something other than a place to collect evidence. And the Party expects better of its servants: somebody always notices. **+1 composure — while you are in a state of grace.** See below. |
| **Empathy** | What the person in front of you is feeling, and why. Grief that isn't grief. Fear wearing politeness. The shame underneath an answer. It will not tell you whether they are lying — spotting a lie is baseline for anyone doing this work, the same as noticing what is in the room. It tells you what it would cost them to answer you honestly. |
| **Finesse** | Getting past a thing by touch instead of force. Quick hands, quiet feet. Locks, latches, drawers, a window that was supposed to be shut — **Handiwork fixes and builds; this opens and takes.** Following without being made, searching a room and leaving it exactly as you found it, lifting something off a table while its owner is still talking, lying smoothly enough that nobody reaches for the door. And knowing the shape of a room: who really decides here, who is frightened of whom, where the danger is. |
| **Geology** | Terrain, water tables, field measurements, reading the landscape's warnings. |
| **Handiwork** | **The one who can fix things.** Tools, engines, pumps, charges, drainage, foundations, fences, pens, silos, sandbags. Whether a thing was built well, whether it will hold, and what it would take — with the parts to hand — to make it hold a little longer. The ground itself belongs to Geology; this is everything people put on top of it. |
| **History** | Akcja Wisła, UPA, postwar resettlement, recognising military artifacts. |
| **Language** | Ukrainian and Lemko — full comprehension of documents, inscriptions, Babcia's prayers. Everyone reads basic Cyrillic (school Russian); this card unlocks meaning beyond the letters. |
| **Loaded** | You came into this valley with real money in your pocket: hard currency, not the wages anyone here earns. **Once per game** you can make it count, a bribe nobody can refuse, or a thing bought that money should not be able to buy out here. It opens a door force and talk could not. But a poor village sees a full wallet from a long way off. Spend where the wrong person is watching and you stop being a committee clerk and become the outsider with cash. GM's call: suspicion, resentment, or a hand held out that never closes again. |
| **Medicine** | First aid, herbs/poisons, reading physical trauma on a body or a person. Not a doctor — a physiotherapist, nurse, or paramedic. Can assess and stabilise, not prescribe. **+1 composure** |
| **Physique** | Strength, stamina, and what your body will absorb. Rough terrain, weather, hauling, digging, carrying a grown adult out of the forest in the dark. Matching a village drinker glass for glass and still being the one asking the questions at the end of the night. The grit to keep going after the work turns grim. **+1 composure** |
| **Speech** | Persuasion at any scale. Charm, flattery, getting one frightened person to open up — and calming forty of them, spinning bad news, holding the committee's cover story together when the village starts asking what you are really here for. |
| **Superstitious** | You know the old signs, and they have a hold on you. Mirrors, thresholds, bread, which way a body leaves a house, what it means when a dog will not go somewhere. You will not be argued out of it and you do not try to justify it to the committee. **Culture understands these things; you are subject to them.** When a sign goes badly you feel it — GM's call, **1 composure** — because you are the only one here who knows exactly what it means. |
| **Survival** | Staying alive and oriented where nobody is coming to help. Which way is out, what the weather is about to do, where the ground turns bad, where a person would shelter. Reading what has been through here lately and how long ago. **Physique is whether your body can take the forest; this is whether you know what you are looking at.** |
| **Violence** | Fighting, shooting, restraining — desperate action with consequences. Making someone back down without laying a hand on them, because they can tell what you are capable of. And reading it in others: who in this room has done this before, and whether a fight happened here. **+2 composure** |
| **Wszywka** | Disulfiram implant. *Physically* cannot drink without getting violently ill. Locked out of every drinking scene. The scar is visible. People notice. |

Taking neither alcohol card means an ordinary drinker, which is what most people in this village are.

#### Devotion — the state of grace

Devotion's **+1 composure** is the only thing in the pool that moves during play.

- **You sin.** The +1 is suspended at once. If you were holding that point, it goes now — and if that puts you below 0, you [panic](#below-zero-panic) like anyone else.
- **You confess it to [ks. Pająk](../characters/priest.md).** 1 card. The point comes back. He now knows what you did, and with this priest that is never nothing.
- **No priest, no absolution.** If he is dead, broken, or has refused you, the point stays gone for the rest of the game.

What counts as a sin is the GM's call, and this campaign is generous with occasions — most of them **good tactical play**, which is the whole point. Signing Helena's false death certificate. Recording Zbigniew's fraudulent property claim. Lying to the village about the water. Naming Rezeń to bury the rest of it. Omitting the massacre from the report. Shooting a retreating man. Leaving Paraskewia at the well.

The devout player pays for expedience in a currency nobody else at the table spends.

One tie-back: a committee member kneeling in his confessional and meaning it is evidence to ks. Pająk that redemption is real. Count it **+1 on the [Faith in Redemption](spiritual-endings.md) score** — the player's own sins can push the valley toward Grace.


## What Players Won't Find

This is by design. The 7-day limit and 12-card economy guarantee that players will miss entire branches of the story. Different groups will have completely different experiences depending on where they spend their time.

The game is **not about solving everything** — it's about what you prioritize when you can't.

## Bonds (GM-only mechanic — players never learn this exists)

Each major NPC has a **bond** — a hidden connection that forms with a single player. Players never know the mechanic exists. They just experience certain NPCs opening up to them specifically.

### Rules

1. **Each NPC has 3 checks** in their character file — specific behaviors, choices, or moments.
2. **Any single player who hits 2 of 3** earns the bond. The GM tracks this silently.
3. **One player per NPC.** First player to hit 2 checks gets it. If two players hit 2 simultaneously, the GM picks whoever felt more natural in the fiction.
4. **Bonds are invisible.** No announcement, no signal. The GM simply starts giving that player deeper responses, private moments, confessions. The player might *feel* the connection but never knows it's a mechanic.
5. **Bonds unlock gated content.** Some actions in scene files say `Requires: Bond`. Only the bonded player can trigger these — the NPC won't open up to anyone else.
6. **Bonds can't be lost.** Once earned, it holds for the rest of the game. Trust can be strained narratively, but the mechanical gate stays open.

### What it creates

- **Specialization without assignment.** Players naturally become "the person who talks to Tadek" or "the one the priest trusts" — not because the GM told them to, but because their choices earned it.
- **Exclusive moments.** When Tadek confesses, he confesses to *one player*. That player owns that moment. The others hear about it secondhand.
- **Replay value.** Different player choices → different bonds → different paths through the same story.

### Format in character files

Each character file has a `## Bond` section (GM-only, not shown to players):

```
## Bond

- [ ] [Specific behavior or choice]
- [ ] [Specific behavior or choice]
- [ ] [Specific behavior or choice]

**When bonded:** [What the NPC gives this player — confessions, private moments, gated actions that open up.]
```

### Design notes

- Checks should be **things players do naturally** if they engage with the NPC honestly — not obscure puzzles.
- At least one check should be available early (Day 1–2) so bonds can form before the village closes up.
- Checks should reflect the NPC's values: a pious man bonds over faith, a guilty man bonds over non-judgment, a child bonds over play.

### Grudges (optional — same system, opposite direction)

Some NPCs hold grudges. Same invisible 2-of-3 mechanic, but instead of opening content it **closes** it. The NPC shuts a door for that specific player — stops cooperating, withholds information, or actively works against them.

**Rules:**
1. Same format: 3 checks in the character file, 2 triggers the grudge.
2. **Invisible.** No announcement. The NPC just goes cold on that player.
3. **Player-specific.** Other party members can still approach the NPC normally.
4. **Grudges can block bonds.** If a player earns a grudge, they cannot earn that NPC's bond (even if they later hit the bond checks).
5. **Not every NPC has one.** Only NPCs with the personality to hold grudges AND something meaningful to withhold. Omit for kind, desperate, or too-broken-to-care characters.

**Grudge checks should be:** things players might do if they're careless, aggressive, or authoritarian — disrespecting someone publicly, breaking a confidence, pulling rank. Not unfair traps — natural consequences of being an asshole.

## Composure

Each player starts with **1 composure card.** Composure is visible — players know exactly how many they have. It tracks the psychological toll of the investigation. These are bureaucrats from Warsaw. They came to measure flood damage.

**1 is the baseline maximum.** Certain character-creation cards raise it; nothing in play does. [Recovery](#recovery) restores what was lost, never above the maximum you were built with. A character who can shoot a man and stay standing was made that way in the car — they didn't become it in the village.

### The Three States

| Composure | State |
|---|---|
| **1 or more** | **Steady.** Can spend on things that take nerve. |
| **0** | **Spent.** Shaken, still working, nothing left to give. Folds on anything that costs. |
| **Below 0** | **Broken.** See [Panic](#below-zero-panic). |

**0 is a valid state, not a failure.** A character at 0 keeps interviewing, searching, walking the forest, filling in the ledgers. What they cannot do is anything brave. For a baseline character this is most of the back half of the game — hollowed out and still doing the paperwork, which is the whole picture the scenario is drawing.

### Two Kinds of Cost

Composure is spent two ways, and they behave oppositely. Scene files write both as `Cost: N composure`, so the GM has to know which is which:

- **Gates — voluntary actions.** You must be able to pay. Can't afford it → you fold, nothing happens, no panic. **A gate can take you to 0; it can never take you below.** This is why an ordinary character can never shoot a man: it costs 2, they hold 1, so the action is simply unavailable to them. Not punished — unavailable.
- **Drains — forced exposure.** You are in the room and don't get to decline. A drain **can** push you below 0, and that is the only way to panic.

### Losing Composure

Events, discoveries, and choices drain composure. The GM takes cards when:

| Cost | Trigger type | Examples |
|---|---|---|
| **1** | Witnessing something disturbing | Finding blood at the well, seeing the hag's rites for the first time, discovering the mass grave evidence, a threatening NPC encounter |
| **2** | Witnessing or committing violence | Watching Rezeń beat the hag, shooting someone, being seriously injured in a fight, watching someone die |
| **1** | Making a morally compromising choice | Lying to protect a villager, covering up evidence for Skowron, participating in something you know is wrong |

Costs are cumulative. Watching the well confrontation from the trees might cost 1 (disturbing). Trying to intervene and getting cut by Rezeń costs 2 (violence). Both happen — that's 3 composure gone in one night.

### Below Zero: Panic

When a drain pushes a player **below 0**, they **panic and lose time.** Their next **3 cards** are consumed — the character is non-functional for a full phase. They're shaking, can't focus, can't interview, can't investigate. They sit in the committee house and stare at the wall.

After the lost phase, they **return to 0.** Standing, working, nothing left. Climbing back to 1 costs [recovery](#recovery) — a meal at Zofia's table, or an evening card given up to go to bed early.

**Depth doesn't matter.** −1 and −2 are the same panic. You don't break twice as hard; you break, and you come back empty.

### Composure and Confrontation

This is why composure exists: it determines what you can do under pressure.

- **Pointing a gun at someone:** Free. Anyone can point.
- **Actually shooting a person:** Costs **2 composure.**
- **Holding a physical standoff** (blocking Rezeń, staring down a hostile NPC): Costs **1 composure.** If you're at 0, you fold.
- **Witnessing the aftermath** (the body in the well, the blood, the silence): Costs **1 composure.**

**The Bluff:** When a player points a gun at an NPC, the GM asks: *"Are you going to shoot? It costs 2."* The player must commit before the scene resolves. If they say yes and have 2+ composure, **they spend only 1** — the willingness was enough. The NPC reads the resolve and backs down. The GM overstates the cost. The second composure point is the one they didn't have to spend. **Then the real choice:** the NPC is retreating. The GM asks if they shoot him in the back. *That* costs 2. The cheap victory and the expensive murder are two separate decisions.

NPCs read composure. A player at 4 pointing a gun is a credible threat. A player at 1 pointing a gun is bluffing and everyone at the table knows it.

### Recovery

#### Sleep

Sleep is a **choice about how many cards to spend resting.**

| What you spend | How | Composure |
|---|---|---|
| **All your night cards, plus one evening card** | Go to bed early | **+1** |
| **All your night cards** | Normal night's sleep | **+0** (no change) |
| **Any night card spent on an action** | Partial or no sleep | **−1** |

Written this way it holds at either committee size — three night cards for a four-player game, four for a three-player one.

Going to bed early means losing an evening card — no late-night conversations, no drinking, no social scenes after dark. Recovery costs investigation time.

Using any night cards for actions means you didn't sleep properly. Doesn't matter if you used 1 or all 3 — partial sleep is still bad sleep. You pay -1.

Normal sleep (all 3 night cards unused) is neutral. You don't gain, you don't lose. Just maintenance.

#### Nightmares

When the [well's influence](the-well.md) is strong enough (trigger TBD), **nightmares consume 1 sleep card.** You spend it sleeping but it doesn't count as rest — the well fills it with violence, hands, the satisfaction of breaking. All thresholds shift by 1:

| Cards spent sleeping | Effective rest | Composure |
|---|---|---|
| **5** (2 evening + 3 night) | 4 | **+1** |
| **4** (1 evening + 3 night) | 3 | **+0** |
| **3** (all 3 night cards) | 2 | **-1** |
| **< 3** | < 2 | **-1** |

**Normal sleep now costs composure.** Just sleeping through the night — doing nothing wrong, not staying up — and you wake up worse. To stay neutral, players must go to bed early. To recover, they sacrifice 2 evening cards. The well turns rest itself into a weapon.

Players don't know the mechanic has shifted. They go to bed, wake up, and the GM takes a composure card. *"Bad dreams."* No explanation. No opt-out.

#### Other Recovery (costs cards)

- **Zofia's kitchen:** A meal with [Zofia](../characters/zofia.md) restores **1 composure.** Warmth, normalcy, someone who cares. Costs 1 card.
- **Bimber:** A drinking session restores **1 composure** but the player must have the Drink skill or the Alcoholic card. Without them, it costs 1 composure instead (hangover, loss of control). Costs 1 card.
- **Confession / Opening up:** Telling another character (PC or NPC) what you've seen — honestly — restores **1 composure.** But the information is now shared. If you tell the priest about the well, the priest knows about the well.

Recovery costs cards. Cards are time. Time is the game. **Healing yourself means not investigating.** The mechanic feeds directly back into the core tension.

## Wounds

Binary. You're **wounded** or you're not. A knife cut, dog bites, cracked ribs — doesn't matter how it happened. You're bleeding and it's not stopping on its own.

### How You Get Wounded

Violence. The well confrontation (fighting Rezeń, grabbing the hag and running through dog-infested forest), any physical altercation, being attacked. The GM marks the player as wounded when they take real physical damage.

### What Wounded Does

- **Blocks Endurance and Violence.** You can't run through the forest carrying someone. You can't fight. You can't do hard physical labor. The skills that require a working body stop working.
- **Death clock.** If untreated by the end of the game, **the character dies.** Infection, blood loss, internal damage — a knife wound in rural 1960s Bieszczady without medical care kills you. Not dramatically, not on screen. You just don't make it home.

### Treatment

**1 card from someone with the Medicine skill.** Another player, or an NPC who has medical knowledge. They patch you up — bandages, disinfection, stitches with whatever's available. The wound is treated. You survive. Endurance and Violence are restored.

**Without Medicine in the party:** The hag knows herbs and healing. [Zofia](../characters/zofia.md) has practical first aid. Finding someone who can help costs time — and the person who helps might not be easy to reach.

**Without treatment:** You can still talk, investigate, interview, observe. You can do everything a government clerk does sitting down. You just can't run, fight, or endure. And you're dying slowly.

## Bruised (TBD)

**TBD.** A lighter condition than Wounded, for fights that aren't meant to kill — a fistfight, a drunk brawl, being shoved around. Bruised is not bleeding out and carries no death clock. Used by [Caught at the Still](../events/caught-at-the-still.md).

Open: what Bruised actually costs (temporary Violence/Endurance penalty? a composure tax? clears on its own by next day?). Not yet defined.

## Endings

Each ending has its own prerequisite chain. They stack — the perfect run completes all four.

| Ending | Key Prerequisites |
|--------|------------------|
| **Rest** (the Ritual) | Find Paraskewia Chyłak → free Barbara Kopacz → bring Stefania Kopacz → the words at the well. Priest no longer gatekeeps. Foreclosed if Grace's odpust already fired. |
| **Grace** (the odpust) | Guilty confess to ks. Władysław Pająk → his "Faith in Redemption" score clears threshold → Day-7 general absolution for the whole church. Foreclosed if Rest fired. See [spiritual-endings.md](spiritual-endings.md). |
| **Engineering** | Believe Michał Pytlak → retrieve explosives from bunker → support detonation |
| **Justice** (truth survives the lynch) | Crack witnesses → document truth → use phone → keep Ryszard Dudka stable enough to stand down and testify (he dies, the record lives) |
| **Punishment** (a body, no record) | Truth exposed + no structure = the mob kills and the well swallows it unnamed |
| **The Report** | Massacre discovered → included in report → prof. Tadeusz Bieńkowski called (or not) |

The **perfect run** completes Ritual + Engineering + Justice + Report (with phone call). Possible. Extraordinary.

## Open Questions

- How many players?
- Are there group actions (e.g., two players spending a card together on the same scene)?
- Do some actions cost more than 1 card? (e.g., a full archaeological dig vs. a quick conversation)
- Can events interrupt or consume actions? (e.g., a crisis forces the group to spend an action responding)
