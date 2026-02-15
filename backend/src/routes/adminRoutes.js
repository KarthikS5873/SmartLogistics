import express from "express"
import { verifyJWT } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"
import {
  getAllShipments,
  getAnalytics,
  exportCSV
} from "../controllers/adminController.js"

const router = express.Router()

router.get("/shipments", verifyJWT, allowRoles("admin"), getAllShipments)
router.get("/analytics", verifyJWT, allowRoles("admin"), getAnalytics)
router.get("/export", verifyJWT, allowRoles("admin"), exportCSV)

export default router
