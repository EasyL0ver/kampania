// The narrator: an LLM dungeon master. The mechanics decide WHAT happens (the
// arbiter's ruling, requirements, what a move gives); the narrator decides how
// it sounds. After the player's turn it takes the player's narrative queue
// (everything invoked for them, in order: arriving, people met, the action,
// what they noticed) and narrates all of it in one reply, conveying each clue
// through what people say and do, and adding no facts of its own.
// It sees only the scene, all from code: where it is (setup), what is
// happening there (setup), and the people present (their description: hook
// and look). It reads no prose. Nobody and nothing else exists for it.
//
// The prompt is cached in layers, cheapest-changing first (the API caches
// exact prefixes):
//   1 rules   never changes
//   2 scene   where, what is happening, who is present; changes when they move
//   3 beat    this call: what the player said, the queue, what to let out

import Anthropic from "@anthropic-ai/sdk";
import { newClient } from "./arbiter.ts";
import { logged } from "./log.ts";
import { entityOf } from "./scene.ts";
import type { Scene } from "./scene.ts";
import { Entity, Event, Item, Location } from "./schema.ts";
import type { Clue, ClueRef, EntityRef, Label, NarrativeEntry, Player, World } from "./schema.ts";

const MODEL = "claude-sonnet-5-5";

// Clue text is written for the repo: drop links and comments.
const plain = (s: string) =>
  s.replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^Gives \(original\):.*$/gm, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
const clueText = (c: ClueRef) => plain((new (c as unknown as new () => Clue)()).text);

// What the narrator voices this time.
export interface Beat {
  said?: string;                 // the player's words, if they spoke
  // A short scene already under way: the player's line continues it.
  continuing?: { label: Label; facts: ClueRef[] };
  entries: NarrativeEntry[];     // the player's narrative queue, in order
}

const RULES = `You are the game master of a tabletop RPG set in 1967 in the Bieszczady mountains, Poland: a state committee is doing a census and property assessment in a village before a dam floods the valley.

You voice what the rules decided; you never decide outcomes yourself.

HOW THE PROMPT IS LAID OUT
- SCENE: where this happens, what is happening, and the people present: who they are and how they look.
- BEAT: what the player said, and WHAT HAPPENS: everything that just happened to them, in order.

STYLE
- English, second person, present tense. No Polish sentences (names and titles only).
- Short: about two sentences per item in WHAT HAPPENS; 1-2 sentences when nothing happens.
- You drive the scene. End by handing the moment back to the player: someone waits on their answer, or ask plainly what they do. Never suggest what to do.
- Never mention rules, clues, cards, actions or costs. Never comment on what someone did not say or do.

WHAT HAPPENS
- Narrate every item, in the order given, as one flowing reply.
- ARRIVING: set the scene from where they stand, from the SCENE.
- MEETING: the person comes into view and is introduced: their name and public role (the hook), and how they look and sound.
- ACTION and anything else: get every NARRATION line across, in your own words, adding nothing.
- CONVEYS: facts the player must be able to work out from what people say, do, or what is seen. Show, don't state.
- MAKES KNOWN: make each one known, true to its description (who it is, where it is).
- PRIVATE items are this player's own perception, from their skill: give each its own sentence, framed as what they in particular pick up ("you catch…", "to your eye…"), not as scenery everyone sees.
- SCENE IN PROGRESS: the player's line continues a conversation or deed already under way. Answer it within that scene; its facts may come out further, but don't repeat what RECENTLY shows has already come across.
- When nothing happens, people deflect, keep it short, or make small talk about the weather, the road, the work. No history, no rumours, no relatives, no leads, no hints.

YOU KNOW ONLY WHAT YOU ARE GIVEN
- Never contradict the SCENE (who people are, how they look and sound).
- You know nothing beyond the SCENE and the BEAT. Asked about anyone or anything else, people don't know, shrug, or change the subject. Never make up names, places, relations or history.

THE SCENE IS FIXED
- Everyone stays where the scene is. Nobody leads the player anywhere else, nobody arrives, nobody leaves.
- Only the people under PRESENT exist here. Mention no one who is not present.
- A present person not listed under INTRODUCED must not be named: describe them ("a young woman with a child"). Name only introduced people.
- The player knows only what they have been told in RECENTLY and in this beat. Never tell them what they "know" or "have seen" beyond that.`;

const CACHED = { type: "ephemeral" } as const;

const KIND: Record<NarrativeEntry["kind"], string> = {
  enter: "ARRIVING", event: "HAPPENING", meet: "MEETING", action: "ACTION", notice: "NOTICED",
};

export class Narrator {
  readonly client: Anthropic;
  readonly model: string;
  constructor(client = logged(newClient(), "narrator"), model = MODEL) {
    this.client = client;
    this.model = model;
  }

  // Layer 2: the scene and nothing else. Same text while the player stays in
  // the same scene, so it is cached between their lines.
  private scene(scene: Scene): string {
    const setup = (e: Location | Event) => e.setup.narration.map((x) => `- ${x}`).join("\n");
    const people = scene.characters.map((c) => {
      const d = c.description;
      const look = [d.clothes, d.hairAndFace, d.carriage].filter(Boolean).join(". ");
      return `### ${c.id}\n${c.name}, ${c.role}\nHook: ${c.hook}\nLooks: ${look || "(not described)"}`;
    });
    return [
      "# SCENE",
      `## WHERE: ${scene.location.name}. ${scene.location.hook}\n${setup(scene.location)}`,
      ...scene.events.map((e) => `## HAPPENING: ${e.name}\n${setup(e)}`),
      `## PRESENT\n\n${people.join("\n\n") || "Nobody in particular."}`,
    ].join("\n\n");
  }

  // One item of WHAT HAPPENS.
  private item(w: World, n: number, e: NarrativeEntry): string {
    const g = e.narrative.gives;
    const out = [`${n}. ${KIND[e.kind]}: ${e.label}${e.private ? " (PRIVATE: only this player perceives it)" : ""}`];
    if (e.narrative.narration.length) out.push(`   NARRATION:\n${e.narrative.narration.map((l) => `   - ${l}`).join("\n")}`);
    if (g.clues?.length) out.push(`   CONVEYS:\n${g.clues.map((c) => `   - ${clueText(c)}`).join("\n")}`);
    const known = (g.aware ?? []).filter((r) => r !== (e.source.constructor as unknown as EntityRef));
    if (known.length) out.push(`   MAKES KNOWN:\n${known.map((r) => { const x = entityOf(w, r); return `   - ${x.name}: ${x.hook}`; }).join("\n")}`);
    if (g.items?.length) {
      out.push(`   THEY NOW HAVE:\n${g.items.map((i) => {
        const item = entityOf(w, i) as Item;
        return `   - ${item.name}:\n${item.description.narration.map((l) => `     ${l}`).join("\n")}`;
      }).join("\n")}`);
    }
    return out.join("\n");
  }

  async narrate(w: World, scene: Scene, me: Player, beat: Beat, recent: string[] = []): Promise<string> {
    // Met in person, not merely known of.
    const introduced = scene.characters.filter((c) => me.narratives.hasTold(c.description)).map((c) => c.id);
    const happens = beat.entries.map((e, i) => this.item(w, i + 1, e));

    // Layer 3: this beat.
    const now = [
      "# BEAT",
      `INTRODUCED: ${introduced.join(", ") || "nobody yet"}`,
      `THE PLAYER holds the cards: ${me.cards.map((c) => c.name).join(", ") || "none"}.`,
      recent.length ? `RECENTLY:\n${recent.join("\n")}` : "RECENTLY: nothing; this is the start.",
      beat.said ? `THE PLAYER SAYS/DOES: ${beat.said}` : "",
      beat.continuing
        ? `SCENE IN PROGRESS: "${beat.continuing.label}". The player's line continues it.` +
          (beat.continuing.facts.length ? `\nITS FACTS:\n${beat.continuing.facts.map((f) => `- ${clueText(f)}`).join("\n")}` : "")
        : "",
      happens.length
        ? `WHAT HAPPENS (narrate all of it, in this order):\n${happens.join("\n")}`
        : beat.continuing ? "" : "WHAT HAPPENS: nothing; nothing new is learned.",
    ].filter(Boolean).join("\n\n");

    const res = await this.client.messages.create({
      model: this.model,
      max_tokens: 700,
      // this model thinks by default; "between_tools" = answer straight away
      thinking: { type: "between_tools" } as unknown as Anthropic.ThinkingConfigParam,
      system: [
        { type: "text", text: RULES, cache_control: CACHED },           // 1 rules
      ],
      messages: [{
        role: "user",
        content: [
          { type: "text", text: this.scene(scene), cache_control: CACHED },  // 2 scene
          { type: "text", text: now },                                       // 3 beat
        ],
      }],
    });
    return res.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("").trim();
  }
}
