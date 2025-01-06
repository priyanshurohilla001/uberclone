import { createServer } from "http";
import app from "./app.js";
import { Server } from "socket.io";

const port = process.env.PORT || 4000;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:4173"],
  },
});

function emit(socket, eventName, data) {
  socket.emit(eventName, data);
}

const onConnect = (socket, cb) => {
  console.log("User connected with socket id:", socket.id);

  cb(socket, "ridesInArea", {
    origin: "IIIT KOTA",
    destination: "City Mall kota",
  });

  socket.on("disconnect", () => {
    console.log("User disconnected with socket id:", socket.id);
  });
};

io.on("connection", (socket)=>onConnect(socket , emit));

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default {io} 