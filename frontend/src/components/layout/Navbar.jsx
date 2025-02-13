import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Button from '../common/Button'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const AuthLinks = () => (
    <>
      <Link to="/profile" className="hover:bg-blue-700 px-3 py-2 rounded">
        Profile
      </Link>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  )

  const GuestLinks = () => (
    <>
      <Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded">
        Login
      </Link>
      <Link to="/register" className="hover:bg-blue-700 px-3 py-2 rounded">
        Register
      </Link>
    </>
  )

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              UniSystem
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">
                Home
              </Link>
              <Link to="/about" className="hover:bg-blue-700 px-3 py-2 rounded">
                About
              </Link>
              {user ? <AuthLinks /> : <GuestLinks />}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block hover:bg-blue-700 px-3 py-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block hover:bg-blue-700 px-3 py-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block hover:bg-blue-700 px-3 py-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className="block w-full text-left hover:bg-blue-700 px-3 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block hover:bg-blue-700 px-3 py-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block hover:bg-blue-700 px-3 py-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar 