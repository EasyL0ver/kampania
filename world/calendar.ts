// Shared by the days (world/days/). Scenes that last one part of the day:
// whichever of them is running when a new part begins is over. Every slot of
// every day calls this first.

import type { Tick } from "./schema.ts";

export const endScenes: Tick = (w) => {
  w.barbaraWarnsThePlayers.end(w);
  w.butcherHunts.end(w);
  w.caughtAtTheStill.end(w);
  w.climbThePlug.end(w);
  w.climbThePlugInTheRain.end(w);
  w.edekInTheBunker.end(w);
  w.foremanSavesVillage.end(w);
  w.irenaConfrontsWojewoda.end(w);
  w.operatorRefusesHelp.end(w);
  w.priestsPlea.end(w);
  w.storeRobbery.end(w);
  w.theDisclosure.end(w);
  w.theFamilyTakesTheHouse.end(w);
  w.theOdpust.end(w);
  w.theReport.end(w);
  w.theRitual.end(w);
  w.theSealBreak.end(w);
  w.wojewodasAsk.end(w);
  w.wujasCracks.end(w);
};
