/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function AdminAuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(email, password, "admin");
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950 px-4 py-20">
      <Card className="w-full max-w-md shadow-xl border border-blue-200/40 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <ShieldCheck className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-500 via-blue-600 to-red-500 bg-clip-text text-transparent">
            Admin Login
          </CardTitle>
          <p className="mt-2 text-muted-foreground text-sm">
            Authorized personnel only.
          </p>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Input
              placeholder="Admin Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-red-500 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
