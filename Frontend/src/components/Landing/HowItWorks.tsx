const steps = [
  {
    number: "01",
    title: "Check Your Symptoms",
    description:
      "Use our AI tool to describe your symptoms. Our system will ask simple questions to understand your condition.",
  },
  {
    number: "02",
    title: "Get Your Analysis",
    description:
      "Receive a list of potential conditions and a recommendation, from self-care to seeing a specialist.",
  },
  {
    number: "03",
    title: "Book Your Care",
    description:
      "If needed, instantly book an appointment with a recommended doctor right from your results screen.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-sky-100 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950">
      {/* Decorative blob */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden -z-10">
        <div className="h-[500px] w-[500px] rounded-full bg-blue-200/20 blur-3xl dark:bg-blue-900/30" />
      </div>

      <div className="container relative px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 via-blue-600 to-red-500 bg-clip-text text-transparent md:text-5xl">
            Get Care in 3 Simple Steps
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            We've streamlined the path to feeling better.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-blue-200/40 bg-white/80 dark:bg-slate-900/60 shadow-md backdrop-blur-xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-400/50"
            >
              <div className="mb-4 text-5xl font-extrabold bg-gradient-to-r from-red-500 via-blue-600 to-red-500 bg-clip-text text-transparent">
                {step.number}
              </div>
              <h3 className="mb-4 text-2xl font-semibold bg-gradient-to-r from-blue-600 via-red-500 to-blue-600 bg-clip-text text-transparent">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
