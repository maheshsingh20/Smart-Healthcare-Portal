import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// 🔐 Auth Pages (From your prompt)
import { PatientAuthPage } from "@/Pages/PatientAuthPage";
import { LandingPage } from "@/Pages/LandingPage";
import { DoctorAuthPage } from "@/Pages/DoctorAuthPage";
import { AdminAuthPage } from "@/Pages/AdminAuthPage";
import { FindDoctorPage } from "./Pages/FindDoctorPage";
import { RoleSelectionPage } from "./Pages/RoleSelectionPage";
import PatientDashboard from "./Pages/PatientDashboard";
import DoctorDashboard from "./Pages/DoctorDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
function App() {
  return (
    <Router>
      <Routes>
        {/* 🌐 Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/find-a-doctor" element={<FindDoctorPage/>} />
        {/* 🧭 Role Selection */}
        <Route path="/select-role" element={<RoleSelectionPage/>} />

        {/* 👤 Authentication Routes */}
        <Route path="/auth/patient" element={<PatientAuthPage />} />
        <Route path="/auth/doctor" element={<DoctorAuthPage />} />
        <Route path="/auth/admin" element={<AdminAuthPage />} />

        {/* 🧩 Dashboard Routes */}
        {/* These are now uncommented and point to the placeholder components */}
        <Route path="/patient/dashboard" element={<PatientDashboard/>} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
