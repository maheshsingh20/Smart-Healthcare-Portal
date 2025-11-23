// routes/appointments.ts
import type { Request, Response } from "express";
import { Router } from "express";
import AppointmentModel from "../models/Appintment.ts"; // make sure file is models/Appointment.ts

const router = Router();

/**
 * Create appointment
 * Expects: { patientId, doctorId, appointmentDate, sex, reason, notes }
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { patientId, doctorId, appointmentDate, sex, reason, notes } =
      req.body as {
        patientId?: string;
        doctorId?: string;
        appointmentDate?: string;
        sex?: string;
        reason?: string;
        notes?: string;
      };

    // Validate required fields (model requires these)
    if (
      !patientId ||
      !doctorId ||
      !appointmentDate ||
      !sex ||
      !reason ||
      !notes
    ) {
      return res
        .status(400)
        .json({
          message:
            "patientId, doctorId, appointmentDate, sex, reason and notes are required",
        });
    }

    const scheduledAt = new Date(appointmentDate);
    if (isNaN(scheduledAt.getTime())) {
      return res.status(400).json({ message: "Invalid appointmentDate" });
    }

    const newAppointment = new AppointmentModel({
      patientId,
      doctorId,
      scheduledAt,
      sex,
      status: "pending",
      reason,
      notes,
    });

    const saved = await newAppointment.save();
    return res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating appointment:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * List appointments
 * Optional query: ?doctorId=...&patientId=...&status=...
 * Returns: array of appointments
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const doctorId = Array.isArray(req.query.doctorId)
      ? req.query.doctorId[0]
      : req.query.doctorId;
    const patientId = Array.isArray(req.query.patientId)
      ? req.query.patientId[0]
      : req.query.patientId;
    const status = Array.isArray(req.query.status)
      ? req.query.status[0]
      : req.query.status;

    const filter: any = {};
    if (doctorId) filter.doctorId = doctorId;
    if (patientId) filter.patientId = patientId;
    if (status) filter.status = status;

    const appointments = await AppointmentModel.find(filter).sort({
      scheduledAt: 1,
    });

    // return an array (frontend expects an array)
    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * Get single appointment
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const a = await AppointmentModel.findById(req.params.id);
    if (!a) return res.status(404).json({ message: "Not found" });
    return res.json(a);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * Update appointment (partial)
 * Accepts fields to update; if sending appointmentDate it will map to scheduledAt
 */
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updates: any = { ...req.body };
    if (updates.appointmentDate) {
      const d = new Date(updates.appointmentDate);
      if (isNaN(d.getTime()))
        return res.status(400).json({ message: "Invalid appointmentDate" });
      updates.scheduledAt = d;
      delete updates.appointmentDate;
    }
    const a = await AppointmentModel.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!a) return res.status(404).json({ message: "Not found" });
    return res.json(a);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * Delete appointment
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const a = await AppointmentModel.findByIdAndDelete(req.params.id);
    if (!a) return res.status(404).json({ message: "Not found" });
    return res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
