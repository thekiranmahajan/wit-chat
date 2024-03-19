import mongoose from "mongoose";

const userModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://i.pinimg.com/564x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userModel);
export default User;
