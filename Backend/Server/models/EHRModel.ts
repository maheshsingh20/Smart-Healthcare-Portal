import mongoose, { Schema, Document } from "mongoose";

interface IMedicalHistory {
  condition: string;
  diagnosedDate: Date;
  status: "active" | "resolved";
}

interface IAllergy {
  allergen: string;
  severity: "mild" | "moderate" | "severe";
  reaction: string;
}

interface IDocument {
  title: string;
  type: "lab_report" | "prescription" | "scan" | "other";
  url: string;
  uploadedAt: Date;
}

export interface IEHR extends Document {
  patientId: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  allergies: IAllergy[];
  currentMedications: string[];
  medicalHistory: IMedicalHistory[];
  familyHistory: string[];
  documents: IDocument[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  updatedAt: Date;
}

const EHRSchema = new Schema<IEHR>(
  {
    patientId: { type: String, required: true, unique: true, index: true },
    bloodGroup: { type: String },
    height: { type: Number },
    weight: { type: Number },
    allergies: [
      {
        allergen: String,
        severity: { type: String, enum: ["mild", "moderate", "severe"] },
        reaction: String,
      },
    ],
    currentMedications: [String],
    medicalHistory: [
      {
        condition: String,
        diagnosedDate: Date,
        status: { type: String, enum: ["active", "resolved"] },
      },
    ],
    familyHistory: [String],
    documents: [
      {
        title: String,
        type: {
          type: String,
          enum: ["lab_report", "prescription", "scan", "other"],
        },
        url: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.EHR || mongoose.model<IEHR>("EHR", EHRSchema);
