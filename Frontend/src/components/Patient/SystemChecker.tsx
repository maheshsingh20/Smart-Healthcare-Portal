// frontend/src/components/SymptomChecker.tsx
import React, { useState } from "react";

type Diff = { condition: string; probability: string; advice: string };
type ResultShape = {
  triage: "home" | "see-doctor" | "urgent" | "emergency";
  differential: Diff[];
  confidence: string;
  explain: string;
};

export default function SymptomChecker() {
  const [age, setAge] = useState<number | "">("");
  const [sex, setSex] = useState<string>("male");
  const [symptomText, setSymptomText] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultShape | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addSymptom = () => {
    const s = symptomText.trim();
    if (!s) return;
    setSymptoms((p) => [...p, s]);
    setSymptomText("");
  };

  const removeSymptom = (i: number) =>
    setSymptoms((p) => p.filter((_, idx) => idx !== i));

  const handleSubmit = async () => {
    setError(null);
    if (symptoms.length === 0) {
      setError("Please add at least one symptom.");
      return;
    }
    setLoading(true);
    try {
      const body = {
        userId: localStorage.getItem("userId") || null, // optional
        age: age === "" ? null : Number(age),
        sex,
        symptoms,
        description,
      };

      const resp = await fetch("http://localhost:3001/api/symptoms/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data.message || "Server error");
      }
      setResult(data.result);
    } catch (err: any) {
      setError(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">AI Symptom Checker</h2>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) =>
            setAge(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="p-2 border rounded"
        />
        <select
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex gap-2 mb-3">
        <input
          placeholder="Add symptom (e.g., 'fever')"
          value={symptomText}
          onChange={(e) => setSymptomText(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && (e.preventDefault(), addSymptom())
          }
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={addSymptom}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </div>

      <div className="mb-3">
        {symptoms.map((s, i) => (
          <span
            key={i}
            className="inline-flex items-center mr-2 mb-2 px-3 py-1 rounded bg-gray-100"
          >
            {s}
            <button
              onClick={() => removeSymptom(i)}
              className="ml-2 text-red-500"
            >
              x
            </button>
          </span>
        ))}
      </div>

      <textarea
        placeholder="Describe more details (onset, severity, triggers)..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        rows={4}
      />

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {loading ? "Checking..." : "Check"}
        </button>
        <button
          onClick={() => {
            setSymptoms([]);
            setDescription("");
            setResult(null);
            setError(null);
          }}
          className="px-4 py-2 border rounded"
        >
          Reset
        </button>
      </div>

      {error && <div className="mt-3 text-red-600">{error}</div>}

      {result && (
        <div className="mt-6 p-4 border rounded bg-white">
          <h3 className="font-semibold">
            Triage: <span className="capitalize">{result.triage}</span>
          </h3>
          <p className="text-sm text-gray-600">{result.explain}</p>
          <div className="mt-3">
            <h4 className="font-medium">Possible conditions</h4>
            <ul className="list-disc pl-6">
              {result.differential.map((d, i) => (
                <li key={i}>
                  <strong>{d.condition}</strong> — <em>{d.probability}</em>.{" "}
                  {d.advice}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded"
              onClick={() => {
                /* navigate to contact doctor */
              }}
            >
              Contact Doctor
            </button>
            {result.triage === "emergency" && (
              <a
                href="tel:112"
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Call emergency
              </a>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        <strong>Disclaimer:</strong> This is an informational tool and not a
        diagnosis. For emergencies, call local emergency services.
      </div>
    </div>
  );
}
