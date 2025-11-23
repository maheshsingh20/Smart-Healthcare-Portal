import type { Request, Response } from "express";
import ChatModel from "../models/Chat.ts";

// Get or create chat for appointment
export const getChat = async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.params;

    let chat = await ChatModel.findOne({ appointmentId });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json({ chat });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching chat", error: error.message });
  }
};

// Create chat for appointment
export const createChat = async (req: Request, res: Response) => {
  try {
    const { appointmentId, doctorId, patientId } = req.body;

    const existingChat = await ChatModel.findOne({ appointmentId });
    if (existingChat) {
      return res.status(400).json({ message: "Chat already exists" });
    }

    const chat = await ChatModel.create({
      appointmentId,
      participants: { doctorId, patientId },
      messages: [],
    });

    res.status(201).json({ message: "Chat created", chat });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating chat", error: error.message });
  }
};

// Send message
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.params;
    const { message } = req.body;
    const senderId = req.user?.id;
    const senderRole = req.user?.role as "doctor" | "patient";

    if (!senderId || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const chat = await ChatModel.findOneAndUpdate(
      { appointmentId },
      {
        $push: {
          messages: {
            senderId,
            senderRole,
            message,
            timestamp: new Date(),
            isRead: false,
          },
        },
      },
      { new: true }
    );

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json({ message: "Message sent", chat });
  } catch (error: any) {
    res.status(500).json({ message: "Error sending message", error: error.message });
  }
};

// Mark messages as read
export const markMessagesAsRead = async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.params;
    const userId = req.user?.id;

    const chat = await ChatModel.findOneAndUpdate(
      { appointmentId, "messages.senderId": { $ne: userId } },
      { $set: { "messages.$[elem].isRead": true } },
      {
        arrayFilters: [{ "elem.senderId": { $ne: userId } }],
        new: true,
      }
    );

    res.json({ message: "Messages marked as read", chat });
  } catch (error: any) {
    res.status(500).json({ message: "Error marking messages as read", error: error.message });
  }
};
