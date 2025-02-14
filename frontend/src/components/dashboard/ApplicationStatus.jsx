import { motion } from "framer-motion";

function ApplicationStatus({ applications }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {applications.map((app, index) => (
        <motion.div
          key={app.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.01 }}
          className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6 shadow-xl"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-white">{app.course}</h3>
              <p className="text-sm text-gray-400">{app.university}</p>
            </div>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                app.status === "Running"
                  ? "bg-emerald-400/10 text-emerald-400"
                  : "bg-blue-400/10 text-blue-400"
              }`}
            >
              {app.status}
            </span>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Progress</span>
              <span className="text-emerald-400 font-medium">
                {app.progress}%
              </span>
            </div>
            <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${app.progress}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                className={`h-1.5 rounded-full ${
                  app.status === "Running" ? "bg-emerald-500" : "bg-blue-500"
                }`}
              />
            </div>
          </div>

          {/* Additional Details */}
          <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-gray-700/50">
            <div>
              <p className="text-sm text-gray-400">Start Date</p>
              <p className="text-sm text-gray-300 mt-1">
                {app.startDate || "Not specified"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Expected Completion</p>
              <p className="text-sm text-gray-300 mt-1">
                {app.expectedCompletion || "Not specified"}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ApplicationStatus;
