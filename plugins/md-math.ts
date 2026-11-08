// Spike v2: find math with a real Markdown parser (remark-math's micromark
// extension), render it with KaTeX, and hand the result to @void/md.
import katex from "katex";
import { fromMarkdown } from "mdast-util-from-markdown";
import { gfmFromMarkdown } from "mdast-util-gfm";
import { mathFromMarkdown } from "mdast-util-math";
import { gfm } from "micromark-extension-gfm";
import { math } from "micromark-extension-math";
import type { Plugin } from "vite";

type Node = {
  type: string;
  value?: string;
  children?: Node[];
  position?: { start: { offset?: number }; end: { offset?: number } };
};

// Inline output is still parsed as Markdown by @void/md, so escape characters
// that markdown-it (and markdown-it-attrs) would interpret. Keep entities.
const MD_SPECIAL = /&#?\w+;|[\\`*_{}[\]()#+\-.!|~$<>]/g;
const escapeText = (html: string) =>
  html.replace(
    />([^<]+)</g,
    (_, text: string) =>
      `>${text.replace(MD_SPECIAL, (c) => (c.length > 1 ? c : `&#${c.charCodeAt(0)};`))}<`,
  );

const render = (tex: string, displayMode: boolean) =>
  katex.renderToString(tex, { displayMode, throwOnError: false });

// The leading <script> block and the frontmatter are not Markdown.
const PREFIX = /^(?:\s*<script\b[\s\S]*?<\/script>\s*)?(?:---\r?\n[\s\S]*?\r?\n---\r?\n)?/;

export function renderMath(source: string): string {
  const prefix = source.match(PREFIX)?.[0] ?? "";
  const body = source.slice(prefix.length);
  const tree = fromMarkdown(body, {
    extensions: [gfm(), math()],
    mdastExtensions: [gfmFromMarkdown(), mathFromMarkdown()],
  }) as Node;

  const edits: Array<{ start: number; end: number; text: string }> = [];
  const walk = (node: Node) => {
    const start = node.position?.start.offset;
    const end = node.position?.end.offset;
    if (node.type === "math" && start !== undefined && end !== undefined) {
      // Block math becomes an HTML block. Repeat the line prefix ("> " in a
      // blockquote, spaces in a list item) so the surrounding block survives.
      const lineStart = body.lastIndexOf("\n", start - 1) + 1;
      const lp = body.slice(lineStart, start);
      const html = `<div class="math-display">${render(node.value ?? "", true)}</div>`;
      edits.push({ start, end, text: `\n${lp}\n${lp}${html}\n${lp}` });
      return;
    }
    if (node.type === "inlineMath" && start !== undefined && end !== undefined) {
      const value = node.value ?? "";
      // Currency guard (Pandoc rule): "$5 and $10" stays text.
      const currency = /^\s|\s$/.test(value) || /\d/.test(body[end] ?? "");
      if (!currency) edits.push({ start, end, text: escapeText(render(value, false)) });
      return;
    }
    node.children?.forEach(walk);
  };
  walk(tree);

  let out = body;
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    out = out.slice(0, edit.start) + edit.text + out.slice(edit.end);
  }
  return prefix + out;
}

export function mdMath(): Plugin {
  return {
    name: "md-math",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith(".md")) return;
      return { code: renderMath(code), map: null };
    },
  };
}
