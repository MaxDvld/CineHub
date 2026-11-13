import { Router } from "express"
import { getRooms, getRoom } from "../Controllers/rooms.controller.js"
import { checkAdmin } from "../Middlewares/admin.middleware.js"

const router = Router()

router.get("/", getRooms)
router.get("/:id", getRoom)

export default router;