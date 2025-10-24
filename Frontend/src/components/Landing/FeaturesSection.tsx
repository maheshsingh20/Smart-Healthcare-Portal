import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrainCircuit, Search, CalendarPlus } from "lucide-react";

const features = [
  {
    icon: (
      <BrainCircuit className="h-10 w-10 text-blue-600 dark:text-blue-400" />
    ),
    title: "AI Symptom Checker",
    description:
      "Our advanced AI helps you understand your symptoms and suggests the right next steps, 24/7.",
  },
  {
    icon: <Search className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
    title: "Find a Doctor",
    description:
      "Quickly search our vetted directory of specialists and primary care physicians near you.",
  },
  {
    icon: (
      <CalendarPlus className="h-10 w-10 text-blue-600 dark:text-blue-400" />
    ),
    title: "Easy Appointments",
    description:
      "Book appointments online in just a few clicks. No more waiting on hold.",
  },
];

export function FeaturesSection() {
  return (
    <section
      className="relative py-24 md:py-32 bg-gradient-to-br from-sky-100 via-white to-blue-50 
      dark:from-slate-900 dark:via-slate-950 dark:to-blue-950"
    >
      {/* Decorative blurred background shape */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden -z-10">
        <div className="h-[500px] w-[500px] rounded-full bg-blue-200/20 blur-3xl dark:bg-blue-900/30" />
      </div>

      <div className="container relative px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 via-blue-600 to-red-500 bg-clip-text text-transparent md:text-5xl">
            Your Complete Health Hub
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Everything you need to manage your health with confidence and ease.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="relative flex flex-col text-center border border-blue-200/40 
              bg-white/80 dark:bg-slate-900/60 shadow-md backdrop-blur-xl 
              transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-400/50 p-8"
            >
              <CardHeader className="px-0 pb-6">
                <div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full 
                bg-gradient-to-br from-blue-500/10 to-red-500/10 shadow-inner"
                >
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-semibold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
