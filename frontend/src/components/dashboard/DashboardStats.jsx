function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-500 truncate">
                  {stat.title}
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                  {stat.value}
                </div>
              </div>
              <div className={`flex items-center text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <span className="text-lg">
                  {stat.trend === 'up' ? '↑' : '↓'}
                </span>
                <span className="ml-1">{stat.change}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardStats 