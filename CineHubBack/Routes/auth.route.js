// On importe le "Router" d'Express : un mini-standard téléphonique pour un groupe d'adresses
import { Router } from "express";

// On importe la fonction d'inscription du Controller
// ⚠️ Remplace "register" par le nom exact de ta fonction si c'est différent
import { register } from "../Controllers/auth.controller.js";

// On crée le routeur
const router = Router();

// Quand une requête POST arrive sur /register → on appelle la fonction register
// (le "/auth" devant sera ajouté dans index.js)
router.post("/register", register);

// On exporte le routeur pour pouvoir l'utiliser dans index.js
export default router;