# Ryszard Dudka

**Type:** Named character — bystander witness

## Vital Statistics

- **Born:** 1918
- **Age in 1967:** 49
- **Lives in:** [Ryszard Dudka's house](../locations/neighbours-house.md) — alone
- **Settled:** ~1948 — early settler, next door to Barnaś family from the start
- **Armed:** Hunting rifle (licensed)

## Character

Quiet hunter who heard everything in 1954 and did nothing. He carries the guilt of inaction and turns it into fear and hatred of Rezeń. He is the easiest NPC to crack.

## Appearance

- **Clothes:** Wool trousers held up by braces, flannel shirt with sleeves rolled in summer, heavy boots — same outfit every day
- **Hair & face:** Flat cap he rarely removes; pale blue eyes, strong jaw, three-day stubble that never becomes a beard
- **Carriage:** Lean hunter's build, quiet even indoors; shoulders slightly forward, watches hands and posture more than faces

He speaks in short flat sentences with long pauses. He goes quieter when angry, not louder, and smells of tobacco smoke and pine resin.

## Opinions

- **[Barbara Kopacz](barbara.md)** — She and Pawełek are the only good thing left. I bring firewood, watch the boy, fix what breaks, and listen when she talks over the fence.
- **[Stanisław Rezeń](butcher.md)** — I hate him and fear him in equal measure. If the village finds out I talked, he will not hesitate with me.
- **[Janina Gajda](ciotka.md)** — I have watched her tend that boy for thirteen years. I know what she did that night, and I know what it cost her.
- **[Edek Barnaś](glupek.md)** — He is the living reminder. I heard what happened to him and did nothing.
- **`wujas-is-guilty`:** Lots of men drink for bad reasons. I will not say more unless something breaks.

## Mechanics

### Vigilante Targeting

GM tracks which clues leak to Ryszard, mainly through [Barbara](barbara.md) over the fence: whatever she learns, he learns. Whoever the clues point at most becomes his target for the [lynch ending](../events/punishment-lynch.md) — Rezeń by default, but the siblings, wrong people, or the players if the evidence lands there.

### Lynch Targets

GM tracks score per target. Highest when he snaps = who he goes after.

**Starting scores:** Rezeń 2, Players 1, Zbigniew 1, Tadek 0, Helena 0, Hag 0

| Clue | Target | Change |
|---|---|---|
| `three-drunk-attackers` | Rezeń | +1 |
| `three-drunk-attackers` | Zbigniew | +1 |
| `three-drunk-attackers` | Tadek | +1 |
| `jagna-was-attacked` | Rezeń | +2 |
| `jagna-was-attacked` | Tadek | +2 |
| `wojewoda-was-hurt-that-night` | Zbigniew | +1 |
| `butcher-has-soldiers-gun` | Rezeń | +1 |
| `butcher-dumped-the-body` | Rezeń | +1 |
| `glupek-strangled` | Rezeń | +3 |
| `matrona-orchestrated-lynch` | Helena | +4 |
| `painter-heard-matrona` | Helena | +2 |
| `butcher-visits-the-well` | Rezeń | +1 |
| `fresh-blood-at-well` | Rezeń | +1 |
| `someone-killed-at-well` | Rezeń | +3 |
| `lynch-body-in-well` | Zbigniew | +1 |
| `foreman-coverup` | Zbigniew | +2 |
| `hag-blamed-for-wolves` | Hag | +2 |
| Pawełek dies (players promised help) | Players | +3 |
| Pawełek dies (no promise) | Players | +1 |
| Players prevent Ciotka's funeral | Players | +1 |
| Players lied about flood danger | Players | +2 |
| Players expose truth without structure | Players | +2 |
| Players protect someone he blames | Players | +2 |
| Players help with flood preparation | Players | -1 |
| Players help at PGR | Players | -1 |
| Players help with wolf hunt | Players | -2 |
| Players cure Pawełek | Players | -3 |
| Players stabilize Pawełek | Players | -1 |
| Players play with Pawełek | Players | -1 |
| Players push Barbara about the father | Players | +1 |

### Humiliated

A standalone status, tracked separately from the lynch scoring above. Ryszard picks it up if [the two hunters' clash](../events/hunters-cross-paths.md) is left to run its course and Rezeń wins it.

While Humiliated:
- He is shorter, colder, and quicker to anger in every later scene.
- His hatred of Rezeń stops being talk.
- Cleared only if the players later give him something that restores face against Rezeń.

## Actions

### Census interview
- **Requires:** Committee authority
- **Cost:** 1 action
- **Outcome:** He starts hostile to government people in his home, then cooperates with clipped answers.
- **Gives:** Census data — Ryszard Dudka, farmer.

### Property assessment
- **Requires:** Committee authority
- **Cost:** 1 action
- **Outcome:** He identifies his house and plot next to [Janina's](../locations/ciotkas-house.md). His papers are in order and his answers stay clipped.
- **Gives:** Property record — Dudka house and farmland.

### Ask about Janka
- **Requires:** He liked the players; they mention Janina, Edek, or the house next door
- **Cost:** Free
- **Outcome:** He says Janina moved in after the Barnaś family was gone, when the boy was already there.
- **Gives:** [ciotka-moved-in-after-they-were-gone](../clues/clues.md#ciotka-moved-in-after-they-were-gone), [barnas-had-a-daughter](../clues/clues.md#barnas-had-a-daughter)

### Ask how Janina got the house
- **Requires:** Ask about Janka
- **Cost:** Free
- **Outcome:** He stiffens and says [Wojewoda](wojewoda.md) gave it to her. Then the door closes.
- **Gives:** [`ciotka-house-is-wojewodas`](../clues/clues.md#ciotka-house-is-wojewodas)

### Ask about the daughter
- **Requires:** He trusts the players (at least one Bond ticked) and [barnas-had-a-daughter](../clues/clues.md#barnas-had-a-daughter); they ask what became of the girl
- **Cost:** 1 action
- **Outcome:** He says she fled that night toward the treeline and that, two winters later, he found a coat and bones near the old fireroad. He says he knew the coat and buried her himself.
- **Gives:** [jagna-fled-the-lynch](../clues/clues.md#jagna-fled-the-lynch), [neighbour-believes-jagna-dead](../clues/clues.md#neighbour-believes-jagna-dead)

### Confront about Ciotka's motherhood
- **Requires:** [ciotka-moved-in-after-they-were-gone](../clues/clues.md#ciotka-moved-in-after-they-were-gone) and [edeks-father-orphaned-him](../clues/clues.md#edeks-father-orphaned-him)
- **Cost:** Free
- **Outcome:** He laughs and says Janina is not the boy's mother. She moved in after them, and the boy was already there.
- **Gives:** [ciotka-not-mother](../clues/clues.md#ciotka-not-mother)

### Uplift Ryszard
- **Requires:** [Humiliated](#humiliated)
- **Cost:** Free
- **Outcome:** The player puts the steel back in him and gives him his face back.
- **Gives:** NPC State Change: clears [Humiliated](#humiliated); in [the well](../events/well-confrontation.md#dudkas-rifle-if-he-is-present), he can hold the rifle on Rezeń.

## Bond

- [ ] **Treat Barbara and Pawełek as people, not sources** — ask after them, help the boy, notice the one clean thing in his life
- [ ] **Meet his 1954 guilt without contempt** — when the inaction surfaces, don't call him a coward; let it stand
- [ ] **Stand with him against Rezeń** — back him in a real moment instead of leaving him alone with it: defuse [the clash](../events/hunters-cross-paths.md) in his favour, [Uplift him](#uplift-ryszard), or stand beside him at [the well](../events/well-confrontation.md#dudkas-rifle-if-he-is-present)

## Grudge

- [ ] **Side with Rezeń or humiliate him** — go on [the hunt with Rezeń](../events/hunt-with-rezen.md), laugh him down yourself, dismiss the threat he sees, or leave [the clash](../events/hunters-cross-paths.md) to run so Rezeń wins it
- [ ] **Endanger or use Barbara or Pawełek** — push Barbara carelessly, let the boy come to harm, or treat his one clean thing as leverage
- [ ] **Treat him as a 1954 suspect** — pull rank, interrogate him as if he were complicit, corner the witness who already can't forgive his own inaction
