import express from "express";
import {
  registerUser,
  authenticateUser,
  getAllUsers,
} from "../controllers/userControllers.js";
import authenticateRequest from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(authenticateRequest, getAllUsers);
router.post("/login", authenticateUser);

export default router;
