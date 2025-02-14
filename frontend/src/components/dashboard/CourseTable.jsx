import { motion } from "framer-motion";

function CourseTable({ courses }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="overflow-x-auto bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl"
    >
      <table className="min-w-full divide-y divide-gray-700/50">
        <thead className="bg-gray-800/70">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Subject
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Marks
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Grade
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700/50">
          {courses.map((course, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ backgroundColor: "rgba(31, 41, 55, 0.5)" }}
              className="transition-colors duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                {course.subject}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {course.marks}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {course.grade}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    course.status === "Running"
                      ? "bg-emerald-400/10 text-emerald-400"
                      : course.status === "Completed"
                      ? "bg-blue-400/10 text-blue-400"
                      : "bg-gray-400/10 text-gray-400"
                  }`}
                >
                  {course.status}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

export default CourseTable;
