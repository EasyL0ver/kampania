import { Day } from "../schema.ts";
import type { Tick } from "../schema.ts";
import { endScenes } from "../calendar.ts";

export default class Day5 extends Day {
  readonly number = 5;
  override morning: Tick = (w) => {
    endScenes(w);
    w.wellConfrontation.end(w);
    w.hagsPrayer.end(w);
    w.butcherHunts.activate(w);
    w.foremansFloodFight.activate(w);
    w.funeralMass.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.priestsPlea.activate(w);
    w.rezenTakesTheBody.activate(w);
    w.storeRobbery.activate(w);
    w.theFamilyTakesTheHouse.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasCracks.activate(w);
  };
  override afternoon: Tick = (w) => {
    endScenes(w);
    w.funeralMass.end(w);
    w.butcherHunts.activate(w);
    w.foremansFloodFight.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.priestsPlea.activate(w);
    w.theFamilyTakesTheHouse.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasCracks.activate(w);
  };
  override evening: Tick = (w) => {
    endScenes(w);
    w.butcherHunts.activate(w);
    w.foremansFloodFight.activate(w);
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
    w.foremansFloodFight.activate(w);
    w.irenaConfrontsWojewoda.activate(w);
    w.priestsPlea.activate(w);
    w.rezenTakesTheBody.activate(w);
    w.theFamilyTakesTheHouse.activate(w);
    w.wojewodasAsk.activate(w);
    w.wujasCracks.activate(w);
  };
}
