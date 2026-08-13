# Ryszard Dudka

**Type:** Named character — bystander witness

## Vital Statistics

- **Born:** 1918
- **Age in 1967:** 49
- **Lives in:** [Ryszard Dudka's house](../locations/neighbours-house.md) — alone
- **Settled:** ~1948 — early settler, next door to Barnaś family from the start
- **Armed:** Hunting rifle (licensed)

## Character

Quiet hunter. Heard everything in 1954, did nothing. Carries the guilt of inaction. Openly vindictive toward Rezeń. The easiest NPC to crack.

## Appearance

- **Clothes:** Wool trousers held up by braces, flannel shirt (sleeves rolled in summer), heavy boots — same outfit every day
- **Hair & face:** Flat cap he rarely removes; pale blue eyes, strong jaw, three-day stubble that never becomes a beard
- **Carriage:** Lean hunter's build, moves quietly even indoors; shoulders slightly forward, watches your hands and posture, not your face

Speaks in short flat sentences with long pauses. Goes quieter when angry, not louder. Smells of tobacco smoke and pine resin.

## Schedule

| Phase | Location | Notes |
|---|---|---|
| **Morning** | Forest or [his house](../locations/neighbours-house.md) | Hunting, checking traps, or chopping wood. |
| **Afternoon** | [His house](../locations/neighbours-house.md) or [Barbara's fence](../locations/barbaras-house.md) | Repairs, firewood delivery. Talks to Barbara over the fence. |
| **Evening** | [His house](../locations/neighbours-house.md) | Alone. Rifle cleaning, tobacco, radio. Listens to Barbara's news. |
| **Night** | [His house](../locations/neighbours-house.md) | Light sleeper. Hears everything next door and beyond. |

## Opinions

- **[Barbara Kopacz](barbara.md)** — The only good thing left. She's warm and kind and she trusts me completely. I bring firewood, watch the boy, fix what breaks. She tells me everything she hears — the committee, the village, all of it — and she has no idea what I do with it. She and Pawełek are the only untainted thing in my life.
- **[Stanisław Rezeń](butcher.md)** — I'm terrified of him. If the village finds out I talked, Rezeń — who smothered a crying child that night until Janina tore the pillow away — won't hesitate with me. I hate him and I fear him in equal measure.
- **[Janina Gajda](ciotka.md)** — She lives next door. I've watched her tend that boy for thirteen years. Her devotion, her grief — I see it all from my window. I know what she did that night. I know what it cost her.
- **[Edek Barnaś](glupek.md)** — The living reminder. Thirteen years seeing him next door, growing up broken. I heard what happened to him and I did nothing.
- **`wujas-is-guilty`:** Goes still. Long silence. "Lots of men drink for bad reasons." Won't say more.

## Mechanics

### Vigilante Targeting

GM tracks which clues leak to Ryszard (mainly through [Barbara](barbara.md) over the fence — **whatever she learns, he learns**). Whoever the clues point at most becomes his target for the [lynch ending](../events/punishment-lynch.md) — Rezeń by default, but the siblings, wrong people, or even the players if that's where the evidence lands.

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
| `wojewoda-was-shot` | Zbigniew | +1 |
| `butcher-has-soldiers-gun` | Rezeń | +1 |
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

A standalone status, tracked separately from the lynch scoring above. Ryszard picks it up if [the two hunters' clash](../events/hunters-cross-paths.md) is left to run its course — the players don't separate them, so Rezeń wins it, laughs him down, calls him *Rychu* and pats his back. Defusing the clash before Rezeń wins prevents the status entirely.

While Humiliated:
- He is shorter, colder, quicker to anger in every later scene. The easiest NPC to crack cracks *harder* against Rezeń — he'll spill with less prompting — but he is also further down the road to acting on his own.
- His hatred of Rezeń stops being talk. Where before he'd rage and do nothing, now he's a man looking for the moment to prove he isn't nothing.
- Cleared only if the players later give him something that restores face against Rezeń (GM's call).


## Actions

### Census interview — Ryszard
- **Requires:** Committee authority
- **Cost:** 1 action
- **Outcome:** Hostile at first — government people flooding his home. But he cooperates. Standard form, standard answers. If he doesn't like the players — forms filled, door closed. Nothing extra.

### Ask about Janka
- **Requires:** He liked the players. They mention Janina, Edek, or the house next door.
- **Cost:** Free
- **Outcome:** *"Janina? She hasn't been there that long. A family lived there before — soldier, Barnaś. Had a daughter, a wife. They left. Then Janina moved in with the boy."* Flat, factual, no drama.
  - **If players push deeper** — ask how she got the house, why the best plot: he stiffens. *"Wojewoda gave it to her. Ask him."* Door closes.
- **Gives:** [ciotka-moved-in-after-they-were-gone](../clues/clues.md#ciotka-moved-in-after-they-were-gone), [barnas-had-a-daughter](../clues/clues.md#barnas-had-a-daughter)

### Ask about the daughter
- **Requires:** He trusts the players (at least one Bond ticked) + [barnas-had-a-daughter](../clues/clues.md#barnas-had-a-daughter). They ask what became of the girl.
- **Cost:** 1 action
- **Outcome:** Long silence. He sets down whatever's in his hands. *"She ran. That night — I heard the dogs, the shouting, then feet in the dark going up toward the treeline. Fast. Alone. Nobody caught her."* A pause. *"Two winters on I was past the old fireroad with the rifle. Found what the forest leaves. A coat. Bones. Not much."* He says it like settled fact — *"I knew the coat. Buried her myself."* But press him and it cracks: no face, no proof, just a coat that might have been hers. He decided it was her because he needed somewhere to put the grief. *"A grave was more than anyone else gave her."* He'll never say aloud that he isn't sure.
- **Gives:** [jagna-fled-the-lynch](../clues/clues.md#jagna-fled-the-lynch), [neighbour-believes-jagna-dead](../clues/clues.md#neighbour-believes-jagna-dead)

### Confront about Ciotka's motherhood
- **Requires:** [ciotka-moved-in-after-they-were-gone](../clues/clues.md#ciotka-moved-in-after-they-were-gone) + [edeks-father-orphaned-him](../clues/clues.md#edeks-father-orphaned-him) (players have both: neighbour says she moved in after, census says she's the mother)
- **Cost:** Free
- **Outcome:** He laughs. *"Mother? Janka? No, come on. She moved in after them. The boy was already there."* Casual, amused — it's obvious to him.
- **Gives:** [ciotka-not-mother](../clues/clues.md#ciotka-not-mother)

### Uplift Ryszard
- **Requires:** [Humiliated](#humiliated)
- **Cost:** Free — **Sweettalk** (Rezeń's contempt is a lie; he isn't the nothing he was made to feel), **Intimidate** (he's about to freeze and let it happen again — shame him into moving), or point out he's the only one here who can stop it; the strongest version is simply standing with him against Rezeń
- **Outcome:** You put the steel back in him and give him his face back. **Clears [Humiliated](#humiliated)** (NPC State Change). Its sharpest use is in the moment at [the well](../events/well-confrontation.md#dudkas-rifle-if-he-is-present), where it's what lets him hold the rifle on Rezeń and go through with it.

## Bond

- [ ] **Treat Barbara and Pawełek as people, not sources** — ask after them, help the boy, notice the one clean thing in his life. (Available early — Day 1–2 over Barbara's fence.)
- [ ] **Meet his 1954 guilt without contempt** — when the inaction surfaces, don't call him a coward; let it stand. A guilty man bonds over non-judgment.
- [ ] **Stand with him against Rezeń** — back him in a real moment instead of leaving him alone with it: defuse [the clash](../events/hunters-cross-paths.md) in his favour, [Uplift him](#uplift-ryszard), or stand beside him at [the well](../events/well-confrontation.md#dudkas-rifle-if-he-is-present).

**When bonded:** He drops the hard-quiet-hunter act for this player. He gives the full 1954 night unprompted, admits aloud he was never certain the bones were Jagna's, and — the thing that matters — he *listens* to this player when he's on the edge of the lynch. This is the player who can keep him stable ([Justice ending](../events/punishment-lynch.md)).

## Grudge

- [ ] **Side with Rezeń or humiliate him** — go on [the hunt with Rezeń](../events/hunt-with-rezen.md), laugh him down yourself, dismiss the threat he sees, or leave [the clash](../events/hunters-cross-paths.md) to run so Rezeń wins it (see [Humiliated](#humiliated)).
- [ ] **Endanger or use Barbara or Pawełek** — push Barbara carelessly, let the boy come to harm, or treat his one clean thing as leverage.
- [ ] **Burn his discretion** — let it get back to Rezeń or the village that he's been talking to the committee about 1954. Being tied to the outsiders is the exact thing he's terrified of; do it and hand his worst fear straight to the village.