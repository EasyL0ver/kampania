// Builds the clue graph straight from the classes and writes
// visualisations/world_graph.html (template shared with the Markdown pipeline).
//
// Nodes: every clue, plus the existence of every entity a move mentions.
// Edges: one per (source, given clue/awareness) of each move, where sources are
//   required   requirement clues/aware (actions), target clues/aware
//              (opportunities), and whatever an earlier move it depends on gave
//   prompted   promptedBy
//   synthesis  each clue of a synthesis route
// Edge colour/label: the cards the move needs.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Action, Opportunity, SkillRequirement } from "../schema.ts";
import type { Cost } from "../schema.ts";
import * as skillCards from "../skills.ts";
import { analyze } from "./analyze.ts";
import { loadWorld, ROOT } from "./load.ts";
import type { Loaded } from "./load.ts";
import { movesOf, plainRequirements } from "./model.ts";
import type { Move } from "./model.ts";

const VIS = join(ROOT, "..", "visualisations");
const SCAT = { characters: "character", locations: "location", events: "event", items: "item" } as const;

const w = await loadWorld();
const a = analyze();

const entityByCtor = new Map<unknown, Loaded>(w.entities.map((e) => [e.instance.constructor, e]));
const entityByClass = new Map(w.entities.map((e) => [e.className, e]));
const clueIdByClass = new Map([...w.clueIdOf].map(([cls, id]) => [(cls as Function).name, id]));
const cardName = (exportName: string) =>
  (skillCards as Record<string, { name: string }>)[exportName]?.name ?? exportName;

// ---------------------------------------------------------------- nodes

interface GNode { id: string; label: string; kind: "clue" | "scene"; desc: string; location: string; catg?: string; scat?: string }
const nodes = new Map<string, GNode>();

const clueNode = (id: string) => {
  const nid = `clue:${id}`;
  if (!nodes.has(nid)) nodes.set(nid, { id: nid, label: id, kind: "clue", desc: w.clues[id]?.text ?? "", location: "" });
  return nid;
};
const awareNode = (e: Loaded) => {
  const nid = `clue:awareness:${e.ref}`;
  const label = e.instance.name + (e.stub ? " (stub)" : "");
  if (!nodes.has(nid)) {
    nodes.set(nid, { id: nid, label, kind: "scene", catg: "scene", scat: SCAT[e.kind], desc: `awareness: ${label}`, location: "" });
  }
  return nid;
};
// A clue class or an entity class -> its node.
const nodeOf = (ref: unknown) => {
  const clue = w.clueIdOf.get(ref);
  if (clue) return clueNode(clue);
  const e = entityByCtor.get(ref);
  if (e) return awareNode(e);
  throw new Error(`not a clue or entity: ${String(ref)}`);
};

for (const id of Object.keys(w.clues)) clueNode(id);

// ---------------------------------------------------------------- moves

interface MoveInfo {
  e: Loaded; id: string; move: Move;
  gives: string[];           // node ids
  required: string[];
  prompted: string[];
  skills: string[][];        // each inner list: any one of these cards
  dependsOn: Move[];         // earlier moves named in its conditions
}

const infos: MoveInfo[] = [];
const byMove = new Map<Move, MoveInfo>();

for (const e of w.entities) {
  if (e.stub) continue;
  for (const { table, id, move } of movesOf(e)) {
    const base = `${e.className}.${table}.${id}`;
    const s = move.spec;
    const info: MoveInfo = {
      e, id, move,
      gives: [...(s.narrative.gives.clues ?? []), ...(s.narrative.gives.aware ?? [])].map(nodeOf),
      required: [], prompted: (s.promptedBy ?? []).map(nodeOf), skills: [], dependsOn: [],
    };
    const codePaths: string[] = [];
    if (move instanceof Action) {
      for (const r of plainRequirements(move)) info.required.push(...[...(r.clues ?? []), ...(r.aware ?? [])].map(nodeOf));
      (move.spec.requires ?? []).forEach((r, i) => {
        if (r instanceof SkillRequirement) info.skills.push(r.skills.map((k) => k.name));
        codePaths.push(`${base}.requires[${i}].when`);
      });
    } else {
      const t = move.spec.target;
      info.required.push(...[...(t.clues ?? []), ...(t.aware ?? [])].map(nodeOf));
      for (const k of t.skills ?? []) info.skills.push([k.name]);
      codePaths.push(`${base}.trigger`, `${base}.target.when`);
    }
    for (const p of codePaths) {
      const c = a.code.get(p);
      if (!c) continue;
      if (c.skills.length) info.skills.push(c.skills.map(cardName));
      // me.knows(clues.X) in a condition: those clues are required too
      for (const name of c.clues) {
        const id = clueIdByClass.get(name);
        if (id) info.required.push(clueNode(id));
      }
      for (const d of c.moves) {
        const owner = entityByClass.get(d.className)?.instance as unknown as Record<string, Record<string, Move>>;
        const dep = owner?.[d.table]?.[d.move];
        if (dep) info.dependsOn.push(dep);
      }
    }
    infos.push(info);
    byMove.set(move, info);
  }
}

// A move gated on an earlier move hangs off what that move gave you, or, if it
// gave no clue, off whatever pointed at it.
for (const info of infos) {
  for (const dep of info.dependsOn) {
    const d = byMove.get(dep);
    if (!d) continue;
    info.required.push(...(d.gives.length ? d.gives : [...d.required, ...d.prompted]));
  }
}

// ---------------------------------------------------------------- links

const costText = (cost: Cost[]) =>
  cost.map((c) => ("time" in c ? `${c.time} card(s)` : "composure" in c ? `${c.composure} composure`
    : "card" in c ? `gives up ${c.card.name}`
    : `uses ${entityByCtor.get(c.item)?.instance.name ?? "item"}`)).join(" + ") || "Free";

const links: Record<string, unknown>[] = [];
for (const info of infos) {
  const { e, move } = info;
  const skillsText = info.skills.map((alts) => alts.join(" or ")).join(" and ");
  const gate = [skillsText, move instanceof Action ? costText(move.spec.cost) : ""].filter(Boolean).join("; ");
  const extra = [
    move.spec.narrative.gives.effects && "World State Change",
    move.spec.narrative.gives.items?.length && "Item",
  ].filter(Boolean);
  const common = {
    move: move.spec.label, mkind: move instanceof Opportunity ? "opportunity" : "action",
    scat: SCAT[e.kind], skill: info.skills[0]?.[0] ?? "", skills: skillsText,
    location: e.instance.id, gate, extra,
  };
  const sources = [
    ...[...new Set(info.required)].map((s) => [s, "hard"] as const),
    ...[...new Set(info.prompted)].filter((s) => !info.required.includes(s)).map((s) => [s, "soft"] as const),
  ];
  for (const [src, rel] of sources) {
    const style = rel === "hard" ? "hard" : move instanceof Opportunity ? "opp" : "soft";
    for (const tgt of new Set(info.gives)) {
      if (src !== tgt) links.push({ source: src, target: tgt, style, rel, ...common });
    }
  }
}

for (const [id, clue] of Object.entries(w.clues)) {
  for (const route of clue.synthesis) {
    for (const c of route) {
      links.push({
        source: nodeOf(c), target: clueNode(id), style: "synth", rel: "hard",
        move: `synthesis: ${id}`, mkind: "synthesis", scat: "other", skill: "", skills: "",
        location: "", gate: "", extra: [],
      });
    }
  }
}

// ---------------------------------------------------------------- write

const incoming = new Set(links.map((l) => l.target as string));
const payload = {
  nodes: [...nodes.values()],
  links,
  orphans: [...nodes.values()].filter((n) => !incoming.has(n.id)).map((n) => n.label),
  counts: { facts: Object.keys(w.clues).length, known: 0, moves: links.length },
};
const html = readFileSync(join(VIS, "clue_graph_template.html"), "utf-8")
  .replace("__DATA__", JSON.stringify(payload))
  .replace("<title>Kampania — clue graph", "<title>Kampania — world graph");
writeFileSync(join(VIS, "world_graph.html"), html);
console.log(`wrote world_graph.html: ${payload.nodes.length} nodes, ${links.length} edges, ` +
  `${payload.orphans.length} with no incoming edge`);
