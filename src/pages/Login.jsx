import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const [selectedRole, setSelectedRole] = useState(null) // null | 'Admin' | 'Staff'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  function chooseRole(role) {
    setSelectedRole(role)
    setUsername('')
    setPassword('')
    setError('')
  }

  function goBack() {
    setSelectedRole(null)
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    const result = login(username, password, selectedRole)
    if (result.success) {
      navigate('/customers')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="brand">Ledger</div>
        <div className="brand-sub">Customer Management System</div>

        {!selectedRole ? (
          <>
            <p className="role-select-prompt">Continue as:</p>
            <div className="role-toggle">
              <button type="button" className="role-btn" onClick={() => chooseRole('Admin')}>
                Login as Admin
              </button>
              <button type="button" className="role-btn" onClick={() => chooseRole('Staff')}>
                Login as Staff
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="role-active-row">
              <span>
                Signing in as <strong>{selectedRole}</strong>
              </span>
              <button type="button" className="btn-link" onClick={goBack}>Change</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="form-row">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              {error && <div className="form-error">{error}</div>}
              <button type="submit" className="btn-primary">Sign in</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}