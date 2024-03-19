import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const userSchema = mongoose.Schema(
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

userSchema.pre("save", async (next) => {
  if (!this.isModified) {
    next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
