import NotificationModel from "../models/NotificationModel.ts";

interface CreateNotificationParams {
  userId: string;
  userRole: "admin" | "doctor" | "patient";
  type: "appointment" | "approval" | "message" | "reminder" | "system";
  title: string;
  message: string;
  actionUrl?: string;
}

export const createNotification = async (params: CreateNotificationParams) => {
  try {
    const notification = await NotificationModel.create(params);
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    return null;
  }
};

export const sendBulkNotifications = async (notifications: CreateNotificationParams[]) => {
  try {
    const result = await NotificationModel.insertMany(notifications);
    return result;
  } catch (error) {
    console.error("Error sending bulk notifications:", error);
    return [];
  }
};
