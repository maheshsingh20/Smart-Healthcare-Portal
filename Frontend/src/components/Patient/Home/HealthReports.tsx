import { FileText } from "lucide-react";

const HealthReports = () => {
  const reports = [
    { name: "Blood Test", date: "Oct 20, 2025", type: "Lab" },
    { name: "X-Ray", date: "Sep 18, 2025", type: "Radiology" },
  ];

  const typeColors: Record<string, string> = {
    Lab: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    Radiology:
      "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  };

  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/40">
          <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-3xl font-semibold text-blue-700 dark:text-blue-400 tracking-tight">
          Health Reports
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="relative pl-6 before:absolute before:top-0 before:left-3 before:h-full before:w-[2px] before:bg-gradient-to-b from-blue-400 via-blue-200 to-transparent dark:from-blue-600 dark:via-blue-800 dark:to-transparent">
        {reports.map((r, i) => (
          <div
            key={i}
            className="relative mb-10 last:mb-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8"
          >
            {/* Timeline Dot */}
            <div className="absolute left-0 top-3 w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-400"></div>

            {/* Report Card */}
            <div className="flex-1 bg-gradient-to-r from-blue-50/70 via-white/80 to-blue-50/60 dark:from-slate-900/60 dark:via-slate-950/60 dark:to-slate-900/50 rounded-xl border border-blue-100/40 dark:border-slate-800/50 px-6 py-5 transition-all duration-300 hover:scale-[1.01]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {r.name}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      typeColors[r.type]
                    }`}
                  >
                    {r.type}
                  </span>
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-sm mt-2 md:mt-0">
                  {r.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HealthReports;
