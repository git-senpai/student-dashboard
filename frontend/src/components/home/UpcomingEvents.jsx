import { motion } from "framer-motion";

function UpcomingEvents() {
  const events = [
    {
      title: "Spring Semester Registration",
      date: "2024-01-15",
      time: "09:00 AM",
      location: "Main Campus",
      category: "Academic",
    },
    {
      title: "Tech Career Fair",
      date: "2024-02-01",
      time: "10:00 AM",
      location: "Virtual Event",
      category: "Career",
    },
    {
      title: "Student Leadership Workshop",
      date: "2024-02-15",
      time: "02:00 PM",
      location: "Student Center",
      category: "Workshop",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Upcoming Events
          </h2>
          <p className="text-gray-400 text-lg">
            Stay updated with the latest events and activities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6 hover:bg-gray-800/70 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 text-sm text-emerald-400 bg-emerald-400/10 rounded-full">
                  {event.category}
                </span>
                <div className="text-gray-400 text-sm">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {event.title}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {event.time}
                </div>
                <div className="flex items-center text-gray-400">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {event.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UpcomingEvents;
