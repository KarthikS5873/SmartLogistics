import express from "express"
import { verifyJWT } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"
import {
  createShipment,
  getMyShipments,
  trackShipment,
  updateStatus
} from "../controllers/shipmentController.js"

const router = express.Router()

router.post("/", verifyJWT, allowRoles("customer"), createShipment)
router.get("/my", verifyJWT, allowRoles("customer"), getMyShipments)
router.get("/track/:trackingId", trackShipment)
router.put("/:id/status", verifyJWT, allowRoles("admin","logistics"), updateStatus)

export default router
