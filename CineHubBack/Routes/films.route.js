import { Router } from "express";                                  // { Router } avec accolades et majuscule
import { getFilms, getFilm, getShowing } from "../Controllers/films.controller.js";     // la fonction du Controller

const router = Router();      // on CRÉE le routeur

// GET /films → liste des films
router.get("/", getFilms);
router.get("/showing", getShowing)
router.get("/:id", getFilm)

export default router;