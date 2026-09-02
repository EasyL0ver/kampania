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
            estyle = "opp" if n.kind == "opportunity" else rel  # hard=solid / soft=dashed
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
                    if n["kind"] == "clue" and incoming.get(nid, 0) == 0]

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


HTML = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>Kampania — clue graph</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin:0; font:13px/1.4 system-ui, sans-serif; background:#0f1115; color:#d7dbe0; height:100vh; display:flex; }
  #side { width:320px; flex:0 0 320px; border-right:1px solid #232733; display:flex; flex-direction:column; }
  #side h1 { font-size:14px; margin:12px 14px 4px; }
  #stats { margin:0 14px 8px; color:#8b93a1; font-size:11px; }
  #search { margin:6px 14px; padding:7px 9px; background:#1a1e27; border:1px solid #2a2f3c; color:#d7dbe0; border-radius:6px; }
  #list { overflow:auto; flex:1; padding:2px 6px 12px; }
  .row { padding:5px 8px; border-radius:5px; cursor:pointer; display:flex; justify-content:space-between; gap:8px; }
  .row:hover { background:#1a1e27; }
  .row.on { background:#243044; }
  .row .n { color:#5b6472; font-variant-numeric:tabular-nums; }
  .row.orphan .lbl { color:#8b6f4a; }
  .row.scene .lbl { color:#b08bd8; }
  #main { flex:1; position:relative; }
  svg { width:100%; height:100%; display:block; }
  #hint { position:absolute; top:10px; left:12px; color:#6b7280; font-size:11px; pointer-events:none; }
  #reset { position:absolute; top:8px; right:12px; padding:5px 10px; background:#1a1e27; border:1px solid #2a2f3c; color:#a7b0bd; border-radius:6px; cursor:pointer; }
  .link { fill:none; stroke:#5b6472; }
  .link.soft { stroke-dasharray:4 4; opacity:.8; }
  .link.opp  { stroke-dasharray:1.5 3.5; opacity:.85; }
  .hit { stroke:transparent; stroke-width:10; fill:none; cursor:pointer; }
  .node circle, .node rect, .node polygon { stroke:#0f1115; stroke-width:1.5; }
  .node text { fill:#c2c8d2; font-size:10px; pointer-events:none; }
  .node.dim { opacity:.07; }
  .link.dim { opacity:.04; }
  .elabel.dim { opacity:.04; }
  .elabel { fill:#9aa3b0; font-size:9px; pointer-events:none; }
  .node text.mv { fill:#aeb6c2; font-size:8px; pointer-events:none; }
  .legend { position:absolute; bottom:10px; left:12px; right:12px; font-size:11px; color:#8b93a1; background:rgba(15,17,21,.72); padding:4px 6px; border-radius:6px; }
  .legend span { display:inline-block; margin-right:12px; }
  .sw { display:inline-block; width:10px; height:10px; border-radius:2px; vertical-align:middle; margin-right:4px; }
  .swl { display:inline-block; width:14px; height:0; border-top:2px solid; vertical-align:middle; margin-right:4px; }
  #tip { position:absolute; pointer-events:none; background:#181c24; border:1px solid #2a2f3c; padding:6px 8px; border-radius:6px; max-width:300px; font-size:11px; display:none; z-index:5; }
  #tip b { color:#e6eaf0; } #tip .g { color:#8b93a1; }
</style>
</head>
<body>
<div id="side">
  <h1>Clue graph</h1>
  <div id="stats"></div>
  <input id="search" placeholder="Filter clues / scenes…" autocomplete="off"/>
  <div id="list"></div>
</div>
<div id="main">
  <button id="reset">Show all</button>
  <div id="hint">Node = clue (fact, or a clue known by an NPC). Edge = a move (gated by an ability) that yields a clue. Click a clue to isolate the moves that lead to it.</div>
  <svg></svg>
  <div id="legend" class="legend"></div>
  <div id="tip"></div>
</div>
<script>
const DATA = __DATA__;
const orphan = new Set(DATA.orphans);
const NSx = "http://www.w3.org/2000/svg";

// node type -> colour + shape
const TYPE = {
  clue:       {color:"#6ea8fe", shape:"circle",   label:"fact clue"},
  orphan:     {color:"#8b6f4a", shape:"circle",   label:"orphan clue"},
  known:      {color:"#e6b34d", shape:"circle",   label:"clue (NPC knows)"},
  move:       {color:"#7d8695", shape:"dot",      label:"move (join / split)"},
};
// scene file category (kept for node fill tint of move helpers is by skill; scat only in tooltip)
const SCAT = {
  character:"#d16a8f", location:"#3fa7a1", event:"#9b7ede", item:"#d99a3f", other:"#5b6472"
};
// gated skill -> edge / move-node colour
const SKILL = {
  Empathy:"#e15c6e", Finesse:"#6ea8fe", Culture:"#b98cff", Survival:"#6bbf59",
  Violence:"#d1495b", Medicine:"#4ec9b0", Devotion:"#e6b34d", Language:"#f08a5d",
  Handiwork:"#c9a66b", Bureaucracy:"#8894a8", Chainsmoker:"#9b7ede", Speech:"#f4d35e",
  Geology:"#b5651d", History:"#7fb069", Physique:"#e07a5f", Alcoholic:"#c06c84",
  Superstitious:"#a3c4bc"
};
const NOSKILL="#5b6472";
function skillColor(s){ return SKILL[s] || NOSKILL; }
function typeOf(n){ if(n.kind==="move") return "move"; if(n.kind==="known") return "known"; if(n.kind==="clue") return orphan.has(n.label)?"orphan":"clue"; return n.catg; }
function makeShape(t, s){
  const c=TYPE[t]||TYPE.clue; const NS=NSx; let e;
  if(c.shape==="circle"){ e=document.createElementNS(NS,"circle"); e.setAttribute("r",9*s); }
  else if(c.shape==="dot"){ e=document.createElementNS(NS,"circle"); e.setAttribute("r",4.5*s);
    e.style.fill="#0f1115"; e.style.stroke=c.color; e.style.strokeWidth=(2*s)+"px"; return e; }
  else if(c.shape==="square"){ e=document.createElementNS(NS,"rect"); const w=12*s; e.setAttribute("x",-w/2); e.setAttribute("y",-w/2); e.setAttribute("width",w); e.setAttribute("height",w); e.setAttribute("rx",2); }
  else if(c.shape==="triangle"){ e=document.createElementNS(NS,"polygon"); e.setAttribute("points",`0,${-8*s} ${7*s},${6*s} ${-7*s},${6*s}`); }
  else if(c.shape==="diamond"){ e=document.createElementNS(NS,"polygon"); e.setAttribute("points",`0,${-8*s} ${8*s},0 0,${8*s} ${-8*s},0`); }
  else if(c.shape==="hex"){ e=document.createElementNS(NS,"polygon"); e.setAttribute("points",`${6*s},${-3.5*s} ${6*s},${3.5*s} 0,${7*s} ${-6*s},${3.5*s} ${-6*s},${-3.5*s} 0,${-7*s}`); }
  e.setAttribute("fill",c.color);
  return e;
}

const svg = document.querySelector("svg");
const NS = "http://www.w3.org/2000/svg";
let W = svg.clientWidth, H = svg.clientHeight;
const nodes = DATA.nodes.map(n=>({...n, x:Math.random()*W, y:Math.random()*H, vx:0, vy:0}));
const nmap = new Map(nodes.map(n=>[n.id,n]));
const links = DATA.links.map(l=>({...l, source:nmap.get(l.source), target:nmap.get(l.target)}));

// backward chain: what leads TO a node
const incoming = new Map(); nodes.forEach(n=>incoming.set(n.id,[]));
links.forEach((l,i)=>incoming.get(l.target.id).push(i));

// node degree drives how much space it claims: busy nodes repel harder and push
// their spokes longer, so high-connection clues get room instead of crowding.
nodes.forEach(n=>n.deg=0);
links.forEach(l=>{ l.source.deg++; l.target.deg++; });
nodes.forEach(n=>n.charge=1+Math.sqrt(n.deg)*0.8);
function chain(rootId){
  const keepN=new Set(), keepL=new Set(), stack=[rootId], seen=new Set();
  while(stack.length){
    const id=stack.pop(); if(seen.has(id))continue; seen.add(id); keepN.add(id);
    for(const li of incoming.get(id)){ keepL.add(li); const s=links[li].source.id; keepN.add(s); if(!seen.has(s)) stack.push(s); }
  }
  return {keepN,keepL};
}

const gRoot=document.createElementNS(NS,"g"); svg.appendChild(gRoot);
const gLinks=document.createElementNS(NS,"g"); gRoot.appendChild(gLinks);
const gLbl=document.createElementNS(NS,"g"); gRoot.appendChild(gLbl);
const gNodes=document.createElementNS(NS,"g"); gRoot.appendChild(gNodes);

svg.insertAdjacentHTML("afterbegin",
 '<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="context-stroke"/></marker></defs>');

links.forEach(l=>{
  const p=document.createElementNS(NS,"path"); p.setAttribute("class","link "+(l.style||"hard"));
  p.style.stroke=skillColor(l.skill);
  p.setAttribute("marker-end","url(#arr)"); l._el=p; gLinks.appendChild(p);
  const hit=document.createElementNS(NS,"path"); hit.setAttribute("class","hit"); l._hit=hit; gLinks.appendChild(hit);
  hit.addEventListener("mouseenter",e=>showEdgeTip(l,e));
  hit.addEventListener("mousemove",moveTip); hit.addEventListener("mouseleave",hideTip);
  // scene file is a LABEL on the line (coloured by scene type), not a node
  if(l.location){
    const lb=document.createElementNS(NS,"text"); lb.setAttribute("class","elabel");
    lb.setAttribute("text-anchor","middle"); lb.style.fill=SCAT[l.scat]||"#9aa3b0";
    lb.textContent=l.location; l._lb=lb; gLbl.appendChild(lb);
  }
});

// each edge label is a layout particle: it springs to its edge midpoint but
// repels other labels, so labels take up space and stop overlapping.
const labels = links.filter(l=>l._lb).map(l=>{
  const mx=(l.source.x+l.target.x)/2, my=(l.source.y+l.target.y)/2;
  const o={link:l, w:(l.location.length*5), x:mx,y:my,vx:0,vy:0};
  o.hw=o.w/2; l._lp=o; return o;
});

nodes.forEach(n=>{
  const g=document.createElementNS(NS,"g"); g.setAttribute("class","node");
  if(n.kind==="move"){
    // helper node: pill coloured by scene TYPE, edges coloured by skill
    const col=SCAT[n.scat] || "#5b6472";
    const txt=(n.label||"?"); const disp=txt.length>18?txt.slice(0,17)+"…":txt;
    const w=Math.max(20, disp.length*5.2+8);
    const r=document.createElementNS(NS,"rect"); r.setAttribute("x",-w/2); r.setAttribute("y",-8);
    r.setAttribute("width",w); r.setAttribute("height",16); r.setAttribute("rx",8);
    r.style.fill=col+"33"; r.style.stroke=col; r.style.strokeWidth="1.5px"; g.appendChild(r);
    const t=document.createElementNS(NS,"text"); t.setAttribute("class","mv");
    t.style.fill=col;
    t.setAttribute("text-anchor","middle"); t.setAttribute("y",2.5); t.textContent=disp; g.appendChild(t);
  } else {
    const shp=makeShape(typeOf(n), 1); g.appendChild(shp);
    const t=document.createElementNS(NS,"text"); t.setAttribute("x",13); t.setAttribute("y",3);
    t.textContent=n.label.length>28?n.label.slice(0,27)+"…":n.label; g.appendChild(t);
  }
  n._el=g;
  g.addEventListener("mouseenter",e=>showNodeTip(n,e));
  g.addEventListener("mousemove",moveTip); g.addEventListener("mouseleave",hideTip);
  g.addEventListener("click",()=>focus(n.id));
  gNodes.appendChild(g);
});

function tick(){
  const K=9500;
  for(let i=0;i<nodes.length;i++){ const a=nodes[i];
    for(let j=i+1;j<nodes.length;j++){ const b=nodes[j];
      let dx=a.x-b.x,dy=a.y-b.y,d2=dx*dx+dy*dy+.01; const f=K*a.charge*b.charge/d2,d=Math.sqrt(d2);
      const fx=f*dx/d,fy=f*dy/d; a.vx+=fx;a.vy+=fy;b.vx-=fx;b.vy-=fy; } }
  for(const l of links){ const a=l.source,b=l.target;
    let dx=b.x-a.x,dy=b.y-a.y,d=Math.sqrt(dx*dx+dy*dy)+.01;
    const rest=Math.min(300, 100+(a.deg+b.deg)*6); const f=(d-rest)*0.02,fx=f*dx/d,fy=f*dy/d;
    a.vx+=fx;a.vy+=fy;b.vx-=fx;b.vy-=fy; }
  for(const n of nodes){ n.vx+=(W/2-n.x)*0.001; n.vy+=(H/2-n.y)*0.001; n.vx*=0.85; n.vy*=0.85; n.x+=n.vx; n.y+=n.vy; }
  // edge labels: anchor near the TARGET end so labels fan out along the spokes
  // instead of piling up at a shared source; repel each other; weak spring back.
  for(const p of labels){ const a=p.link.source,b=p.link.target;
    const dx=b.x-a.x,dy=b.y-a.y,d=Math.sqrt(dx*dx+dy*dy)||1, off=Math.min(38,d*0.14);
    p.ax=a.x+dx*0.6 + (-dy/d)*off; p.ay=a.y+dy*0.6 + (dx/d)*off; }
  for(let i=0;i<labels.length;i++){ const p=labels[i];
    for(let j=i+1;j<labels.length;j++){ const q=labels[j];
      const dx=p.x-q.x, dy=p.y-q.y;
      const ox=(p.hw+q.hw+7)-Math.abs(dx), oy=13-Math.abs(dy);
      if(ox>0 && oy>0){ // bounding boxes overlap -> push apart on the shallower axis
        if(ox<oy){ const s=(dx<0?-1:1)*ox*0.6; p.vx+=s; q.vx-=s; }
        else { const s=(dy<0?-1:1)*oy*0.6; p.vy+=s; q.vy-=s; } } }
  }
  for(const p of labels){
    p.vx+=(p.ax-p.x)*0.04; p.vy+=(p.ay-p.y)*0.04;
    p.vx*=0.8; p.vy*=0.8; p.x+=p.vx; p.y+=p.vy; }
}
function curve(l){
  const a=l.source,b=l.target, dx=b.x-a.x,dy=b.y-a.y, d=Math.sqrt(dx*dx+dy*dy)||1;
  const ux=dx/d, uy=dy/d, px=-uy, py=ux;               // unit dir + perpendicular
  const off=Math.min(38, d*0.14);                       // gentle, uniform bow
  const sx=a.x+ux*10, sy=a.y+uy*10;                     // leave the source node edge
  const ex=b.x-ux*12, ey=b.y-uy*12;                     // stop before the target
  const cx=(sx+ex)/2 + px*off*2, cy=(sy+ey)/2 + py*off*2;
  const t=0.6, mt=1-t;                                  // label point on the arc
  const lx=mt*mt*sx+2*mt*t*cx+t*t*ex, ly=mt*mt*sy+2*mt*t*cy+t*t*ey;
  return {path:`M${sx},${sy} Q${cx},${cy} ${ex},${ey}`, lx, ly};
}
function render(){
  for(const l of links){ const c=curve(l); l._el.setAttribute("d",c.path); l._hit.setAttribute("d",c.path);
    if(l._lb){ const lp=l._lp; l._lb.setAttribute("x",lp.x); l._lb.setAttribute("y",lp.y-2); } }
  for(const n of nodes){ n._el.setAttribute("transform",`translate(${n.x},${n.y})`); }
}
let cool=520;
function loop(){ if(cool>0){ for(let s=0;s<2;s++) tick(); render(); cool--; requestAnimationFrame(loop);} }
loop();

let vt={x:0,y:0,k:1}; function applyVT(){ gRoot.setAttribute("transform",`translate(${vt.x},${vt.y}) scale(${vt.k})`); }
svg.addEventListener("wheel",e=>{ e.preventDefault(); const s=e.deltaY<0?1.1:0.9; vt.x=e.offsetX-(e.offsetX-vt.x)*s; vt.y=e.offsetY-(e.offsetY-vt.y)*s; vt.k*=s; applyVT(); },{passive:false});
let drag=null;
svg.addEventListener("mousedown",e=>{ if(e.target===svg||e.target.tagName==="path") drag={x:e.clientX,y:e.clientY,vx:vt.x,vy:vt.y}; });
window.addEventListener("mousemove",e=>{ if(drag){ vt.x=drag.vx+(e.clientX-drag.x); vt.y=drag.vy+(e.clientY-drag.y); applyVT(); } });
window.addEventListener("mouseup",()=>drag=null);

let active=null;
function focus(id){
  active=id; const {keepN,keepL}=chain(id);
  nodes.forEach(n=>n._el.classList.toggle("dim",!keepN.has(n.id)));
  links.forEach((l,i)=>{ const on=keepL.has(i); l._el.classList.toggle("dim",!on); l._hit.classList.toggle("dim",!on); if(l._lb) l._lb.classList.toggle("dim",!on); });
  document.querySelectorAll(".row").forEach(r=>r.classList.toggle("on",r.dataset.id===id));
  cool=Math.max(cool,50); loop();
}
function showAll(){ active=null; nodes.forEach(n=>n._el.classList.remove("dim"));
  links.forEach(l=>{ l._el.classList.remove("dim"); l._hit.classList.remove("dim"); if(l._lb) l._lb.classList.remove("dim"); });
  document.querySelectorAll(".row").forEach(r=>r.classList.remove("on")); }
document.getElementById("reset").onclick=showAll;

const tip=document.getElementById("tip");
function showNodeTip(n,e){
  let h;
  if(n.kind==="move"){ h=`<b>${n.move||n.label}</b><br><span class="g">${n.mkind} · ${n.scat||"?"} · ${n.label}`+`</span>`;
    if(n.skills) h+=`<br><span class="g">skill: ${n.skills}</span>`;
    if(n.gate) h+=`<br><span class="g">${n.gate}</span>`;
    if(n.extra&&n.extra.length) h+=`<br><span class="g">+ ${n.extra.join(", ")}</span>`; }
  else if(n.kind==="scene"){ h=`<b>${n.label}</b><br><span class="g">${(TYPE[n.catg]||{label:"scene"}).label} · exists · ${n.desc}</span>`; }
  else { h=`<b>${n.label}</b><br><span class="g">`+(n.kind==="known"?"clue known by "+n.npc:"fact")+`</span>`; if(n.desc) h+=`<br>${n.desc}`;
    const gv=incoming.get(n.id).length; h+=`<br><span class="g">${gv} move(s) lead here`+(orphan.has(n.label)?" · ORPHAN":"")+`</span>`; }
  tip.innerHTML=h; tip.style.display="block"; moveTip(e);
}
function showEdgeTip(l,e){
  const gate=l.mkind==="opportunity"?"opportunity":(l.rel==="soft"?"seeded lead":"hard gate");
  let h=`<b>${l.move}</b><br><span class="g">${gate} · ${l.scat||"?"}`+(l.location?` @ ${l.location}`:``)+`</span>`;
  h+=`<br><span class="g">skill: ${l.skills||"none"}</span>`;
  if(l.gate) h+=`<br><span class="g">${l.gate}</span>`;
  h+=`<br><span class="g">${l.source.label} → ${l.target.label}</span>`;
  if(l.extra&&l.extra.length) h+=`<br><span class="g">+ ${l.extra.join(", ")}</span>`;
  tip.innerHTML=h; tip.style.display="block"; moveTip(e);
}
function moveTip(e){ tip.style.left=(e.clientX-320+16)+"px"; tip.style.top=(e.clientY+14)+"px"; }
function hideTip(){ tip.style.display="none"; }

const items=nodes.filter(n=>n.kind==="clue"||n.kind==="known")
  .sort((a,b)=> (a.kind===b.kind? a.label.localeCompare(b.label) : (a.kind==="known"?1:-1)));
const listEl=document.getElementById("list");
function renderList(f){
  listEl.innerHTML="";
  items.filter(c=>!f||c.label.toLowerCase().includes(f)||(c.desc||"").toLowerCase().includes(f))
    .forEach(c=>{ const r=document.createElement("div");
      r.className="row"+(c.kind==="scene"?" scene":"")+(orphan.has(c.label)?" orphan":"")+(active===c.id?" on":"");
      r.dataset.id=c.id;
      const col=(TYPE[typeOf(c)]||TYPE.clue).color;
      r.innerHTML=`<span class="lbl" style="color:${col}">${c.label}</span><span class="n">${incoming.get(c.id).length}</span>`;
      r.onclick=()=>focus(c.id); listEl.appendChild(r); });
}
document.getElementById("search").addEventListener("input",e=>renderList(e.target.value.trim().toLowerCase()));
renderList("");
const c=DATA.counts;
document.getElementById("stats").textContent=`${c.facts} facts · ${c.known} known · ${c.moves} edges`;

// legend
(function(){
  const box=document.getElementById("legend");
  const order=["clue","orphan","known"];
  order.forEach(t=>{
    const sp=document.createElement("span");
    const svgi=document.createElementNS(NSx,"svg"); svgi.setAttribute("width",16); svgi.setAttribute("height",16); svgi.style.verticalAlign="middle"; svgi.style.marginRight="4px";
    const g=document.createElementNS(NSx,"g"); g.setAttribute("transform","translate(8,8)"); g.appendChild(makeShape(t,0.75)); svgi.appendChild(g);
    sp.appendChild(svgi); sp.appendChild(document.createTextNode(TYPE[t].label)); box.appendChild(sp);
  });
  // move helper node label colour = scene type
  Object.entries(SCAT).forEach(([lab,col])=>{
    const sp=document.createElement("span");
    const i=document.createElement("i"); i.className="sw"; i.style.background=col; i.style.borderRadius="6px";
    sp.appendChild(i); sp.appendChild(document.createTextNode(lab)); box.appendChild(sp);
  });
  [["#8b93a1","hard gate",false,false],["#8b93a1","seeded lead",true,false],["#8b93a1","opportunity",false,true]]
   .forEach(([col,lab,dash,dot])=>{
    const sp=document.createElement("span");
    const i=document.createElement("i"); i.className="swl"; i.style.borderColor=col;
    if(dash) i.style.borderTopStyle="dashed"; if(dot) i.style.borderTopStyle="dotted";
    sp.appendChild(i); sp.appendChild(document.createTextNode(lab)); box.appendChild(sp);
  });
  Object.entries(SKILL).concat([["none",NOSKILL]]).forEach(([lab,col])=>{
    const sp=document.createElement("span");
    const i=document.createElement("i"); i.className="swl"; i.style.borderColor=col; i.style.borderTopWidth="3px";
    sp.appendChild(i); sp.appendChild(document.createTextNode(lab)); box.appendChild(sp);
  });
})();

window.addEventListener("resize",()=>{ W=svg.clientWidth; H=svg.clientHeight; });
</script>
</body>
</html>
"""


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
