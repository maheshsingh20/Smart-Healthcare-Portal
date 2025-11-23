import React from "react";
import DashboardOverview from "./DashboardOverview";
import UpcomingAppointments from "@/components/Patient/Home/UpcomingAppointments";
import HealthReports from "@/components/Patient/Home/HealthReports";
import AIRecommendations from "@/components/Patient/Home/AIRecommendations";
import MedicalHistory from "@/components/Patient/Home/MedicalHistory";
import DoctorSuggestions from "@/components/Patient/Home/DoctorSuggestions";
import { PatientNavbar } from "@/components/Patient/Navbar";
import { motion } from "framer-motion";

const Section: React.FC<{
  title?: string;
  children: React.ReactNode;
  bg?: string;
}> = ({ title, children, bg }) => (
  <motion.section
    className={`w-full py-16 md:py-20 ${bg || ""}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className="max-w-6xl mx-auto px-6 md:px-12">
      {title && (
        <h2 className="text-3xl font-semibold text-blue-700 dark:text-blue-400 mb-6">
          {title}
        </h2>
      )}
      {children}
    </div>
  </motion.section>
);

const PatientHomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/60 dark:bg-slate-950/50 backdrop-blur-md border-b border-blue-100 dark:border-slate-800">
        <div >
          <PatientNavbar />
        </div>
      </header>

      {/* Flowing Page Sections */}
      <main className="overflow-hidden">
        <Section>
          <DashboardOverview />
        </Section>

        <Section bg="bg-gradient-to-r from-blue-50/60 via-sky-50/60 to-blue-100/40 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950/60">
          <UpcomingAppointments />
        </Section>

        <Section bg="bg-gradient-to-r from-blue-100/40 via-white to-sky-50/50 dark:from-slate-950/60 dark:via-slate-900 dark:to-slate-950">
          <HealthReports />
        </Section>

        <Section bg="bg-gradient-to-r from-blue-100/40 via-white to-sky-50/50 dark:from-slate-950/60 dark:via-slate-900 dark:to-slate-950">
          <AIRecommendations />
        </Section>

        <Section bg="bg-gradient-to-r from-blue-100/40 via-white to-sky-50/50 dark:from-slate-950/60 dark:via-slate-900 dark:to-slate-950">
          <MedicalHistory />
        </Section>

        <Section bg="bg-gradient-to-b from-blue-50/50 via-white to-blue-100/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/70">
          <DoctorSuggestions />
        </Section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-500 dark:text-gray-400 border-t border-blue-100 dark:border-slate-800">
        © {new Date().getFullYear()} Smart HealthCare — Your Health, Our
        Priority.
      </footer>
    </div>
  );
};

export default PatientHomePage;
