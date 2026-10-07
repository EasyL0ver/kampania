import { Day } from "../schema.ts";
import type { Tick } from "../schema.ts";
import { endScenes } from "../calendar.ts";

export default class Day3 extends Day {
  readonly number = 3;
  override morning: Tick = (w) => {
    endScenes(w);
    w.hagsPrayer.end(w);
    w.wujasVisitsButcher.end(w);
    w.theFlood.activate(w);
    w.butcherHunts.activate(w);
    w.huntWithDudka.activate(w);
    w.huntWithRezen.activate(w);
    w.huntersCrossPaths.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.storeRobbery.activate(w);
    w.theFamilyTakesTheHouse.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasCracks.activate(w);
  };
  override afternoon: Tick = (w) => {
    endScenes(w);
    w.huntWithDudka.end(w);
    w.huntWithRezen.end(w);
    w.huntersCrossPaths.end(w);
    w.butcherHunts.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.theFamilyTakesTheHouse.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasCracks.activate(w);
  };
  override evening: Tick = (w) => {
    endScenes(w);
    w.pawelekFallsIll.activate(w);
    w.butcherHunts.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.theFamilyTakesTheHouse.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasCracks.activate(w);
  };
  override night: Tick = (w) => {
    endScenes(w);
    w.hagsPrayer.activate(w);
    w.butcherHunts.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.theFamilyTakesTheHouse.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasCracks.activate(w);
  };
}
