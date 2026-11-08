import { defineConfig } from "vite";
import { voidPlugin } from "void";
import { voidReact } from "@void/react/plugin";
import { voidMarkdown } from "@void/md/plugin";
import { mdMath } from "./plugins/md-math";

export default defineConfig({
  plugins: [
    voidPlugin(),
    voidReact({ react: { compiler: true } }),
    // Renders $...$ and $$...$$ with KaTeX. Must come before voidMarkdown().
    mdMath(),
    // Markdown pages. Must come after the framework adapter.
    voidMarkdown(),
  ],
});
