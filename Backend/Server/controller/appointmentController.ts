import type { Request, Response } from "express";
import AppointmentModel from "../models/Appintment.ts";
import NotificationModel from "../models/NotificationModel.ts";

// Create appointment
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { doctorId, scheduledAt, sex, reason, notes } = req.body;
    const patientId = req.user?.id;

    if (!patientId || !doctorId || !scheduledAt || !sex || !reason) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const appointment = await AppointmentModel.create({
      patientId,
      doctorId,
      scheduledAt,
      sex,
      reason,
      notes: notes || "",
      status: "pending",
    });

    // Create notification for doctor
    await NotificationModel.create({
      userId: doctorId,
      userRole: "doctor",
      type: "appointment",
      title: "New Appointment Request",
      message: `You have a new appointment request for ${new Date(scheduledAt).toLocaleDateString()}`,
      actionUrl: `/doctor/appointments/${appointment._id}`,
    });

    res.status(201).json({ message: "Appointment created", appointment });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating appointment", error: error.message });
  }
};

// Get appointments (filtered by role)
export const getAppointments = async (req: Request, res: Response) => {
  try {
    const { role, id } = req.user!;
    const { status } = req.query;

    let query: any = {};
    if (role === "doctor") query.doctorId = id;
    if (role === "patient") query.patientId = id;
    if (status) query.status = status;

    const appointments = await AppointmentModel.find(query).sort({ scheduledAt: -1 });
    res.json({ appointments });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching appointments", error: error.message });
  }
};

// Get appointment by ID
export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appointment = await AppointmentModel.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ appointment });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching appointment", error: error.message });
  }
};

// Update appointment status
export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const { role } = req.user!;

    if (role !== "doctor" && role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const appointment = await AppointmentModel.findByIdAndUpdate(
      id,
      { status, notes },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Notify patient
    await NotificationModel.create({
      userId: appointment.patientId,
      userRole: "patient",
      type: "appointment",
      title: "Appointment Updated",
      message: `Your appointment status has been updated to ${status}`,
      actionUrl: `/patient/appointments/${appointment._id}`,
    });

    res.json({ message: "Appointment updated", appointment });
  } catch (error: any) {
    res.status(500).json({ message: "Error updating appointment", error: error.message });
  }
};

// Delete/Cancel appointment
export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appointment = await AppointmentModel.findByIdAndUpdate(
      id,
      { status: "cancelled" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment cancelled", appointment });
  } catch (error: any) {
    res.status(500).json({ message: "Error cancelling appointment", error: error.message });
  }
};
