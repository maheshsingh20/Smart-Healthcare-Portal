import { CalendarDays } from "lucide-react";

const UpcomingAppointments = () => {
  const appointments = [
    {
      doctor: "Dr. Mehta",
      date: "Oct 29, 2025",
      time: "10:30 AM",
      type: "Dental Checkup",
    },
    {
      doctor: "Dr. Sharma",
      date: "Nov 2, 2025",
      time: "3:00 PM",
      type: "Eye Consultation",
    },
  ];

  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/40">
          <CalendarDays className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-3xl font-semibold text-blue-700 dark:text-blue-400 tracking-tight">
          Upcoming Appointments
        </h2>
      </div>

      {/* Appointments Timeline */}
      <div className="relative pl-6 before:absolute before:top-0 before:left-3 before:h-full before:w-[2px] before:bg-gradient-to-b from-blue-400 via-blue-200 to-transparent dark:from-blue-600 dark:via-blue-800 dark:to-transparent">
        {appointments.map((a, i) => (
          <div
            key={i}
            className="relative mb-10 last:mb-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8"
          >
            {/* Timeline Dot */}
            <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-400"></div>

            {/* Appointment Info */}
            <div className="flex-1 bg-gradient-to-r from-blue-50/60 via-white/70 to-sky-50/40 dark:from-slate-900/60 dark:via-slate-950/60 dark:to-slate-900/40 rounded-xl border border-blue-100/40 dark:border-slate-800/50 px-6 py-5 transition-all duration-300 hover:scale-[1.01]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {a.type}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    with{" "}
                    <span className="font-medium text-blue-700 dark:text-blue-300">
                      {a.doctor}
                    </span>
                  </p>
                </div>

                <div className="text-blue-700 dark:text-blue-300 font-medium mt-3 md:mt-0">
                  {a.date}
                  <span className="text-gray-400 mx-1">@</span>
                  {a.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingAppointments;
