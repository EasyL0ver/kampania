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
- A small brown pill bottle lies on its side on the table with the cap off.
- [Edek Barnaś](../characters/glupek.md)'s corner is empty.
- [Edek Barnaś](../characters/glupek.md)'s mattress is cold.
- There is no sign of forced entry.
- Beyond one detail, there is no sign of a struggle.
- There is no weapon.
- A single kitchen chair lies on its side, jarring against the order.
- **Composure:** 2.

## Opportunities

- **The body** `(requires: Medicine)` — The sedative overdose is what killed her: no strangulation, no defensive wounds. But a fresh bruise rings her wrist, a hard grip from a large hand, closed while she was still alive. The grip did not kill her. → Gives: [`ciotka-overdose`](../clues/clues.md#ciotka-overdose) + [`ciotka-hurt-before-death`](../clues/clues.md#ciotka-hurt-before-death)
- **The unlocked door** `(requires: Finesse)` — The door was not forced, and a frightened person running out would not stop to turn a key.
- **The overturned chair** `(requires: Violence or Finesse)` — No robbery, no forced entry. One chair lies on its side in a spotless room: something brief and physical happened here, then stopped. → Gives: [`ciotka-hurt-before-death`](../clues/clues.md#ciotka-hurt-before-death)
- **The cigarette butts** `(requires: Finesse, Survival, or Chainsmoker)` — Several butts just outside the door, all one brand, Carmen: a premium smoke rare this far out. They are weathered, dropped a day or more before she died. Players can gather them. → Gives: Item / Evidence: [Carmen Cigarette Butts](../items/carmen-cigarette-butts.md)
- **The candles** `(requires: Medicine)` — The candles have been out for hours; the death happened last night or the night before, depending on discovery day.
- **The pill bottle** `(requires: Medicine)` — The bottle is Luminal from a town apteka; enough tablets are missing to stop a heart. → Gives: [`ciotka-overdose`](../clues/clues.md#ciotka-overdose)
- **The rosary** `(requires: Devotion)` — [Janina Gajda](../characters/ciotka.md) held or reached for the rosary at the end.
- **The smell** `(requires: Survival)` — A faint herbal, earthy, forest-mud smell does not fit the clean house.
- **The smell placed** `(requires: The smell and met [Paraskewia Chyłak](../characters/hag.md))` — The smell matches [Paraskewia Chyłak](../characters/hag.md)'s cabin, but [Edek Barnaś](../characters/glupek.md) also tracks forest mud indoors.

## Actions

### Examine the body
- **Requires:** Someone willing to approach.
- **Cost:** Free
- **Outcome:** The pills on the table account for the death: an overdose, no strangulation, no defensive wounds. But a fresh bruise grips her wrist, a large hand closed hard while she still lived. It did not kill her, and it did not come from a fall.
- **Gives:** [`ciotka-overdose`](../clues/clues.md#ciotka-overdose) + [`ciotka-hurt-before-death`](../clues/clues.md#ciotka-hurt-before-death)

### Search the house
- **Requires:** Nothing
- **Cost:** 1 action
- **Outcome:** The location remains searchable with the same attic, backyard, icons, and [Edek Barnaś](../characters/glupek.md)'s corner described in [Ciotka's house](../locations/ciotkas-house.md).
- **Gives:** Scene Unlock: [Ciotka's house actions](../locations/ciotkas-house.md#actions) remain available in the context of the death.

### Look for Edek
- **Requires:** Go outside and search the mud.
- **Cost:** 1 action
- **Outcome:** Large bare footprints run toward the tree line and fade where the canopy starts.
- **Gives:** [`glupek-fled-into-forest`](../clues/clues.md#glupek-fled-into-forest)

### Tell Zbigniew Gajda
- **Requires:** Bring the news to [Zbigniew Gajda](../characters/wojewoda.md).
- **Cost:** Free
- **Outcome:** [Zbigniew Gajda](../characters/wojewoda.md) asks where the boy is and whether anyone else has seen the body.
- **Gives:** NPC State Change: [Zbigniew Gajda](../characters/wojewoda.md) tries to contain the discovery.

### Tell ks. Władysław Pająk
- **Requires:** Bring the news to [ks. Władysław Pająk](../characters/priest.md).
- **Cost:** Free
- **Outcome:** [ks. Władysław Pająk](../characters/priest.md) asks where [Edek Barnaś](../characters/glupek.md) is and treats him as endangered.
- **Gives:** NPC State Change: [ks. Władysław Pająk](../characters/priest.md) becomes focused on finding [Edek Barnaś](../characters/glupek.md).

### Tell Stanisław Rezeń
- **Requires:** Bring the news to [Stanisław Rezeń](../characters/butcher.md).
- **Cost:** Free
- **Outcome:** [Stanisław Rezeń](../characters/butcher.md) asks about [Edek Barnaś](../characters/glupek.md) and offers no help.
- **Gives:** NPC State Change: [Stanisław Rezeń](../characters/butcher.md) knows [Janina Gajda](../characters/ciotka.md) is dead and [Edek Barnaś](../characters/glupek.md) is missing.

### Tell Ryszard Dudka
- **Requires:** Bring the news to [Ryszard Dudka](../characters/neighbour.md).
- **Cost:** Free
- **Outcome:** [Ryszard Dudka](../characters/neighbour.md) assumes [Stanisław Rezeń](../characters/butcher.md) is responsible and reaches for his rifle.
- **Gives:** NPC State Change: [Ryszard Dudka](../characters/neighbour.md) must be talked down or he moves toward armed retaliation.

### Tell nobody
- **Requires:** Withhold the discovery.
- **Cost:** Free
- **Outcome:** The body remains undiscovered by the village and every hour makes [Edek Barnaś](../characters/glupek.md)'s trail colder.
- **Gives:** World State Change: The village panic is delayed while the physical trail decays.

## Exits

- Continue investigating [Ciotka's house](../locations/ciotkas-house.md).
- Search toward the [UPA bunker](../locations/upa-bunker.md) if the players know where to look for [Edek Barnaś](../characters/glupek.md).
- Bring the news to [Zbigniew Gajda](../characters/wojewoda.md), [ks. Władysław Pająk](../characters/priest.md), [Stanisław Rezeń](../characters/butcher.md), or [Ryszard Dudka](../characters/neighbour.md).

## If Missed

- If players do not visit, [ks. Władysław Pająk](../characters/priest.md) finds the body after mass on Day 4.
- If [ks. Władysław Pająk](../characters/priest.md) finds the body first, [Helena Rzepka](../characters/matrona.md) can control the scene before the committee arrives.
- Evidence may be disturbed before the committee arrives.
- The [UPA bunker](../locations/upa-bunker.md) remains difficult to find without prior knowledge.
