function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">UniSystem</h3>
            <p className="text-gray-400">
              Empowering education through technology and innovation.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Programs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Admissions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Campus Life
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 University Ave</li>
              <li>City, State 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@unisystem.edu</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 UniSystem. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 