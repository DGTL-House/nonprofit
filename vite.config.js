import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2022",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Only React is pinned to a manual chunk — it's the one vendor the
        // entry genuinely needs. framer-motion / lucide-react / the observer
        // are reached exclusively through React.lazy(), so we let rolldown
        // chunk them off the dynamic-import graph. Forcing them into named
        // manual chunks made the *entry* chunk statically import them (~92 KB
        // of unused JS on the critical path, plus modulepreload hints).
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/scheduler/")
          ) {
            return "react";
          }
          return undefined;
        },
      },
    },
  },
});
