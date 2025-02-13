import { universityData } from '../../data/dummyData'

function Stats() {
  return (
    <div className="bg-blue-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">
              {universityData.stats.students.toLocaleString()}+
            </div>
            <div className="text-blue-100">Students</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">
              {universityData.stats.faculty.toLocaleString()}+
            </div>
            <div className="text-blue-100">Faculty Members</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">
              {universityData.stats.programs}+
            </div>
            <div className="text-blue-100">Programs</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">
              {universityData.stats.research_centers}
            </div>
            <div className="text-blue-100">Research Centers</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats 