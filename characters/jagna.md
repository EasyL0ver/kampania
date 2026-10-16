# Hania Barnaś

## Hook

- [@first-name](jagna.md) [@surname](jagna.md), [@name](soldier.md)'s daughter, missing since 1954.

## Vital Statistics

- **First name:** Hania
- **Surname:** Barnaś
- **Status:** Outsider
- **Morning:** away
- **Afternoon:** away
- **Evening:** away
- **Night:** away
- **Born:** 1935
- **Age in 1967:** 32
- **Based in:** The nearest town — works the manual switchboard at the telephone exchange in the back of the post office

## Character

Missing since 1954 and presumed dead, though no one truly knows. She was proud, sharp, and observant; she knew the Gajdas' secret, never used it, and fled the lynch into the forest. She survived, took the operator's chair, and turned cold: she wants the village that murdered her family destroyed, not rescued from, not sorry, punished. She is not after recognition or return. She does not single out the committee or even the men who did the killing; justice against them means nothing to her now. The whole village is the thing she wants gone, and she will use anyone she can, the committee included, to bring it down while she stays hidden.

From the exchange she has pieced the crime together. She knows for a fact the three men who carried out the killing, [@name](wujas.md), [@name](wojewoda.md), and [@name](butcher.md), and she strongly suspects [@name](matrona.md) instigated it, though she cannot prove it. She knows the village's only telephone sits in [@name](wojewoda.md)'s office, so every call the committee places to the outside passes through her hands.

## Setup

- **Clothes:** Better-kept than the village expected from the Barnaś house; plain skirts and blouses worn with deliberate neatness.
- **Hair & face:** Dark hair pinned or braided tight; bright, watchful eyes; a face that looked older when she was listening.
- **Carriage:** Quick, upright, and slightly defiant; she held eye contact too long for village comfort.
- **Voice:** On the line, flat and professional: "Exchange. Number, please." "Hold for the connection." "Go ahead."

People remembered her as clever before they remembered her as kind. Around [@first-name](glupek.md) she softened; around everyone else she looked ready to leave.

## Opinions

- **[@name](soldier.md)** — "He is my father, and I am more like him than I want to admit. He died because he came for me."
- **[@name](glupek.md)** — "My little brother. I buried him in my mind with the rest of them in 1954. His name never crossed my board."
- **[@name](painter.md)** — "I loved him once, and I wanted the danger of him. Then I watched him bend under [@first-name](matrona.md) and stay, paint her house, never once raise his voice for me or mine. He got under her boot like the rest. I hate him the way I hate all of them."
- **[@name](wujas.md)** — "He wanted me and I let him hope. That was cruel, but useful."
- **[@name](matrona.md)** — "She asked me to step aside, politely. I would not give her [@first-name](painter.md). If strangers call to bring her to account, I will connect them."
- **[@name](wojewoda.md)** — "His voice belongs to the valley that ran my family into the well."
- **[@name](butcher.md)** — "If the call damns him, I will not stop it."
- **[@name](hag.md)** — "She kept me alive when returning would have finished me."
- **[jagna-knew-the-secret](../clues/clues.md#jagna-knew-the-secret)** — "I knew, and I kept quiet. Knowing was enough to make them afraid."
- **[jagna-painter-affair](../clues/clues.md#jagna-painter-affair)** — "We were lovers. Everyone guessed, but guessing is not proof."

## Mechanics

### Evacuate

- **Type:** bool
- **Per:** world
- **Start:** false
- True when she relays the rescue call and the valley is evacuated. The **Evacuate** ending.

### Identity

- **Type:** rule
- She works the manual switchboard at the nearest town's exchange, in the back of a post office, under another name. Nobody in the valley knows she is [@first-name](jagna.md).
- Every long-distance call the committee places — [@name](professor.md), [@name](sawicki.md), [@name](officer.md)'s superiors, the powiat — routes through her board.
- Her identity remains unprovable from the line. A bad connection and a thirteen-year-old memory are not evidence.
- She works one tier out from [@name](../locations/new-village/new-village.md): close enough to handle the valley's long-distance calls, far enough to stay a stranger.

### Calls

- **Type:** rule
- Most calls connect because she usually holds back from using the switchboard against the valley.
- A rescue call during the flood can fail because she keeps the channel open and useless.
- Never let her touch the earlier [@title](professor.md) [@surname](professor.md) call in [@name](../events/the-report.md); that call stays player-driven.

### Levers

- **Type:** rule
- [@first-name](glupek.md) is the personal lever. If the players know [@first-name](glupek.md) is her brother and know he is trapped in the flooding forest, carrying his name over the wire makes her relay the call.
- Justice is the vengeance lever. If the players call to expose a real village crime and bring the guilty to account, she relays the call.
- A plain plea to save the valley gets nothing.

### Deniable tell

- **Type:** rule
- If a player says the one unbearable thing down the wire — her name, "[@first-name](jagna.md)?", her father, or the well — she gives one small, deniable gasp.
- The gasp happens once only. Repeating the trigger gets flat procedure.
- The gasp is never confirmation.

### Anonymity

- **Type:** enum (anonymous | known)
- **Per:** world
- **Start:** anonymous
- Anonymous until the committee knows the voice is [@name](jagna.md) ([Name her](../events/phone-calls/operator-refuses-help.md#name-her)), which turns her indifference vengeful.

### Willingness

- **Type:** enum (withholding | rescue | exposure)
- **Per:** world
- **Start:** withholding
- Opens only after she is known as [@first-name](jagna.md), then **Tell her [@first-name](glupek.md), her brother, is alive and trapped** opens rescue calls or **Name her family's killers** opens exposure calls ([@name](../events/the-report.md)).

## Bond

- [ ] Treat [@first-name](jagna.md) as a person in the record, not only as a scandal or victim.
- [ ] Protect [@first-name](glupek.md) from cruelty or dismissal.
- [ ] Preserve evidence of what happened to her family instead of trading it away.
