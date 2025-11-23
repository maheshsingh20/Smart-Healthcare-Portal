import { Brain } from "lucide-react";

const AIRecommendations = () => {
  const recs = [
    "Based on your last report, increase hydration levels.",
    "Recommended sleep duration: 7.5 hours/day.",
    "Mild Vitamin D deficiency detected — sunlight exposure advised.",
  ];

  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/40">
          <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-3xl font-semibold text-blue-700 dark:text-blue-400 tracking-tight">
          AI Health Insights
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="relative pl-6 before:absolute before:top-0 before:left-3 before:h-full before:w-[2px] before:bg-gradient-to-b from-blue-400 via-blue-200 to-transparent dark:from-blue-600 dark:via-blue-800 dark:to-transparent">
        {recs.map((r, i) => (
          <div
            key={i}
            className="relative mb-10 last:mb-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8"
          >
            {/* Timeline Dot */}
            <div className="absolute left-0 top-4 w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-400"></div>

            {/* Recommendation Card */}
            <div className="flex-1 bg-gradient-to-r from-blue-50/70 via-white/80 to-blue-50/60 dark:from-slate-900/60 dark:via-slate-950/60 dark:to-slate-900/50 rounded-xl border border-blue-100/40 dark:border-slate-800/50 px-6 py-5 transition-all duration-300 hover:scale-[1.01]">
              <p className="text-gray-900 dark:text-gray-100 text-sm flex items-start gap-3">
                <span className="h-2 w-2 mt-1 rounded-full bg-blue-500 dark:bg-blue-400 flex-shrink-0"></span>
                {r}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AIRecommendations;
