import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Served from the custom domain root (www.jimsonyang.com), not a GitHub Pages project subpath.
  base: "/",
});
