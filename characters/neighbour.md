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
- **[Stanisław Rezeń](butcher.md)** — I'm terrified of him. If the village finds out I talked, Rezeń — who wanted to kill an infant to eliminate witnesses — won't hesitate with me. I hate him and I fear him in equal measure.
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
| `jagna-was-raped` | Rezeń | +2 |
| `jagna-was-raped` | Tadek | +2 |
| `glupek-strangled` | Rezeń | +3 |
| `matrona-orchestrated-lynch` | Helena | +4 |
| `painter-heard-matrona` | Helena | +2 |
| `butcher-visits-the-well` | Rezeń | +1 |
| `fresh-blood-at-well` | Rezeń | +1 |
| `someone-killed-at-well` | Rezeń | +3 |
| `lynch-bodies-in-well` | Zbigniew | +1 |
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

### Confront about Ciotka's motherhood
- **Requires:** [ciotka-moved-in-after-they-were-gone](../clues/clues.md#ciotka-moved-in-after-they-were-gone) + [edeks-father-orphaned-him](../clues/clues.md#edeks-father-orphaned-him) (players have both: neighbour says she moved in after, census says she's the mother)
- **Cost:** Free
- **Outcome:** He laughs. *"Mother? Janka? No, come on. She moved in after them. The boy was already there."* Casual, amused — it's obvious to him.
- **Gives:** [ciotka-not-mother](../clues/clues.md#ciotka-not-mother)

## Bond

- [ ] Ask how Barbara and Pawełek are doing — show you notice them as people, not just sources
- [ ] Accept his initial deflection gracefully — come back later instead of pushing
- [ ] Demonstrate discretion — tell him something you learned and that you haven't shared it widely


## Grudge

- [ ] Ask about the 1954 events in front of Barbara or within earshot of her
- [ ] Push him aggressively when he's clearly shutting down — don't take no for an answer
- [ ] Let information leak that he could trace back to the players being careless