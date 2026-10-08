# Caught at the Still

**Location:** [Bimber still](../locations/bimber-still.md)
**Present:** [Tadek Gajda](../characters/wujas.md), Szymek Kępa, Romek Głowacz, Franek Mucha
**Available:** Any day, when the committee reaches the still while the crew is present — by forest exploration or following the crew from [Village Outskirts](../locations/village-outskirts.md#follow-the-drinking-crew).

## Trigger

- The committee arrives at the still with the crew present around the fire.

## Hook

- Voices, firelight, and the smell of fermentation carry through the trees before the clearing is in sight.

## Setup

- The crew is around the fire with bottles and cards.
- They hear the committee coming before they see them.
- The still, barrels, and sugar sacks are in plain view — no hiding it.
- Government people at the still means their winter's income is exposed.
- The crew is drunk, cornered, and already on its feet by the time the committee reaches the clearing.
- Szymek Kępa puts himself between the committee and the still.
- Franek Mucha moves onto the footpath, cutting the way out.
- Romek Głowacz stays seated and watches.
- [Tadek Gajda](../characters/wujas.md) goes pale and reaches for the bottle.
- This goes to blows unless the committee defuses it. Franek Mucha throws the first punch.
- If any of the committee are already Tadek's [drinking buddies](../characters/wujas.md#drinking-buddy), Tadek stands and vouches for them — but Franek is drunk and riled and does not take his word for it.

## Opportunities

- **The standoff** `(when: Read)` — the crew is not defending a crime scene; they are frightened men protecting the one thing that gets them through the winter. → Gives: [`still-is-their-livelihood`](../clues/clues.md#still-is-their-livelihood)
- **Franek is coiled** `(when: Read or Streetwise)` — Franek Mucha is drunk past reason and cornered against the path. Rank and orders roll off him — short of a drawn gun, he gets turned around or put down, nothing else.

## Actions

### Let Tadek vouch — already buddies
- **When:** At least one committee member is Tadek's [drinking buddy](../characters/wujas.md#drinking-buddy)
- **Outcome:** Tadek gets between the committee and his crew and swears they are alright. Szymek and Romek stand down on his word — but Franek is too drunk to listen and still has to be turned around or put down.
- **Changes:** [Resolving the brawl](#resolving-the-brawl) — the crew count drops to Franek alone


### Talk the crew down
- **When:** Command or Streetwise
- **Cost:** 1 composure
- **Outcome:** An order or a read of the room backs Szymek and Romek off — but not Franek. He is too far gone to care about rank, and still has to be dealt with before he swings.
- **Changes:** [Resolving the brawl](#resolving-the-brawl) — the crew count drops to Franek alone

### Pull a gun on them
- **When:** Holding a firearm
- **Cost:** 1 composure
- **Outcome:** A drawn gun freezes the whole crew, Franek included — even blackout-drunk, he knows what a barrel means. The standoff ends cold. But it turns a scuffle over moonshine into something that could have killed a man, and the crew will not forget a government official pulling a weapon on them.
- **Changes:** [Resolving the brawl](#resolving-the-brawl) — no fight; [Crew Hostile](../characters/wujas.md#crew-hostile) — the crew remembers the gun, the still moves


### Turn him around
- **When:** Streetwise or Sweettalk
- **Cost:** 1 composure
- **Outcome:** Franek is too drunk to track anything. Point him at a threat that is not there — a noise in the trees, the milicja coming up the path — and his aggression lurches off the committee. He stumbles off swinging at shadows.
- **Changes:** [Resolving the brawl](#resolving-the-brawl) — Franek dealt with, no fight

### Scrap
- **Cost:** 1 composure
- **Outcome:** The player throws themselves into the drunk crew, trading blows and grappling bottles away. Counts as one fighter against the crew.
- **Gives:** [Bruised](../cards/bruised.md)
- **Changes:** [Resolving the brawl](#resolving-the-brawl) — +1 fighter

### Beat them up
- **Requires:** [Violence](../cards/violence.md)
- **Cost:** 1 composure
- **Outcome:** The player drops men fast and hard. Counts as two fighters against the crew.
- **Changes:** [Resolving the brawl](#resolving-the-brawl) — +2 fighters

## Mechanics

### Resolving the brawl

- Count the committee's fighters: **Scrap = 1**, **Beat them up = 2**. Sum them.
- Crew present = **4**, or just **Franek (1)** if Tadek has vouched.
- Fighter total meets or beats the crew number → the committee drives them off the clearing.
- Fighter total falls short → the committee is beaten back and driven off the still.
- **Whole crew fought:** World State Change — the crew becomes a standing enemy of the committee and moves the still; NPC State Change — Tadek is shaken and avoids the committee afterward.
- **Only Franek fought (Tadek vouched):** no grudge. Franek gets put in his place, the crew holds no lasting hostility, and Tadek stays friendly. The still stays where it is.

## Exits

- Back into the forest toward %NEW_VILLAGE%.
- To [the store](../locations/the-store.md) drinking circle if the committee became buddies.

## If Missed

- The still stays hidden and the crew keeps their guard.
