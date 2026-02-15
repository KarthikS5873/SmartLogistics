import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import shipmentRoutes from "./routes/shipmentRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import warehouseRoutes from "./routes/warehouseRoutes.js"

dotenv.config()

const app = express()

// Middleware
app.use(cors({
  origin: "https://smartlogisticslareina.netlify.app/",
  credentials: true
}))
app.use(express.json())

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Working ✅")
})

// API Routes
app.use("/api/shipments", shipmentRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/warehouses", warehouseRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
