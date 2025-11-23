/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, FileText, X, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

interface Appointment {
  _id: string;
  doctorId: any;
  patientId: string;
  scheduledAt: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  reason: string;
  notes: string;
  sex: string;
  createdAt: string;
}

export function AppointmentHistory() {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${API}/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAppointments(data.appointments || []);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id: string) => {
    try {
      await fetch(`${API}/appointments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAppointments();
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "pending": return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
      case "completed": return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "cancelled": return "bg-red-500/10 text-red-600 dark:text-red-400";
      default: return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "cancelled": return <X className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filteredAppointments = appointments.filter(apt => 
    filter === "all" || apt.status === filter
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {["all", "pending", "confirmed", "completed", "cancelled"].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(status)}
            className="capitalize"
          >
            {status}
          </Button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        {filteredAppointments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No appointments found</p>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {filteredAppointments.map((appointment) => (
              <motion.div
                key={appointment._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5 text-primary" />
                          Dr. {appointment.doctorId?.name || "Unknown"}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {appointment.doctorId?.specialization}
                        </p>
                      </div>
                      <Badge className={`${getStatusColor(appointment.status)} flex items-center gap-1`}>
                        {getStatusIcon(appointment.status)}
                        {appointment.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(appointment.scheduledAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(appointment.scheduledAt).toLocaleTimeString()}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Reason</p>
                          <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                        </div>
                      </div>
                      {appointment.notes && (
                        <div className="flex items-start gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Notes</p>
                            <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {appointment.status === "pending" && (
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => cancelAppointment(appointment._id)}
                          className="flex items-center gap-2"
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
