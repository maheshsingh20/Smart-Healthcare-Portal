import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role: "admin" | "doctor" | "patient" | "staff";
  isActive: boolean;
  isVerified: boolean;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  lastLogin?: Date;
  loginAttempts: number;
  lockoutUntil?: Date;
  statusReason?: string;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["admin", "doctor", "patient", "staff"],
      required: true,
    },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String, select: false },
    lastLogin: Date,
    loginAttempts: { type: Number, default: 0 },
    lockoutUntil: Date,
    statusReason: String,
  },
  { timestamps: true }
);

// Index for faster queries
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1, isActive: 1 });

export default mongoose.model<IUser>("User", UserSchema);
