import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import {
  notFound,
  errorHandler,
} from "./middleware/errorHandlingMiddleware.js";
import path, { join } from "path";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.get("/api/env", (req, res) => {
  const safeEnv = {
    CLOUD_NAME: process.env.REACT_APP_CLOUD_NAME,
    UPLOAD_PRESET: process.env.REACT_APP_UPLOAD_PRESET,
  };
  res.json(safeEnv);
});
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// ----------------Deployment-----------------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API initiated!");
  });
}
// ----------------Deployment-----------------

app.use(notFound);
app.use(errorHandler);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? undefined
        : "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    // console.log(userData._id);
    socket.emit("connected");
  });

  socket.on("join_chat", (room) => {
    socket.join(room);
    console.log("User joined room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));

  socket.on("stop_typing", (room) => socket.in(room).emit("stop_typing"));

  socket.on("new_message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    if (!chat.users) return console.log("chat.users not found");

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message_received", newMessageReceived);
    });
  });
  socket.off("setup", () => {
    console.log("User Disconnected");
    socket.leave(userData._id);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(
  PORT,
  console.log(`Server is running on PORT ${PORT}`.green.bold)
);
