import { Item, Narrative } from "../schema.ts";

// TODO: "A Wounded fall while carrying it sets it off" (see prose) is not
// modelled; it belongs to the climb events.
export default class MakeshiftCharge extends Item {
  readonly id = "makeshift-charge";
  readonly name = "The Makeshift Charge";
  readonly hook = "A corroded old casing lashed into a bulky charge with a visible fuse.";
  readonly what = "old partisan demolition charge, rigged to breach the plug";
  readonly description = new Narrative({
    narration: [
      "Twenty-year-old partisan ordnance pulled from the bunker and lashed into a single usable charge: corroded casing, degraded filler, a sensitive fuse. Enough to start a notch in the plug if it is seated in the right seam. Too much weight for one climber to hold on wet rock without real strength, and a knock, drop, spark, or heat can set it off.",
    ],
  });
}
