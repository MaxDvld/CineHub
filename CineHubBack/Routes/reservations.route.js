import { Router } from 'express'
import { insertReservation, getMyReservations } from '../Controllers/reservations.controller.js'
import { checkAdmin } from '../Middlewares/admin.middleware.js'

const router = Router()

router.get("/me", getMyReservations)
router.post("/", insertReservation)

export default router
