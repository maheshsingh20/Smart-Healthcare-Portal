import mongoose, { Schema, Document, Model } from "mongoose";

// ✅ Declare interface once
export interface IDoctor extends Document {
  name: string;
  email: string;
  password: string;
  specialization: string;
  phone: string;
  isApproved: boolean;
  experience?: number;
  qualification?: string;
  consultationFee?: number;
  bio?: string;
  languages?: string[];
  rating?: number;
  totalReviews?: number;
}

const DoctorSchema: Schema<IDoctor> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    specialization: { type: String, required: true },
    phone: { type: String, required: true },
    isApproved: { type: Boolean, default: false, required: true },
    experience: { type: Number },
    qualification: { type: String },
    consultationFee: { type: Number },
    bio: { type: String },
    languages: [{ type: String }],
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const DoctorModel: Model<IDoctor> =
  (mongoose.models.Doctor as Model<IDoctor>) ||
  mongoose.model<IDoctor>("Doctor", DoctorSchema);

// ✅ Export the model and the type separately
export default DoctorModel;
