// Clues as classes: player-discoverable facts. A clue may be synthesized:
// holding every clue in one of its routes derives it anywhere.
// Pilot subset of clues/clues.md, text verbatim.

import { Clue } from "./schema.ts";

export class BabciaHasTheWords extends Clue {
  readonly id = "babcia-has-the-words";
  readonly text = "[Stefania Kopacz](../characters/babcia.md) can provide the panakhyda — the Lemko memorial prayers for the dead.";
}

export class BabciaIsLemko extends Clue {
  readonly id = "babcia-is-lemko";
  readonly text = "[Stefania Kopacz](../characters/babcia.md), [Barbara Kopacz](../characters/barbara.md)'s mother, is a Lemko woman who kept the old Greek Catholic faith and death customs.";
}

export class BarbaraHasHelp extends Clue {
  readonly id = "barbara-has-help";
  readonly text = "Someone is helping [Barbara Kopacz](../characters/barbara.md). The house, the firewood, the economics — a single farm labourer with a child and an elderly mother can't sustain this alone.";
}

export class CommitteeRunsGeographicalSurvey extends Clue {
  readonly id = "committee-runs-geographical-survey";
  readonly text = "The committee's stated purpose in the village is a geographical survey — terrain, river, boundaries. It's the cover that explains why outsiders are measuring the land.";
}

export class CoveredMirrors extends Clue {
  readonly id = "covered-mirrors";
  readonly text = "[Stefania Kopacz](../characters/babcia.md) covers every mirror in [Barbara Kopacz](../characters/barbara.md)'s house. In [Lemko tradition](../historical%20context/13-lemko-beliefs-and-folk-magic.md), mirrors are covered when someone dies. She's been doing it for twenty years.";
}

export class DrinkingCrewHeadsToForest extends Clue {
  readonly id = "drinking-crew-heads-to-forest";
  readonly text = "Tadek Gajda and his crew regularly head into the treeline with bottles. They're going somewhere in the forest.";
}

export class LandslideInTheGap extends Clue {
  readonly id = "landslide-in-the-gap";
  readonly text = "A landslide sits in the ridge water-gap, filling the notch with fallen rock and earth.";
}

export class PawelekAteDeathCap extends Clue {
  readonly id = "pawelek-ate-death-cap";
  readonly text = "Pawełek's yellowing and failing could be death cap poisoning: a child who ate the wrong mushroom in the woods sickens and yellows just like this.";
}

export class PawelekBurnsWithFever extends Clue {
  readonly id = "pawelek-burns-with-fever";
  readonly text = "Pawełek is gripped by a sudden high fever, burning hot and shaking with chills.";
}

export class PawelekEyesAreRed extends Clue {
  readonly id = "pawelek-eyes-are-red";
  readonly text = "The whites of Pawełek's eyes have gone bloodshot and crimson.";
}

export class PawelekEyesNotCrying extends Clue {
  readonly id = "pawelek-eyes-not-crying";
  readonly text = "The redness sits in the whites of Pawełek's eyes, not in the lids. It is a sign of the sickness itself, not crying or dust.";
}

export class PawelekFeverNotPassing extends Clue {
  readonly id = "pawelek-fever-not-passing";
  readonly text = "Pawełek's fever has run too long to be an ordinary one. It should have broken by now and has not.";
}

export class PawelekGotItFromWater extends Clue {
  readonly id = "pawelek-got-it-from-water";
  readonly text = "Pawełek's sickness came from drinking foul water. It does not pass from person to person. Which water is not clear.";
}

export class PawelekInMusclePain extends Clue {
  readonly id = "pawelek-in-muscle-pain";
  readonly text = "Pawełek cries out when he is moved or touched; his legs and back are in severe pain.";
}

export class PawelekLooksLikeCommonFever extends Clue {
  readonly id = "pawelek-looks-like-common-fever";
  readonly text = "Early on, Pawełek's fever and muscle pain read as an ordinary fever, the kind that goes through a village after a flood. It would be expected to pass on its own.";
}

export class PawelekNeedsACleansingRitual extends Clue {
  readonly id = "pawelek-needs-a-cleansing-ritual";
  readonly text = "Pawełek needs a cleansing ritual. To those who read his sickness as the well's work, only the old rites can drive it out of him.";
}

export class PawelekNeedsPenicillin extends Clue {
  readonly id = "pawelek-needs-penicillin";
  readonly text = "Pawełek needs penicillin, given now at a child's dose, or the water fever kills him.";
}

export class PawelekNotCommonSickness extends Clue {
  readonly id = "pawelek-not-common-sickness";
  readonly text = "Pawełek's illness is not dysentery and not ordinary flu. The fever, muscle pain, red eyes and yellowing together point to something waterborne and specific.";
}

export class PawelekOrgansFailing extends Clue {
  readonly id = "pawelek-organs-failing";
  readonly text = "The yellowing of Pawełek's skin is a sign that his organs are failing.";
}

export class PawelekPassesDarkUrine extends Clue {
  readonly id = "pawelek-passes-dark-urine";
  readonly text = "Pawełek passes little urine, and what there is runs dark, the colour of strong tea.";
}

export class PawelekPhosphorusPoison extends Clue {
  readonly id = "pawelek-phosphorus-poison";
  readonly text = "Pawełek's signs could be phosphorus poisoning, the yellow rat poison. It would mean someone poisoned him.";
}

export class PawelekTurnsYellow extends Clue {
  readonly id = "pawelek-turns-yellow";
  readonly text = "Pawełek's skin and the whites of his eyes have turned yellow.";
}

export class PawelekWandersToOldVillage extends Clue {
  readonly id = "pawelek-wanders-to-old-village";
  readonly text = "[Pawełek Kopacz](../characters/pawelek.md) roams unsupervised as far as [%OLD_VILLAGE%](../locations/old-village-ruins.md) — edges, creek, tree line, further than a 4-year-old should go. Nobody watches him closely enough.";
}

export class PawelekWasPossessed extends Clue {
  readonly id = "pawelek-was-possessed";
  readonly text = "Pawełek was possessed. His fever dreams of \"the lady\" and \"the round stones,\" and a child sickening while no one else does, look to some like the work of the well rather than a natural illness.";
}

export class PaweleksContamination extends Clue {
  readonly id = "paweleks-contamination";
  readonly text = "The contamination profile is wrong. Concentrated single-source, not diffuse floodwater. High phosphate, high ammonia, anaerobic decay. Something large and organic decomposing in a confined water source for years. Not one body. Many.";
}

export class PaweleksDiagnosis extends Clue {
  readonly id = "paweleks-diagnosis";
  readonly text = "Bacterial dysentery — *Shigella*, most likely. Fever cycling, bloody stool, dehydration. Fatal without treatment in a child this size. Needs antibacterial medication — but which one and what dosage requires a doctor.";
}

export class SingingInTheNight extends Clue {
  readonly id = "singing-in-the-night";
  readonly text = "Lemko prayers for the dead are sung out in the forest at night, carried on the wind.";
}

export class ThreeBarredCrossInBabciasRoom extends Clue {
  readonly id = "three-barred-cross-in-babcias-room";
  readonly text = "In Barbara Kopacz's house, a small three-barred crucifix hangs above [Stefania Kopacz](../characters/babcia.md)'s corner, unlike the Roman cross on the wall.";
}

export class WellWaterContaminated extends Clue {
  readonly id = "well-water-contaminated";
  readonly text = "The well in [%OLD_VILLAGE%](../locations/old-village-ruins.md) is the source of contamination. The water is bad — whoever drinks it gets sick.";
}

export class WujasIsPaweleksFather extends Clue {
  readonly id = "wujas-is-paweleks-father";
  readonly text = "[Tadek Gajda](../characters/wujas.md) is [Pawełek Kopacz](../characters/pawelek.md)'s father.";
}
