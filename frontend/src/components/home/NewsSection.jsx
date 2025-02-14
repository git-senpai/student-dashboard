import { motion } from "framer-motion";

function NewsSection() {
  const news = [
    {
      title: "New Online Learning Resources Available",
      excerpt:
        "Access the latest study materials and video lectures through our updated learning portal.",
      date: "2024-01-10",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Resources",
    },
    {
      title: "Student Achievement Awards 2024",
      excerpt:
        "Nominations are now open for the annual student achievement awards ceremony.",
      date: "2024-01-08",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Awards",
    },
    {
      title: "Campus Innovation Hub Launch",
      excerpt:
        "New innovation center opening to support student startups and research projects.",
      date: "2024-01-05",
      image:
        "https://images.unsplash.com/photo-1497493292307-31c376b6e479?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Campus",
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
            Latest News & Updates
          </h2>
          <p className="text-gray-400 text-lg">
            Stay informed about the latest happenings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 overflow-hidden hover:bg-gray-800/70 transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-sm text-emerald-400 bg-emerald-400/10 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-400 mb-2">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.excerpt}</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 text-emerald-400 hover:text-emerald-300 transition-colors duration-200 flex items-center"
                >
                  Read More
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsSection;
