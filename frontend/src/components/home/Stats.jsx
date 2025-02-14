import { motion } from "framer-motion";
import { universityData } from "../../data/dummyData";

function Stats() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6"
          >
            <div className="text-4xl font-bold text-emerald-400 mb-2">
              {universityData.stats.students.toLocaleString()}+
            </div>
            <div className="text-gray-400">Students</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6"
          >
            <div className="text-4xl font-bold text-emerald-400 mb-2">
              {universityData.stats.faculty.toLocaleString()}+
            </div>
            <div className="text-gray-400">Faculty Members</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6"
          >
            <div className="text-4xl font-bold text-emerald-400 mb-2">
              {universityData.stats.programs}+
            </div>
            <div className="text-gray-400">Programs</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6"
          >
            <div className="text-4xl font-bold text-emerald-400 mb-2">
              {universityData.stats.research_centers}
            </div>
            <div className="text-gray-400">Research Centers</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Stats;
