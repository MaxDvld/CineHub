import { Router } from 'express'
import { insertReservation, getMyReservations, getReservations, getScreeningReservations, cancelReservation} from '../Controllers/reservations.controller.js'
import { checkAdmin } from '../Middlewares/admin.middleware.js'

const router = Router()

router.get("/me", getMyReservations)
router.get("/",checkAdmin, getReservations)
router.get("/screening/:screeningID", checkAdmin, getScreeningReservations)
router.delete("/:id", cancelReservation)
router.post("/", insertReservation)
export default router
