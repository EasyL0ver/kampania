# Ciotka Found Dead

**Location:** [Ciotka's house](../locations/ciotkas-house.md)
**Present:** [Janina Gajda](../characters/ciotka.md) (dead)
**Available:** Day 3 or later, when players visit [Ciotka's house](../locations/ciotkas-house.md).

## Trigger

- Players visit [Ciotka's house](../locations/ciotkas-house.md) on Day 3 or later.
- Fallback trigger: [ks. Władysław Pająk](../characters/priest.md) notices [Janina Gajda](../characters/ciotka.md)'s absence at the anti-flood mass on Day 4 morning and sends someone to check.

## Hook

- [Janina Gajda](../characters/ciotka.md)'s door is unlocked.
- [Janina Gajda](../characters/ciotka.md) is absent from mass if the fallback trigger fires.

## Setup

- The door is unlocked.
- [Janina Gajda](../characters/ciotka.md) always locked the door.
- Cigarette butts lie scattered just outside the door.
- The house is quiet.
- The icons remain on the walls.
- The candles have burned out and have been out for hours.
- The house remains obsessively ordered.
- One corner tells another story: furniture is smashed, a shelf torn down, crockery broken across the floor.
- A mirror in the corridor is shattered.
- Nothing has been ransacked.
- Nothing has been stolen.
- [Janina Gajda](../characters/ciotka.md) lies on the kitchen floor.
- [Janina Gajda](../characters/ciotka.md) is on her back, half-turned.
- [Janina Gajda](../characters/ciotka.md)'s eyes are open.
- A fresh, dark bruise rings one of [Janina Gajda](../characters/ciotka.md)'s wrists.
- Apart from the bruise, there is no wound and no blood.
- [Janina Gajda](../characters/ciotka.md)'s hands are at her sides.
- A fallen rosary is near one half-curled hand.
- A glass with a finger of water sits on the table.
- Two used coffee cups sit on the table.
- A small brown pill bottle lies on its side on the table with the cap off.
- [Edek Barnaś](../characters/glupek.md)'s room is empty.
- [Edek Barnaś](../characters/glupek.md)'s mattress is cold.
- There is no sign of forced entry.
- The wrecked corner reads like a violent struggle.
- There is no weapon.
- A kitchen chair lies on its side among the wreckage.
- **Entering the kitchen, where the body lies, costs 1 composure.**
- **Composure:** 2.

## Opportunities

- **She is dead** `(requires: Enter the kitchen)` — [Janina Gajda](../characters/ciotka.md) lies on the floor, eyes open, candles long out. She is dead. → Gives: [`ciotka-is-dead`](../clues/clues.md#ciotka-is-dead)
- **The two cups** `(requires: Enter the kitchen)` `(prompted by: [ciotka-is-dead](../clues/clues.md#ciotka-is-dead))` — Two used coffee cups sit on the table. She was not alone the day before; someone sat and drank with her. → Gives: [`two-coffee-cups`](../clues/clues.md#two-coffee-cups)
- **The wrecked corner** `(requires: entering the house)` `(prompted by: [ciotka-is-dead](../clues/clues.md#ciotka-is-dead))` — One corner of the obsessively ordered house is smashed: toppled furniture, a torn-down shelf, crockery across the floor, a shattered mirror in the corridor. It reads like a violent struggle. → Gives: [`ciotka-house-wrecked`](../clues/clues.md#ciotka-house-wrecked)
- **The cigarette butts** `(requires: entering the house)` `(prompted by: [ciotka-is-dead](../clues/clues.md#ciotka-is-dead))` — Some cigarette butts lie just outside the door, hand-pinched and rain-weathered, dropped a day or more before she died. You cannot tell the brand at a glance, but bagged they could be compared.
- **Read the room** `(requires: Finesse)` — This is a death the village has not found yet. Get caught here and you look like the killer. Keep it quiet.
- **Keep it quiet for now** `(requires: Bureaucracy or Violence)` — Once the village knows, the committee loses control of the scene: a crowd, grief, a hunt for someone to blame, and no room left to investigate. Better to sit on the death a while and work first.
- **Examine her properly** `(requires: Medicine)` — A real examination is impossible through her clothes. Her body would have to be undressed first.
- **The bell looks unsteady** `(requires: Handiwork, and the attic open)` — The bell is balanced high and badly seated. Anyone reaching for it will knock it loose unless they are ready to catch it.
- **The roof is wrong** `(requires: Handiwork, and the attic open)` — Up under the rafters the shingles and boards don't match the roof: pieces cut and curved to skin a dome, reused flat. A builder sees it at once, this timber was made for something round, not this house. → Gives: [`roof-built-for-a-dome`](../clues/clues.md#roof-built-for-a-dome)
- **The wrong icons** `(requires: Devotion, and the attic open)` — Icons are stacked up in the attic, out of sight of the rooms below. A believer sees it at once: these are Eastern-rite, not the Roman Catholic images hung downstairs. They do not belong in this house. → Gives: [`icons-in-attic-not-catholic`](../clues/clues.md#icons-in-attic-not-catholic)
- **He is armed** `(requires: [Dudka has barged in](#noise))` — Dudka fills the doorway with a hunting rifle level on them. → Gives: [`neighbour-has-rifle`](../clues/clues.md#neighbour-has-rifle)

## Actions

### Enter the kitchen
- **Requires:** Nothing
- **Cost:** 1 composure
- **Outcome:** The players step into the kitchen. [Janina Gajda](../characters/ciotka.md) lies dead on the floor. Only now can they get close enough to examine the body and the table.
- **Gives:** Scene Unlock: [Undress the body](#undress-the-body).

### Undress the body
- **Requires:** Entering the kitchen (see [Enter the kitchen](#enter-the-kitchen))
- **Prompted by:** [`ciotka-is-dead`](../clues/clues.md#ciotka-is-dead)
- **Cost:** 1 composure
- **Outcome:** They strip the dead woman on her own kitchen floor to get at what her clothes hide. If anyone walks in while she is undressed, the committee is caught stripping a dead old woman: a scandal that turns the village against them.
- **Gives:** World State Change: the body is undressed.

### Examine the body
- **Requires:** The body undressed (see [Undress the body](#undress-the-body)); **Medicine**
- **Prompted by:** [`ciotka-is-dead`](../clues/clues.md#ciotka-is-dead)
- **Cost:** Free
- **Outcome:** No strangulation, no defensive wounds. But a fresh bruise grips her wrist, a large hand closed hard while she still lived. It did not kill her, and it did not come from a fall.
- **Gives:** [`ciotka-hurt-before-death`](../clues/clues.md#ciotka-hurt-before-death)

### Search the house
- **Requires:** Nothing
- **Prompted by:** [`ciotka-is-dead`](../clues/clues.md#ciotka-is-dead)
- **Cost:** 1 action
- **Outcome:** With Janina dead and the door unlocked, the house is theirs to go through. The backyard, icons, and [Edek Barnaś](../characters/glupek.md)'s room remain as described in [Ciotka's house](../locations/ciotkas-house.md); the shut attic can now be opened without her in the way.
- **Gives:** Scene Unlock: [Ciotka's house actions](../locations/ciotkas-house.md#actions) remain available in the context of the death.

### Search the purse
- **Requires:** Having examined the body or searched the house
- **Prompted by:** [`ciotka-is-dead`](../clues/clues.md#ciotka-is-dead)
- **Cost:** 1 action
- **Outcome:** Janina kept her purse close, among her few private things. Inside is the attic key, kept where no one would find it, and a thick roll of banknotes, far more cash than a widow of this village should have. With the key the attic opens quietly, no forcing, no noise.
- **Gives:** Item / Evidence: the attic key. Clue: [cash-in-ciotkas-purse](../clues/clues.md#cash-in-ciotkas-purse).

### Take the money
- **Requires:** Having searched the purse
- **Prompted by:** [`cash-in-ciotkas-purse`](../clues/clues.md#cash-in-ciotkas-purse)
- **Cost:** Free
- **Outcome:** The players take the roll of banknotes for themselves. Whoever keeps it now carries real cash in a valley that has none.
- **Gives:** The player who takes the money gains the [Loaded](../story-facts/game-system.md) trait. Clue: [`committee-stole-money`](../clues/clues.md#committee-stole-money).

### Open the attic with the key
- **Requires:** The [attic key](#search-the-purse)
- **Prompted by:** [`ciotka-is-dead`](../clues/clues.md#ciotka-is-dead)
- **Cost:** 1 action
- **Outcome:** The key turns and the hatch lifts quietly. It is the one part of the house Janina guarded.
- **Gives:** World State Change: the attic is open.

### Force the attic
- **Requires:** Force the locked hatch (**Handiwork**, **Violence**, or **Physique**)
- **Prompted by:** [`ciotka-is-dead`](../clues/clues.md#ciotka-is-dead)
- **Cost:** 1 action
- **Outcome:** The players break the locked hatch open. It is loud, splintered wood and a scene the neighbours can hear.
- **Gives:** World State Change: the attic is open. +2 [Noise](#noise).

### Search the pile of rubbish
- **Requires:** The attic is open (see [Open the attic with the key](#open-the-attic-with-the-key) or [Force the attic](#force-the-attic))
- **Prompted by:** [`ciotka-is-dead`](../clues/clues.md#ciotka-is-dead)
- **Cost:** 1 action
- **Outcome:** A box in the rubbish is marked "EDEK" and reads at a glance like the boy's things. It is not: the belongings are a grown man's, wrong size and wrong age for [Edek Barnaś](../characters/glupek.md). Edward Barnaś went by Edek too. The box is thick with dust and has sat untouched for years. Among the belongings is an old iron front-door key.
- **Gives:** Item / Evidence: the [box marked "EDEK"](../items/edek-box.md) of a grown man's belongings.

### Open the wardrobe
- **Requires:** The attic is open (see [Open the attic with the key](#open-the-attic-with-the-key) or [Force the attic](#force-the-attic))
- **Prompted by:** [`ciotka-is-dead`](../clues/clues.md#ciotka-is-dead)
- **Cost:** 1 action
- **Outcome:** Inside the big wardrobe, a teenage girl's dress, folded and kept. A girl that age lived in this house once.
- **Gives:** [girls-dress-in-ciotkas-house](../clues/clues.md#girls-dress-in-ciotkas-house)

### Examine the child's rattle
- **Requires:** The attic is open (see [Open the attic with the key](#open-the-attic-with-the-key) or [Force the attic](#force-the-attic))
- **Prompted by:** [`ciotka-is-dead`](../clues/clues.md#ciotka-is-dead)
- **Cost:** 1 action
- **Outcome:** A small child's rattle, kept with the rest. A baby lived in this house once.
- **Gives:** [childs-rattle-in-ciotkas-house](../clues/clues.md#childs-rattle-in-ciotkas-house)

### Take down the bell
- **Requires:** The attic is open (see [Open the attic with the key](#open-the-attic-with-the-key) or [Force the attic](#force-the-attic))
- **Prompted by:** [`ciotka-is-dead`](../clues/clues.md#ciotka-is-dead)
- **Cost:** 1 action
- **Outcome:** A small brass Greek Catholic liturgical bell with Cyrillic lettering sits high up, out of place in a Roman Catholic home. Reaching it knocks it loose and it falls, ringing and clattering.
- **Gives:** Item / Evidence: [Lemko Bell](../items/lemko-bell.md) + [lemko-bell-in-ciotkas-house](../clues/clues.md#lemko-bell-in-ciotkas-house). +3 [Noise](#noise).

### Catch the bell
- **Requires:** Reaching for the bell (see [Take down the bell](#take-down-the-bell)); **Finesse** or **Physique**
- **Cost:** Free
- **Outcome:** Quick hands and a long reach catch the bell as it comes loose, before it hits the floor. It never rings.
- **Gives:** Negates the +3 [Noise](#noise) from taking the bell.

### Search outside the house
- **Requires:** Go outside and search the mud.
- **Prompted by:** [`ciotka-is-dead`](../clues/clues.md#ciotka-is-dead)
- **Cost:** 1 action
- **Outcome:** Cigarette butts lie scattered by the door. Large bare footprints run from the house toward the tree line and fade where the canopy starts.
- **Gives:** Item / Evidence: [Carmen Cigarette Butts](../items/cigarette-butts-from-ciotkas.md) + [`glupek-fled-into-forest`](../clues/clues.md#glupek-fled-into-forest). +1 [Noise](#noise).

### Report the death
- **Requires:** Nothing
- **Prompted by:** [`ciotka-is-dead`](../clues/clues.md#ciotka-is-dead)
- **Cost:** 1 action
- **Outcome:** They call it in. Dudka, the priest, and the village women come, and the house is no longer theirs. The women lay Janina out; her purse is inventoried in the open, the cash and the attic key seen by everyone and taken by no one. The attic stays shut, and there is no more undressing her, searching unseen, or pocketing anything. In return their standing is clean: no Noise, no scandal, no barge-in. A [Medicine](../story-facts/game-system.md) player present at the laying-out sees the bruise on her wrist.
- **Gives:** World State Change: the death is public; the private actions (attic, [Undress the body](#undress-the-body), [Take the money](#take-the-money), searching unobserved) close. Clue: [`cash-in-ciotkas-purse`](../clues/clues.md#cash-in-ciotkas-purse). With a Medicine player present: [`ciotka-hurt-before-death`](../clues/clues.md#ciotka-hurt-before-death).

### Talk Dudka down
- **Requires:** [Dudka has barged in](#noise); **Speech**, **Finesse**, or **Devotion**
- **Prompted by:** [`neighbour-has-rifle`](../clues/clues.md#neighbour-has-rifle)
- **Cost:** 1 composure
- **Outcome:** They convince him this is a real committee investigation, not what it looks like. Speech calms him, Finesse reads that he is frightened rather than dangerous and works that, Devotion reaches the guilt he carries. He lowers the rifle. Do not pull rank on him; treating him as government muscle or a suspect is the wrong lever and hardens him. Fail, and he reads them as the killers standing over the body and raises the alarm in the village.
- **Gives:** NPC State Change: Dudka stands down.

### Explain the examination
- **Requires:** [Talk Dudka down](#talk-dudka-down) while the body is undressed; **Medicine** or **Speech**
- **Cost:** 1 composure
- **Outcome:** An undressed body reads as stripping the dead. Medicine convinces him on medical grounds, Speech simply talks him past it. Fail, and he will not be talked down, and he leaves certain the committee desecrated her.
- **Gives:** NPC State Change: Dudka accepts the examination. On failure: [`committee-desecrated-body`](../clues/clues.md#committee-desecrated-body).

### Explain the purse
- **Requires:** [Talk Dudka down](#talk-dudka-down) while the purse is open; **Bureaucracy** or **Speech**
- **Cost:** 1 composure
- **Outcome:** Even talked down, the open purse stops him. He raises the rifle again, this time on the player standing closest to it, and tells them to turn out their pockets. If that player took the money (see [Take the money](#take-the-money)), the roll of banknotes falls out and there is no explaining it. Otherwise Bureaucracy frames the search as procedure, Speech simply talks him past it. Fail, and he will not be talked down.
- **Gives:** NPC State Change: Dudka accepts the search. On failure: [`committee-looted-belongings`](../clues/clues.md#committee-looted-belongings). If the money is found on a player: [`committee-stole-money`](../clues/clues.md#committee-stole-money).

## Mechanics

### Noise
- GM tracks a hidden Noise counter; players never see it.
- [Ryszard Dudka](../characters/neighbour.md) lives across the road and watches the house.
- Actions raise Noise when Dudka could see or hear them. Each such action lists its Noise value.
- At 3 or more Noise, Dudka barges in from across the road, rifle up. He does not shout. He stands in the doorway, quiet, watching their hands, and waits for them to explain (see [Talk Dudka down](#talk-dudka-down)).

## Exits

- Continue investigating [Ciotka's house](../locations/ciotkas-house.md).
- Search toward the [UPA bunker](../locations/upa-bunker.md) if the players know where to look for [Edek Barnaś](../characters/glupek.md).

## If Missed

- If players do not visit, [ks. Władysław Pająk](../characters/priest.md) finds the body after mass on Day 4.
- If [ks. Władysław Pająk](../characters/priest.md) finds the body first, [Helena Rzepka](../characters/matrona.md) can control the scene before the committee arrives.
- Evidence may be disturbed before the committee arrives.
- The [UPA bunker](../locations/upa-bunker.md) remains difficult to find without prior knowledge.
