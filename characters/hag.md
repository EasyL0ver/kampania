# Paraskewia Chyłak

**Type:** Named character — Lemko survivor, forest hermit (hidden)

## Hook

- Paraskewia Chyłak, an old Lemko woman who lives alone in the forest.

## Vital Statistics

- **Status:** Resident
- **Born:** ~1927
- **Age in 1967:** ~40
- **Heritage:** Lemko
- **Lives in:** [Hag's cabin](../locations/hags-cabin.md) — alone
- **Settled:** Never left; hid in the forest after the 1947 massacre

## Character

Survivor of the 1947 massacre and keeper of [the well](../story-facts/the-well.md). She has spent twenty years performing Lemko death rites there, containing what the village refuses to name.

## Appearance

- **Clothes:** Layers of patched wool and linen in forest colours — browns, greys, faded greens.
- **Hair & face:** Iron-grey hair hidden under a dark headscarf; deeply lined face, dark watchful eyes.
- **Carriage:** Silent footfall, sudden arrivals, and the stillness of someone who has hidden for twenty years.

Her voice is a dry rasp, used sparingly. She feels less like a villager than a surviving part of the forest.

## Opinions

- **[Stanisław Rezeń](butcher.md)** — "I know the local boy who helped the soldiers in 1947. I have watched his footprints at the well for twenty years."
- **[%OLD_VILLAGE%](../locations/old-village-ruins.md)** — "My dead are there. The stones remember more honestly than the living."
- **[%NEW_VILLAGE%](../locations/village-outskirts.md)** — "The river wants its old bed back. The hill came down in the notch and stopped it, so the water climbs to where the houses are."
- **[Dmytro Kosach](../characters/dmytro-kosach.md)** — "Say his name correctly or do not say it. He was loved, and he died with the rest."
- **[hag-tends-the-well](../clues/clues.md#hag-tends-the-well)** — "I do what no one else will do. The dead need names, fire, bread, honey, and prayer."
- **[hag-poisoned-pawelek](../clues/clues.md#hag-poisoned-pawelek)** — "I warned the boy the water was foul and told him not to drink. He was thirsty and drank anyway. I do not poison children. I keep them from the well."
- **[hag-blamed-for-wolves](../clues/clues.md#hag-blamed-for-wolves)** — "The wolves have known me twenty years and never touched me. I sing for my dead, not for them. Say I called them if it helps you sleep."

## Mechanics

### Talking to her
- Paraskewia cannot be spoken to without Language. Even with it, the exchange is halting and hard.

### Hostility
- By default she can be approached and interviewed at her [cabin](../locations/hags-cabin.md).
- If the players come at her as a threat (chasing her at the well, cornering her, open aggression), she comes to believe the village means her harm.
- While she believes this, she stops her nightly rite, so [Hag's Prayer](../events/hags-prayer.md) no longer fires, and none of her actions below are available.
- The **Convince her the villagers are friendly** action clears it.

## Actions

### Census interview
- **Requires:** [Language](../cards/language.md)
- **Cost:** 1 time
- **Outcome:** She gives her name — Paraskewia Chyłak — and says she is Lemko.
- **Gives:** [hag-is-lemko](../clues/clues.md#hag-is-lemko); Census data — Paraskewia Chyłak, Lemko, living in the forest.

### Property assessment
- **Requires:** [Language](../cards/language.md)
- **Cost:** 1 time
- **Outcome:** She shows the cabin without fuss: a tiny hut she built and has lived in for twenty years.
- **Gives:** Property record — [Hag's cabin](../locations/hags-cabin.md), hers by occupation, no title.

### The land remembers the water
- **Requires:** [Language](../cards/language.md)
- **Prompted by:** [committee-runs-geographical-survey](../clues/clues.md#committee-runs-geographical-survey)
- **Cost:** 1 time
- **Outcome:** She has watched this ground for twenty years. In her own terms she says the river wants its old bed back, that its course shifted, and that a slide came down and closed the notch in the ridge. She has nothing to say about the far-ridge streambed.
- **Gives:** [river-doesnt-match-map](../clues/clues.md#river-doesnt-match-map); [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap)

### Ask her about Pawełek
- **Requires:** [Language](../cards/language.md)
- **Prompted by:** aware:events/pawelek-falls-ill.md
- **Cost:** 1 time
- **Outcome:** She found the boy at the well and told him the water was foul and not to drink it. He was thirsty and drank anyway. She knows what bad water does, but her remedy is the old one: the boy needs a cleansing rite, not a doctor.
- **Gives:** [`pawelek-got-it-from-water`](../clues/clues.md#pawelek-got-it-from-water); [`hag-warned-pawelek`](../clues/clues.md#hag-warned-pawelek); [`pawelek-needs-a-cleansing-ritual`](../clues/clues.md#pawelek-needs-a-cleansing-ritual)

### Ask her about the rites
- **Requires:** [Language](../cards/language.md)
- **Prompted by:** [hag-tends-the-well](../clues/clues.md#hag-tends-the-well)
- **Cost:** 1 time
- **Outcome:** She tells them the dead here were never laid to rest and will not settle. She tends them so the unquiet does not spread.
- **Gives:** [spirits-are-restless](../clues/clues.md#spirits-are-restless)

### Ask her about the spirits
- **Requires:** [Language](../cards/language.md) AND [Bond: Paraskewia Chyłak](../cards/bond-hag.md)
- **Prompted by:** [spirits-are-restless](../clues/clues.md#spirits-are-restless)
- **Cost:** 1 time
- **Outcome:** With trust earned, she tells the truth of what happened here: in 1947 the whole village was killed in a single act of violence. They did not leave. They were massacred.
- **Gives:** [army-massacred-civilians-in-1947](../clues/clues.md#army-massacred-civilians-in-1947)

### Ask her how it happened
- **Requires:** [Language](../cards/language.md) AND [Bond: Paraskewia Chyłak](../cards/bond-hag.md)
- **Prompted by:** [army-massacred-civilians-in-1947](../clues/clues.md#army-massacred-civilians-in-1947)
- **Cost:** 1 time
- **Outcome:** She tells it as she saw it. The soldiers came to drive the village out; the people would not go; their officer was shot dead in the struggle; and the soldiers turned in their fury and killed everyone. No one ever came after. No reckoning, no record, the dead left unnamed. The army buried its own crime and called the village empty.
- **Gives:** [`massacre-was-retribution`](../clues/clues.md#massacre-was-retribution); [`massacre-was-covered-up`](../clues/clues.md#massacre-was-covered-up)

### Where the partisans hid
- **Requires:** [Language](../cards/language.md) AND [Bond: Paraskewia Chyłak](../cards/bond-hag.md)
- **Prompted by:** [upa-bunkers-in-the-area](../clues/clues.md#upa-bunkers-in-the-area)
- **Cost:** 1 time
- **Outcome:** With trust earned, she tells them of the dugout deep in the forest northwest, the one she knew in the war years, where she used to meet a man called [Dmytro](../characters/dmytro-kosach.md). She still knows the way to its hidden mouth exactly.
- **Gives:** aware:locations/upa-bunker.md

### Convince her the villagers are friendly
- **Requires:** [Language](../cards/language.md) AND ([Speech](../cards/speech.md) OR [Empathy](../cards/empathy.md))
- **Cost:** 1 time
- **Outcome:** You persuade her the committee and the village mean her no harm. She lowers her guard and will speak with you again.
- **Gives:** NPC State Change: Paraskewia stops believing the village is hostile; her actions and nightly rite resume (see [Hostility](#hostility)).

## Bond

- [ ] Approach her cabin openly and wait at the treeline — do not barge in.
- [ ] Show respect for the dead — acknowledge the old graves, the missing families, or Dmytro.
- [ ] Leave her ritual objects, icons, candles, and herbs untouched unless invited.

## Grudge

- [ ] Enter her cabin without invitation or touch her things.
- [ ] Be loud, aggressive, or dismissive in the forest — treat her space with contempt.
- [ ] Desecrate or ignore the old Lemko graves and shrines.
