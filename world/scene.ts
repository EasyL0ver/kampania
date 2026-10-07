// Going to a location: the players move there (together or alone), get every
// opportunity there meant for them, and see everything they can do.
// Moves come from 1. the location, 2. the characters present (the location's
// and any running event's), 3. the events running there, 4. travel: going to
// any other location the players are aware of, 5. asking anyone present where
// a known person lives.
// Everything that happens to a player goes through Entity.invoke, so it lands
// in their narrative queue in the order it happened.

import { Character, Event, Location, Narrative, action, anyone } from "./schema.ts";
import type { Action, Entity, EntityRef, LocationRef, Opportunity, Player, World } from "./schema.ts";

export interface SceneMove<M> {
  source: Entity;    // whose move it is
  id: string;        // its key in the source's move table
  move: M;
}

export interface Scene {
  location: Location;
  players: Player[];     // the ones who moved here together
  // TODO: usually zero or one, but nothing stops two running at the same place
  // (the hunts); all of them are kept.
  events: Event[];
  characters: Character[];
  actions: SceneMove<Action>[];
  opportunities: SceneMove<Opportunity>[];
  // What each player noticed (for logs and tests; narration uses the queue).
  noticed: { player: Player; opportunity: SceneMove<Opportunity> }[];
}

// Delivers every opportunity in the scene that exists right now to each player
// it targets, once per player: it is invoked for them (they receive what it
// gives; it joins their narrative queue). Call it again after anything changes
// the world mid-scene (a new trigger may now hold).
export function deliverOpportunities(w: World, scene: Scene): Scene["noticed"] {
  const noticed: Scene["noticed"] = [];
  for (const o of scene.opportunities) {
    if (!o.move.isTriggered(w)) continue;
    for (const player of scene.players) {
      if (o.move.deliveredTo.has(player) || !o.move.isTarget(w, player)) continue;
      o.move.deliveredTo.add(player);
      o.move.done = true;
      o.source.invoke(w, player, "notice", o.move.spec.label, o.move.spec.narrative, o.move.spec.target !== anyone);
      noticed.push({ player, opportunity: o });
    }
  }
  return noticed;
}

// The live instance of an entity class.
export const instanceOf = <T>(w: World, ref: abstract new (...a: never[]) => T): T => {
  const found = Object.values(w).find((e) => e instanceof ref);
  if (!found) throw new Error(`${ref.name} is not in the world`);
  return found as T;
};

// The live instance behind any entity reference.
export const entityOf = (w: World, ref: EntityRef): Entity =>
  instanceOf(w, ref as unknown as abstract new () => Entity);

// Travel: "Go to <place>", one action per location, made once so it stays
// the same move. Costs the place's visit cost; the player is then there.
const travel = new Map<Location, Action>();
const travelTo = (l: Location): Action => {
  const made = travel.get(l) ?? action({
    label: `Go to ${l.name}`,
    cost: l.visitCost ? [{ time: l.visitCost }] : [],
    narrative: new Narrative({
      narration: [`You make your way to ${l.name}.`],
      gives: { effects: (_w, me) => { me.location = l.constructor as unknown as LocationRef; } },
    }),
  });
  travel.set(l, made);
  return made;
};

// Asking anyone present where a known person lives: "Ask where <name> lives",
// one action per person, made once. Gives awareness of their home.
// TODO: free for now; the rules say almost everything costs 1 card.
const directions = new Map<Character, Action>();
const askWhere = (c: Character, home: LocationRef): Action => {
  const made = directions.get(c) ?? action({
    label: `Ask where ${c.name} lives`,
    cost: [],
    narrative: new Narrative({
      narration: [`They tell you where ${c.name} lives.`],
      gives: { aware: [home] },
    }),
  });
  directions.set(c, made);
  return made;
};

// `afterEnter` runs for each player arriving, right after the place's own
// setup is queued: an action that brought them here queues its narrative
// there, so the narrator tells the place first, then what happens in it.
export function goTo(w: World, where: LocationRef, players: Player[], afterEnter?: (p: Player) => void): Scene {
  const location = instanceOf(w, where) as Location;
  const events = Object.values(w).filter(
    (e): e is Event => e instanceof Event && e.status === "running" && e.at(w) === where,
  );
  // Present: the location's people plus each event's, once each.
  const refs = [...new Set([...location.present(w), ...events.flatMap((e) => e.present(w))])];
  const characters = refs.map((r) => instanceOf(w, r) as Character);

  // Arriving: the place, what is happening there, and the people present
  // (their description: hook and look). Everything is invoked every time;
  // each player's narrative buffer skips what they have already been told,
  // so a place, an event or a person is told once: that is meeting them.
  // TODO: everyone present counts as met; a person only seen from afar
  // shouldn't introduce themselves.
  for (const p of players) {
    p.location = where;
    location.invoke(w, p, "enter", `Arriving at ${location.name}`, location.setup);
    afterEnter?.(p);
    for (const e of events) e.invoke(w, p, "event", e.name, e.setup);
    for (const c of characters) c.invoke(w, p, "meet", c.name, c.description);
  }

  const sources: Entity[] = [location, ...characters, ...events];
  const scene: Scene = {
    location,
    players,
    events,
    characters,
    actions: sources.flatMap((source) =>
      Object.entries(source.actions).map(([id, move]) => ({ source, id, move }))),
    opportunities: sources.flatMap((source) =>
      Object.entries(source.opportunities).map(([id, move]) => ({ source, id, move }))),
    noticed: [],
  };
  const elsewhere = Object.values(w).filter((e): e is Location =>
    e instanceof Location && e !== location && players.some((p) => p.isAware(e.constructor as unknown as EntityRef)));
  scene.actions.push(...elsewhere.map((l) => ({ source: l as Entity, id: "goTo", move: travelTo(l) })));
  // Someone here to ask, about a known person whose home isn't known yet.
  if (characters.length) {
    const askable = Object.values(w).filter((e): e is Character & { livesAt: LocationRef } =>
      e instanceof Character && !!e.livesAt && e.livesAt !== where &&
      players.some((p) => p.isAware(e.constructor as unknown as EntityRef) && !p.isAware(e.livesAt!)));
    scene.actions.push(...askable.map((c) => ({ source: c as Entity, id: "askWhereTheyLive", move: askWhere(c, c.livesAt) })));
  }
  scene.noticed = deliverOpportunities(w, scene);
  return scene;
}
