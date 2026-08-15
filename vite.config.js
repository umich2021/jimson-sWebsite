import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this repo at /jimson-sWebsite/, not the domain root.
  base: "/jimson-sWebsite/",
});
