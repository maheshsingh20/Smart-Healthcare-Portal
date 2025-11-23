import React, { useState } from "react";
import { DashboardLayout } from "../components/Shared/DashboardLayout";
import { AdminDashboardStats } from "../components/Admin/AdminDashboardStats";
import { UserManagement } from "../components/Admin/UserManagement";
import { DoctorApproval } from "../components/Admin/DoctorApproval";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { BarChart3, UserCheck, Users, Settings } from "lucide-react";

const EnhancedAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("analytics");

  return (
    <DashboardLayout title="Admin Dashboard">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto bg-muted/50">
          <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="approvals" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <UserCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Approvals</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <AdminDashboardStats />
        </TabsContent>

        <TabsContent value="approvals">
          <DoctorApproval />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="settings">
          <div className="text-center py-12 text-muted-foreground">
            Settings panel coming soon...
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default EnhancedAdminDashboard;
