import type { Request, Response } from "express";
import ReviewModel from "../models/ReviewModel.ts";
import DoctorModel from "../models/DoctorModel.ts";
import AppointmentModel from "../models/Appintment.ts";

// Create review
export const createReview = async (req: Request, res: Response) => {
  try {
    const { doctorId, appointmentId, rating, review } = req.body;
    const patientId = req.user?.id;

    if (!patientId || !doctorId || !appointmentId || !rating || !review) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if appointment exists and is completed
    const appointment = await AppointmentModel.findById(appointmentId);
    if (!appointment || appointment.status !== "completed") {
      return res.status(400).json({ message: "Can only review completed appointments" });
    }

    // Check if review already exists
    const existingReview = await ReviewModel.findOne({ appointmentId });
    if (existingReview) {
      return res.status(400).json({ message: "Review already exists for this appointment" });
    }

    const newReview = await ReviewModel.create({
      doctorId,
      patientId,
      appointmentId,
      rating,
      review,
      isVerified: true,
    });

    // Update doctor's average rating
    const reviews = await ReviewModel.find({ doctorId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await DoctorModel.findByIdAndUpdate(doctorId, {
      rating: Math.round(avgRating * 10) / 10,
      totalReviews: reviews.length,
    });

    res.status(201).json({ message: "Review created", review: newReview });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating review", error: error.message });
  }
};

// Get reviews for a doctor
export const getDoctorReviews = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;
    const reviews = await ReviewModel.find({ doctorId }).sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching reviews", error: error.message });
  }
};

// Doctor responds to review
export const respondToReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { doctorResponse } = req.body;
    const doctorId = req.user?.id;

    if (req.user?.role !== "doctor") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const review = await ReviewModel.findOne({ _id: id, doctorId });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.doctorResponse = doctorResponse;
    await review.save();

    res.json({ message: "Response added", review });
  } catch (error: any) {
    res.status(500).json({ message: "Error responding to review", error: error.message });
  }
};
