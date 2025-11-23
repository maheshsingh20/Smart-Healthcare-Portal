import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Stethoscope,
  Menu,
  Home,
  Search,
  Pill,
  TestTube,
  Activity,
  Info,
  Phone,
  LogIn,
} from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Find Doctor", path: "/find-a-doctor", icon: Search },
    { name: "Medicines", path: "/medicines", icon: Pill },
    { name: "Lab Tests", path: "/lab-tests", icon: TestTube },
    { name: "Symptom Checker", path: "/symptom-checker", icon: Activity },
    { name: "About", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HealthCare Portal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Login Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="hidden md:flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("/auth/patient")}>
                  Login as Patient
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/auth/doctor")}>
                  Login as Doctor
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/auth/admin")}>
                  Login as Admin
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </Link>
              ))}
              <div className="border-t my-2"></div>
              <Button
                variant="outline"
                className="mx-4"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/auth/patient");
                }}
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
