import { Router } from 'express'
import { getScreenings, getScreening, getScreeningByfilm } from "../Controllers/screenings.controller.js" 
import { checkAdmin } from "../Middlewares/admin.middleware.js"

const router = Router()

router.get("/", getScreenings)
router.get("/:id", getScreening)
router.get("/film/:filmID", getScreeningByfilm)

export default router 