/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export default function BookAppointmentPage() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [doctor, setDoctor] = useState<any>(null);
  const [form, setForm] = useState({
    doctorId: doctorId || "",
    scheduledAt: "",
    sex: "",
    reason: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDoctor() {
      if (!doctorId) return;
      try {
        const res = await fetch(`${API}/doctors/${doctorId}`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          setError(body.message || "Failed to load doctor details");
          return;
        }
        const data = await res.json();
        setDoctor(data);
      } catch (err) {
        console.error("Failed to fetch doctor details", err);
        setError("Unable to reach server to load doctor details.");
      }
    }
    fetchDoctor();
  }, [doctorId]);

  const handleChange =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((s) => ({ ...s, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setError(null);

    if (!user) {
      setError("Please login first.");
      return;
    }
    if (!form.doctorId) {
      setError("Doctor ID missing. Go back and select a doctor.");
      return;
    }
    if (!form.scheduledAt) {
      setError("Please choose a date & time.");
      return;
    }
    if (!form.sex) {
      setError("Please select sex.");
      return;
    }
    if (!form.reason) {
      setError("Please enter a reason for the appointment.");
      return;
    }
    if (!form.notes) {
      setError("Please enter notes.");
      return;
    }

    setLoading(true);
    try {
      const bodyPayload = {
        doctorId: form.doctorId,
        scheduledAt: new Date(form.scheduledAt).toISOString(),
        sex: form.sex,
        reason: form.reason,
        notes: form.notes,
      };

      const res = await fetch(`${API}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyPayload),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setMsg("Appointment booked successfully!");
        setTimeout(() => navigate("/patient/dashboard"), 800);
      } else {
        setError(data.message || "Failed to book appointment");
      }
    } catch (err) {
      console.error("Create appointment error:", err);
      setError("Network error — could not reach backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/90 dark:bg-slate-900/80 rounded-2xl p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>

        {doctor && (
          <p className="mb-3 text-sm text-muted-foreground">
            Doctor: <b>{doctor.name}</b> ({doctor.specialization})
          </p>
        )}

        {msg && (
          <div className="mb-3 p-2 text-center border rounded-md text-green-700 bg-green-50">
            {msg}
          </div>
        )}
        {error && (
          <div className="mb-3 p-2 text-center border rounded-md text-red-700 bg-red-50">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-3">
          {/* Patient Name (read-only) */}
          <label className="text-sm">
            Patient
            <input
              value={user?.name || ""}
              readOnly
              className="w-full mt-1 rounded-lg border px-3 py-2 bg-gray-50 dark:bg-slate-800"
            />
          </label>

          {/* Doctor (read-only) */}
          <label className="text-sm">
            Doctor
            <input
              value={doctor?.name || form.doctorId}
              readOnly
              className="w-full mt-1 rounded-lg border px-3 py-2 bg-gray-50 dark:bg-slate-800"
            />
          </label>

          <label className="text-sm">
            Scheduled At
            <input
              type="datetime-local"
              value={form.scheduledAt}
              onChange={handleChange("scheduledAt")}
              className="w-full mt-1 rounded-lg border px-3 py-2 bg-transparent"
              required
            />
          </label>

          <label className="text-sm">
            Sex
            <select
              value={form.sex}
              onChange={handleChange("sex")}
              className="w-full mt-1 rounded-lg border px-3 py-2 bg-transparent"
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label className="text-sm">
            Reason
            <input
              value={form.reason}
              onChange={handleChange("reason")}
              className="w-full mt-1 rounded-lg border px-3 py-2 bg-transparent"
              required
            />
          </label>

          <label className="text-sm">
            Notes
            <textarea
              value={form.notes}
              onChange={handleChange("notes")}
              rows={3}
              className="w-full mt-1 rounded-lg border px-3 py-2 bg-transparent"
              required
            />
          </label>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              {loading ? "Booking..." : "Confirm Appointment"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="py-2 px-4 rounded-lg border"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
