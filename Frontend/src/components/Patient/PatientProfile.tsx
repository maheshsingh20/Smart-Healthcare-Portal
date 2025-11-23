/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Calendar, Edit, Save, X } from "lucide-react";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export function PatientProfile() {
  const { user, token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    dateOfBirth: "",
    address: "",
    emergencyContact: "",
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      // API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Personal Information
            </CardTitle>
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.email}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.phone || "Not provided"}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              {isEditing ? (
                <Input
                  id="dob"
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.dateOfBirth || "Not provided"}</span>
                </div>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              {isEditing ? (
                <Input
                  id="address"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                />
              ) : (
                <div className="p-2 bg-muted/50 rounded-md">
                  <span>{profile.address || "Not provided"}</span>
                </div>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="emergency">Emergency Contact</Label>
              {isEditing ? (
                <Input
                  id="emergency"
                  value={profile.emergencyContact}
                  onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                />
              ) : (
                <div className="p-2 bg-muted/50 rounded-md">
                  <span>{profile.emergencyContact || "Not provided"}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-500/10 text-green-600 dark:text-green-400">
              Active
            </Badge>
            <span className="text-sm text-muted-foreground">
              Member since {new Date().toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
