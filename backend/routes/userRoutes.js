import express from "express";
import { login, signup } from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").post(signup);
router.post("/login", login);

export default router;
