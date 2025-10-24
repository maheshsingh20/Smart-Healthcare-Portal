import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, User, Calendar, Filter, Star } from "lucide-react";

const allDoctors = [
  {
    name: "Dr. Emily Carter",
    specialty: "Cardiologist",
    avatar: "EC",
    availability: "Today",
    experience: "12 years",
    rating: "4.9",
  },
  {
    name: "Dr. Michael Johnson",
    specialty: "Dermatologist",
    avatar: "MJ",
    availability: "Tomorrow",
    experience: "8 years",
    rating: "4.7",
  },
  {
    name: "Dr. Sarah Lee",
    specialty: "Pediatrician",
    avatar: "SL",
    availability: "This Week",
    experience: "15 years",
    rating: "4.8",
  },
  {
    name: "Dr. Robert Smith",
    specialty: "Orthopedic Surgeon",
    avatar: "RS",
    availability: "Today",
    experience: "10 years",
    rating: "4.6",
  },
  {
    name: "Dr. Alice Brown",
    specialty: "Cardiologist",
    avatar: "AB",
    availability: "This Week",
    experience: "14 years",
    rating: "4.9",
  },
];

export function FindDoctorPage() {
  const [searchInput, setSearchInput] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");

  const specialties = [
    "All",
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Orthopedic Surgeon",
  ];
  const availabilities = ["All", "Today", "Tomorrow", "This Week"];

  // Real-time filtering without search button
  const filteredDoctors = allDoctors.filter((doc) => {
    return (
      doc.name.toLowerCase().includes(searchInput.toLowerCase()) &&
      (specialtyFilter === "All" || doc.specialty === specialtyFilter) &&
      (availabilityFilter === "All" || doc.availability === availabilityFilter)
    );
  });

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-sky-100 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-to-r from-red-500/5 via-blue-600/5 to-red-500/5 blur-3xl" />
      </div>

      <div className="container relative px-6 md:px-12 lg:px-24">
        {/* Enhanced Section Header */}
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
            appointment with confidence and ease.
          </p>
        </div>

        {/* Fixed Filter Bar - No Sticky */}
        <div className="mb-12 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-blue-200/30 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Search Section */}
            <div className="lg:col-span-7 relative">
              <div className="rounded-xl border border-blue-200/40 bg-white dark:bg-slate-900 shadow-inner transition-all duration-300">
                <div className="flex items-center">
                  <Search className="absolute left-4 h-5 w-5 text-gray-400 dark:text-gray-500 z-10" />
                  <input
                    type="text"
                    placeholder="Search doctors by name, specialty, or keywords..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full rounded-xl bg-transparent pl-12 pr-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Filters Section */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                {/* Specialty Filter */}
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
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

                {/* Availability Filter */}
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
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
        </div>

        {/* Enhanced Doctor Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <Card
                key={doctor.name}
                className="relative flex flex-col border border-blue-200/40 bg-white/80 dark:bg-slate-900/60 shadow-lg backdrop-blur-xl p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-blue-400/50 group overflow-hidden"
              >
                {/* Background Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-blue-600/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardHeader className="relative z-10">
                  <div className="relative mx-auto mb-4">
                    <Avatar className="h-20 w-20 border-2 border-blue-200/50 group-hover:border-blue-400/70 transition-all duration-300">
                      <AvatarImage
                        src={`https://placehold.co/80x80/007BFF/FFFFFF?text=${doctor.avatar}`}
                      />
                      <AvatarFallback className="bg-gradient-to-r from-red-500/10 to-blue-600/10 text-gray-700 dark:text-gray-300">
                        {doctor.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {/* Rating Badge - No Color Fill */}
                    <div className="absolute -bottom-2 -right-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-blue-200/40 text-gray-700 dark:text-gray-300 text-xs font-semibold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {doctor.rating}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {doctor.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10 flex-1">
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {doctor.specialty}
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Available: {doctor.availability}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Experience: {doctor.experience}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="relative z-10 mt-4">
                  <Button
                    size="sm"
                    className="w-full rounded-xl border border-blue-400/50 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 hover:bg-blue-50 dark:hover:bg-slate-700"
                  >
                    Book Appointment
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
                  Try adjusting your search criteria or filters to find more
                  results.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
