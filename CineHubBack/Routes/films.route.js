import { Router } from "express";
import { getFilms, getFilm, getShowing, createFilm, updateFilm, deleteFilm} from "../Controllers/films.controller.js";
import { checkAdmin } from "../Middlewares/admin.middleware.js";

const router = Router();

router.get("/", getFilms);
router.get("/showing", getShowing)
router.get("/:id", getFilm)

router.post("/", checkAdmin, createFilm)
router.patch("/:id", checkAdmin, updateFilm)
router.delete("/:id", checkAdmin, deleteFilm)

export default router;