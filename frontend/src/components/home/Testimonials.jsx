import { motion } from 'framer-motion';

function Testimonials() {
  const testimonials = [
    {
      content: "UniSystem has completely transformed my academic journey. The dashboard makes tracking my progress so much easier!",
      author: "Sarah Johnson",
      role: "Computer Science Student",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      content: "The best student management system I've ever used. Everything I need is just a click away.",
      author: "Michael Chen",
      role: "Engineering Student",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      content: "Great platform for keeping track of my courses and assignments. Highly recommended!",
      author: "Emma Davis",
      role: "Business Student",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    }
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
            What Our Students Say
          </h2>
          <p className="text-gray-400 text-lg">
            Don't just take our word for it - hear from our students
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6 relative"
            >
              <div className="absolute -top-4 left-6">
                <svg
                  className="h-8 w-8 text-emerald-400 transform rotate-180"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              <div className="relative">
                <p className="text-gray-300 mb-6 italic">{testimonial.content}</p>
                <div className="flex items-center">
                  <img
                    className="h-12 w-12 rounded-full border-2 border-emerald-400/20"
                    src={testimonial.image}
                    alt={testimonial.author}
                  />
                  <div className="ml-4">
                    <div className="text-white font-semibold">{testimonial.author}</div>
                    <div className="text-emerald-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials; 
