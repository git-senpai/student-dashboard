import { motion } from "framer-motion";

function ProfileCard({ user }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl"
    >
      <div className="p-6">
        <div className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-lg"
          >
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.name}
                className="h-16 w-16 rounded-full object-cover border-2 border-emerald-400/20"
              />
            ) : (
              <span className="text-2xl font-bold">
                {user?.name?.charAt(0)?.toUpperCase()}
              </span>
            )}
          </motion.div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-white">{user?.name}</h2>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-700/50 pt-4">
          <dl className="space-y-4">
            {user?.phoneNumber && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <dt className="text-sm font-medium text-gray-400">Phone</dt>
                <dd className="mt-1 text-sm text-gray-300">
                  {user.phoneNumber}
                </dd>
              </motion.div>
            )}
            {user?.dateOfBirth && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <dt className="text-sm font-medium text-gray-400">
                  Date of Birth
                </dt>
                <dd className="mt-1 text-sm text-gray-300">
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </dd>
              </motion.div>
            )}
            {user?.address && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <dt className="text-sm font-medium text-gray-400">Location</dt>
                <dd className="mt-1 text-sm text-gray-300">
                  {[user.address.city, user.address.state, user.address.country]
                    .filter(Boolean)
                    .join(", ")}
                </dd>
              </motion.div>
            )}
            {user?.education && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <dt className="text-sm font-medium text-gray-400">Education</dt>
                <dd className="mt-1 text-sm text-gray-300">
                  {user.education.degree} - {user.education.institution}
                </dd>
              </motion.div>
            )}
          </dl>
        </div>

        {/* Social Links */}
        {user?.socialLinks &&
          Object.values(user.socialLinks).some((link) => link) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 border-t border-gray-700/50 pt-4"
            >
              <div className="flex space-x-4">
                {user.socialLinks.linkedin && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                  >
                    LinkedIn
                  </motion.a>
                )}
                {user.socialLinks.github && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    href={user.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                  >
                    GitHub
                  </motion.a>
                )}
                {user.socialLinks.twitter && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    href={user.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                  >
                    Twitter
                  </motion.a>
                )}
              </div>
            </motion.div>
          )}
      </div>
    </motion.div>
  );
}

export default ProfileCard;
