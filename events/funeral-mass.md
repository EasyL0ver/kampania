# Funeral Mass — Ciotka

**Location:** [@name](../locations/new-village/the-church/the-church.md)
**Present:** [@name](../characters/priest.md), [@name](../characters/wojewoda.md), [@name](../characters/matrona.md), [@name](../characters/wujas.md)

## Hook

A funeral Mass beginning in the church, the coffin set before the congregation.

## Setup

- [@name](../characters/ciotka.md)'s coffin remains inside the church because the flood has taken the cemetery[](#flood-prevents-normal-burial-of-ciotka).
- The Gajda siblings attend the funeral Mass for their sister.
- [@name](../characters/wujas.md) attends the funeral after days of drinking.
- [@name](../characters/priest.md) preaches from Deuteronomy 21:1-9.
- The sermon frames an unsolved killing as blood-guilt[](#sermon-accuses-the-valley-of-guilt) shared by the nearest community until the elders answer for it.
- The priest looks at the village elders when the sermon turns to washed hands and innocent blood.

## Opportunities

### Arriving on the scene
- **When:** [@name](../locations/new-village/new-village.md)
- **Outcome:** [@hook](funeral-mass.md)
- **Gives:** *(to: players at [@name](../locations/new-village/new-village.md))* hook:events/funeral-mass.md

### Sermon accuses the valley of guilt
- **Noticed by:** [Devotion](../cards/devotion.md)
- **When:** setup:events/funeral-mass.md
- **Outcome:** The sermon is an accusation: [@name](../characters/priest.md) is not only burying [@first-name](../characters/ciotka.md); he is warning the living that unconfessed blood-guilt stains the whole valley.
- **Gives:** [`priest-fears-divine-judgment`](../clues/clues.md#priest-fears-divine-judgment)

### Flood prevents normal burial of Ciotka
- **Noticed by:** [Culture](../cards/culture.md)
- **When:** setup:events/funeral-mass.md
- **Outcome:** The coffin is unburied: the flood has stopped a normal burial and left [@first-name](../characters/ciotka.md)'s body inside the church.

## Actions

- No event-specific actions.
