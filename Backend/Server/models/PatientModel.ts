import mongoose, { Schema, Document } from "mongoose";

export interface IPatient extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

const PatientSchema = new Schema<IPatient>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Patient ||
  mongoose.model<IPatient>("Patient", PatientSchema);
