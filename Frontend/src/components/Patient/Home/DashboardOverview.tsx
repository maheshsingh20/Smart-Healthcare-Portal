import { User, CalendarDays, FileText, Mail } from "lucide-react";

const DashboardOverview = () => {
  const user = {
    name: "Akhilesh Kumar",
    email: "akhilesh@example.com",
    nextAppointment: "Oct 29, 2025",
    activeReports: 3,
  };

  const details = [
    { icon: User, label: "Name", value: user.name },
    { icon: Mail, label: "Email", value: user.email },
    {
      icon: CalendarDays,
      label: "Next Appointment",
      value: user.nextAppointment,
    },
    { icon: FileText, label: "Active Reports", value: user.activeReports },
  ];

  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/40">
          <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-3xl font-semibold text-blue-700 dark:text-blue-400 tracking-tight">
          Dashboard Overview
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="relative pl-6 before:absolute before:top-0 before:left-3 before:h-full before:w-[2px] before:bg-gradient-to-b from-blue-400 via-blue-200 to-transparent dark:from-blue-600 dark:via-blue-800 dark:to-transparent">
        {details.map((d, i) => (
          <div
            key={i}
            className="relative mb-10 last:mb-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8"
          >
            {/* Timeline Dot */}
            <div className="absolute left-0 top-3 w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-400"></div>

            {/* Detail Card */}
            <div className="flex-1 bg-gradient-to-r from-blue-50/60 via-white/70 to-sky-50/40 dark:from-slate-900/60 dark:via-slate-950/60 dark:to-slate-900/40 rounded-xl border border-blue-100/40 dark:border-slate-800/50 px-6 py-5 transition-all duration-300 hover:scale-[1.01]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
                <div className="flex items-center gap-3">
                  <d.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {d.label}
                  </span>
                </div>
                <span className="text-blue-700 dark:text-blue-300 font-semibold">
                  {d.value}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardOverview;
