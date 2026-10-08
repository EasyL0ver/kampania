# Zbigniew Gajda

**Type:** Named character — sibling (brother) / sołtys
**Freudian role:** [Superego](../story-facts/freudian-triangle.md) — authority, containment, the rules that hold the id at the edge

## Hook

Zbigniew Gajda, the village sołtys and principal official, received at his house or office.

## Vital Statistics

- **Status:** Resident
- **Born:** 1920
- **Age in 1967:** 47
- **Heritage:** Lemko hidden behind Polish identity
- **Lives in:** [Zbigniew Gajda's house](../locations/wojewodas-house.md) — with [Irena Gajda](wife.md), [Marek Gajda](junior.md); [Tadek Gajda](wujas.md) crashes here
- **Settled:** ~1948 — first wave, founded the village
- **Armed:** Sołtys's pistol in the office safe, loaded

## Character

Sołtys, pragmatic, authoritative, and controlled. He built %NEW_VILLAGE% into a functioning community and participated in the 1954 lynch without guilt.

## Appearance

- **Clothes:** Pressed trousers, polished shoes, wool vest over white shirt even in summer.
- **Hair & face:** Thinning grey-black hair combed straight back with water; thick grey moustache neatly trimmed; heavy brows over sharp dark eyes.
- **Carriage:** Stocky and barrel-chested; feet planted, hands behind his back, taking space deliberately.

His voice is deep and unhurried. When angry, he goes still and quiet.

## Opinions

- **[Irena Gajda](wife.md)** — "My wife. Thirteen years, and she still keeps a good house. Leave her out of committee business."
  - *(Bond):* "I'll be honest — I've waved off my wife's opinions for years. Habit. She's a clever woman and I didn't always treat her like one."
  - *(Braced):* "I used to brush past what Irena thought. Not anymore. She's the sharpest person in this house, and I've finally the sense to listen to her."
- **[Marek Gajda](junior.md)** — "My son. He has a temper and too much time. He'll settle when he grows up."
- **[Helena Rzepka](matrona.md)** — "My sister runs the store and half the village with it. A capable woman. We don't always agree."
  - *(Bond):* "Helena decides what this village remembers. I keep order; she keeps the story. I don't always know which of us is in charge."
- **[Tadek Gajda](wujas.md)** — "My brother drinks. He's harmless. I keep an eye on him because family is family."
  - *(Bond):* "Tadek wasn't always like this. Something broke in him and never mended. I've carried him for thirteen years and I'm tired."
- **[Stanisław Rezeń](butcher.md)** — "The butcher keeps to himself out past the treeline. He does the work no one else will. I have no complaints."
  - *(Bond):* "A man like that needs a firm hand and a long leash. As long as I hold this village, he stays where I've put him. Pray he stays there."
- **[por. Witold Skowron](officer.md)** — "The lieutenant looks in from time to time. Routine. I report what there is to report."
- **[ks. Władysław Pająk](priest.md)** — "A good priest. We keep the parish provided for through the farm. Order is worth the cost."
- **[Hania Barnaś](jagna.md)** — "The Barnaś family? They left in '54. People do leave. I don't recall much past that."
- **[wujas-is-guilty](../clues/clues.md#wujas-is-guilty)** — "My brother drinks; that is not a crime. Leave him alone."
- **[church-too-nice](../clues/clues.md#church-too-nice)** — "The parish gets what it needs through the farm. A church in good repair keeps the village in order and the priest content — money well spent, not a mystery."
- **[irena-is-watchful](../clues/clues.md#irena-is-watchful)** — "Irena listens at doors when strangers are in the house. She worries; that is all. Don't read into a woman standing in her own hallway."
- **[junior-drinks-with-crew](../clues/clues.md#junior-drinks-with-crew)** — "He drinks with his uncle's crowd. He's young; every young man does something to spite his father. It's nothing."
- **[wujas-misses-someone](../clues/clues.md#wujas-misses-someone)** — "My brother gets sentimental in his cups. Old sweethearts, old songs — drunks always weep for something. It means nothing."
- **[%NEW_VILLAGE%](../locations/village-outskirts.md)** — "It sits above the flood line, on the plan and in fact. The state left us a concrete drain off the fields; when the water rises, the ditch carries it away. Let it come."
- **[ditch-drains-nothing](../clues/clues.md#ditch-drains-nothing)** — "Nonsense. That ditch has carried every spring melt since we cut it. It drains. I've stood and watched it drain. You saw one muddy stretch downstream and lost your nerve."

## Mechanics

### Braced

- Braced only if [Irena learns the truth and sides with him](../events/irena-confronts-wojewoda.md);.

### Compliance

- A flag, true or false. Starts false. True when Zbigniew is convinced to disclose the flood willingly and shields the players. Forcing the disclosure on him leaves it false.

### Flood Awareness

- How far Zbigniew believes the flood line is wrong: **unaware → suspicious → needProof → convinced**.
- A counter that only ever goes up. Nothing the players do lowers it.
- Starts at **unaware**.

## Opportunities

- **Property suspicion** `(when: Property assessment, flood not disclosed, no convincing cover)` — his questions turn controlled, and he starts tracking where the committee goes. See [Tell Wojewoda about the flood risk](../events/arrival/in-the-office.md#tell-wojewoda-about-the-flood-risk). → Gives: [`committee-hides-the-flood`](../clues/clues.md#committee-hides-the-flood)

## Actions

### Census interview
- **Cost:** 1 time
- **Outcome:** He gives the whole household's details himself.
- **Changes:** [Census](../items/census.md#census) — Zbigniew, Irena, Marek

### Ask for the village household roster
- **Prompted by:** [committee-fills-census](../clues/clues.md#committee-fills-census)
- **Cost:** 1 time
- **Outcome:** As the committee's point of contact, he runs down who lives where. Among the households he names his sister [Janina Gajda](ciotka.md), the widow who keeps the best house at the edge of the village and cares for the boy, living apart from the rest. He also names [Ryszard Dudka](neighbour.md), the neighbour whose house sits between Janina's and Barbara's, and the Rzepka household, where [Emil Rzepka](painter.md), the local painter, lives with his wife.
- **Gives:** aware:characters/ciotka.md, aware:characters/neighbour.md, aware:characters/painter.md

### Property assessment
- **Cost:** 1 time
- **Outcome:** He names his house and land and says the papers are in order.
- **Changes:** [Property Record](../items/census.md#property-record) — sołtys's house, clean title; [Flood Awareness](#flood-awareness) — rises to suspicious

### Tell him you're assessing property
- **Prompted by:** aware:characters/wojewoda.md
- **Outcome:** He nods along, but asks why a resettlement count needs land values. The answer sits badly with him.
- **Changes:** [Flood Awareness](#flood-awareness) — rises to suspicious

### Tell him you're inventorying movable assets
- **Prompted by:** aware:characters/wojewoda.md
- **Outcome:** He hears that someone means to list what can be carried out of the valley, and goes quiet working out why.
- **Changes:** [Flood Awareness](#flood-awareness) — rises to suspicious

### Ask for the maps
- **When:** Flood proof shared
- **Outcome:** He hands over the maps because saving the village matters more than hiding the old terrain.
- **Gives:** [Topographic Maps](../items/topographic-maps.md)

### Tell with geological proof
- **When:** Players have completed survey at the village outskirts / field measurements
- **Outcome:** He believes it, loses his temper, then pulls himself back into command.
- **Changes:** [Flood Awareness](#flood-awareness) — rises to convinced

### Reveal the risk of the village drowning
- **Prompted by:** [the-flood-line-potentially-miscalculated](../clues/clues.md#the-flood-line-potentially-miscalculated)
- **Outcome:** The committee raises the risk without proof: the flood line may be wrong, the valley may not drain. Zbigniew does not need convincing to act careful. He immediately calls for [Michał Pytlak](foreman.md) and, telling him the warning, orders him to put the farm, his men, and himself at the committee's disposal.
- **Changes:** [Flood Awareness](#flood-awareness) — rises to needProof

### Convince him to reveal the flood
- **When:** Flood proof shared (["Tell with geological proof"](#tell-with-geological-proof) done), a way out such as an evacuation plan, army rescue, or the [phone line cracked](../events/operator-refuses-help.md), and [Bond](#bond)
- **Cost:** 1 time
- **Outcome:** The players give him a version of disclosure he can lead: public alarm with a plan. He decides the village must be told by him.
- **Gives:** aware:events/the-disclosure.md
- **Changes:** [Compliance](#compliance) — true, he owns the disclosure and shields the players

### Force the disclosure — the ultimatum
- **When:** Players hold the flood proof
- **Cost:** 1 time
- **Outcome:** They corner him with proof and a public threat. He agrees to disclose the flood on his own terms.
- **Gives:** aware:events/the-disclosure.md

### Ask about the old village
- **Prompted by:** aware:locations/old-village-ruins.md
- **Outcome:** He treats it as nothing worth the committee's time: there was a village up the valley once, cleared out in '47 with the rest of the range, Akcja Wisła, the people sent west. Old history, he says, no bearing on the flood or the census. He does not guard it; he just does not see why they care.
- **Gives:** [`old-village-resettled-during-vistula`](../clues/clues.md#old-village-resettled-during-vistula)

### Ask about Barbara's house
- **When:** [Wojewoda's Ask](../events/wojewodas-ask.md) is underway
- **Cost:** 1 time
- **Outcome:** He says the house is the farm's on paper, built with PGR brick and labour for a young mother with no one to lean on.
- **Gives:** [`barbara-has-help`](../clues/clues.md#barbara-has-help)

### Ask about Janina's house
- **When:** [Wojewoda's Ask](../events/wojewodas-ask.md) is underway
- **Prompted by:** [ciotka-house-is-wojewodas](../clues/clues.md#ciotka-house-is-wojewodas)
- **Cost:** 1 time
- **Outcome:** He says the house was abandoned, left to the state, and administered by the farm; he put Janina in it because she keeps the boy and the place.
- **Gives:** [`ciotka-house-is-pgrs`](../clues/clues.md#ciotka-house-is-pgrs)

### Show the paperwork for Janina's house
- **When:** [Wojewoda's Ask](../events/wojewodas-ask.md) is underway
- **Prompted by:** [house-belonged-to-edward-senior](../clues/clues.md#house-belonged-to-edward-senior), [ciotka-house-is-pgrs](../clues/clues.md#ciotka-house-is-pgrs)
- **Cost:** 1 time
- **Outcome:** He produces the file and lets them read the 1954 declaration with [Edward Barnaś](soldier.md)'s signature. He keeps the document in his hands; see [Edward Barnaś's Departure Declaration](../items/barnas-departure-declaration.md).
- **Gives:** [`soldier-left-his-house-for-state`](../clues/clues.md#soldier-left-his-house-for-state), [`ciotka-moved-in-after-they-were-gone`](../clues/clues.md#ciotka-moved-in-after-they-were-gone), aware:items/barnas-departure-declaration.md

### Report the bimber still
- **When:** Players have discovered the [bimber still](../locations/bimber-still.md)
- **Outcome:** He says he will handle it and shows no surprise.
- **Gives:** [`bimber-still`](../clues/clues.md#bimber-still)

## Bond

- [ ] Acknowledge his burden openly — say something like "This whole village is on your shoulders."
- [ ] Solve a practical problem for him without being asked, e.g. help with flood logistics or handle a dispute.
- [ ] Ask his advice on how to approach a villager — treat him as the expert on his people.

## Grudge

- [ ] Challenge his authority in front of another villager.
- [ ] Go to a villager with questions after he explicitly told you not to.
- [ ] Ask about or threaten his family's involvement in the old violence.

