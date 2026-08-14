import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import "./utils/utm.js";
import App from "./App.jsx";

const container = document.getElementById("root");
const tree = (
  <StrictMode>
    <App />
  </StrictMode>
);

// `npm run build` prerenders Header + Hero into index.html, so in production
// the container already holds markup and we only hydrate it. `npm run dev`
// serves an empty container, hence the createRoot fallback.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
