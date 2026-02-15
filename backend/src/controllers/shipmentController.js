import supabase from "../config/supabase.js"
import { calculateCost } from "../services/costService.js"

export const createShipment = async (req, res) => {
  const { sender_name, receiver_name, pickup_address,
          delivery_address, weight, transport_type } = req.body

  const cost = calculateCost(weight, transport_type)
  const tracking_id = "TRK" + Date.now()

  const { error } = await supabase.from("shipments").insert([{
    tracking_id,
    user_id: req.user.id,
    sender_name,
    receiver_name,
    pickup_address,
    delivery_address,
    weight,
    transport_type,
    cost
  }])

  if (error) return res.status(400).json(error)

  res.json({ message: "Shipment Created", tracking_id })
}

export const getMyShipments = async (req, res) => {
  const { data } = await supabase
    .from("shipments")
    .select("*")
    .eq("user_id", req.user.id)

  res.json(data)
}

export const trackShipment = async (req, res) => {
  const { trackingId } = req.params

  const { data } = await supabase
    .from("shipments")
    .select("*")
    .eq("tracking_id", trackingId)
    .single()

  if (!data) return res.status(404).json({ message: "Not found" })

  res.json(data)
}

export const updateStatus = async (req, res) => {
  const { status } = req.body
  const { id } = req.params

  await supabase
    .from("shipments")
    .update({ status })
    .eq("id", id)

  await supabase
    .from("status_history")
    .insert([{ shipment_id: id, status, updated_by: req.user.id }])

  res.json({ message: "Status updated" })
}
