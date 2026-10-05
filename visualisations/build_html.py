#!/usr/bin/env python3
"""Render the clue graph as a self-contained, offline interactive HTML.

Model:
  - A NODE is a clue: either a fact (clues.md) or the existence of a scene
    (a place, person, item, or event is a clue in itself).
  - An EDGE is a move (an action or opportunity). It runs FROM the clue that
    makes the move discoverable TO the clue the move yields.
  - Moves are gated by ABILITIES (skill cards) and cost, not by clues. The
    skill/cost is the real requirement, shown as the edge label. The source
    clue is only soft "what would lead you here" logic, not a hard gate.
  - Loose is fine: a move with no known source clue hangs off its scene's
    existence clue; scenes known from the start are roots.

Sources for a move's edge:
  - if the move lists prerequisite clues -> those clues (authored "leads to")
  - else -> the existence clue of the scene the move lives in
Scene-unlock outcomes add an edge from the source to the unlocked scene's
existence clue (learning a place exists).

No installs, no CDN: open the file in a browser.
"""

from __future__ import annotations

import json
from pathlib import Path

import clue_graph as cg

OUT = Path(__file__).resolve().parent / "clue_graph.html"


def build_payload() -> dict:
    g = cg.build_graph()

    nodes = {}   # id -> node dict
    links = []

    def add_fact(cid: str):
        nid = f"clue:{cid}"
        if nid not in nodes:
            if cid.startswith("awareness:"):
                relpath = cid.split(":", 1)[1]
                folder = Path(relpath).parent.name
                scat = {"characters": "character", "locations": "location",
                        "events": "event", "items": "item"}.get(folder, "other")
                title = g.scenes[relpath].title if relpath in g.scenes else relpath
                nodes[nid] = {"id": nid, "label": title, "kind": "scene",
                              "catg": "scene", "scat": scat,
                              "desc": g.clues.get(cid, ""), "location": ""}
            else:
                nodes[nid] = {"id": nid, "label": cid, "kind": "clue",
                              "desc": g.clues.get(cid, ""), "location": ""}
        return nid

    def add_known(npc: str, cid: str):
        key = f"{npc}: {cid}"
        nid = f"known:{key}"
        if nid not in nodes:
            nodes[nid] = {"id": nid, "label": key, "kind": "known", "npc": npc,
                          "desc": g.clues.get(cid, ""), "location": ""}
        return nid

    # every fact is a node, so unwired clues show as isolated (honest orphans)
    for cid in g.clues:
        add_fact(cid)

    def prim_skill(n):
        if n.requires_skills:
            return n.requires_skills[0]
        if n.branch_skills:
            return n.branch_skills[0]
        return ""

    for n in g.nodes.values():
        outputs = ([("clue", c) for c in n.gives_clues]
                   + [("known", (npc, c)) for npc, c in n.gives_known])
        if not outputs:
            continue
        loc = Path(n.scene).stem if n.scene else ""
        folder = Path(n.scene).parent.name if n.scene else ""
        scat = {"characters": "character", "locations": "location",
                "events": "event", "items": "item"}.get(folder, "other")
        if n.requires_skills:
            skills = "/".join(n.requires_skills)
        elif n.branch_skills:
            skills = "(" + "/".join(n.branch_skills) + ")"
        else:
            skills = ""
        skill = prim_skill(n)
        gate = []
        if n.requires_skills:
            gate.append("ability: " + "/".join(n.requires_skills))
        if n.branch_skills:
            gate.append("ability (branch): " + "/".join(n.branch_skills))
        if n.cost:
            gate.append(n.cost)
        gate_s = "; ".join(gate)

        # hard prerequisites are ANDed together (all required for the conclusion);
        # soft "prompted by" leads are ORed (any one might point you here)
        hard = [c for c in n.requires_clues if c in g.clues]
        hard_known = [(npc, c) for npc, c in n.requires_known]
        soft = [c for c in n.prompted_by_clues if c in g.clues and c not in hard]

        hard_ids = [add_fact(c) for c in hard] + [add_known(npc, c) for npc, c in hard_known]
        soft_ids = [add_fact(c) for c in soft]

        # DIRECT edges only: prompt clue -> given clue. no helper node. the scene
        # file is a LABEL on the line, not a node. one give = one line, so a move
        # with several gives fans out into several separate lines from the source.
        # a seedless move (no prompt) draws nothing; its gives stay orphaned (fine).
        # line style is per source: opportunity=dotted, seeded=dashed, hard=solid.
        source_ids = [(hid, "hard") for hid in hard_ids] + [(sid, "soft") for sid in soft_ids]
        target_ids = [add_fact(val) if kind == "clue" else add_known(*val)
                      for kind, val in outputs]
        for sid, rel in source_ids:
            if rel == "hard":
                estyle = "hard"
            elif n.kind == "opportunity":
                estyle = "opp"
            elif n.kind == "synthesis":
                estyle = "synth"
            else:
                estyle = rel  # soft=dashed
            for tgt in target_ids:
                if sid == tgt:
                    continue
                links.append({"source": sid, "target": tgt, "move": n.name,
                              "mkind": n.kind, "scat": scat, "skill": skill, "skills": skills,
                              "location": loc, "gate": gate_s, "style": estyle,
                              "extra": n.gives_other, "rel": rel})

    incoming = {nid: 0 for nid in nodes}
    for l in links:
        incoming[l["target"]] = incoming.get(l["target"], 0) + 1
    orphan_facts = [n["label"] for nid, n in nodes.items()
                    if n["kind"] in ("clue", "scene") and incoming.get(nid, 0) == 0]

    return {
        "nodes": list(nodes.values()),
        "links": links,
        "orphans": orphan_facts,
        "counts": {
            "facts": len(g.clues),
            "known": sum(1 for n in nodes.values() if n["kind"] == "known"),
            "moves": len(links),
        },
    }


# Shared with world/tools/graph.ts; __DATA__ is replaced with the payload.
HTML = (Path(__file__).resolve().parent / "clue_graph_template.html").read_text(encoding="utf-8")


def main():
    payload = build_payload()
    html = HTML.replace("__DATA__", json.dumps(payload, ensure_ascii=False))
    OUT.write_text(html, encoding="utf-8")
    c = payload["counts"]
    print(f"wrote {OUT}")
    print(f"  {c['facts']} facts, {c['known']} known, "
          f"{c['moves']} move-edges, {len(payload['orphans'])} orphan facts")


if __name__ == "__main__":
    main()
