// Session logs in world/logs/ (gitignored), two per session:
//   <timestamp>.md         everything: game state, rulings, and every model
//                          call in full (system prompt, messages, reply)
//   <timestamp>.table.md   only what would be said over the table

import { appendFileSync, mkdirSync } from "node:fs";
import type Anthropic from "@anthropic-ai/sdk";

const DIR = new URL("./logs/", import.meta.url);
mkdirSync(DIR, { recursive: true });
export const LOG_FILE = new URL(`${new Date().toISOString().replace(/[:.]/g, "-")}.md`, DIR);

export function log(text: string): void {
  appendFileSync(LOG_FILE, `${text}\n\n`);
}

// The human-readable twin: only what would be said over the table.
export const TABLE_FILE = new URL(LOG_FILE.href.replace(/\.md$/, ".table.md"));

export function say(who: string, text: string): void {
  appendFileSync(TABLE_FILE, `**${who}:** ${text}\n\n`);
}

const fence = (s: string) => "````\n" + s + "\n````";

const textOf = (content: unknown): string =>
  typeof content === "string" ? content
  : Array.isArray(content) ? content.map((b) =>
      b.type === "text" ? b.text : b.type === "tool_use" ? `[tool ${b.name}] ${JSON.stringify(b.input)}` : `[${b.type}]`).join("\n")
  : JSON.stringify(content);

// The same client, with every messages.create written to the log.
export function logged(client: Anthropic, who: string): Anthropic {
  const create = client.messages.create.bind(client.messages);
  const wrapped = async (params: Anthropic.MessageCreateParamsNonStreaming) => {
    const res = await create(params);
    log([
      `<details><summary>🤖 <b>${who}</b> — ${params.model}, ${res.usage.input_tokens} in` +
        ` + ${res.usage.cache_read_input_tokens ?? 0} cache read + ${res.usage.cache_creation_input_tokens ?? 0} cache write` +
        ` / ${res.usage.output_tokens} out</summary>\n`,
      `**system**\n${fence(textOf(params.system ?? ""))}`,
      ...params.messages.map((m) => `**${m.role}**\n${fence(textOf(m.content))}`),
      params.tools ? `**tools**\n${fence(JSON.stringify(params.tools, null, 2))}` : "",
      `**reply**\n${fence(textOf(res.content))}`,
      "</details>",
    ].filter(Boolean).join("\n\n"));
    return res;
  };
  return new Proxy(client, {
    get: (t, k) => k === "messages" ? new Proxy(t.messages, { get: (m, j) => j === "create" ? wrapped : Reflect.get(m, j) }) : Reflect.get(t, k),
  });
}
