function ApplicationStatus({ applications }) {
  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <div
          key={app.id}
          className="bg-gray-50 rounded-lg p-4"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {app.course}
              </h3>
              <p className="text-sm text-gray-500">{app.university}</p>
            </div>
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                app.status === 'Running'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {app.status}
            </span>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{app.progress}%</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  app.status === 'Running'
                    ? 'bg-green-500'
                    : 'bg-yellow-500'
                }`}
                style={{ width: `${app.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ApplicationStatus 