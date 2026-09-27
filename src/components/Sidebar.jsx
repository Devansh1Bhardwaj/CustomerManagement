import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <aside className="sidebar">
      <div className="brand">Ledger</div>
      <div className="brand-sub">Customer Management</div>

      <nav>
        <NavLink to="/customers" className={({ isActive }) => (isActive ? 'active' : '')}>
          Customers
        </NavLink>
      </nav>

      <div className="user-block">
        Signed in as <strong>{user?.name}</strong> <span style={{ opacity: 0.7 }}>({user?.role})</span>
        <button className="logout-btn" onClick={handleLogout}>Log out</button>
      </div>
    </aside>
  )
}