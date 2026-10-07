import { Item, Narrative, Requirement, action } from "../schema.ts";
import * as clues from "../clues.ts";

export default class MazurDiary extends Item {
  readonly id = "mazur-diary";
  readonly name = "Tadeusz Mazur's Diary";
  readonly hook = "A worn cloth-bound notebook, its pages close-written in a careful farmer's hand, years of weather, work, and prices.";
  readonly what = "a settler's private diary, kept from ~1948";
  readonly description = new Narrative({
    narration: [
      "A thick notebook bound in faded cloth, swollen and soft at the corners from years of handling. Most of it is the plain ledger of a settler's life: what was sown and when, prices at market, a cow calved, a roof mended, hard winters marked. The hand is careful and unhurried. Spread through it, a handful of longer entries step back from the weather and the prices to set down what was happening to the valley itself.",
    ],
  });

  // ------------------------------------------------------------ actions

  readonly allActions = {
    readTheDiary: action({
      label: "Read the diary",
      requires: [new Requirement("You don't have the diary.", { items: [MazurDiary] })],
      promptedBy: [clues.MazurWroteDetailedDiary],
      cost: [],
      narrative: new Narrative({
        narration: [
          "Years of an original settler's plain, meticulous record, with a few entries that step back and chronicle the valley: arriving in 1948 to houses emptied of their Lemko people and some burned, Edward Barnaś holding the best land by the water while the village kept its distance from a man nobody had a good word for, Barnaś living unwed with his woman, the family gone overnight in 1954 with only the boy left and a neighbour who never believed the \"moved west\" story, the valley turned into a PGR in 1956 under Zbigniew Gajda, a Party man, and a last entry where the foreman, who always kept the silo to himself, hands Tadeusz the job because he is run off his feet.",
        ],
        gives: {
          clues: [
            clues.MazurAndWidowAreOldSettlers,
            clues.OldVillageWasLemko,
            clues.OldVillageResettledDuringVistula,
            clues.OldVillageWasBurned,
            clues.SoldierTookBestLand,
            clues.BarnasDisliked,
            clues.SoldierNeverMarried,
            clues.BarnasFamilyDisappeared,
            clues.BarnasFamilyLeftEdekBehind,
            clues.MazurDoubtedTheDeparture,
            clues.PgrEstablishedIn56,
            clues.WojewodaIsAPartyMember,
            clues.ForemanSentMazurInHisPlace,
          ],
        },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }
}
