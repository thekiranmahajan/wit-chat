import express from "express";
import { signup } from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").post(signup);
// router.route("/login");

export default router;
