// Inlines the server-rendered Header + Hero markup into dist/index.html.
//
// Without this, `<div id="root">` ships empty and the browser cannot paint
// anything until react + the app bundle have downloaded, parsed and executed
// — which is what pushed FCP to ~3s and LCP to ~9s on throttled mobile.
// With it, the hero (including the preloaded LCP image) paints straight from
// HTML and React only hydrates.

import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const htmlPath = resolve(root, "dist/index.html");
const serverEntry = resolve(root, "dist-ssr/entry-server.js");

const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = render();

const html = readFileSync(htmlPath, "utf8");
const marker = '<div id="root"></div>';

if (!html.includes(marker)) {
  throw new Error(`prerender: could not find ${marker} in dist/index.html`);
}

writeFileSync(
  htmlPath,
  html.replace(marker, `<div id="root">${appHtml}</div>`),
  "utf8",
);

const kb = (Buffer.byteLength(appHtml) / 1024).toFixed(1);
console.log(`prerender: inlined ${kb} kB of markup into dist/index.html`);
