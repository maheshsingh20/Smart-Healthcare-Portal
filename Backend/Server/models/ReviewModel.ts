import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  doctorId: string;
  patientId: string;
  appointmentId: string;
  rating: number;
  review: string;
  doctorResponse?: string;
  isVerified: boolean;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    doctorId: { type: String, required: true, index: true },
    patientId: { type: String, required: true },
    appointmentId: { type: String, required: true, unique: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    doctorResponse: { type: String },
    isVerified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Review ||
  mongoose.model<IReview>("Review", ReviewSchema);
