import express from "express";
import authenticateRequest from "../middleware/authMiddleware.js";
import {
  accessChat,
  createGroup,
  fetchChats,
} from "../controllers/chatControllers.js";

const router = express.Router();

router.route("/").post(authenticateRequest, accessChat);

router.route("/").get(authenticateRequest, fetchChats);

router.route("/create-group").post(authenticateRequest, createGroup);

// router.route("/rename-group").put(authenticateRequest, renameGroup);

// router.route("/remove-member").post(authenticateRequest, removeFromGroup);

// router.route("/add-member").post(authenticateRequest, addToGroup);

export default router;
