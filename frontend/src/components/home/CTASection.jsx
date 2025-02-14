import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CTASection() {
  return (
    <section className="py-16 bg-gray-800/50 backdrop-blur-xl border-t border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of students already using UniSystem to manage their
            academic journey.
          </p>
          <div className="flex justify-center gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/register"
                className="px-8 py-3 text-base font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-all duration-200"
              >
                Sign Up Now
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/contact"
                className="px-8 py-3 text-base font-medium rounded-lg border border-gray-600 text-gray-300 hover:text-emerald-400 hover:border-emerald-400 transition-all duration-200"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
