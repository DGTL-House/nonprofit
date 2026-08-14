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

let out = html.replace(marker, `<div id="root">${appHtml}</div>`);

// Inline the stylesheet as well. It is the last render-blocking request on the
// page: the browser cannot paint the markup above until it has been fetched, a
// full round-trip that costs more on throttled mobile than the bytes do. This
// is a single-page landing site, so a separately cached CSS file buys nothing —
// there is no second page to reuse it — and the HTML is revalidated anyway, so
// repeat visits still get a 304 rather than re-downloading it.
//
// Guarded below rather than assumed. Moving a sheet into the document changes
// what relative url()s resolve against — /assets/… becomes /… — so those are
// refused; root-absolute and data: urls resolve identically either way and are
// fine. The file stays in dist/ (unreferenced, never requested) so a stale HTML
// copy pointing at it cannot 404 mid-deploy.
const linkRe =
  /\s*<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/;
const link = out.match(linkRe);

if (!link) {
  throw new Error("prerender: no stylesheet <link> found in dist/index.html");
}

const cssPath = resolve(root, "dist", link[1]);
const css = readFileSync(cssPath, "utf8");
const relativeUrls = [...css.matchAll(/url\(\s*['"]?([^'")]+)/g)]
  .map((m) => m[1])
  .filter((u) => !/^(\/|data:|https?:|#)/.test(u));
if (relativeUrls.length) {
  throw new Error(
    `prerender: ${link[1]} has relative url()s that would break when inlined: ` +
      relativeUrls.join(", "),
  );
}
if (css.includes("</style") || css.includes("@import")) {
  throw new Error(`prerender: ${link[1]} contains @import or </style`);
}
out = out.replace(linkRe, `\n    <style>${css}</style>`);
const cssKb = Buffer.byteLength(css) / 1024;

writeFileSync(htmlPath, out, "utf8");

const kb = (Buffer.byteLength(appHtml) / 1024).toFixed(1);
console.log(
  `prerender: inlined ${kb} kB of markup and ${cssKb.toFixed(1)} kB of CSS ` +
    `into dist/index.html`,
);
