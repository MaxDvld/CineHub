import express from "express";
import { register } from "../Controllers/auth.controller.js";

// Un "Router" = un mini-standard téléphonique pour un groupe d'URL
const router = express.Router();

// POST /register → appelle la fonction register du controller
router.post("/register", register);

export default router;