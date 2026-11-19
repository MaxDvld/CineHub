import { Router } from 'express'
import { getUsers, getUser, getMe, updateUser, deleteUser } from '../Controllers/users.controller.js'
import { checkAdmin } from '../Middlewares/admin.middleware.js'

const router = Router()

router.get("/", checkAdmin, getUsers)
router.get("/me", getMe)
router.get("/:id", getUser)
router.patch("/:id", updateUser)
router.delete("/:id", checkAdmin, deleteUser)

export default router