import { createServer } from "http";
import app from "./app.js";
import { Server } from "socket.io";

const port = process.env.PORT || 4000;

const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:4173"],
  },
});


io.on("connection", (socket)=>{
  console.log("user connected")
});



server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default { io };
