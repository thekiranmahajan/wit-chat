import express from "express";
import authenticateRequest from "../middleware/authMiddleware.js";
import {
  accessChat,
  addToGroup,
  createGroup,
  fetchChats,
  removeFromGroup,
  renameGroup,
} from "../controllers/chatControllers.js";

const router = express.Router();

router.route("/").post(authenticateRequest, accessChat);

router.route("/").get(authenticateRequest, fetchChats);

router.route("/create-group").post(authenticateRequest, createGroup);

router.route("/rename-group").put(authenticateRequest, renameGroup);

router.route("/add-member").put(authenticateRequest, addToGroup);

router.route("/remove-member").put(authenticateRequest, removeFromGroup);

export default router;
