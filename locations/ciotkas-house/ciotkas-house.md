# Ciotka's House

**Type:** Location (revisitable)
**Location:** Best plot in %NEW_VILLAGE%, across from [@name](../neighbours-house.md)
**Present:** [@name](../../characters/ciotka.md), [@name](../../characters/glupek.md) (usually)
**Available:** Any time
**Cost:** 1 action per visit

## Hook

The best plot in %NEW_VILLAGE%, across from the Neighbour's house.

## Setup

- **House:** Best house and best plot in the village.
- **House:** Former home of [@name](../../characters/soldier.md).
- **House:** Solid construction and good land.
- **Interior:** Clean and obsessively ordered.
- **Interior:** Catholic icons hang on every wall.
- **Interior:** Candles are lit.
- **Interior:** The house smells of soap and cooked grain.
- **Door:** Two locks on the front door — one old and pitted low on the frame, one newer above it. It reads as a fearful woman's caution.
- **Attic:** A hatch in the ceiling with a short ladder folded beside it. It stays shut, and [@first-name](../../characters/ciotka.md) is the only one who goes up.
- **[@first-name](../../characters/glupek.md):** He plays with a few worn wooden toys and keeps asking [@first-name](../../characters/ciotka.md) for more of them.
- **[@first-name](../../characters/glupek.md)'s care:** Sharp edges, clutter, and surprises are removed.
- **[@first-name](../../characters/glupek.md)'s room:** His own room. Straw mattress, age-inappropriate wooden toy, scratch marks on the wall.
- **[@first-name](../../characters/glupek.md)'s room:** A grown man's room kept like a small child's. The toys are worn from handling but the room is too quiet, too still.
- **[@first-name](../../characters/glupek.md)'s room:** Deep gouges rake the wall by the bed, high up, where a large hand dragged down again and again.
- **[@first-name](../../characters/ciotka.md):** [@name](../../characters/ciotka.md) watches the door and distrusts government questions.
- **[@first-name](../../characters/glupek.md):** [@name](../../characters/glupek.md) is tall, broad, silent, and often stands behind [@first-name](../../characters/ciotka.md) or sits in his corner.
- **[@first-name](../../characters/glupek.md):** When dogs are audible outside, he can go rigid or hide behind [@first-name](../../characters/ciotka.md).
- **Backyard:** The backyard is overgrown and mostly unused.
- **Backyard:** A patch near the fence grows badly and has settled unevenly.
- **Backyard:** The patch can look like a failed old garden bed.

## Opportunities

- **Two locks, two ages** `(noticed by: [Handiwork](../../cards/handiwork.md))` `(prompted by: [ciotka-is-dead](../../clues/clues.md#ciotka-is-dead))` — The two locks were not fitted together. The old one below is original to the door; the newer one above was added years later. She did not double up out of fear — at some point she changed the lock on this house. → Gives: [`ciotka-changed-the-lock`](../../clues/clues.md#ciotka-changed-the-lock)
- **The boy's errand** `(when: aware:characters/glupek.md)` — Partway through the visit [@first-name](../../characters/glupek.md) tugs [@first-name](../../characters/ciotka.md)'s sleeve and asks, low, for more of his toys — the ones kept up in the attic. She soothes him: not now, and not himself; once the gentlemen have gone she will go up and bring a couple down. He is not to climb up there. → Gives: [`glupek-forbidden-from-attic`](../../clues/clues.md#glupek-forbidden-from-attic)

## Actions

### Search Edek's room
- **When:** [@first-name](../../characters/ciotka.md) absent or distracted; a thorough search (**Finesse**)
- **Cost:** 1 time
- **Outcome:** Only a real search of the room turns them up, tucked away like treasures among the boy's few things: a single unsmoked cigarette, and an old [@name](../../items/bayonet.md) kept hidden from [@first-name](../../characters/ciotka.md). [@first-name](../../characters/glupek.md) does not smoke, so the cigarette was a gift; its brand and meaning become clear when [compared with the butts from the door](../../items/cigarette-butts-from-ciotkas.md#compare-with-the-cigarette-in-edeks-room). What the bayonet is, and that it cannot be his father's, takes a soldier's eye. [@name](../../characters/neighbour.md) is right across the road; a search risks him seeing them at it.
- **Gives:** [@name](../../items/bayonet.md)
### Open the attic with the key
- **Requires:** [@name](../../items/attic-key.md)
- **Prompted by:** [`ciotka-is-dead`](../../clues/clues.md#ciotka-is-dead)
- **Cost:** 1 time
- **Outcome:** The key turns and the hatch lifts quietly. It is the one part of the house [@first-name](../../characters/ciotka.md) guarded.
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
- **Outcome:** About a foot down, the players find oilcloth containing a KBW uniform, service insignia, [@name](../../characters/soldier.md)'s identity documents, deployment dates for the Bieszczady region in 1947, commanding officer [@name](../../characters/kbw-officer.md), and love letters addressed to "M.K."; these can be cross-checked with [@name](../../characters/officer.md)'s classified files, the [@name](../upa-bunker.md), and the [@name](../../items/pgr-expenses.md).
- **Gives:** [@name](../../items/buried-oilcloth-bundle.md)

## Mechanics

### The attic hatch

- Shut, and only [@first-name](../../characters/ciotka.md) goes up while she lives. After her death it is locked until opened with the [@name](../../items/attic-key.md) or forced. Once open, it stays open, and [@name](attic.md) can be visited.
