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

// The player a condition or effect is evaluated for: their cards (abilities),
// the items they carry, the clues they know and the entities they are aware of.
export class Player {
  cards: Skill[];
  items: ItemRef[];
  clues: ClueRef[];
  aware: EntityRef[];
  // Where the player is (set by goTo in scene.ts); nowhere until they first move.
  location?: LocationRef;
  // What has happened to them since the narrator last spoke (see Entity.invoke).
  readonly narratives = new NarrativeBuffer();
  constructor(cards: Skill[] = [], items: ItemRef[] = [], clues: ClueRef[] = [], aware: EntityRef[] = []) {
    this.cards = cards;
    this.items = items;
    this.clues = clues;
    this.aware = aware;
  }
  has(skill: Skill): boolean {
    return this.cards.includes(skill);
  }
  holds(item: ItemRef): boolean {
    return this.items.includes(item);
  }
  knows(clue: ClueRef): boolean {
    return this.clues.includes(clue);
  }
  isAware(ref: EntityRef): boolean {
    return this.aware.includes(ref);
  }
  // Aware = knows it exists (a person), is happening (an event), where it is
  // (a place). Having met it in person is having been told its narrative
  // (a character's description, a place's or event's setup): see
  // narratives.hasTold.
  // Take what a move gives: new clues, awareness and items, then its effects.
  receive(w: World, gives: Gives): void {
    const add = <T>(list: T[], more: T[] = []) => list.push(...more.filter((x) => !list.includes(x)));
    add(this.clues, gives.clues);
    add(this.aware, gives.aware);
    add(this.items, gives.items);
    gives.effects?.(w, this);
  }
}

// Conditions read state; effects write it. Both see the whole typed World.
// Write them as plain expressions/assignments: no if/loops (tools/check.ts).
export type Cond = (w: World, me: Player) => boolean;
export type Effect = (w: World, me: Player) => void;
// A world-only effect: no player involved (the calendar, an event starting).
export type Tick = (w: World) => void;

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

// The opposite: a card that rules the move out. Any card, modifiers included.
//   new WithoutSkillRequirement(Wszywka, "Your implant won't let you drink.")
export class WithoutSkillRequirement extends Requirement {
  readonly skill: Skill;

  constructor(skill: Skill, message: Label = `Not possible with ${skill.name}.`) {
    super(message, {});
    this.skill = skill;
  }

  override check(_w: World, me: Player): Label | undefined {
    return me.has(this.skill) ? this.message : undefined;
  }
}

// Soft breadcrumb: what would push a player to try this. Never a gate.
// Any mix of entities (knowing they exist) and clues.
export type Prompt = (EntityRef | ClueRef)[];

export interface Gives {
  clues?: ClueRef[];
  aware?: EntityRef[];
  items?: ItemRef[];
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

// What a move puts across when it happens: the lines the GM must get across
// (written, not left to the narrator to invent), and its one mechanical
// outcome. Gives nothing = atmosphere (an opportunity only).
export interface NarrativeSpec {
  narration: Label[];
  gives?: Gives;
}

export class Narrative {
  readonly narration: Label[];
  readonly gives: Gives;
  constructor(spec: NarrativeSpec) {
    this.narration = spec.narration;
    this.gives = spec.gives ?? {};
  }
}

// One narrative put into play for a player, waiting to be narrated.
export type NarrativeKind = "enter" | "event" | "meet" | "action" | "notice";
export interface NarrativeEntry {
  kind: NarrativeKind;
  source: Entity;        // whose narrative it is
  label: Label;
  narrative: Narrative;
  private: boolean;      // only this player perceives it (a gated opportunity)
}

// A player's narratives, first in first out: everything that happened to them
// since the narrator last spoke. The narrator drains it after their turn.
// Every narrative is told once: the buffer remembers what it has queued and
// skips repeats (meeting someone again, coming back to a place you've seen).
// Having been told a character's description is what "met" means.
export class NarrativeBuffer {
  private queue: NarrativeEntry[] = [];
  private readonly told = new Set<Narrative>();
  push(entry: NarrativeEntry): void {
    if (this.told.has(entry.narrative)) return;
    this.told.add(entry.narrative);
    this.queue.push(entry);
  }
  hasTold(narrative: Narrative): boolean {
    return this.told.has(narrative);
  }
  drain(): NarrativeEntry[] {
    const out = this.queue;
    this.queue = [];
    return out;
  }
  get length(): number {
    return this.queue.length;
  }
}

// How a character comes across on meeting them: the hook (narration: what an
// introduction tells you, name and public role) and their look. Meeting them
// gives awareness of them (gives: { aware: [Themselves] }).
export interface CharacterDescriptionSpec extends NarrativeSpec {
  clothes: Label;
  hairAndFace: Label;
  carriage: Label;
}

export class CharacterDescription extends Narrative {
  readonly clothes: Label;
  readonly hairAndFace: Label;
  readonly carriage: Label;
  constructor(spec: CharacterDescriptionSpec) {
    super(spec);
    this.clothes = spec.clothes;
    this.hairAndFace = spec.hairAndFace;
    this.carriage = spec.carriage;
  }
}

export interface OpportunitySpec {
  label: Label;
  trigger?: WorldCond;
  target: Target;
  promptedBy?: Prompt;
  narrative: Narrative;
}

// What taking an action spends. Usually time; sometimes nerve or a thing.
//   { time: 1 }            one card
//   { composure: 2 }       composure points
//   { item: Penicillin }   the item is used up
//   { card: Loaded }       the player gives the card up for good
export type Cost =
  | { time: 1 | 2 | 3 | 4 }
  | { composure: number }
  | { item: ItemRef }
  | { card: Skill };

export interface ActionSpec {
  label: Label;
  requires?: Requirement[];   // all must hold; each has its own message
  promptedBy?: Prompt;
  cost: Cost[];              // everything paid; [] = free
  narrative: Narrative;
}

// A move's id is its key in the entity's actions/opportunities table.
export class Opportunity {
  readonly kind = "opportunity";
  readonly spec: OpportunitySpec;
  done = false;                              // delivered to anyone yet
  readonly deliveredTo = new Set<Player>();  // each player gets it once
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

  // Puts one of this entity's narratives into play for a player: they receive
  // what it gives, and it joins their queue for the narrator.
  invoke(w: World, me: Player, kind: NarrativeKind, label: Label, narrative: Narrative, isPrivate = false): void {
    me.receive(w, narrative.gives);
    this.queue(me, kind, label, narrative, isPrivate);
  }

  // Only queues it for the narrator (its gives already applied).
  queue(me: Player, kind: NarrativeKind, label: Label, narrative: Narrative, isPrivate = false): void {
    me.narratives.push({ kind, source: this, label, narrative, private: isPrivate });
  }
}

export abstract class Character extends Entity {
  static readonly entityKind = "character";
  abstract readonly role: Label;
  abstract readonly description: CharacterDescription;
  // The hook is the description's narration.
  get hook(): Label {
    return this.description.narration.join(" ");
  }
  alive = true;
  drunk = false;
  // The committee's records on this person (census interview, property assessment).
  censusTaken = false;
  propertyRecorded = false;
  // Bond / grudge (game-system.md): one player earns it by hitting 2 of the
  // 3 checks in `bond` / `grudge`; the GM marks it. A grudge blocks the bond.
  readonly bonded = new PerPlayer(false);
  readonly grudgeHeld = new PerPlayer(false);
  livesAt?: LocationRef;
  bond?: Checks;
  grudge?: Checks;
}

export abstract class Location extends Entity {
  static readonly entityKind = "location";
  abstract readonly position: Label;
  abstract readonly visitCost: 0 | 1 | 2;
  // What you see on arriving; gives awareness of the place (and anything
  // plainly visible from it).
  abstract readonly setup: Narrative;
  // Who is here. May depend on world state; select, no if.
  present(_w: World): CharacterRef[] {
    return [];
  }
}

// How an event makes itself known: one line of what reaches the players, and
// where it reaches them. Reaching a player gives awareness of the event.
export interface EventHook {
  text: Label;
  heardAt: LocationRef[] | "anywhere";
}

export type EventStatus = "pending" | "running" | "over";

export abstract class Event extends Entity {
  static readonly entityKind = "event";
  // Where the event is happening right now (and so where the players are).
  // May move as the event plays out; select with a ternary, no if.
  abstract at(w: World): LocationRef;
  // Who is here. May depend on what happened (world state); select, no if.
  abstract present(w: World): CharacterRef[];
  // At least one: how the event makes itself known when it starts.
  abstract readonly hooks: EventHook[];
  // Must hold for activate() to start the event (e.g. "after the flood").
  condition?: WorldCond;
  status: EventStatus = "pending";
  // What you find when you come upon it, as it starts.
  abstract readonly setup: Narrative;
  onFire?: Tick;
  // What the story does when the event ends: its default outcome. Player moves
  // during the event change world state; write the resolution against that
  // state, so whatever the players changed is respected and the rest happens.
  resolve?: Tick;
  composure?: number;                     // drain on witnessing

  // Called by the calendar (world/days/) or an action. Starts the event if it
  // is pending and its condition holds; returns whether it started, so its
  // hooks can be delivered to the players at their locations. An event happens
  // once; a recurring one sets itself back to "pending" in its own resolve.
  activate(w: World): boolean {
    if (this.status !== "pending" || (this.condition && !this.condition(w))) return false;
    this.status = "running";
    this.onFire?.(w);
    return true;
  }

  // Called by the calendar or an action when the event is over: runs its
  // resolution. Does nothing if the event isn't running.
  end(w: World): void {
    if (this.status !== "running") return;
    this.status = "over";
    this.resolve?.(w);
  }
}

// ---------------------------------------------------------------- calendar

export type DayNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type DayPart = "morning" | "afternoon" | "evening" | "night";
export const DAY_PARTS: readonly DayPart[] = ["morning", "afternoon", "evening", "night"];

// One of the seven days. Each part of the day calls activate() on the events
// that may start then; an event whose condition doesn't hold stays pending, so
// a recurring event is simply activated in every slot where it could happen.
//   override evening: Tick = (w) => { w.pawelekFallsIll.activate(w); };
export abstract class Day {
  abstract readonly number: DayNumber;
  morning?: Tick;
  afternoon?: Tick;
  evening?: Tick;
  night?: Tick;
}

export abstract class Item extends Entity {
  static readonly entityKind = "item";
  abstract readonly what: Label;
  // How it looks and what it is, told when the player gets it.
  abstract readonly description: Narrative;
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
  "role", "description", "livesAt", "bond", "grudge",
  "position", "visitCost", "setup",
  "onFire", "resolve", "composure", "hooks", "condition", "status",
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
