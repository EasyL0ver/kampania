# Coffee at Helena's

**Location:** [Helena Rzepka's house](../locations/matronas-house.md)
**Present:** [Helena Rzepka](../characters/matrona.md), [Emil Rzepka](../characters/painter.md)
**Available:** Morning of Day 6.

## Trigger

- [Helena Rzepka](../characters/matrona.md) invites the committee to coffee on the morning before [the lynch](punishment-lynch.md).
- If the players have started circling the truth, the invitation is her counter-move.
- [Helena Rzepka](../characters/matrona.md) speaks only to crimes connected to clues the players already hold.
- [Helena Rzepka](../characters/matrona.md) does not introduce crimes the players have not found.

## Hook

- [Helena Rzepka](../characters/matrona.md) sends word to the committee.
- [Helena Rzepka](../characters/matrona.md) may appear at the committee's door.

## Setup

- The kitchen has a clean pressed cloth.
- The kitchen has real coffee.
- Fresh baked food is on the table.
- A small crucifix hangs on the wall.
- A clock ticks in the room.
- [Helena Rzepka](../characters/matrona.md) seats the committee herself.
- [Helena Rzepka](../characters/matrona.md) pours the coffee herself.
- [Helena Rzepka](../characters/matrona.md) waits until the committee has eaten before speaking.
- The hospitality is more generous than ordinary village conditions support.
- [Emil Rzepka](../characters/painter.md) refills cups at the edges of the room.
- [Emil Rzepka](../characters/painter.md) avoids eye contact.
- [Emil Rzepka](../characters/painter.md) flinches when [Helena Rzepka](../characters/matrona.md) says his name.
- [Helena Rzepka](../characters/matrona.md) argues that exposing old crimes harms the living and raises none of the dead.
- If players hold [`something-happened-in-54`](../clues/clues.md#something-happened-in-54), [`lynch-body-in-well`](../clues/clues.md#lynch-body-in-well), or [`three-drunk-attackers`](../clues/clues.md#three-drunk-attackers), she says naming the 1954 death buys nothing now.
- If players hold [`wojewoda-was-hurt-that-night`](../clues/clues.md#wojewoda-was-hurt-that-night) or [`foreman-coverup`](../clues/clues.md#foreman-coverup), she says [Zbigniew Gajda](../characters/wojewoda.md) is the only person holding the village together during the flood.
- If players hold [`siblings-are-lemko`](../clues/clues.md#siblings-are-lemko), she says writing the Gajdas' Lemko identity into a state report makes them a target.
- If players hold [`departure-declaration-forged`](../clues/clues.md#departure-declaration-forged), she says pursuing the forged paper will destroy [Emil Rzepka](../characters/painter.md).
- If players hold [`massacre-happened`](../clues/clues.md#massacre-happened), [`massacre-was-covered-up`](../clues/clues.md#massacre-was-covered-up), or [`massacre-bodies-in-well`](../clues/clues.md#massacre-bodies-in-well), she says no Polish court will try 1947.
- If players hold [`glupek-strangled`](../clues/clues.md#glupek-strangled) or [`ciotka-not-mother`](../clues/clues.md#ciotka-not-mother), she says exposing how [Edek Barnaś](../characters/glupek.md) was hurt strips away [Janina Gajda](../characters/ciotka.md)'s care for him.
- If players hold [`foreman-coverup`](../clues/clues.md#foreman-coverup), she says filing the truth about the PGR death would end [Wanda Mazur](../characters/widow.md)'s payments.
- If players hold [`wujas-is-guilty`](../clues/clues.md#wujas-is-guilty), she says [Tadek Gajda](../characters/wujas.md)'s punishment is already visible in his drinking.
- If players hold [`jagna-painter-affair`](../clues/clues.md#jagna-painter-affair) or [`matrona-controls-painter`](../clues/clues.md#matrona-controls-painter), she says exposing the affair only breaks [Emil Rzepka](../characters/painter.md) further.
- If players hold [`matrona-orchestrated-lynch`](../clues/clues.md#matrona-orchestrated-lynch) or [`painter-heard-matrona`](../clues/clues.md#painter-heard-matrona), she admits she aimed the mob and argues that naming her hands the state a Lemko woman to punish.
- If the committee needs one name for the report, [Helena Rzepka](../characters/matrona.md) offers [Stanisław Rezeń](../characters/butcher.md).
- **Composure:** 1.

## Opportunities

- **The excessive warmth** `(requires: Culture)` — The coffee and generosity manage a threat rather than host guests. → Gives: [`matrona-overperforms`](../clues/clues.md#matrona-overperforms)
- **What she never asks** `(requires: Finesse)` — [Helena Rzepka](../characters/matrona.md) never asks what the players have found.
- **The shape of her case** `(requires: Finesse)` — Every practical argument ends at leaving the truth buried. → Gives: [`committee-hides-something`](../clues/clues.md#committee-hides-something)
- **Emil at the edges** `(requires: Empathy)` — [Emil Rzepka](../characters/painter.md) flinches at his own name and will not be alone with [Helena Rzepka](../characters/matrona.md) and outsiders.

## Actions

### Take the scapegoat — give them Rezeń
- **Requires:** Nothing
- **Cost:** Free
- **Outcome:** The committee names [Stanisław Rezeń](../characters/butcher.md) in the report as the valley's guilt; the Lemko secret, the 1954 lynch, the forgery, and the massacre stay buried behind his name.
- **Gives:** NPC State Change: [Helena Rzepka](../characters/matrona.md) becomes relieved and warm toward the players; World State Change: [Stanisław Rezeń](../characters/butcher.md) becomes [Ryszard Dudka](../characters/neighbour.md)'s locked [lynch target](../characters/neighbour.md#lynch-targets) unless players later intervene at [the lynch](punishment-lynch.md#actions).

### Confront her with her own hand
- **Requires:** [`matrona-orchestrated-lynch`](../clues/clues.md#matrona-orchestrated-lynch) or [`painter-heard-matrona`](../clues/clues.md#painter-heard-matrona)
- **Cost:** 1 composure
- **Outcome:** [Helena Rzepka](../characters/matrona.md) drops the performance, admits she aimed the mob, falsely claims [Hania Barnaś](../characters/jagna.md) was blackmailing the family, and truthfully identifies [Edward Barnaś](../characters/soldier.md) as a 1947 participant who took Lemko land.
- **Gives:** [`soldier-participated-in-massacre`](../clues/clues.md#soldier-participated-in-massacre), [`soldier-took-best-land`](../clues/clues.md#soldier-took-best-land); NPC State Change: [Helena Rzepka](../characters/matrona.md) stops performing warmth with these players.

## Exits

- Back into Day 6 and the village streets.
- To [the second flood mass](second-flood-mass.md).
- To [the lynch](punishment-lynch.md) after dark.

## If Missed

- If players decline the invitation, [Helena Rzepka](../characters/matrona.md) reads the refusal as their answer.
- [Helena Rzepka](../characters/matrona.md) stops offering the quiet solution.
- [Helena Rzepka](../characters/matrona.md) leans on [Zbigniew Gajda](../characters/wojewoda.md), tightens her grip on [Emil Rzepka](../characters/painter.md), and lets [the lynch](punishment-lynch.md) proceed.
