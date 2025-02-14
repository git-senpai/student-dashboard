import { motion } from "framer-motion";

function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 overflow-hidden shadow-xl"
        >
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-400 truncate">
                  {stat.title}
                </div>
                <div className="mt-2 text-3xl font-bold text-white">
                  {stat.value}
                </div>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`flex items-center text-sm ${
                  stat.trend === "up" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                <span className="text-lg">
                  {stat.trend === "up" ? "↑" : "↓"}
                </span>
                <span className="ml-1">{stat.change}</span>
              </motion.div>
            </div>
            {/* Optional Progress Bar */}
            {stat.progress !== undefined && (
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={`h-1.5 rounded-full ${
                      stat.trend === "up" ? "bg-emerald-500" : "bg-red-500"
                    }`}
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default DashboardStats;
