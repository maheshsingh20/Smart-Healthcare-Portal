import express from "express";
import type { Request, Response } from "express";
import PatientForm from "../models/PatientForm.ts";
const router = express.Router();
router.post("/submit", async (req: Request, res: Response) => {
  try {
    const { name, email, age, gender, symptoms, message } = req.body;
    // Validation check
    if (!name || !email || age || gender|| symptoms|| !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newEntry = new PatientForm({ name, email, age, gender, symptoms, message });
    await newEntry.save();
    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
export default router;