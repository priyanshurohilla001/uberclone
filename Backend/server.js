import { createServer } from "http";
import app from "./app.js";
import { Server } from "socket.io";

const port = process.env.PORT;
const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  io.emit("test","i am a john cena")

  // Log connection errors
  socket.on("connect_error", (error) => {
    console.log("Connection error:", error);
  });

  socket.emit("test","rajneesh")
  
  // Log disconnection reason
  socket.on("disconnect", (reason) => {
    console.log("Client disconnected:", socket.id, "Reason:", reason);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});