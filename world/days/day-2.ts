import { Day } from "../schema.ts";
import type { Tick } from "../schema.ts";
import { endScenes } from "../calendar.ts";

export default class Day2 extends Day {
  readonly number = 2;
  override morning: Tick = (w) => {
    endScenes(w);
    w.hagsPrayer.end(w);
    w.wujasVisitsButcher.end(w);
    w.huntWithDudka.activate(w);
    w.huntWithRezen.activate(w);
    w.huntersCrossPaths.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.storeRobbery.activate(w);
    w.wojewodasAsk.activate(w);
    w.wolfAttack.activate(w);
    w.wujasVisitsButcher.activate(w);
  };
  override afternoon: Tick = (w) => {
    endScenes(w);
    w.wolfAttack.end(w);
    w.huntWithDudka.end(w);
    w.huntWithRezen.end(w);
    w.huntersCrossPaths.end(w);
    w.wujasVisitsButcher.end(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasVisitsButcher.activate(w);
  };
  override evening: Tick = (w) => {
    endScenes(w);
    w.wujasVisitsButcher.end(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasVisitsButcher.activate(w);
  };
  override night: Tick = (w) => {
    endScenes(w);
    w.wujasVisitsButcher.end(w);
    w.hagsPrayer.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasVisitsButcher.activate(w);
  };
}
