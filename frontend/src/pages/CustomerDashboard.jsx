// src/pages/CustomerDashboard.jsx

import { useEffect, useState } from "react"
import api from "../services/api"
import Sidebar from "../components/Sidebar"
import Loader from "../components/Loader"
import toast from "react-hot-toast"

export default function CustomerDashboard() {
  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchShipments = async () => {
    try {
      const res = await api.get("/shipments/my")
      setShipments(res.data)
    } catch (err) {
      toast.error("Failed to load shipments")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchShipments()
  }, [])

  if (loading) return <Loader />

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">
          My Shipments
        </h1>

        {shipments.length === 0 ? (
          <div className="bg-white p-6 rounded shadow">
            No shipments found.
          </div>
        ) : (
          <div className="bg-white shadow rounded overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">Tracking ID</th>
                  <th className="p-3">Receiver</th>
                  <th className="p-3">Transport</th>
                  <th className="p-3">Weight (kg)</th>
                  <th className="p-3">Cost (₹)</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((s) => (
                  <tr key={s.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">
                      {s.tracking_id}
                    </td>
                    <td className="p-3">{s.receiver_name}</td>
                    <td className="p-3">{s.transport_type}</td>
                    <td className="p-3">{s.weight}</td>
                    <td className="p-3">₹{s.cost}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded text-white text-sm
                        ${
                          s.status === "Booked"
                            ? "bg-yellow-500"
                            : s.status === "In Transit"
                            ? "bg-blue-500"
                            : s.status === "Out for Delivery"
                            ? "bg-purple-500"
                            : "bg-green-600"
                        }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {new Date(s.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
