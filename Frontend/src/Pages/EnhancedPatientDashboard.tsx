import React, { useState } from "react";
import { DashboardLayout } from "../components/Shared/DashboardLayout";
import { DoctorSearch } from "../components/Patient/DoctorSearch";
import { AppointmentHistory } from "../components/Patient/AppointmentHistory";
import { MedicalRecords } from "../components/Patient/MedicalRecords";
import { PatientStats } from "../components/Patient/PatientStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Search, Calendar, FileText, Activity, Star } from "lucide-react";

const EnhancedPatientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <DashboardLayout title="Patient Dashboard">
      <div className="space-y-6">
        <PatientStats />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto bg-muted/50">
          <TabsTrigger value="search" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Find Doctor</span>
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Appointments</span>
          </TabsTrigger>
          <TabsTrigger value="records" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Records</span>
          </TabsTrigger>
          <TabsTrigger value="symptom" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Symptom Check</span>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Star className="h-4 w-4" />
            <span className="hidden sm:inline">Reviews</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <DoctorSearch />
        </TabsContent>

        <TabsContent value="appointments">
          <AppointmentHistory />
        </TabsContent>

        <TabsContent value="records">
          <MedicalRecords />
        </TabsContent>

        <TabsContent value="symptom">
          <div className="text-center py-12 text-muted-foreground">
            Symptom checker coming soon...
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="text-center py-12 text-muted-foreground">
            Your reviews will appear here...
          </div>
        </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default EnhancedPatientDashboard;
