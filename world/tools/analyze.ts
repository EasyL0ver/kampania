// Static analysis of content code with the TypeScript compiler. For every
// condition, effect, getter and method in an entity class it resolves, through
// the type checker (so aliases, ?. and helpers don't matter):
//   - which moves it depends on   (w.pawelekFallsIll.allActions.examine.done)
//   - which state it reads/writes (w.pawelek.hp)
//   - which cards it checks       (me.has(Culture))
//   - which clues it checks       (me.knows(clues.X))
//   - which entity classes it names (at/present)
//   - any control flow (if, loops, try, nested functions), which content forbids
// Results are keyed by the same paths as model.ts lambdasOf().

import ts from "typescript";
import { join, relative } from "node:path";
import { ROOT } from "./load.ts";

export interface MoveDep { className: string; table: string; move: string }
export interface StateDep { className: string; prop: string }

export interface CodeInfo {
  path: string;
  text: string;               // source, whitespace collapsed
  moves: MoveDep[];
  state: StateDep[];
  skills: string[];           // skills.ts export names used via me.has()
  clues: string[];            // clue class names checked via me.knows()
  activates: string[];        // event classes whose activate() it calls (days)
  classes: string[];          // entity classes named in the code
  thisProps: string[];        // this.X accesses (getters select tables this way)
  controlFlow: string[];      // forbidden constructs found
  topLevelAnd: boolean;       // body is `a && b` (two requirements in one)
}

export interface Analysis {
  code: Map<string, CodeInfo>;
}

const CONTENT_DIRS = ["characters", "locations", "events", "items", "days"];
const FORBIDDEN = new Set([
  ts.SyntaxKind.IfStatement, ts.SyntaxKind.ForStatement, ts.SyntaxKind.ForInStatement,
  ts.SyntaxKind.ForOfStatement, ts.SyntaxKind.WhileStatement, ts.SyntaxKind.DoStatement,
  ts.SyntaxKind.SwitchStatement, ts.SyntaxKind.TryStatement, ts.SyntaxKind.ThrowStatement,
  ts.SyntaxKind.FunctionDeclaration, ts.SyntaxKind.FunctionExpression,
  ts.SyntaxKind.ClassDeclaration, ts.SyntaxKind.ClassExpression,
]);

export function analyze(): Analysis {
  const cfg = ts.readConfigFile(join(ROOT, "tsconfig.json"), ts.sys.readFile);
  const parsed = ts.parseJsonConfigFileContent(cfg.config, ts.sys, ROOT);
  const program = ts.createProgram(parsed.fileNames, parsed.options);
  const checker = program.getTypeChecker();

  const rel = (sf: ts.SourceFile) => relative(ROOT, sf.fileName).replace(/\\/g, "/");
  const isContentFile = (sf: ts.SourceFile) => {
    const r = rel(sf);
    return r === "stubs.ts" || CONTENT_DIRS.some((d) => r.startsWith(d + "/"));
  };
  const isSkillsFile = (sf: ts.SourceFile) => rel(sf) === "skills.ts";
  const isCluesFile = (sf: ts.SourceFile) => rel(sf) === "clues.ts";
  const nameOf = (n: { name?: ts.Node }) => (n.name ? n.name.getText() : "");

  const resolve = (node: ts.Node): ts.Declaration | undefined => {
    let sym = checker.getSymbolAtLocation(node);
    if (!sym) return undefined;
    if (sym.flags & ts.SymbolFlags.Alias) sym = checker.getAliasedSymbol(sym);
    return sym.valueDeclaration ?? sym.declarations?.[0];
  };
  const classOf = (n: ts.Node): string | undefined => {
    for (let p: ts.Node | undefined = n; p; p = p.parent) {
      if (ts.isClassDeclaration(p)) return p.name?.text;
    }
    return undefined;
  };
  const isMoveCall = (e: ts.Node | undefined): e is ts.CallExpression =>
    !!e && ts.isCallExpression(e) && ts.isIdentifier(e.expression) &&
    (e.expression.text === "action" || e.expression.text === "opportunity");
  const isMoveTableDecl = (d: ts.PropertyDeclaration) =>
    !!d.initializer && ts.isObjectLiteralExpression(d.initializer) &&
    d.initializer.properties.length > 0 &&
    d.initializer.properties.every((p) => ts.isPropertyAssignment(p) && isMoveCall(p.initializer));

  const code = new Map<string, CodeInfo>();

  function inspect(fn: ts.Node, path: string): CodeInfo {
    const info: CodeInfo = {
      path, text: fn.getText().replace(/\s+/g, " "), moves: [], state: [], skills: [], clues: [], activates: [],
      classes: [], thisProps: [], controlFlow: [], topLevelAnd: false,
    };
    const followed = new Set<ts.Node>();
    const visit = (n: ts.Node) => {
      if (FORBIDDEN.has(n.kind)) info.controlFlow.push(ts.SyntaxKind[n.kind]);

      if (ts.isPropertyAccessExpression(n)) {
        if (n.expression.kind === ts.SyntaxKind.ThisKeyword) info.thisProps.push(n.name.text);
        const d = resolve(n.name);
        if (d && isContentFile(d.getSourceFile())) {
          if (ts.isPropertyAssignment(d) && isMoveCall(d.initializer) &&
              ts.isObjectLiteralExpression(d.parent) && ts.isPropertyDeclaration(d.parent.parent)) {
            info.moves.push({ className: classOf(d)!, table: nameOf(d.parent.parent), move: nameOf(d) });
          } else if (ts.isPropertyDeclaration(d) && !isMoveTableDecl(d) && classOf(d)) {
            info.state.push({ className: classOf(d)!, prop: nameOf(d) });
          }
        }
      }

      // me.has(Card) / me.knows(clues.X): Player methods with a card or a clue
      if (ts.isCallExpression(n) && ts.isPropertyAccessExpression(n.expression) &&
          (n.expression.name.text === "has" || n.expression.name.text === "knows") &&
          n.arguments.length === 1) {
        const m = resolve(n.expression.name);
        const owner = m?.parent;
        if (owner && ts.isInterfaceDeclaration(owner) && owner.name.text === "Player") {
          const arg = resolve(ts.isPropertyAccessExpression(n.arguments[0]) ? n.arguments[0].name : n.arguments[0]);
          if (n.expression.name.text === "has" && arg && ts.isVariableDeclaration(arg) &&
              isSkillsFile(arg.getSourceFile())) {
            info.skills.push(nameOf(arg));
          }
          if (n.expression.name.text === "knows" && arg && ts.isClassDeclaration(arg) && arg.name &&
              isCluesFile(arg.getSourceFile())) {
            info.clues.push(arg.name.text);
          }
        }
      }

      // x.activate(w): which event class the calendar starts here
      if (ts.isCallExpression(n) && ts.isPropertyAccessExpression(n.expression) &&
          n.expression.name.text === "activate") {
        const decl = checker.getTypeAtLocation(n.expression.expression).getSymbol()?.valueDeclaration;
        if (decl && ts.isClassDeclaration(decl) && decl.name && isContentFile(decl.getSourceFile())) {
          info.activates.push(decl.name.text);
        }
      }

      // A call into a helper in content: analyse the helper's body too (once).
      if (ts.isCallExpression(n)) {
        const d = resolve(n.expression);
        const body =
          d && ts.isFunctionDeclaration(d) ? d.body
          : d && ts.isVariableDeclaration(d) && d.initializer &&
            (ts.isArrowFunction(d.initializer) || ts.isFunctionExpression(d.initializer)) ? d.initializer.body
          : undefined;
        if (body && isContentFile(body.getSourceFile()) && !followed.has(body)) {
          followed.add(body);
          visit(body);
        }
      }

      if (ts.isIdentifier(n)) {
        const d = resolve(n);
        if (d && ts.isClassDeclaration(d) && d.name && isContentFile(d.getSourceFile())) {
          info.classes.push(d.name.text);
        }
      }
      ts.forEachChild(n, visit);
    };
    ts.forEachChild(fn, visit);

    if (ts.isArrowFunction(fn) && !ts.isBlock(fn.body)) {
      let body: ts.Expression = fn.body;
      while (ts.isParenthesizedExpression(body)) body = body.expression;
      info.topLevelAnd = ts.isBinaryExpression(body) &&
        body.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken;
    }
    const uniq = <T>(xs: T[]) => [...new Map(xs.map((x) => [JSON.stringify(x), x])).values()];
    info.moves = uniq(info.moves);
    info.state = uniq(info.state);
    info.skills = uniq(info.skills);
    info.clues = uniq(info.clues);
    info.activates = uniq(info.activates);
    info.classes = uniq(info.classes);
    info.thisProps = uniq(info.thisProps);
    code.set(path, info);
    return info;
  }

  const prop = (o: ts.ObjectLiteralExpression, name: string) =>
    o.properties.find((p): p is ts.PropertyAssignment => ts.isPropertyAssignment(p) && nameOf(p) === name)
      ?.initializer;

  function walkSpec(path: string, spec: ts.ObjectLiteralExpression) {
    const reqs = prop(spec, "requires");
    if (reqs && ts.isArrayLiteralExpression(reqs)) {
      reqs.elements.forEach((el, i) => {
        if (!ts.isNewExpression(el)) return;
        const arg = el.arguments?.[1];
        const when = arg && ts.isObjectLiteralExpression(arg) ? prop(arg, "when") : undefined;
        if (when) inspect(when, `${path}.requires[${i}].when`);
      });
    }
    const trigger = prop(spec, "trigger");
    if (trigger) inspect(trigger, `${path}.trigger`);
    const target = prop(spec, "target");
    const targetWhen = target && ts.isObjectLiteralExpression(target) ? prop(target, "when") : undefined;
    if (targetWhen) inspect(targetWhen, `${path}.target.when`);
    // narrative: new Narrative({ narration, gives: { effects } })
    const narrative = prop(spec, "narrative");
    const narrativeArg = narrative && ts.isNewExpression(narrative) ? narrative.arguments?.[0] : undefined;
    const gives = narrativeArg && ts.isObjectLiteralExpression(narrativeArg) ? prop(narrativeArg, "gives") : undefined;
    const effects = gives && ts.isObjectLiteralExpression(gives) ? prop(gives, "effects") : undefined;
    if (effects) inspect(effects, `${path}.narrative.gives.effects`);
  }

  for (const sf of program.getSourceFiles()) {
    if (!isContentFile(sf)) continue;
    for (const stmt of sf.statements) {
      if (!ts.isClassDeclaration(stmt) || !stmt.name) continue;
      const cls = stmt.name.text;
      for (const member of stmt.members) {
        const name = nameOf(member);
        if (ts.isPropertyDeclaration(member) && member.initializer) {
          if (isMoveTableDecl(member)) {
            for (const p of (member.initializer as ts.ObjectLiteralExpression).properties) {
              const call = (p as ts.PropertyAssignment).initializer as ts.CallExpression;
              const spec = call.arguments[0];
              if (spec && ts.isObjectLiteralExpression(spec)) walkSpec(`${cls}.${name}.${nameOf(p)}`, spec);
            }
          } else if (["morning", "afternoon", "evening", "night", "condition"].includes(name)) {
            inspect(member.initializer, `${cls}.${name}`);
          } else if (name === "onFire" || name === "resolve") {
            inspect(member.initializer, `${cls}.${name}`);
          }
        } else if (ts.isGetAccessorDeclaration(member) && (name === "actions" || name === "opportunities")) {
          inspect(member, `${cls}.get ${name}`);
        } else if (ts.isMethodDeclaration(member) && (name === "at" || name === "present")) {
          inspect(member, `${cls}.${name}`);
        }
      }
    }
  }
  return { code };
}
