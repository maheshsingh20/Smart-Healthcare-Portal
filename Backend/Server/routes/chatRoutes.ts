import express from "express";
import {
  getChat,
  createChat,
  sendMessage,
  markMessagesAsRead,
} from "../controller/chatController.ts";
import { authMiddleware } from "../middleware/auth.ts";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.post("/", createChat);
router.get("/:appointmentId", getChat);
router.post("/:appointmentId/message", sendMessage);
router.put("/:appointmentId/read", markMessagesAsRead);

export default router;
