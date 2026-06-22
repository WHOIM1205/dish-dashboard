// Single Socket.IO client connection to the backend, shared across the app.

import { io } from "socket.io-client";

// In dev, no VITE_API_URL is set, so the socket connects to the page's own
// origin and Vite proxies "/socket.io" to the backend — same approach as the
// REST calls in api.js. In production, set VITE_API_URL to the backend URL.
const socket = io(import.meta.env.VITE_API_URL || undefined);

export default socket;
