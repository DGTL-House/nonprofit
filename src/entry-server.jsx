import { renderToString } from "react-dom/server";
import App from "./App.jsx";

// Rendered at build time by scripts/prerender.js and inlined into index.html
// so the header, hero and LCP image paint from HTML alone — no JS required.
//
// Only Header + Hero + DeferredMount's placeholder are reachable here:
// DeferredMount returns its placeholder on first render, so none of the
// React.lazy() sections are pulled in. That keeps the prerendered markup
// deterministic and hydration-safe.
export function render() {
  return renderToString(<App />);
}
