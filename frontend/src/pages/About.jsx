import { universityData } from '../data/dummyData'

function About() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About {universityData.name}
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Established in {universityData.established}, we are committed to excellence in education.
          </p>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Departments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {universityData.departments.map((department, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300"
              >
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {department}
                </h4>
                <p className="text-gray-600">
                  Offering comprehensive programs and research opportunities.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About 