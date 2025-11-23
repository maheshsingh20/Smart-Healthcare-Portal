import React, { useState } from "react";
import { DashboardLayout } from "../components/Shared/DashboardLayout";
import { DoctorAppointments } from "../components/Doctor/DoctorAppointments";
import { DoctorAnalytics } from "../components/Doctor/DoctorAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Calendar, Clock, FileText, BarChart3 } from "lucide-react";

const EnhancedDoctorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("appointments");

  return (
    <DashboardLayout title="Doctor Dashboard">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto bg-muted/50">
          <TabsTrigger value="appointments" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Appointments</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="prescriptions" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Prescriptions</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appointments">
          <DoctorAppointments />
        </TabsContent>

        <TabsContent value="schedule">
          <div className="text-center py-12 text-muted-foreground">
            Schedule management coming soon...
          </div>
        </TabsContent>

        <TabsContent value="prescriptions">
          <div className="text-center py-12 text-muted-foreground">
            Prescription history coming soon...
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <DoctorAnalytics />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default EnhancedDoctorDashboard;
