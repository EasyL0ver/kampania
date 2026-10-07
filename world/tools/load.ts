// Discovers content files and instantiates every entity class.
// Shared by gen-ids, check and export.

import { existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { CharacterStub, EventStub, LocationStub } from "../schema.ts";
import type { Clue, Entity, Stub } from "../schema.ts";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const KINDS = ["characters", "locations", "events", "items"] as const;
export type Kind = (typeof KINDS)[number];

export interface Loaded {
  kind: Kind;
  ref: string;            // "characters/pawelek"
  key: string;            // "pawelek": the property on World
  file: string;           // "characters/pawelek.ts"
  className: string;      // "Pawelek"
  module: string;         // "./characters/pawelek.ts" (for generated imports)
  exportName: string;     // "default" or the named export
  instance: Entity | Stub;
  stub: boolean;
}

export interface World {
  entities: Loaded[];
  clues: Record<string, Clue>;          // id -> instance
  clueIdOf: Map<unknown, string>;      // clue class -> id
}

// "pawelek-falls-ill" -> "pawelekFallsIll"
export const worldKey = (id: string) => id.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());

type Ctor = new () => Entity | Stub;

export async function loadWorld(): Promise<World> {
  const entities: Loaded[] = [];
  for (const kind of KINDS) {
    // One file per entity, in the kind's folder or one subfolder below it
    // (characters/secondary/). The ref is kind/id either way.
    const files = readdirSync(join(ROOT, kind), { withFileTypes: true }).flatMap((d) =>
      d.isDirectory()
        ? readdirSync(join(ROOT, kind, d.name)).filter((f) => f.endsWith(".ts")).map((f) => `${d.name}/${f}`)
        : d.name.endsWith(".ts") ? [d.name] : []).sort();
    for (const name of files) {
      const mod = await import(pathToFileURL(join(ROOT, kind, name)).href);
      const cls = mod.default as Ctor;
      const instance = new cls() as Entity;
      entities.push({
        kind, ref: `${kind}/${instance.id}`, key: worldKey(instance.id),
        file: `${kind}/${name}`, className: cls.name,
        module: `./${kind}/${name}`, exportName: "default", instance, stub: false,
      });
    }
  }
  const stubFile = join(ROOT, "stubs.ts");
  const stubs = existsSync(stubFile) ? await import(pathToFileURL(stubFile).href) : {};
  for (const [exportName, cls] of Object.entries(stubs) as [string, Ctor][]) {
    const instance = new cls() as Stub;
    const kind: Kind =
      instance instanceof CharacterStub ? "characters" :
      instance instanceof LocationStub ? "locations" :
      instance instanceof EventStub ? "events" : "items";
    const id = instance.id;
    entities.push({
      kind, ref: `${kind}/${id}`, key: worldKey(id), file: "stubs.ts", className: cls.name,
      module: "./stubs.ts", exportName, instance, stub: true,
    });
  }
  const clueModule = await import(pathToFileURL(join(ROOT, "clues.ts")).href);
  const clues: Record<string, Clue> = {};
  const clueIdOf = new Map<unknown, string>();
  for (const cls of Object.values(clueModule) as (new () => Clue)[]) {
    const c = new cls();
    clues[c.id] = c;
    clueIdOf.set(cls, c.id);
  }
  return { entities, clues, clueIdOf };
}
