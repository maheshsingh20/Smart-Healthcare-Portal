import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, User, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export function RoleSelectionPage() {
  const roles = [
    {
      title: "Patient",
      description:
        "Access your health records, check symptoms, and book appointments.",
      icon: <User className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      link: "/auth/patient", // <-- FIXED: Was "auth/patient", now absolute
    },
    {
      title: "Doctor",
      description:
        "Manage your patients, schedule, and consultations securely.",
      icon: (
        <Stethoscope className="h-10 w-10 text-blue-600 dark:text-blue-400" />
      ),
      link: "/auth/doctor",
    },
    {
      title: "Admin",
      description: "Oversee platform operations and approve new doctors.",
      icon: (
        <ShieldCheck className="h-10 w-10 text-blue-600 dark:text-blue-400" />
      ),
      link: "/auth/admin",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950 px-6 py-20">
      {/* Background Blob */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="h-[500px] w-[500px] rounded-full bg-blue-200/20 blur-3xl dark:bg-blue-900/30" />
      </div>

      {/* Content */}
      <div className="container relative max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-red-500 via-blue-600 to-red-500 bg-clip-text text-transparent">
          Choose Your Role
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          Select your role to continue to the login or signup process.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <Card
              key={role.title}
              className="group relative flex flex-col items-center text-center border border-blue-200/40 
               bg-white/80 dark:bg-slate-900/60 shadow-md backdrop-blur-xl 
               transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-400/50 p-6"
            >
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 to-red-500/10 shadow-inner">
                  {role.icon}
                </div>
                <CardTitle className="text-xl font-semibold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
                  {role.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow w-full">
                <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                  {role.description}
                </p>
                <Button size="lg" className="w-full px-6 mt-auto" asChild>
                  <Link to={role.link}>Continue as {role.title}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
