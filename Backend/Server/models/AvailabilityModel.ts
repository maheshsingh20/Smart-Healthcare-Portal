import mongoose, { Schema, Document } from "mongoose";

export interface IAvailability extends Document {
  doctorId: string;
  dayOfWeek: number; // 0=Sunday, 6=Saturday
  startTime: string; // "09:00"
  endTime: string; // "17:00"
  breakStart?: string;
  breakEnd?: string;
  slotDuration: number; // minutes
  maxAppointments: number;
  isActive: boolean;
}

const AvailabilitySchema = new Schema<IAvailability>(
  {
    doctorId: { type: String, required: true, index: true },
    dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    breakStart: { type: String },
    breakEnd: { type: String },
    slotDuration: { type: Number, default: 30 },
    maxAppointments: { type: Number, default: 20 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Compound index for efficient queries
AvailabilitySchema.index({ doctorId: 1, dayOfWeek: 1 });

export default mongoose.models.Availability ||
  mongoose.model<IAvailability>("Availability", AvailabilitySchema);
