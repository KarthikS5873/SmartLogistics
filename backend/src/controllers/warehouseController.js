import supabase from "../config/supabase.js"

export const addWarehouse = async (req, res) => {
  const { name, location, capacity } = req.body

  await supabase.from("warehouses").insert([{
    name,
    location,
    capacity,
    available_space: capacity
  }])

  res.json({ message: "Warehouse added" })
}

export const getWarehouses = async (req, res) => {
  const { data } = await supabase.from("warehouses").select("*")
  res.json(data)
}
