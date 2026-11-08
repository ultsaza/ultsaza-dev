---
title: "Void でブログを始めた"
description: "Void と Cloudflare Workers で ultsaza.dev を公開するまでのメモ。"
date: "2026-11-09"
tags: [void, cloudflare]
---

## はじめに

このブログは [Void](https://void.cloud) で作り、Cloudflare Workers で配信しています。記事は Markdown で書き、ビルド時に HTML になります。

## 構成

| 役割 | 使っているもの |
| --- | --- |
| フレームワーク | Void 1.6.2 |
| ツールチェーン | Vite+ 1.5.0 |
| 配信 | Cloudflare Workers |

```ts
// void.config.ts
export default defineConfig({
  output: "static",
});
```

> [!TIP]
> 全ページを HTML として事前に生成するので、ブラウザに JavaScript はほとんど届きません。

脚注も書けます。[^1]

[^1]: `@void/md` は markdown-it とそのプラグインで変換しています。
