import mongoose, { Document, Schema } from 'mongoose';
export interface IPatientForm extends Document {
  name: string;
  email: string;
  age: number;
  gender: string;
  symptoms: string[];
  message: string;
}
const PatientFormSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  symptoms: { type: String, required: true },
  message: { type: String, required: true },
});
export default mongoose.model<IPatientForm>('PatientForm', PatientFormSchema);