import React, { useState } from "react";
import { prescriptionService } from "../../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Plus, Trash2 } from "lucide-react";

interface PrescriptionFormProps {
  appointmentId: string;
  patientId: string;
  onSuccess?: () => void;
}

export const PrescriptionForm: React.FC<PrescriptionFormProps> = ({
  appointmentId,
  patientId,
  onSuccess,
}) => {
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", frequency: "", duration: "", instructions: "" },
  ]);
  const [loading, setLoading] = useState(false);

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      { name: "", dosage: "", frequency: "", duration: "", instructions: "" },
    ]);
  };

  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const updateMedicine = (index: number, field: string, value: string) => {
    const updated = [...medicines];
    updated[index] = { ...updated[index], [field]: value };
    setMedicines(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await prescriptionService.create({
        appointmentId,
        patientId,
        diagnosis,
        notes,
        medicines: medicines.filter((m) => m.name),
      });

      alert("Prescription created successfully!");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error creating prescription:", error);
      alert("Failed to create prescription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Prescription</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="diagnosis">Diagnosis *</Label>
            <Input
              id="diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Medicines</Label>
              <Button type="button" onClick={addMedicine} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Medicine
              </Button>
            </div>

            {medicines.map((medicine, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Medicine {index + 1}</span>
                    {medicines.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeMedicine(index)}
                        size="sm"
                        variant="ghost"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>

                  <Input
                    placeholder="Medicine name *"
                    value={medicine.name}
                    onChange={(e) => updateMedicine(index, "name", e.target.value)}
                    required
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Dosage *"
                      value={medicine.dosage}
                      onChange={(e) => updateMedicine(index, "dosage", e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Frequency *"
                      value={medicine.frequency}
                      onChange={(e) =>
                        updateMedicine(index, "frequency", e.target.value)
                      }
                      required
                    />
                  </div>
                  <Input
                    placeholder="Duration *"
                    value={medicine.duration}
                    onChange={(e) => updateMedicine(index, "duration", e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Instructions"
                    value={medicine.instructions}
                    onChange={(e) =>
                      updateMedicine(index, "instructions", e.target.value)
                    }
                  />
                </div>
              </Card>
            ))}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Prescription"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
