import supabase from "../config/supabase.js"
import { Parser } from "json2csv"

export const getAllShipments = async (req, res) => {
  const { data } = await supabase
    .from("shipments")
    .select("*")
    .order("created_at", { ascending: false })

  res.json(data)
}

export const getAnalytics = async (req, res) => {
  const { data } = await supabase.from("shipments").select("*")

  const totalRevenue = data.reduce((sum, s) => sum + s.cost, 0)

  res.json({
    totalShipments: data.length,
    totalRevenue
  })
}

export const exportCSV = async (req, res) => {
  const { data } = await supabase.from("shipments").select("*")
  const parser = new Parser()
  const csv = parser.parse(data)

  res.header("Content-Type", "text/csv")
  res.attachment("report.csv")
  res.send(csv)
}
