import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  appointmentId: string;
  patientId: string;
  doctorId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: "pending" | "completed" | "failed" | "refunded";
  transactionId?: string;
  invoiceUrl?: string;
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    appointmentId: { type: String, required: true, index: true },
    patientId: { type: String, required: true, index: true },
    doctorId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    paymentMethod: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    transactionId: { type: String },
    invoiceUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model<IPayment>("Payment", PaymentSchema);
