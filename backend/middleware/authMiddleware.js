import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const authenticateRequest = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decodedToken.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("User is not authorized,Token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, No token");
  }
});

export default authenticateRequest;
