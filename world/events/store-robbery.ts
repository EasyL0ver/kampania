import { Event, Narrative, anyone, opportunity } from "../schema.ts";
import type { CharacterRef, Effect, EventHook, LocationRef, Tick, WorldCond } from "../schema.ts";
import TheStore from "../locations/the-store.ts";
import Matrona from "../characters/matrona.ts";
import HalinaZajac from "../characters/secondary/halina-zajac.ts";

export default class StoreRobbery extends Event {
  readonly id = "store-robbery";
  readonly name = "Store Robbery";
  readonly hook = "Word through the village the next morning that Helena's store was broken into overnight.";
  override at(): LocationRef {
    return TheStore;
  }

  override present(): CharacterRef[] {
    return [Matrona, HalinaZajac];
  }
  override readonly hooks: EventHook[] = [
    { text: "Word through the village that Helena's store was broken into overnight.", heardAt: "anywhere" },
  ];
  // The first morning after the cabinet is forced (scheduled on mornings).
  override condition: WorldCond = (w) => w.theStore.allActions.breakIntoTheCabinet.done;
  // TODO: "The first morning after the cabinet is forced" (Physique break-in, or Marek forces it) — not modelled.
  // TODO: condition should check if cabinet was forced or Marek forced it
  readonly setup = new Narrative({
    narration: [
      "The cabinet in the back room stands forced open and emptied.",
      "Helena knows the penicillin is gone (somebody-stole-penicillin).",
      "If the register was forced, the till is emptied too (somebody-stole-money).",
      "Helena treats the theft as something to be answered.",
      "If Helena knows the committee wanted the penicillin, she says little and watches the players with open suspicion.",
    ],
  });

  // TODO: also "If Helena blames the committee (committee-stole-penicillin): World State Change: Helena revokes the committee's lodging; lodgers lose the Lodging at Matrona's card"
  onFire: Tick = (w) => {
    w.matrona.knowsStoreBrokenInto = true;
    w.matrona.knowsPenicillinStolen = true;
    w.matrona.knowsMoneyStolen = w.matrona.knowsMoneyStolen || w.theStore.allActions.smashTheRegisterOpen.done;
  };

  // No actions.

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    helenasStare: opportunity({
      label: "Helena's stare",
      trigger: (w) =>
        w.matrona.knowsPawelekNeedsPenicillin && w.matrona.knowsPenicillinStolen && !w.matrona.knowsMoneyStolen,
      target: anyone,
      promptedBy: [StoreRobbery],
      narrative: new Narrative({
        narration: [
          "`(requires: helena: pawelek-needs-penicillin, helena: somebody-stole-penicillin, and no money was taken)` — The penicillin is gone and the till sits untouched, and the only ones who came to her asking for that drug were the committee. She says nothing and holds the players in a long, open stare. → Gives: NPC Learns: helena: committee-stole-penicillin",
        ],
        gives: { effects: (w) => { w.matrona.knowsCommitteeStolePenicillin = true; } },
      }),
    }),
  };

  override get opportunities() {
    return this.allOpportunities;
  }
}
