import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ProtectedRoute } from "./components/Shared/ProtectedRoute";

// Public Pages
import { HomePage } from "@/Pages/HomePage";
import { LandingPage } from "@/Pages/LandingPage";
import { RoleSelectionPage } from "./Pages/RoleSelectionPage";
import { FindDoctorPage } from "./Pages/FindDoctorPage";
import { SymptomCheckerPage } from "./Pages/SymptomCheckerPage";
import { MedicinesPage } from "./Pages/MedicinesPage";
import { LabTestsPage } from "./Pages/LabTestsPage";
import { AboutPage } from "./Pages/AboutPage";
import { ContactPage } from "./Pages/ContactPage";

// Auth Pages
import { PatientAuthPage } from "@/Pages/PatientAuthPage";
import { DoctorAuthPage } from "@/Pages/DoctorAuthPage";
import { AdminAuthPage } from "@/Pages/AdminAuthPage";

// Dashboard Pages
import EnhancedAdminDashboard from "./Pages/EnhancedAdminDashboard";
import EnhancedPatientDashboard from "./Pages/EnhancedPatientDashboard";
import EnhancedDoctorDashboard from "./Pages/EnhancedDoctorDashboard";

// Feature Pages
import SystemChecker from "./components/Patient/SystemChecker";
import AppointmentNewPage from "./components/Patient/Appointment";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/select-role" element={<RoleSelectionPage />} />
            <Route path="/find-a-doctor" element={<FindDoctorPage />} />
            <Route path="/symptom-checker" element={<SymptomCheckerPage />} />
            <Route path="/medicines" element={<MedicinesPage />} />
            <Route path="/lab-tests" element={<LabTestsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Auth Routes */}
            <Route path="/auth/patient" element={<PatientAuthPage />} />
            <Route path="/auth/doctor" element={<DoctorAuthPage />} />
            <Route path="/auth/admin" element={<AdminAuthPage />} />

            {/* Protected Patient Routes */}
            <Route
              path="/patient/homepage"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <EnhancedPatientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/dashboard"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <EnhancedPatientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/symptom-checker"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <SystemChecker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book-appointment/:doctorId"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <AppointmentNewPage />
                </ProtectedRoute>
              }
            />

            {/* Protected Doctor Routes */}
            <Route
              path="/doctor/dashboard"
              element={
                <ProtectedRoute allowedRoles={["doctor"]}>
                  <EnhancedDoctorDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <EnhancedAdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
