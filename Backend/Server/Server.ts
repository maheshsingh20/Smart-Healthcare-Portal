/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import type { Request, Response, NextFunction } from "express";

// --- Route Imports ---
import patientformRoutes from "./routes/formRoutes.ts";
import doctorRoutes from "./routes/doctorRoutes.ts";
import authRoutes from "./routes/authRoutes.ts";
import symptomRoutes from "./routes/systemRoutes.ts";
import appointmentRoutes from "./routes/appointmentRoutes.ts";
import notificationRoutes from "./routes/notificationRoutes.ts";
import ehrRoutes from "./routes/ehrRoutes.ts";
import chatRoutes from "./routes/chatRoutes.ts";
import prescriptionRoutes from "./routes/prescriptionRoutes.ts";
import reviewRoutes from "./routes/reviewRoutes.ts";
import adminRoutes from "./routes/adminRoutes.ts";
// --- Middleware Import ---
import { authMiddleware } from "./middleware/auth.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware Setup ---
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
// --- MongoDB Connection ---
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydb";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ========================== ROUTES ==========================

// Public Routes (No Token Required)
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes); // Public doctor search
app.use("/api/reviews", reviewRoutes); // Public reviews

// Health Check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Protected Routes (Token Required)
app.use("/api/appointments", appointmentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/ehr", ehrRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/patient-forms", patientformRoutes);
app.use("/api/symptoms", symptomRoutes);
app.use("/api/admin", adminRoutes);

// 404 Handler (MUST come before the global error handler)
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});
// Global Error Handler (Handles errors passed via next(err))
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled server error:", err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
