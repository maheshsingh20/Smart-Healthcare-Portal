import type { Request, Response } from "express";
import EHRModel from "../models/EHRModel.ts";

// Get patient EHR
export const getEHR = async (req: Request, res: Response) => {
  try {
    const patientId = req.user?.role === "patient" ? req.user.id : req.params.patientId;

    let ehr = await EHRModel.findOne({ patientId });

    // Create EHR if doesn't exist
    if (!ehr) {
      ehr = await EHRModel.create({ patientId });
    }

    res.json({ ehr });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching EHR", error: error.message });
  }
};

// Update patient EHR
export const updateEHR = async (req: Request, res: Response) => {
  try {
    const patientId = req.user?.id;
    const updates = req.body;

    if (req.user?.role !== "patient") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    let ehr = await EHRModel.findOne({ patientId });

    if (!ehr) {
      ehr = await EHRModel.create({ patientId, ...updates });
    } else {
      ehr = await EHRModel.findOneAndUpdate({ patientId }, updates, { new: true });
    }

    res.json({ message: "EHR updated", ehr });
  } catch (error: any) {
    res.status(500).json({ message: "Error updating EHR", error: error.message });
  }
};

// Add document to EHR
export const addDocument = async (req: Request, res: Response) => {
  try {
    const patientId = req.user?.id;
    const { title, type, url } = req.body;

    if (req.user?.role !== "patient") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const ehr = await EHRModel.findOneAndUpdate(
      { patientId },
      {
        $push: {
          documents: { title, type, url, uploadedAt: new Date() },
        },
      },
      { new: true, upsert: true }
    );

    res.json({ message: "Document added", ehr });
  } catch (error: any) {
    res.status(500).json({ message: "Error adding document", error: error.message });
  }
};
