import type { Request, Response } from "express";
import NotificationModel from "../models/NotificationModel.ts";

// Get user notifications
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { isRead } = req.query;

    let query: any = { userId };
    if (isRead !== undefined) query.isRead = isRead === "true";

    const notifications = await NotificationModel.find(query)
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ notifications });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching notifications", error: error.message });
  }
};

// Mark notification as read
export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const notification = await NotificationModel.findOneAndUpdate(
      { _id: id, userId },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Notification marked as read", notification });
  } catch (error: any) {
    res.status(500).json({ message: "Error updating notification", error: error.message });
  }
};

// Mark all notifications as read
export const markAllAsRead = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    await NotificationModel.updateMany({ userId, isRead: false }, { isRead: true });

    res.json({ message: "All notifications marked as read" });
  } catch (error: any) {
    res.status(500).json({ message: "Error updating notifications", error: error.message });
  }
};

// Delete notification
export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const notification = await NotificationModel.findOneAndDelete({ _id: id, userId });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Notification deleted" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting notification", error: error.message });
  }
};
