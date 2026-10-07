import { Day } from "../schema.ts";
import type { Tick } from "../schema.ts";
import { endScenes } from "../calendar.ts";

export default class Day6 extends Day {
  readonly number = 6;
  override morning: Tick = (w) => {
    endScenes(w);
    w.foremansFloodFight.end(w);
    w.hagsPrayer.end(w);
    w.butcherHunts.activate(w);
    w.coffeeAtHelenas.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.priestsPlea.activate(w);
    w.rezenTakesTheBody.activate(w);
    w.secondFloodMass.activate(w);
    w.storeRobbery.activate(w);
    w.theFamilyTakesTheHouse.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasCracks.activate(w);
  };
  override afternoon: Tick = (w) => {
    endScenes(w);
    w.coffeeAtHelenas.end(w);
    w.secondFloodMass.end(w);
    w.rezenTakesTheBody.end(w);
    w.barbaraWarnsThePlayers.activate(w);
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
    w.punishmentLynch.activate(w);
    w.rezenTakesTheBody.activate(w);
    w.theFamilyTakesTheHouse.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasCracks.activate(w);
  };
}
