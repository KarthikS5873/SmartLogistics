import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import shipmentRoutes from "./routes/shipmentRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import warehouseRoutes from "./routes/warehouseRoutes.js"

dotenv.config()

const app = express()

/* =====================================================
   CORS CONFIGURATION (NETLIFY + LOCAL DEVELOPMENT)
===================================================== */

const allowedOrigins = [
  "http://localhost:5173",                 // Local development
  "https://smartlogisticslareina.netlify.app"      // 🔥 Replace with your real Netlify URL
]

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true)

      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      } else {
        return callback(new Error("CORS not allowed"))
      }
    },
    credentials: true
  })
)

/* =====================================================
   MIDDLEWARE
===================================================== */

app.use(express.json())

/* =====================================================
   HEALTH CHECK ROUTE
===================================================== */

app.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 Smart Logistics Backend Running",
    status: "OK"
  })
})

/* =====================================================
   API ROUTES
===================================================== */

app.use("/api/shipments", shipmentRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/warehouses", warehouseRoutes)

/* =====================================================
   GLOBAL ERROR HANDLER
===================================================== */

app.use((err, req, res, next) => {
  console.error(err.message)

  if (err.message === "CORS not allowed") {
    return res.status(403).json({ message: "CORS Policy Blocked Request" })
  }

  res.status(500).json({
    message: "Internal Server Error"
  })
})

/* =====================================================
   START SERVER
===================================================== */

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
