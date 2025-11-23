import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  userId: string;
  userRole: "admin" | "doctor" | "patient";
  type: "appointment" | "approval" | "message" | "reminder" | "system";
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: String, required: true, index: true },
    userRole: {
      type: String,
      enum: ["admin", "doctor", "patient"],
      required: true,
    },
    type: {
      type: String,
      enum: ["appointment", "approval", "message", "reminder", "system"],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    actionUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Notification ||
  mongoose.model<INotification>("Notification", NotificationSchema);
