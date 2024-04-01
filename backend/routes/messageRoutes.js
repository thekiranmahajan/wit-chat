import express from "express";
import authenticateRequest from "../middleware/authMiddleware.js";
import { allMessages, sendMessage } from "../controllers/messageControllers.js";

const router = express.Router();

router.route("/").post(authenticateRequest, sendMessage);
router.route("/:chatId").get(authenticateRequest, allMessages);

export default router;
