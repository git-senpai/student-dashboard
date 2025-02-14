import { createContext, useContext, useState, useEffect } from 'react'
import { getApiUrl, ENDPOINTS } from '../constants/config'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verify token and get user data on mount
    const verifyToken = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await fetch(`${getApiUrl()}${ENDPOINTS.AUTH.VERIFY}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          if (response.ok) {
            const data = await response.json()
            setUser(data.user)
          } else {
            localStorage.removeItem('token')
          }
        } catch (error) {
          console.error('Auth verification failed:', error)
          localStorage.removeItem('token')
        }
      }
      setLoading(false)
    }

    verifyToken()
  }, [])

  const login = (userData) => {
    setUser(userData)
  }

  const logout = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        await fetch(`${getApiUrl()}${ENDPOINTS.AUTH.LOGOUT}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('token')
      setUser(null)
    }
  }

  const updateProfile = async (profileData) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${getApiUrl()}${ENDPOINTS.USER.UPDATE}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        throw new Error('Profile update failed')
      }

      const data = await response.json()
      setUser(data.user)
      return data
    } catch (error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 