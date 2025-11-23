/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, User, FileText, CheckCircle, XCircle, Pill } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

interface Appointment {
  _id: string;
  doctorId: string;
  patientId: any;
  scheduledAt: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  reason: string;
  notes: string;
  sex: string;
}

export function DoctorAppointments() {
  const { token } = useAuth();
  const navigate = useNavigate();
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

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      await fetch(`${API}/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      fetchAppointments();
    } catch (error) {
      console.error("Failed to update appointment:", error);
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

  const filteredAppointments = appointments.filter(apt => 
    filter === "all" || apt.status === filter
  );

  const todayAppointments = filteredAppointments.filter(apt => {
    const aptDate = new Date(apt.scheduledAt);
    const today = new Date();
    return aptDate.toDateString() === today.toDateString();
  });

  const upcomingAppointments = filteredAppointments.filter(apt => {
    const aptDate = new Date(apt.scheduledAt);
    const today = new Date();
    return aptDate > today && aptDate.toDateString() !== today.toDateString();
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                {appointment.patientId?.name || "Unknown Patient"}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {appointment.sex} • {appointment.patientId?.phone}
              </p>
            </div>
            <Badge className={getStatusColor(appointment.status)}>
              {appointment.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
                <p className="text-sm font-medium">Chief Complaint</p>
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

          <div className="flex flex-wrap gap-2 pt-2">
            {appointment.status === "pending" && (
              <>
                <Button
                  size="sm"
                  onClick={() => updateAppointmentStatus(appointment._id, "confirmed")}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Confirm
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => updateAppointmentStatus(appointment._id, "cancelled")}
                  className="flex items-center gap-2"
                >
                  <XCircle className="h-4 w-4" />
                  Decline
                </Button>
              </>
            )}
            {appointment.status === "confirmed" && (
              <>
                <Button
                  size="sm"
                  onClick={() => updateAppointmentStatus(appointment._id, "completed")}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Complete
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Pill className="h-4 w-4" />
                      Prescribe
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Prescription</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">
                      Prescription form will be implemented here
                    </p>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {["all", "pending", "confirmed", "completed"].map((status) => (
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

      {todayAppointments.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Today's Appointments ({todayAppointments.length})
          </h3>
          <div className="grid gap-4">
            {todayAppointments.map((appointment) => (
              <AppointmentCard key={appointment._id} appointment={appointment} />
            ))}
          </div>
        </div>
      )}

      {upcomingAppointments.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Upcoming Appointments ({upcomingAppointments.length})
          </h3>
          <div className="grid gap-4">
            {upcomingAppointments.map((appointment) => (
              <AppointmentCard key={appointment._id} appointment={appointment} />
            ))}
          </div>
        </div>
      )}

      {filteredAppointments.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No appointments found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
