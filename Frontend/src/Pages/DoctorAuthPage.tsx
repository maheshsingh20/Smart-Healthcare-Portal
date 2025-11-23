/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Stethoscope, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function DoctorAuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    password: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSignupData({ ...signupData, [e.target.name]: e.target.value });

  // --- Login Handler ---
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(loginData.email, loginData.password, "doctor");
      navigate("/doctor/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Signup Handler ---
  const handleSignupSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await signup(signupData, "doctor");
      setSuccess(
        "Doctor account created successfully. Pending admin approval."
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onTabChange = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950 px-4 py-20">
      <Card className="w-full max-w-md shadow-xl border border-blue-200/40 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Stethoscope className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-500 via-blue-600 to-red-500 bg-clip-text text-transparent">
            Doctor Portal
          </CardTitle>
          <p className="mt-2 text-muted-foreground text-sm">
            Login or register to access your dashboard.
          </p>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" onValueChange={onTabChange}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>

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

            {/* Login Form */}
            <TabsContent value="login">
              <form
                className="flex flex-col gap-4"
                onSubmit={handleLoginSubmit}
              >
                <Input
                  name="email"
                  placeholder="Email"
                  type="email"
                  required
                  value={loginData.email}
                  onChange={handleLoginChange}
                  // ADDED: Autocomplete for security and usability
                  autoComplete="email"
                />
                <Input
                  name="password"
                  placeholder="Password"
                  type="password"
                  required
                  value={loginData.password}
                  onChange={handleLoginChange}
                  // ADDED: Autocomplete for security and usability
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-red-500 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Signup Form */}
            <TabsContent value="signup">
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSignupSubmit}
              >
                <Input
                  name="name"
                  placeholder="Full Name"
                  required
                  value={signupData.name}
                  onChange={handleSignupChange}
                  autoComplete="name"
                />
                <Input
                  name="email"
                  placeholder="Email"
                  type="email"
                  required
                  value={signupData.email}
                  onChange={handleSignupChange}
                  autoComplete="email"
                />
                <Input
                  name="phone"
                  placeholder="Phone"
                  type="tel"
                  required
                  value={signupData.phone}
                  onChange={handleSignupChange}
                  autoComplete="tel"
                />
                <Input
                  name="specialization"
                  placeholder="Specialization"
                  required
                  value={signupData.specialization}
                  onChange={handleSignupChange}
                  autoComplete="organization-title"
                />
                <Input
                  name="password"
                  placeholder="Password"
                  type="password"
                  required
                  value={signupData.password}
                  onChange={handleSignupChange}
                  // ADDED: Autocomplete for security and usability
                  autoComplete="new-password"
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-red-500 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
              <p className="text-xs text-center text-muted-foreground mt-3">
                🕒 Your profile will be reviewed by admin before activation.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
