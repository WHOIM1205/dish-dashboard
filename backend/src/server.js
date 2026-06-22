// Express server for the Dish Dashboard backend.

import express from "express";
import http from "http";
import cors from "cors";
import dishesRouter from "./routes/dishes.js";
import { initSocket } from "./socket.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/dishes", dishesRouter);

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
