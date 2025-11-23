import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// Assuming these models exist in the correct path relative to your controller
import Doctor from "../models/DoctorModel.ts";
import Patient from "../models/PatientModel.ts";
import Admin from "../models/AdminModel.ts";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is missing in .env file");
}

// ======================= DOCTOR AUTH =======================

export const doctorSignup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, specialization } = req.body;

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor)
      return res.status(400).json({ message: "Doctor already exists" });

    // Ensure all required fields are present before hashing (Good practice)
    if (!name || !email || !password || !specialization || !phone) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      phone,
      specialization,
      isApproved: false,
    });
    
    await newDoctor.save(); 

    // Important: Any doctor created successfully now has a password hash saved.
    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (error) {
    console.error("Doctor Signup Error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

export const doctorLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email }).select('+password');
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // CRITICAL FIX: Check if the password hash exists before comparing.
    // This handles old, corrupted entries created when the schema/saving was broken.
    if (!doctor.password) {
        // If the password field is null/undefined after selection, something is wrong.
        console.error(`Login failed for ${email}: Password hash is missing.`);
        // Return a generic error for security.
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // If login is successful, create token and return data (excluding password)
    const token = jwt.sign({ id: doctor._id, role: "doctor" }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        phone: doctor.phone,
        specialization: doctor.specialization,
        isApproved: doctor.isApproved,
      },
    });
  } catch (error) {
    console.error("Doctor Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// ... (Other Patient and Admin auth functions remain the same)

// ======================= PATIENT AUTH =======================
export const patientSignup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingPatient = await Patient.findOne({ email });
    if (existingPatient)
      return res.status(400).json({ message: "Patient already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newPatient = new Patient({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    await newPatient.save();

    res.status(201).json({ message: "Patient registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const patientLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Assuming Patient model has select: false on password as well
    const patient = await Patient.findOne({ email }).select("+password");
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: patient._id, role: "patient" }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ======================= ADMIN AUTH =======================
export const adminSignup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Assuming Admin model has select: false on password as well
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
