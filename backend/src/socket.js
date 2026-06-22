// Socket.IO setup. The server is created in server.js and passed in here,
// so we keep a single io instance that the routes can use to emit events.

import { Server } from "socket.io";

let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
  });

  return io;
}

export function getIo() {
  return io;
}
