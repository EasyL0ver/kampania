// The card pool (story-facts/game-system.md, cards/). Every card is a typed
// constant: gates import the card itself, so a misspelt card is an unknown
// identifier and a modifier can't be used as a gate.
//
//   key       checked at a gate, otherwise dormant
//   modifier  always on, never asked for: may appear in `when` via me.has(),
//             never in a move's `skills`
//   both      either

export type CardKind = "key" | "modifier" | "both";

export interface Skill<K extends CardKind = CardKind> {
  readonly id: string;           // matches cards/<id>.md
  readonly name: string;
  readonly kind: K;
  readonly pool: "starting" | "acquired";
  readonly composure: number;    // standing composure bonus
}

// A card that can gate a move.
export type KeySkill = Skill<"key" | "both">;

const card = <K extends CardKind>(s: Skill<K>): Skill<K> => Object.freeze(s);

export const Alcoholic = card({ id: "alcoholic", name: "Alcoholic", kind: "modifier", pool: "starting", composure: 0 });
export const Bureaucracy = card({ id: "bureaucracy", name: "Bureaucracy", kind: "key", pool: "starting", composure: 0 });
export const Chainsmoker = card({ id: "chainsmoker", name: "Chainsmoker", kind: "both", pool: "starting", composure: 0 });
export const CityManners = card({ id: "city-manners", name: "City manners", kind: "modifier", pool: "starting", composure: 0 });
export const Culture = card({ id: "culture", name: "Culture", kind: "key", pool: "starting", composure: 0 });
// +1 composure only while in a state of grace (game-system.md -> Devotion).
export const Devotion = card({ id: "devotion", name: "Devotion", kind: "both", pool: "starting", composure: 1 });
export const Empathy = card({ id: "empathy", name: "Empathy", kind: "key", pool: "starting", composure: 0 });
export const Finesse = card({ id: "finesse", name: "Finesse", kind: "key", pool: "starting", composure: 0 });
export const Geology = card({ id: "geology", name: "Geology", kind: "key", pool: "starting", composure: 0 });
export const Handiwork = card({ id: "handiwork", name: "Handiwork", kind: "key", pool: "starting", composure: 0 });
export const History = card({ id: "history", name: "History", kind: "key", pool: "starting", composure: 0 });
export const Language = card({ id: "language", name: "Language", kind: "key", pool: "starting", composure: 0 });
export const Loaded = card({ id: "loaded", name: "Loaded", kind: "key", pool: "starting", composure: 0 });
export const LodgingAtMatronas = card({ id: "lodging-at-matronas", name: "Lodging at Matrona's", kind: "both", pool: "acquired", composure: 0 });
export const Medicine = card({ id: "medicine", name: "Medicine", kind: "both", pool: "starting", composure: 1 });
export const Physique = card({ id: "physique", name: "Physique", kind: "both", pool: "starting", composure: 1 });
export const Speech = card({ id: "speech", name: "Speech", kind: "key", pool: "starting", composure: 0 });
export const Superstitious = card({ id: "superstitious", name: "Superstitious", kind: "both", pool: "starting", composure: 0 });
export const Survival = card({ id: "survival", name: "Survival", kind: "key", pool: "starting", composure: 0 });
export const Violence = card({ id: "violence", name: "Violence", kind: "both", pool: "starting", composure: 2 });
export const Wszywka = card({ id: "wszywka", name: "Wszywka", kind: "modifier", pool: "starting", composure: 0 });
