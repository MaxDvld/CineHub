import { Router } from 'express'
import { insertReservation } from '../Controllers/reservations.controller.js'

const router = Router()

router.post("/", insertReservation)

export default router
