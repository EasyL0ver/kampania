# Zbigniew Gajda

**Tags:** [@name](../tags/villager.md), [@name](../tags/pgr-worker.md), [@name](../tags/old-settler.md)

## Hook

[@first-name](wojewoda.md) [@surname](wojewoda.md), the village sołtys and principal official, received at his house or office.

## Vital Statistics

- **First name:** Zbigniew
- **Surname:** Gajda
- **Status:** Resident
- **Morning:** [@name](../locations/new-village/pgr-farm/pgr-office.md)
- **Afternoon:** [@name](../locations/new-village/pgr-farm/pgr-office.md)
- **Evening:** [@name](../locations/new-village/wojewodas-house.md)
- **Night:** [@name](../locations/new-village/wojewodas-house.md)
- **Born:** 1920
- **Age in 1967:** 47
- **Heritage:** Lemko hidden behind Polish identity
- **Lives in:** [@name](../locations/new-village/wojewodas-house.md) — with [@name](wife.md), [@name](junior.md); [@name](wujas.md) crashes here
- **Settled:** ~1948 — first wave, founded the village
- **Armed:** Sołtys's pistol in the office safe, loaded

## Character

Sołtys, pragmatic, authoritative, and controlled. He built [@name](../locations/new-village/new-village.md) into a functioning community and participated in the 1954 lynch without guilt.

## Setup

- **Clothes:** Pressed trousers, polished shoes, wool vest over white shirt even in summer.
- **Hair & face:** Thinning grey-black hair combed straight back with water; thick grey moustache neatly trimmed; heavy brows over sharp dark eyes.
- **Carriage:** Stocky and barrel-chested; feet planted, hands behind his back, taking space deliberately.

His voice is deep and unhurried. When angry, he goes still and quiet.[](#tell-him-youre-inventorying-movable-assets)

## Opinions

- **[@name](wife.md)** — "My wife. Thirteen years, and she still keeps a good house. Leave her out of committee business."
  - *(Bond):* "I'll be honest — I've waved off my wife's opinions for years. Habit. She's a clever woman and I didn't always treat her like one."
  - *(Braced):* "I used to brush past what [@first-name](wife.md) thought. Not anymore. She's the sharpest person in this house, and I've finally the sense to listen to her."
- **[@name](junior.md)** — "My son. He has a temper and too much time. He'll settle when he grows up."
- **[@name](matrona.md)** — "My sister runs the store and half the village with it. A capable woman. We don't always agree."
  - *(Bond):* "[@first-name](matrona.md) decides what this village remembers. I keep order; she keeps the story. I don't always know which of us is in charge."
- **[@name](wujas.md)** — "My brother drinks. He's harmless. I keep an eye on him because family is family."
  - *(Bond):* "[@nickname](wujas.md) wasn't always like this. Something broke in him and never mended. I've carried him for thirteen years and I'm tired."
- **[@name](butcher.md)** — "The butcher keeps to himself out past the treeline. He does the work no one else will. I have no complaints."
  - *(Bond):* "A man like that needs a firm hand and a long leash. As long as I hold this village, he stays where I've put him. Pray he stays there."
- **[@name](officer.md)** — "The lieutenant looks in from time to time. Routine. I report what there is to report."
- **[@name](priest.md)** — "A good priest. We keep the parish provided for through the farm. Order is worth the cost."
- **[@name](jagna.md)** — "The Barnaś family? They left in '54. People do leave. I don't recall much past that."
- **[wujas-is-guilty](../clues/clues.md#wujas-is-guilty)** — "My brother drinks; that is not a crime. Leave him alone."
- **[church-too-nice](../clues/clues.md#church-too-nice)** — "The parish gets what it needs through the farm. A church in good repair keeps the village in order and the priest content — money well spent, not a mystery."
- **[irena-is-watchful](../clues/clues.md#irena-is-watchful)** — "[@first-name](wife.md) listens at doors when strangers are in the house. She worries; that is all. Don't read into a woman standing in her own hallway."
- **[junior-drinks-with-crew](../clues/clues.md#junior-drinks-with-crew)** — "He drinks with his uncle's crowd. He's young; every young man does something to spite his father. It's nothing."
- **[wujas-misses-someone](../clues/clues.md#wujas-misses-someone)** — "My brother gets sentimental in his cups. Old sweethearts, old songs — drunks always weep for something. It means nothing."
- **[wojewoda-disturbed-by-telegram](../clues/clues.md#wojewoda-disturbed-by-telegram)** — "Barnaś? That family left in '54. Someone's idea of a joke, or a crossed line. It's nothing."
- **[@name](../locations/village-outskirts.md)** — "It sits above the flood line, on the plan and in fact. The state left us a concrete drain off the fields; when the water rises, the ditch carries it away. Let it come."
- **[gap-is-blocked](../clues/clues.md#gap-is-blocked)** — "The gap? Water has never gone out that way in my time. The ditch takes it off the fields; that is what we dug it for."
- **[ditch-drains-nothing](../clues/clues.md#ditch-drains-nothing)** — "Nonsense. That ditch has carried every spring melt since we cut it. It drains. I've stood and watched it drain. You saw one muddy stretch downstream and lost your nerve."

## Mechanics

### Braced

- **Type:** bool
- **Per:** world
- **Start:** false
- Braced only if [@name](../events/irena-confronts-wojewoda.md);.

### Compliance

- **Type:** bool
- **Per:** world
- **Start:** false
- True when [@first-name](wojewoda.md) is convinced to disclose the flood willingly and shields the players. Forcing the disclosure on him leaves it false.

### Flood Awareness

- **Type:** enum (unaware | suspicious | needProof | convinced)
- **Per:** world
- **Start:** unaware
- How far [@first-name](wojewoda.md) believes the flood line is wrong: **unaware → suspicious → needProof → convinced**.
- A counter that only ever goes up. Nothing the players do lowers it.

### Aware of cache

- **Type:** bool
- **Per:** world
- **Start:** false
- True once [@first-name](wojewoda.md) knows something of Barnaś's is buried behind the Barnaś house.

## Opportunities

### Host grows wary of the committee's movements
- **When:** [Property assessment](#property-assessment)
- **Outcome:** On the property, his questions turn controlled, and he starts tracking where the committee goes. See [Reveal the risk of the village drowning](#reveal-the-risk-of-the-village-drowning).
- **Gives:** [`village-unaware-of-miscalculation`](../clues/clues.md#village-unaware-of-miscalculation)

## Actions

### Census interview
<!-- Prompted by: [committee-fills-census](../clues/clues.md#committee-fills-census) -->
- **Cost:** 1 time
- **Outcome:** He gives the whole household's details himself.
- **Changes:** [Census](../items/census.md#census) — [@first-name](wojewoda.md), [@first-name](wife.md), [@first-name](junior.md)

### Ask for the village household roster
<!-- Prompted by: [committee-fills-census](../clues/clues.md#committee-fills-census) -->
- **Cost:** 1 time
- **Outcome:** As the committee's point of contact, he runs down who lives where. Among the households he names his sister [@name](ciotka.md), the widow who keeps the best house at the edge of the village and cares for the boy, living apart from the rest. He also names [@name](neighbour.md), the neighbour whose house sits between [@first-name](ciotka.md)'s and [@first-name](barbara.md)'s, and the Rzepka household, where [@name](painter.md), the local painter, lives with his wife.
- **Gives:** hook:characters/ciotka.md, hook:characters/neighbour.md, hook:characters/painter.md

### Property assessment
<!-- Prompted by: [committee-notes-property-for-damage](../clues/clues.md#committee-notes-property-for-damage) -->
- **Cost:** 1 time
- **Outcome:** He names his house and land and says the papers are in order.[](#host-grows-wary-of-the-committees-movements)
- **Changes:** [Property Record](../items/census.md#property-record) — sołtys's house, clean title; [Flood Awareness](#flood-awareness) — rises to suspicious

### Tell him you're assessing property
<!-- Prompted by: [committee-notes-property-for-damage](../clues/clues.md#committee-notes-property-for-damage) -->
- **Outcome:** He nods along, but asks why a resettlement count needs land values. The answer sits badly with him.
- **Changes:** [Flood Awareness](#flood-awareness) — rises to suspicious

### Tell him you're inventorying movable assets
<!-- Prompted by: setup:characters/wojewoda.md -->
- **Outcome:** He hears that someone means to list what can be carried out of the valley, and goes quiet working out why.
- **Changes:** [Flood Awareness](#flood-awareness) — rises to suspicious

### Tell him about the dead sheep
<!-- Prompted by: [six-sheep-died-this-week](../clues/clues.md#six-sheep-died-this-week) -->
- **Outcome:** Six in a week. His jaw sets; he takes his coat and goes down to the farm, shouting for the hunter and for his brother.
- **Gives:** hook:events/wolf-attack/wolf-attack.md
- **Changes:** [@name](../events/wolf-attack/wolf-attack.md) — starts

### Ask for the maps
- **When:** [Tell him the gap is blocked and the ditch does not work](#tell-him-the-gap-is-blocked-and-the-ditch-does-not-work)
<!-- Prompted by: hook:items/topographic-maps.md -->
- **Outcome:** He hands over the maps because saving the village matters more than hiding the old terrain.
- **Gives:** [@name](../items/topographic-maps.md), hook:items/topographic-maps.md

### Tell him the gap is blocked and the ditch does not work
<!-- Prompted by: [gap-is-blocked](../clues/clues.md#gap-is-blocked), [ditch-drains-nothing](../clues/clues.md#ditch-drains-nothing) -->
- **Outcome:** He believes it, loses his temper, then pulls himself back into command.
- **Changes:** [Flood Awareness](#flood-awareness) — rises to convinced

### Reveal the risk of the village drowning
<!-- Prompted by: [the-flood-line-potentially-miscalculated](../clues/clues.md#the-flood-line-potentially-miscalculated) -->
- **Outcome:** The committee raises the risk without proof: the flood line may be wrong, the valley may not drain. [@first-name](wojewoda.md) does not need convincing to act careful. He immediately calls for [@name](foreman.md) and, telling him the warning, orders him to put the farm, his men, and himself at the committee's disposal.
- **Changes:** [Flood Awareness](#flood-awareness) — rises to needProof; [Cooperative](foreman.md#cooperative) — true; [@name](../events/wojewodas-ask.md) — starts

### Convince him to reveal the flood
- **Requires:** [Bond: Zbigniew Gajda](../cards/bond-wojewoda.md)
- **When:** [Tell him the gap is blocked and the ditch does not work](#tell-him-the-gap-is-blocked-and-the-ditch-does-not-work)
- **Cost:** 1 time
- **Outcome:** The players give him a version of disclosure he can lead: public alarm with a plan. He decides the village must be told by him.
- **Gives:** hook:events/the-disclosure.md
- **Changes:** [Compliance](#compliance) — true, he owns the disclosure and shields the players; [@name](../events/the-disclosure.md) — starts

### Force the disclosure — the ultimatum
- **When:** [Tell him the gap is blocked and the ditch does not work](#tell-him-the-gap-is-blocked-and-the-ditch-does-not-work)
- **Cost:** 1 time
- **Outcome:** They corner him with proof and a public threat. He agrees to disclose the flood on his own terms.
- **Gives:** hook:events/the-disclosure.md
- **Changes:** [@name](../events/the-disclosure.md) — starts

### Ask about the old village
<!-- Prompted by: hook:locations/old-village-ruins.md -->
- **Outcome:** He treats it as nothing worth the committee's time: there was a village up the valley once, cleared out in '47 with the rest of the range, Akcja Wisła, the people sent west. Old history, he says, no bearing on the flood or the census. He does not guard it; he just does not see why they care.
- **Gives:** [`old-village-resettled-during-vistula`](../clues/clues.md#old-village-resettled-during-vistula)

### Ask about Barbara's house
- **When:** [@name](../events/wojewodas-ask.md)
<!-- Prompted by: hook:locations/new-village/barbaras-house.md -->
- **Cost:** 1 time
- **Outcome:** He says the house is the farm's on paper, built with PGR brick and labour for a young mother with no one to lean on.
- **Gives:** [`barbara-has-help`](../clues/clues.md#barbara-has-help)

### Ask about Ciotka's house
- **When:** [@name](../events/wojewodas-ask.md)
<!-- Prompted by: [ciotka-house-is-wojewodas](../clues/clues.md#ciotka-house-is-wojewodas) -->
- **Cost:** 1 time
- **Outcome:** He says the house was abandoned, left to the state, and administered by the farm; he put [@first-name](ciotka.md) in it because she keeps the boy and the place.
- **Gives:** [`ciotka-house-is-pgrs`](../clues/clues.md#ciotka-house-is-pgrs)

### Show the paperwork for Ciotka's house
- **When:** [@name](../events/wojewodas-ask.md)
<!-- Prompted by: [house-belonged-to-edward-senior](../clues/clues.md#house-belonged-to-edward-senior), [ciotka-house-is-pgrs](../clues/clues.md#ciotka-house-is-pgrs) -->
- **Cost:** 1 time
- **Outcome:** He produces the file and lets them read the 1954 declaration with [@name](soldier.md)'s signature. He keeps the document in his hands; see [@name](../items/barnas-departure-declaration.md).
- **Gives:** [`soldier-left-his-house-for-state`](../clues/clues.md#soldier-left-his-house-for-state), [`ciotka-moved-in-after-they-were-gone`](../clues/clues.md#ciotka-moved-in-after-they-were-gone), hook:items/barnas-departure-declaration.md

### Report the bimber still
<!-- Prompted by: hook:locations/bimber-still.md -->
- **Outcome:** He says he will handle it and shows no surprise.
- **Gives:** [`bimber-still`](../clues/clues.md#bimber-still)

### Drink them under the table
- **Requires:** [@name](../tags/alcohol.md)
<!-- Prompted by: hook:characters/wojewoda.md -->
- **Cost:** 1 time
- **Outcome:** It takes a long time. Past his limit the sołtys stares into his glass and talks about a night in '54: he came home with blood on him, his brother never came back from the bottle, and by morning Barnaś was gone. Then his eyes close.
- **Gives:** [`something-happened-in-54`](../clues/clues.md#something-happened-in-54)

### Drink with them
- **Requires:** [@name](../tags/alcohol.md)
<!-- Prompted by: hook:characters/wojewoda.md -->
- **Cost:** 1 time
- **Outcome:** With a glass in him he boasts of his Party card and what it got him: the farm, the say, the ear of the powiat.
- **Gives:** [`wojewoda-is-a-party-member`](../clues/clues.md#wojewoda-is-a-party-member)

## Bond

- [ ] Acknowledge his burden openly — say something like "This whole village is on your shoulders."
- [ ] Solve a practical problem for him without being asked, e.g. help with flood logistics or handle a dispute.
- [ ] Ask his advice on how to approach a villager — treat him as the expert on his people.

## Grudge

- [ ] Challenge his authority in front of another villager.
- [ ] Go to a villager with questions after he explicitly told you not to.
- [ ] Ask about or threaten his family's involvement in the old violence.

