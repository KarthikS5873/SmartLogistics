import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../services/supabase"

export default function Navbar() {
  const { user, role } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem("token")
    navigate("/")
    window.location.reload()
  }

  return (
    <nav className="bg-blue-700 text-white px-6 py-3 flex justify-between">
      <h1 className="font-bold text-lg">
        <Link to="/">Smart Logistics</Link>
      </h1>

      <div className="space-x-4">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && role === "customer" && (
          <>
            <Link to="/customer">Dashboard</Link>
            <Link to="/booking">Book Shipment</Link>
          </>
        )}

        {user && role === "admin" && (
          <Link to="/admin">Admin Dashboard</Link>
        )}

        {user && role === "logistics" && (
          <Link to="/logistics">Logistics</Link>
        )}

        {user && (
          <button onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}
