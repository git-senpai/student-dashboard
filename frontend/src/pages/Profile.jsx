function Profile() {
  // TODO: Add authentication check
  const userProfile = {
    name: 'John Doe',
    studentId: '2024001',
    program: 'Computer Science',
    year: '3rd Year',
    email: 'john.doe@university.edu',
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-8">
          <div className="text-center mb-8">
            <div className="h-32 w-32 rounded-full bg-gray-200 mx-auto mb-4">
              {/* Placeholder for profile image */}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{userProfile.name}</h2>
            <p className="text-gray-600">{userProfile.studentId}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-gray-500 text-sm">Program</h3>
                <p className="text-gray-900">{userProfile.program}</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">Year</h3>
                <p className="text-gray-900">{userProfile.year}</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">Email</h3>
                <p className="text-gray-900">{userProfile.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-gray-500 text-sm">Current Semester</h3>
                <p className="text-gray-900">Fall 2024</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">Credits Completed</h3>
                <p className="text-gray-900">85/120</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm">GPA</h3>
                <p className="text-gray-900">3.8/4.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 