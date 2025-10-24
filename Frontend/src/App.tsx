import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "@/Pages/LandingPage";
import { FindDoctorPage } from "@/Pages/FindDoctorPage";
function App() {
  return (
    <Router>
      <Routes>
        {/* Root route renders LandingPage */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/find-a-doctor" element={<FindDoctorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
