import { Router } from "express";                                  // { Router } avec accolades et majuscule
import { getFilms, getFilm, getShowing, createFilm, updateFilm } from "../Controllers/films.controller.js";     // la fonction du Controller
import { checkAdmin } from "../Middlewares/admin.middleware.js";

const router = Router();      // on CRÉE le routeur

// GET /films → liste des films
router.get("/", getFilms);
router.get("/showing", getShowing)
router.get("/:id", getFilm)

router.post("/", checkAdmin, createFilm)
router.patch("/:id", checkAdmin, updateFilm)
export default router;