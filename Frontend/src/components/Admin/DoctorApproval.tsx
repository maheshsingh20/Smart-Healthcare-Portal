/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, User, Award, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export function DoctorApproval() {
  const { token } = useAuth();
  const [pendingDoctors, setPendingDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingDoctors();
  }, []);

  const fetchPendingDoctors = async () => {
    try {
      const res = await fetch(`${API}/doctors?isApproved=false`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPendingDoctors(data.doctors || []);
    } catch (error) {
      console.error("Failed to fetch pending doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const approveDoctor = async (doctorId: string) => {
    try {
      const res = await fetch(`${API}/admin/doctors/${doctorId}/approve`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchPendingDoctors();
      }
    } catch (error) {
      console.error("Failed to approve doctor:", error);
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Doctor Approval Queue ({pendingDoctors.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingDoctors.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <p>No pending doctor approvals</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-l-4 border-l-orange-500">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                              <User className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">{doctor.name}</h3>
                              <p className="text-sm text-muted-foreground">{doctor.email}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                <strong>Specialization:</strong> {doctor.specialization}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                <strong>Experience:</strong> {doctor.experience} years
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">
                                <strong>License:</strong> {doctor.licenseNumber}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">
                                <strong>Phone:</strong> {doctor.phone}
                              </span>
                            </div>
                          </div>

                          {doctor.qualifications && doctor.qualifications.length > 0 && (
                            <div>
                              <p className="text-sm font-medium mb-2">Qualifications:</p>
                              <div className="flex flex-wrap gap-2">
                                {doctor.qualifications.map((qual: string, idx: number) => (
                                  <Badge key={idx} variant="secondary">
                                    {qual}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          <Badge variant="outline" className="bg-orange-500/10 text-orange-600">
                            Pending Approval
                          </Badge>
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <Button
                            size="sm"
                            onClick={() => approveDoctor(doctor._id)}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="flex items-center gap-2"
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
