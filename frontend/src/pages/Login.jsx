import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginForm from '../components/auth/LoginForm'

function Login() {
  const { user } = useAuth()

  // If user is already logged in, redirect to home or profile
  if (user) {
    return <Navigate to="/profile" replace />
  }

  // Otherwise, show the login form
  return <LoginForm />
}

export default Login 