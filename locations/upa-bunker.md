# UPA Bunker (Ziemianka)

**Type:** Location (explorable, hidden)
**Location:** Deep forest northwest of %NEW_VILLAGE%.
**Present:** Nobody; [Edek Barnaś](../characters/glupek.md) (sometimes near entrance)
**Available:** Requires forest exploration; ventilation shafts or entrance must be found.
**Cost:** 1 action to explore

## Hook

- A dug-out bunker hidden in the forest northwest of %NEW_VILLAGE%.

## Setup

- The bunker is an abandoned partisan ziemianka built in the mid-1940s.
- The dugout is low-ceilinged and earth-cut.
- Rotting timber reinforces the structure.
- The tunnel network has unknown extent.
- The entrance is camouflaged by vegetation and fallen trees.
- Ventilation shafts break the hillside.
- Some sections are partially collapsed.
- Lower areas are flooded.
- No recent human occupation is apparent.
- Rusted weapons, ammunition, Cyrillic inscriptions on wood, and rotting documents are scattered inside.
- One wall section has carved Cyrillic: Д. КОСАЧ and a date.
- A wrapped bundle near the carving contains a rusted pistol, spare ammunition, and a Ukrainian journal fragment mentioning the village by its Lemko name and a woman's name.
- Hazards include structural collapse, flooding, disorientation, and possible unexploded ordnance.

## Opportunities

- **Ventilation shafts** `(noticed by: [Survival](../cards/survival.md))` — The shafts reveal an underground structure in the hillside. → Gives: aware:locations/upa-bunker.md
- **UPA weapons and insignia** `(noticed by: [History](../cards/history.md))` — The rusted weapons and markings show partisan presence. → Gives: [old-wartime-positions](../clues/clues.md#old-wartime-positions)
- **Dmytro Kosach's cache** `(when: Search inside the bunker)` `(noticed by: [Language](../cards/language.md))` `(prompted by: aware:locations/upa-bunker.md)` — The carved name, cache, and journal fragment connect Dmytro Kosach to the bunker and to [Paraskewia Chyłak's cabin](hags-cabin.md). → Gives: aware:characters/dmytro-kosach.md

## Actions

### Explore the bunker
- **When:** aware:locations/upa-bunker.md, or visible ventilation shafts or entrance
- **Cost:** 1 time
- **Outcome:** The party enters the abandoned bunker and confirms old partisan use.
- **Gives:** aware:locations/upa-bunker.md, [old-wartime-positions](../clues/clues.md#old-wartime-positions)

### Search Dmytro Kosach's cache
- **When:** Explored the bunker
- **Cost:** 1 time
- **Outcome:** The search finds the Д. КОСАЧ carving, a rusted pistol, spare ammunition, and a Ukrainian journal fragment.
- **Gives:** aware:characters/dmytro-kosach.md, [Journal Fragment](../items/journal-fragment.md)
