function NewsSection() {
  const news = [
    {
      title: "New Online Learning Resources Available",
      excerpt: "Access the latest study materials and video lectures through our updated learning portal.",
      date: "2024-01-10",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Resources"
    },
    {
      title: "Student Achievement Awards 2024",
      excerpt: "Nominations are now open for the annual student achievement awards ceremony.",
      date: "2024-01-08",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Awards"
    },
    {
      title: "Campus Innovation Hub Launch",
      excerpt: "New innovation center opening to support student startups and research projects.",
      date: "2024-01-05",
      image: "https://images.unsplash.com/photo-1497493292307-31c376b6e479?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Campus"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Latest News & Updates
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Stay informed about the latest happenings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                className="h-48 w-full object-cover"
                src={item.image}
                alt={item.title}
              />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm font-medium text-blue-600">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {item.excerpt}
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsSection 