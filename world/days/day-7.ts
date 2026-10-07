import { Day } from "../schema.ts";
import type { Tick } from "../schema.ts";
import { endScenes } from "../calendar.ts";

export default class Day7 extends Day {
  readonly number = 7;
  override morning: Tick = (w) => {
    endScenes(w);
    w.punishmentLynch.end(w);
    w.hagsPrayer.end(w);
    w.butcherHunts.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.priestsPlea.activate(w);
    w.storeRobbery.activate(w);
    w.theFamilyTakesTheHouse.activate(w);
    w.theOdpust.activate(w);
    w.theReport.activate(w);
    w.theSealBreak.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasCracks.activate(w);
  };
  override afternoon: Tick = (w) => {
    endScenes(w);
    w.butcherHunts.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.priestsPlea.activate(w);
    w.theFamilyTakesTheHouse.activate(w);
    w.theOdpust.activate(w);
    w.theReport.activate(w);
    w.theSealBreak.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasCracks.activate(w);
  };
  override evening: Tick = (w) => {
    endScenes(w);
    w.butcherHunts.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.priestsPlea.activate(w);
    w.theFamilyTakesTheHouse.activate(w);
    w.theOdpust.activate(w);
    w.theReport.activate(w);
    w.theSealBreak.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasCracks.activate(w);
  };
  override night: Tick = (w) => {
    endScenes(w);
    w.theFlood.end(w);
    w.hagsPrayer.activate(w);
    w.butcherHunts.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.priestsPlea.activate(w);
    w.theFamilyTakesTheHouse.activate(w);
    w.theOdpust.activate(w);
    w.theReport.activate(w);
    w.theSealBreak.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasCracks.activate(w);
  };
}
