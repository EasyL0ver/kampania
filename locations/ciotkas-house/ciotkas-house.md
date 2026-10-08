# Ciotka's House

**Type:** Location (revisitable)
**Location:** Best plot in %NEW_VILLAGE%, across from [Neighbour's house](../neighbours-house.md)
**Present:** [Janina Gajda](../../characters/ciotka.md), [Edek Barnaś](../../characters/glupek.md) (usually)
**Available:** Any time
**Cost:** 1 action per visit

## Hook

The best plot in %NEW_VILLAGE%, across from the Neighbour's house.

## Setup

- **House:** Best house and best plot in the village.
- **House:** Former home of [Edward Barnaś](../../characters/soldier.md).
- **House:** Solid construction and good land.
- **Interior:** Clean and obsessively ordered.
- **Interior:** Catholic icons hang on every wall.
- **Interior:** Candles are lit.
- **Interior:** The house smells of soap and cooked grain.
- **Door:** Two locks on the front door — one old and pitted low on the frame, one newer above it. It reads as a fearful woman's caution.
- **Attic:** A hatch in the ceiling with a short ladder folded beside it. It stays shut, and Janina is the only one who goes up.
- **Edek:** He plays with a few worn wooden toys and keeps asking Janina for more of them.
- **Edek's care:** Sharp edges, clutter, and surprises are removed.
- **Edek's room:** His own room. Straw mattress, age-inappropriate wooden toy, scratch marks on the wall.
- **Edek's room:** A grown man's room kept like a small child's. The toys are worn from handling but the room is too quiet, too still.
- **Edek's room:** Deep gouges rake the wall by the bed, high up, where a large hand dragged down again and again.
- **Janina:** [Janina Gajda](../../characters/ciotka.md) watches the door and distrusts government questions.
- **Edek:** [Edek Barnaś](../../characters/glupek.md) is tall, broad, silent, and often stands behind Janina or sits in his corner.
- **Edek:** When dogs are audible outside, he can go rigid or hide behind Janina.
- **Backyard:** The backyard is overgrown and mostly unused.
- **Backyard:** A patch near the fence grows badly and has settled unevenly.
- **Backyard:** The patch can look like a failed old garden bed.

## Opportunities

- **Two locks, two ages** `(noticed by: [Handiwork](../../cards/handiwork.md))` `(prompted by: [ciotka-is-dead](../../clues/clues.md#ciotka-is-dead))` — The two locks were not fitted together. The old one below is original to the door; the newer one above was added years later. She did not double up out of fear — at some point she changed the lock on this house. → Gives: [`ciotka-changed-the-lock`](../../clues/clues.md#ciotka-changed-the-lock)
- **The boy's errand** `(when: aware:characters/glupek.md)` — Partway through the visit Edek tugs Janina's sleeve and asks, low, for more of his toys — the ones kept up in the attic. She soothes him: not now, and not himself; once the gentlemen have gone she will go up and bring a couple down. He is not to climb up there. → Gives: [`glupek-forbidden-from-attic`](../../clues/clues.md#glupek-forbidden-from-attic)

## Actions

### Search Edek's room
- **When:** Janina absent or distracted; a thorough search (**Finesse**)
- **Cost:** 1 time
- **Outcome:** Only a real search of the room turns them up, tucked away like treasures among the boy's few things: a single unsmoked cigarette, and an old [bayonet](../../items/bayonet.md) kept hidden from Janina. Edek does not smoke, so the cigarette was a gift; its brand and meaning become clear when [compared with the butts from the door](../../items/cigarette-butts-from-ciotkas.md#compare-with-the-cigarette-in-edeks-room). What the bayonet is, and that it cannot be his father's, takes a soldier's eye. [Ryszard Dudka](../../characters/neighbour.md) is right across the road; a search risks him seeing them at it.
- **Gives:** [bayonet](../../items/bayonet.md)
### Open the attic with the key
- **Requires:** [Attic Key](../../items/attic-key.md)
- **Prompted by:** [`ciotka-is-dead`](../../clues/clues.md#ciotka-is-dead)
- **Cost:** 1 time
- **Outcome:** The key turns and the hatch lifts quietly. It is the one part of the house Janina guarded.
- **Changes:** [The attic hatch](#the-attic-hatch) — open
### Force the attic
- **Requires:** [Handiwork](../../cards/handiwork.md) OR [Violence](../../cards/violence.md) OR [Physique](../../cards/physique.md)
- **Prompted by:** [`ciotka-is-dead`](../../clues/clues.md#ciotka-is-dead)
- **Cost:** 1 time
- **Outcome:** The players break the locked hatch open. It is loud, splintered wood and a scene the neighbours can hear.
- **Changes:** [The attic hatch](#the-attic-hatch) — open
### Dig in the backyard
- **Prompted by:** [telegram-points-to-barnas-yard](../../clues/clues.md#telegram-points-to-barnas-yard)
- **Cost:** 1 time
- **Outcome:** About a foot down, the players find oilcloth containing a KBW uniform, service insignia, Edward Barnaś's identity documents, deployment dates for the Bieszczady region in 1947, commanding officer kpt. Henryk Ćwiek, and love letters addressed to "M.K."; these can be cross-checked with [por. Skowron](../../characters/officer.md)'s classified files, the [UPA bunker](../upa-bunker.md), and the [PGR expense journal](../../items/pgr-expenses.md).
- **Gives:** [Buried Oilcloth Bundle](../../items/buried-oilcloth-bundle.md)

## Mechanics

### The attic hatch

- Shut, and only Janina goes up while she lives. After her death it is locked until opened with the [Attic Key](../../items/attic-key.md) or forced. Once open, it stays open, and [the attic](attic.md) can be visited.
