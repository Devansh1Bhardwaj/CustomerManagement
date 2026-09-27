import { createContext, useContext, useState } from 'react'

const DEMO_USERS = [
  { username: 'admin', password: 'admin123', name: 'Admin User', role: 'Admin' },
  { username: 'staff', password: 'staff123', name: 'Staff User', role: 'Staff' },
]

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('cms_auth_user')
    return stored ? JSON.parse(stored) : null
  })

    function login(username, password, expectedRole) {
    const match = DEMO_USERS.find(u => u.username === username && u.password === password)
    if (!match) {
      return { success: false, error: 'Incorrect username or password.' }
    }
    if (expectedRole && match.role !== expectedRole) {
      return { success: false, error: `Incorrect username or password` }
    }
    const loggedInUser = { name: match.name, username: match.username, role: match.role }
    localStorage.setItem('cms_auth_user', JSON.stringify(loggedInUser))
    setUser(loggedInUser)
    return { success: true }
  }

  function logout() {
    localStorage.removeItem('cms_auth_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}