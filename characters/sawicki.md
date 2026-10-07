# dr Leon Sawicki

**Type:** Named character — authority figure, accessible only by phone

## Hook

- dr Leon Sawicki, the nearest doctor, reachable only by telephone.

## Vital Statistics

- **Status:** Outsider
- **Born:** 1911
- **Age in 1967:** 56
- **Based in:** Outside the valley — reached only by telephone

## Character

The nearest medical authority outside %NEW_VILLAGE%. He can give diagnosis guidance by telephone if the line works, but he cannot physically reach the village.

## Appearance

- **Clothes:** Not seen.
- **Hair & face:** Not seen.
- **Carriage:** Voice only, on a bad line.

## Actions

### Tell him about the fever and the aching muscles
- **When:** Phone access
- **Prompted by:** [pawelek-burns-with-fever](../clues/clues.md#pawelek-burns-with-fever), [pawelek-in-muscle-pain](../clues/clues.md#pawelek-in-muscle-pain)
- **Cost:** 1 time
- **Outcome:** Hearing only fever and aches, Sawicki judges it an ordinary fever going round after the flood. He expects it to pass and says to keep the child cool and watered.
- **Gives:** [`pawelek-looks-like-common-fever`](../clues/clues.md#pawelek-looks-like-common-fever)

### Tell him about the yellow skin, red eyes or dark urine
- **When:** Phone access
- **Prompted by:** [pawelek-turns-yellow](../clues/clues.md#pawelek-turns-yellow), [pawelek-eyes-are-red](../clues/clues.md#pawelek-eyes-are-red), [pawelek-passes-dark-urine](../clues/clues.md#pawelek-passes-dark-urine)
- **Cost:** 1 time
- **Outcome:** The yellow skin and dark urine settle it for him: infectious hepatitis, a sickness of the liver. He is confident. There is no drug for it, he says, so keep the child rested and warm and hope it turns. He is wrong, but he does not doubt it.
- **Gives:** [`pawelek-has-hepatitis`](../clues/clues.md#pawelek-has-hepatitis)

### Tell him it came from the water
- **When:** Phone access; the party has already told him about the yellow skin, red eyes or dark urine
- **Prompted by:** [pawelek-got-it-from-water](../clues/clues.md#pawelek-got-it-from-water)
- **Cost:** 1 time
- **Outcome:** Foul water changes everything for him. Not the liver sickness, the water fever, leptospirosis, a bacterial one. He drops the rest-and-hope line and prescribes penicillin at once, with a dose for a child Pawełek's size.
- **Gives:** [`pawelek-has-water-fever`](../clues/clues.md#pawelek-has-water-fever), [`pawelek-needs-penicillin`](../clues/clues.md#pawelek-needs-penicillin)
