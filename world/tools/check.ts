// Rules the type system can't express. Errors fail the build; warnings don't.
// Code-level rules (control flow, && in a requirement, which tables a getter
// returns) come from the compiler analysis in analyze.ts, not from source text.

import { readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { Action, DAY_PARTS, Opportunity, SkillRequirement, WithoutSkillRequirement } from "../schema.ts";
import type { Day, Event, Gives, Requirement, Target } from "../schema.ts";
import { analyze } from "./analyze.ts";
import { loadWorld, ROOT } from "./load.ts";
import { classify, isMoveTable, lambdasOf, movesOf } from "./model.ts";

const LIMITS = { label: 80, hook: 120, clue: 300, message: 60 };

const w = await loadWorld();
const a = analyze();

// Moves some condition depends on ("Class.table.move"): an action that gives
// nothing is allowed only if it exists to unlock one of these.
const dependedOn = new Set([...a.code.values()].flatMap((c) => c.moves.map((m) => `${m.className}.${m.table}.${m.move}`)));
const errors: string[] = [];
const warnings: string[] = [];
let noNarration = 0;

const isEmptyGives = (g: Gives) =>
  !g.clues?.length && !g.aware?.length && !g.items?.length && !g.effects;

// The conditions a requirement sets; exactly one is allowed. A skill
// requirement's card list is its one condition (any of them will do).
const conditionsOf = (r: Requirement) =>
  r instanceof WithoutSkillRequirement ? ["without-skill"]
  : r instanceof SkillRequirement
    ? (r.skills.length ? ["skills"] : [])
    : (["clues", "aware", "items", "when"] as const).filter((k) =>
        k === "when" ? !!r.when : !!r[k]?.length);

// A target that lets every player present notice it.
const isAnyone = (t: Target) =>
  !t.skills?.length && !t.clues?.length && !t.aware?.length && !t.items?.length && !t.when;

function cap(where: string, kind: keyof typeof LIMITS, text: string, err = true) {
  if (text.length > LIMITS[kind]) {
    (err ? errors : warnings).push(`${where}: ${kind} is ${text.length} chars (max ${LIMITS[kind]})`);
  }
}

// Code in content selects and assigns; it never branches or loops.
function flow(path: string) {
  const c = a.code.get(path);
  if (c?.controlFlow.length) errors.push(`${path}: ${c.controlFlow.join(", ")} not allowed: ${c.text}`);
}

const givers = new Map<string, string[]>();
const addGiver = (clue: string, by: string) => givers.set(clue, [...(givers.get(clue) ?? []), by]);

const keys = new Map<string, string>();
const classNames = new Map<string, string>();
for (const e of w.entities) {
  const prev = keys.get(e.key);
  if (prev) errors.push(`${e.ref}: world key "${e.key}" collides with ${prev}`);
  keys.set(e.key, e.ref);
  const prevCls = classNames.get(e.className);
  if (prevCls) errors.push(`${e.ref}: class name ${e.className} also used by ${prevCls}`);
  classNames.set(e.className, e.ref);
}

for (const e of w.entities) {
  const inst = e.instance as unknown as Record<string, unknown>;

  if (!e.stub && inst.id !== e.file.split("/").pop()!.replace(/\.ts$/, "")) {
    errors.push(`${e.file}: id "${inst.id}" does not match file name`);
  }
  if (typeof inst.hook === "string") cap(e.ref, "hook", inst.hook);

  for (const [name, value] of Object.entries(inst)) {
    const cls = classify(name, value);
    if (cls === "stray-move") errors.push(`${e.ref}.${name}: a move must live in a move table`);
    // A class accepts any field; this is where prose gets stopped.
    if (cls === "unknown") errors.push(`${e.ref}.${name}: not a schema field, state or move table (prose goes in prose/)`);
  }

  // Every live condition/effect must be one the compiler analysed, and plain.
  for (const { path } of lambdasOf(e)) {
    if (!a.code.has(path)) errors.push(`${path}: can't be analysed; write it inline in the move`);
    flow(path);
  }
  for (const m of ["get actions", "get opportunities", "at", "present", "condition"]) flow(`${e.className}.${m}`);

  // Every move table must be reachable through a getter.
  const returned = new Set([
    ...(a.code.get(`${e.className}.get actions`)?.thisProps ?? []),
    ...(a.code.get(`${e.className}.get opportunities`)?.thisProps ?? []),
  ]);
  for (const [table, value] of Object.entries(inst)) {
    if (isMoveTable(value) && !returned.has(table)) {
      errors.push(`${e.ref}.${table}: move table never returned by the actions/opportunities getter`);
    }
  }

  for (const { table, id, move: m } of movesOf(e)) {
    const s = m.spec;
    const mw = `${e.ref}#${id}`;
    cap(mw, "label", s.label);
    if (m instanceof Opportunity && !m.spec.trigger && isAnyone(m.spec.target)) {
      errors.push(`${mw}: on contact and anyone sees it (that is setup, not an opportunity)`);
    }
    const reqs = m instanceof Action ? m.spec.requires ?? [] : [];
    reqs.forEach((r, i) => {
      const rw = `${mw} requires[${i}]`;
      if (!r.message.trim()) errors.push(`${rw}: no message`);
      cap(rw, "message", r.message);
      const conds = conditionsOf(r);
      if (conds.length !== 1) {
        errors.push(`${rw}: one condition per requirement, found ${conds.join(", ") || "none"}; split it`);
      }
      if ((r.clues?.length ?? 0) > 1 || (r.aware?.length ?? 0) > 1 || (r.items?.length ?? 0) > 1) {
        errors.push(`${rw}: one clue/aware/item per requirement; split it`);
      }
      if (a.code.get(`${e.className}.${table}.${id}.requires[${i}].when`)?.topLevelAnd) {
        errors.push(`${rw}: && joins two requirements; split it`);
      }
    });
    // Actions must change something, unless another move depends on them (an
    // action that only opens an opportunity, e.g. "Mention her family").
    // Opportunities may be pure atmosphere (narration, gives nothing).
    const gives = s.narrative.gives;
    const unlocks = m instanceof Action && dependedOn.has(`${e.className}.${table}.${id}`);
    if (m instanceof Action && isEmptyGives(gives) && !unlocks) {
      errors.push(`${mw}: gives nothing and no move depends on it (no empty outcomes)`);
    }
    // TODO: every move should have narration; for now just counted.
    if (!s.narrative.narration.length) noNarration++;
    gives.clues?.forEach((c) => addGiver(w.clueIdOf.get(c)!, mw));
  }
}

for (const [id, clue] of Object.entries(w.clues)) {
  cap(`clue ${id}`, "clue", clue.text, false);
  if (clue.synthesis.length) addGiver(id, "synthesis");
  clue.synthesis.forEach((route, i) => {
    if (!route.length) errors.push(`clue ${id}: synthesis route ${i} is empty`);
    if (route.some((c) => w.clueIdOf.get(c) === id)) errors.push(`clue ${id}: synthesis route ${i} needs itself`);
  });
}

// ---------------------------------------------------------------- calendar

const dayFiles = readdirSync(join(ROOT, "days")).filter((f) => f.endsWith(".ts")).sort();
const days: Day[] = [];
for (const f of dayFiles) {
  const cls = (await import(pathToFileURL(join(ROOT, "days", f)).href)).default as new () => Day;
  const day = new cls();
  days.push(day);
  for (const part of DAY_PARTS) flow(`${cls.name}.${part}`);
}
const numbers = days.map((d) => d.number).sort();
if (numbers.join() !== "1,2,3,4,5,6,7") errors.push(`calendar: days must be 1..7 exactly once, found ${numbers.join(",")}`);

// Every event must be reachable: activated by code (a day, or another event's
// onFire) or made known to the players by some move (they then go to it).
const activated = new Set([...a.code.values()].flatMap((c) => c.activates));
const madeKnown = new Set<unknown>();
for (const e of w.entities) for (const { move } of movesOf(e)) for (const r of move.spec.narrative.gives.aware ?? []) madeKnown.add(r);
for (const e of w.entities) {
  if (e.kind !== "events") continue;
  const ev = e.instance as Event;
  if (!ev.hooks.length) errors.push(`${e.ref}: has no hooks`);
  if (!activated.has(e.className) && !madeKnown.has(e.instance.constructor)) {
    errors.push(`${e.ref}: unreachable: no day activates it and no move makes the players aware of it`);
  }
}

const orphans = Object.keys(w.clues).filter((c) => !givers.has(c));

for (const er of errors) console.log(`ERROR  ${er}`);
for (const wn of warnings) console.log(`warn   ${wn}`);
console.log(
  `\n${w.entities.filter((e) => !e.stub).length} entities, ${w.entities.filter((e) => e.stub).length} stubs, ` +
    `${Object.keys(w.clues).length} clues, ${noNarration} moves without narration, ${orphans.length} clues with no giver in this world:`,
);
for (const o of orphans) console.log(`  - ${o}`);
console.log(`\n${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
