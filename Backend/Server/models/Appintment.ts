import mongoose, { Schema, Document } from "mongoose";
export interface IAppointment extends Document {
  patientId: string;
  doctorId: string;
  scheduledAt: Date;
  sex: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  reason: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    patientId: { type: String, required: true, index: true },
    doctorId: { type: String, required: true, index: true },
    scheduledAt: { type: Date, required: true },
    sex: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
      required: true,
    },
    reason: { type: String ,required: true},
    notes: { type: String , required: true},
  },
  { timestamps: true }
);

// Avoid OverwriteModelError in dev / watch mode
const AppointmentModel =
  (mongoose.models &&
    (mongoose.models.Appointment as mongoose.Model<IAppointment>)) ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export default AppointmentModel;
