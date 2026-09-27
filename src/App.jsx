import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Customers from './pages/Customers.jsx'
import Sidebar from './components/Sidebar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      {children}
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Customers />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/customers" replace />} />
    </Routes>
  )
}
