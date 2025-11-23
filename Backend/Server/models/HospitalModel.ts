import mongoose, { Schema, Document } from "mongoose";

export interface IHospital extends Document {
  name: string;
  registrationNumber: string;
  type: "general" | "specialty" | "clinic" | "diagnostic_center";
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
    emergencyNumber: string;
  };
  facilities: string[];
  accreditations: string[];
  operatingHours: Array<{
    day: string;
    openTime: string;
    closeTime: string;
    is24Hours: boolean;
  }>;
  bedCapacity: {
    total: number;
    available: number;
    icu: number;
    emergency: number;
  };
  ambulanceServices: boolean;
  emergencyServices: boolean;
  logo?: string;
  images: string[];
  rating: number;
  isActive: boolean;
}

const HospitalSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    registrationNumber: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: ["general", "specialty", "clinic", "diagnostic_center"],
      required: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    contact: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
      website: String,
      emergencyNumber: String,
    },
    facilities: [String],
    accreditations: [String],
    operatingHours: [
      {
        day: String,
        openTime: String,
        closeTime: String,
        is24Hours: Boolean,
      },
    ],
    bedCapacity: {
      total: { type: Number, default: 0 },
      available: { type: Number, default: 0 },
      icu: { type: Number, default: 0 },
      emergency: { type: Number, default: 0 },
    },
    ambulanceServices: { type: Boolean, default: false },
    emergencyServices: { type: Boolean, default: true },
    logo: String,
    images: [String],
    rating: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IHospital>("Hospital", HospitalSchema);
