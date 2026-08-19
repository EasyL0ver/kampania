# Compartment 7 (Halloway's)

**Type:** Location (revisitable — the crime scene)
**Location:** First-class sleeper car, corridor's end, door bolted when found.
**Present:** The body of Victor Halloway. Ferris the porter waits in the corridor.
**Available:** From discovery until dawn.
**Cost:** 1 card per visit

## Setup

A narrow first-class sleeper, panelled in walnut, cold now that the heating's died with the stopped train. Snow-light comes blue through a window frozen solid in its frame. Victor Halloway lies half out of his bunk, a big man in a nightshirt, one arm flung toward the nightstand. On the nightstand: a reading lamp, a glass of water, a pocket watch — and a small brown bottle, uncapped and tipped on its side, three white tablets scattered on the rug beneath his reaching hand. His face is grey, the lips faintly blue. On the little writing desk sits a locked travelling case and, oddly, a slim black notebook left out in the open.

## Opportunities

- **The body** — A big man, dead in his bunk, grey and blue-lipped. **Medicine:** no wound, no smell, no struggle — this reads like a heart that simply stopped. But note the reaching arm and the spilled bottle; he didn't die in his sleep, he died *trying to reach* something. → Gives: [`died-reaching-for-pills`](../clues/clues.md#died-reaching-for-pills)
- **The brown bottle** — Uncapped, tipped, tablets on the rug. **Medicine:** these are meant to be nitroglycerin — angina tablets. → Gives: [`halloway-had-angina`](../clues/clues.md#halloway-had-angina)
- **The bolted door / frozen window** — You broke the bolt to get in; the window won't move in its frozen frame. Nobody came in through either tonight. (Atmosphere — the porter can confirm it below.)

## Actions

### Test the tablets
- **Requires:** [`halloway-had-angina`](../clues/clues.md#halloway-had-angina)
- **Cost:** Free (you're holding the bottle)
- **Outcome:** A real nitro tablet bites — sharp and sweet, fizzing faintly under the tongue. You touch one of these to your tongue and there is nothing. Chalk. Pressed, shaped, dead. Every tablet in the bottle is a blank.
  - **Medicine:** unmistakable. The man reached for medicine that had been replaced with nothing. He was murdered — by a switch made before he ever lay down.
- **Gives:** [`pills-are-blanks`](../clues/clues.md#pills-are-blanks)

### Read the black notebook
- **Requires:** Nothing
- **Cost:** Free (it's lying open)
- **Outcome:** Not a diary — a ledger of other people's sins. Columns of names, dates, sums paid and sums owed. Halloway didn't report secrets, he *rented* them. Three names on this train appear in it. (The specific entries reveal under a proper search.)
- **Gives:** [`halloway-was-blackmailer`](../clues/clues.md#halloway-was-blackmailer)

### Search the notebook and case thoroughly
- **Requires:** [`halloway-was-blackmailer`](../clues/clues.md#halloway-was-blackmailer)
- **Cost:** 1 card
- **Outcome:** You work the three passenger entries in full: **Ashby** — a ridge, 1944, "the truth about who ran," marked *to print*. **Marceau** — her hero husband, a deserter, proof enclosed. **Fenwick** — a two-year bleed over an old indiscretion. Any of the three had reason to want this book, and its owner, gone.
- **Gives:** [`ashby-in-the-notebook`](../clues/clues.md#ashby-in-the-notebook), [`delphine-in-the-notebook`](../clues/clues.md#delphine-in-the-notebook), [`iris-in-the-notebook`](../clues/clues.md#iris-in-the-notebook)
