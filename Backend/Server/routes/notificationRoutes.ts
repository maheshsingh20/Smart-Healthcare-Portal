import express from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controller/notificationController.ts";
import { authMiddleware } from "../middleware/auth.ts";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.get("/", getNotifications);
router.put("/:id/read", markAsRead);
router.put("/read-all", markAllAsRead);
router.delete("/:id", deleteNotification);

export default router;
