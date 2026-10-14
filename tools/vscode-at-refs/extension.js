// Markdown preview plugin: a link whose text is @field renders as that field of the
// linked file. @name is the file's H1; any other field is a `- **Label:** value` or
// `**Label:** value` line, looked up by label (`First name` -> @first-name).
// Same model as entity_fields() in validate.py.
const fs = require("fs");
const path = require("path");

const FIELD_LINE = /^\s*(?:-\s*)?\*\*([^*:]+):\*\*\s*(.*?)\s*$/;
const REF = /\[@([a-z0-9-]+)\]\(([^)#\s]+\.md)\)/g;
const cache = new Map(); // fsPath -> { mtime, fields }

function label(s) {
  return s.trim().toLowerCase().replace(/\s+/g, "-");
}

function fieldsOf(file) {
  let stat;
  try { stat = fs.statSync(file); } catch { return null; }
  const hit = cache.get(file);
  if (hit && hit.mtime === stat.mtimeMs) return hit.fields;
  const fields = {};
  const text = fs.readFileSync(file, "utf8").replace(/^﻿/, "").replace(/<!--[\s\S]*?-->/g, "");
  const isCharacter = file.split(path.sep).includes("characters");
  const sentence = (t) => (/[.!?]$/.test(t) ? t : t + ".");
  const hook = [], setup = [];
  let section = "";
  for (const line of text.split(/\r?\n/)) {
    if (!("name" in fields) && line.startsWith("# ")) fields.name = line.slice(2).trim();
    if (line.startsWith("## ")) section = line.slice(3).trim();
    else if (section === "Hook" && line.trim()) hook.push(sentence(line.trim().replace(/^- /, "")));
    // A character's Setup shows only its labelled lines (the paragraph is GM notes); others show it all.
    else if (section === "Setup" && line.trim() && (line.startsWith("- ") || !isCharacter))
      setup.push(sentence(line.trim().replace(/^- /, "").replace(/^\*\*[^*:]+:\*\*\s*/, "")));
    const m = FIELD_LINE.exec(line);
    if (m && !(label(m[1]) in fields)) fields[label(m[1])] = m[2];
  }
  // The same computed fields as tools/build_names.py: [@hook], [@setup], [@present].
  if (hook.length) fields.hook = hook.join(" ");
  if (setup.length) fields.setup = setup.join(" ");
  if (isCharacter && fields.name) fields.present = `${fields.name} is here`;
  cache.set(file, { mtime: stat.mtimeMs, fields });
  return fields;
}

// A field value may itself hold refs or links: resolve refs (from the file that holds
// the value), then keep only link text.
function render(text, fromFile, depth) {
  if (depth > 4) return text;
  text = text.replace(REF, (all, field, href) => resolve(field, href, fromFile, depth + 1) ?? all);
  return text.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/\*\*|`/g, "");
}

function resolve(field, href, fromFile, depth) {
  const target = path.resolve(path.dirname(fromFile), decodeURIComponent(href));
  const fields = fieldsOf(target);
  if (!fields || !(field in fields)) return null;
  return render(fields[field], target, depth);
}

// Which file is being previewed? VS Code's env.currentDocument is often empty, so
// also remember the last markdown editor, and resolve links by their workspace path.
let lastDoc = null;
function trackEditors() {
  try {
    const vscode = require("vscode");
    const note = (ed) => { if (ed && ed.document.languageId === "markdown") lastDoc = ed.document.uri.fsPath; };
    note(vscode.window.activeTextEditor);
    vscode.window.onDidChangeActiveTextEditor(note);
  } catch {}
}

let mdFiles = null; // every .md under the workspace folders (forward slashes)
function workspaceMd(refresh) {
  if (mdFiles && !refresh) return mdFiles;
  mdFiles = [];
  let roots = [];
  try { roots = (require("vscode").workspace.workspaceFolders || []).map((f) => f.uri.fsPath); } catch {}
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.name.startsWith(".") || e.name === "node_modules" || e.name === "world") continue;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name.endsWith(".md")) mdFiles.push(full);
    }
  };
  for (const r of roots) { try { walk(r); } catch {} }
  return mdFiles;
}

// href relative to an unknown file: the workspace file whose path ends with the
// href minus its leading ../ and ./ segments, if exactly one does.
function bySuffix(href) {
  const tail = "/" + decodeURIComponent(href).replace(/^(\.\.?\/)+/, "");
  for (const refresh of [false, true]) {
    const hits = workspaceMd(refresh).filter((f) => f.split(path.sep).join("/").endsWith(tail));
    if (hits.length === 1) return hits[0];
    if (hits.length > 1) return null;
  }
  return null;
}

function currentFile(env) {
  const doc = env && env.currentDocument;
  if (doc) {
    if (doc.fsPath) return doc.fsPath;
    try {
      const { Uri } = require("vscode");
      return (typeof doc === "object" && doc.scheme ? Uri.from(doc) : Uri.parse(String(doc))).fsPath;
    } catch {}
  }
  return lastDoc;
}

function plugin(md) {
  md.core.ruler.push("at_refs", (state) => {
    const here = currentFile(state.env);
    for (const block of state.tokens) {
      const kids = block.type === "inline" ? block.children : null;
      if (!kids) continue;
      for (let i = 0; i + 2 < kids.length; i++) {
        const open = kids[i], text = kids[i + 1], close = kids[i + 2];
        if (open.type !== "link_open" || text.type !== "text" || close.type !== "link_close") continue;
        const m = /^@([a-z0-9-]+)$/.exec(text.content);
        const href = (open.attrGet("href") || "").split("#")[0];
        if (!m || !/\.md$/.test(href)) continue;
        // Prefer the unique workspace match; fall back to the previewed file's folder.
        const target = bySuffix(href) || (here && path.resolve(path.dirname(here), decodeURIComponent(href)));
        const value = target ? resolve(m[1], path.basename(target), target, 0) : null;
        if (value === null) {
          text.content = `⚠ @${m[1]}`;
          open.attrSet("style", "color:#e5534b");
          open.attrSet("title", `no field '${m[1]}' in ${href}`);
        } else {
          text.content = value;
        }
      }
    }
  });
}

exports.activate = () => {
  trackEditors();
  return { extendMarkdownIt: (md) => md.use(plugin) };
};
exports.deactivate = () => {};
