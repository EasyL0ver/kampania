import { Day } from "../schema.ts";
import type { Tick } from "../schema.ts";
import { endScenes } from "../calendar.ts";

export default class Day4 extends Day {
  readonly number = 4;
  override morning: Tick = (w) => {
    endScenes(w);
    w.hagsPrayer.end(w);
    w.butcherHunts.activate(w);
    w.holyMass.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.priestsPlea.activate(w);
    w.storeRobbery.activate(w);
    w.theFamilyTakesTheHouse.activate(w);
    w.wojewodaConfrontsButcher.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasCracks.activate(w);
  };
  override afternoon: Tick = (w) => {
    endScenes(w);
    w.holyMass.end(w);
    w.wojewodaConfrontsButcher.end(w);
    w.butcherHunts.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.priestsPlea.activate(w);
    w.theFamilyTakesTheHouse.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasCracks.activate(w);
  };
  override evening: Tick = (w) => {
    endScenes(w);
    w.butcherHunts.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.priestsPlea.activate(w);
    w.theFamilyTakesTheHouse.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasCracks.activate(w);
  };
  override night: Tick = (w) => {
    endScenes(w);
    w.hagsPrayer.activate(w);
    w.butcherHunts.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.priestsPlea.activate(w);
    w.theFamilyTakesTheHouse.activate(w);
    w.wellConfrontation.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasCracks.activate(w);
  };
}
