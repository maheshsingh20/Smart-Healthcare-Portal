import React, { useState } from "react";
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  age: number;
  gender: string;
  symptoms: string[];
  message: string;
}

const PatientForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    age: 0,
    gender: "",
    symptoms: [],
    message: "",
  });

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const symptomsList = ["Fever", "Cough", "Headache", "Fatigue", "Body Pain"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const finalData = { ...formData, symptoms: selectedSymptoms };
      const res = await axios.post(
        "http://localhost:5000/api/form/submit",
        finalData
      );
      alert(res.data.message);
      setFormData({
        name: "",
        email: "",
        age: 0,
        gender: "",
        symptoms: [],
        message: "",
      });
      setSelectedSymptoms([]);
    } catch (error) {
      alert("Error submitting form");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 text-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Patient Health Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
          required
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <div>
          <label className="block mb-1">Symptoms:</label>
          {symptomsList.map((symptom) => (
            <label key={symptom} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedSymptoms.includes(symptom)}
                onChange={() => handleCheckboxChange(symptom)}
              />
              {symptom}
            </label>
          ))}
        </div>

        <textarea
          name="message"
          placeholder="Describe your problem..."
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
          rows={4}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
