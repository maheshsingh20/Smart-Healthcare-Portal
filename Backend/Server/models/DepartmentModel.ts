import mongoose, { Schema, Document } from "mongoose";

export interface IDepartment extends Document {
  hospitalId: mongoose.Types.ObjectId;
  name: string;
  code: string;
  headOfDepartment?: mongoose.Types.ObjectId;
  facilities: string[];
  services: string[];
  operatingHours: Array<{
    day: string;
    openTime: string;
    closeTime: string;
  }>;
  bedCapacity: number;
  availableBeds: number;
  equipment: Array<{
    name: string;
    quantity: number;
    status: "operational" | "maintenance" | "out_of_service";
  }>;
  isActive: boolean;
}

const DepartmentSchema: Schema = new Schema(
  {
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    name: { type: String, required: true },
    code: { type: String, required: true },
    headOfDepartment: { type: Schema.Types.ObjectId, ref: "Doctor" },
    facilities: [String],
    services: [String],
    operatingHours: [
      {
        day: String,
        openTime: String,
        closeTime: String,
      },
    ],
    bedCapacity: { type: Number, default: 0 },
    availableBeds: { type: Number, default: 0 },
    equipment: [
      {
        name: String,
        quantity: Number,
        status: {
          type: String,
          enum: ["operational", "maintenance", "out_of_service"],
          default: "operational",
        },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IDepartment>("Department", DepartmentSchema);
