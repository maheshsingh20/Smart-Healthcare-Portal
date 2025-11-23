import mongoose, { Schema, Document } from "mongoose";

interface IMessage {
  senderId: string;
  senderRole: "doctor" | "patient";
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export interface IChat extends Document {
  appointmentId: string;
  participants: {
    doctorId: string;
    patientId: string;
  };
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  senderId: { type: String, required: true },
  senderRole: { type: String, enum: ["doctor", "patient"], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
});

const ChatSchema = new Schema<IChat>(
  {
    appointmentId: { type: String, required: true, unique: true, index: true },
    participants: {
      doctorId: { type: String, required: true },
      patientId: { type: String, required: true },
    },
    messages: [MessageSchema],
  },
  { timestamps: true }
);

// Compound index for efficient queries
ChatSchema.index({ "participants.doctorId": 1, "participants.patientId": 1 });

export default mongoose.models.Chat ||
  mongoose.model<IChat>("Chat", ChatSchema);