# PGR Worker

**Applies to:** characters

## Description

The people who work on the state farm.

## Actions

### Ask about the livestock
<!-- Prompted by: [committee-should-inventory-livestock](../clues/clues.md#committee-should-inventory-livestock) -->
- **Outcome:** They tell you what the farm keeps: cows, sheep, and chickens.
- **Gives:** [`pgr-has-cows`](../clues/clues.md#pgr-has-cows), [`pgr-has-sheep`](../clues/clues.md#pgr-has-sheep), [`pgr-has-chickens`](../clues/clues.md#pgr-has-chickens)

### Ask about the cow count
<!-- Prompted by: [pgr-has-cows](../clues/clues.md#pgr-has-cows) -->
- **Outcome:** The cows are what the farm is for, they tell you: the barn is full of them, and everything else is extra.
- **Gives:** [`pgr-specializes-in-cows`](../clues/clues.md#pgr-specializes-in-cows)

### Ask about the chicken count
<!-- Prompted by: [pgr-has-chickens](../clues/clues.md#pgr-has-chickens) -->
- **Outcome:** They laugh: a handful of hens for the kitchen, hardly worth writing down.
- **Gives:** [`chicken-population-is-tiny`](../clues/clues.md#chicken-population-is-tiny)

### Ask where the sheep are
<!-- Prompted by: [pgr-has-sheep](../clues/clues.md#pgr-has-sheep) -->
- **Outcome:** Out on the pasture with [@first-name](../characters/owczarz.md), the shepherd, they tell you, up the slope past the farm buildings, and they point you the way.
- **Gives:** hook:locations/pgr-pasture.md, located:locations/pgr-pasture.md, hook:characters/owczarz.md

### Ask who looks after the chickens
<!-- Prompted by: [pgr-has-chickens](../clues/clues.md#pgr-has-chickens) -->
- **Outcome:** The chickens are [@first-name](../characters/zofia.md)'s: she feeds them from the kitchen scraps and knows every one of them.
- **Gives:** [`zofia-takes-care-of-chickens`](../clues/clues.md#zofia-takes-care-of-chickens), hook:characters/zofia.md
