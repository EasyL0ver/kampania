import { Item, Narrative } from "../schema.ts";

export default class PropagandaLeaflet extends Item {
  readonly id = "propaganda-leaflet";
  readonly name = "Propaganda Leaflet";
  readonly hook = "A folded, yellowed propaganda sheet: a white eagle driving a bayonet into a trident.";
  readonly what = "keepsake (state propaganda sheet)";
  readonly description = new Narrative({
    narration: [
      "A single sheet of cheap paper, folded small and gone brittle at the creases. Crude two-colour print: the white Polish eagle driving a bayonet down into a trident, the trident cracking under the blow. Across the bottom, block letters: \"DEATH TO THE BANDITS\". The kind of sheet handed out to the men who were sent into these hills after the partisans.",
    ],
  });
}
