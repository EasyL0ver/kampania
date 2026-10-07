// Clues as classes: player-discoverable facts, generated from clues/clues.md
// (text verbatim). A clue may be synthesized: holding every clue in one of
// its routes derives it anywhere.

import { Clue } from "./schema.ts";

// ---------------------------------------------------------------- Heritage & Identity

export class SiblingsAreLemko extends Clue {
  readonly id = "siblings-are-lemko";
  readonly text = "[Zbigniew Gajda](../characters/wojewoda.md), [Helena Rzepka](../characters/matrona.md), [Tadek Gajda](../characters/wujas.md), and [Janina Gajda](../characters/ciotka.md) are siblings of Lemko descent, hiding behind Polish identities.";
  override readonly synthesis = [[ThreeBarredCrossOnGajdaGrave, ThreeBarredCrossIsLemko]];
}

export class ThreeBarredCrossIsLemko extends Clue {
  readonly id = "three-barred-cross-is-lemko";
  readonly text = "The three-barred cross is a Greek Catholic symbol — Lemko, not Roman Catholic. Seeing one on a headstone, icon, or object means the owner was Lemko.";
}

export class ThreeBarredCrossOnGajdaGrave extends Clue {
  readonly id = "three-barred-cross-on-gajda-grave";
  readonly text = "The well-tended double grave of Zbigniew Gajda's parents, under its Polonised surname, carries a small three-barred cross half-hidden beneath the lichen.";
}

export class ThreeBarredCrossInBabciasRoom extends Clue {
  readonly id = "three-barred-cross-in-babcias-room";
  readonly text = "In Barbara Kopacz's house, a small three-barred crucifix hangs above [Stefania Kopacz](../characters/babcia.md)'s corner, unlike the Roman cross on the wall.";
}

export class ThreeBarredCrossInHagsCabin extends Clue {
  readonly id = "three-barred-cross-in-hags-cabin";
  readonly text = "A small three-barred crucifix hangs among the icons in [Paraskewia Chyłak](../characters/hag.md)'s cabin.";
}

export class HagIsLemko extends Clue {
  readonly id = "hag-is-lemko";
  readonly text = "[Paraskewia Chyłak](../characters/hag.md) is a Lemko woman living alone in the [forest](../locations/hags-cabin.md). She is ~40, not old — the forest aged her.";
  override readonly synthesis = [[ThreeBarredCrossInHagsCabin, ThreeBarredCrossIsLemko]];
}

export class BabciaIsLemko extends Clue {
  readonly id = "babcia-is-lemko";
  readonly text = "[Stefania Kopacz](../characters/babcia.md), [Barbara Kopacz](../characters/barbara.md)'s mother, is a Lemko woman who kept the old Greek Catholic faith and death customs.";
}

export class BabciaOpposedToChurch extends Clue {
  readonly id = "babcia-opposed-to-church";
  readonly text = "[Stefania Kopacz](../characters/babcia.md) is hostile to the Roman Catholic church. She rejects [ks. Władysław Pająk](../characters/priest.md)'s faith and rites as foreign and will not have them near her family.";
}

// ---------------------------------------------------------------- The 1947 Massacre

export class OldVillageWasLemko extends Clue {
  readonly id = "old-village-was-lemko";
  readonly text = "[%OLD_VILLAGE%](../locations/old-village-ruins.md) was a Lemko settlement — Greek Catholic, with a cerkiew, orchards, and a tightly-knit community.";
  override readonly synthesis = [[ThreeBarredCrossInCerkiew, ThreeBarredCrossIsLemko]];
}

export class OldVillageResettledDuringVistula extends Clue {
  readonly id = "old-village-resettled-during-vistula";
  readonly text = "On paper, [%OLD_VILLAGE%](../locations/old-village-ruins.md) was emptied in 1947 under Akcja Wisła (Operation Vistula), the forced resettlement that uprooted the Lemko and Ukrainian population of these mountains and scattered them to the north and west. The official record shows the village cleared and its people deported.";
}

export class OldVillageIsHaunted extends Clue {
  readonly id = "old-village-is-haunted";
  readonly text = "Villagers believe [%OLD_VILLAGE%](../locations/old-village-ruins.md) is haunted. They avoid the ruins, keep away after dark, and will not speak easily of the place.";
}

export class AbandonedHouseByStreambed extends Clue {
  readonly id = "abandoned-house-by-streambed";
  readonly text = "There is an abandoned shepherd's hut (koliba) hidden in the gorse on the far ridge above the streambed, half-swallowed and easy to miss. Long empty.";
}

export class StreambedPaintingIsOld extends Clue {
  readonly id = "streambed-painting-is-old";
  readonly text = "[Emil Rzepka](../characters/painter.md)'s streambed painting is an old one. The far-ridge streambed probably does not look the way he painted it any more.";
}

export class StreambedPaintingIsFauvist extends Clue {
  readonly id = "streambed-painting-is-fauvist";
  readonly text = "[Emil Rzepka](../characters/painter.md)'s streambed painting is Fauvist: the water and the land are rendered in bold, unnatural, expressive colour rather than as they really looked.";
}

export class PaintedBuildingIsDecaying extends Clue {
  readonly id = "painted-building-is-decaying";
  readonly text = "The cerkiew in [Emil Rzepka](../characters/painter.md)'s Informel painting is falling down: sagging timbers, a broken roofline, a structure well into collapse.";
}

export class PaintedBuildingIsInformel extends Clue {
  readonly id = "painted-building-is-informel";
  readonly text = "[Emil Rzepka](../characters/painter.md)'s cerkiew painting is Art Informel: the building dissolved into abstract fields of black, encrusted, scraped matter rather than drawn as it looked.";
}

export class UnfinishedPaintingIsInformel extends Clue {
  readonly id = "unfinished-painting-is-informel";
  readonly text = "The unfinished canvas on [Emil Rzepka](../characters/painter.md)'s easel, the one he is working on now, is Art Informel: abstract fields of black, encrusted, scraped matter, no subject drawn plainly.";
}

export class ThreeBarredCrossInAbandonedHouse extends Clue {
  readonly id = "three-barred-cross-in-abandoned-house";
  readonly text = "The timber inside the abandoned koliba on the far ridge is cut all over with three-barred crosses, carved deep and many times over.";
}

export class ThreeBarredCrossInCerkiew extends Clue {
  readonly id = "three-barred-cross-in-cerkiew";
  readonly text = "The abandoned cerkiew's altar screen, icons, and carvings are marked all over with the three-barred cross.";
}

export class ArmyMassacredCiviliansIn1947 extends Clue {
  readonly id = "army-massacred-civilians-in-1947";
  readonly text = "In 1947, the Lemko villagers of [%OLD_VILLAGE%](../locations/old-village-ruins.md) were killed — the whole village, in a single act of violence. They did not \"evacuate.\" They were massacred.";
}

export class MassacreWasRetribution extends Clue {
  readonly id = "massacre-was-retribution";
  readonly text = "The killing was not ordered or planned. Soldiers came to deport the villagers; the villagers resisted; the commanding officer was shot dead; and the enraged soldiers massacred the entire village in retribution.";
}

export class MassacreWasCoveredUp extends Clue {
  readonly id = "massacre-was-covered-up";
  readonly text = "The massacre was never reported. The soldiers covered it up to hide their failure — a dead captain and an unauthorized massacre meant courts-martial. The village was filed as \"evacuated successfully.\"";
}

export class OfficerKilled extends Clue {
  readonly id = "officer-killed";
  readonly text = "A KBW officer — kpt. Henryk Ćwiek — commanded the unit at [%OLD_VILLAGE%](../locations/old-village-ruins.md). He was shot dead during the operation. Official records list him as KIA in a separate UPA engagement. The truth was buried with him.";
}

export class SoldierWasKbw extends Clue {
  readonly id = "soldier-was-kbw";
  readonly text = "[Edward Barnaś](../characters/soldier.md) was a soldier — he served in the KBW (Korpus Bezpieczeństwa Wewnętrznego), the internal security troops.";
}

export class SoldierServedInAkcjaWisla extends Clue {
  readonly id = "soldier-served-in-akcja-wisla";
  readonly text = "[Edward Barnaś](../characters/soldier.md) served in Akcja Wisła, the 1947 operation that forcibly deported the Lemko population from these mountains to the west.";
}

export class SoldierParticipatedInMassacre extends Clue {
  readonly id = "soldier-participated-in-massacre";
  readonly text = "[Edward Barnaś](../characters/soldier.md) was one of the soldiers present during the 1947 massacre. He participated in the killings.";
}

export class ButcherParticipatedInMassacre extends Clue {
  readonly id = "butcher-participated-in-massacre";
  readonly text = "[Stanisław Rezeń](../characters/butcher.md) was one of the soldiers present during the 1947 massacre. He participated in the killings.";
}

export class SoldierTookBestLand extends Clue {
  readonly id = "soldier-took-best-land";
  readonly text = "[Edward Barnaś](../characters/soldier.md) settled in %NEW_VILLAGE% early because he knew the terrain from service. He claimed the best plot of land — profiting from the destruction.";
}

export class OldVillageWasBurned extends Clue {
  readonly id = "old-village-was-burned";
  readonly text = "[%OLD_VILLAGE%](../locations/old-village-ruins.md) was burned after the massacre. Wooden buildings destroyed, but stone survived — the cerkiew, foundations, the well.";
}

export class MassacreBodiesInWell extends Clue {
  readonly id = "massacre-bodies-in-well";
  readonly text = "The remains of the 1947 massacre victims are in [the well](../story-facts/the-well.md). They were never properly buried.";
}

export class DeadNeverMourned extends Clue {
  readonly id = "dead-never-mourned";
  readonly text = "The 1947 dead were never given proper rites — no panakhyda, no memorial, no mourning. Twenty years of spiritual debt.";
}

export class ParaskewiaNamedTheDead extends Clue {
  readonly id = "paraskewia-named-the-dead";
  readonly text = "[Paraskewia Chyłak](../characters/hag.md) has kept the names of the 1947 dead — twelve Lemko villagers plus [Dmytro Kosach](../characters/dmytro-kosach.md) — written in Cyrillic in her own hand, and speaks them in her rites. It is the only record they ever existed. See [Paraskewia's List of the Dead](../items/paraskewias-list.md).";
}

export class DamCoversEvidence extends Clue {
  readonly id = "dam-covers-evidence";
  readonly text = "The flood zone was chosen partly to bury the massacre evidence. [por. Witold Skowron](../characters/officer.md) knows this. The dam is infrastructure *and* a burial.";
  override readonly synthesis = [[OldVillageFlooding, OfficerWarning, MassacreWasCoveredUp]];
}

export class HagCausedTheMassacre extends Clue {
  readonly id = "hag-caused-the-massacre";
  readonly text = "[Paraskewia Chyłak](../characters/hag.md) was in love with Dmytro Kosach, a UPA soldier, in 1947. The authorities traced the connection back to the village. Dmytro killed the commanding officer. The massacre happened because of her love — twice over.";
}

// ---------------------------------------------------------------- The 1954 Lynch

export class BarnasFamilyDisappeared extends Clue {
  readonly id = "barnas-family-disappeared";
  readonly text = "[Edward Barnaś](../characters/soldier.md)'s entire family — him, his partner, and teenage [Hania Barnaś](../characters/jagna.md) — vanished from %NEW_VILLAGE% overnight in 1954. No goodbyes, no forwarding address. Nobody asked questions. Only [Edek Barnaś](../characters/glupek.md) remained.";
}

export class BarnasFamilyLeftEdekBehind extends Clue {
  readonly id = "barnas-family-left-edek-behind";
  readonly text = "When the Barnaś family vanished, they left [Edek Barnaś](../characters/glupek.md) behind. The small boy stayed in the village and was taken in by [Janina Gajda](../characters/ciotka.md) next door.";
}

export class EdeksFatherLeft extends Clue {
  readonly id = "edeks-father-left";
  readonly text = "[Janina Gajda](../characters/ciotka.md) lists herself as mother and [Edward Barnaś](../characters/soldier.md) as the father — left the village. Abandoned his family. The house stayed with her, the boy stayed with her. Consistent with what the rest of the village says.";
}

export class EdekBoxKeyFitsHouse extends Clue {
  readonly id = "edek-box-key-fits-house";
  readonly text = "The old key from the \"EDEK\" box turns the lock of [Janina Gajda](../characters/ciotka.md)'s front door. It was cut for this house.";
}

export class CiotkaChangedTheLock extends Clue {
  readonly id = "ciotka-changed-the-lock";
  readonly text = "The front door of [Janina Gajda](../characters/ciotka.md)'s house carries two locks fitted years apart — an older original and a newer one added later. At some point she changed the lock on the house.";
}

export class CiotkaNeverMarried extends Clue {
  readonly id = "ciotka-never-married";
  readonly text = "In the census the boy and his absent father are recorded as Barnaś, while [Janina Gajda](../characters/ciotka.md), who raises him, is Gajda. She never took his name — read straight, the two were together but never married.";
}

export class CiotkaAndSoldierWereNotTogether extends Clue {
  readonly id = "ciotka-and-soldier-were-not-together";
  readonly text = "[Janina Gajda](../characters/ciotka.md) and [Edward Barnaś](../characters/soldier.md) were never together. They were not a couple, and Edek is not her son. The village's \"they were together\" story is false.";
  override readonly synthesis = [[CiotkaNeverMarried, CiotkaIsDevout]];
}

export class BoxBelongsToGlupek extends Clue {
  readonly id = "box-belongs-to-glupek";
  readonly text = "The \"EDEK\" box could be [Edek Barnaś](../characters/glupek.md)'s — his name on the lid, a young man's kept oddments and the risqué photograph the kind a youth hides away.";
}

export class BoxBelongsToSoldier extends Clue {
  readonly id = "box-belongs-to-soldier";
  readonly text = "The \"EDEK\" box could be [Edward Barnaś](../characters/soldier.md)'s, the soldier who went by Edek too — a grown man's shaving kit, a military medal, and an old house key.";
}

export class HouseBelongedToEdwardSenior extends Clue {
  readonly id = "house-belonged-to-edward-senior";
  readonly text = "The house [Janina Gajda](../characters/ciotka.md) lives in was [Edward Barnaś](../characters/soldier.md)'s own. His key from the \"EDEK\" box turns the front lock, and his things sat boxed in the attic. Not a stranger's home the state handed her — it was his.";
  override readonly synthesis = [[BoxBelongsToSoldier, EdekBoxKeyFitsHouse]];
}

export class SoldierLeftHisHouseForState extends Clue {
  readonly id = "soldier-left-his-house-for-state";
  readonly text = "On the paperwork, [Edward Barnaś](../characters/soldier.md) signed his house and land over to the state when the family left the village.";
}

export class GlupekForbiddenFromAttic extends Clue {
  readonly id = "glupek-forbidden-from-attic";
  readonly text = "[Edek Barnaś](../characters/glupek.md)'s toys are kept up in the attic, and he is not allowed to go up for them himself. Janina climbs up and brings them down for him.";
}

export class RoofBuiltForADome extends Clue {
  readonly id = "roof-built-for-a-dome";
  readonly text = "The attic roof is put together from the wrong pieces — shingles and timber shaped and curved to cover a dome, reused flat on this house. To a builder's eye they were made for something round, not this roof.";
}

export class IconsInAtticNotCatholic extends Clue {
  readonly id = "icons-in-attic-not-catholic";
  readonly text = "Icons are stored up in the attic, and to a devout eye they are plainly Eastern-rite, not Roman Catholic. They do not belong in a Catholic home.";
}

export class BarnasHadADaughterHania extends Clue {
  readonly id = "barnas-had-a-daughter-hania";
  readonly text = "[Edward Barnaś](../characters/soldier.md) had a teenage daughter — [Hania Barnaś](../characters/jagna.md). She lived in the house. She's not in the census. She's not in the village. Nobody mentions her unless prompted.";
}

export class SomethingHappenedIn54 extends Clue {
  readonly id = "something-happened-in-54";
  readonly text = "Something violent happened one night in 1954. [Zbigniew Gajda](../characters/wojewoda.md) came home drunk and bloody. [Tadek Gajda](../characters/wujas.md) collapsed into the bottle and never came back. The [Barnaś family](../characters/soldier.md) was gone by morning.";
}

export class BarnasFamilyMurderedIn54 extends Clue {
  readonly id = "barnas-family-murdered-in-54";
  readonly text = "The [Barnaś family](../characters/soldier.md) was murdered in 1954 — [Edward Barnaś](../characters/soldier.md) and his household destroyed the night of the lynch, not a family that quietly moved away.";
}

export class MatronaLearnedOfAffair extends Clue {
  readonly id = "matrona-learned-of-affair";
  readonly text = "[Helena Rzepka](../characters/matrona.md) found out about the affair between [Hania Barnaś](../characters/jagna.md) and [Emil Rzepka](../characters/painter.md) on her own, and first tried to handle it quietly — she asked Hania, privately, to give Emil up.";
}

export class JagnaPainterAffair extends Clue {
  readonly id = "jagna-painter-affair";
  readonly text = "[Hania Barnaś](../characters/jagna.md) and [Emil Rzepka](../characters/painter.md) were lovers. Open secret in the village — everyone knew.";
}

export class PainterLovedJagna extends Clue {
  readonly id = "painter-loved-jagna";
  readonly text = "[Emil Rzepka](../characters/painter.md) was in love with [Hania Barnaś](../characters/jagna.md), and still carries it.";
  override readonly synthesis = [[PortraitIsJagnas, EmilDoesntPaintPeople, EmilSignedThePortrait]];
}

export class JagnaKnewTheSecret extends Clue {
  readonly id = "jagna-knew-the-secret";
  readonly text = "[Hania Barnaś](../characters/jagna.md) had discovered that the Gajda siblings were secretly Lemko — she learned it from [Emil Rzepka](../characters/painter.md). She never used it: no threat, no demand, no word to anyone. She simply knew. It was enough to get her killed — [Helena Rzepka](../characters/matrona.md) presumed the girl would someday use it and did not wait to find out.";
}

export class MatronaOrchestratedLynch extends Clue {
  readonly id = "matrona-orchestrated-lynch";
  readonly text = "[Helena Rzepka](../characters/matrona.md) orchestrated the drinking that led to the lynch. She stayed sober, aimed her brothers at [Hania Barnaś](../characters/jagna.md), and said \"get rid of the problem.\" She never touched anyone — every hand that night was male.";
}

export class WujasParticipatedInLynch extends Clue {
  readonly id = "wujas-participated-in-lynch";
  readonly text = "[Tadek Gajda](../characters/wujas.md) was one of the men who carried out the 1954 lynch. He attacked [Hania Barnaś](../characters/jagna.md) and helped beat her father [Edward Barnaś](../characters/soldier.md) to death.";
}

export class WojewodaParticipatedInLynch extends Clue {
  readonly id = "wojewoda-participated-in-lynch";
  readonly text = "[Zbigniew Gajda](../characters/wojewoda.md) was one of the men who carried out the 1954 lynch. He attacked [Hania Barnaś](../characters/jagna.md) and helped beat her father [Edward Barnaś](../characters/soldier.md) to death.";
}

export class ButcherParticipatedInLynch extends Clue {
  readonly id = "butcher-participated-in-lynch";
  readonly text = "[Stanisław Rezeń](../characters/butcher.md) was one of the men who carried out the 1954 lynch. He attacked [Hania Barnaś](../characters/jagna.md) and helped beat her father [Edward Barnaś](../characters/soldier.md) to death.";
}

export class JagnaWasAttacked extends Clue {
  readonly id = "jagna-was-attacked";
  readonly text = "[Hania Barnaś](../characters/jagna.md) was beaten by [Tadek Gajda](../characters/wujas.md) and [Stanisław Rezeń](../characters/butcher.md), who tore at her clothes. Her father reached her before it went further.";
}

export class JagnaFledTheLynch extends Clue {
  readonly id = "jagna-fled-the-lynch";
  readonly text = "[Hania Barnaś](../characters/jagna.md) broke free during the struggle at the well and ran from the village into the night. She was never seen again.";
}

export class NeighbourBelievesJagnaDead extends Clue {
  readonly id = "neighbour-believes-jagna-dead";
  readonly text = "[Ryszard Dudka](../characters/neighbour.md) is privately certain [Hania Barnaś](../characters/jagna.md) died the night she fled. Two winters later, hunting, he found human remains in the forest, decided they were hers, and buried them himself. He never confirmed it was her — a coat, some bones, no face. It could have been anyone. No one has ever proven what became of her.";
}

export class DudkaBuriedJagna extends Clue {
  readonly id = "dudka-buried-jagna";
  readonly text = "[Ryszard Dudka](../characters/neighbour.md) buried the ravine remains as [Hania Barnaś](../characters/jagna.md) — to him, the body under the cairn is her.";
}

export class JagnaDiedEscaping extends Clue {
  readonly id = "jagna-died-escaping";
  readonly text = "[Hania Barnaś](../characters/jagna.md) ran into the forest the night of the lynch and died there, falling to her death on the rocks; the remains [Ryszard Dudka](../characters/neighbour.md) buried at the ravine are hers. False lead. The buried woman is far older than Hania ever was, so it cannot be her, and nothing places Hania among the dead.";
  override readonly synthesis = [[JagnaFledTheLynch, RavineRemainsAWoman, RavineRemainsDiedFromFall]];
}

export class JagnaBorn1935 extends Clue {
  readonly id = "jagna-born-1935";
  readonly text = "[Hania Barnaś](../characters/jagna.md) was born in 1935.";
}

export class JagnaIsAlive extends Clue {
  readonly id = "jagna-is-alive";
  readonly text = "[Hania Barnaś](../characters/jagna.md) did not die in the forest. The body [Ryszard Dudka](../characters/neighbour.md) buried as hers is a woman far older than she ever was, so it cannot be her, and nothing else places her among the dead.";
  override readonly synthesis = [[DudkaBuriedJagna, JagnaBorn1935, RavineRemainsAround30, BarnasFamilyMurderedIn54, JagnaFledTheLynch]];
}

export class OperatorIsJagna extends Clue {
  readonly id = "operator-is-jagna";
  readonly text = "The calm voice at the town telephone exchange is [Hania Barnaś](../characters/jagna.md). She did not die in 1954; she took the operator's chair, and every long-distance call the village has ever placed has passed through her.";
}

export class JagnaDoesntKnowGlupekAlive extends Clue {
  readonly id = "jagna-doesnt-know-glupek-alive";
  readonly text = "[Hania Barnaś](../characters/jagna.md) believes her little brother [Edek Barnaś](../characters/glupek.md) died with the rest of the family in 1954. She does not know he survived and is alive in the village.";
}

export class TelegramPointsToBarnasYard extends Clue {
  readonly id = "telegram-points-to-barnas-yard";
  readonly text = "A telegram relayed through the exchange, addressed to the committee and signed Barnaś, says his service papers and uniform are buried under the old garden bed behind his house. [Edward Barnaś](../characters/soldier.md) has been dead since 1954.";
}

export class DudkaBuriedAFriendAtTheRavine extends Clue {
  readonly id = "dudka-buried-a-friend-at-the-ravine";
  readonly text = "[Ryszard Dudka](../characters/neighbour.md) tends a grave in the meadow above the ravine. He'll say only that it's an old friend who fell from the ravine, and that he buried her himself. He does not name her or explain further.";
}

export class RavineRemainsAWoman extends Clue {
  readonly id = "ravine-remains-a-woman";
  readonly text = "A medical examination of the remains [Ryszard Dudka](../characters/neighbour.md) buried reads the bones as female. Whoever this was, she was a grown woman.";
}

export class RavineRemainsDiedFromFall extends Clue {
  readonly id = "ravine-remains-died-from-fall";
  readonly text = "The fracture pattern in the remains points to a single heavy impact — a fall from a height onto hard ground. She was not beaten or stabbed; she fell.";
}

export class RavineRemainsAround30 extends Clue {
  readonly id = "ravine-remains-around-30";
  readonly text = "Bone density and joint wear put the woman in the remains at around thirty years old, give or take a couple of years. Not a teenager.";
}

export class SoldierKilledDefendingDaughter extends Clue {
  readonly id = "soldier-killed-defending-daughter";
  readonly text = "[Edward Barnaś](../characters/soldier.md) came to save [Hania Barnaś](../characters/jagna.md) — armed with his old KBW rifle. He held the men back but never fired: they were on him before he could, tackled him, wrenched the rifle away, and beat him to death with it.";
}

export class WojewodaWasHurtThatNight extends Clue {
  readonly id = "wojewoda-was-hurt-that-night";
  readonly text = "[Zbigniew Gajda](../characters/wojewoda.md) took a bad injury the night of the 1954 lynch — in the struggle over [Edward Barnaś](../characters/soldier.md)'s rifle, the stock was driven into his ribs and cracked them. They never healed right. He carries the old injury under his clothes and has never explained it.";
}

export class CiotkaHouseIsWojewodas extends Clue {
  readonly id = "ciotka-house-is-wojewodas";
  readonly text = "[Janina Gajda](../characters/ciotka.md) doesn't own the house she lives in and says so plainly — it's the sołtys's, [Zbigniew Gajda](../characters/wojewoda.md) gave it to her, it's his to allocate. She has no title of her own and names her brother as the source. (On paper the same house was signed over to the [PGR](../locations/pgr-farm.md) — see [departure-declaration-forged](#departure-declaration-forged). Her answer and the record don't agree.)";
}

export class CiotkaHouseIsPgrs extends Clue {
  readonly id = "ciotka-house-is-pgrs";
  readonly text = "[Zbigniew Gajda](../characters/wojewoda.md) says [Janina](../characters/ciotka.md)'s house isn't his to give — it was abandoned, left to the state, and the PGR administers it; he only allocated it to her. His account and Janina's (\"it's the sołtys's\") don't agree.";
}

export class DepartureDeclarationForged extends Clue {
  readonly id = "departure-declaration-forged";
  readonly text = "The document that recorded the Barnaś family's \"departure\" and handed their house and land to the [PGR](../locations/pgr-farm.md) is a forgery. It carries [Edward Barnaś](../characters/soldier.md)'s signature — but Edward was already dead when it was filed, weeks after the 1954 lynch. Someone forged his hand to make the family's disappearance read as a voluntary move west. The paper is what let the \"they moved away\" story stand.";
}

export class PgrEstablishedIn56 extends Clue {
  readonly id = "pgr-established-in-56";
  readonly text = "The PGR state farm in %NEW_VILLAGE% was not established until 1956, two years after the Barnaś family supposedly departed.";
}

export class DepartureDeclarationDated56 extends Clue {
  readonly id = "departure-declaration-dated-56";
  readonly text = "[Edward Barnaś](../characters/soldier.md)'s departure declaration surrendering the house and land to the PGR is dated 1956, two years after the family was recorded as having left the village.";
}

export class BarnasLetterDate55 extends Clue {
  readonly id = "barnas-letter-date-55";
  readonly text = "An unopened letter addressed to [Edward Barnaś](../characters/soldier.md), dated 1955, sat in the attic of his old house. He was recorded as having left the village in 1954.";
}

export class ButcherMentionedInTheLetter extends Clue {
  readonly id = "butcher-mentioned-in-the-letter";
  readonly text = "The unopened 1955 letter to [Edward Barnaś](../characters/soldier.md) passes greetings to [Stanisław Rezeń](../characters/butcher.md) from their old service comrade, placing the butcher in the same corps circle.";
}

export class SoldierNeverMarried extends Clue {
  readonly id = "soldier-never-married";
  readonly text = "[Edward Barnaś](../characters/soldier.md) and his partner never married — they lived together. She kept her own surname. This is why no \"Barnaś\" wife appears in any village records.";
}

export class BarnasDisliked extends Clue {
  readonly id = "barnas-disliked";
  readonly text = "[Edward Barnaś](../characters/soldier.md) was widely disliked in %NEW_VILLAGE%. People kept their distance and nobody had a good word for him.";
}

export class GlupekStrangled extends Clue {
  readonly id = "glupek-strangled";
  readonly text = "The night of the lynch, four-year-old [Edek Barnaś](../characters/glupek.md) wouldn't stop crying, and it annoyed [Stanisław Rezeń](../characters/butcher.md). He took a pillow, pressed it over the boy's face to shut him up, and held it there — deliberate, unhurried. [Janina Gajda](../characters/ciotka.md) tore it away. It left permanent brain damage — not congenital.";
}

export class LynchBodyInWell extends Clue {
  readonly id = "lynch-body-in-well";
  readonly text = "[Edward Barnaś](../characters/soldier.md) was killed in the 1954 lynch and his body dumped in the old well in [%OLD_VILLAGE%](../locations/old-village-ruins.md), the same well that already held the 1947 massacre remains. A second body from that night lies with his — a grown woman. [Hania Barnaś](../characters/jagna.md) fled the lynch and is not among the dead.";
}

export class ButcherHasSoldiersGun extends Clue {
  readonly id = "butcher-has-soldiers-gun";
  readonly text = "[Stanisław Rezeń](../characters/butcher.md) took the rifle off [Edward Barnaś](../characters/soldier.md)'s body that night and kept it — the KBW rifle from the night of the lynch. It's still in his house.";
}

export class ButcherExSoldier extends Clue {
  readonly id = "butcher-ex-soldier";
  readonly text = "The KBW knife, the KBW rifle, and the state propaganda leaflet in [Stanisław Rezeń](../characters/butcher.md)'s house make him look like an ex-soldier who served against the partisans. False lead. Rezeń never served — he stripped the kit off [Edward Barnaś](../characters/soldier.md)'s body the night of the 1954 lynch.";
}

export class ButcherDumpedTheBody extends Clue {
  readonly id = "butcher-dumped-the-body";
  readonly text = "It was [Stanisław Rezeń](../characters/butcher.md) who put [Edward Barnaś](../characters/soldier.md)'s body down the old well in [%OLD_VILLAGE%](../locations/old-village-ruins.md) the night of the 1954 lynch — he carried the dead man to the well and dropped him in among the 1947 remains.";
}

export class WujasLovedJagna extends Clue {
  readonly id = "wujas-loved-jagna";
  readonly text = "[Tadek Gajda](../characters/wujas.md) was in love with [Hania Barnaś](../characters/jagna.md), but she chose [Emil Rzepka](../characters/painter.md).";
}

export class PainterWasSpared extends Clue {
  readonly id = "painter-was-spared";
  readonly text = "[Emil Rzepka](../characters/painter.md) was beaten but spared because he was [Helena Rzepka](../characters/matrona.md)'s fiancé.";
}

export class PainterHeardMatrona extends Clue {
  readonly id = "painter-heard-matrona";
  readonly text = "[Emil Rzepka](../characters/painter.md) heard [Helena Rzepka](../characters/matrona.md)'s voice giving instructions during the lynch.";
}

export class CiotkaSavedGlupek extends Clue {
  readonly id = "ciotka-saved-glupek";
  readonly text = "[Janina Gajda](../characters/ciotka.md) physically intervened to save [Edek Barnaś](../characters/glupek.md)'s life that night. The family has never forgiven her.";
}

export class PriestSureEdekInnocent extends Clue {
  readonly id = "priest-sure-edek-innocent";
  readonly text = "[ks. Władysław Pająk](../characters/priest.md) is certain [Edek Barnaś](../characters/glupek.md) did not kill [Janina Gajda](../characters/ciotka.md). The boy helps around his church and he knows him to be gentle.";
}

export class NeighbourHeardTheLynch extends Clue {
  readonly id = "neighbour-heard-the-lynch";
  readonly text = "[Ryszard Dudka](../characters/neighbour.md) heard everything from next door — screaming, shouting, dogs. Possibly saw men dragging bodies toward [%OLD_VILLAGE%](../locations/old-village-ruins.md). Closed the curtain and never spoke.";
}

export class NeighbourIsRattled extends Clue {
  readonly id = "neighbour-is-rattled";
  readonly text = "[Ryszard Dudka](../characters/neighbour.md) drinks too fast and shuts down whenever the past comes up. Something about the old days frightens him.";
}

export class ButcherDoesntDrink extends Clue {
  readonly id = "butcher-doesnt-drink";
  readonly text = "[Stanisław Rezeń](../characters/butcher.md) doesn't drink. His house holds no alcohol at all.";
}

export class ButcherUsedToDrinkWithTheCrew extends Clue {
  readonly id = "butcher-used-to-drink-with-the-crew";
  readonly text = "[Stanisław Rezeń](../characters/butcher.md) used to drink with [the crew](../characters/secondary/drinking-crew.md) years back. He doesn't anymore.";
}

export class ButcherIsDangerous extends Clue {
  readonly id = "butcher-is-dangerous";
  readonly text = "Under pressure [Stanisław Rezeń](../characters/butcher.md) doesn't rage — he goes cold. Even breathing, flat eyes, a knife already turning in his hand, three dogs moving around him like his own limbs with no command spoken. He is a controlled, capable killer, and he has plainly stood ready to kill before.";
}

// ---------------------------------------------------------------- The Well

export class ButcherHeadsTowardForest extends Clue {
  readonly id = "butcher-heads-toward-forest";
  readonly text = "Stanisław Rezeń is often seen heading toward the forest, alone, always in the same direction. He's going somewhere specific.";
}

export class ButcherDumpsCarcassesInWell extends Clue {
  readonly id = "butcher-dumps-carcasses-in-well";
  readonly text = "[Stanisław Rezeń](../characters/butcher.md) drops animal carcasses and slaughter scraps down the well — the offcuts of his trade, fed to the well between the times he has nothing else to give it.";
}

export class HagTendsTheWell extends Clue {
  readonly id = "hag-tends-the-well";
  readonly text = "[Paraskewia Chyłak](../characters/hag.md) has spent 20 years performing Lemko rites at the well — fire, incense, bread, honey, prayer. She is containing it through acknowledgement.";
}

export class HagPerformsRite extends Clue {
  readonly id = "hag-performs-rite";
  readonly text = "[Paraskewia Chyłak](../characters/hag.md) performs a rite over the well: fire, incense, bread, honey, and the names of the dead sung one by one.";
}

export class ButcherVsHag extends Clue {
  readonly id = "butcher-vs-hag";
  readonly text = "Someone keeps clearing debris from the well. Someone else keeps piling it back and leaving candle wax in the cerkiew. [Stanisław Rezeń](../characters/butcher.md) and [Paraskewia Chyłak](../characters/hag.md) are fighting over the well without knowing each other.";
}

export class FreshBloodAtWell extends Clue {
  readonly id = "fresh-blood-at-well";
  readonly text = "Fresh blood on the well's stone rim. Recent — not old stains. Something was dragged to the well and put in.";
}

export class BloodStainsByTheWell extends Clue {
  readonly id = "blood-stains-by-the-well";
  readonly text = "Minor blood stains around the well rim.";
}

export class YouShouldJumpInside extends Clue {
  readonly id = "you-should-jump-inside";
  readonly text = "A certainty settles in that you should climb down into the dark. It does not feel like your own thought.";
}

export class CigaretteButtsByTheWell extends Clue {
  readonly id = "cigarette-butts-by-the-well";
  readonly text = "Cigarette butts collect in the grass and stone cracks around the well rim, more than a single visit would leave.";
}

export class CandlesByTheWell extends Clue {
  readonly id = "candles-by-the-well";
  readonly text = "Burnt-down candles and candle wax sit around the well, left by repeated visits.";
}

export class SomeoneTendsTheWellRegularly extends Clue {
  readonly id = "someone-tends-the-well-regularly";
  readonly text = "The candles at the well are replaced between visits. Someone tends the well on a regular basis.";
}

export class CiotkaBodyTaken extends Clue {
  readonly id = "ciotka-body-taken";
  readonly text = "[Janina Gajda](../characters/ciotka.md)'s body is gone. Taken from her coffin in [the church](../locations/the-church.md) during the night, while the flood kept her unburied. A wet drag trail leads out toward [%OLD_VILLAGE%](../locations/old-village-ruins.md). **Conditional:** Only exists if [Rezeń takes the body](../events/rezen-takes-the-body.md).";
}

export class RezenFedCiotkaToWell extends Clue {
  readonly id = "rezen-fed-ciotka-to-well";
  readonly text = "[Stanisław Rezeń](../characters/butcher.md) took [Janina Gajda](../characters/ciotka.md)'s body from the church and put it in [the well](../story-facts/the-well.md). He doesn't hide it — he frames it as practical: the flood left her unburied, the body was starting to turn, so he dealt with it. He does not understand, or say, that the well pulled him to do it. **Conditional:** Only exists if [Rezeń takes the body](../events/rezen-takes-the-body.md).";
}

export class BabciaMindReturns extends Clue {
  readonly id = "babcia-mind-returns";
  readonly text = "[Stefania Kopacz](../characters/babcia.md)'s dementia reverses as the well strengthens. Nobody notices because nobody was watching.";
}

export class SingingInTheNight extends Clue {
  readonly id = "singing-in-the-night";
  readonly text = "Lemko prayers for the dead are sung out in the forest at night, carried on the wind.";
}

export class CiotkaIsDevout extends Clue {
  readonly id = "ciotka-is-devout";
  readonly text = "[Janina Gajda](../characters/ciotka.md) is deeply, genuinely religious. Her rosary is worn to the string and she prays reflexively, alone, unperformed. She carries her faith like penance.";
}

export class CiotkaIsDead extends Clue {
  readonly id = "ciotka-is-dead";
  readonly text = "[Janina Gajda](../characters/ciotka.md) is dead. Her body lies on her kitchen floor.";
  override readonly synthesis = [[CiotkaIsDevout, CiotkaMissedMass]];
}

export class CiotkaMissedMass extends Clue {
  readonly id = "ciotka-missed-mass";
  readonly text = "[Janina Gajda](../characters/ciotka.md) was absent from the anti-flood mass. She is devout and never misses a service; her empty place is unheard of.";
}

export class CiotkaWasKilled extends Clue {
  readonly id = "ciotka-was-killed";
  readonly text = "[Janina Gajda](../characters/ciotka.md) was murdered. Someone laid hands on her, wrecked the room in a struggle, and left her dead on the floor.";
}

export class CiotkaCommittedSuicide extends Clue {
  readonly id = "ciotka-committed-suicide";
  readonly text = "[Janina Gajda](../characters/ciotka.md) took her own life. Alone and cornered, she swallowed a fatal dose of her own sedative.";
}

export class CiotkaOverdosed extends Clue {
  readonly id = "ciotka-overdosed";
  readonly text = "[Janina Gajda](../characters/ciotka.md) died of an overdose of her own prescribed sedative, Luminal. What killed her was the pills, not the mark on her wrist.";
}

export class CiotkaHurtBeforeDeath extends Clue {
  readonly id = "ciotka-hurt-before-death";
  readonly text = "[Janina Gajda](../characters/ciotka.md) was gripped hard by a large, strong hand shortly before she died. A fresh bruise rings her wrist, made while she was still alive. The grip did not kill her, but someone laid hands on her in her last hours.";
}

export class CommitteeDisturbedTheDead extends Clue {
  readonly id = "committee-disturbed-the-dead";
  readonly text = "The committee stripped [Janina Gajda](../characters/ciotka.md)'s body and handled her crudely over [ks. Władysław Pająk](../characters/priest.md)'s objection.";
}

export class CiotkaHouseWrecked extends Clue {
  readonly id = "ciotka-house-wrecked";
  readonly text = "One corner of [Janina Gajda](../characters/ciotka.md)'s otherwise obsessively ordered house is smashed: furniture toppled, a shelf torn down, crockery broken across the floor, and a mirror shattered in the corridor. It reads like a violent struggle.";
}

export class TwoCoffeeCups extends Clue {
  readonly id = "two-coffee-cups";
  readonly text = "Two used coffee cups sit on [Janina Gajda](../characters/ciotka.md)'s table. Someone drank coffee with her shortly before she died.";
}

export class CiotkaHadAVisitor extends Clue {
  readonly id = "ciotka-had-a-visitor";
  readonly text = "The second coffee cup was not [Edek Barnaś](../characters/glupek.md)'s; he will not drink coffee. An adult from outside sat and drank with [Janina Gajda](../characters/ciotka.md) shortly before she died.";
  override readonly synthesis = [[TwoCoffeeCups, GlupekWontDrinkCoffee]];
}

export class GlupekWontDrinkCoffee extends Clue {
  readonly id = "glupek-wont-drink-coffee";
  readonly text = "[Edek Barnaś](../characters/glupek.md) will not drink coffee. The bitterness baffles him; offered a cup, he flinches and leaves it. In that house, coffee is Janina's alone.";
}

export class GlupekFledIntoForest extends Clue {
  readonly id = "glupek-fled-into-forest";
  readonly text = "Large bare footprints lead from [Janina Gajda](../characters/ciotka.md)'s house toward the treeline and vanish where the canopy begins. [Edek Barnaś](../characters/glupek.md) fled into the forest the night she died.";
}

export class EdekRanToUpaBunker extends Clue {
  readonly id = "edek-ran-to-upa-bunker";
  readonly text = "[Edek Barnaś](../characters/glupek.md) is holed up in the [UPA bunker](../locations/upa-bunker.md) in the forest, the hiding place he knows, since he fled the night [Janina Gajda](../characters/ciotka.md) died.";
  override readonly synthesis = [[EdekKeptUpaEquipment, UpaBunkersInTheArea]];
}

export class EdeksBayonetIsGerman extends Clue {
  readonly id = "edeks-bayonet-is-german";
  readonly text = "The bayonet hidden among [Edek Barnaś](../characters/glupek.md)'s things is a German wartime army blade, not Polish issue. It cannot have come from his father [Edward Barnaś](../characters/soldier.md)'s KBW kit.";
}

export class TridentOnTheBayonet extends Clue {
  readonly id = "trident-on-the-bayonet";
  readonly text = "A trident is carved by hand into the flat of the [bayonet](../items/bayonet.md)'s blade, three prongs rising from a base.";
}

export class UpaUsedGermanEquipment extends Clue {
  readonly id = "upa-used-german-equipment";
  readonly text = "The UPA armed itself largely with captured weapons, much of it German wartime equipment left from the occupation.";
}

export class TridentStandsForUpa extends Clue {
  readonly id = "trident-stands-for-upa";
  readonly text = "The trident, the tryzub, is the Ukrainian national emblem and the mark of the UPA.";
}

export class EdekKeptUpaEquipment extends Clue {
  readonly id = "edek-kept-upa-equipment";
  readonly text = "The [bayonet](../items/bayonet.md) [Edek Barnaś](../characters/glupek.md) hid among his things is UPA kit. He kept a piece of partisan equipment.";
  override readonly synthesis = [[EdeksBayonetIsGerman, UpaUsedGermanEquipment], [TridentOnTheBayonet, TridentStandsForUpa]];
}

export class JuniorPressedCiotka extends Clue {
  readonly id = "junior-pressed-ciotka";
  readonly text = "[Marek \"Junior\" Gajda](../characters/junior.md) visited [Janina Gajda](../characters/ciotka.md) the day before she died and pressed her hard about his mother [Irena](../characters/wife.md)'s secret investigation into the family. He wanted her to tell the truth, not to silence her.";
}

export class CiotkaToldEdekTheTruth extends Clue {
  readonly id = "ciotka-told-edek-the-truth";
  readonly text = "Before she died, [Janina Gajda](../characters/ciotka.md) told [Edek Barnaś](../characters/glupek.md) the truth: the people of this village killed his father [Edward Barnaś](../characters/soldier.md), and Edek is the living proof. The reveal broke him.";
}

export class ButtsAtCiotkasAreCarmen extends Clue {
  readonly id = "butts-at-ciotkas-are-carmen";
  readonly text = "The cigarette butts from [Janina Gajda](../characters/ciotka.md)'s door are Carmen, a premium brand rarely seen this far out.";
}

export class JuniorSmokesCarmen extends Clue {
  readonly id = "junior-smokes-carmen";
  readonly text = "[Marek Gajda](../characters/junior.md) smokes Carmen, a premium brand.";
}

export class ButcherSmokesCarmen extends Clue {
  readonly id = "butcher-smokes-carmen";
  readonly text = "[Stanisław Rezeń](../characters/butcher.md) smokes Carmen, a premium brand.";
}

export class EdekHasCarmenCigarette extends Clue {
  readonly id = "edek-has-carmen-cigarette";
  readonly text = "An unsmoked Carmen cigarette is hidden in [Edek Barnaś](../characters/glupek.md)'s corner. Edek does not smoke.";
}

export class RezenGaveEdekCigarette extends Clue {
  readonly id = "rezen-gave-edek-cigarette";
  readonly text = "[Stanisław Rezeń](../characters/butcher.md) gave [Edek Barnaś](../characters/glupek.md) the Carmen cigarette. Rezeń is fond of the boy and slips him food and small gifts.";
}

export class TadekSmokesCheapest extends Clue {
  readonly id = "tadek-smokes-cheapest";
  readonly text = "[Tadek Gajda](../characters/wujas.md) smokes Sport, the cheapest brand. He does not smoke Carmen.";
}

export class DoorAndWellButtsMatch extends Clue {
  readonly id = "door-and-well-butts-match";
  readonly text = "The Carmen butts from [Janina Gajda](../characters/ciotka.md)'s door and the Carmen butts from [the well](../locations/old-village-ruins.md) are the same brand.";
}

export class PriestSmokes extends Clue {
  readonly id = "priest-smokes";
  readonly text = "[ks. Władysław Pająk](../characters/priest.md) secretly smokes. He hides the habit.";
}

export class PriestSmokesCarmen extends Clue {
  readonly id = "priest-smokes-carmen";
  readonly text = "[ks. Władysław Pająk](../characters/priest.md) secretly smokes Carmen, the same premium brand as Junior and Rezeń. He hides the habit.";
}

export class JuniorLingeredAtCiotkasHouse extends Clue {
  readonly id = "junior-lingered-at-ciotkas-house";
  readonly text = "The Carmen butts at [Janina Gajda](../characters/ciotka.md)'s door match [Marek Gajda](../characters/junior.md)'s brand. He was at her house shortly before she died.";
  override readonly synthesis = [[JuniorSmokesCarmen, ButtsAtCiotkasAreCarmen]];
}

export class RezenLingeredAtCiotkasHouse extends Clue {
  readonly id = "rezen-lingered-at-ciotkas-house";
  readonly text = "The Carmen butts at [Janina Gajda](../characters/ciotka.md)'s door match [Stanisław Rezeń](../characters/butcher.md)'s brand. He was at her house shortly before she died.";
  override readonly synthesis = [[ButcherSmokesCarmen, ButtsAtCiotkasAreCarmen]];
}

export class PriestLingeredAtCiotkasHouse extends Clue {
  readonly id = "priest-lingered-at-ciotkas-house";
  readonly text = "The Carmen butts at [Janina Gajda](../characters/ciotka.md)'s door match [ks. Władysław Pająk](../characters/priest.md)'s brand. He was at her house shortly before she died.";
  override readonly synthesis = [[PriestSmokesCarmen, ButtsAtCiotkasAreCarmen]];
}

export class GlupekSmokes extends Clue {
  readonly id = "glupek-smokes";
  readonly text = "A Carmen cigarette hides in [Edek Barnaś](../characters/glupek.md)'s corner and Carmen butts litter the door: it looks like Edek is the smoker. False lead. The butts were [Marek Gajda](../characters/junior.md)'s and the cigarette was a gift; Edek does not smoke.";
  override readonly synthesis = [[EdekHasCarmenCigarette, ButtsAtCiotkasAreCarmen]];
}

export class CoveredMirrors extends Clue {
  readonly id = "covered-mirrors";
  readonly text = "[Stefania Kopacz](../characters/babcia.md) covers every mirror in [Barbara Kopacz](../characters/barbara.md)'s house. In [Lemko tradition](../historical%20context/13-lemko-beliefs-and-folk-magic.md), mirrors are covered when someone dies. She's been doing it for twenty years.";
}

// ---------------------------------------------------------------- Village Life & Relationships

export class BarbaraHasHelp extends Clue {
  readonly id = "barbara-has-help";
  readonly text = "Someone is helping [Barbara Kopacz](../characters/barbara.md). The house, the firewood, the economics — a single farm labourer with a child and an elderly mother can't sustain this alone.";
}

export class BarbaraRefusesFather extends Clue {
  readonly id = "barbara-refuses-father";
  readonly text = "[Barbara Kopacz](../characters/barbara.md) will not name [Pawełek Kopacz](../characters/pawelek.md)'s father under any circumstances. No pressure, authority, or charm moves this. The refusal itself is the clue — she's protecting someone or something.";
}

export class MarekIsPaweleksFather extends Clue {
  readonly id = "marek-is-paweleks-father";
  readonly text = "[Barbara Kopacz](../characters/barbara.md) names [Marek Gajda](../characters/junior.md) as [Pawełek Kopacz](../characters/pawelek.md)'s father under pressure. She believes it's true. It's not — the real father is [Tadek Gajda](../characters/wujas.md).";
}

export class WujasSleptWithBarbara extends Clue {
  readonly id = "wujas-slept-with-barbara";
  readonly text = "[Tadek Gajda](../characters/wujas.md) slept with [Barbara Kopacz](../characters/barbara.md) once. Neither of them talks about it. Barbara was also with [Marek Gajda](../characters/junior.md) and assumes Marek is the father. Tadek doesn't even consider the possibility. It was one night.";
}

export class WujasIsPaweleksFather extends Clue {
  readonly id = "wujas-is-paweleks-father";
  readonly text = "[Tadek Gajda](../characters/wujas.md) is [Pawełek Kopacz](../characters/pawelek.md)'s father.";
}

export class PawelekWandersToOldVillage extends Clue {
  readonly id = "pawelek-wanders-to-old-village";
  readonly text = "[Pawełek Kopacz](../characters/pawelek.md) roams unsupervised as far as [%OLD_VILLAGE%](../locations/old-village-ruins.md) — edges, creek, tree line, further than a 4-year-old should go. Nobody watches him closely enough.";
}

export class WojewodaBuiltBarbarasHouse extends Clue {
  readonly id = "wojewoda-built-barbaras-house";
  readonly text = "[Zbigniew Gajda](../characters/wojewoda.md) built [Barbara Kopacz](../characters/barbara.md) a house out of guilt — he suspects [Marek Gajda](../characters/junior.md) fathered [Pawełek Kopacz](../characters/pawelek.md). He's wrong.";
}

export class WojewodaIsAPartyMember extends Clue {
  readonly id = "wojewoda-is-a-party-member";
  readonly text = "[Zbigniew Gajda](../characters/wojewoda.md) is a PZPR (Party) member. It is how a founding sołtys was handed the PGR directorship and runs the farm with near-total autonomy.";
}

export class BarbaraIsASieve extends Clue {
  readonly id = "barbara-is-a-sieve";
  readonly text = "[Barbara Kopacz](../characters/barbara.md) shares what she hears from the committee casually with [Ryszard Dudka](../characters/neighbour.md) over the fence. Everything the players tell her reaches the one man sitting on 13 years of guilt.";
}

export class WifeHasBeenInvestigating extends Clue {
  readonly id = "wife-has-been-investigating";
  readonly text = "[Irena Gajda](../characters/wife.md) has spent years quietly investigating the events of 1954. She and [Marek Gajda](../characters/junior.md) work together in secret — a parallel investigation running alongside the committee's.";
}

export class FlourTinEvidence extends Clue {
  readonly id = "flour-tin-evidence";
  readonly text = "[Irena Gajda](../characters/wife.md) keeps her evidence in a flour tin in the pantry — a stained shirt, a mismatched button, newspaper clippings, handwritten notes. Looks like a cover-up dossier. Could be building a case *against* [Zbigniew Gajda](../characters/wojewoda.md) or *for* him — players can't tell.";
}

export class JuniorDrinksWithCrew extends Clue {
  readonly id = "junior-drinks-with-crew";
  readonly text = "[Marek Gajda](../characters/junior.md) drinks with [Tadek Gajda](../characters/wujas.md)'s crew away from his father — a rebellious kid blowing off the sołtys, not a man on cover-up business.";
}

export class WujasIsGuilty extends Clue {
  readonly id = "wujas-is-guilty";
  readonly text = "Tadek Gajda is guilty of something terrible. He's been drinking to forget for 13 years and the guilt is visibly destroying him.";
}

export class MatronaControlsPainter extends Clue {
  readonly id = "matrona-controls-painter";
  readonly text = "[Helena Rzepka](../characters/matrona.md) keeps [Emil Rzepka](../characters/painter.md) broken, dependent, and terrified. He knows the truth. She's made sure he'll never speak it.";
}

export class PainterWantsToConfess extends Clue {
  readonly id = "painter-wants-to-confess";
  readonly text = "[Emil Rzepka](../characters/painter.md) secretly wants [Hania Barnaś](../characters/jagna.md) included in the census so she is not erased by the flood.";
}

export class CiotkaLivesInSoldiersHouse extends Clue {
  readonly id = "ciotka-lives-in-soldiers-house";
  readonly text = "[Janina Gajda](../characters/ciotka.md) lives in [Edward Barnaś](../characters/soldier.md)'s former house — the best plot in the village — raising his brain-damaged son. A single woman in a dead man's house with no clean explanation.";
}

export class GirlsDressInCiotkasHouse extends Clue {
  readonly id = "girls-dress-in-ciotkas-house";
  readonly text = "A blue dress is kept, folded, in [Janina Gajda](../characters/ciotka.md)'s house.";
}

export class DressBelongedToTeenageGirl extends Clue {
  readonly id = "dress-belonged-to-teenage-girl";
  readonly text = "The blue dress was cut for a teenage girl, not a grown woman and not a child.";
}

export class DressDistressedPainter extends Clue {
  readonly id = "dress-distressed-painter";
  readonly text = "Shown the blue dress, [Emil Rzepka](../characters/painter.md) reacts with visible distress.";
}

export class DressBelongedToBarnasDaughter extends Clue {
  readonly id = "dress-belonged-to-barnas-daughter";
  readonly text = "The blue dress kept in [Janina Gajda](../characters/ciotka.md)'s house belonged to the Barnaś daughter.";
  override readonly synthesis = [[BarnasHadADaughterHania, DressBelongedToTeenageGirl]];
}

export class ChildsRattleInCiotkasHouse extends Clue {
  readonly id = "childs-rattle-in-ciotkas-house";
  readonly text = "A small child's rattle is kept in [Janina Gajda](../characters/ciotka.md)'s house. A baby lived here once.";
}

export class LemkoBellInCiotkasHouse extends Clue {
  readonly id = "lemko-bell-in-ciotkas-house";
  readonly text = "A small brass Greek Catholic liturgical bell with Cyrillic lettering is hidden in [Janina Gajda](../characters/ciotka.md)'s house. An Eastern-rite object, out of place in a Roman Catholic home.";
}

export class CiotkaMovedInAfterTheyWereGone extends Clue {
  readonly id = "ciotka-moved-in-after-they-were-gone";
  readonly text = "[Janina Gajda](../characters/ciotka.md) wasn't always in that house. A family lived there before — the Barnaś family. They left, and Janina moved in with the boy.";
}

export class CiotkaAdoptedGlupek extends Clue {
  readonly id = "ciotka-adopted-glupek";
  readonly text = "[Janina Gajda](../characters/ciotka.md) took in [Edek Barnaś](../characters/glupek.md) after the family vanished. Nobody asked her to. Nobody stopped her.";
}

export class CiotkaAvoidsFamily extends Clue {
  readonly id = "ciotka-avoids-family";
  readonly text = "[Janina Gajda](../characters/ciotka.md) keeps her distance from the family. She begs off gatherings and stays anxious around her siblings — the avoidance is hers, not theirs.";
}

export class GlupekFearsButcher extends Clue {
  readonly id = "glupek-fears-butcher";
  readonly text = "[Edek Barnaś](../characters/glupek.md) flinches instinctively from [Stanisław Rezeń](../characters/butcher.md). No conscious memory — just a body that knows. When [Stanisław Rezeń](../characters/butcher.md)'s dogs bark, [Edek Barnaś](../characters/glupek.md) hides.";
}

export class WojewodaHasOnlyPhone extends Clue {
  readonly id = "wojewoda-has-only-phone";
  readonly text = "[Zbigniew Gajda](../characters/wojewoda.md) has the only telephone in the village, in his office. The village's sole link to the outside world.";
}

export class WojewodaHasGun extends Clue {
  readonly id = "wojewoda-has-gun";
  readonly text = "[Zbigniew Gajda](../characters/wojewoda.md) has a pistol in his office. Locked. Symbol of authority — but loaded.";
}

export class NeighbourHasRifle extends Clue {
  readonly id = "neighbour-has-rifle";
  readonly text = "[Ryszard Dudka](../characters/neighbour.md) is a hunter with a licensed hunting rifle.";
}

export class NeighbourIsOldSettler extends Clue {
  readonly id = "neighbour-is-old-settler";
  readonly text = "[Ryszard Dudka](../characters/neighbour.md) has farmed the plot next to the Barnaś/Janina house since ~1948 — an early settler, there through the 1954 lynch.";
}

export class SiblingsFundTheChurch extends Clue {
  readonly id = "siblings-fund-the-church";
  readonly text = "The siblings keep the [church](../locations/the-church.md) unusually well supplied — firewood, food, gifts. [ks. Władysław Pająk](../characters/priest.md)'s silence is materially supported.";
}

export class EmilDoesntPaintPeople extends Clue {
  readonly id = "emil-doesnt-paint-people";
  readonly text = "[Emil Rzepka](../characters/painter.md) paints only landscapes. He never paints people.";
}

export class PainterFascinatedByOldVillage extends Clue {
  readonly id = "painter-fascinated-by-old-village";
  readonly text = "Across [Emil Rzepka](../characters/painter.md)'s canvases the old village returns again and again: its well, its cerkiew, its ruined houses, painted with a fascination and care nothing else in his work gets. The place plainly holds something for him.";
}

export class PaintersStyleShiftedToDark extends Clue {
  readonly id = "painters-style-shifted-to-dark";
  readonly text = "[Emil Rzepka](../characters/painter.md)'s canvases fall into two clearly different hands. The earlier work is Fauvist: figures and village scenes in bold, unnatural, joyful colour, alive and full of light. Everything after a break point is Art Informel: abstract fields of black encrusted paint, matter scraped and clotted like drowned ground, death and decay with no figure left in it. For a self-taught man in this village, both are startlingly modern. Something broke him between the two.";
  override readonly synthesis = [[StreambedPaintingIsFauvist, StreambedPaintingIsOld, PaintedBuildingIsInformel, UnfinishedPaintingIsInformel]];
}

export class EmilTraumatisedIn54 extends Clue {
  readonly id = "emil-traumatised-in-54";
  readonly text = "Confronted with how his work turned dark, [Emil Rzepka](../characters/painter.md) admits that something happened to him in 1954 that he never recovered from.";
}

export class PortraitPaintedBeforeTheBreak extends Clue {
  readonly id = "portrait-painted-before-the-break";
  readonly text = "The hidden cerkiew portrait is painted in [Emil Rzepka](../characters/painter.md)'s earlier Fauvist style, from before his work collapsed into abstraction, death, and decay.";
  override readonly synthesis = [[PortraitIsFauvist, EmilSignedThePortrait, PaintersStyleShiftedToDark]];
}

export class PortraitHiddenInCerkiew extends Clue {
  readonly id = "portrait-hidden-in-cerkiew";
  readonly text = "A portrait of a young dark-haired woman is hidden in the ruined cerkiew at [%OLD_VILLAGE%](../locations/old-village-cerkiew.md), wrapped and sheltered from the rain.";
}

export class PortraitWomanInBlueDress extends Clue {
  readonly id = "portrait-woman-in-blue-dress";
  readonly text = "The woman in [Emil Rzepka](../characters/painter.md)'s hidden portrait wears a blue dress.";
}

export class PortraitIsFauvist extends Clue {
  readonly id = "portrait-is-fauvist";
  readonly text = "The hidden cerkiew portrait is painted in a Fauvist style: bold, unnatural, expressive colour, alive and full of light.";
}

export class PortraitDedicatedToForgetMeNot extends Clue {
  readonly id = "portrait-dedicated-to-forget-me-not";
  readonly text = "On the back of the hidden portrait is a dedication, to \"my forget-me-not.\" It was painted as a private love token, not a commission.";
}

export class BlueDressMatchesPortrait extends Clue {
  readonly id = "blue-dress-matches-portrait";
  readonly text = "The blue dress kept in [Janina Gajda](../characters/ciotka.md)'s house is the same one the woman wears in [Emil Rzepka](../characters/painter.md)'s hidden portrait.";
  override readonly synthesis = [[PortraitWomanInBlueDress, GirlsDressInCiotkasHouse]];
}

export class EmilSignedThePortrait extends Clue {
  readonly id = "emil-signed-the-portrait";
  readonly text = "The hidden portrait carries [Emil Rzepka](../characters/painter.md)'s signature. He painted it himself.";
}

export class PortraitIsJagnas extends Clue {
  readonly id = "portrait-is-jagnas";
  readonly text = "The woman in the hidden portrait is [Hania Barnaś](../characters/jagna.md).";
  override readonly synthesis = [[DressBelongedToBarnasDaughter, BlueDressMatchesPortrait]];
}

export class NeighbourAvoidsCiotkasWindow extends Clue {
  readonly id = "neighbour-avoids-ciotkas-window";
  readonly text = "Ryszard Dudka's window facing Ciotka's house is always covered with a heavy curtain — never opened. The window facing Barbara's house has no curtain at all.";
}

export class NeighbourHasInsomnia extends Clue {
  readonly id = "neighbour-has-insomnia";
  readonly text = "Ryszard Dudka paces at night and keeps his light on at 3am. He doesn't sleep well.";
}

export class NeighbourKnowsAboutEdek extends Clue {
  readonly id = "neighbour-knows-about-edek";
  readonly text = "Ryszard Dudka knows something about where Edek came from. He deflects when the topic comes up — too quickly, too rehearsed.";
}

export class ChurchTooNice extends Clue {
  readonly id = "church-too-nice";
  readonly text = "The church is too well-maintained for a village this size — fresh repairs, good supplies, ample firewood. Someone is funding it beyond what the parish can afford.";
}

export class WujasMissesSomeone extends Clue {
  readonly id = "wujas-misses-someone";
  readonly text = "When drunk enough, Tadek Gajda's fragments turn to longing. Half-sentences about a woman, a name he won't finish, someone he lost long ago. He misses her badly.";
}

export class IrenaIsWatchful extends Clue {
  readonly id = "irena-is-watchful";
  readonly text = "Irena Gajda hosts with grace but something is tight behind the hospitality. She listens at doors during conversations with the sołtys — a shadow, a floorboard creak — and tracks the committee more closely than she lets on. She's aware of more than she shows.";
}

export class WifeProtectsHusband extends Clue {
  readonly id = "wife-protects-husband";
  readonly text = "[Irena Gajda](../characters/wife.md) has realized [Zbigniew Gajda](../characters/wojewoda.md) took part in the 1954 killing. Rather than expose him, she has closed ranks with him. She has stopped investigating, shut the household, and will keep Zbigniew from confessing — even when he wants to.";
}

// ---------------------------------------------------------------- The Flood & The Committee

export class NewVillageWillFlood extends Clue {
  readonly id = "new-village-will-flood";
  readonly text = "%NEW_VILLAGE% will flood. When the reservoir rises, the valley has no outlet below house level. The ridge water-gap, the PGR irrigation ditch, and the old far-ridge streambed all fail to carry the water off, so it backs up onto the houses. This is proof, not speculation.";
}

export class NewVillageWillNotFlood extends Clue {
  readonly id = "new-village-will-not-flood";
  readonly text = "%NEW_VILLAGE% is safe. The PGR irrigation ditch carries the flood clear of the valley, so the water drains away and never reaches the houses. One working outlet is all the valley needs, and here is one. This is the reassuring answer, and it is false: it rests entirely on the ditch's concrete head, which calculates as ample only because no one measured the earth dugout that runs the rest of its length. The gap and the streambed are never even tested. It contradicts new-village-will-flood.";
}

export class GapIsCandidateDrain extends Clue {
  readonly id = "gap-is-candidate-drain";
  readonly text = "The ridge water-gap, the notch the map shows draining into the empty %BIG-BASIN%, is one of the candidate outlets floodwater could leave the %NEW_VILLAGE% valley through.";
}

export class DitchIsCandidateDrain extends Clue {
  readonly id = "ditch-is-candidate-drain";
  readonly text = "The PGR irrigation ditch is one of the candidate outlets floodwater could leave the %NEW_VILLAGE% valley through.";
}

export class StreambedIsCandidateDrain extends Clue {
  readonly id = "streambed-is-candidate-drain";
  readonly text = "The old far-ridge streambed is one of the candidate outlets floodwater could leave the %NEW_VILLAGE% valley through.";
}

export class TheFloodLinePotentiallyMiscalculated extends Clue {
  readonly id = "the-flood-line-potentially-miscalculated";
  readonly text = "prof. Bieńkowski suspects the official flood line for the %NEW_VILLAGE% valley may be miscalculated. The projected safe level rests on two assumptions: that the ground stands where the map records it, and that the valley drains through its outlets as the survey assumes. If the mapped heights are wrong, or the outlets do not carry the water off, the safe level is wrong and the new village may not sit above it after all. Both assumptions have to be checked on the ground.";
}

export class GapIsBlocked extends Clue {
  readonly id = "gap-is-blocked";
  readonly text = "A ridge separates the %NEW_VILLAGE% valley from the empty %BIG-BASIN% beyond it. The state map shows a water-gap through that ridge as an open drain into %BIG-BASIN%, the outlet the whole safety calculation rests on. An old landslide has plugged it: the crest of the plug stands above the flood line, and the fill is impermeable, so rising water can neither crest the plug nor seep through it into %BIG-BASIN%. It is one of the three outlets the valley needs, and it is sealed.";
}

export class DitchDrainsNothing extends Clue {
  readonly id = "ditch-drains-nothing";
  readonly text = "The PGR irrigation ditch cannot carry the floodwater off. At flood volume it backs up and overflows; it is far too small to drain the valley.";
}

export class DitchDrainsFine extends Clue {
  readonly id = "ditch-drains-fine";
  readonly text = "Run against the drainage tables, the irrigation ditch's concrete head is a channel of ample capacity: on those figures it carries the flood clear of the fields. This is the report's all-clear, and it is false. The sum measures only the short concrete stretch, not the earth dugout that makes up most of the ditch. Only someone who has walked the full length has cause to doubt it.";
}

export class ConcreteDitchMeasurements extends Clue {
  readonly id = "concrete-ditch-measurements";
  readonly text = "The cross-section of the irrigation ditch's concrete head: the width, depth, and fall of the lined channel near the fields. Raw figures taken with a tape, no skill needed. On their own they settle nothing; a surveyor feeds them to the drainage tables.";
}

export class DugoutMeasurements extends Clue {
  readonly id = "dugout-measurements";
  readonly text = "The cross-section of the irrigation ditch where the concrete gives out: the width and depth of the shallow, unlined earth dugout that runs most of its length. Raw figures taken with a tape, no skill needed. Paired with the concrete-head figures they let a surveyor size the real channel.";
}

export class DitchNotBuiltToSpec extends Clue {
  readonly id = "ditch-not-built-to-spec";
  readonly text = "The irrigation ditch matches its concrete-lined specification only for its first short stretch near the fields. Past that it degrades to a shallow, unlined dugout for most of its length. Inspecting only the head gives a false impression of a sound channel.";
}

export class DitchConcreteStopsShort extends Clue {
  readonly id = "ditch-concrete-stops-short";
  readonly text = "The irrigation ditch is concrete-lined only near the head. A short way down the concrete ends and the channel becomes a plain earth dugout. Whether that is a fault, a shortfall against spec, or simply how it was meant to be built is not clear from walking it.";
}

export class StreambedDeadEnds extends Clue {
  readonly id = "streambed-dead-ends";
  readonly text = "The old streambed on the far ridge is not an outlet. Its col sits above house level, so the rising water tops %NEW_VILLAGE% before it ever reaches that streambed.";
}

export class StreambedParameters extends Clue {
  readonly id = "streambed-parameters";
  readonly text = "The two elevations that settle the streambed: the height of the far-ridge col and the height of %NEW_VILLAGE%. The raw figures, before anyone reads what they mean.";
}

export class DamBuildersSurveyedStreambed extends Clue {
  readonly id = "dam-builders-surveyed-streambed";
  readonly text = "The Solina dam-survey crews already worked the far-ridge streambed years ago and set geodetic benchmarks (reper) at the col and by the village. The markers are out there in the field, though their recorded elevations never made it into the kit's papers.";
}

export class StreambedNeverDrained extends Clue {
  readonly id = "streambed-never-drained";
  readonly text = "The old far-ridge streambed has never carried water off, even in the worst floods within living memory. Water pools against the rock there and stops.";
}

export class LandslideInTheGap extends Clue {
  readonly id = "landslide-in-the-gap";
  readonly text = "A landslide sits in the ridge water-gap, filling the notch with fallen rock and earth.";
}

export class GapMaySeep extends Clue {
  readonly id = "gap-may-seep";
  readonly text = "From the foot of the plug the landslide fill looks like loose, open rubble, the kind of stone floodwater would run straight through. On that first look the gap might still drain by seeping through the fill. Whether it truly does is unsettled until the fill is examined up close.";
}

export class WaterMayFlowOver extends Clue {
  readonly id = "water-may-flow-over";
  readonly text = "For the ridge gap to drain the valley, rising water would have to reach the plug's lowest saddle and spill over it into %BIG-BASIN%. If that saddle sits below the %NEW_VILLAGE% flood line, the gap still drains by overtopping. Whether it is low enough is unsettled until the crest is measured.";
}

export class GapFillExamined extends Clue {
  readonly id = "gap-fill-examined";
  readonly text = "Examined up close at the toe of the plug, the landslide fill is dense clay and shattered rock packed tight, not the loose rubble it looks like from a distance. Water will not seep through it. This settles only whether the plug leaks, not whether it can be overtopped.";
}

export class GapSillAboveFlood extends Clue {
  readonly id = "gap-sill-above-flood";
  readonly text = "Measured from the crest, the plug's lowest saddle, the sill any rising water would have to top to spill through into %BIG-BASIN%, stands above the %NEW_VILLAGE% flood line. Water cannot overtop the plug. This settles only the height, not whether the fill leaks.";
}

export class RiverDoesntMatchMap extends Clue {
  readonly id = "river-doesnt-match-map";
  readonly text = "The river no longer runs where the map draws it. Its course has shifted: the wojewoda's bridge spans the river's new bed, while the map shows that ground dry and the river running elsewhere. The old course drawn on the map is now dry.";
}

export class BridgeOverSolidLand extends Clue {
  readonly id = "bridge-over-solid-land";
  readonly text = "On the state map, a bridge is drawn spanning dry ground while the river is drawn running elsewhere. The map contradicts itself.";
}

export class MapShowsGapOpen extends Clue {
  readonly id = "map-shows-gap-open";
  readonly text = "The state map draws the ridge water-gap as an open channel, an outlet for the valley's water.";
}

export class MapIsOutdated extends Clue {
  readonly id = "map-is-outdated";
  readonly text = "The state map predates the landslide that plugged the gap. It cannot be trusted on the gap or on the river's course.";
}

export class VillageTerrainMatchesMap extends Clue {
  readonly id = "village-terrain-matches-map";
  readonly text = "The surveyed elevations of the %NEW_VILLAGE% valley match the state map's contours. The ground reads true against the paper, so the map is an accurate record of the terrain everywhere the players check it. The only places it disagrees with reality are the plugged gap and the shifted river.";
}

export class SurveyWasBotched extends Clue {
  readonly id = "survey-was-botched";
  readonly text = "The crew sent to re-check the terrain never properly did the work. They drove a few stakes, drank through the visit, took the wojewoda's ditch on faith, dismissed the changed river, and filed thin paper. Not a deliberate forgery, just a half-assed, negligent job, but it means the official survey behind the flood projection cannot be trusted.";
}

export class SurveyWasFaked extends Clue {
  readonly id = "survey-was-faked";
  readonly text = "The thin survey was not merely lazy work but deliberately falsified: someone knew the ground was never properly checked and signed it off as sound anyway. The official all-clear was manufactured, not just botched.";
}

export class GeologistsWereDrinking extends Clue {
  readonly id = "geologists-were-drinking";
  readonly text = "The last state survey crew sent to re-check the terrain drank through their whole visit, at Tadek's still and by the road, driving only a few stakes before they left. Testimony from men who watched them, not proof on its own that the survey is worthless.";
}

export class OriginalReportIsThin extends Clue {
  readonly id = "original-report-is-thin";
  readonly text = "The previous crew's filed survey report is thin: too few field stations, cursory coverage, the ditch taken on faith from its concrete head, the changed river dismissed. On the paper alone it does not add up to a real survey, though thin work is not yet proof the whole job was botched.";
}

export class SurveyorsAreKnownDrunks extends Clue {
  readonly id = "surveyors-are-known-drunks";
  readonly text = "The PGR crew rib survey men as famous drunks, and the last survey team who came drank through their whole visit instead of working the ground.";
}

export class FloodMarkLeftByDamBuilders extends Clue {
  readonly id = "flood-mark-left-by-dam-builders";
  readonly text = "The flood line staked across the %NEW_VILLAGE% valley was set by the Solina dam-survey crews, not the resettlement survey. It marks the reservoir's projected fill level, tied to the dam builders' own benchmarks, and stands at 420.0 m above sea level.";
}

export class LowerVillageLevel extends Clue {
  readonly id = "lower-village-level";
  readonly text = "The surveyed elevation of the lower part of %NEW_VILLAGE%: 420.8 m above sea level.";
}

export class UpperVillageLevel extends Clue {
  readonly id = "upper-village-level";
  readonly text = "The surveyed elevation of the upper part of %NEW_VILLAGE%: 422.0 m above sea level.";
}

export class SouthernRiseLevel extends Clue {
  readonly id = "southern-rise-level";
  readonly text = "The surveyed elevation of the rise south of %NEW_VILLAGE%: 423.0 m above sea level.";
}

export class OldVillageBowlLevel extends Clue {
  readonly id = "old-village-bowl-level";
  readonly text = "The surveyed elevation of the floor of the old-village bowl: 408.0 m above sea level.";
}

export class BigBasinFloorLevel extends Clue {
  readonly id = "big-basin-floor-level";
  readonly text = "The surveyed elevation of the floor of %BIG-BASIN%: 405.0 m above sea level.";
}

export class GapFootLevel extends Clue {
  readonly id = "gap-foot-level";
  readonly text = "The surveyed elevation of the ground at the foot of the ridge plug, just below the gap climb: 418.0 m above sea level. It is the low approach where the valley's water would gather to leave through the gap, below house level but sealed off by the plug rising above it.";
}

export class WojewodaAlreadySuspectsFlooding extends Clue {
  readonly id = "wojewoda-already-suspects-flooding";
  readonly text = "[Zbigniew Gajda](../characters/wojewoda.md) already suspects the flood is coming before the committee arrives. He sees it as an opportunity — water swallows the evidence.";
}

export class RoadWashesOut extends Clue {
  readonly id = "road-washes-out";
  readonly text = "Day 2 brings a major flood. The road out disappears. The committee is stranded. No outside backup.";
}

export class OldVillageFlooding extends Clue {
  readonly id = "old-village-flooding";
  readonly text = "The old village site is flooding — water rising from below, the well filling. Something underground is changing.";
}

export class FloodIsImminent extends Clue {
  readonly id = "flood-is-imminent";
  readonly text = "The flood is not a future worry but an immediate one. The water is rising fast and %NEW_VILLAGE% will be inundated within days.";
}

export class OfficerWarning extends Clue {
  readonly id = "officer-warning";
  readonly text = "[por. Witold Skowron](../characters/officer.md) warns on the drive in: not everything needs to be written down.";
}

export class PhoneIsLifeline extends Clue {
  readonly id = "phone-is-lifeline";
  readonly text = "The players can call [Professor](../characters/professor.md) by phone. If they tell him about the massacre, the truth exists outside the village.";
}

export class GovernmentCommittee extends Clue {
  readonly id = "government-committee";
  readonly text = "The player characters are a state committee sent to %NEW_VILLAGE% ahead of the reservoir, tasked with a census, a property assessment for flood damage, and a geographical survey of the valley. It is the frame the whole visit hangs on: the reason outsiders can measure land, enter homes, and ask questions at all.";
}

export class CommitteeRunsGeographicalSurvey extends Clue {
  readonly id = "committee-runs-geographical-survey";
  readonly text = "The committee's stated purpose in the village is a geographical survey — terrain, river, boundaries. It's the cover that explains why outsiders are measuring the land.";
}

export class CommitteeNotesPropertyForDamage extends Clue {
  readonly id = "committee-notes-property-for-damage";
  readonly text = "The committee is recording each household's property and its value, ostensibly to assess damages. Asking what land is worth is part of the official remit.";
}

export class CommitteeHidesTheFlood extends Clue {
  readonly id = "committee-hides-the-flood";
  readonly text = "What the committee is really here to hide is the flood. Its true job is to run the survey and file a clean report so the resettlement proceeds; the danger that %NEW_VILLAGE% will flood is exactly what the state means it to keep out of the paper.";
}

export class CommitteeFillsCensus extends Clue {
  readonly id = "committee-fills-census";
  readonly text = "The committee is taking a census: who lives in each household, names, ages, how long they have been here. Counting heads is part of the official remit.";
}

export class CommitteeAccountsMovableStateProperty extends Clue {
  readonly id = "committee-accounts-movable-state-property";
  readonly text = "The committee's remit also covers the state farm's movable property. The [PGR](../locations/pgr-farm.md)'s livestock, machinery, and grain stores are socialist property that cannot be left to drown, so they must be inventoried and moved out before the flood. The buildings and fixed works are written off, but every movable state asset has to be accounted for.";
}

// ---------------------------------------------------------------- The Ritual

export class HagHasTheForm extends Clue {
  readonly id = "hag-has-the-form";
  readonly text = "[Paraskewia Chyłak](../characters/hag.md)'s cabin contains icons, candles, herbs, prayer materials — the ritual's form. If alive, she can teach it directly.";
}

export class BabciaHasTheWords extends Clue {
  readonly id = "babcia-has-the-words";
  readonly text = "[Stefania Kopacz](../characters/babcia.md) can provide the panakhyda — the Lemko memorial prayers for the dead.";
}

export class PlayersSupplyTruth extends Clue {
  readonly id = "players-supply-truth";
  readonly text = "The players must supply the truth by naming the dead and saying what happened to them. The ritual is not a spell — it is acknowledgement.";
}

// ---------------------------------------------------------------- Grace & The Priest

export class PriestFearsDivineJudgment extends Clue {
  readonly id = "priest-fears-divine-judgment";
  readonly text = "[ks. Władysław Pająk](../characters/priest.md) believes the flood is literal divine judgment — God drowning a valley that carries an old, unconfessed sin. He fears every soul still in that sin will drown damned.";
}

// ---------------------------------------------------------------- The Wolves

export class WolvesAttackingLivestock extends Clue {
  readonly id = "wolves-attacking-livestock";
  readonly text = "Wolves have been killing [PGR](../locations/pgr-farm.md) livestock for weeks. The 1967 rains are driving them from higher ground. Multiple sheep dead. The attacks started before the committee arrived and are ongoing.";
}

export class DudkaFailedWolfHunt extends Clue {
  readonly id = "dudka-failed-wolf-hunt";
  readonly text = "[Ryszard Dudka](../characters/neighbour.md) has been hunting the wolves for weeks — he's the village hunter, licensed rifle, knows the forest. He's failed. Can't close on the pack. One man in vast terrain isn't enough.";
}

export class RezenHuntsWolves extends Clue {
  readonly id = "rezen-hunts-wolves";
  readonly text = "[Zbigniew Gajda](../characters/wojewoda.md) authorized [Stanisław Rezeń](../characters/butcher.md) to deal with the wolves — sending the request through [Tadek Gajda](../characters/wujas.md). This brought [Rezeń](../characters/butcher.md) out of 13 years of isolation and into the village.";
}

export class DudkaDespisesRezen extends Clue {
  readonly id = "dudka-despises-rezen";
  readonly text = "[Ryszard Dudka](../characters/neighbour.md) openly hates [Stanisław Rezeń](../characters/butcher.md). Calls him evil to anyone who listens. The anger is visceral — not just about the wolf authorization. Something older.";
}

export class RezenMocksAnOldFailure extends Clue {
  readonly id = "rezen-mocks-an-old-failure";
  readonly text = "Taunting [Ryszard Dudka](../characters/neighbour.md), [Stanisław Rezeń](../characters/butcher.md) lets slip *\"you didn't stop me then\"* — implying there was a past occasion when Rezeń did something and Dudka failed to stop him. He never says what or when. Both men clearly remember it.";
}

export class PgrUnderfundedFences extends Clue {
  readonly id = "pgr-underfunded-fences";
  readonly text = "The PGR's fences and livestock infrastructure are underfunded and poorly maintained. Wolves got through because management cut corners.";
}

export class RezenLeavesAtNight extends Clue {
  readonly id = "rezen-leaves-at-night";
  readonly text = "[Stanisław Rezeń](../characters/butcher.md) leaves his house at night and walks toward the forest — toward [%OLD_VILLAGE%](../locations/old-village-ruins.md). Alone. Regularly.";
}

export class HagBlamedForWolves extends Clue {
  readonly id = "hag-blamed-for-wolves";
  readonly text = "Villagers blame [Paraskewia Chyłak](../characters/hag.md) for the wolf attacks. They've seen her fires and heard her chanting at [%OLD_VILLAGE%](../locations/old-village-ruins.md). She's performing rites for the dead — appeasing the unquiet — but the village sees witchcraft. Fires in the ruins + wolves that don't touch her = *\"She's summoning them.\"* The connection is the village's projection, not fact.";
}

// ---------------------------------------------------------------- Red Herrings & Side Mysteries

export class MazurPaidButAbsent extends Clue {
  readonly id = "mazur-paid-but-absent";
  readonly text = "The PGR worker registry pays a full daily wage to Tadeusz Mazur, a labourer no one on the farm answers to or has seen in about two years.";
}

export class LargeGrainPurchase extends Clue {
  readonly id = "large-grain-purchase";
  readonly text = "The PGR expense journal logs a grain-silo repair in May 1965 and, a week later, the largest single grain purchase in the book. The silo's contents were written off as lost.";
}

export class GrainHasBeenDumped extends Clue {
  readonly id = "grain-has-been-dumped";
  readonly text = "A whole silo's worth of grain was dumped rather than used or sold, tipped out and left to rot instead of going to feed or market.";
}

export class MazurDiedInTheSilo extends Clue {
  readonly id = "mazur-died-in-the-silo";
  readonly text = "Tadeusz Mazur died around 1965 in the farm's concrete grain silo. Tending it meant going up on top of the stored grain, and he fell in alone, sank to the bottom, and was engulfed. Nobody saw it and nothing showed at the surface; his body lay in the grain for about two weeks before the smell gave him away. [Wanda Mazur](../characters/widow.md) believes it was an ordinary farm accident, properly handled.";
}

export class WandaReceivesPension extends Clue {
  readonly id = "wanda-receives-pension";
  readonly text = "[Wanda Mazur](../characters/widow.md) believes she draws a state widow's pension for her late husband, and is grateful to the state for it.";
}

export class MazurBuriedInCemetery extends Clue {
  readonly id = "mazur-buried-in-cemetery";
  readonly text = "Tadeusz Mazur lies in a fresh, well-tended grave in the %NEW_VILLAGE% cemetery, the one [Wanda Mazur](../characters/widow.md) kneels beside.";
}

export class MazurAndWidowAreOldSettlers extends Clue {
  readonly id = "mazur-and-widow-are-old-settlers";
  readonly text = "Tadeusz and [Wanda Mazur](../characters/widow.md) were among the first Polish settlers in %NEW_VILLAGE%, arriving around 1948. They were in the village the whole time, through 1954 and after.";
}

export class MazurDoubtedTheDeparture extends Clue {
  readonly id = "mazur-doubted-the-departure";
  readonly text = "[Tadeusz Mazur](../characters/widow.md), an original settler who was there at the time, never believed the [Barnaś family](../characters/soldier.md) simply moved away. He wrote that they vanished in a single night, leaving standing crops and livestock behind, and was certain the departure was not something they chose.";
}

export class MazurWroteDetailedDiary extends Clue {
  readonly id = "mazur-wrote-detailed-diary";
  readonly text = "[Tadeusz Mazur](../characters/widow.md) kept a careful, detailed diary across all his years in the valley — a settler's running record of the village, its people, and its changes.";
}

export class MazurDeathCoveredUp extends Clue {
  readonly id = "mazur-death-covered-up";
  readonly text = "Tadeusz Mazur died on the PGR farm and the death was never reported to the state. His wage still flows to [Wanda Mazur](../characters/widow.md), disguised as a \"widow's pension\" she believes is a real state payment. The books prove the death was buried; they do not name who buried it.";
  override readonly synthesis = [[MazurDiedInTheSilo, MazurPaidButAbsent]];
}

export class ForemanSentMazurInHisPlace extends Clue {
  readonly id = "foreman-sent-mazur-in-his-place";
  readonly text = "[Michał Pytlak](../characters/foreman.md) knew the silo was dangerous and always tended it himself to keep others off it. Tied up with other work, he handed the job to Tadeusz Mazur, his most reliable man. Mazur went up alone and fell in. When Mazur vanished, Michał suspected the silo but could not justify dumping a full state store on a guess, and the sołtys refused him permission to empty it. The body only surfaced two weeks later.";
}

export class ForemanStoodUpToTheSoltys extends Clue {
  readonly id = "foreman-stood-up-to-the-soltys";
  readonly text = "[Michał Pytlak](../characters/foreman.md)'s workers respect him for standing up to the boss. They remember him fighting [Zbigniew Gajda](../characters/wojewoda.md) over the grain.";
}

export class DrinkingCrewHeadsToForest extends Clue {
  readonly id = "drinking-crew-heads-to-forest";
  readonly text = "Tadek Gajda and his crew regularly head into the treeline with bottles. They're going somewhere in the forest.";
}

export class OldWartimePositions extends Clue {
  readonly id = "old-wartime-positions";
  readonly text = "Traces of old wartime positions in the forest — collapsed dugouts, rusted metal. Someone was here during the war.";
}

export class BimberStill extends Clue {
  readonly id = "bimber-still";
  readonly text = "[Tadek Gajda](../characters/wujas.md)'s crew runs an illegal bimber still in the [forest](../locations/old-village-ruins.md), halfway between the villages. Just moonshine — not the murder conspiracy. [Zbigniew Gajda](../characters/wojewoda.md) knows and tolerates it. [Helena Rzepka](../characters/matrona.md) supplies sugar through the store.";
}

export class StillIsTheirLivelihood extends Clue {
  readonly id = "still-is-their-livelihood";
  readonly text = "The crew guards the still because it is what carries them through the winter, not because it hides anything worse. Their fear is losing it, nothing more.";
}

export class StoreHasDrugCabinet extends Clue {
  readonly id = "store-has-drug-cabinet";
  readonly text = "[Helena Rzepka](../characters/matrona.md)'s [store](../locations/the-store.md) has a locked pharmaceutical cabinet — a *szafka apteczna*, standard PRL distribution point. Helena holds the only key. [Halina](../characters/secondary/halina-zajac.md) can't open it.";
}

export class SomebodyBrokeIntoStore extends Clue {
  readonly id = "somebody-broke-into-store";
  readonly text = "Someone got into the pharmaceutical cabinet in [Helena Rzepka](../characters/matrona.md)'s [store](../locations/the-store.md) and robbed it.";
}

export class SomebodyStolePenicillin extends Clue {
  readonly id = "somebody-stole-penicillin";
  readonly text = "The penicillin is gone from the cabinet in [Helena Rzepka](../characters/matrona.md)'s [store](../locations/the-store.md).";
}

export class SomebodyStoleMoney extends Clue {
  readonly id = "somebody-stole-money";
  readonly text = "Money is gone from the till in [Helena Rzepka](../characters/matrona.md)'s [store](../locations/the-store.md).";
}

export class CommitteeStolePenicillin extends Clue {
  readonly id = "committee-stole-penicillin";
  readonly text = "[Helena Rzepka](../characters/matrona.md) is convinced the committee stole the penicillin from her store.";
}

export class PawelekBurnsWithFever extends Clue {
  readonly id = "pawelek-burns-with-fever";
  readonly text = "Pawełek is gripped by a sudden high fever, burning hot and shaking with chills.";
}

export class PawelekTurnsYellow extends Clue {
  readonly id = "pawelek-turns-yellow";
  readonly text = "Pawełek's skin and the whites of his eyes have turned yellow.";
}

export class PawelekEyesAreRed extends Clue {
  readonly id = "pawelek-eyes-are-red";
  readonly text = "The whites of Pawełek's eyes have gone bloodshot and crimson.";
}

export class PawelekInMusclePain extends Clue {
  readonly id = "pawelek-in-muscle-pain";
  readonly text = "Pawełek cries out when he is moved or touched; his legs and back are in severe pain.";
}

export class PawelekPassesDarkUrine extends Clue {
  readonly id = "pawelek-passes-dark-urine";
  readonly text = "Pawełek passes little urine, and what there is runs dark, the colour of strong tea.";
}

export class PawelekEyesNotCrying extends Clue {
  readonly id = "pawelek-eyes-not-crying";
  readonly text = "The redness sits in the whites of Pawełek's eyes, not in the lids. It is a sign of the sickness itself, not crying or dust.";
}

export class PawelekOrgansFailing extends Clue {
  readonly id = "pawelek-organs-failing";
  readonly text = "The yellowing of Pawełek's skin is a sign that his organs are failing.";
}

export class PawelekNotCommonSickness extends Clue {
  readonly id = "pawelek-not-common-sickness";
  readonly text = "Pawełek's illness is not dysentery and not ordinary flu. The fever, muscle pain, red eyes and yellowing together point to something waterborne and specific.";
}

export class PawelekGotItFromWater extends Clue {
  readonly id = "pawelek-got-it-from-water";
  readonly text = "Pawełek's sickness came from drinking foul water. It does not pass from person to person. Which water is not clear.";
}

export class PawelekDrankWaterWhilePlaying extends Clue {
  readonly id = "pawelek-drank-water-while-playing";
  readonly text = "Pawełek drank water while he was out playing on his own, away from the house.";
}

export class PawelekAteMushroomsInTheForest extends Clue {
  readonly id = "pawelek-ate-mushrooms-in-the-forest";
  readonly text = "Pawełek ate mushrooms while he was out playing on his own in the forest.";
}

export class PawelekMushroomsWereHarmless extends Clue {
  readonly id = "pawelek-mushrooms-were-harmless";
  readonly text = "The mushrooms Pawełek ate in the forest were ordinary edible ones. Staszek Pytlak ate the same ones and stayed well.";
}

export class PawelekPlayedInPgr extends Clue {
  readonly id = "pawelek-played-in-pgr";
  readonly text = "Pawełek was out playing on his own in the [PGR](../locations/pgr-farm.md).";
}

export class PawelekLooksLikeCommonFever extends Clue {
  readonly id = "pawelek-looks-like-common-fever";
  readonly text = "Early on, Pawełek's fever and muscle pain read as an ordinary fever, the kind that goes through a village after a flood. It would be expected to pass on its own.";
}

export class PawelekFeverNotPassing extends Clue {
  readonly id = "pawelek-fever-not-passing";
  readonly text = "Pawełek's fever has run too long to be an ordinary one. It should have broken by now and has not.";
}

export class PawelekHasWaterFever extends Clue {
  readonly id = "pawelek-has-water-fever";
  readonly text = "The water fever (leptospirosis): a bacterial sickness caught from foul water. Penicillin cures it if it is given in time.";
}

export class PawelekHasHepatitis extends Clue {
  readonly id = "pawelek-has-hepatitis";
  readonly text = "Infectious hepatitis: a viral sickness of the liver. No antibiotic touches it; the only treatment is rest, and it kills a small child as often as not.";
}

export class PawelekNeedsPenicillin extends Clue {
  readonly id = "pawelek-needs-penicillin";
  readonly text = "Pawełek needs penicillin, given now at a child's dose, or the water fever kills him.";
}

export class HelenaDemandsTheCensus extends Clue {
  readonly id = "helena-demands-the-census";
  readonly text = "Helena Rzepka will hand over the penicillin only if the committee lets her fill the village census herself.";
}

export class PawelekWasPoisoned extends Clue {
  readonly id = "pawelek-was-poisoned";
  readonly text = "Pawełek was poisoned. The fever, the muscle pain and the yellow skin could all be the marks of a poison rather than an illness.";
}

export class PawelekAteDeathCap extends Clue {
  readonly id = "pawelek-ate-death-cap";
  readonly text = "Pawełek's yellowing and failing could be death cap poisoning: a child who ate the wrong mushroom in the woods sickens and yellows just like this.";
}

export class PawelekPhosphorusPoison extends Clue {
  readonly id = "pawelek-phosphorus-poison";
  readonly text = "Pawełek's signs could be phosphorus poisoning, the yellow rat poison. It would mean someone poisoned him.";
}

export class PawelekWasPossessed extends Clue {
  readonly id = "pawelek-was-possessed";
  readonly text = "Pawełek was possessed. His fever dreams of \"the lady\" and \"the round stones,\" and a child sickening while no one else does, look to some like the work of the well rather than a natural illness.";
}

export class HagWarnedPawelek extends Clue {
  readonly id = "hag-warned-pawelek";
  readonly text = "Paraskewia Chyłak met Pawełek at the well in person and told him to his face not to drink the water. The \"lady\" in his fever dreams is her.";
}

export class HagPoisonedPawelek extends Clue {
  readonly id = "hag-poisoned-pawelek";
  readonly text = "The witch in the forest poisoned Pawełek. A child who met the \"lady\" at the well and sickened soon after looks, to some, like her doing.";
}

export class PawelekNeedsACleansingRitual extends Clue {
  readonly id = "pawelek-needs-a-cleansing-ritual";
  readonly text = "Pawełek needs a cleansing ritual. To those who read his sickness as the well's work, only the old rites can drive it out of him.";
}

export class PaweleksDiagnosis extends Clue {
  readonly id = "paweleks-diagnosis";
  readonly text = "Bacterial dysentery — *Shigella*, most likely. Fever cycling, bloody stool, dehydration. Fatal without treatment in a child this size. Needs antibacterial medication — but which one and what dosage requires a doctor.";
}

export class PaweleksContamination extends Clue {
  readonly id = "paweleks-contamination";
  readonly text = "The contamination profile is wrong. Concentrated single-source, not diffuse floodwater. High phosphate, high ammonia, anaerobic decay. Something large and organic decomposing in a confined water source for years. Not one body. Many.";
}

export class WellWaterContaminated extends Clue {
  readonly id = "well-water-contaminated";
  readonly text = "The well in [%OLD_VILLAGE%](../locations/old-village-ruins.md) is the source of contamination. The water is bad — whoever drinks it gets sick.";
}

export class UpaBunkersInTheArea extends Clue {
  readonly id = "upa-bunkers-in-the-area";
  readonly text = "UPA partisans left dugout bunkers (ziemianki) hidden through these forests in the 1940s. More than one is scattered across the hills around the valley.";
}

export class SpiritsAreRestless extends Clue {
  readonly id = "spirits-are-restless";
  readonly text = "The dead here were not buried right. Something is unquiet. Not evidence, not testimony — a feeling grounded in Lemko tradition. The mirrors need covering, the prayers need saying, the dead need tending.";
}
