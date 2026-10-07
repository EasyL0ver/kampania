// The AI arbiter: a player says what they do in plain language; the arbiter
// decides which action in the scene, if any, that is (leniently: paraphrases,
// synonyms and partial wording count), then the action is performed.
// Needs ANTHROPIC_API_KEY: from the environment, or world/.env (gitignored).

import Anthropic from "@anthropic-ai/sdk";
import { existsSync } from "node:fs";
import { logged } from "./log.ts";

const ENV = new URL("./.env", import.meta.url);
if (!process.env.ANTHROPIC_API_KEY && existsSync(ENV)) process.loadEnvFile(ENV);
import type { Action, Label, Player, World } from "./schema.ts";
import { deliverOpportunities, goTo } from "./scene.ts";
import type { Scene, SceneMove } from "./scene.ts";

const MODEL = "claude-haiku-4-5";

export interface Ruling {
  // The actions the line does, in the order it does them: usually one, at
  // times several ("I introduce myself and ask for the households"); none =
  // no action.
  actions: SceneMove<Action>[];
  reason: string;               // the arbiter's one-line why
}

const keyOf = (m: SceneMove<Action>) => `${m.source.id}/${m.id}`;

// A key not scoped to a workspace also needs ANTHROPIC_WORKSPACE_ID.
export const newClient = () => new Anthropic({
  defaultHeaders: process.env.ANTHROPIC_WORKSPACE_ID ? { "anthropic-workspace-id": process.env.ANTHROPIC_WORKSPACE_ID } : {},
});

// Which action in the scene does the player mean? `recent` (the last lines
// spoken) is context only, so a follow-up line can be read for what it asks.
// Whether a match continues the open scene is for the caller to decide.
export async function arbitrate(query: string, scene: Scene, recent: string[] = [], client = logged(newClient(), "arbiter")): Promise<Ruling> {
  if (!scene.actions.length) return { actions: [], reason: "There is nothing to do here." };
  const byKey = new Map(scene.actions.map((m) => [keyOf(m), m]));
  const list = scene.actions.map((m) => `- ${keyOf(m)}: "${m.move.spec.label}" (${m.source.name})`).join("\n");

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 300,
    system:
      "You are the arbiter of a tabletop RPG. A player describes what their character says or does. " +
      "List the listed actions the line does, in the order it does them. Usually one; several only when " +
      "the line clearly does several things (introduces themselves and asks for the households). " +
      "Be lenient: paraphrases, synonyms, partial or casual wording, and naming the person instead of the " +
      "deed all count when the intent is clearly that action. Do not stretch: if the player wants something " +
      "none of the actions covers, or it is only chatter, give an empty list. If several actions could fit " +
      "the same deed, pick the closest one.",
    messages: [{
      role: "user",
      content:
        (recent.length ? `What was just said (context):\n${recent.join("\n")}\n\n` : "") +
        `Actions available:\n${list}\n\nThe player says: ${query}`,
    }],
    tools: [{
      name: "rule",
      description: "Your ruling.",
      input_schema: {
        type: "object",
        properties: {
          actions: {
            type: "array",
            items: { type: "string", enum: [...byKey.keys()] },
            description: "The keys of the actions the line does, in order; empty for none.",
          },
          reason: { type: "string", description: "One short line: why." },
        },
        required: ["actions", "reason"],
      },
    }],
    tool_choice: { type: "tool", name: "rule" },
  });

  const call = res.content.find((b) => b.type === "tool_use");
  const input = (call?.input ?? {}) as { actions?: string[]; reason?: string };
  const actions = [...new Set(input.actions ?? [])].flatMap((k) => byKey.get(k) ?? []);
  return { actions, reason: input.reason ?? "" };
}

export interface Outcome {
  done: boolean;
  refused: Label[];           // the messages of the requirements not met
  noticed: Scene["noticed"];  // opportunities that opened up because of it
}

// One player performs an action: every requirement must hold, the cost is
// paid, and they receive what it gives. Then the scene is checked again for
// opportunities the action may have triggered.
export function perform(w: World, scene: Scene, me: Player, m: SceneMove<Action>): Outcome {
  const refused = (m.move.spec.requires ?? []).map((r) => r.check(w, me)).filter((x): x is Label => !!x);
  if (refused.length) return { done: false, refused, noticed: [] };

  for (const c of m.move.spec.cost) {
    if ("card" in c) me.cards = me.cards.filter((s) => s !== c.card);
    if ("item" in c) me.items = me.items.filter((i) => i !== c.item);
    // TODO: time and composure are not tracked on the player yet; not spent.
  }
  m.move.done = true;
  const { spec } = m.move;
  me.receive(w, spec.narrative.gives);
  const moved = me.location !== (scene.location.constructor as unknown as typeof me.location);
  if (!moved) {
    m.source.queue(me, "action", spec.label, spec.narrative);
    const noticed = deliverOpportunities(w, scene);
    scene.noticed.push(...noticed);
    return { done: true, refused: [], noticed };
  }
  // The action took them elsewhere: they arrive there now. The place is told
  // first, then the action's own narrative, then the people and what they
  // notice there.
  const there = goTo(w, me.location!, [me], () => m.source.queue(me, "action", spec.label, spec.narrative));
  return { done: true, refused: [], noticed: there.noticed };
}

// Say it, and if it is an action here, do it.
export async function act(w: World, scene: Scene, me: Player, query: string, client?: Anthropic) {
  const ruling = await arbitrate(query, scene, [], client);
  return { ruling, outcomes: ruling.actions.map((m) => perform(w, scene, me, m)) };
}
