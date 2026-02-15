import { useState } from "react"
import api from "../services/api"
import toast from "react-hot-toast"

export default function Tracking() {
  const [trackingId, setTrackingId] = useState("")
  const [shipment, setShipment] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = async () => {
    if (!trackingId) return toast.error("Enter Tracking ID")

    try {
      setLoading(true)
      const res = await api.get(`/shipments/track/${trackingId}`)
      setShipment(res.data)
    } catch (err) {
      toast.error("Shipment not found")
      setShipment(null)
    } finally {
      setLoading(false)
    }
  }

  const timelineSteps = [
    "Booked",
    "In Transit",
    "Out for Delivery",
    "Delivered"
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Track Your Shipment
        </h1>
      </div>

      {/* Search Box */}
      <div className="flex space-x-4 mb-8">
        <input
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter Tracking ID"
          className="border p-3 rounded w-80"
        />

        <button
          onClick={handleTrack}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          {loading ? "Tracking..." : "Track"}
        </button>
      </div>

      {/* Shipment Info */}
      {shipment && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT SIDE */}
          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold mb-4">
              {shipment.tracking_id}
            </h2>

            <div className="mb-4">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                {shipment.status}
              </span>
            </div>

            <div className="space-y-2 mb-6">
              <p><strong>Sender:</strong> {shipment.sender_name}</p>
              <p><strong>Receiver:</strong> {shipment.receiver_name}</p>
              <p><strong>Transport:</strong> {shipment.transport_type}</p>
              <p><strong>Weight:</strong> {shipment.weight} kg</p>
              <p><strong>Cost:</strong> ₹{shipment.cost}</p>
            </div>

            {/* Timeline */}
            <h3 className="font-bold mb-3">
              Shipment Progress
            </h3>

            <div className="space-y-4">
              {timelineSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      timelineSteps.indexOf(shipment.status) >= index
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    }`}
                  />
                  <p>{step}</p>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT SIDE MAP */}
          <div className="bg-white rounded-xl shadow overflow-hidden">

            <div className="h-[500px] bg-gray-200 flex items-center justify-center">
              <p className="text-gray-600">
                Map Integration Area
              </p>
            </div>

          </div>

        </div>
      )}
    </div>
  )
}
