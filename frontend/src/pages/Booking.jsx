import { useState } from "react"
import api from "../services/api"
import toast from "react-hot-toast"

export default function Booking() {
  const [form, setForm] = useState({
    sender_name:"",
    receiver_name:"",
    pickup_address:"",
    delivery_address:"",
    weight:"",
    transport_type:"Truck"
  })

  const handleSubmit = async () => {
    try {
      const res = await api.post("/shipments", form)
      toast.success("Tracking ID: " + res.data.tracking_id)
    } catch (err) {
      toast.error("Error creating shipment")
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Book Shipment</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(form).map(key => (
          <input key={key}
            placeholder={key}
            className="border p-2"
            onChange={(e)=>setForm({...form,[key]:e.target.value})}
          />
        ))}
      </div>
      <button onClick={handleSubmit}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </div>
  )
}
