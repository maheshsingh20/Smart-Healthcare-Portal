/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { Mail, Phone, Lock, User, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function PatientAuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isSignup) {
        await signup(formData, "patient");
        setSuccess("Account created successfully! Please login.");
        setIsSignup(false);
        setFormData({ ...formData, password: "" });
      } else {
        await login(formData.email, formData.password, "patient");
        navigate("/patient/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFormMode = () => {
    setIsSignup(!isSignup);
    setError(null);
    setSuccess(null);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950 px-6 py-20">
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-blue-300/20 dark:bg-blue-900/30 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md"
      >
        <Card className="border border-blue-200/40 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
              {isSignup ? "Patient Sign Up" : "Patient Login"}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              {isSignup
                ? "Create your patient account to access SmartHealth."
                : "Login to your SmartHealth account."}
            </p>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert
                variant="default"
                className="mb-4 bg-green-100 dark:bg-green-900"
              >
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {isSignup && (
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-blue-500" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="pl-10"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-blue-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {isSignup && (
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-blue-500" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      className="pl-10"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-blue-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-red-500 text-white font-semibold shadow-md hover:shadow-lg"
                disabled={isLoading}
              >
                {isLoading
                  ? isSignup
                    ? "Creating Account..."
                    : "Logging In..."
                  : isSignup
                  ? "Sign Up"
                  : "Login"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center">
            <button
              onClick={toggleFormMode}
              className="text-sm text-blue-600 hover:underline"
            >
              {isSignup
                ? "Already have an account? Login"
                : "Don’t have an account? Sign Up"}
            </button>
          </CardFooter>
        </Card>
      </motion.div>
    </section>
  );
}
