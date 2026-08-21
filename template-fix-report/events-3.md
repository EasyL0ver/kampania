# Events batch 3 — cut/moved content

## priests-plea.md

- Moved from `**Location:**`: `the rectory beside it, after hours` into Setup.
- Moved from `**Present:**`: `(shaken, sober — this is before the breaking)` into Setup as fear and pre-break state.
- Moved from `**Present:**`: `and **one** player: the one who has shown him genuine faith. He asks for that player alone.` into Trigger/Setup.
- Reduced Available prose about bond progress and private access into terse trigger bullets.
- Reduced Trigger prose about thirteen years of sealed sins, fear of water, safe confessor, and reaching for one player into factual Trigger bullets.
- Reduced Hook prose and exact request quote `would you come and sit with me a while` into factual Hook bullets.
- Reduced Setup prose about the rectory, lamp, rain, tea, silence, and tired priest into factual Setup bullets.
- Reduced theological prose about judgment, Noah, Sodom, unforgivable sin, and unnamed sin into factual Setup bullets.
- Cut mood phrasing: `for a long moment he is just a tired man in a black cassock who cannot find the first sentence`.
- Cut flavor dialogue framing around the priest's question; retained the question's factual content.
- Converted all Opportunities from nested skill paragraphs to gated `(requires: …)` bullets.
- Cut psychology phrasing: `The man, not the office`, `the reversal is how far he's already fallen`, `his mind is running down one track`, `the implication is quietly enormous`.
- Split `If the player holds priest-knows-everything` sub-reveals into separate gated Opportunities.
- Flattened action Outcomes and removed skill/psychology phrasing.
- Action-without-Gives gap: `Push him to name the sin / break the seal` had no top-level Gives line; fixed with NPC State Change and Ending Progress.
- Action-without-Gives gap: `Tell him the valley deserves it — agree it's judgment` had Cost `—`; fixed to `Free` and retained Gives.
- Added inferred `## Exits`: back to church, toward Odpust, or toward later flood Masses.

## punishment-lynch.md

- Removed non-template header line `**Type:** Event — endgame catastrophe`.
- Reduced `**Location:**` from two-beat prose into technical location links.
- Moved from `**Present:**`: `at the front, rifle in hand`, `drunk and purposeful`, `his state runs Part 1`, `only if she was never warned`, and target explanation into Setup/Trigger.
- Reduced Available prose `This is not optional... Someone goes into the well tonight` into Trigger bullets.
- Reduced Trigger essay about thirteen years of inaction, guilt, the valley repeating 1954, and the endgame role into factual Trigger bullets.
- Reduced Hook prose about the drinking circle, lamps, boots, dogs, rifle, and warning into factual Hook bullets.
- Removed section `## Part 1 — The PGR Office`; moved necessary content into Setup, Opportunities, and Actions.
- Removed section `### If Zbigniew is braced`; moved dark office / locked door / later arrival logic into Setup and If Missed.
- Removed section `### If Zbigniew is breaking`; moved steps / failed authority / targeting effects into Setup and Actions.
- Removed section `## Opportunities (Part 1)`; merged into `## Opportunities`.
- Removed section `## Actions (Part 1 — only if Zbigniew is breaking and out on the steps)`; merged actions into `## Actions`.
- Removed section `## Part 2 — The Well`; moved mob movement, Dudka state, target, and Barbara conditions into Setup.
- Removed section `### Barbara`; moved Barbara conditions into Setup.
- Removed section `## Opportunities (Part 2)`; merged into `## Opportunities`.
- Removed section `## Actions (Part 2 — the well)`; merged into `## Actions`.
- Removed section `## Aftermath`; moved essential consequences into If Missed and Exits.
- Removed pseudo-action `Braced Zbigniew arrives (GM beat, not a player action)`; converted to If Missed consequence.
- Cut exact dialogue beat `go home, it's finished`; retained dispersal fact.
- Cut prose lines: `the same darkness, the same drink, the same water as 1954`, `The valley is not choosing. It is repeating`, `The killing cannot be called off — only aimed, or absorbed`, and similar mood/essay language.
- Converted Opportunities to gated `(requires: …)` bullets.
- Flattened action Outcomes; removed embedded bold conclusions such as `This feels like justice and is 1954 again`, `You own the choice`, and `This is how a player dies tonight`.
- Action-without-Gives gap: `Back him` used `World State Change:` instead of a `Gives:` field; fixed.
- Action-without-Gives gap: `Feed him to them` had Cost `—` and `World State Change:` instead of `Gives:`; fixed.
- Action-without-Gives gap: `Turn the aim onto a perpetrator` had Cost `—` and `World State Change:` instead of `Gives:`; fixed.
- Action-without-Gives gap: `Turn the aim off an innocent` used `World State Change:` instead of `Gives:`; fixed.
- Action-without-Gives gap: `Put yourself between them and the target` used `World State Change:` instead of `Gives:`; fixed.
- Action-without-Gives gap: `Convince Dudka justice will be delivered` used two Requires fields and `World State Change:` instead of `Gives:`; fixed by merging Requires and adding Gives.
- Action-without-Gives gap: `Let it run` lacked Cost and Gives; fixed.
- Preserved existing exits and reduced them to template-conformant bullets.

## rezen-takes-the-body.md

- Reduced `**Location:**` from `(the body), then` prose into two technical links.
- Moved from `**Present:**`: `alone, with his dogs` into Setup/Hook as needed.
- Reduced Available long conditional sentence into terse technical prerequisite.
- Reduced Trigger narrative about the funeral, body above ground, well pull, and live confrontation into factual bullets.
- Reduced Hook prose about dogs, rain, dragging, and open church door into factual bullets.
- Reduced two conditional Setup paragraphs into bullet facts.
- Cut atmosphere: `Rain hammering the roof`, `Candles guttering`, `the way a man looks at a job that needs doing`, and `without ceremony`.
- Converted Opportunities from nested skill notes to gated `(requires: …)` bullets.
- Cut Read interpretations: `Not desecration for its own sake`, `Whatever he did, doing it settled something in him`, and `The craving is quiet — for now`.
- Flattened `Keep vigil over the body` Outcome; moved prevention of `rezen-fed-ciotka-to-well` into Gives as World State Change.
- Cut skill branch under `Keep vigil over the body` about Intimidate / Law; no separate clue or state change existed beyond preventing the event.
- Flattened `Follow the drag trail` Outcome; cut explanation connecting Janina to 1947 dead and [Edward Barnaś](../characters/soldier.md) as interpretive prose.
- Flattened `Confront Rezeń`; cut exact dialogue and Read psychology about practical reason as a coat over compulsion.
- Action-without-Gives gap: `Confront Rezeń` had `NPC State Change` and `Ending Progress` outside the Gives field; merged into Gives.
- Kept existing Exits and reduced labels.
- Reduced If Missed prose into bullet consequences.

## second-flood-mass.md

- Moved from `**Location:**`: `Day 6 morning` into Available.
- Moved from `**Present:**`: `the village, the water higher, nerves worn through`, `who has come to every Mass since burying his sister`, and `The last Mass before the lynch that night` into Setup/Available.
- Reduced Available sermon-cycle prose into Trigger bullets.
- Converted Setup sermon paragraph into factual bullets.
- Cut Habakkuk block quote as flavor scripture; retained citation and mechanical meaning.
- Cut prose: `The very stones of the walls...`, `the deepest thing the water is answering`, `His pulpit is the mob's fuel`, `the strike that lights it`.
- Replaced `TBD` Opportunities with gated atmosphere Opportunities derived from existing Setup; no new clue added.
- Replaced `TBD` Actions with two concrete state/ending actions based on the existing sermon pressure and faith track.
- Action-without-Gives gap: original Actions section was `TBD`; added Gives for both actions.
- Added inferred `## Exits`: church, [The Lynch](punishment-lynch.md), and [The Odpust](the-odpust.md). Needs review for sequence weighting.

## the-car-in.md

- Removed HTML comment under `## Hook`: `Not applicable — opening scene, happens directly to the players.`
- Removed `## Hook` section because it contained only a non-content comment.
- Reduced Setup prose about the car, rain, Skowron, and players' role into bullet facts.
- Converted the hidden warning from an Action into a gated Opportunity and kept the Action too because the original file had a player-initiated version.
- Removed flavor dialogue quotes: `Mountain villages have their own history. Folk stories, old grudges.`, `It's a village, not a warzone. Biggest danger is the mud.`, and the long hidden-warning quote.
- Replaced `Ability TBD (perception / intuition / bureaucratic experience)` with `bureaucratic experience or intuition`.
- Action-without-Gives gap: `Character creation` used `Leads to:` instead of `Gives:`; fixed as World State Change.
- Removed forbidden `Leads to:` label.
- Added inferred `## Exits`: [Arrival](arrival.md). Needs review only if opening sequence changes.
- Removed `## If Missed` because it contained only a non-content comment.

## the-disclosure.md

- Reduced `**Location:**` from full area prose into one linked technical location.
- Moved from `**Present:**`: whole-village gathering, Zbigniew's center/barricade state, Dudka as loudest, and Babcia absence into Setup.
- Reduced Available prose about proof, truth breaking, and trigger route into terse header.
- Reduced Trigger explanatory prose into route bullets: Enlisted, Forced, Broken.
- Reduced Hook paragraph about voices, doors, mud, office, and rain into factual bullets.
- Reduced Form A and Form B Setup paragraphs into bullet facts.
- Cut dialogue/prose: `they knew, they were told we were safe...`, `You told us we were safe`, `the water keeps rising behind all of it`, and `the talking has a clock on it`.
- Converted Opportunities from ungated/nested style to gated `(requires: …)` bullets.
- Cut Read psychology phrasing: `it isn't one mood, it's a dozen`, `This is his life's work drowning`, `the crack waiting to open`, and `the same authority that keeps the peace can break it`.
- Flattened all Actions; split `Face the crowd — take the anger` into `Face the crowd with a plan` and `Face the crowd without a plan` to remove outcome branches.
- Flattened `Tell the whole truth`; cut conditional branches for enlisted vs forced/defied shielding. The resulting state change captures panic and Dudka danger only.
- Flattened `Force Zbigniew to answer the crowd`; cut sub-branches `If it lands` / `If it doesn't` into one outcome and one Gives line.
- Action-without-Gives gap: all original actions used `World State Change:` or `NPC State Change:` labels rather than mandatory `Gives:`; fixed.
- Preserved existing Exits and reduced them to bullets with links.
- Reduced If Missed prose into bullet consequences.

## the-flood.md

- Reduced `**Location:** %NEW_VILLAGE% — everywhere` to `%NEW_VILLAGE%`.
- Reduced `**Present:** Everyone. The whole village wakes to this.` to `Everyone` and moved wake-up fact into Setup.
- Reduced Available to technical automatic timing.
- Reduced Hook prose about rain and sound into factual bullets.
- Reduced Setup narrative about waking, flood-grey windows, vanished road, bridge, creek, Skowron absence, phone, villagers, sandbags, PGR, old-timers, and player disorientation into bullet facts.
- Cut atmosphere: `water drumming on the roof like fists`, `not dawn grey, flood grey`, `The village is an island`, `The players are the only ones who look lost`.
- Converted all Opportunities into gated `(requires: …)` bullets.
- Added direct clue Gives to Opportunities where matching existing clues existed: [`road-washes-out`](../clues/clues.md#road-washes-out), [`phone-is-lifeline`](../clues/clues.md#phone-is-lifeline), [`old-village-flooding`](../clues/clues.md#old-village-flooding).
- Flattened `Try the phone`; cut branches `Line works`, `Line dead`, `Zbigniew present`, and operator event prose into one Outcome and Gives.
- Preserved [Operator Refuses Help](operator-refuses-help.md) as Scene Unlock.
- Added missing Requires lines to `Help with flood response` and `Check on villagers`.
- Action-without-Gives gap: `Try the phone` had no `Gives:` field; fixed.
- Action-without-Gives gap: `Check on villagers` gave access as prose, not as a valid Gives line; fixed as World State Change.
- Added inferred `## Exits`: local investigation, phone/operator, disclosure, and [Foreman Saves the Village](foreman-saves-village.md). This was specifically missing and needs review for final routing.
- Removed `## If Missed` because it only said the automatic event cannot be missed.

## the-odpust.md

- Moved from `**Location:**`: `Day 7, the water reaching the door` into Available/Setup.
- Moved from `**Present:**`: emotional state `(restored, not broken)`, survival list, Rezeń narrative, and Babcia conditional note into Setup.
- Reduced Available threshold prose into technical requirement.
- Reduced Trigger prose about guilty villagers confessing, proof of redemption, and choosing mercy into factual bullets.
- Reduced Hook prose about steady bell and changed priest into factual bullets.
- Reduced Setup prose about packed church, water, drowned candles, clean vestments, Isaiah sermon, gaze, scarlet, mercy, and absolution into factual bullets.
- Cut Isaiah quote except the mechanical phrase `sins like scarlet becoming white`.
- Cut Micah quote from action; retained mechanical absolution outcome.
- Converted Opportunities to gated `(requires: …)` bullets.
- Cut theological prose: `That is either the whole point of grace or its final obscenity`, `two thieves`, `the thief who mocks`, and similar interpretive wording.
- Removed non-template section `## Babcia's Plea`; moved its content into Setup, an Opportunity, and two Actions.
- Flattened `Receive the odpust`; moved Ending Progress into Gives.
- Flattened `Bring a specific guilty soul to the rail`; moved NPC State Change into Gives.
- Action-without-Gives gap: `Refuse it — walk out` had `World State Change: none`; fixed with `the odpust proceeds without that player`.
- Added actions for stopping or proceeding past Babcia's plea to preserve the moved section's consequences.
- Preserved Exits and added conditional exit back to [The Ritual](the-ritual.md) if Babcia's plea stops the odpust.

## the-report.md

- Removed leading HTML authoring comment: `Restructured from story essay. Needs scene-level detail...`.
- Reduced Available to technical final-scene timing.
- Removed `## Hook` section because it contained only a non-content comment.
- Reduced Trigger prose into factual bullets.
- Reduced Setup prose about reading in the car, massacre discovery, Akcja Wisła, the dam, state burial, and report choice into factual bullets.
- Cut phrase `original sin that predates the lynch, the well, everything` as essay language.
- Removed HTML TODO under Opportunities about Skowron's face, driver, route, and details.
- Added gated Opportunities derived from the TODO and existing action consequences.
- Converted three unheaded action paragraphs into proper `###` Actions with Requires/Cost/Outcome/Gives.
- Removed final prose: `The players may not even realise the phone call saved their lives... But the GM knows.`
- Removed `## If Missed` because it contained only a non-content comment.
- Added inferred `## Exits`: end the campaign.
