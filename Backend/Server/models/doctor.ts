// import mongoose, { Document, Schema } from "mongoose";

// export interface IDoctor extends Document {
//   name: string;
//   email: string;
//   avatar?: string;
//   phone?: string;
//   specialization?: string;
//   department?: string;
//   degree?: string;
//   experience?: number;
//   location?: string;
//   currentHospital?: string;
//   contact?: string;
// }

// const DoctorSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   avatar: { type: String },
//   phone: { type: String },
//   specialization: { type: String },
//   department: { type: String },
//   degree: { type: String },
//   experience: { type: Number },
//   location: { type: String },
//   currentHospital: { type: String },
//   contact: { type: String },
// });

// export default mongoose.model<IDoctor>("Doctor", DoctorSchema);
