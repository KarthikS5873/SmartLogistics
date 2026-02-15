import express from "express"
import { verifyJWT } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"
import {
  addWarehouse,
  getWarehouses
} from "../controllers/warehouseController.js"

const router = express.Router()

router.post("/", verifyJWT, allowRoles("admin"), addWarehouse)
router.get("/", verifyJWT, allowRoles("admin"), getWarehouses)

export default router
