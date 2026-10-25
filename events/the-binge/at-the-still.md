# The Binge — At the Still

**Part of:** [@name](the-binge.md)
**Location:** [@name](../../locations/bimber-still.md)
**Present:** [@name](../../characters/wujas.md), [@name](../../characters/secondary/romek-glowacz.md), [@name](../../characters/secondary/franek-mucha.md)
**Tags:** [@name](../../tags/libation.md)

## Hook

- Firelight and voices from the clearing by the still at night.

## Setup

The men sit around the fire with bottles and cards,[](#sit-down-and-drink-with-the-crew)[](#get-shitfaced-with-wujas) drinking the still's own [@name](../../items/bimber.md).[](#crew-mock-past-state-surveyors)[](#crew-rib-geologist-as-drunk)[](#the-crew-opens-the-first-bottle)

## Opportunities

### The crew opens the first bottle
- **When:** setup:events/the-binge/at-the-still.md
- **Outcome:** One of the crew sets the first bottle on the table and pours a round.
- **Changes:** [Round](../../tags/libation.md#round) — +1

### Crew mock past state surveyors
- **When:** [Drinking Buddy](../../characters/wujas.md#drinking-buddy) is true
<!-- Prompted by: [the-flood-line-potentially-miscalculated](../../clues/clues.md#the-flood-line-potentially-miscalculated) -->
- **Outcome:** The crew laugh about the state surveyors who came before: they drank more than they measured, drove a few stakes, and left early.
- **Gives:** [geologists-were-drinking](../../clues/clues.md#geologists-were-drinking)

### Crew rib geologist as drunk
- **Noticed by:** [Geology](../../cards/geology.md)
- **When:** [@present](../../characters/wujas.md)
<!-- Prompted by: [committee-runs-geographical-survey](../../clues/clues.md#committee-runs-geographical-survey) -->
- **Outcome:** The crew rib the geologist as one of them. They clock him for what he is and lean into the joke: survey men are all famous drunks, and the last lot who came drank through their whole visit.
- **Gives:** [surveyors-are-known-drunks](../../clues/clues.md#surveyors-are-known-drunks)

## Actions

### Sit down and drink with the crew
- **Requires:** [Physique](../../cards/physique.md) OR [Alcoholic](../../cards/alcoholic.md)
- **When:** [@present](../../characters/wujas.md)
<!-- Prompted by: setup:events/the-binge/at-the-still.md -->
- **Cost:** 1 time
- **Outcome:** The committee takes the offered bottle and makes it clear they are not here to shut the still down. The crew relaxes and the night turns into a session. [@nickname](../../characters/wujas.md) warms to whoever kept pace without judging him.
- **Changes:** [Drinking Buddy](../../characters/wujas.md#drinking-buddy) — the drinking PCs become [@nickname](../../characters/wujas.md)'s drinking buddies

### Get shitfaced with Wujas
- **When:** [Drinking Buddy](../../characters/wujas.md#drinking-buddy) is true
<!-- Prompted by: setup:events/the-binge/at-the-still.md -->
- **Cost:** 2 time + 1 composure
- **Outcome:** The committee drinks [@nickname](../../characters/wujas.md) past the point of guard. He gets loud, then maudlin, and grief for a woman he won't name slips out before he can catch it.
- **Gives:** [`wujas-misses-someone`](../../clues/clues.md#wujas-misses-someone)

### Ask about the butcher
- **When:** [Drinking Buddy](../../characters/wujas.md#drinking-buddy) is true
<!-- Prompted by: hook:characters/butcher.md -->
- **Outcome:** Loose with drink, [@nickname](../../characters/wujas.md) remembers [@name](../../characters/butcher.md) sitting in on the crew's sessions years back, bottle in hand like any of them. Then one day he just stopped, and never came back to the fire.
- **Gives:** [`butcher-used-to-drink-with-the-crew`](../../clues/clues.md#butcher-used-to-drink-with-the-crew)
