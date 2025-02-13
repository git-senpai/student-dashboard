function ProfileCard({ user }) {
  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.name}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold">
                {user?.name?.charAt(0)?.toUpperCase()}
              </span>
            )}
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <dl className="space-y-4">
            {user?.phoneNumber && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.phoneNumber}</dd>
              </div>
            )}
            {user?.dateOfBirth && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </dd>
              </div>
            )}
            {user?.address && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {[
                    user.address.city,
                    user.address.state,
                    user.address.country,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </dd>
              </div>
            )}
            {user?.education && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Education</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {user.education.degree} - {user.education.institution}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Social Links */}
        {user?.socialLinks && Object.values(user.socialLinks).some(link => link) && (
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="flex space-x-4">
              {user.socialLinks.linkedin && (
                <a
                  href={user.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  LinkedIn
                </a>
              )}
              {user.socialLinks.github && (
                <a
                  href={user.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  GitHub
                </a>
              )}
              {user.socialLinks.twitter && (
                <a
                  href={user.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  Twitter
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileCard 