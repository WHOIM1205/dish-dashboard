import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Proxy /api requests to the Express backend during development,
// so the frontend can call "/api/dishes" without hardcoding the host.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
});
