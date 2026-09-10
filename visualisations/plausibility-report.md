# Discoverability Sweep, Findings

Full run of `plausibility.py --roster` over every action node that gives a clue.
One model for the whole sweep (`gpt-5-mini`), roster enabled (players know the
public cast and map via Hooks). Verdicts are relative to this model, so read
them as a ranking of relative difficulty, not an absolute pass/fail.

## Method (short)

For each action that hands out a clue, a blind LLM "player" is given only what a
real player would hold at that node: the descriptions of the clues they must
already have, the scene's read-aloud text, atmospheric opportunities, and the
public roster. It is never shown clue IDs, action names, the action list, or the
outcome. It lists up to six things it would try, most likely first. A second
"judge" pass ranks where (if at all) the intended action appears.

- **obvious** (rank 1): named first try
- **reachable** (2-3): named within a few tries
- **buried** (4+): only named deep in the list
- **undiscoverable** (0): never named

## Headline

169 actions tested:

| Verdict | Count | Share |
|---|---|---|
| obvious | 42 | 25% |
| reachable | 39 | 23% |
| buried | 31 | 18% |
| undiscoverable | 57 | 34% |

Roughly half (81) are obvious or reachable. The 57 undiscoverables are the
headline number, but that bucket is inflated and must be read in three groups,
below. Only the third group is a real design problem.

## The 57 undiscoverables split three ways

### 1. By-design, not a gap (reactive, stance, or proof-gated)

These are not investigation deductions. A blind player cannot "guess" them
because they are responses to a moment, moral stances, or confrontations that
require holding specific proof first. Scoring them as undiscoverable is expected
and fine.

- Moral / stance choices: `priests-plea` (all four), `hunters-cross-paths`
  "Get between them" / "Let it burn".
- Proof-gated confrontations: `coffee-at-helenas` "Confront her with her own
  hand", `secondary-characters` "Confront her with one proof" / "with both",
  `butcher-hunts` "Confront him", `well-confrontation` "Grapple him",
  `rezen-takes-the-body` "Confront Rezen".
- Procedural follow-ups to a prior action: `ciotka-found-dead` "Report the
  death" / "Explain the examination" / "Explain the purse" / "Take the money".

### 2. Granularity artifact (the action is split finer than a player speaks)

The design enumerates one physical search as many separate actions. A blind
player says "search the house" once; the judge then fails to match that single
intent against each named object, so every object-level action reads as
undiscoverable. This is a modelling mismatch, not an unreachable clue.

- `ciotka-found-dead`: "Open the wardrobe", "Examine the child's rattle", "Take
  down the bell", "Search the purse" (all undiscoverable) plus "Examine the
  body" and "Search outside the house" (buried). The scene is one search; the
  clues are fine, the split is the problem.

Two fixes, either works:
- Collapse the object searches into one "Search the house" action that gives the
  whole set, or
- Name each object in the scene `## Setup` so a player can notice and ask for it
  by name (this is the "you can't notice what the GM never described" rule).

### 3. Real investigative dead-ends (fix these)

Here a player *should* be able to reason to the action from what they hold, but
the naming is too oblique or the prompting clue is missing. This is the
actionable list.

| Node | Verdict | Clue at stake | Why it fails | Suggested fix |
|---|---|---|---|---|
| `junior` "Offer him a Carmen" / `butcher` "Offer him a Carmen" / "Ask about the Carmen cigarette" | undisc / buried 5 | who smokes the premium Carmen brand | Offering a premium cigarette to read a suspect's reaction is obscure tradecraft; no player names it cold | Seed it: an opportunity that makes them *notice* Carmen as a rare, expensive brand worth testing, then the offer follows |
| `glupek` "Ask Edek about his mother" / `neighbour` "Confront about Ciotka's motherhood" | undiscoverable | Janina is not Edek's real mother | Nothing prompts a player to question motherhood at all | Gate these behind the wardrobe/rattle finds (group 2), so holding "a girl and a baby once lived here" is what triggers the question |
| `neighbour` "Ask about Janka" | undiscoverable | Edward had a daughter, Hania | Hania's name/existence is unknown, so no one asks about her | Needs a prior seed (photo, dress, a name dropped) before the neighbour can be asked |
| `radioman` "Do the arithmetic on the ditch" / `geologists-kit` "Recalculate the whole ditch" | undiscoverable | the ditch cannot carry the flood | Player holds the two cross-sections but never phrases it as "recompute the ditch" | Rename toward the natural player verb ("compare the two ditch measurements"); the intent, not the jargon |
| `pgr-office` "Call the survey archive" / "Date the map against the ground" | undisc / buried 6 | the filed survey is thin; the map predates the landslide | Both are expert moves a layperson won't name | Add an opportunity that flags the map as suspiciously old / the report as suspiciously short |
| `the-church` "Ask Widow about her husband's work" | undiscoverable | Mazur died in the grain silo | Players don't know his death was work-related | Have the Setup or Widow's Hook hint he "died on the farm" so the question has a hook |
| `foreman` "Show him the streambed figures" | undiscoverable | the far streambed is not a real outlet | Pure follow-up that needs the figures in hand and the idea to show them | Acceptable to leave gated, or prompt via the foreman asking to see the numbers |
| `pgr-farm` "Report wolf damage" / `wojewoda` "Report the bimber still" | undiscoverable | wolf predation / the still's location | These are "report what you already found" beats; the player has no reason to volunteer them unprompted | Treat as gated on the prior discovery, or drop as free actions |

## Cross-cutting observations

- **The Carmen thread is the weakest real chain.** Every node that hangs off
  "who smokes Carmen" (butcher, junior, Edek's hidden cigarette, the butt
  comparison) ranks buried or worse. The clue payoff is strong but the entry
  move (offer/notice a premium cigarette) is never named cold. One good seeding
  opportunity would lift the whole chain.
- **The Barnas-family reveals (not-mother, the daughter Hania) are sealed.**
  They score undiscoverable across ciotka, glupek, and the neighbour because
  nothing in the public layer invites the question. They depend entirely on the
  death-scene object finds, which are themselves buried by the granularity
  split. Fix group 2 and this group partly unlocks itself.
- **Expert-survey moves (map dating, archive call, ditch recompute) always read
  buried.** They need a non-expert-facing prompt, or they stay locked behind the
  professor/surveyor skills, which may be intended.

## Caveats

- Verdicts are model-relative. Do not compare these against a run on a different
  model.
- The judge collapses intent, so an over-split action set (group 2) is penalised
  even when the underlying clue is trivially reachable.
- Reactive/stance nodes (group 1) will always score undiscoverable and should be
  excluded from any "coverage" metric.

Raw per-node data: `plausibility.json` (git-ignored).
