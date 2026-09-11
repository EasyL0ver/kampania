# The "EDEK" Box

**Type:** Item — keepsake (a dead man's belongings)
**Source:** The attic pile during [Ciotka Found Dead](../events/ciotka-found-dead.md#search-the-pile-of-rubbish)
**Carried:** A dust-caked box of a grown man's things marked "EDEK", an old house key among them. Ambivalent: the belongings could be the boy's or the elder Barnaś's.

## Hook

- A dust-caked wooden box marked "EDEK", packed with a grown man's belongings.

## Description

A wooden box thick with years of dust, untouched in the attic long before Janina died. On the lid, "EDEK" in worn letters. Inside, a grown man's belongings. The name cuts two ways: [Edek Barnaś](../characters/glupek.md) is a boy but built like a man, and Edward Barnaś, the father, went by Edek too. Among the things: an old iron front-door key, a man's shaving kit and hygiene tins, a military medal, and a photograph of a woman, risqué for the era. The photo cuts both ways — a keepsake of someone's sweetheart, or just adult material a young man might hide away.

## Opportunities

- **Read it as the boy's** `(requires: aware:characters/glupek.md)` — His name is on the lid, and the risqué photo is the kind a young man keeps hidden. Read this way, the box is Edek's. → Gives: [`box-belongs-to-glupek`](../clues/clues.md#box-belongs-to-glupek)
- **Read it as the soldier's** `(requires: aware:characters/soldier.md, and [glupek-forbidden-from-attic](../clues/clues.md#glupek-forbidden-from-attic))` — Edward Barnaś went by Edek too, and the shaving kit, the war medal, and the house key are a grown man's, not a boy's. The boy is kept out of this attic, yet his name is on the box — so the EDEK things up here are the other Edek's, the dead soldier's. → Gives: [`box-belongs-to-soldier`](../clues/clues.md#box-belongs-to-soldier)

## Actions

### Try the key in the lock
- **Requires:** Holding the box; a door of [Janina's house](../locations/ciotkas-house.md)
- **Prompted by:** [ciotka-is-dead](../clues/clues.md#ciotka-is-dead)
- **Cost:** 1 action
- **Outcome:** The key will not turn the newer lock. But the old, pitted lock below it — the door's original — takes the key and turns cleanly. It was cut for this house. The box it sat in is thick with undisturbed dust, set aside long before her time.
- **Gives:** [edek-box-key-fits-house](../clues/clues.md#edek-box-key-fits-house)
