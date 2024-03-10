import express from "express";
import dotenv from "dotenv";
import chats from "./data/dummyChats.js";
import connectDB from "./config/db.js";
import colors from "colors";

const app = express();
dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("API initiated!");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`.green.bold));
