import mongoose, { Schema, Document } from "mongoose";

interface IMedicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface IPrescription extends Document {
  appointmentId: string;
  doctorId: string;
  patientId: string;
  medicines: IMedicine[];
  diagnosis: string;
  notes: string;
  createdAt: Date;
}

const MedicineSchema = new Schema<IMedicine>({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  duration: { type: String, required: true },
  instructions: { type: String },
});

const PrescriptionSchema = new Schema<IPrescription>(
  {
    appointmentId: { type: String, required: true, index: true },
    doctorId: { type: String, required: true },
    patientId: { type: String, required: true, index: true },
    medicines: [MedicineSchema],
    diagnosis: { type: String, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Prescription ||
  mongoose.model<IPrescription>("Prescription", PrescriptionSchema);
