import { Link } from "react-router-dom";
import { Stethoscope, Twitter, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-sky-100 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950 border-t border-blue-200/40">
      {/* Decorative blob */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden -z-10">
        <div className="h-[400px] w-[400px] rounded-full bg-blue-200/20 blur-3xl dark:bg-blue-900/30" />
      </div>

      <div className="container relative px-6 md:px-12 lg:px-24 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Logo & Socials */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <Stethoscope className="h-6 w-6 text-primary transition-transform group-hover:rotate-6 group-hover:scale-110" />
              <span className="text-lg font-bold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
                SmartHealth
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Smarter healthcare, always available.
            </p>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="transition-transform hover:scale-110 hover:text-primary/90"
              >
                <a href="#">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="transition-transform hover:scale-110 hover:text-primary/90"
              >
                <a href="#">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="transition-transform hover:scale-110 hover:text-primary/90"
              >
                <a href="#">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
              Services
            </h4>
            <Link
              to="/ai-symptom-checker"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              AI Checker
            </Link>
            <Link
              to="/find-a-doctor"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Find a Doctor
            </Link>
            <Link
              to="/book-appointment"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Book Online
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
              Company
            </h4>
            <Link
              to="/about"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/careers"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Careers
            </Link>
            <Link
              to="/press"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Press
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
              Legal
            </h4>
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/accessibility"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Accessibility
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-blue-200/40 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SmartHealth. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
