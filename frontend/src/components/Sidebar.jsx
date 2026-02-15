import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Sidebar() {
  const { role } = useAuth()

  return (
    <div className="w-60 bg-blue-900 text-white h-screen p-4 space-y-4">
      <h2 className="text-xl font-bold">Smart Logistics</h2>

      {role === "admin" && (
        <>
          <Link to="/admin">Dashboard</Link>
        </>
      )}

      {role === "customer" && (
        <>
          <Link to="/customer">My Shipments</Link>
          <Link to="/booking">Book Shipment</Link>
        </>
      )}

      {role === "logistics" && (
        <>
          <Link to="/logistics">Manage Deliveries</Link>
        </>
      )}
    </div>
  )
}
