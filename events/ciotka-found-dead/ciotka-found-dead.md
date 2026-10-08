# Ciotka Found Dead — The House

**Location:** [Ciotka's house](../../locations/ciotkas-house/ciotkas-house.md)
**Present:** [Janina Gajda](../../characters/ciotka.md) (dead); [ks. Władysław Pająk](../../characters/priest.md)
**Available:** Day 3 or later, when players visit [Ciotka's house](../../locations/ciotkas-house/ciotkas-house.md).

## Trigger

- Players visit [Ciotka's house](../../locations/ciotkas-house/ciotkas-house.md) on Day 3 or later.
- Fallback trigger: [ks. Władysław Pająk](../../characters/priest.md) notices [Janina Gajda](../../characters/ciotka.md)'s absence at the anti-flood mass on Day 4 morning and sends someone to check.

## Hook

- [Janina Gajda](../../characters/ciotka.md)'s front door is locked; the back door stands open.
- [Janina Gajda](../../characters/ciotka.md) is absent from mass if the fallback trigger fires.

## Setup

- The front door is locked, both locks turned, as she always kept it.
- The back door stands open.
- Cigarette butts lie scattered just outside the door.
- The house is quiet.
- [ks. Władysław Pająk](../../characters/priest.md) is here, come to look in on Janina; he helps the committee where he can and flinches only at her body being disturbed.
- The icons remain on the walls.
- A hatch to the attic is set in the ceiling, a short ladder folded beside it.
- The candles have burned out and have been out for hours.
- The house remains obsessively ordered.
- One corner tells another story: furniture is smashed, a shelf torn down, crockery broken across the floor.
- A mirror in the corridor is shattered.
- Nothing has been ransacked.
- Nothing has been stolen.
- [Edek Barnaś](../../characters/glupek.md)'s room is empty.
- [Edek Barnaś](../../characters/glupek.md)'s mattress is cold.
- There is no sign of forced entry.
- The wrecked corner reads like a violent struggle.
- There is no weapon.
- A kitchen chair lies on its side among the wreckage.

## Opportunities

- **The wrecked corner** `(prompted by: [ciotka-is-dead](../../clues/clues.md#ciotka-is-dead))` — One corner of the obsessively ordered house is smashed: toppled furniture, a torn-down shelf, crockery across the floor, a shattered mirror in the corridor. It reads like a violent struggle. → Gives: [`ciotka-house-wrecked`](../../clues/clues.md#ciotka-house-wrecked)
- **The cigarette butts** `(prompted by: [ciotka-is-dead](../../clues/clues.md#ciotka-is-dead))` — Some cigarette butts lie just outside the door, hand-pinched and rain-weathered, dropped a day or more before she died. You cannot tell the brand at a glance, but bagged they could be compared.
- **The priest's eyes** `(prompted by: [ciotka-is-dead](../../clues/clues.md#ciotka-is-dead))` — More than once [ks. Władysław Pająk](../../characters/priest.md) glances at the attic hatch and looks away. Asked, he says only that it was the one part of the house Janina kept locked, not even to him, and lets it go. Nothing in it reads as more than a priest uneasy in a dead parishioner's house.
- **The priest speaks for the boy** `(prompted by: [ciotka-is-dead](../../clues/clues.md#ciotka-is-dead))` — Unprompted, [ks. Władysław Pająk](../../characters/priest.md) says he is certain [Edek Barnaś](../../characters/glupek.md) did not do this. The boy helps around his church; he knows him, and the Edek he knows could never. → Gives: [`priest-sure-edek-innocent`](../../clues/clues.md#priest-sure-edek-innocent)

## Actions

### Enter the kitchen
- **Cost:** 1 composure
- **Outcome:** The players step into the kitchen. [Janina Gajda](../../characters/ciotka.md) lies dead on the floor. Only now can they get close enough to examine the body and the table.
- **Gives:** aware:events/ciotka-found-dead/the-kitchen.md

### The priest leaves them the key
- **When:** The players have noticed the attic hatch (it is in the ceiling) and turned their attention to it, while [ks. Władysław Pająk](../../characters/priest.md) is still present
- **Prompted by:** [`ciotka-is-dead`](../../clues/clues.md#ciotka-is-dead)
- **Cost:** 1 time
- **Outcome:** [ks. Władysław Pająk](../../characters/priest.md) has been in no hurry to leave, praying over her, looking in on the house. Only once the committee's own attention turns to the locked hatch does he speak to it, and even then only to the point: he mentions, the way a man passes on a practical thing about a dead neighbour's house, where Janina kept the key, under a loose floorboard beneath her bed. He does not raise the attic himself, and if they never look to it he never mentions the key at all. He does not say what the attic holds or why he is telling them; nothing in it could be quoted back to him. Over the money he does not keep quite so clean a face, he knows what else is under that board, and he holds their eyes a moment longer than he needs to, the way a man does when he is hoping for something he will not ask for. He says it is not a priest's place to go through her things, that is for them and for the family, and that he must walk down and tell her brother Zbigniew, the sołtys. It is a fair way, and the man is as likely to be out at the fields as at home, so he may be a while. He pauses at the door a breath longer than he needs to. Then he blesses her body and leaves them alone in the house. They lift the board. The iron key is there, and beside it a small roll of banknotes, a frugal woman's savings put by over years.
- **Gives:** [Attic Key](../../items/attic-key.md)
- **Changes:** [The priest](#the-priest) — leaves to fetch Zbigniew

### The money under the board
- **When:** Lifting the floorboard (see [The priest leaves them the key](#the-priest-leaves-them-the-key))
- **Prompted by:** [`ciotka-is-dead`](../../clues/clues.md#ciotka-is-dead)
- **Outcome:** No one is watching. The priest is gone, Janina is dead, and nobody living knows the roll is there. The committee can pocket it clean: no one to catch them, no one to tell, no grudge and no reckoning anyone will bring. It is not much, the honest savings of a frugal woman, and that is the point. What the priest left behind was a hope, that they would leave it where it lay, or put it to some good. Taking it for themselves carries almost no earthly cost. The weight is theirs alone.
- **Gives:** [Loaded](../../cards/loaded.md)

### Search outside the house
- **When:** Go outside and search the mud.
- **Prompted by:** [`ciotka-is-dead`](../../clues/clues.md#ciotka-is-dead)
- **Cost:** 1 time
- **Outcome:** Cigarette butts lie scattered by the door. Large bare footprints run from the house toward the tree line and fade where the canopy starts.
- **Gives:** [Carmen Cigarette Butts](../../items/cigarette-butts-from-ciotkas.md), [`glupek-fled-into-forest`](../../clues/clues.md#glupek-fled-into-forest)

## Mechanics

### The priest
- [ks. Władysław Pająk](../../characters/priest.md) is a decent man walking a tightrope. He wants the committee to find what this house hides, and he cannot be seen to help them: the confession seal binds what [Janina Gajda](../../characters/ciotka.md) told him, and the parish funding runs through [Zbigniew Gajda](../../characters/wojewoda.md), so a wrong word costs him his vows or his church. Everything he does here is deniable.
- He is clever, and he has a good guess what is in the attic: the looted belongings of the [Barnaś](../../characters/soldier.md) family, the thing that would turn the committee's eyes onto the Gajdas. He will never say so, and he will never be seen to point. Play every beat as a decent priest doing the ordinary, proper thing: looking in on her, praying, not touching her things, going to tell the family. The steering should pass unnoticed in the moment. The most you want is for a sharp player, later, once they know what was up there and who was coming, to stop and think: the priest gave us that chance on purpose.
- He does not obstruct the death investigation itself; that part is his legitimate role and it points at no one living. He understands examining her means undressing her. The one line is her body: handle her with a word of explanation and he turns away; strip her crudely, brushing past his flinch, and he takes it as contempt for the dead ([Contempt for the dead](../../characters/priest.md#contempt-for-the-dead)), his goodwill lost and remembered (see his [Grudge](../../characters/priest.md#grudge)).
- The attic is the line he walks, and he will not step over it first. He will not raise the attic himself. Only if the committee notices the hatch and turns to it on their own does he give them the key, and even then as a plain, helpful fact about where a dead neighbour kept it, never a word about what is up there (see [The priest leaves them the key](#the-priest-leaves-them-the-key)). A committee that never looks up at the attic gets nothing from him about it; he simply leaves, and the hatch can then only be [forced](../../locations/ciotkas-house/ciotkas-house.md#force-the-attic). The help is always theirs to earn by noticing, never his to offer.
- He knows there is money under that board too. In his crisis of faith he is quietly hoping the committee will leave it or put it to some good, not pocket it. He will not say so and he will not stay to watch; taking it carries almost no earthly consequence (see [The money under the board](#the-money-under-the-board)). The choice, and its weight, is the players' alone.
- How he hands them the window: he never tells them to hurry or to search. He states only neutral, true things, that going through her things is not his place, that he must fetch Zbigniew, that the man may be out and he will be a while, and lets the committee do the arithmetic. The beat he holds at the door is the closest he comes to saying it aloud. If Zbigniew ever asks, the priest only did his duty and left the officials to theirs.
- He has gone to fetch [Zbigniew Gajda](../../characters/wojewoda.md), her brother and the sołtys, who does not want outsiders turning over the family's house. No counted clock: a decisive committee has time to work the attic before he arrives. A committee that dawdles, or that trusts the grieving brother and simply waits for him, finds Zbigniew take over the house and close the attic off, whatever they have not found by then is his family's business and out of their reach. His return with the family plays out in [The Family Takes the House](../the-family-takes-the-house.md).

## Exits

- Into the kitchen, where the body lies: [Ciotka Found Dead — The Kitchen](the-kitchen.md).
- When [ks. Władysław Pająk](../../characters/priest.md) returns with the family, [The Family Takes the House](../the-family-takes-the-house.md).
- Continue investigating [Ciotka's house](../../locations/ciotkas-house/ciotkas-house.md).
- Search toward the [UPA bunker](../../locations/upa-bunker.md) if the players know where to look for [Edek Barnaś](../../characters/glupek.md).

## If Missed

- If players do not visit, [ks. Władysław Pająk](../../characters/priest.md) finds the body after mass on Day 4.
- If [ks. Władysław Pająk](../../characters/priest.md) finds the body first, [Helena Rzepka](../../characters/matrona.md) can control the scene before the committee arrives.
- Evidence may be disturbed before the committee arrives.
- The [UPA bunker](../../locations/upa-bunker.md) remains difficult to find without prior knowledge.
