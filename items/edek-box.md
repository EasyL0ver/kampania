# The "EDEK" Box

**Type:** Item — keepsake (a dead man's belongings)
**Source:** The attic pile during [Ciotka Found Dead](../locations/ciotkas-house/attic.md#search-the-pile-of-rubbish)
**Carried:** A dust-caked box of a grown man's things marked "EDEK", an old house key among them. Ambivalent: the belongings could be the boy's or the elder Barnaś's.

## Hook

- A dust-caked wooden box marked "EDEK", packed with a grown man's belongings.

## Description

A wooden box thick with years of dust, untouched in the attic long before [@first-name](../characters/ciotka.md) died. On the lid, "EDEK" in worn letters. Inside, a grown man's belongings. The name cuts two ways: [@name](../characters/glupek.md) is a boy but built like a man, and [@name](../characters/soldier.md), the father, went by [@first-name](../characters/glupek.md) too. Among the things: an old iron front-door key, a man's shaving kit and hygiene tins, a military medal, a folded [@name](propaganda-leaflet.md) showing the white eagle driving a bayonet into a trident over the slogan "DEATH TO THE BANDITS", and a photograph of a woman, risqué for the era. The photo cuts both ways — a keepsake of someone's sweetheart, or just adult material a young man might hide away.

## Opportunities

- *(when: aware:characters/glupek.md)* — His name is on the lid, and the risqué photo is the kind a young man keeps hidden. Read this way, the box is [@first-name](../characters/glupek.md)'s. → Gives: [`box-belongs-to-glupek`](../clues/clues.md#box-belongs-to-glupek)
- *(when: aware:characters/soldier.md)* *(noticed by: [glupek-forbidden-from-attic](../clues/clues.md#glupek-forbidden-from-attic))* — [@name](../characters/soldier.md) went by [@first-name](../characters/glupek.md) too, and the shaving kit, the war medal, the propaganda leaflet, and the house key are a grown man's, not a boy's. The boy is kept out of this attic, yet his name is on the box — so the EDEK things up here are the other [@first-name](../characters/glupek.md)'s, the dead soldier's. → Gives: [`box-belongs-to-soldier`](../clues/clues.md#box-belongs-to-soldier)

## Actions

### Try the key in the lock
- **Requires:** [The "EDEK" Box](edek-box.md)
- **When:** a door of [@name](../locations/ciotkas-house/ciotkas-house.md)
<!-- Prompted by: [ciotka-is-dead](../clues/clues.md#ciotka-is-dead) -->
- **Cost:** 1 time
- **Outcome:** The key will not turn the newer lock. But the old, pitted lock below it — the door's original — takes the key and turns cleanly. It was cut for this house. The box it sat in is thick with undisturbed dust, set aside long before her time.
- **Gives:** [edek-box-key-fits-house](../clues/clues.md#edek-box-key-fits-house)
