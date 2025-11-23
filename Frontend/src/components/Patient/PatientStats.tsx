/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, Pill, Activity } from "lucide-react";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export function PatientStats() {
  const { token, user } = useAuth();
  const [stats, setStats] = useState({
    totalAppointments: 0,
    upcomingAppointments: 0,
    prescriptions: 0,
    completedAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [appointmentsRes, prescriptionsRes] = await Promise.all([
        fetch(`${API}/appointments`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API}/prescriptions/patient/${user?.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const appointmentsData = await appointmentsRes.json();
      const prescriptionsData = await prescriptionsRes.json();

      const appointments = appointmentsData.appointments || [];
      const now = new Date();

      setStats({
        totalAppointments: appointments.length,
        upcomingAppointments: appointments.filter(
          (apt: any) => new Date(apt.scheduledAt) > now && apt.status !== "cancelled"
        ).length,
        prescriptions: prescriptionsData.prescriptions?.length || 0,
        completedAppointments: appointments.filter(
          (apt: any) => apt.status === "completed"
        ).length,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Appointments",
      value: stats.totalAppointments,
      icon: Calendar,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Upcoming",
      value: stats.upcomingAppointments,
      icon: Activity,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Prescriptions",
      value: stats.prescriptions,
      icon: Pill,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Completed",
      value: stats.completedAppointments,
      icon: FileText,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-500/10",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
