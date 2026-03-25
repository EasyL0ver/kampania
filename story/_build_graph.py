import os

svg_path = os.path.join('story', 'scenario-graph.svg')
html_path = os.path.join('story', 'scenario-graph.html')

with open(svg_path, 'r', encoding='utf-8') as f:
    svg = f.read()

html = """<!DOCTYPE html>
<html>
<head>
<title>Scenario Graph</title>
<style>
body { margin: 0; background: #1a1a1a; overflow: hidden; }
#container { width: 100vw; height: 100vh; overflow: auto; position: relative; }
#inner { transform-origin: 0 0; }
.controls { position: fixed; top: 10px; right: 10px; z-index: 999; }
.controls button { font-size: 20px; padding: 8px 16px; margin: 2px; cursor: pointer; background: #333; color: #fff; border: 1px solid #555; border-radius: 4px; }
.controls button:hover { background: #555; }
</style>
</head>
<body>
<div class="controls">
  <button onclick="zoomIn()">+</button>
  <button onclick="zoomOut()">-</button>
  <button onclick="resetZoom()">Reset</button>
</div>
<div id="container">
  <div id="inner">
    SVG_PLACEHOLDER
  </div>
</div>
<script>
let scale = 1;
const inner = document.getElementById("inner");
function setZoom() { inner.style.transform = "scale(" + scale + ")"; }
function zoomIn() { scale *= 1.2; setZoom(); }
function zoomOut() { scale /= 1.2; setZoom(); }
function resetZoom() { scale = 1; setZoom(); }
document.getElementById("container").addEventListener("wheel", function(e) {
  e.preventDefault();
  if (e.deltaY < 0) zoomIn(); else zoomOut();
});
</script>
</body>
</html>"""

html = html.replace("SVG_PLACEHOLDER", svg)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"Done - {html_path}")
