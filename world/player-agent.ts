// An AI player: an LLM that plays one Player. It is never handed clues or
// entities: like a real player it only hears the narrator (narrator.ts), and
// its memory is what it was told. The clue / awareness lists on Player are the
// GM's ledger, used for gating, not the player's notes.
//
// The narrator drives: everything that happens to the player (arriving, people
// met, actions, opportunities) lands in their narrative queue, and after each
// turn the narrator narrates the whole queue and hands the moment back. An action buys one
// short scene of the GM's attention, however many lines it runs: the arbiter
// matches each line to an action; the open scene's own action again means the
// scene continues at no cost, anything else ends it. Costs and refusals are
// fixed system lines.

import Anthropic from "@anthropic-ai/sdk";
import { arbitrate, newClient, perform } from "./arbiter.ts";
import { Narrator } from "./narrator.ts";
import { log, logged, say } from "./log.ts";
import { entityOf, goTo } from "./scene.ts";
import type { Scene, SceneMove } from "./scene.ts";
import type { Action, ClueRef, Cost, LocationRef, NarrativeEntry, Player, World } from "./schema.ts";

const MODEL = "claude-haiku-4-5";

const costText = (w: World, cost: Cost[]) =>
  cost.length
    ? cost.map((c) =>
        "time" in c ? `${c.time} time`
        : "composure" in c ? `${c.composure} composure`
        : "item" in c ? `giving up ${entityOf(w, c.item).name}`
        : `giving up your ${c.card.name} card for good`).join(", ")
    : "nothing";


// The last action this player paid for, and its facts. Matching it again
// continues its scene at no cost; lines that match nothing, or are refused,
// leave it as it is.
interface Running {
  action: SceneMove<Action>;
  facts: ClueRef[];
}

export class AIPlayer {
  readonly name: string;
  readonly player: Player;
  readonly persona: string;
  readonly client: Anthropic;
  readonly history: Anthropic.MessageParam[] = [];
  open?: Running;

  constructor(name: string, player: Player, persona = "", client?: Anthropic) {
    this.name = name;
    this.player = player;
    this.persona = persona;
    this.client = client ?? logged(newClient(), `player ${name}`);
  }

  // Who they are and what they physically have. Everything else they know is
  // in the conversation.
  private system(w: World): Anthropic.TextBlockParam[] {
    const p = this.player;
    return [{
      type: "text",
      text:
        `You are ${this.name}, a player in a tabletop RPG: a state committee doing a census and ` +
        `property assessment in a Bieszczady village, 1967, before a dam floods the valley. ${this.persona}\n` +
        "The GM describes what you see and hear and hands the moment to you. Answer in one or two sentences, " +
        "in character: say what you say or do. One thing at a time. You only know what the GM has told you.\n" +
        `Your cards: ${p.cards.map((c) => c.name).join(", ") || "none"}\n` +
        `Your items: ${p.items.map((i) => entityOf(w, i).name).join(", ") || "none"}`,
    }];
  }

  // The GM speaks (the player hears it with their next line).
  tell(gm: string): void {
    const last = this.history.at(-1);
    if (last?.role === "user" && typeof last.content === "string") last.content += `\n\n${gm}`;
    else this.history.push({ role: "user", content: gm });
  }

  // The player answers whatever the GM has said so far. The conversation is cached.
  async speak(w: World): Promise<string> {
    const messages = this.history.map((m, i) =>
      i === this.history.length - 1 && typeof m.content === "string"
        ? { ...m, content: [{ type: "text" as const, text: m.content, cache_control: { type: "ephemeral" as const } }] }
        : m);
    const res = await this.client.messages.create({ model: MODEL, max_tokens: 200, system: this.system(w), messages });
    const reply = res.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("").trim();
    this.history.push({ role: "assistant", content: reply });
    return reply;
  }

  // The last few lines of the conversation, for the narrator and arbiter.
  recent(n = 6): string[] {
    return this.history.slice(-n).map((m) => `${m.role === "user" ? "GM" : this.name}: ${typeof m.content === "string" ? m.content : ""}`);
  }
}

export interface StepLog {
  said: string;
  ruling: "continue" | "new" | "refused" | "none";
  action?: string;
  gm: string[];
}

const gmSays = (ai: AIPlayer, text: string) => {
  ai.tell(text);
  say("GM", text);
  log(`**GM:** ${text}`);
};

const logQueue = (entries: NarrativeEntry[]) => {
  if (entries.length) {
    log(`**queue:**\n${entries.map((e) => `- ${e.kind} ${e.source.id}: ${e.label}${e.private ? " (private)" : ""}`).join("\n")}`);
  }
  return entries;
};

// One exchange: anything already queued (arriving somewhere) is narrated, the
// player answers, the arbiter rules, and the narrator narrates the queue.
export async function step(w: World, scene: Scene, ai: AIPlayer, narrator: Narrator): Promise<StepLog> {
  const me = ai.player;
  log(`---\n## ${ai.name} @ ${scene.location.name}${ai.open ? ` — last action "${ai.open.action.move.spec.label}"` : ""}\n` +
    `- events: ${scene.events.map((e) => e.name).join(", ") || "none"}\n` +
    `- present: ${scene.characters.map((c) => c.name).join(", ") || "nobody"}\n` +
    `- player: cards ${me.cards.map((c) => c.name).join(", ")}; clues ${me.clues.map((c) => c.name).join(", ") || "none"}; ` +
    `aware ${me.aware.map((r) => r.name).join(", ") || "none"}; items ${me.items.map((i) => i.name).join(", ") || "none"}`);

  if (me.narratives.length) {
    gmSays(ai, await narrator.narrate(w, scene, me, { entries: logQueue(me.narratives.drain()) }, ai.recent()));
  }
  const said = await ai.speak(w);
  say(ai.name, said);

  const ruling = await arbitrate(said, scene, ai.recent(4));
  const open = ai.open;
  const isOpen = (m: SceneMove<Action>) => !!open && m.move === open.action.move;
  log(`**${ai.name}:** ${said}\n\n**arbiter:** ${ruling.actions.length
    ? ruling.actions.map((m) => `${isOpen(m) ? "continue" : "new"} ${m.source.id}/${m.id} "${m.move.spec.label}"`).join(", ")
    : "none"} — ${ruling.reason}`);

  // Work through the line's actions in order. The open scene's own action
  // continues it for free; a refused one is a fixed line; the rest are paid
  // and performed (their narratives land in the queue).
  const lines: string[] = [];
  const kinds: StepLog["ruling"][] = [];
  let continuing: { label: string; facts: ClueRef[] } | undefined;
  let here = scene;
  for (const m of ruling.actions) {
    const label = m.move.spec.label;
    if (isOpen(m)) {
      continuing = { label, facts: open!.facts };
      kinds.push("continue");
      continue;
    }
    const refused = (m.move.spec.requires ?? []).map((r) => r.check(w, me)).filter((x): x is string => !!x);
    if (refused.length) {
      lines.push(`(Can't: ${label}. ${refused.join(" ")})`);
      kinds.push("refused");
      continue;
    }
    perform(w, here, me, m);
    lines.push(`(${label}: spent ${costText(w, m.move.spec.cost)}.)`);
    log(`**performed:** ${label}`);
    kinds.push("new");
    // The scene as it is now (they may have moved, people may have come).
    here = goTo(w, me.location ?? (here.location.constructor as unknown as LocationRef), [me]);
    // Travel is over once they are there; anything else opens a short scene.
    ai.open = m.id === "goTo" ? undefined : { action: m, facts: m.move.spec.narrative.gives.clues ?? [] };
  }

  // One narration for everything that happened, unless all of it was refused.
  const entries = logQueue(me.narratives.drain());
  const allRefused = kinds.length > 0 && kinds.every((k) => k === "refused");
  const story = allRefused && !entries.length
    ? ""
    : await narrator.narrate(w, here, me, { said, continuing, entries }, ai.recent());
  gmSays(ai, [...lines, story].filter(Boolean).join("\n\n"));

  const ruled: StepLog["ruling"] = !kinds.length ? "none"
    : kinds.includes("new") ? "new"
    : kinds.includes("continue") ? "continue"
    : "refused";
  return { said, ruling: ruled, action: ruling.actions.map((m) => m.move.spec.label).join(" + ") || undefined, gm: [...lines, story].filter(Boolean) };
}
