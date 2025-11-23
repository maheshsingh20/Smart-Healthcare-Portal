import type { Request, Response } from "express";
import DoctorModel from "../models/DoctorModel.ts";
import ReviewModel from "../models/ReviewModel.ts";
import AvailabilityModel from "../models/AvailabilityModel.ts";
import NotificationModel from "../models/NotificationModel.ts";

// Get all doctors with filters
export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const { specialization, isApproved, minRating, search } = req.query;

    let query: any = {};
    if (specialization) query.specialization = specialization;
    if (isApproved !== undefined) query.isApproved = isApproved === "true";
    if (minRating) query.rating = { $gte: Number(minRating) };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { specialization: { $regex: search, $options: "i" } },
      ];
    }

    const doctors = await DoctorModel.find(query).select("-password");
    res.json({ doctors });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching doctors", error: error.message });
  }
};

// Get doctor by ID
export const getDoctorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doctor = await DoctorModel.findById(id).select("-password");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Get reviews
    const reviews = await ReviewModel.find({ doctorId: id }).limit(10);

    res.json({ doctor, reviews });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching doctor", error: error.message });
  }
};

// Update doctor profile
export const updateDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Prevent updating sensitive fields
    delete updates.password;
    delete updates.isApproved;
    delete updates.rating;
    delete updates.totalReviews;

    const doctor = await DoctorModel.findByIdAndUpdate(id, updates, {
      new: true,
    }).select("-password");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({ message: "Profile updated", doctor });
  } catch (error: any) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};

// Approve doctor (Admin only)
export const approveDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;

    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const doctor = await DoctorModel.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true }
    ).select("-password");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Notify doctor
    await NotificationModel.create({
      userId: id,
      userRole: "doctor",
      type: "approval",
      title: isApproved ? "Account Approved" : "Account Rejected",
      message: isApproved
        ? "Your account has been approved. You can now start accepting appointments."
        : "Your account application has been rejected. Please contact support.",
    });

    res.json({ message: "Doctor approval status updated", doctor });
  } catch (error: any) {
    res.status(500).json({ message: "Error updating approval", error: error.message });
  }
};

// Delete doctor (Admin only)
export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const doctor = await DoctorModel.findByIdAndDelete(id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({ message: "Doctor deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting doctor", error: error.message });
  }
};

// Get doctor availability
export const getDoctorAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const availability = await AvailabilityModel.find({ doctorId: id, isActive: true });
    res.json({ availability });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching availability", error: error.message });
  }
};

// Set doctor availability
export const setDoctorAvailability = async (req: Request, res: Response) => {
  try {
    const doctorId = req.user?.id;
    const availabilityData = req.body;

    if (req.user?.role !== "doctor") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Delete existing availability
    await AvailabilityModel.deleteMany({ doctorId });

    // Create new availability
    const availability = await AvailabilityModel.insertMany(
      availabilityData.map((slot: any) => ({ ...slot, doctorId }))
    );

    res.json({ message: "Availability updated", availability });
  } catch (error: any) {
    res.status(500).json({ message: "Error setting availability", error: error.message });
  }
};
