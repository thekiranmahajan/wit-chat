import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../config/generateToken.js";

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password, avatar } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all required fields.");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists.");
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Failed to create use");
  }
});