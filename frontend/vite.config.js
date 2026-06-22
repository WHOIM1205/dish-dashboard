import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Proxy requests to the Express backend during development so the frontend can
// use relative paths without hardcoding the host: "/api/..." for REST and
// "/socket.io" (with ws:true) for the Socket.IO realtime connection.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:4000",
      "/socket.io": { target: "http://localhost:4000", ws: true },
    },
  },
});
