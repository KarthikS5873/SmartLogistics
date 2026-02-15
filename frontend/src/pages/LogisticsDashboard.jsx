// src/pages/LogisticsDashboard.jsx

import { useEffect, useState } from "react"
import api from "../services/api"
import Sidebar from "../components/Sidebar"
import toast from "react-hot-toast"

export default function LogisticsDashboard() {
  const [shipments, setShipments] = useState([])

  const fetchShipments = async () => {
    try {
      const res = await api.get("/admin/shipments")
      // Filter only non-delivered shipments
      const active = res.data.filter(
        (s) => s.status !== "Delivered"
      )
      setShipments(active)
    } catch (err) {
      toast.error("Failed to load shipments")
    }
  }

  useEffect(() => {
    fetchShipments()
  }, [])

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/shipments/${id}/status`, { status })
      toast.success("Status Updated")
      fetchShipments()
    } catch (err) {
      toast.error("Update Failed")
    }
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">
          Logistics Dashboard
        </h1>

        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Tracking ID</th>
                <th className="p-3">Receiver</th>
                <th className="p-3">Status</th>
                <th className="p-3">Update</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s) => (
                <tr key={s.id} className="border-b">
                  <td className="p-3">{s.tracking_id}</td>
                  <td className="p-3">{s.receiver_name}</td>
                  <td className="p-3">{s.status}</td>
                  <td className="p-3">
                    <select
                      className="border p-1"
                      onChange={(e) =>
                        updateStatus(s.id, e.target.value)
                      }
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Change Status
                      </option>
                      <option value="In Transit">
                        In Transit
                      </option>
                      <option value="Out for Delivery">
                        Out for Delivery
                      </option>
                      <option value="Delivered">
                        Delivered
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {shipments.length === 0 && (
            <div className="p-6 text-center">
              No active shipments.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
