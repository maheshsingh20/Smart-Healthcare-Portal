import express from "express";
import type { Request, Response } from "express";
import type { IDoctor } from "../models/DoctorModel.ts";
import DoctorModel from "../models/DoctorModel.ts";
import { Model } from "mongoose";

const router = express.Router();

router.get("/all", async (req: Request, res: Response) => {
  try {
    const DoctorQueryModel = DoctorModel as Model<IDoctor>; 
    const doctors = await DoctorQueryModel.find({ isApproved: true });

    const publicDoctors = doctors.map((doc) => ({
      _id: doc.id.toString(),
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      specialization: doc.specialization,
      rating: "4.8",
      availability: Math.random() > 0.5 ? "Today" : "This Week",
      experience: `${Math.floor(Math.random() * 20) + 5} years`,
    }));

    res.status(200).json({ doctors: publicDoctors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching doctors." });
  }
});

export default router;
