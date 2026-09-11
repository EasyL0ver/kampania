# Secondary Characters

Minor NPCs, relationships, and supporting cast. Grouped by association for easy reference. This aggregate file keeps minor characters together; each sub-entry follows the character template as closely as the aggregate format allows.

---

## Hook

Staszek Pytlak, Tadek's drinking crew (Szymek Kępa, Romek Głowacz, Franek Mucha), Halina Zając at the store, farm workers Nowak and Wiśniewski, dr Leon Sawicki, %OPERATOR%, Marta Konieczna, and the remembered folk of %OLD_VILLAGE%.

## PAWEŁEK's Circle

### Staszek Pytlak
**Type:** Child — Pawełek Kopacz's friend

#### Vital Statistics

- **Age in 1967:** 5
- **Parents:** Michał Pytlak and Zofia Pytlak

#### Character

A slightly older village child who plays with Pawełek Kopacz before the illness. He may know where Pawełek Kopacz drank contaminated water, or he may only remember fragments.

#### Appearance

- **Clothes:** Not specified.
- **Hair & face:** Not specified.
- **Carriage:** Not specified.

#### Actions

##### Ask Staszek about their last day
- **Cost:** 1 action
- **Outcome:** He tells you they went into the woods and ate mushrooms they picked. `(requires: Survival)` Press him on which kind and it is clear the boys know their mushrooms: they picked ordinary edible ones, and Staszek ate the same and stayed well.
- **Gives:** [pawelek-ate-mushrooms-in-the-forest](../clues/clues.md#pawelek-ate-mushrooms-in-the-forest); `(requires: Survival)` [pawelek-mushrooms-were-harmless](../clues/clues.md#pawelek-mushrooms-were-harmless)

---

## Tadek Gajda's Drinking Circle

### Mechanics — Hostile

- Shared crew state, set by [Caught at the Still](../events/caught-at-the-still.md).
- Triggered when the committee fights the whole crew or pulls a gun on them.
- While Hostile: the crew is a standing enemy of the committee — no gossip, no drinking buddies, no cooperation. They move the still to a new site.
- Not set if only Franek is fought after Tadek vouches, or if the standoff is defused peacefully.

### Actions — Drink with the crew

- **Requires:** Drink or Alcoholic; crew present (outside the [store](../locations/the-store.md) or at the [still](../locations/bimber-still.md)) or an invitation from Tadek; the crew is not [Hostile](#mechanics--hostile)
- **Cost:** 1 action
- **Outcome:** The committee buys a round and shares a full session in the drinking circle. Tadek warms to whoever kept pace without judging him.
- **Gives:** NPC State Change: the drinking PCs become Tadek's [drinking buddies](wujas.md#drinking-buddy)

### Szymek Kępa
**Type:** Village drunk — Tadek Gajda's regular drinking companion

#### Vital Statistics

- **Age in 1967:** ~45-55

#### Character

A rough, crude drinking companion of Tadek Gajda. He knows village rumors and talks freely when drunk, but cruelty and gossip come before truth.

#### Appearance

- **Clothes:** Not specified.
- **Hair & face:** Not specified.
- **Carriage:** Not specified.

#### Opinions

- **[Tadek Gajda](wujas.md)** — "I drink with him. That does not mean I owe him kindness."

### Romek Głowacz
**Type:** Village drunk — Tadek Gajda's regular drinking companion

#### Vital Statistics

- **Age in 1967:** ~40-50

#### Character

A quieter drunk who listens more than he talks. Years of drinking and watching have made him a useful source if the players draw him out carefully.

#### Appearance

- **Clothes:** Not specified.
- **Hair & face:** Not specified.
- **Carriage:** Not specified.

#### Opinions

- **[Tadek Gajda](wujas.md)** — "He is not only a bottle beside mine. I know him better than most."

### Franek Mucha
**Type:** Village drunk — troublemaker

#### Vital Statistics

- **Age in 1967:** ~35-45

#### Character

A younger, aggressive brawler in Tadek Gajda's drinking circle. He is the one most likely to turn a bad conversation at the store into a fight.

#### Appearance

- **Clothes:** Not specified.
- **Hair & face:** Not specified.
- **Carriage:** Not specified.

#### Opinions

- **[Tadek Gajda](wujas.md)** — "We drink together, but old debts do not vanish in bimber."

---

## Barbara Kopacz's Household

### Stefania Kopacz
**Type:** Promoted primary character

#### Character

Promoted to primary character. See `characters\babcia.md`.

---

## Helena Rzepka and Emil Rzepka's Household

### Ewa Rzepka
**Type:** Young woman — Helena Rzepka and Emil Rzepka's eldest child

#### Vital Statistics

- **Age in 1967:** ~13-15

#### Character

Ewa Rzepka is worried about Emil Rzepka and sees how fragile he has become. Her concern makes her a possible crack in Helena Rzepka's control.

#### Appearance

- **Clothes:** Not specified.
- **Hair & face:** Not specified.
- **Carriage:** Not specified.

#### Opinions

- **[Emil Rzepka](painter.md)** — "I see how easily he breaks. I will not pretend he is well."
- **[Helena Rzepka](matrona.md)** — "Mother decides what our house shows the village. I know better than to cross that lightly."

### Krystian Rzepka
**Type:** Child — Helena Rzepka and Emil Rzepka's youngest, altar boy

#### Vital Statistics

- **Age in 1967:** ~8-9

#### Character

Krystian Rzepka serves at the church with ks. Władysław Pająk. He is innocent, observant, and loyal first to Helena Rzepka.

#### Appearance

- **Clothes:** Not specified.
- **Hair & face:** Not specified.
- **Carriage:** Not specified.

#### Opinions

- **[ks. Władysław Pająk](priest.md)** — "I help him at the church and I notice who comes and goes."
- **[Helena Rzepka](matrona.md)** — "Mother knows what is proper. I listen to her first."

---

## Helena Rzepka's Store

### Halina Zając
**Type:** Store worker — Helena Rzepka's employee

#### Vital Statistics

- **Age in 1967:** ~35-45
- **Works at:** Helena Rzepka's small general store

#### Character

Halina Zając handles customers, stock, and money at Helena Rzepka's store. She sees village patterns and gossip, resents Helena Rzepka, and struggles with the drunks who linger there.

#### Appearance

- **Clothes:** Not specified.
- **Hair & face:** Not specified.
- **Carriage:** Not specified.

#### Opinions

- **[Helena Rzepka](matrona.md)** — "She signs the orders, but I deal with the customers and the trouble."
- **[Szymek Kępa](#szymek-kępa)** — "He turns the shop into a sty and expects me to clean around him."
- **[Romek Głowacz](#romek-głowacz)** — "Quiet is not the same as harmless."
- **[Franek Mucha](#franek-mucha)** — "If he starts, he will not stop because I ask politely."
- **[Pawełek needs penicillin](../clues/clues.md#pawelek-needs-penicillin)** — "It is in the cabinet, but the key is Helena's, not mine, and I cannot hand out penicillin without a prescription. Take that up with her, not me."

#### Actions

##### Ask who smokes what
- **Requires:** [Bonded with Halina](#halina-bond); at the counter
- **Cost:** 1 action
- **Outcome:** Nobody reads the village like the woman at the till. She rattles off who buys what: the cheap Sport that [Tadek](wujas.md) and half the valley burn through, and the pricey [Carmen](../items/cigarette-butts-from-ciotkas.md) only two men ever pay for, the Gajda boy [Marek](junior.md) and the butcher [Rezeń](butcher.md). The brand marks the man, and she keeps the accounts in her head.
- **Gives:** [junior-smokes-carmen](../clues/clues.md#junior-smokes-carmen); [butcher-smokes-carmen](../clues/clues.md#butcher-smokes-carmen); [tadek-smokes-cheapest](../clues/clues.md#tadek-smokes-cheapest)

#### Halina Bond
- [ ] Take her side against [Helena Rzepka](matrona.md) — treat the resentment as legitimate, not idle gossip.
- [ ] Deal with or clear out the drunks who plague her counter.
- [ ] Ask about her work and what she notices, with real interest, not just to mine her for a lead.

---

## Zbigniew Gajda's Farm Workers

### Michał Pytlak
**Type:** Farm overseer — promoted to primary character

#### Character

Promoted to primary character. See `characters\foreman.md`.

### Józef Nowak
**Type:** Farm laborer — migrant or day worker

#### Vital Statistics

- **Age in 1967:** ~30-40
- **Works at:** PGR farm labor

#### Character

A common farmhand who does physical labor alongside Barbara Kopacz. He may know casual farm gossip or overheard conversations without knowing the village's deeper secrets.

#### Appearance

- **Clothes:** Not specified.
- **Hair & face:** Not specified.
- **Carriage:** Not specified.

#### Opinions

- **[Barbara Kopacz](barbara.md)** — "She works near me. That does not mean I know her business."
- **[Tadek Gajda](wujas.md)** — "A drink loosens tongues, but it does not make every word true."

### Piotr Wiśniewski
**Type:** Farm laborer — younger, ambitious

#### Vital Statistics

- **Age in 1967:** ~20-25
- **Works at:** PGR farm labor

#### Character

A young farmhand who wants land of his own or a way out of the village. His ambition makes him a weak link in the farm hierarchy.

#### Appearance

- **Clothes:** Not specified.
- **Hair & face:** Not specified.
- **Carriage:** Not specified.

#### Opinions

- **[Barbara Kopacz](barbara.md)** — "I see more than older workers think I see."
- **[Marek Gajda](junior.md)** — "If he is careless, that is his problem, not mine."

---

## Village Functionaries & Outsiders

### %OPERATOR% (the telephone-exchange operator)
**Type:** Telephone-exchange operator (telefonistka) — voice only, never seen

#### Character

She works the manual switchboard at the nearest town's exchange, in the back of a post office. Every long-distance call the committee places to the outside world — [prof. Tadeusz Bieńkowski](professor.md), [dr Leon Sawicki](sawicki.md), [por. Witold Skowron](officer.md)'s superiors, the powiat — routes through her board.

#### Appearance

- **Clothes:** Not seen.
- **Hair & face:** Not seen.
- **Carriage:** Flat, professional voice on a bad line.
- **Voice:** "Exchange. Number, please." "Hold for the connection." "Go ahead."

#### Opinions

- **[Hania Barnaś](jagna.md)** — "That name is dead. A bad line cannot prove otherwise."
- **[Paraskewia Chyłak](hag.md)** — "She kept me alive when returning would have finished me."
- **[Edek](glupek.md)** — "I thought my brother was gone. His name never crossed my board."
- **[Zbigniew Gajda](wojewoda.md)** — "His voice belongs to the valley that ran my family into the well."
- **[Helena](matrona.md)** — "If strangers call to bring her to account, I will connect them."
- **[Rezeń](butcher.md)** — "If the call damns him, I will not stop it."

#### Mechanics

##### Identity

- She is **[Hania Barnaś](jagna.md)**, living under another name.
- Her identity remains unprovable from the line. A bad connection and a thirteen-year-old memory are not evidence.
- She works one tier out from %NEW_VILLAGE%: close enough to handle the valley's long-distance calls, far enough to stay a stranger.

##### Calls

- Most calls connect because she usually holds back from using the switchboard against the valley.
- A rescue call during the flood can fail because she keeps the channel open and useless.
- Never let her touch the earlier prof. Bieńkowski call in [the-report](../events/the-report.md); that call stays player-driven.

##### Levers

- Edek is the personal lever. If the players know Edek is her brother and know he is trapped in the flooding forest, carrying his name over the wire makes her relay the call.
- Justice is the vengeance lever. If the players call to expose a real village crime and bring the guilty to account, she relays the call.
- A plain plea to save the valley gets nothing.

##### Deniable tell

- If a player says the one unbearable thing down the wire — her name, "Hania?", her father, or the well — she gives one small, deniable gasp.
- The gasp happens once only. Repeating the trigger gets flat procedure.
- The gasp is never confirmation.

### Marta Konieczna
**Type:** Deceased — [Edward Barnaś](soldier.md)'s unmarried partner; mother of [Hania](jagna.md) and [Edek](glupek.md); killed in the 1954 lynch

#### Vital Statistics

- **Born:** ~1915
- **Died:** 1954 — killed in the lynch, aged ~39
- **Lived in:** [Edward Barnaś's house](../locations/ciotkas-house.md) in %NEW_VILLAGE%
- **Connection:** [Edward Barnaś](soldier.md)'s unmarried partner and the mother of both his children

#### Character

Edek and Hania's mother, and Edward's partner though never his wife. She kept her surname, Konieczna, which is why no "Barnaś" wife appears in any village record. The men killed her in the house the night of the lynch; [Stanisław Rezeń](butcher.md) carried her body to the old well. Her identity as Edek's mother is buried with her.

---

## %OLD_VILLAGE% — 1947

### Dmytro Kosach
**Type:** Deceased — UPA fighter, [Paraskewia Chyłak](hag.md)'s lover

#### Vital Statistics

- **Died:** 1947 (age ~27) — during the [%OLD_VILLAGE% massacre](../story-facts/old-village-massacre.md)
- **Heritage:** Lemko / Ukrainian

#### Character

Dmytro Kosach was a UPA guerrilla hiding in %OLD_VILLAGE% when [kpt. Henryk Ćwiek](kbw-officer.md)'s KBW unit came to deport it during Akcja Wisła. His killing of Ćwiek turned the deportation into a massacre.

#### Appearance

- **Clothes:** Not specified.
- **Hair & face:** Not specified.
- **Carriage:** Not specified.

#### Opinions

- **[Paraskewia Chyłak](hag.md)** — "She is the only living thread to my name."
- **[kpt. Henryk Ćwiek](kbw-officer.md)** — "One shot changed the whole village's fate."

### %NEIGHBOUR_1%, %NEIGHBOUR_2%, etc.
**Type:** Unnamed villagers — %NEW_VILLAGE% families

#### Character

Families living in %NEW_VILLAGE%. Use them as needed for scenes, gossip, evacuation logistics, or village reaction.

#### Appearance

- **Clothes:** Not specified.
- **Hair & face:** Not specified.
- **Carriage:** Not specified.

### Wanda Mazur
**Type:** Unnamed villager — elderly woman living alone

#### Character

Wanda Mazur is an elderly woman living alone. She is seen at church and is neutral.

#### Appearance

- **Clothes:** Not specified.
- **Hair & face:** Not specified.
- **Carriage:** Not specified.
