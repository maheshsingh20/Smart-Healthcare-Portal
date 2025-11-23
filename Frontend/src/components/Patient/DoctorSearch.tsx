import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doctorService } from "../../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Search, Star, Calendar } from "lucide-react";

export const DoctorSearch: React.FC = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, [search, specialization]);

  const fetchDoctors = async () => {
    try {
      const params: any = { isApproved: true };
      if (search) params.search = search;
      if (specialization) params.specialization = specialization;

      const response = await doctorService.getAll(params);
      setDoctors(response.data.doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Psychiatry",
    "General Medicine",
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search doctors by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Specializations</option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading doctors...</div>
      ) : doctors.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-gray-500">
            No doctors found
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <Card key={doctor._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{doctor.name}</CardTitle>
                <Badge variant="outline">{doctor.specialization}</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {doctor.experience && (
                    <p className="text-sm text-gray-600">
                      Experience: {doctor.experience} years
                    </p>
                  )}
                  {doctor.qualification && (
                    <p className="text-sm text-gray-600">{doctor.qualification}</p>
                  )}
                  {doctor.consultationFee && (
                    <p className="text-sm font-semibold text-green-600">
                      Fee: ${doctor.consultationFee}
                    </p>
                  )}
                  {doctor.rating > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                      <span className="text-xs text-gray-500">
                        ({doctor.totalReviews} reviews)
                      </span>
                    </div>
                  )}
                  <Button
                    onClick={() => navigate(`/book-appointment/${doctor._id}`)}
                    className="w-full mt-4"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
