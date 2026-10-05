// The mechanical model of the campaign. Every entity is a class: its state is
// typed properties (`sick = false`, `hp = 6`), its moves are
// fields built with action()/opportunity(), and conditions/effects are typed
// lambdas over the whole World. No prose: anything read aloud lives in prose/.
//
// Entities and clues refer to each other by CLASS: `at = BarbarasHouse`,
// `clues: [clues.BabciaIsLemko]`. World comes from ids.generated.ts
// (tools/gen-ids.ts).

import type { World } from "./ids.generated.ts";
import type { KeySkill, Skill } from "./skills.ts";

export type { World, KeySkill, Skill };

export type Label = string; // length caps enforced by tools/check.ts

// A reference to an entity is its class. Each kind's base class (and its
// stub base) carries a static `entityKind` tag; a reference is any class with
// the right tag. Checking the tag, not the instance type, lets a class refer
// to itself and to classes that refer back to it.
export type EntityKind = "character" | "location" | "event" | "item" | "clue";
type Ref<K extends EntityKind> = (abstract new (...args: never) => unknown) & { readonly entityKind: K };
export type CharacterRef = Ref<"character">;
export type LocationRef = Ref<"location">;
export type EventRef = Ref<"event">;
export type ItemRef = Ref<"item">;
export type ClueRef = Ref<"clue">;
export type EntityRef = CharacterRef | LocationRef | EventRef | ItemRef;

// ---------------------------------------------------------------- runtime

// The player a condition or effect is evaluated for.
export interface Player {
  has(skill: Skill): boolean;
  knows(clue: ClueRef): boolean;
  isAware(ref: EntityRef): boolean;
  holds(item: ItemRef): boolean;
}

// Conditions read state; effects write it. Both see the whole typed World.
// Write them as plain expressions/assignments: no if/loops (tools/check.ts).
export type Cond = (w: World, me: Player) => boolean;
export type Effect = (w: World, me: Player) => void;

// ---------------------------------------------------------------- state

// Per-player state, e.g. "Pawełek trusts this player".
export class PerPlayer<T> {
  readonly initial: T;
  private readonly values = new Map<Player, T>();
  constructor(initial: T) {
    this.initial = initial;
  }
  of(p: Player): T {
    return this.values.has(p) ? (this.values.get(p) as T) : this.initial;
  }
  set(p: Player, v: T): void {
    this.values.set(p, v);
  }
}


// ---------------------------------------------------------------- moves


// Everything except cards. All listed conditions are ANDed. `when` is any
// typed condition on the world, including ORs that mix state and cards
// (`w.pawelek.trusts.of(me) || me.has(Speech)`).
export interface RequirementSpec {
  clues?: ClueRef[];
  aware?: EntityRef[];
  items?: ItemRef[];
  when?: Cond;
}

// ONE non-card condition, with the short message the GM gives a player who
// tries the move without meeting it (no card charged). A composite gate is a
// list of these, so each unmet part reports its own message:
//   requires: [
//     new Requirement("He's too delirious to answer.", { when: (w) => w.pawelek.hp >= 5 }),
//     new Requirement("He doesn't trust you yet.", { when: (w, me) => w.pawelek.trusts.of(me) }),
//   ]
// One field per requirement and no top-level && in `when` (tools/check.ts).
export class Requirement {
  readonly message: Label;
  readonly clues?: ClueRef[];
  readonly aware?: EntityRef[];
  readonly items?: ItemRef[];
  readonly when?: Cond;

  constructor(message: Label, spec: RequirementSpec) {
    this.message = message;
    Object.assign(this, spec);
  }

  // undefined when met, otherwise the message.
  check(w: World, me: Player): Label | undefined {
    const met =
      (this.clues ?? []).every((c) => me.knows(c)) &&
      (this.aware ?? []).every((r) => me.isAware(r)) &&
      (this.items ?? []).every((i) => me.holds(i)) &&
      (!this.when || this.when(w, me));
    return met ? undefined : this.message;
  }
}

// A card requirement. Several cards means any one of them will do.
// Only key cards can gate (modifiers are never asked for).
//   new SkillRequirement(Medicine)                 "Needs Medicine."
//   new SkillRequirement(Culture, Superstitious)   "Needs Culture or Superstitious."
export class SkillRequirement extends Requirement {
  readonly skills: readonly KeySkill[];

  constructor(...skills: [KeySkill, ...KeySkill[]]) {
    super(`Needs ${skills.map((s) => s.name).join(" or ")}.`, {});
    this.skills = skills;
  }

  override check(_w: World, me: Player): Label | undefined {
    return this.skills.some((s) => me.has(s)) ? undefined : this.message;
  }
}

// Soft breadcrumb: what would push a player to try this. Never a gate.
// Any mix of entities (knowing they exist) and clues.
export type Prompt = (EntityRef | ClueRef)[];

export interface Gives {
  clues?: ClueRef[];
  aware?: EntityRef[];
  items?: ItemRef[];
  unlocks?: EventRef[];
  effects?: Effect;
}

// An opportunity is a hidden gate in two parts. The GM checks both silently;
// nobody is told why they didn't get one, so there are no messages.
//
//   trigger  does the thing exist right now? World state only, no player.
//            Omitted = it happens on contact with the parent: visiting the
//            location, being with the character, attending the event,
//            handling the item.
//   target   who notices it: a player present in this scene who meets this.
//            `anyone` = everyone present.
//
// At least one of them must actually gate (anyone + always is Setup).
export type WorldCond = (w: World) => boolean;

// Everything listed is ANDed; use `when` for an OR
// (`me.has(Culture) || me.has(Superstitious)`) or anything else about the player.
export interface Target {
  skills?: KeySkill[];
  clues?: ClueRef[];
  aware?: EntityRef[];
  items?: ItemRef[];
  when?: Cond;
}

export const anyone: Target = Object.freeze({});

export interface OpportunitySpec {
  label: Label;
  trigger?: WorldCond;
  target: Target;
  promptedBy?: Prompt;
  gives?: Gives;             // omitted = atmosphere (text lives in prose/)
}

// What taking an action spends. Usually time; sometimes nerve or a thing.
//   { time: 1 }            one card
//   { composure: 2 }       composure points
//   { item: Penicillin }   the item is used up
export type Cost =
  | { time: 1 | 2 | 3 | 4 }
  | { composure: number }
  | { item: ItemRef };

export interface ActionSpec {
  label: Label;
  requires?: Requirement[];   // all must hold; each has its own message
  promptedBy?: Prompt;
  cost: Cost[];              // everything paid; [] = free
  gives: Gives;
}

// A move's id is its key in the entity's actions/opportunities table.
export class Opportunity {
  readonly kind = "opportunity";
  readonly spec: OpportunitySpec;
  done = false;
  constructor(spec: OpportunitySpec) {
    this.spec = spec;
  }

  // Does the thing exist right now? No trigger = yes, on contact with the parent.
  isTriggered(w: World): boolean {
    return !this.spec.trigger || this.spec.trigger(w);
  }

  // Would this player (present in the scene) notice it?
  isTarget(w: World, me: Player): boolean {
    const t = this.spec.target;
    return (t.skills ?? []).every((s) => me.has(s)) &&
      (t.clues ?? []).every((c) => me.knows(c)) &&
      (t.aware ?? []).every((r) => me.isAware(r)) &&
      (t.items ?? []).every((i) => me.holds(i)) &&
      (!t.when || t.when(w, me));
  }

  // The GM delivers it to this player now.
  isDeliveredTo(w: World, me: Player): boolean {
    return this.isTriggered(w) && this.isTarget(w, me);
  }
}

export class Action {
  readonly kind = "action";
  readonly spec: ActionSpec;
  done = false;
  constructor(spec: ActionSpec) {
    this.spec = spec;
  }
}

export const opportunity = (spec: OpportunitySpec) => new Opportunity(spec);
export const action = (spec: ActionSpec) => new Action(spec);

// ---------------------------------------------------------------- entities

export type Checks = [Label, Label, Label];

export type MoveTable<M> = Readonly<Record<string, M>>;

// Every entity has two virtual properties: the moves available RIGHT NOW.
// Back them with move tables (fields holding only moves) and override the
// getter, either returning one table or picking one by state:
//
//   readonly sickActions = { stabilize: action({...}) };
//   override get actions() {
//     return { well: this.wellActions, sick: this.sickActions, dead: {} }[this.condition];
//   }
//
// Reference a specific move through its table: w.pawelek.sickActions.stabilize.done
// Subclasses may also add state fields: boolean, number, PerPlayer, or
// a kebab-case string enum (`condition: Condition = "well"`). Any other new
// field is rejected by check.ts.
export abstract class Entity {
  abstract readonly id: string;
  abstract readonly name: Label;
  abstract readonly hook: Label;
  get actions(): MoveTable<Action> {
    return {};
  }
  get opportunities(): MoveTable<Opportunity> {
    return {};
  }
}

export abstract class Character extends Entity {
  static readonly entityKind = "character";
  abstract readonly role: Label;
  livesAt?: LocationRef;
  bond?: Checks;
  grudge?: Checks;
}

export abstract class Location extends Entity {
  static readonly entityKind = "location";
  abstract readonly position: Label;
  abstract readonly visitCost: 0 | 1 | 2;
  abstract readonly setup: Label[];
  // Who is here. May depend on world state; select, no if.
  present(_w: World): CharacterRef[] {
    return [];
  }
}

export abstract class Event extends Entity {
  static readonly entityKind = "event";
  // Where the event is happening right now (and so where the players are).
  // May move as the event plays out; select with a ternary, no if.
  abstract at(w: World): LocationRef;
  // Who is here. May depend on what happened (world state); select, no if.
  abstract present(w: World): CharacterRef[];
  abstract readonly available: { fromDay?: number; after?: EventRef[] };
  abstract readonly setup: Label[];
  onFire?: Effect;
  ifMissed?: Effect;
  composure?: number;                     // drain on witnessing
}

export abstract class Item extends Entity {
  static readonly entityKind = "item";
  abstract readonly what: Label;
}

// Placeholder for an entity not migrated yet: an id, a name, and any state
// other entities read or write. Extend the stub base of its kind.
export abstract class Stub {
  abstract readonly id: string;
  abstract readonly name: Label;
}
export abstract class CharacterStub extends Stub { static readonly entityKind = "character"; }
export abstract class LocationStub extends Stub { static readonly entityKind = "location"; }
export abstract class EventStub extends Stub { static readonly entityKind = "event"; }
export abstract class ItemStub extends Stub { static readonly entityKind = "item"; }

// Base fields each kind may carry. Anything else on an instance must be state
// or a move table (enforced by tools/check.ts).
export const SCHEMA_FIELDS = new Set([
  "id", "name", "hook",
  "role", "livesAt", "bond", "grudge",
  "position", "visitCost", "setup",
  "available", "onFire", "ifMissed", "composure",
  "what",
]);

// A player-discoverable fact. `synthesis` lists alternate routes: holding every
// clue in any one route derives this clue anywhere, in no particular scene.
export abstract class Clue {
  static readonly entityKind = "clue";
  abstract readonly id: string;
  abstract readonly text: string;
  readonly synthesis: readonly (readonly ClueRef[])[] = [];

  // Can this player derive it from what they already know?
  isSynthesizedBy(me: Player): boolean {
    return this.synthesis.some((route) => route.every((c) => me.knows(c)));
  }
}
