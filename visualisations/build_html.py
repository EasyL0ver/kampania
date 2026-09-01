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

    def add_scene(path: str):
        nid = f"scene:{path}"
        if nid not in nodes:
            sc = g.scenes.get(path)
            title = sc.title if sc and sc.title else Path(path).stem
            nodes[nid] = {"id": nid, "label": title, "kind": "scene",
                          "desc": path, "location": Path(path).stem,
                          "catg": path.split("/")[0]}
        return nid

    # every fact is a node, so unwired clues show as isolated (honest orphans)
    for cid in g.clues:
        add_fact(cid)

    for n in g.nodes.values():
        if not n.gives_clues and not n.unlocks_scenes:
            continue
        loc = Path(n.scene).stem if n.scene else ""
        gate = []
        if n.requires_skills:
            gate.append("ability: " + "/".join(n.requires_skills))
        if n.branch_skills:
            gate.append("ability (branch): " + "/".join(n.branch_skills))
        if n.cost:
            gate.append(n.cost)
        gate_s = "; ".join(gate)

        # source clue(s): authored prerequisite clues, else the scene's existence
        real_reqs = [c for c in n.requires_clues if c in g.clues]
        if real_reqs:
            src_ids = [add_fact(c) for c in real_reqs]
        else:
            src_ids = [add_scene(n.scene)]

        for s in src_ids:
            for cid in n.gives_clues:
                links.append({
                    "source": s, "target": add_fact(cid),
                    "move": n.name, "mkind": n.kind,
                    "location": loc, "gate": gate_s, "extra": n.gives_other,
                })
            for tgt in n.unlocks_scenes:
                links.append({
                    "source": s, "target": add_scene(tgt),
                    "move": n.name, "mkind": n.kind,
                    "location": loc, "gate": gate_s, "extra": ["Scene Unlock"],
                })

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
            "scenes": len(g.scenes),
            "facts": len(g.clues),
            "moves": len(links),
            "scene_nodes": sum(1 for n in nodes.values() if n["kind"] == "scene"),
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
  .link { fill:none; }
  .link.action { stroke:#5aa469; }
  .link.opportunity { stroke:#c79a4a; }
  .hit { stroke:transparent; stroke-width:10; fill:none; cursor:pointer; }
  .node circle, .node rect, .node polygon { stroke:#0f1115; stroke-width:1.5; }
  .node text { fill:#c2c8d2; font-size:10px; pointer-events:none; }
  .node.dim { opacity:.07; }
  .link.dim { opacity:.04; }
  .elabel { fill:#9aa3b0; font-size:9px; pointer-events:none; }
  .legend { position:absolute; bottom:10px; left:12px; font-size:11px; color:#8b93a1; }
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
  <div id="hint">Node = clue (fact or scene). Edge = a move (gated by an ability) that yields a clue. Click a clue to isolate the moves that lead to it.</div>
  <svg></svg>
  <div class="legend">
    <span><i class="sw" style="background:#6ea8fe"></i>fact clue</span>
    <span><i class="sw" style="background:#9b6fd0"></i>scene exists</span>
    <span><i class="sw" style="background:#8b6f4a"></i>orphan</span>
    <span><i class="swl" style="border-color:#5aa469"></i>action</span>
    <span><i class="swl" style="border-color:#c79a4a"></i>opportunity</span>
  </div>
  <div id="tip"></div>
</div>
<script>
const DATA = __DATA__;
const orphan = new Set(DATA.orphans);

const svg = document.querySelector("svg");
const NS = "http://www.w3.org/2000/svg";
let W = svg.clientWidth, H = svg.clientHeight;
const nodes = DATA.nodes.map(n=>({...n, x:Math.random()*W, y:Math.random()*H, vx:0, vy:0}));
const nmap = new Map(nodes.map(n=>[n.id,n]));
const links = DATA.links.map(l=>({...l, source:nmap.get(l.source), target:nmap.get(l.target)}));

// backward chain: what leads TO a node
const incoming = new Map(); nodes.forEach(n=>incoming.set(n.id,[]));
links.forEach((l,i)=>incoming.get(l.target.id).push(i));
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
 '<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#5b6472"/></marker></defs>');

links.forEach(l=>{
  const p=document.createElementNS(NS,"path"); p.setAttribute("class","link "+l.mkind);
  p.setAttribute("marker-end","url(#arr)"); l._el=p; gLinks.appendChild(p);
  const hit=document.createElementNS(NS,"path"); hit.setAttribute("class","hit"); l._hit=hit; gLinks.appendChild(hit);
  hit.addEventListener("mouseenter",e=>showEdgeTip(l,e));
  hit.addEventListener("mousemove",moveTip); hit.addEventListener("mouseleave",hideTip);
  const t=document.createElementNS(NS,"text"); t.setAttribute("class","elabel");
  t.textContent=l.move.length>22?l.move.slice(0,21)+"…":l.move; t.style.display="none"; l._lbl=t; gLbl.appendChild(t);
});

nodes.forEach(n=>{
  const g=document.createElementNS(NS,"g"); g.setAttribute("class","node");
  let shape;
  if(n.kind==="scene"){
    shape=document.createElementNS(NS,"polygon"); shape.setAttribute("points","0,-7 7,0 0,7 -7,0");
    shape.setAttribute("fill","#9b6fd0");
  } else {
    shape=document.createElementNS(NS,"circle"); shape.setAttribute("r",6);
    shape.setAttribute("fill", orphan.has(n.label)?"#8b6f4a":"#6ea8fe");
  }
  g.appendChild(shape);
  const t=document.createElementNS(NS,"text"); t.setAttribute("x",10); t.setAttribute("y",3);
  t.textContent=n.label.length>28?n.label.slice(0,27)+"…":n.label; g.appendChild(t);
  n._el=g;
  g.addEventListener("mouseenter",e=>showNodeTip(n,e));
  g.addEventListener("mousemove",moveTip); g.addEventListener("mouseleave",hideTip);
  g.addEventListener("click",()=>focus(n.id));
  gNodes.appendChild(g);
});

function tick(){
  const K=6500;
  for(let i=0;i<nodes.length;i++){ const a=nodes[i];
    for(let j=i+1;j<nodes.length;j++){ const b=nodes[j];
      let dx=a.x-b.x,dy=a.y-b.y,d2=dx*dx+dy*dy+.01; const f=K/d2,d=Math.sqrt(d2);
      const fx=f*dx/d,fy=f*dy/d; a.vx+=fx;a.vy+=fy;b.vx-=fx;b.vy-=fy; } }
  for(const l of links){ const a=l.source,b=l.target;
    let dx=b.x-a.x,dy=b.y-a.y,d=Math.sqrt(dx*dx+dy*dy)+.01; const f=(d-80)*0.02,fx=f*dx/d,fy=f*dy/d;
    a.vx+=fx;a.vy+=fy;b.vx-=fx;b.vy-=fy; }
  for(const n of nodes){ n.vx+=(W/2-n.x)*0.001; n.vy+=(H/2-n.y)*0.001; n.vx*=0.85; n.vy*=0.85; n.x+=n.vx; n.y+=n.vy; }
}
function curve(l){
  const a=l.source,b=l.target, mx=(a.x+b.x)/2,my=(a.y+b.y)/2, dx=b.x-a.x,dy=b.y-a.y, d=Math.sqrt(dx*dx+dy*dy)||1;
  const off=Math.min(30,d*0.15), cx=mx-dy/d*off, cy=my+dx/d*off;
  const ex=b.x-dx/d*8, ey=b.y-dy/d*8;
  return {path:`M${a.x},${a.y} Q${cx},${cy} ${ex},${ey}`, lx:cx, ly:cy};
}
function render(){
  for(const l of links){ const c=curve(l); l._el.setAttribute("d",c.path); l._hit.setAttribute("d",c.path);
    l._lbl.setAttribute("x",c.lx); l._lbl.setAttribute("y",c.ly); }
  for(const n of nodes){ n._el.setAttribute("transform",`translate(${n.x},${n.y})`); }
}
let cool=320;
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
  links.forEach((l,i)=>{ const on=keepL.has(i); l._el.classList.toggle("dim",!on); l._hit.classList.toggle("dim",!on); l._lbl.style.display=on?"block":"none"; });
  document.querySelectorAll(".row").forEach(r=>r.classList.toggle("on",r.dataset.id===id));
  cool=Math.max(cool,50); loop();
}
function showAll(){ active=null; nodes.forEach(n=>n._el.classList.remove("dim"));
  links.forEach(l=>{ l._el.classList.remove("dim"); l._hit.classList.remove("dim"); l._lbl.style.display="none"; });
  document.querySelectorAll(".row").forEach(r=>r.classList.remove("on")); }
document.getElementById("reset").onclick=showAll;

const tip=document.getElementById("tip");
function showNodeTip(n,e){
  let h;
  if(n.kind==="scene"){ h=`<b>${n.label}</b><br><span class="g">scene exists · ${n.desc}</span>`; }
  else { h=`<b>${n.label}</b><br><span class="g">fact</span>`; if(n.desc) h+=`<br>${n.desc}`;
    const gv=incoming.get(n.id).length; h+=`<br><span class="g">${gv} move(s) lead here`+(orphan.has(n.label)?" · ORPHAN":"")+`</span>`; }
  tip.innerHTML=h; tip.style.display="block"; moveTip(e);
}
function showEdgeTip(l,e){
  let h=`<b>${l.move}</b><br><span class="g">${l.mkind}`+(l.location?` @ ${l.location}`:``)+`</span>`;
  if(l.gate) h+=`<br><span class="g">${l.gate}</span>`;
  h+=`<br><span class="g">${l.source.label} → ${l.target.label}</span>`;
  if(l.extra&&l.extra.length) h+=`<br><span class="g">+ ${l.extra.join(", ")}</span>`;
  tip.innerHTML=h; tip.style.display="block"; moveTip(e);
}
function moveTip(e){ tip.style.left=(e.clientX-320+16)+"px"; tip.style.top=(e.clientY+14)+"px"; }
function hideTip(){ tip.style.display="none"; }

const items=nodes.filter(n=>n.kind==="clue"||n.kind==="scene")
  .sort((a,b)=> (a.kind===b.kind? a.label.localeCompare(b.label) : (a.kind==="scene"?-1:1)));
const listEl=document.getElementById("list");
function renderList(f){
  listEl.innerHTML="";
  items.filter(c=>!f||c.label.toLowerCase().includes(f)||(c.desc||"").toLowerCase().includes(f))
    .forEach(c=>{ const r=document.createElement("div");
      r.className="row"+(c.kind==="scene"?" scene":"")+(orphan.has(c.label)?" orphan":"")+(active===c.id?" on":"");
      r.dataset.id=c.id;
      r.innerHTML=`<span class="lbl">${c.label}</span><span class="n">${incoming.get(c.id).length}</span>`;
      r.onclick=()=>focus(c.id); listEl.appendChild(r); });
}
document.getElementById("search").addEventListener("input",e=>renderList(e.target.value.trim().toLowerCase()));
renderList("");
const c=DATA.counts;
document.getElementById("stats").textContent=`${c.facts} facts · ${c.scene_nodes} scenes · ${c.moves} moves`;
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
    print(f"  {c['facts']} facts, {c['scene_nodes']} scene nodes, "
          f"{c['moves']} move-edges, {len(payload['orphans'])} orphan facts")


if __name__ == "__main__":
    main()
