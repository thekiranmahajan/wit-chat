import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";
import users from "./dummyUsers.js";

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
  await mongoose.connect(MONGO_URI);
  await User.deleteMany();
  await Chat.deleteMany();
  const userDocs = await User.insertMany(users);

  const getUser = (name) => userDocs.find((u) => u.name === name);

  const chats = [
    {
      isGroupChat: true,
      users: [
        getUser("Aarav Sharma"),
        getUser("Neha Patel"),
        getUser("Rohan Gupta"),
        getUser("Priya Singh"),
        getUser("Raj Kumar"),
      ].map((u) => u._id),
      chatName: "Tea Lovers",
      groupAdmin: getUser("Aarav Sharma")._id,
    },
    {
      isGroupChat: true,
      users: [
        getUser("Ananya Das"),
        getUser("Arjun Reddy"),
        getUser("Ishaan Sharma"),
        getUser("Pooja Verma"),
        getUser("Vikram Chauhan"),
      ].map((u) => u._id),
      chatName: "Cooking Club",
      groupAdmin: getUser("Ishaan Sharma")._id,
    },
    {
      isGroupChat: true,
      users: [
        getUser("Sneha Gupta"),
        getUser("Vishal Sharma"),
        getUser("Nikhil Patel"),
        getUser("Tanvi Shah"),
        getUser("Yash Chopra"),
      ].map((u) => u._id),
      chatName: "Fitness Buddies",
      groupAdmin: getUser("Nikhil Patel")._id,
    },
    {
      isGroupChat: true,
      users: [
        getUser("Meera Joshi"),
        getUser("Karan Mehta"),
        getUser("Simran Kaur"),
        getUser("Aditya Rao"),
        getUser("Riya Sen"),
      ].map((u) => u._id),
      chatName: "Movie Fans",
      groupAdmin: getUser("Meera Joshi")._id,
    },
    {
      isGroupChat: false,
      users: [getUser("Aarav Sharma")._id, getUser("Ananya Das")._id],
      chatName: "Aarav & Ananya",
    },
    {
      isGroupChat: false,
      users: [getUser("Neha Patel")._id, getUser("Arjun Reddy")._id],
      chatName: "Neha & Arjun",
    },
    {
      isGroupChat: false,
      users: [getUser("Rohan Gupta")._id, getUser("Ishaan Sharma")._id],
      chatName: "Rohan & Ishaan",
    },
    {
      isGroupChat: false,
      users: [getUser("Priya Singh")._id, getUser("Pooja Verma")._id],
      chatName: "Priya & Pooja",
    },
    {
      isGroupChat: false,
      users: [getUser("Raj Kumar")._id, getUser("Vikram Chauhan")._id],
      chatName: "Raj & Vikram",
    },
    {
      isGroupChat: false,
      users: [getUser("Sneha Gupta")._id, getUser("Tanvi Shah")._id],
      chatName: "Sneha & Tanvi",
    },
    {
      isGroupChat: false,
      users: [getUser("Vishal Sharma")._id, getUser("Yash Chopra")._id],
      chatName: "Vishal & Yash",
    },
    {
      isGroupChat: false,
      users: [getUser("Nikhil Patel")._id, getUser("Meera Joshi")._id],
      chatName: "Nikhil & Meera",
    },
    {
      isGroupChat: false,
      users: [getUser("Karan Mehta")._id, getUser("Simran Kaur")._id],
      chatName: "Karan & Simran",
    },
    {
      isGroupChat: false,
      users: [getUser("Aditya Rao")._id, getUser("Riya Sen")._id],
      chatName: "Aditya & Riya",
    },
  ];

  await Chat.insertMany(chats);
  console.log("Dummy users and chats injected!");
  mongoose.disconnect();
}

seed();
