# Characters batch 3 — cut/moved content

## neighbour.md

- Moved the embedded follow-up from `Ask about Janka` into a separate action: `If players push deeper — ask how she got the house, why the best plot: he stiffens. "Wojewoda gave it to her. Ask him." Door closes.`
- Stripped GM conclusion from `Census interview — Ryszard`: `If he doesn't like the players — forms filled, door closed. Nothing extra.`
- Stripped GM conclusion from `Ask about the daughter`: `But press him and it cracks: no face, no proof, just a coat that might have been hers. He decided it was her because he needed somewhere to put the grief. "A grave was more than anyone else gave her." He'll never say aloud that he isn't sure.`
- Logged action-without-Gives gap: `Uplift Ryszard` had no `Gives:` line; converted the existing state change into `Gives: NPC State Change`.
- Trimmed `Humiliated` mechanics prose: `The easiest NPC to crack cracks harder against Rezeń — he'll spill with less prompting — but he is also further down the road to acting on his own.`
- Trimmed `Humiliated` mechanics prose: `Where before he'd rage and do nothing, now he's a man looking for the moment to prove he isn't nothing.`
- Trimmed Bond timing note: `(Available early — Day 1–2 over Barbara's fence.)`
- Trimmed Grudge parenthetical cross-reference: `(see [Humiliated](#humiliated))`.

## officer.md

- No content cut; structural only.

## painter.md

- Removed GM-only passage from `Character`: `Emil carries the guilt of the affair, but not the whole truth. In the intimacy of it, he let slip the one thing his family kept buried — that he and his siblings are secretly Lemko. Hania learned it from him. But she never used it — no threat, no blackmail — and Emil has no idea it was even a factor: he blames himself for loving her, never knowing his pillow-talk is how she came to hold the secret at all. It changed nothing in the end, because she never wielded it — Helena killed her on a threat she invented. If Emil ever learned that his careless words are what marked Hania as "dangerous" in Helena's eyes — that he handed his sister the pretext, and that Hania was innocent the whole time — the incomplete guilt he has survived on for thirteen years would come apart.`
- Removed GM-only passage from `Character`: `Weeks after the lynch, Helena had him put his one living skill to use: his painter's hand copied Edward Barnaś's dead signature onto the administrative departure declaration that handed the house to the PGR and made the family's vanishing read as a voluntary move west (see [the lynch](../story-facts/the-lynch.md), [departure-declaration-forged](../clues/clues.md#departure-declaration-forged)). He did it because Helena told him to and refusing her has never been a thing he can do. It is his one concrete, catchable crime — an act in his own hand — and the thread from the forged paper leads to him, not her. He has never spoken of it. Being confronted with it is the kind of pressure that could crack him.`

## pawelek.md

- Removed non-action setup prose from `## Actions`: `Pawełek is 4. He's not interrogated — he's observed and talked to. Where you find him and what he's doing depends on the time of day.`
- Logged action-without-valid-Gives gap: `Sit with Pawełek and Babcia` had `Gives: No clues. Atmosphere.`; removed the action and moved its gated observations to `## Opportunities`.
- Moved nested `Opportunities` under `Sit with Pawełek and Babcia` into the top-level `## Opportunities` section.
- Stripped atmosphere-only action text from `Play with Pawełek`: `No clues, no information. Just a 4-year-old having fun.`
- Logged action-without-valid-Gives gap: `Play with Pawełek` had `Gives: Nothing. — counts for actions that require trust`; converted the trust effect into `Gives: NPC State Change`.
- Removed illegal action heading `When sick (HP 1-6)` and folded its requirement into the sick actions.
- Moved skill branches from `Stabilize Pawełek` into gated opportunities: `Medicine (diagnosis)` and `Medicine (contamination)`.
- Stripped GM conclusion from `Stabilize Pawełek`: `you're buying time, not winning.`
- Trimmed contamination prose from `Stabilize Pawełek`: `High phosphate, high ammonia, anaerobic bacteria from deep decay. Points to a sealed space — cistern, cellar, well — filled with something large and organic. Not one body. Many.`
- Moved skill branches from `Ask about drinking water` into gated opportunities: `Geology` and `Observation`.
- Removed no-output branch from `Ask about drinking water`: `Without bond or check: Shakes his head. Won't say more.`

## priest.md

- Moved illegal section `## The Grace Arc — judgment vs. mercy` under `## Mechanics` as `### The Grace Arc — judgment vs. mercy`.
- Trimmed Grace Arc prose: `He alone reads the flood as literal divine judgment — God drowning a valley built over a mass grave (Noah, the Deluge, Sodom). Every soul still in mortal sin when the water comes drowns damned. Half of him believes the valley deserves it — which is why his faith is collapsing across the three flood masses (Day 4 hollow → Day 6 fraying → Day 7 breaks).`
- Trimmed judgment outcome prose: `The truth detonates publicly and arms the report/ledger (public testimony that the "resettled"/"departed" dead are dead here). The guilty drown damned; Grace is foreclosed.`
- Trimmed mercy outcome prose: `everyone is redeemable; he reaches for the loophole (general absolution, valid in danger of death)`.
- Removed authoring HTML comment: `GM — TWO-WAY LEVER... Seed it subtly, never signpost it... Let sharp players assemble it themselves.`
- Removed authoring HTML comment with TODO: `GM — the flood-as-divine-judgment voice... TODO: build the Day-7 seal-break scene in third-flood-mass.md (currently still the old, chronologically-broken mob scene).`

## professor.md

- Moved the single-paragraph `Appearance` into template bullets and paragraph; no facts removed.
- Added required `## Opinions` from existing flood-map facts; no plot facts invented.
- Trimmed `Call him for help — where to look` outcome prose: `He talks fast, thinks faster. The moment they describe the two valleys and the ridge between them, he stops them: the whole projection hangs on one thing... He can't see it from Kraków... He won't stake his name on a hunch; he wants the number off an instrument, taken on the ground. He'll wait by the phone for it.`
- Moved separate `Scene Unlock` and `NPC State Change` lines in `Call him for help — where to look` into the mandatory `Gives:` line.
- Trimmed `Call him back — the truth about the ridge` outcome prose: `He goes quiet, then grim: that's it, that's the mechanism... Whatever happens in the valley, a hydrologist in Kraków holds a documented account...`
- Moved separate `NPC State Change` and `World State Change / Ending Progress` lines in `Call him back — the truth about the ridge` into the mandatory `Gives:` line.

## radioman.md

- Removed authoring HTML comment: `Placeholder name. Needs a real one — a resettled Polish schoolteacher's name.`
- Trimmed `Character` prose: `To the players he is openly hostile from the first word — they are a government committee, the same state that broke him, walked into his village wearing its face. He heckles, he insults, he baits them to prove him right. But he is fearless and he is loud: he'll fling what he knows about the sołtys and the bezpieka at them as an accusation. The truth is on offer; his cooperation is not — not until they show him they aren't the sołtys's creatures.`
- Converted ungated opportunity `He's mid-tirade` into gated opportunity `The fixed accusation`.
- Converted `The suit jacket, the phrasing — Bureaucracy / History` into `(requires: Bureaucracy or History)` format.
- Removed action branch from `Hear him out over a bottle`: `Streetwise / Reassurance, or Bond: he drops the performance and gets specific — where Gajda walks, that he goes out to the car by himself, that it's been years.`
- Removed branch note from `Hear him out over a bottle` requirements: `a [Bond](#bond) makes him precise instead of ranting`.
