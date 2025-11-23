import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Calendar,
  Stethoscope,
  Settings,
  LogOut,
  MessageSquare,
  ClipboardList,
  User,
} from "lucide-react";

const currentStatus = {
  isAvailable: true,
  statusText: "Accepting New Patients",
  badgeColor: "bg-green-500 hover:bg-green-500/80",
};

const DoctorNavbar = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({ name: "", email: "", avatar: "" });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("doctorUser") || "{}");
    if (userData && userData.name) {
      setDoctor({
        name: userData.name,
        email: userData.email,
        avatar:
          userData.avatar ||
          `https://placehold.co/100x100/28A745/FFFFFF?text=${
            userData.name.split(" ")[1]?.[0] || "U"
          }`,
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("doctorUser");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfile = () => navigate("/doctor/profile");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/doctor/dashboard" className="flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-gray-800 dark:text-white">
            Dr. Portal
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/doctor/dashboard"
            className="text-sm font-medium text-primary hover:text-blue-700"
          >
            Dashboard
          </Link>
          <Link
            to="/doctor/schedule"
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <Calendar className="h-4 w-4" /> Schedule
          </Link>
          <Link
            to="/doctor/patients"
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ClipboardList className="h-4 w-4" /> Patient Charts
          </Link>
          <Link
            to="/doctor/messages"
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <MessageSquare className="h-4 w-4" /> Messages
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2">
            <Badge
              className={`text-white ${currentStatus.badgeColor} px-3 py-1 font-semibold`}
            >
              <div
                className={`mr-2 h-2 w-2 rounded-full ${
                  currentStatus.isAvailable ? "bg-white" : "bg-red-200"
                }`}
              />
              {currentStatus.statusText}
            </Badge>
          </div>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10 border border-primary/50">
                  <AvatarImage src={doctor.avatar} alt={doctor.name} />
                  <AvatarFallback>
                    {doctor.name ? doctor.name.split(" ")[1]?.[0] : "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {doctor.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {doctor.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfile}>
                <User className="mr-2 h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DoctorNavbar;
