import express from "express";
import { login, signup, allUsers } from "../controllers/userControllers.js";
import authenticateRequest from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(signup).get(authenticateRequest, allUsers);
router.post("/login", login);

export default router;
