import { Router } from 'express'
import { getScreenings, getScreening, getScreeningByfilm, insertScreening, patchScreening, removeScreening  } from "../Controllers/screenings.controller.js" 
import { checkAdmin } from "../Middlewares/admin.middleware.js"

const router = Router()

router.get("/", getScreenings)
router.get("/:id", getScreening)
router.get("/film/:filmID", getScreeningByfilm)

router.post("/",checkAdmin, insertScreening)
router.patch("/:id",checkAdmin, patchScreening)
router.delete("/:id",checkAdmin, removeScreening)
export default router 