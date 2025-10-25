/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// const { z, ZodError } = require("zod"); // Zod removed

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "secret";

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydb";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// --- User Model ---
interface IUser extends mongoose.Document {
  name: string;
  email: string;
  role: "patient" | "doctor" | "admin";
  password: string;
  phone?: string;
  specialization?: string;
  isDoctorApproved: boolean;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    role: {
      type: String,
      required: true,
      enum: ["patient", "doctor", "admin"],
    },
    password: { type: String, required: true },
    phone: { type: String },
    specialization: { type: String },
    isDoctorApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", userSchema);

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// --- Auth Middleware ---
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// --- Auth Router ---
const authRouter = express.Router();

// --- Zod Validation Schemas Removed ---

// --- Helper Function ---
const generateToken = (user: IUser) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// --- Patient Routes ---
authRouter.post("/patient/signup", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password } = req.body;

    // --- Manual Validation ---
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    if (String(phone).length < 10) {
        return res.status(400).json({ message: "Invalid phone number" });
    }
    // --- End Validation ---

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "patient",
    });
    await user.save();

    res.status(201).json({ message: "Patient account created successfully" });
  } catch (err: any) {
    // Check for duplicate key error from MongoDB
    if (err.code === 11000) {
        return res.status(400).json({ message: "Email already exists" });
    }
    console.error("Patient Signup error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

authRouter.post("/patient/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // --- Manual Validation ---
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    // --- End Validation ---

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (user.role !== "patient")
      return res.status(403).json({ message: "Access denied. Not a patient." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
    console.error("Patient Login error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// --- Doctor Routes ---
authRouter.post("/doctor/signup", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, specialization, password } = req.body;

    // --- Manual Validation ---
    if (!name || !email || !phone || !specialization || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (String(password).length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    if (String(phone).length < 10) {
        return res.status(400).json({ message: "Invalid phone number" });
    }
    // --- End Validation ---

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      phone,
      specialization,
      password: hashedPassword,
      role: "doctor",
      isDoctorApproved: false,
    });
    await user.save();

    res.status(201).json({
      message: "Doctor account created successfully. Pending admin approval.",
    });
  } catch (err: any) {
    if (err.code === 11000) {
        return res.status(400).json({ message: "Email already exists" });
    }
    console.error("Doctor Signup error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

authRouter.post("/doctor/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // --- Manual Validation ---
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    // --- End Validation ---

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (user.role !== "doctor")
      return res.status(403).json({ message: "Access denied. Not a doctor." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isDoctorApproved)
      return res
        .status(403)
        .json({ message: "Your account is pending admin approval." });

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        specialization: user.specialization,
      },
    });
  } catch (err: any) {
    console.error("Doctor Login error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// --- Admin Route ---
authRouter.post("/admin/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // --- Manual Validation ---
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    // --- End Validation ---

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (user.role !== "admin")
      return res.status(403).json({ message: "Access denied. Not an admin." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
    console.error("Admin Login error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// --- Mount Auth Router ---
app.use("/api/auth", authRouter);

// --- Protected Profile Route ---
app.get("/api/profile", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// --- Health Check ---
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// --- 404 Handler ---
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

// --- Global Error Handler ---
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});