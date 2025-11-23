import React, { useEffect, useState } from "react";
import { adminService } from "../../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Users, Calendar, CheckCircle, XCircle } from "lucide-react";

export const Analytics: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminService.getStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading analytics...</div>;
  }

  if (!stats) {
    return <div className="text-center py-8">No data available</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.doctors.total}</div>
            <p className="text-xs text-gray-500">
              {stats.doctors.approved} approved, {stats.doctors.pending} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.patients.total}</div>
            <p className="text-xs text-gray-500">Registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.appointments.total}</div>
            <p className="text-xs text-gray-500">
              {stats.appointments.pending} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.appointments.completed}</div>
            <p className="text-xs text-gray-500">
              {stats.appointments.cancelled} cancelled
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Appointment Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending</span>
                <span className="font-semibold">{stats.appointments.pending}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Completed</span>
                <span className="font-semibold">{stats.appointments.completed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Cancelled</span>
                <span className="font-semibold">{stats.appointments.cancelled}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Doctor Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Approved</span>
                <span className="font-semibold text-green-600">
                  {stats.doctors.approved}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending Approval</span>
                <span className="font-semibold text-yellow-600">
                  {stats.doctors.pending}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
