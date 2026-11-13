import { Router } from "express";                                  // { Router } avec accolades et majuscule
import { getFilms } from "../Controllers/films.controller.js";     // la fonction du Controller

const router = Router();      // on CRÉE le routeur

// GET /films → liste des films
router.get("/", getFilms);

export default router;