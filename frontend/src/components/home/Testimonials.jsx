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
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            What Our Students Say
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Don't just take our word for it - hear from our students
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <img
                  className="h-12 w-12 rounded-full"
                  src={testimonial.image}
                  alt={testimonial.author}
                />
                <div className="ml-4">
                  <div className="text-lg font-medium text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials 