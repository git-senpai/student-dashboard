import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import DashboardStats from "../components/dashboard/DashboardStats";
import ProfileCard from "../components/dashboard/ProfileCard";
import CourseTable from "../components/dashboard/CourseTable";
import ApplicationStatus from "../components/dashboard/ApplicationStatus";
import { Chart as ChartJS } from "chart.js/auto";

function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate completion percentage
  const calculateCompletion = () => {
    if (!profileData) return 0;
    let completed = 0;
    let total = 0;

    // Basic info
    const basicFields = [
      "name",
      "email",
      "phoneNumber",
      "dateOfBirth",
      "gender",
    ];
    basicFields.forEach((field) => {
      total++;
      if (profileData[field]) completed++;
    });

    // Address
    if (profileData.address) {
      Object.values(profileData.address).forEach((value) => {
        total++;
        if (value) completed++;
      });
    }

    // Education
    if (profileData.education) {
      Object.values(profileData.education).forEach((value) => {
        total++;
        if (value) completed++;
      });
    }

    return Math.round((completed / total) * 100);
  };

  const stats = [
    {
      title: "Profile Completion",
      value: `${calculateCompletion()}%`,
      change: "+5%",
      trend: "up",
      progress: calculateCompletion(),
    },
    {
      title: "Current Semester",
      value: "3rd",
      change: "Fall 2023",
      trend: "up",
    },
    {
      title: "Active Courses",
      value: "5",
      change: "+1",
      trend: "up",
    },
    {
      title: "Applications",
      value: "2",
      change: "In Progress",
      trend: "up",
    },
  ];

  // Dummy course data
  const courseData = [
    {
      subject: "Advanced Web Development",
      marks: 85,
      grade: "A",
      status: "Running",
    },
    {
      subject: "Database Management",
      marks: 78,
      grade: "B+",
      status: "Running",
    },
    {
      subject: "Software Engineering",
      marks: 92,
      grade: "A+",
      status: "Running",
    },
    {
      subject: "Cloud Computing",
      marks: 88,
      grade: "A",
      status: "Completed",
    },
    {
      subject: "AI & Machine Learning",
      marks: 75,
      grade: "B",
      status: "Pending",
    },
  ];

  const applicationData = [
    {
      id: 1,
      course: "Master of Computer Science",
      university: "Tech University",
      status: "Running",
      progress: 75,
      startDate: "2024-01-15",
      expectedCompletion: "2024-06-15",
    },
    {
      id: 2,
      course: "Master of Data Science",
      university: "Data Institute",
      status: "Pending",
      progress: 30,
      startDate: "2024-02-01",
      expectedCompletion: "2024-07-01",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl mb-8"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
            <div className="absolute inset-0 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          </div>
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64">
            <div className="absolute inset-0 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          </div>

          <div className="relative p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center space-x-3"
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">
                      {(profileData?.name || user?.name)
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-white">
                    Welcome back,{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                      {profileData?.name || user?.name}
                    </span>
                  </h1>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-gray-400 text-lg"
                >
                  Track your academic progress and manage your applications
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-4 md:mt-0"
              >
                <div className="px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700/50">
                  <p className="text-sm text-gray-400">Current Time</p>
                  <p className="text-lg font-semibold text-emerald-400">
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Quick Stats Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-700/50"
            >
              <div className="text-center">
                <p className="text-sm text-gray-400">Today's Classes</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">Assignments Due</p>
                <p className="text-2xl font-bold text-white">2</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">Upcoming Tests</p>
                <p className="text-2xl font-bold text-white">1</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">Messages</p>
                <p className="text-2xl font-bold text-white">5</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <DashboardStats stats={stats} />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Course Performance
                </h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                >
                  View All
                </motion.button>
              </div>
              <CourseTable courses={courseData} />
            </motion.div>

            {/* Applications Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Application Status
                </h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                >
                  View All
                </motion.button>
              </div>
              <ApplicationStatus applications={applicationData} />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ProfileCard user={profileData || user} />
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Quick Actions
              </h2>
              <nav className="space-y-3">
                <motion.a
                  whileHover={{ scale: 1.02, x: 4 }}
                  href="#"
                  className="flex items-center p-3 text-base font-medium text-gray-300 hover:text-white bg-gray-900/50 hover:bg-gray-700/50 rounded-lg group transition-all duration-200"
                >
                  <span className="flex-1">View Course Schedule</span>
                  <span className="text-emerald-400 group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.02, x: 4 }}
                  href="#"
                  className="flex items-center p-3 text-base font-medium text-gray-300 hover:text-white bg-gray-900/50 hover:bg-gray-700/50 rounded-lg group transition-all duration-200"
                >
                  <span className="flex-1">Submit Assignments</span>
                  <span className="text-emerald-400 group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.02, x: 4 }}
                  href="#"
                  className="flex items-center p-3 text-base font-medium text-gray-300 hover:text-white bg-gray-900/50 hover:bg-gray-700/50 rounded-lg group transition-all duration-200"
                >
                  <span className="flex-1">View Grade Reports</span>
                  <span className="text-emerald-400 group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.02, x: 4 }}
                  href="#"
                  className="flex items-center p-3 text-base font-medium text-gray-300 hover:text-white bg-gray-900/50 hover:bg-gray-700/50 rounded-lg group transition-all duration-200"
                >
                  <span className="flex-1">Academic Calendar</span>
                  <span className="text-emerald-400 group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </motion.a>
              </nav>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
