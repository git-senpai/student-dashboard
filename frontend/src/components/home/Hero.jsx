import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10"
      >
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
          >
            <span className="block">Transform Your Education</span>
            <span className="block text-emerald-400 mt-2">With UniSystem</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            Empowering students with modern tools and resources for a better
            learning experience. Join thousands of students already benefiting
            from our platform.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/register"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 md:py-4 md:text-lg md:px-10 shadow-lg shadow-emerald-600/20 transition-all duration-200"
              >
                Get Started
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/about"
                className="px-8 py-3 border border-gray-600 text-base font-medium rounded-lg text-gray-300 hover:text-emerald-400 hover:border-emerald-400 md:py-4 md:text-lg md:px-10 transition-all duration-200"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-0">
        <div className="w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob"></div>
      </div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 z-0">
        <div className="w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>
    </div>
  );
}

export default Hero;
