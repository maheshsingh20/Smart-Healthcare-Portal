/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Search,
  User,
  Calendar,
  Filter,
  Star,
  MessageSquare,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  isApproved: boolean;
  rating?: string;
  experience?: string;
  availability?: string;
}

// Helper: Add UI mock data
const addUiMocks = (doc: any): Doctor => ({
  ...doc,
  rating: (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1),
  experience: `${Math.floor(Math.random() * 15) + 5} years`,
  availability:
    Math.random() > 0.6
      ? "Today"
      : Math.random() > 0.3
      ? "Tomorrow"
      : "This Week",
});

export function FindDoctorPage() {
  const [searchInput, setSearchInput] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const specialties = [
    "All",
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Orthopedic Surgeon",
  ];
  const availabilities = ["All", "Today", "Tomorrow", "This Week"];

  const fetchDoctors = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to view doctors.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/doctors/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 401) {
        setError("Session expired. Please login again.");
        localStorage.removeItem("token");
        setTimeout(() => navigate("/login"), 1500);
        return;
      }

      if (!response.ok) {
        console.error("API Error Response:", data);
        throw new Error(data.message || response.statusText);
      }

      const doctorsWithMocks = data.doctors.map(addUiMocks);
      setDoctors(doctorsWithMocks);
    } catch (err: any) {
      console.error("Doctor Fetch Error:", err);
      setError(
        "Could not connect to server or fetch doctors. Check server status."
      );
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const filteredDoctors = doctors.filter((doc) => {
    return (
      doc.name.toLowerCase().includes(searchInput.toLowerCase()) &&
      (specialtyFilter === "All" || doc.specialization === specialtyFilter) &&
      (availabilityFilter === "All" ||
        (doc.availability || "All") === availabilityFilter)
    );
  });

  const DoctorCardSkeleton = () => (
    <Card className="flex flex-col border border-blue-200/40 bg-white/80 dark:bg-slate-900/60 shadow-lg backdrop-blur-xl p-6 rounded-2xl animate-pulse">
      <CardHeader className="text-center">
        <Skeleton className="h-20 w-20 mx-auto mb-4 rounded-full" />
        <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </CardHeader>
      <CardContent className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <CardFooter className="mt-4">
        <Skeleton className="h-10 w-full rounded-xl" />
      </CardFooter>
    </Card>
  );

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-sky-100 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950 min-h-screen">
      <div className="container relative px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm border border-blue-200/30 mb-6">
            <Filter className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Find Your Specialist
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 via-blue-600 to-red-500 bg-clip-text text-transparent md:text-5xl lg:text-6xl">
            Find Your Perfect Doctor
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Connect with our network of certified specialists and schedule your
            appointment.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-blue-200/30 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-7 relative">
              <div className="rounded-xl border border-blue-200/40 bg-white dark:bg-slate-900 shadow-inner transition-all duration-300">
                <div className="flex items-center">
                  <Search className="absolute left-4 h-5 w-5 text-gray-400 dark:text-gray-500 z-10" />
                  <input
                    type="text"
                    placeholder="Search doctors..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full rounded-xl bg-transparent pl-12 pr-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                  <User className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                </div>
                <select
                  className="w-full rounded-xl border border-blue-200/40 bg-white dark:bg-slate-900 pl-10 pr-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all appearance-none cursor-pointer"
                  value={specialtyFilter}
                  onChange={(e) => setSpecialtyFilter(e.target.value)}
                >
                  {specialties.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                </div>
                <select
                  className="w-full rounded-xl border border-blue-200/40 bg-white dark:bg-slate-900 pl-10 pr-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all appearance-none cursor-pointer"
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                >
                  {availabilities.map((avail) => (
                    <option key={avail} value={avail}>
                      {avail}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array(6)
              .fill(0)
              .map((_, i) => <DoctorCardSkeleton key={i} />)
          ) : error ? (
            <div className="col-span-full text-center py-16 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl p-8">
              <AlertCircle className="h-8 w-8 mx-auto text-red-600 mb-4" />
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">
                {error}
              </h3>
            </div>
          ) : filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <Card
                key={doctor._id}
                className="relative flex flex-col bg-white/90 dark:bg-slate-900/70 border border-blue-200/30 rounded-2xl shadow-md backdrop-blur-md overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-blue-600/5 to-red-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

                <CardHeader className="relative z-10 flex flex-col items-center pt-6">
                  <Avatar className="h-20 w-20 border-2 border-blue-200/50 dark:border-blue-400/50 shadow-sm">
                    <AvatarFallback className="bg-gradient-to-r from-red-500/10 to-blue-600/10 text-gray-700 dark:text-gray-300">
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-3">
                    {doctor.name}
                  </CardTitle>

                  <p className="text-md text-blue-600 dark:text-blue-400 font-medium mt-1">
                    {doctor.specialization}
                  </p>

                  {/* Rating badge */}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-blue-200/30 text-gray-700 dark:text-gray-300 text-xs font-semibold px-2 py-1 rounded-full shadow flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {doctor.rating}
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 flex-1 px-6 py-4 space-y-2 text-center text-gray-600 dark:text-gray-300">
                  <p
                    className={`flex items-center justify-center gap-1 ${
                      doctor.availability === "Today"
                        ? "text-green-600 font-bold"
                        : ""
                    }`}
                  >
                    <Calendar className="h-4 w-4" />
                    {doctor.availability}
                  </p>
                  <p>Experience: {doctor.experience}</p>
                  <p>Email: {doctor.email}</p>
                  <p>Phone: {doctor.phone}</p>
                </CardContent>

                <CardFooter className="relative z-10 flex flex-col gap-2 px-6 pb-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-700 rounded-lg"
                    onClick={() => console.log(`Chat with ${doctor.name}`)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" /> Chat
                  </Button>
                  <Button
                    size="sm"
                    className="w-full bg-blue-600 text-white font-semibold shadow-md rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() =>
                      navigate(`/book-appointment/${doctor._id}`)
                    }
                  >
                    Book Appointment <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-500/10 via-blue-600/10 to-red-500/10 flex items-center justify-center">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No doctors found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find more results.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
