// Runtime view of the loaded world: which instance fields are state, move
// tables or schema fields, and every condition/effect with a stable path.
// The same paths are produced by analyze.ts from the source, which is how a
// live function is matched to what the compiler knows about it.

import { Action, Opportunity, PerPlayer, Requirement, SCHEMA_FIELDS, SkillRequirement } from "../schema.ts";
import type { Entity } from "../schema.ts";
import type { Loaded } from "./load.ts";

const ENUM = /^[a-z][a-z0-9-]*$/;

export type Move = Action | Opportunity;

// A move table: a non-empty object whose values are all moves.
export const isMoveTable = (v: unknown): v is Record<string, Move> =>
  !!v && typeof v === "object" && v.constructor === Object && Object.keys(v).length > 0 &&
  Object.values(v).every((m) => m instanceof Action || m instanceof Opportunity);

export type FieldClass = "schema" | "state" | "table" | "stray-move" | "unknown";

export function classify(name: string, value: unknown): FieldClass {
  if (SCHEMA_FIELDS.has(name)) return "schema";
  if (value instanceof Action || value instanceof Opportunity) return "stray-move";
  if (isMoveTable(value)) return "table";
  if (typeof value === "boolean" || typeof value === "number") return "state";
  if (typeof value === "string" && ENUM.test(value)) return "state";   // string enum
  if (value instanceof PerPlayer) return "state";
  return "unknown";
}

export interface MoveEntry {
  table: string;     // field holding the move table
  id: string;        // key in the table
  move: Move;
}

// Every move of an entity, once (a move shared by two tables is listed once).
export function movesOf(e: Loaded): MoveEntry[] {
  const out: MoveEntry[] = [];
  const seen = new Set<Move>();
  for (const [table, value] of Object.entries(e.instance)) {
    if (!isMoveTable(value)) continue;
    for (const [id, move] of Object.entries(value)) {
      if (seen.has(move)) continue;
      seen.add(move);
      out.push({ table, id, move });
    }
  }
  return out;
}

// The plain (non-card) requirements of an action.
export const plainRequirements = (m: Move): Requirement[] =>
  m instanceof Action ? (m.spec.requires ?? []).filter((r) => !(r instanceof SkillRequirement)) : [];

// Every condition/effect function in an entity, keyed by its source path:
//   Pawelek.sickActions.askDrinkingWater.requires[0].when
//   PawelekFallsIll.allOpportunities.hisEyes.trigger
//   PawelekFallsIll.onFire
export function lambdasOf(e: Loaded): { path: string; fn: Function }[] {
  const out: { path: string; fn: Function }[] = [];
  const cls = e.className;
  for (const { table, id, move } of movesOf(e)) {
    const p = `${cls}.${table}.${id}`;
    if (move instanceof Action) {
      (move.spec.requires ?? []).forEach((r, i) => {
        if (r.when) out.push({ path: `${p}.requires[${i}].when`, fn: r.when });
      });
    } else {
      if (move.spec.trigger) out.push({ path: `${p}.trigger`, fn: move.spec.trigger });
      if (move.spec.target.when) out.push({ path: `${p}.target.when`, fn: move.spec.target.when });
    }
    if (move.spec.gives?.effects) out.push({ path: `${p}.gives.effects`, fn: move.spec.gives.effects });
  }
  const inst = e.instance as unknown as Record<string, unknown>;
  for (const name of ["onFire", "ifMissed"]) {
    if (typeof inst[name] === "function") out.push({ path: `${cls}.${name}`, fn: inst[name] as Function });
  }
  return out;
}

export const isEntity = (e: Loaded): e is Loaded & { instance: Entity } => !e.stub;
