import React, { useEffect, useState } from "react";
import { appointmentService } from "../../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Calendar, Clock, User } from "lucide-react";

export const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchAppointments();
  }, [filter]);

  const fetchAppointments = async () => {
    try {
      const params = filter !== "all" ? { status: filter } : {};
      const response = await appointmentService.getAll(params);
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await appointmentService.update(id, { status });
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading appointments...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        {["all", "pending", "confirmed", "completed"].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            onClick={() => setFilter(status)}
            size="sm"
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      {appointments.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-gray-500">
            No appointments found
          </CardContent>
        </Card>
      ) : (
        appointments.map((appointment) => (
          <Card key={appointment._id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Appointment #{appointment._id.slice(-6)}
                </CardTitle>
                <Badge className={getStatusColor(appointment.status)}>
                  {appointment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>Patient ID: {appointment.patientId}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>
                    {new Date(appointment.scheduledAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>
                    {new Date(appointment.scheduledAt).toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-sm">
                  <strong>Reason:</strong> {appointment.reason}
                </div>
                {appointment.notes && (
                  <div className="text-sm">
                    <strong>Notes:</strong> {appointment.notes}
                  </div>
                )}

                {appointment.status === "pending" && (
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={() => updateStatus(appointment._id, "confirmed")}
                      size="sm"
                    >
                      Confirm
                    </Button>
                    <Button
                      onClick={() => updateStatus(appointment._id, "cancelled")}
                      variant="destructive"
                      size="sm"
                    >
                      Reject
                    </Button>
                  </div>
                )}

                {appointment.status === "confirmed" && (
                  <Button
                    onClick={() => updateStatus(appointment._id, "completed")}
                    size="sm"
                  >
                    Mark as Completed
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
