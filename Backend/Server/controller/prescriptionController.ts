import type { Request, Response } from "express";
import PrescriptionModel from "../models/PrescriptionModel.ts";
import AppointmentModel from "../models/Appintment.ts";

// Create prescription
export const createPrescription = async (req: Request, res: Response) => {
  try {
    const { appointmentId, patientId, medicines, diagnosis, notes } = req.body;
    const doctorId = req.user?.id;

    if (req.user?.role !== "doctor") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!appointmentId || !patientId || !medicines || !diagnosis) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Verify appointment exists
    const appointment = await AppointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const prescription = await PrescriptionModel.create({
      appointmentId,
      doctorId,
      patientId,
      medicines,
      diagnosis,
      notes,
    });

    res.status(201).json({ message: "Prescription created", prescription });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating prescription", error: error.message });
  }
};

// Get prescriptions for patient
export const getPatientPrescriptions = async (req: Request, res: Response) => {
  try {
    const patientId = req.user?.role === "patient" ? req.user.id : req.params.patientId;

    const prescriptions = await PrescriptionModel.find({ patientId }).sort({
      createdAt: -1,
    });

    res.json({ prescriptions });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching prescriptions", error: error.message });
  }
};

// Get prescription by ID
export const getPrescriptionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const prescription = await PrescriptionModel.findById(id);

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.json({ prescription });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching prescription", error: error.message });
  }
};
