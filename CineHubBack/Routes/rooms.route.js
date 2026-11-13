import { Router } from "express"
import { getRooms, getRoom, createRoom, updateRoom, deleteRoom} from "../Controllers/rooms.controller.js"
import { checkAdmin } from "../Middlewares/admin.middleware.js"

const router = Router()

router.get("/", getRooms)
router.get("/:id", getRoom)

router.post("/", checkAdmin, createRoom)
router.patch("/:id", checkAdmin, updateRoom)
router.delete("/:id", checkAdmin, deleteRoom)
export default router;