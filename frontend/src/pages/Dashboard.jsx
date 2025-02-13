import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import DashboardStats from '../components/dashboard/DashboardStats'
import ProfileCard from '../components/dashboard/ProfileCard'
import CourseTable from '../components/dashboard/CourseTable'
import ApplicationStatus from '../components/dashboard/ApplicationStatus'
import { Chart as ChartJS } from 'chart.js/auto'

function Dashboard() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    fetchProfileData()
  }, [])

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }

      const data = await response.json()
      setProfileData(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate completion percentage
  const calculateCompletion = () => {
    if (!profileData) return 0
    let completed = 0
    let total = 0

    // Basic info
    const basicFields = ['name', 'email', 'phoneNumber', 'dateOfBirth', 'gender']
    basicFields.forEach(field => {
      total++
      if (profileData[field]) completed++
    })

    // Address
    if (profileData.address) {
      Object.values(profileData.address).forEach(value => {
        total++
        if (value) completed++
      })
    }

    // Education
    if (profileData.education) {
      Object.values(profileData.education).forEach(value => {
        total++
        if (value) completed++
      })
    }

    return Math.round((completed / total) * 100)
  }

  const stats = [
    {
      title: 'Profile Completion',
      value: `${calculateCompletion()}%`,
      change: '+5%',
      trend: 'up',
    },
    {
      title: 'Current Semester',
      value: '3rd',
      change: 'Fall 2023',
      trend: 'up',
    },
    {
      title: 'Active Courses',
      value: '5',
      change: '+1',
      trend: 'up',
    },
    {
      title: 'Applications',
      value: '2',
      change: 'In Progress',
      trend: 'up',
    },
  ]

  // Dummy course data
  const courseData = [
    {
      subject: 'Advanced Web Development',
      marks: 85,
      grade: 'A',
      status: 'Running',
    },
    {
      subject: 'Database Management',
      marks: 78,
      grade: 'B+',
      status: 'Running',
    },
    {
      subject: 'Software Engineering',
      marks: 92,
      grade: 'A+',
      status: 'Running',
    },
    {
      subject: 'Cloud Computing',
      marks: 88,
      grade: 'A',
      status: 'Completed',
    },
    {
      subject: 'AI & Machine Learning',
      marks: 75,
      grade: 'B',
      status: 'Pending',
    },
  ]

  const applicationData = [
    {
      id: 1,
      course: 'Master of Computer Science',
      university: 'Tech University',
      status: 'Running',
      progress: 75,
      deadline: '2024-03-15',
    },
    {
      id: 2,
      course: 'Master of Data Science',
      university: 'Data Institute',
      status: 'Pending',
      progress: 30,
      deadline: '2024-04-01',
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg mb-8 p-6 text-white">
          <h1 className="text-3xl font-bold">Welcome back, {profileData?.name || user?.name}</h1>
          <p className="mt-2 text-blue-100">
            Track your academic progress and manage your applications
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-8">
          <DashboardStats stats={stats} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Performance */}
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Course Performance
                  </h2>
                  <button className="text-blue-600 hover:text-blue-800">
                    View All
                  </button>
                </div>
                <CourseTable courses={courseData} />
              </div>
            </div>

            {/* Applications Status */}
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Application Status
                  </h2>
                  <button className="text-blue-600 hover:text-blue-800">
                    View All
                  </button>
                </div>
                <ApplicationStatus applications={applicationData} />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Profile Card */}
            <ProfileCard user={profileData || user} />

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <nav className="space-y-3">
                <a
                  href="#"
                  className="flex items-center p-3 text-base font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg group"
                >
                  <span className="flex-1">View Course Schedule</span>
                  <span className="text-gray-400 group-hover:text-gray-500">→</span>
                </a>
                <a
                  href="#"
                  className="flex items-center p-3 text-base font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg group"
                >
                  <span className="flex-1">Submit Assignments</span>
                  <span className="text-gray-400 group-hover:text-gray-500">→</span>
                </a>
                <a
                  href="#"
                  className="flex items-center p-3 text-base font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg group"
                >
                  <span className="flex-1">View Grade Reports</span>
                  <span className="text-gray-400 group-hover:text-gray-500">→</span>
                </a>
                <a
                  href="#"
                  className="flex items-center p-3 text-base font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg group"
                >
                  <span className="flex-1">Academic Calendar</span>
                  <span className="text-gray-400 group-hover:text-gray-500">→</span>
                </a>
              </nav>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Upcoming Deadlines
              </h2>
              <div className="space-y-4">
                {applicationData.map(app => (
                  <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{app.course}</p>
                      <p className="text-sm text-gray-500">Due: {new Date(app.deadline).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      app.status === 'Running' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 