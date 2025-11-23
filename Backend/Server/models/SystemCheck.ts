// backend/models/SymptomCheck.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ISymptomCheck extends Document {
  userId?: string | null;
  age?: number | null;
  sex?: string | null;
  symptoms: string[];
  description?: string;
  result: any;
  createdAt: Date;
}

const SymptomCheckSchema = new Schema<ISymptomCheck>(
  {
    userId: { type: String },
    age: { type: Number },
    sex: { type: String },
    symptoms: { type: [String], required: true },
    description: { type: String },
    result: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.SymptomCheck ||
  mongoose.model<ISymptomCheck>("SymptomCheck", SymptomCheckSchema);
