import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-100 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 py-20 lg:py-32 transition-colors">
      {/* === Decorative Blobs === */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-red-700/20 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_center,theme(colors.primary/20)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="container relative z-10 grid items-center gap-y-16 lg:grid-cols-2 lg:gap-x-12 px-6 sm:px-8 md:px-12">
        {/* === Text Section === */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <Button
            variant="secondary"
            asChild
            className="mb-6 w-fit rounded-full border border-border bg-white/60 dark:bg-slate-800/50 px-5 py-1.5 text-sm font-semibold text-primary backdrop-blur-md shadow-sm hover:bg-white/80 dark:hover:bg-slate-800/70 transition-all"
          >
            <Link to="/about">
              Trusted by 100,000+ patients
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          {/* --- Title with Red Gradient --- */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-gray-100">
            Your Health,
            <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">
              Smarter & Simpler.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-400 md:text-xl">
            Discover AI-powered health insights, connect instantly with trusted
            doctors, and book appointments effortlessly — all in one smart,
            intuitive platform.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Button
              size="lg"
              className="px-8 bg-primary text-white shadow-md hover:bg-primary/90 hover:shadow-lg transition-all"
              asChild
            >
              <Link to="/ai-symptom-checker">Start Symptom Check</Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="px-8 border-primary/30 text-primary hover:bg-primary/10 transition-all"
              asChild
            >
              <Link to="/find-a-doctor">Find a Specialist</Link>
            </Button>
          </div>
        </div>

        {/* === Illustration / Image === */}
        <div className="relative flex h-full min-h-[400px] items-center justify-center lg:min-h-[500px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-80 w-80 rounded-full bg-primary/15 blur-3xl lg:h-[450px] lg:w-[450px]" />
          </div>

          <div className="relative z-10 h-72 w-full max-w-sm rounded-2xl border border-white/40 dark:border-slate-700/50 bg-white/70 dark:bg-slate-900/60 p-6 shadow-2xl backdrop-blur-xl md:h-96 md:max-w-md lg:h-[400px] lg:max-w-lg transition-transform hover:scale-[1.02]">
            <div className="flex h-full w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/40 dark:bg-slate-800/40 text-gray-500 dark:text-gray-400 font-medium">
              [Healthcare Illustration Placeholder]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { HeroSection };
