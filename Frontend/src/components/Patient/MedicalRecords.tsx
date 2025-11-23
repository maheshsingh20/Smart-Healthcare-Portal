/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Pill, Activity, Download, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

interface Prescription {
  _id: string;
  doctorId: any;
  patientId: string;
  appointmentId: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  diagnosis: string;
  notes: string;
  createdAt: string;
}

export function MedicalRecords() {
  const { token, user } = useAuth();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [ehr, setEhr] = useState<any>(null);

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const fetchMedicalRecords = async () => {
    try {
      const [prescRes, ehrRes] = await Promise.all([
        fetch(`${API}/prescriptions/patient/${user?.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API}/ehr/${user?.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (prescRes.ok) {
        const prescData = await prescRes.json();
        setPrescriptions(prescData.prescriptions || []);
      }

      if (ehrRes.ok) {
        const ehrData = await ehrRes.json();
        setEhr(ehrData.ehr);
      }
    } catch (error) {
      console.error("Failed to fetch medical records:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="prescriptions" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
        <TabsTrigger value="history">Medical History</TabsTrigger>
        <TabsTrigger value="vitals">Vitals</TabsTrigger>
      </TabsList>

      <TabsContent value="prescriptions" className="space-y-4">
        {prescriptions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Pill className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No prescriptions found</p>
            </CardContent>
          </Card>
        ) : (
          prescriptions.map((prescription, index) => (
            <motion.div
              key={prescription._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <Pill className="h-5 w-5 text-primary" />
                        Prescription
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        Dr. {prescription.doctorId?.name}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(prescription.createdAt).toLocaleDateString()}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Diagnosis</h4>
                    <p className="text-sm text-muted-foreground">{prescription.diagnosis}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Medications</h4>
                    <div className="space-y-2">
                      {prescription.medications.map((med, idx) => (
                        <div key={idx} className="p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <p className="font-medium">{med.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {med.dosage} • {med.frequency}
                              </p>
                            </div>
                            <Badge variant="secondary">{med.duration}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {prescription.notes && (
                    <div>
                      <h4 className="font-semibold mb-2">Additional Notes</h4>
                      <p className="text-sm text-muted-foreground">{prescription.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </TabsContent>

      <TabsContent value="history" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Medical History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ehr ? (
              <>
                <div>
                  <h4 className="font-semibold mb-2">Allergies</h4>
                  <div className="flex flex-wrap gap-2">
                    {ehr.allergies?.length > 0 ? (
                      ehr.allergies.map((allergy: string, idx: number) => (
                        <Badge key={idx} variant="destructive">{allergy}</Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No known allergies</p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Chronic Conditions</h4>
                  <div className="flex flex-wrap gap-2">
                    {ehr.chronicConditions?.length > 0 ? (
                      ehr.chronicConditions.map((condition: string, idx: number) => (
                        <Badge key={idx} variant="secondary">{condition}</Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No chronic conditions</p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Blood Type</h4>
                  <Badge variant="outline">{ehr.bloodType || "Not specified"}</Badge>
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No medical history available
              </p>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="vitals" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Vital Signs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Blood Pressure</p>
                <p className="text-2xl font-bold">120/80</p>
                <p className="text-xs text-muted-foreground">mmHg</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Heart Rate</p>
                <p className="text-2xl font-bold">72</p>
                <p className="text-xs text-muted-foreground">bpm</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Temperature</p>
                <p className="text-2xl font-bold">98.6</p>
                <p className="text-xs text-muted-foreground">°F</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Weight</p>
                <p className="text-2xl font-bold">70</p>
                <p className="text-xs text-muted-foreground">kg</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
