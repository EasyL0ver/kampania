import { Day } from "../schema.ts";
import type { Tick } from "../schema.ts";
import { endScenes } from "../calendar.ts";

export default class Day1 extends Day {
  readonly number = 1;
  override morning: Tick = (w) => {
    endScenes(w);
    w.theCarIn.activate(w);
    w.arrival.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.storeRobbery.activate(w);
    w.wojewodasAsk.activate(w);
    w.wolfAttack.activate(w);
    w.wujasVisitsButcher.activate(w);
  };
  override afternoon: Tick = (w) => {
    endScenes(w);
    w.wolfAttack.end(w);
    w.wujasVisitsButcher.end(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasVisitsButcher.activate(w);
  };
  override evening: Tick = (w) => {
    endScenes(w);
    w.wujasVisitsButcher.end(w);
    w.dinner.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasVisitsButcher.activate(w);
  };
  override night: Tick = (w) => {
    endScenes(w);
    w.dinner.end(w);
    w.wujasVisitsButcher.end(w);
    w.hagsPrayer.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasVisitsButcher.activate(w);
  };
}
