/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, DollarSign, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export function DoctorAnalytics() {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    totalAppointments: 0,
    completedAppointments: 0,
    pendingAppointments: 0,
    totalPatients: 0,
    todayAppointments: 0,
    thisWeekAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`${API}/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const appointments = data.appointments || [];

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());

      const uniquePatients = new Set(appointments.map((apt: any) => apt.patientId));

      setStats({
        totalAppointments: appointments.length,
        completedAppointments: appointments.filter((apt: any) => apt.status === "completed").length,
        pendingAppointments: appointments.filter((apt: any) => apt.status === "pending").length,
        totalPatients: uniquePatients.size,
        todayAppointments: appointments.filter((apt: any) => {
          const aptDate = new Date(apt.scheduledAt);
          aptDate.setHours(0, 0, 0, 0);
          return aptDate.getTime() === today.getTime();
        }).length,
        thisWeekAppointments: appointments.filter((apt: any) => {
          const aptDate = new Date(apt.scheduledAt);
          return aptDate >= weekStart && aptDate <= new Date();
        }).length,
      });
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
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
      title: "Completed",
      value: stats.completedAppointments,
      icon: CheckCircle,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Pending",
      value: stats.pendingAppointments,
      icon: Clock,
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Total Patients",
      value: stats.totalPatients,
      icon: Users,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Today",
      value: stats.todayAppointments,
      icon: TrendingUp,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "This Week",
      value: stats.thisWeekAppointments,
      icon: DollarSign,
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-500/10",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
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

      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Completion Rate</span>
                <span className="text-sm text-muted-foreground">
                  {stats.totalAppointments > 0
                    ? Math.round((stats.completedAppointments / stats.totalAppointments) * 100)
                    : 0}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${stats.totalAppointments > 0
                      ? (stats.completedAppointments / stats.totalAppointments) * 100
                      : 0}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Pending Appointments</span>
                <span className="text-sm text-muted-foreground">
                  {stats.totalAppointments > 0
                    ? Math.round((stats.pendingAppointments / stats.totalAppointments) * 100)
                    : 0}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${stats.totalAppointments > 0
                      ? (stats.pendingAppointments / stats.totalAppointments) * 100
                      : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
